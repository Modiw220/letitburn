import type { ReflectionDimension } from './quizEngine'

export interface ScoreRange {
  min: number
  max: number
  label: string
  explanation: string
  suggestedNextStep: string
}

export type DimensionInterpretation = 'needs-attention' | 'mixed' | 'supportive'

export interface DimensionResult {
  dimension: ReflectionDimension
  score: number
  maximumScore: number
  interpretation: DimensionInterpretation
}

export interface BasicQuizResult {
  quizId: string
  totalScore: number
  maximumScore: number
  percentage: number
  range: ScoreRange
  dimensions: DimensionResult[]
}

export interface CalmingExercise {
  id: string
  title: string
  instructions: string
}

export interface DimensionReportSection {
  dimension: ReflectionDimension
  title: string
  score: number
  maximumScore: number
  interpretation: DimensionInterpretation
  interpretationLabel: string
  explanation: string[]
  reflectionQuestion: string
  practicalSuggestion: string
}

export interface FullReflectionReport {
  quizTitle: string
  quizSlug: string
  basicResult: BasicQuizResult
  summary: string
  dimensionBreakdowns: DimensionReportSection[]
  strongestDimension: ReflectionDimension
  attentionDimension: ReflectionDimension
  prompts: string[]
  exercises: CalmingExercise[]
  generatedAt: string
}
