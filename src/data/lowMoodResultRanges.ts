import type { ScoreRange } from '../types/quizResults'

/** Max score 56 (14 questions × 4). */
export const LOW_MOOD_SCORE_RANGES: ScoreRange[] = [
  {
    min: 0,
    max: 18,
    label: 'Your mood may feel heavy right now.',
    explanation:
      'Your answers suggest low interest, energy, sleep disruption, or disconnection from daily life may be present. This result is not a diagnosis. Small, kind steps often matter more than big changes.',
    suggestedNextStep:
      'Choose one tiny action that supports you today: a short walk, a meal, daylight, or a message to someone safe.',
  },
  {
    min: 19,
    max: 37,
    label: 'Your mood picture looks mixed.',
    explanation:
      'Your answers suggest some days or moments feel steadier while others feel flat, tired, or withdrawn. This uneven pattern is common during difficult seasons.',
    suggestedNextStep:
      'Protect one supportive habit already working, and use it on the days that feel heavier.',
  },
  {
    min: 38,
    max: 56,
    label: 'You appear to have several mood supports.',
    explanation:
      'Your answers suggest you currently have access to interest, energy, rest, or daily engagement that help steady your mood. This does not mean hard days never arrive.',
    suggestedNextStep:
      'Keep tending the routines, connections, and rest that support your emotional balance.',
  },
]
