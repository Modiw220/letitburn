import type { ScoreRange } from '../types/quizResults'

/** Max score 56 (14 questions × 4). */
export const ANXIETY_SCORE_RANGES: ScoreRange[] = [
  {
    min: 0,
    max: 18,
    label: 'Worry and tension may feel very present.',
    explanation:
      'Your answers suggest that worry, body tension, uncertainty, or avoidance may be taking up a lot of space. This result is not a diagnosis. Noticing the pattern can be a gentle starting point.',
    suggestedNextStep:
      'Name one worry without solving it, then do one grounding action such as a slow exhale or a short walk.',
  },
  {
    min: 19,
    max: 37,
    label: 'Your anxiety patterns look mixed.',
    explanation:
      'Your answers suggest some steadiness alongside moments of worry, tension, or avoidance. This is common when life includes both calm stretches and uncertainty.',
    suggestedNextStep:
      'Notice when anxiety rises most, and practice one small calming response you can repeat.',
  },
  {
    min: 38,
    max: 56,
    label: 'You appear to have several calming supports.',
    explanation:
      'Your answers suggest you currently have ways to meet worry, uncertainty, or tension without becoming fully overwhelmed. This does not mean anxious moments never appear.',
    suggestedNextStep:
      'Keep the calming habits and supportive routines that help you stay grounded when uncertainty shows up.',
  },
]
