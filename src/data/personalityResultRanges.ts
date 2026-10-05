import type { ScoreRange } from '../types/quizResults'

/** Max score 96 (24 questions × 4). */
export const PERSONALITY_SCORE_RANGES: ScoreRange[] = [
  {
    min: 0,
    max: 31,
    label: 'Your preferences may feel less clear right now.',
    explanation:
      'Your answers suggest that how you think, decide, recharge, communicate, or meet change may feel inconsistent or hard to name at the moment. Preferences can shift with stress and life stage.',
    suggestedNextStep:
      'Pick one preference that feels most true today and give yourself permission to honor it in a small way.',
  },
  {
    min: 32,
    max: 63,
    label: 'Your personality patterns look mixed.',
    explanation:
      'Your answers suggest a blend of styles across thinking, decisions, energy, communication, and change. Many people carry both flexible and fixed preferences depending on context.',
    suggestedNextStep:
      'Notice which setting brings out your steadiest style, and use that insight when choices feel messy.',
  },
  {
    min: 64,
    max: 96,
    label: 'You appear to have clear personal patterns.',
    explanation:
      'Your answers suggest you currently recognize several consistent preferences in how you think, decide, recharge, communicate, and approach change. Clarity can be a useful guide, not a box.',
    suggestedNextStep:
      'Use your clearest preferences to shape environments and relationships that fit you better.',
  },
]
