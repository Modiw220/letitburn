import type { DimensionInterpretation } from '../types/quizResults'

export function interpretDimensionScore(score: number): DimensionInterpretation {
  if (score <= 3) return 'needs-attention'
  if (score <= 8) return 'mixed'
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
