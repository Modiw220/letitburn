import type { ScoreRange } from '../types/quizResults'

/** Max score 64 (16 questions × 4). */
export const BURNOUT_SCORE_RANGES: ScoreRange[] = [
  {
    min: 0,
    max: 21,
    label: 'You may be running on empty.',
    explanation:
      'Your answers suggest exhaustion, low motivation, or detachment may be taking a large toll. This result is not a diagnosis. It may help to treat recovery as necessary rather than optional.',
    suggestedNextStep:
      'Reduce one non-essential demand today and give yourself permission to rest without earning it.',
  },
  {
    min: 22,
    max: 42,
    label: 'Burnout signals look mixed.',
    explanation:
      'Your answers suggest some capacity remains while other areas feel drained or distant. This pattern often appears when effort has outpaced recovery for a while.',
    suggestedNextStep:
      'Identify one source of drain and one source of restoration, then protect both this week.',
  },
  {
    min: 43,
    max: 64,
    label: 'You still have meaningful energy reserves.',
    explanation:
      'Your answers suggest you currently retain motivation, connection to your work or roles, and some capacity to recover. This does not mean overload never happens.',
    suggestedNextStep:
      'Protect the rhythms and boundaries that keep your energy from slipping into chronic depletion.',
  },
]
