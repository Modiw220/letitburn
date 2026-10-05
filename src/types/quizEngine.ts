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
  | 'pressure-demands'
  | 'physical-tension'
  | 'rest-recovery'
  | 'daily-overwhelm'
  | 'exhaustion'
  | 'motivation'
  | 'detachment'
  | 'workload-capacity'
  | 'worry-thinking'
  | 'anxiety-tension'
  | 'uncertainty'
  | 'avoidance-edge'
  | 'mood-interest'
  | 'energy-motivation'
  | 'sleep-rest'
  | 'daily-engagement'
  | 'thinking-style'
  | 'decision-making'
  | 'recharge-style'
  | 'communication-style'
  | 'change-approach'
  | 'closeness-comfort'
  | 'distance-response'
  | 'trust-reassurance'
  | 'emotional-bond'
  | 'rel-communication'
  | 'boundaries'
  | 'conflict-patterns'
  | 'emotional-needs'

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
  'pressure-demands',
  'physical-tension',
  'rest-recovery',
  'daily-overwhelm',
  'exhaustion',
  'motivation',
  'detachment',
  'workload-capacity',
  'worry-thinking',
  'anxiety-tension',
  'uncertainty',
  'avoidance-edge',
  'mood-interest',
  'energy-motivation',
  'sleep-rest',
  'daily-engagement',
  'thinking-style',
  'decision-making',
  'recharge-style',
  'communication-style',
  'change-approach',
  'closeness-comfort',
  'distance-response',
  'trust-reassurance',
  'emotional-bond',
  'rel-communication',
  'boundaries',
  'conflict-patterns',
  'emotional-needs',
]

export const DIMENSION_LABELS: Record<ReflectionDimension, string> = {
  'emotional-awareness': 'Emotional Awareness',
  'energy-rest': 'Energy and Rest',
  connection: 'Connection',
  'coping-recovery': 'Coping and Recovery',
  'pressure-demands': 'Pressure and Demands',
  'physical-tension': 'Physical Tension',
  'rest-recovery': 'Rest and Recovery',
  'daily-overwhelm': 'Daily Overwhelm',
  exhaustion: 'Exhaustion',
  motivation: 'Motivation',
  detachment: 'Detachment',
  'workload-capacity': 'Workload and Capacity',
  'worry-thinking': 'Worry and Thinking',
  'anxiety-tension': 'Body Tension',
  uncertainty: 'Uncertainty',
  'avoidance-edge': 'Avoidance and Edge',
  'mood-interest': 'Mood and Interest',
  'energy-motivation': 'Energy and Motivation',
  'sleep-rest': 'Sleep and Rest',
  'daily-engagement': 'Daily Engagement',
  'thinking-style': 'Thinking Style',
  'decision-making': 'Decision Making',
  'recharge-style': 'Recharge Style',
  'communication-style': 'Communication Style',
  'change-approach': 'Approach to Change',
  'closeness-comfort': 'Comfort with Closeness',
  'distance-response': 'Response to Distance',
  'trust-reassurance': 'Trust and Reassurance',
  'emotional-bond': 'Emotional Bond',
  'rel-communication': 'Communication',
  boundaries: 'Boundaries',
  'conflict-patterns': 'Conflict Patterns',
  'emotional-needs': 'Emotional Needs',
}

export function getQuizDimensions(questions: QuizQuestion[]): ReflectionDimension[] {
  const seen = new Set<ReflectionDimension>()
  const order: ReflectionDimension[] = []
  for (const question of questions) {
    if (!seen.has(question.dimension)) {
      seen.add(question.dimension)
      order.push(question.dimension)
    }
  }
  return order
}
