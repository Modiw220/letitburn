export type QuizCategory =
  | 'wellbeing'
  | 'stress-mood'
  | 'personality'
  | 'relationships'

export type QuizAccent =
  | 'cyan'
  | 'blue'
  | 'orange'
  | 'purple'
  | 'muted-blue'
  | 'lavender'
  | 'pink'
  | 'green'

export type QuizIconName =
  | 'heart-pulse'
  | 'gauge'
  | 'battery-low'
  | 'cloud'
  | 'cloud-rain'
  | 'sparkles'
  | 'heart-handshake'
  | 'users'

export interface QuizItem {
  id: string
  slug: string
  title: string
  description: string
  category: QuizCategory
  estimatedMinutes: number
  questionCount: number
  icon: QuizIconName
  accent: QuizAccent
  tags: string[]
  freeResultLabel: string
  fullReportLabel: string
  basicResultFree: boolean
  fullReportAvailable: boolean
  reportPrice: number
  currency: 'USD'
  featured?: boolean
}

export interface QuizCategoryOption {
  id: 'all' | QuizCategory
  label: string
  description?: string
}

export interface QuizPricing {
  amount: number
  currency: 'USD'
  display: string
}

export interface QuizFaqItem {
  id: string
  question: string
  answer: string
}
