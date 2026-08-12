import type { ScoreRange } from '../types/quizResults'
import { EMOTIONAL_WELLBEING_SCORE_RANGES } from './emotionalWellbeingResultRanges'
import { STRESS_LEVEL_SCORE_RANGES } from './stressLevelResultRanges'
import { BURNOUT_SCORE_RANGES } from './burnoutResultRanges'
import { ANXIETY_SCORE_RANGES } from './anxietyResultRanges'
import { LOW_MOOD_SCORE_RANGES } from './lowMoodResultRanges'
import { PERSONALITY_SCORE_RANGES } from './personalityResultRanges'
import { ATTACHMENT_SCORE_RANGES } from './attachmentResultRanges'
import { RELATIONSHIP_PATTERNS_SCORE_RANGES } from './relationshipPatternsResultRanges'

const SCORE_RANGES_BY_QUIZ_ID: Record<string, ScoreRange[]> = {
  'emotional-wellbeing': EMOTIONAL_WELLBEING_SCORE_RANGES,
  'stress-level': STRESS_LEVEL_SCORE_RANGES,
  burnout: BURNOUT_SCORE_RANGES,
  'anxiety-reflection': ANXIETY_SCORE_RANGES,
  'low-mood-reflection': LOW_MOOD_SCORE_RANGES,
  personality: PERSONALITY_SCORE_RANGES,
  'attachment-style': ATTACHMENT_SCORE_RANGES,
  'relationship-patterns': RELATIONSHIP_PATTERNS_SCORE_RANGES,
}

export function getScoreRangesForQuiz(quizId: string): ScoreRange[] {
  const ranges = SCORE_RANGES_BY_QUIZ_ID[quizId]
  if (!ranges) {
    throw new Error(`No score ranges registered for quiz: ${quizId}`)
  }
  return ranges
}
