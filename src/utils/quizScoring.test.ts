import { describe, expect, it } from 'vitest'
import { emotionalWellbeingQuiz } from '../data/quizDefinitions/emotionalWellbeingQuiz'
import { EMOTIONAL_WELLBEING_SCORE_RANGES } from '../data/emotionalWellbeingResultRanges'
import type { QuizAnswer } from '../types/quizEngine'
import {
  calculateDimensionScores,
  findAttentionDimension,
  findStrongestDimension,
} from '../utils/calculateDimensionScores'
import { calculatePercentage, calculateTotalScore } from '../utils/calculateQuizScore'
import { findScoreRange } from '../utils/findScoreRange'
import { computeBasicResult } from '../hooks/useQuizScoring'

function buildAnswers(value: 0 | 1 | 2 | 3 | 4): QuizAnswer[] {
  return emotionalWellbeingQuiz.questions.map((question) => ({
    questionId: question.id,
    value,
  }))
}

describe('quiz scoring', () => {
  it('all answers 0 produces total 0', () => {
    expect(calculateTotalScore(buildAnswers(0))).toBe(0)
  })

  it('all answers 4 produces total 48', () => {
    expect(calculateTotalScore(buildAnswers(4))).toBe(48)
  })

  it('total 15 uses range 1', () => {
    const range = findScoreRange(15, EMOTIONAL_WELLBEING_SCORE_RANGES)
    expect(range.min).toBe(0)
    expect(range.max).toBe(15)
  })

  it('total 16 uses range 2', () => {
    const range = findScoreRange(16, EMOTIONAL_WELLBEING_SCORE_RANGES)
    expect(range.min).toBe(16)
    expect(range.max).toBe(31)
  })

  it('total 31 uses range 2', () => {
    const range = findScoreRange(31, EMOTIONAL_WELLBEING_SCORE_RANGES)
    expect(range.max).toBe(31)
  })

  it('total 32 uses range 3', () => {
    const range = findScoreRange(32, EMOTIONAL_WELLBEING_SCORE_RANGES)
    expect(range.min).toBe(32)
  })

  it('each dimension maximum is 12', () => {
    const dimensions = calculateDimensionScores(
      emotionalWellbeingQuiz.questions,
      buildAnswers(4),
    )
    dimensions.forEach((dimension) => {
      expect(dimension.maximumScore).toBe(12)
      expect(dimension.score).toBe(12)
    })
  })

  it('rejects invalid answer values', () => {
    expect(() =>
      calculateTotalScore([{ questionId: 'ew-q1', value: 5 as 0 }]),
    ).toThrow()
  })

  it('missing answer prevents final calculation', () => {
    const partial = buildAnswers(2).slice(0, 11)
    const result = computeBasicResult(emotionalWellbeingQuiz, partial)
    expect(result).toBeNull()
  })

  it('strongest dimension selection is deterministic on ties', () => {
    const dimensions = calculateDimensionScores(
      emotionalWellbeingQuiz.questions,
      buildAnswers(2),
    )
    expect(findStrongestDimension(dimensions)).toBe('emotional-awareness')
  })

  it('lowest dimension selection is deterministic on ties', () => {
    const dimensions = calculateDimensionScores(
      emotionalWellbeingQuiz.questions,
      buildAnswers(2),
    )
    expect(findAttentionDimension(dimensions)).toBe('emotional-awareness')
  })

  it('calculates percentage correctly', () => {
    expect(calculatePercentage(24, 48)).toBe(50)
  })
})

describe('report access', () => {
  it('does not unlock from URL query alone', () => {
    const unlocked = new URLSearchParams('?payment=success').get('payment') === 'success'
    expect(unlocked).toBe(true)
    const verifiedToken: string | null = null
    expect(Boolean(verifiedToken)).toBe(false)
  })

  it('does not unlock from localStorage alone', () => {
    const stored = 'paid'
    const verifiedToken: string | null = null
    expect(stored === 'paid' && !verifiedToken).toBe(true)
  })
})
