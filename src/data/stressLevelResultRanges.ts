import type { ScoreRange } from '../types/quizResults'

/** Max score 40 (10 questions × 4). */
export const STRESS_LEVEL_SCORE_RANGES: ScoreRange[] = [
  {
    min: 0,
    max: 13,
    label: 'Stress may be weighing heavily right now.',
    explanation:
      'Your answers suggest that pressure, tension, or limited recovery may be taking up a lot of space. This result is not a diagnosis. It may help to focus on one small way to reduce load rather than trying to fix everything at once.',
    suggestedNextStep:
      'Choose one demand you can delay, shorten, or share, then give yourself a short pause afterward.',
  },
  {
    min: 14,
    max: 26,
    label: 'Your stress picture looks mixed.',
    explanation:
      'Your answers suggest that some parts of your day feel manageable while others feel stretched. This is common when rest and demand are uneven.',
    suggestedNextStep:
      'Notice which part of your day feels most pressured, and protect one small recovery moment around it.',
  },
  {
    min: 27,
    max: 40,
    label: 'You appear to have several ways to handle pressure.',
    explanation:
      'Your answers suggest you currently have access to rest, perspective, or coping habits that help under demand. This does not mean stress never appears.',
    suggestedNextStep:
      'Keep protecting the rest and boundaries that help you stay steady when pressure rises.',
  },
]
