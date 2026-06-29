const codeSnippets = [
  'const server = express()',
  'func main() { fmt.Println("Hello") }',
  'SELECT * FROM users WHERE active = true',
  'docker compose up -d',
  'git rebase -i HEAD~3',
  'import { useState } from "react"',
  'app.use(cors({ origin: "*" }))',
  'async function fetchData() {}',
  'kubectl get pods --all-namespaces',
  'npm install --save-dev typescript',
  'CREATE INDEX idx_email ON users(email)',
  'export default function handler(req, res) {}',
  'python -m pytest tests/ -v',
  'aws s3 cp ./build s3://bucket --recursive',
  'go mod tidy && go build ./...',
]

export interface TypingGameState {
  snippet: string
  startTime: number
  typed: string
  finished: boolean
  wpm: number
  accuracy: number
}

export function startTypingGame(): TypingGameState {
  const snippet = codeSnippets[Math.floor(Math.random() * codeSnippets.length)]
  return {
    snippet,
    startTime: Date.now(),
    typed: '',
    finished: false,
    wpm: 0,
    accuracy: 0,
  }
}

export function processTypingInput(state: TypingGameState, input: string): TypingGameState {
  const elapsed = (Date.now() - state.startTime) / 1000 / 60 // minutes
  const words = input.length / 5 // standard word length
  const wpm = elapsed > 0 ? Math.round(words / elapsed) : 0

  let correctChars = 0
  for (let i = 0; i < input.length; i++) {
    if (input[i] === state.snippet[i]) correctChars++
  }
  const accuracy = input.length > 0 ? Math.round((correctChars / input.length) * 100) : 100

  const finished = input.length >= state.snippet.length

  if (finished) {
    const scores = getLeaderboard()
    scores.push({ wpm, accuracy, date: new Date().toISOString() })
    scores.sort((a, b) => b.wpm - a.wpm)
    if (typeof window !== 'undefined') {
      localStorage.setItem('typing-scores', JSON.stringify(scores.slice(0, 10)))
    }
  }

  return { ...state, typed: input, finished, wpm, accuracy }
}

export function getLeaderboard(): Array<{ wpm: number; accuracy: number; date: string }> {
  if (typeof window === 'undefined') return []
  try {
    const data = localStorage.getItem('typing-scores')
    return data ? JSON.parse(data) : []
  } catch {
    return []
  }
}
