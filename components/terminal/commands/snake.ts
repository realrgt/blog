export const GRID_WIDTH = 20
export const GRID_HEIGHT = 15

type Direction = 'UP' | 'DOWN' | 'LEFT' | 'RIGHT'
type Point = { x: number; y: number }

export interface SnakeState {
  snake: Point[]
  food: Point
  direction: Direction
  gameOver: boolean
  score: number
  paused: boolean
}

function randomFood(snake: Point[]): Point {
  let food: Point
  do {
    food = {
      x: Math.floor(Math.random() * GRID_WIDTH),
      y: Math.floor(Math.random() * GRID_HEIGHT),
    }
  } while (snake.some((s) => s.x === food.x && s.y === food.y))
  return food
}

export function initSnake(): SnakeState {
  const snake = [
    { x: 10, y: 7 },
    { x: 9, y: 7 },
    { x: 8, y: 7 },
  ]
  return {
    snake,
    food: randomFood(snake),
    direction: 'RIGHT',
    gameOver: false,
    score: 0,
    paused: false,
  }
}

export function changeDirection(state: SnakeState, newDir: Direction): SnakeState {
  const opposites: Record<Direction, Direction> = {
    UP: 'DOWN',
    DOWN: 'UP',
    LEFT: 'RIGHT',
    RIGHT: 'LEFT',
  }
  if (opposites[newDir] === state.direction) return state
  return { ...state, direction: newDir }
}

export function tick(state: SnakeState): SnakeState {
  if (state.gameOver || state.paused) return state

  const head = { ...state.snake[0] }

  switch (state.direction) {
    case 'UP':
      head.y--
      break
    case 'DOWN':
      head.y++
      break
    case 'LEFT':
      head.x--
      break
    case 'RIGHT':
      head.x++
      break
  }

  // Wall collision
  if (head.x < 0 || head.x >= GRID_WIDTH || head.y < 0 || head.y >= GRID_HEIGHT) {
    return { ...state, gameOver: true }
  }

  // Self collision
  if (state.snake.some((s) => s.x === head.x && s.y === head.y)) {
    return { ...state, gameOver: true }
  }

  const newSnake = [head, ...state.snake]
  let newFood = state.food
  let newScore = state.score

  if (head.x === state.food.x && head.y === state.food.y) {
    newScore++
    newFood = randomFood(newSnake)
  } else {
    newSnake.pop()
  }

  return { ...state, snake: newSnake, food: newFood, score: newScore }
}

export function renderGrid(state: SnakeState): string {
  const border = '+' + '-'.repeat(GRID_WIDTH) + '+'
  const lines: string[] = [border]

  for (let y = 0; y < GRID_HEIGHT; y++) {
    let row = '|'
    for (let x = 0; x < GRID_WIDTH; x++) {
      if (state.snake[0].x === x && state.snake[0].y === y) {
        row += '@'
      } else if (state.snake.some((s) => s.x === x && s.y === y)) {
        row += 'o'
      } else if (state.food.x === x && state.food.y === y) {
        row += '*'
      } else {
        row += ' '
      }
    }
    row += '|'
    lines.push(row)
  }

  lines.push(border)
  lines.push(`Score: ${state.score}`)
  return lines.join('\n')
}
