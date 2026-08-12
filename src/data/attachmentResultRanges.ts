import type { ScoreRange } from '../types/quizResults'

/** Max score 72 (18 questions × 4). */
export const ATTACHMENT_SCORE_RANGES: ScoreRange[] = [
  {
    min: 0,
    max: 23,
    label: 'Closeness and trust may feel difficult right now.',
    explanation:
      'Your answers suggest that comfort with closeness, distance, trust, or reassurance may feel strained. This result is not a diagnosis. Attachment patterns often soften with safety and time.',
    suggestedNextStep:
      'Choose one relationship that feels relatively safe and practice a small, honest check-in.',
  },
  {
    min: 24,
    max: 47,
    label: 'Your attachment patterns look mixed.',
    explanation:
      'Your answers suggest some ease with connection alongside moments of distance, doubt, or need for reassurance. Mixed patterns are common and can shift with context.',
    suggestedNextStep:
      'Notice what helps you feel safer in connection, and name that need gently when it arises.',
  },
  {
    min: 48,
    max: 72,
    label: 'You appear to have several connection supports.',
    explanation:
      'Your answers suggest you currently have ways to handle closeness, distance, trust, and emotional bonding with some steadiness. This does not mean relationships never feel hard.',
    suggestedNextStep:
      'Protect the relationships and habits that help you feel secure without losing yourself.',
  },
]
