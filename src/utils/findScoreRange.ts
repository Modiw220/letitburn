import type { ScoreRange } from '../types/quizResults'

export function findScoreRange(
  totalScore: number,
  ranges: ScoreRange[],
): ScoreRange {
  const match = ranges.find(
    (range) => totalScore >= range.min && totalScore <= range.max,
  )
  if (!match) {
    throw new Error('No score range matched')
  }
  return match
}
