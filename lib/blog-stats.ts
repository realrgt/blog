export interface BlogStats {
  likes: number
  views: number
  likedBy: string[] // Store user IDs/IPs who liked
}

const REST_URL = process.env.UPSTASH_REDIS_REST_URL
const REST_TOKEN = process.env.UPSTASH_REDIS_REST_TOKEN

if (!REST_URL || !REST_TOKEN) {
  throw new TypeError(
    'Upstash REST not configured. Please set UPSTASH_REDIS_REST_URL and UPSTASH_REDIS_REST_TOKEN.'
  )
}

async function upstashGet(key: string): Promise<string | null> {
  const res = await fetch(`${REST_URL}/get/${encodeURIComponent(key)}`, {
    headers: { Authorization: `Bearer ${REST_TOKEN}` },
    cache: 'no-store',
  })
  if (!res.ok) return null
  const body = (await res.json()) as { result?: string | null }
  return (body as any)?.result ?? null
}

async function upstashSet(key: string, value: string): Promise<void> {
  const res = await fetch(
    `${REST_URL}/set/${encodeURIComponent(key)}/${encodeURIComponent(value)}`,
    {
      method: 'POST',
      headers: { Authorization: `Bearer ${REST_TOKEN}` },
    }
  )
  if (!res.ok) {
    const text = await res.text()
    throw new Error(`Upstash SET failed: ${res.status} ${text}`)
  }
}

async function upstashScan(
  cursor: string,
  pattern = '*',
  count = 100
): Promise<{ cursor: string; keys: string[] }> {
  const url = `${REST_URL}/scan/${encodeURIComponent(cursor)}?match=${encodeURIComponent(pattern)}&count=${count}`
  const res = await fetch(url, {
    headers: { Authorization: `Bearer ${REST_TOKEN}` },
    cache: 'no-store',
  })
  if (!res.ok) {
    const text = await res.text()
    throw new Error(`Upstash SCAN failed: ${res.status} ${text}`)
  }
  const body = (await res.json()) as { result: [string, string[]] }
  const [nextCursor, keys] = body.result || ['0', []]
  return { cursor: nextCursor, keys: keys || [] }
}

async function upstashMGet(keys: string[]): Promise<(string | null)[]> {
  if (keys.length === 0) return []
  const pathKeys = keys.map((k) => encodeURIComponent(k)).join('/')
  const res = await fetch(`${REST_URL}/mget/${pathKeys}`, {
    headers: { Authorization: `Bearer ${REST_TOKEN}` },
    cache: 'no-store',
  })
  if (!res.ok) {
    const text = await res.text()
    throw new Error(`Upstash MGET failed: ${res.status} ${text}`)
  }
  const body = (await res.json()) as { result?: (string | null)[] }
  return (body as any)?.result ?? []
}

async function getAllKeysAndValues(pattern = '*') {
  const keys: string[] = []
  let cursor = '0'

  do {
    const reply = await upstashScan(cursor, pattern, 100)
    cursor = reply.cursor
    keys.push(...reply.keys)
  } while (cursor !== '0')

  if (keys.length === 0) return {}

  const values = await upstashMGet(keys)

  console.log(keys, values[0])

  return keys.reduce<Record<string, BlogStats | null>>((acc, key, i) => {
    acc[key] = values[i] ? JSON.parse(values[i]) : null
    return acc
  }, {})
}

export async function getBlogStatsBySlug(slug: string): Promise<BlogStats> {
  const data = (await upstashGet(`blog-stats:${slug}`)) || '{}'
  return JSON.parse(data) || { likes: 0, views: 0, likedBy: [] }
}

// Write stats to file
export async function writeBlogStats(slug: string, stats: BlogStats): Promise<void> {
  await upstashSet(`blog-stats:${slug}`, JSON.stringify(stats))
}

// Get stats for a specific post
export async function getPostStats(slug: string): Promise<{ likes: number; views: number }> {
  const stats = await getBlogStatsBySlug(slug)
  return {
    likes: stats?.likes || 0,
    views: stats?.views || 0,
  }
}

// Increment view count
export async function incrementViews(slug: string): Promise<{ likes: number; views: number }> {
  const stats = await getBlogStatsBySlug(slug)

  stats.views += 1
  await writeBlogStats(slug, stats)

  return {
    likes: stats.likes,
    views: stats.views,
  }
}

// Toggle like (add or remove)
export async function toggleLike(
  slug: string,
  userId: string
): Promise<{
  likes: number
  views: number
  isLiked: boolean
}> {
  const stats = await getBlogStatsBySlug(slug)

  if (!stats.likedBy) {
    stats.likedBy = []
  }

  const likedBy = stats.likedBy
  const isCurrentlyLiked = likedBy.includes(userId)

  if (isCurrentlyLiked) {
    stats.likedBy = likedBy.filter((id) => id !== userId)
    stats.likes = Math.max(0, stats.likes - 1)
  } else {
    stats.likedBy.push(userId)
    stats.likes += 1
  }

  await writeBlogStats(slug, stats)

  return {
    likes: stats.likes,
    views: stats.views,
    isLiked: !isCurrentlyLiked,
  }
}

// Check if user has liked a post
export async function hasUserLiked(slug: string, userId: string): Promise<boolean> {
  const stats = await getBlogStatsBySlug(slug)
  return stats?.likedBy?.includes(userId) || false
}

// Get all posts stats (for blog list pages)
export async function getAllPostsStats(): Promise<Record<string, BlogStats | null>> {
  const stats = await getAllKeysAndValues('blog-stats:*')
  return stats
}
