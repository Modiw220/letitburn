import { emotionalWellbeingQuiz } from './emotionalWellbeingQuiz'
import { stressLevelQuiz } from './stressLevelQuiz'
import { burnoutQuiz } from './burnoutQuiz'
import { anxietySelfReflectionQuiz } from './anxietySelfReflectionQuiz'
import { lowMoodSelfReflectionQuiz } from './lowMoodSelfReflectionQuiz'
import { personalityTestQuiz } from './personalityTestQuiz'
import { attachmentStyleQuiz } from './attachmentStyleQuiz'
import { relationshipPatternsQuiz } from './relationshipPatternsQuiz'
import type { QuizDefinition } from '../../types/quizEngine'

export const IMPLEMENTED_QUIZ_SLUGS = [
  'emotional-wellbeing-check-in',
  'stress-level-quiz',
  'burnout-quiz',
  'anxiety-self-reflection',
  'low-mood-self-reflection',
  'personality-test',
  'attachment-style-test',
  'relationship-patterns-test',
] as const

const definitions: Record<string, QuizDefinition> = {
  [emotionalWellbeingQuiz.slug]: emotionalWellbeingQuiz,
  [stressLevelQuiz.slug]: stressLevelQuiz,
  [burnoutQuiz.slug]: burnoutQuiz,
  [anxietySelfReflectionQuiz.slug]: anxietySelfReflectionQuiz,
  [lowMoodSelfReflectionQuiz.slug]: lowMoodSelfReflectionQuiz,
  [personalityTestQuiz.slug]: personalityTestQuiz,
  [attachmentStyleQuiz.slug]: attachmentStyleQuiz,
  [relationshipPatternsQuiz.slug]: relationshipPatternsQuiz,
}

export function getQuizDefinition(slug: string): QuizDefinition | undefined {
  return definitions[slug]
}

export function isQuizImplemented(slug: string): boolean {
  return IMPLEMENTED_QUIZ_SLUGS.includes(slug as (typeof IMPLEMENTED_QUIZ_SLUGS)[number])
}
