type Locale = 'en' | 'pt'

export interface QuizQuestion {
  question: string
  options: string[]
  correct: number
}

const questions: Record<Locale, QuizQuestion[]> = {
  en: [
    {
      question: 'Which caching strategy writes data to cache and database simultaneously?',
      options: ['A) Cache-Aside', 'B) Write-Through', 'C) Write-Behind', 'D) Read-Through'],
      correct: 1,
    },
    {
      question: 'What does CAP theorem state about distributed systems?',
      options: [
        'A) You can have all three: Consistency, Availability, Partition Tolerance',
        'B) You can only choose two of: Consistency, Availability, Partition Tolerance',
        'C) Distributed systems are always consistent',
        'D) Partition tolerance is optional',
      ],
      correct: 1,
    },
    {
      question:
        'Which message queue pattern ensures each message is processed by exactly one consumer?',
      options: ['A) Pub/Sub', 'B) Fan-out', 'C) Competing Consumers', 'D) Event Sourcing'],
      correct: 2,
    },
    {
      question: 'What is the time complexity of searching in a balanced BST?',
      options: ['A) O(1)', 'B) O(n)', 'C) O(log n)', 'D) O(n log n)'],
      correct: 2,
    },
    {
      question: 'Which database isolation level prevents phantom reads?',
      options: [
        'A) Read Uncommitted',
        'B) Read Committed',
        'C) Repeatable Read',
        'D) Serializable',
      ],
      correct: 3,
    },
    {
      question: 'What does a reverse proxy do?',
      options: [
        'A) Caches client responses',
        'B) Forwards client requests to backend servers',
        'C) Encrypts database connections',
        'D) Manages DNS records',
      ],
      correct: 1,
    },
    {
      question: 'In REST, which HTTP method is idempotent?',
      options: ['A) POST', 'B) PATCH', 'C) PUT', 'D) None of the above'],
      correct: 2,
    },
    {
      question: 'What is the purpose of database sharding?',
      options: [
        'A) Data encryption',
        'B) Horizontal partitioning across multiple servers',
        'C) Creating database backups',
        'D) Query optimization',
      ],
      correct: 1,
    },
  ],
  pt: [
    {
      question: 'Qual estratégia de caching escreve dados no cache e banco simultaneamente?',
      options: ['A) Cache-Aside', 'B) Write-Through', 'C) Write-Behind', 'D) Read-Through'],
      correct: 1,
    },
    {
      question: 'O que o teorema CAP afirma sobre sistemas distribuídos?',
      options: [
        'A) Você pode ter todos os três: Consistência, Disponibilidade, Tolerância a Partição',
        'B) Você só pode escolher dois: Consistência, Disponibilidade, Tolerância a Partição',
        'C) Sistemas distribuídos são sempre consistentes',
        'D) Tolerância a partição é opcional',
      ],
      correct: 1,
    },
    {
      question:
        'Qual padrão de fila garante que cada mensagem é processada por apenas um consumidor?',
      options: ['A) Pub/Sub', 'B) Fan-out', 'C) Competing Consumers', 'D) Event Sourcing'],
      correct: 2,
    },
    {
      question: 'Qual a complexidade de busca em uma BST balanceada?',
      options: ['A) O(1)', 'B) O(n)', 'C) O(log n)', 'D) O(n log n)'],
      correct: 2,
    },
    {
      question: 'Qual nível de isolamento de banco previne leituras fantasma?',
      options: [
        'A) Read Uncommitted',
        'B) Read Committed',
        'C) Repeatable Read',
        'D) Serializable',
      ],
      correct: 3,
    },
    {
      question: 'O que um reverse proxy faz?',
      options: [
        'A) Faz cache das respostas do cliente',
        'B) Encaminha requisições do cliente para servidores backend',
        'C) Criptografa conexões de banco de dados',
        'D) Gerencia registros DNS',
      ],
      correct: 1,
    },
    {
      question: 'Em REST, qual método HTTP é idempotente?',
      options: ['A) POST', 'B) PATCH', 'C) PUT', 'D) Nenhum dos anteriores'],
      correct: 2,
    },
    {
      question: 'Qual o propósito do sharding de banco de dados?',
      options: [
        'A) Criptografia de dados',
        'B) Particionamento horizontal em múltiplos servidores',
        'C) Criar backups do banco de dados',
        'D) Otimização de queries',
      ],
      correct: 1,
    },
  ],
}

export interface QuizState {
  questions: QuizQuestion[]
  currentIndex: number
  score: number
  finished: boolean
  lastAnswer: string
}

export function startQuiz(locale: Locale): QuizState {
  const allQuestions = [...questions[locale]]
  // Shuffle and pick 5
  const shuffled = allQuestions.sort(() => Math.random() - 0.5).slice(0, 5)
  return {
    questions: shuffled,
    currentIndex: 0,
    score: 0,
    finished: false,
    lastAnswer: '',
  }
}

export function answerQuiz(state: QuizState, answer: string): QuizState {
  const answerIndex = answer.toUpperCase().charCodeAt(0) - 65 // A=0, B=1, C=2, D=3

  if (answerIndex < 0 || answerIndex > 3) {
    return { ...state, lastAnswer: 'invalid' }
  }

  const current = state.questions[state.currentIndex]
  const isCorrect = answerIndex === current.correct
  const newScore = isCorrect ? state.score + 1 : state.score
  const nextIndex = state.currentIndex + 1
  const finished = nextIndex >= state.questions.length

  return {
    ...state,
    score: newScore,
    currentIndex: nextIndex,
    finished,
    lastAnswer: isCorrect ? 'correct' : 'wrong',
  }
}
