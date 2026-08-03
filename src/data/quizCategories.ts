import type { QuizCategoryOption } from '../types/quizzes'

export const quizCategories: QuizCategoryOption[] = [
  { id: 'all', label: 'All Quizzes' },
  { id: 'wellbeing', label: 'Wellbeing', description: 'Emotional balance and self-awareness' },
  { id: 'stress-mood', label: 'Stress & Mood', description: 'Pressure, energy, and mood patterns' },
  { id: 'personality', label: 'Personality', description: 'Preferences and communication style' },
  { id: 'relationships', label: 'Relationships', description: 'Connection, trust, and patterns' },
]

export function getCategoryLabel(categoryId: string): string {
  const match = quizCategories.find((c) => c.id === categoryId)
  return match?.label ?? categoryId
}

export function getCategoryFilterLabel(categoryId: string): string {
  switch (categoryId) {
    case 'wellbeing':
      return 'wellbeing'
    case 'stress-mood':
      return 'stress and mood'
    case 'personality':
      return 'personality'
    case 'relationships':
      return 'relationship'
    default:
      return 'quiz'
  }
}
