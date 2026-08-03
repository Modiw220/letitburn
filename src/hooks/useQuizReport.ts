import { useCallback, useMemo } from 'react'
import { buildFullReport } from '../utils/buildFullReport'
import type { QuizDefinition } from '../types/quizEngine'
import type { BasicQuizResult, FullReflectionReport } from '../types/quizResults'

export function useQuizReport(
  definition: QuizDefinition | null,
  basicResult: BasicQuizResult | null,
) {
  const fullReport = useMemo<FullReflectionReport | null>(() => {
    if (!definition || !basicResult) return null
    return buildFullReport(definition, basicResult)
  }, [basicResult, definition])

  const createReport = useCallback(() => {
    if (!definition || !basicResult) return null
    return buildFullReport(definition, basicResult)
  }, [basicResult, definition])

  return { fullReport, createReport }
}
