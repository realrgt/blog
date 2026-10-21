export interface BlogStats {
  views: number
}

const KEY_PREFIX = 'blog-stats:'

// Read-modify-write runs inside Redis so concurrent views are never lost.
const INCREMENT_VIEWS_SCRIPT = `
local raw = redis.call('GET', KEYS[1])
local stats = raw and cjson.decode(raw) or {}
stats.views = (tonumber(stats.views) or 0) + 1
redis.call('SET', KEYS[1], cjson.encode(stats))
return stats.views
`

function getUpstashConfig() {
  const url = process.env.UPSTASH_REDIS_REST_URL
  const token = process.env.UPSTASH_REDIS_REST_TOKEN

  if (!url || !token) {
    throw new TypeError(
      'Upstash REST not configured. Please set UPSTASH_REDIS_REST_URL and UPSTASH_REDIS_REST_TOKEN.'
    )
  }

  return { url, token }
}

async function upstashCommand<T>(command: (string | number)[]): Promise<T> {
  const { url, token } = getUpstashConfig()
  const res = await fetch(url, {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}` },
    body: JSON.stringify(command),
    cache: 'no-store',
  })
  if (!res.ok) {
    const text = await res.text()
    throw new Error(`Upstash ${command[0]} failed: ${res.status} ${text}`)
  }
  const body = (await res.json()) as { result: T }
  return body.result
}

function parseStats(raw: string | null): BlogStats {
  const parsed = raw ? JSON.parse(raw) : null
  return { views: Number(parsed?.views) || 0 }
}

async function scanKeys(pattern: string): Promise<string[]> {
  const keys: string[] = []
  let cursor = '0'

  do {
    const [nextCursor, batch] = await upstashCommand<[string, string[]]>([
      'SCAN',
      cursor,
      'MATCH',
      pattern,
      'COUNT',
      100,
    ])
    cursor = nextCursor
    keys.push(...batch)
  } while (cursor !== '0')

  return keys
}

export async function getPostStats(slug: string): Promise<BlogStats> {
  const raw = await upstashCommand<string | null>(['GET', `${KEY_PREFIX}${slug}`])
  return parseStats(raw)
}

export async function incrementViews(slug: string): Promise<BlogStats> {
  const views = await upstashCommand<number>([
    'EVAL',
    INCREMENT_VIEWS_SCRIPT,
    1,
    `${KEY_PREFIX}${slug}`,
  ])
  return { views }
}

export async function getAllPostsStats(): Promise<Record<string, BlogStats>> {
  const keys = await scanKeys(`${KEY_PREFIX}*`)
  if (keys.length === 0) return {}

  const values = await upstashCommand<(string | null)[]>(['MGET', ...keys])

  return keys.reduce<Record<string, BlogStats>>((acc, key, i) => {
    acc[key] = parseStats(values[i])
    return acc
  }, {})
}
