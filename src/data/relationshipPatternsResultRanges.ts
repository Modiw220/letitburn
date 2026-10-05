import type { ScoreRange } from '../types/quizResults'

/** Max score 80 (20 questions × 4). */
export const RELATIONSHIP_PATTERNS_SCORE_RANGES: ScoreRange[] = [
  {
    min: 0,
    max: 26,
    label: 'Relationship patterns may feel strained.',
    explanation:
      'Your answers suggest communication, boundaries, conflict, or emotional needs may currently feel difficult to navigate. This result is not a diagnosis. Patterns can change with awareness and practice.',
    suggestedNextStep:
      'Pick one relationship habit to notice this week without trying to overhaul everything.',
  },
  {
    min: 27,
    max: 53,
    label: 'Your relationship patterns look mixed.',
    explanation:
      'Your answers suggest some supportive habits alongside recurring friction in communication, boundaries, conflict, or needs. Mixed patterns often point to growth edges rather than fixed traits.',
    suggestedNextStep:
      'Identify one strength you already bring to relationships and use it to soften one harder pattern.',
  },
  {
    min: 54,
    max: 80,
    label: 'You appear to have several relational strengths.',
    explanation:
      'Your answers suggest you currently have helpful habits around communication, boundaries, conflict, or emotional needs. This does not mean every relationship feels easy.',
    suggestedNextStep:
      'Keep practicing the habits that help relationships feel respectful, clear, and emotionally safe.',
  },
]
