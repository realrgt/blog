'use client'

import { useState, useRef, useEffect, useCallback, type KeyboardEvent } from 'react'
import { useParams } from 'next/navigation'
import { LocaleTypes } from 'app/[locale]/i18n/settings'
import { executeCommand } from './commands/portfolio'
import { SnakeState, initSnake, changeDirection, tick, renderGrid } from './commands/snake'
import {
  TypingGameState,
  startTypingGame,
  processTypingInput,
  getLeaderboard,
} from './commands/typingGame'
import { QuizState, startQuiz, answerQuiz } from './commands/quiz'

interface TerminalLine {
  type: 'input' | 'output'
  content: string
}

type GameMode = null | 'snake' | 'typing' | 'quiz'

export default function Terminal() {
  const locale = (useParams()?.locale as LocaleTypes) || 'en'
  const [lines, setLines] = useState<TerminalLine[]>([
    {
      type: 'output',
      content:
        locale === 'pt'
          ? 'Bem-vindo ao terminal de Ergito Vilanculos!\nDigite "help" para ver os comandos disponíveis.'
          : 'Welcome to Ergito Vilanculos\' terminal!\nType "help" to see available commands.',
    },
  ])
  const [input, setInput] = useState('')
  const [history, setHistory] = useState<string[]>([])
  const [historyIndex, setHistoryIndex] = useState(-1)
  const [gameMode, setGameMode] = useState<GameMode>(null)
  const [snakeState, setSnakeState] = useState<SnakeState | null>(null)
  const [typingState, setTypingState] = useState<TypingGameState | null>(null)
  const [quizState, setQuizState] = useState<QuizState | null>(null)

  const inputRef = useRef<HTMLInputElement>(null)
  const terminalRef = useRef<HTMLDivElement>(null)
  const snakeIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const scrollToBottom = useCallback(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight
    }
  }, [])

  useEffect(() => {
    scrollToBottom()
  }, [lines, scrollToBottom])

  // Snake game loop
  useEffect(() => {
    if (gameMode === 'snake' && snakeState && !snakeState.gameOver) {
      snakeIntervalRef.current = setInterval(() => {
        setSnakeState((prev) => {
          if (!prev) return prev
          const next = tick(prev)
          if (next.gameOver) {
            setLines((l) => [
              ...l,
              {
                type: 'output',
                content: `${renderGrid(next)}\n\nGAME OVER! Score: ${next.score}\n${locale === 'pt' ? 'Digite qualquer comando para continuar.' : 'Type any command to continue.'}`,
              },
            ])
            setGameMode(null)
          } else {
            // Update the last line with new grid
            setLines((l) => {
              const newLines = [...l]
              newLines[newLines.length - 1] = { type: 'output', content: renderGrid(next) }
              return newLines
            })
          }
          return next
        })
      }, 150)
      return () => {
        if (snakeIntervalRef.current) clearInterval(snakeIntervalRef.current)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gameMode, snakeState?.gameOver, locale])

  // Focus terminal on click
  const handleTerminalClick = () => {
    inputRef.current?.focus()
  }

  // Snake keyboard
  useEffect(() => {
    if (gameMode !== 'snake') return
    const handleKeyDown = (e: globalThis.KeyboardEvent) => {
      const dirMap: Record<string, 'UP' | 'DOWN' | 'LEFT' | 'RIGHT'> = {
        ArrowUp: 'UP',
        ArrowDown: 'DOWN',
        ArrowLeft: 'LEFT',
        ArrowRight: 'RIGHT',
      }
      if (dirMap[e.key]) {
        e.preventDefault()
        setSnakeState((prev) => (prev ? changeDirection(prev, dirMap[e.key]) : prev))
      }
      if (e.key === 'Escape') {
        if (snakeIntervalRef.current) clearInterval(snakeIntervalRef.current)
        setGameMode(null)
        setSnakeState(null)
        setLines((l) => [...l, { type: 'output', content: 'Game exited.' }])
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [gameMode])

  const handleSubmit = () => {
    const trimmed = input.trim()
    if (!trimmed) return

    // Add to history
    setHistory((prev) => [trimmed, ...prev])
    setHistoryIndex(-1)

    // Handle typing game mode
    if (gameMode === 'typing' && typingState) {
      if (trimmed.toLowerCase() === 'exit' || trimmed.toLowerCase() === 'quit') {
        setGameMode(null)
        setTypingState(null)
        setLines((l) => [
          ...l,
          { type: 'input', content: trimmed },
          { type: 'output', content: 'Game exited.' },
        ])
        setInput('')
        return
      }
      const result = processTypingInput(typingState, trimmed)
      setTypingState(result)
      if (result.finished) {
        const scores = getLeaderboard()
        const leaderboard = scores
          .slice(0, 5)
          .map((s, i) => `  ${i + 1}. ${s.wpm} WPM (${s.accuracy}%)`)
          .join('\n')
        setLines((l) => [
          ...l,
          { type: 'input', content: trimmed },
          {
            type: 'output',
            content: `${locale === 'pt' ? 'Concluído' : 'Finished'}! WPM: ${result.wpm} | ${locale === 'pt' ? 'Precisão' : 'Accuracy'}: ${result.accuracy}%\n\n${locale === 'pt' ? 'Placar' : 'Leaderboard'}:\n${leaderboard || '  (empty)'}`,
          },
        ])
        setGameMode(null)
        setTypingState(null)
      } else {
        setLines((l) => [
          ...l,
          { type: 'input', content: trimmed },
          {
            type: 'output',
            content: `WPM: ${result.wpm} | ${locale === 'pt' ? 'Precisão' : 'Accuracy'}: ${result.accuracy}%\n${locale === 'pt' ? 'Continue digitando' : 'Keep typing'}...`,
          },
        ])
      }
      setInput('')
      return
    }

    // Handle quiz mode
    if (gameMode === 'quiz' && quizState) {
      if (trimmed.toLowerCase() === 'exit' || trimmed.toLowerCase() === 'quit') {
        setGameMode(null)
        setQuizState(null)
        setLines((l) => [
          ...l,
          { type: 'input', content: trimmed },
          { type: 'output', content: 'Quiz exited.' },
        ])
        setInput('')
        return
      }
      const result = answerQuiz(quizState, trimmed)
      setQuizState(result)
      if (result.lastAnswer === 'invalid') {
        setLines((l) => [
          ...l,
          { type: 'input', content: trimmed },
          {
            type: 'output',
            content: locale === 'pt' ? 'Digite A, B, C ou D.' : 'Please type A, B, C, or D.',
          },
        ])
      } else if (result.finished) {
        setLines((l) => [
          ...l,
          { type: 'input', content: trimmed },
          {
            type: 'output',
            content: `${result.lastAnswer === 'correct' ? '✓' : '✗'}\n\n${locale === 'pt' ? 'Quiz finalizado' : 'Quiz finished'}! ${locale === 'pt' ? 'Pontuação' : 'Score'}: ${result.score}/${result.questions.length}`,
          },
        ])
        setGameMode(null)
        setQuizState(null)
      } else {
        const q = result.questions[result.currentIndex]
        setLines((l) => [
          ...l,
          { type: 'input', content: trimmed },
          {
            type: 'output',
            content: `${result.lastAnswer === 'correct' ? '✓ Correct!' : `✗ Wrong!`}\n\nQ${result.currentIndex + 1}/${result.questions.length}: ${q.question}\n${q.options.join('\n')}`,
          },
        ])
      }
      setInput('')
      return
    }

    // Normal command execution
    const { output, special } = executeCommand(trimmed, locale as 'en' | 'pt')

    if (special === 'clear') {
      setLines([])
      setInput('')
      return
    }

    if (special === 'snake') {
      const state = initSnake()
      setSnakeState(state)
      setGameMode('snake')
      setLines((l) => [
        ...l,
        { type: 'input', content: trimmed },
        {
          type: 'output',
          content: `${locale === 'pt' ? 'Use as setas para mover. ESC para sair.' : 'Use arrow keys to move. ESC to exit.'}\n\n${renderGrid(state)}`,
        },
      ])
      setInput('')
      return
    }

    if (special === 'typing') {
      const state = startTypingGame()
      setTypingState(state)
      setGameMode('typing')
      setLines((l) => [
        ...l,
        { type: 'input', content: trimmed },
        {
          type: 'output',
          content: `${locale === 'pt' ? 'Jogo de digitação! Digite o texto abaixo:' : 'Typing game! Type the text below:'}\n\n> ${state.snippet}\n\n${locale === 'pt' ? 'Digite "exit" para sair.' : 'Type "exit" to quit.'}`,
        },
      ])
      setInput('')
      return
    }

    if (special === 'resume') {
      if (typeof window !== 'undefined') {
        window.open('https://app.rezi.ai/s/Qz2Kx6ASqfyR4A7LQeCi', '_blank')
      }
      setLines((l) => [
        ...l,
        { type: 'input', content: trimmed },
        {
          type: 'output',
          content: output,
        },
      ])
      setInput('')
      return
    }

    if (special === 'quiz') {
      const state = startQuiz(locale as 'en' | 'pt')
      setQuizState(state)
      setGameMode('quiz')
      const q = state.questions[0]
      setLines((l) => [
        ...l,
        { type: 'input', content: trimmed },
        {
          type: 'output',
          content: `${locale === 'pt' ? 'Quiz de tecnologia! Responda com A, B, C ou D.' : 'Tech quiz! Answer with A, B, C, or D.'}\n${locale === 'pt' ? 'Digite "exit" para sair.' : 'Type "exit" to quit.'}\n\nQ1/${state.questions.length}: ${q.question}\n${q.options.join('\n')}`,
        },
      ])
      setInput('')
      return
    }

    setLines((l) => [
      ...l,
      { type: 'input', content: trimmed },
      { type: 'output', content: output },
    ])
    setInput('')
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSubmit()
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      if (history.length > 0 && historyIndex < history.length - 1) {
        const newIndex = historyIndex + 1
        setHistoryIndex(newIndex)
        setInput(history[newIndex])
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault()
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1
        setHistoryIndex(newIndex)
        setInput(history[newIndex])
      } else {
        setHistoryIndex(-1)
        setInput('')
      }
    }
  }

  return (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
    <div
      className="mx-auto max-w-3xl overflow-hidden rounded-xl border border-gray-700 bg-gray-950 shadow-2xl"
      onClick={handleTerminalClick}
    >
      {/* Title bar */}
      <div className="flex items-center gap-2 border-b border-gray-700 bg-gray-900 px-4 py-2.5">
        <div className="h-3 w-3 rounded-full bg-red-500" />
        <div className="h-3 w-3 rounded-full bg-yellow-500" />
        <div className="h-3 w-3 rounded-full bg-green-500" />
        <span className="ml-2 text-sm text-gray-400">ergito@portfolio ~ %</span>
      </div>

      {/* Terminal content */}
      <div
        ref={terminalRef}
        className="h-[400px] overflow-y-auto p-4 font-mono text-sm md:h-[500px]"
      >
        {/* Scanline effect */}
        <div className="pointer-events-none absolute inset-0 bg-[repeating-linear-gradient(0deg,rgba(0,255,0,0.03)_0px,rgba(0,255,0,0.03)_1px,transparent_1px,transparent_2px)]" />

        {lines.map((line, i) => (
          <div key={i} className="mb-1">
            {line.type === 'input' ? (
              <div className="text-green-400">
                <span className="text-primary-500">$ </span>
                {line.content}
              </div>
            ) : (
              <pre className="whitespace-pre-wrap text-gray-300">{line.content}</pre>
            )}
          </div>
        ))}

        {/* Input line */}
        {gameMode !== 'snake' && (
          <div className="flex items-center text-green-400">
            <span className="text-primary-500">$ </span>
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              className="ml-1 flex-1 border-none bg-transparent font-mono text-sm text-green-400 caret-green-400 outline-none"
              spellCheck={false}
              autoComplete="off"
            />
            <span className="animate-pulse text-green-400">_</span>
          </div>
        )}
      </div>
    </div>
  )
}
