import { useCallback, useMemo, useState } from 'react'
import { getCategoryFilterLabel } from '../data/quizCategories'
import { quizzes } from '../data/quizzes'
import type { QuizCategory, QuizItem } from '../types/quizzes'

export type QuizFilterCategory = 'all' | QuizCategory

function matchesSearch(quiz: QuizItem, searchTerm: string): boolean {
  const query = searchTerm.trim().toLowerCase()
  if (!query) return true

  const haystack = [
    quiz.title,
    quiz.description,
    quiz.category,
    ...quiz.tags,
  ]
    .join(' ')
    .toLowerCase()

  return haystack.includes(query)
}

export function useQuizSearch(initial = '') {
  const [searchTerm, setSearchTerm] = useState(initial)

  const clearSearch = useCallback(() => {
    setSearchTerm('')
  }, [])

  return { searchTerm, setSearchTerm, clearSearch }
}

export function useQuizFilters(searchTerm: string) {
  const [category, setCategory] = useState<QuizFilterCategory>('all')

  const filteredQuizzes = useMemo(() => {
    return quizzes.filter((quiz) => {
      const categoryMatch = category === 'all' || quiz.category === category
      const searchMatch = matchesSearch(quiz, searchTerm)
      return categoryMatch && searchMatch
    })
  }, [category, searchTerm])

  const resultLabel = useMemo(() => {
    const count = filteredQuizzes.length
    const query = searchTerm.trim()

    if (count === 0) {
      return query ? 'No quizzes match your search' : 'No quizzes found'
    }

    if (query) {
      return `Showing ${count} quiz${count === 1 ? '' : 'es'} matching "${query}"`
    }

    if (category === 'all') {
      return `Showing ${count} quiz${count === 1 ? '' : 'es'}`
    }

    const categoryName = getCategoryFilterLabel(category)
    return `Showing ${count} ${categoryName} quiz${count === 1 ? '' : 'zes'}`
  }, [category, filteredQuizzes.length, searchTerm])

  const resetFilters = useCallback(() => {
    setCategory('all')
  }, [])

  return {
    category,
    setCategory,
    filteredQuizzes,
    resultCount: filteredQuizzes.length,
    resultLabel,
    resetFilters,
  }
}
