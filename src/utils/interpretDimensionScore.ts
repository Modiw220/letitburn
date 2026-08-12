import type { DimensionInterpretation } from '../types/quizResults'

export function interpretDimensionScore(
  score: number,
  maximumScore = 12,
): DimensionInterpretation {
  if (maximumScore <= 0) return 'mixed'
  const ratio = score / maximumScore
  if (ratio <= 0.25) return 'needs-attention'
  if (ratio <= 0.66) return 'mixed'
  return 'supportive'
}

export function getDimensionInterpretationLabel(
  interpretation: DimensionInterpretation,
): string {
  switch (interpretation) {
    case 'needs-attention':
      return 'Needs gentle attention'
    case 'mixed':
      return 'Developing or mixed'
    case 'supportive':
      return 'Currently supportive'
  }
}
