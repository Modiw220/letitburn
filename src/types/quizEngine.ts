export type QuizStage =
  | 'intro'
  | 'questions'
  | 'review'
  | 'basic-result'
  | 'payment'
  | 'payment-verification'
  | 'full-report'
  | 'error'

export type ReflectionDimension =
  | 'emotional-awareness'
  | 'energy-rest'
  | 'connection'
  | 'coping-recovery'

export interface QuizQuestion {
  id: string
  order: number
  text: string
  dimension: ReflectionDimension
}

export interface QuizAnswerOption {
  value: 0 | 1 | 2 | 3 | 4
  label: string
}

export interface QuizAnswer {
  questionId: string
  value: 0 | 1 | 2 | 3 | 4
}

export interface QuizDefinition {
  id: string
  slug: string
  title: string
  eyebrow: string
  introHeading: string
  introDescription: string
  estimatedMinutes: number
  accentColor: string
  questions: QuizQuestion[]
}

export const ANSWER_OPTIONS: QuizAnswerOption[] = [
  { value: 0, label: 'Not at all' },
  { value: 1, label: 'Rarely' },
  { value: 2, label: 'Sometimes' },
  { value: 3, label: 'Often' },
  { value: 4, label: 'Very often' },
]

export const DIMENSION_ORDER: ReflectionDimension[] = [
  'emotional-awareness',
  'energy-rest',
  'connection',
  'coping-recovery',
]

export const DIMENSION_LABELS: Record<ReflectionDimension, string> = {
  'emotional-awareness': 'Emotional Awareness',
  'energy-rest': 'Energy and Rest',
  connection: 'Connection',
  'coping-recovery': 'Coping and Recovery',
}
