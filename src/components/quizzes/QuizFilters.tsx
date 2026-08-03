import { quizCategories } from '../../data/quizCategories'
import type { QuizFilterCategory } from '../../hooks/useQuizFilters'
import QuizSearch from './QuizSearch'

interface QuizFiltersProps {
  category: QuizFilterCategory
  onCategoryChange: (category: QuizFilterCategory) => void
  resultLabel: string
  searchTerm: string
  onSearchChange: (value: string) => void
  onSearchClear: () => void
}

export default function QuizFilters({
  category,
  onCategoryChange,
  resultLabel,
  searchTerm,
  onSearchChange,
  onSearchClear,
}: QuizFiltersProps) {
  return (
    <div>
      <div
        className="flex gap-2 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        role="group"
        aria-label="Quiz categories"
      >
        {quizCategories.map((option) => {
          const isSelected = category === option.id
          return (
            <button
              key={option.id}
              type="button"
              className={`min-h-[44px] shrink-0 rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
                isSelected
                  ? 'border-calm-cyan/50 bg-calm-cyan/10 text-text-main ring-1 ring-calm-cyan/30'
                  : 'border-white/10 bg-white/[0.03] text-text-muted hover:text-text-main'
              }`}
              onClick={() => onCategoryChange(option.id)}
              aria-pressed={isSelected}
            >
              {option.label}
            </button>
          )
        })}
      </div>

      <QuizSearch
        value={searchTerm}
        onChange={onSearchChange}
        onClear={onSearchClear}
      />

      <p className="mt-4 text-sm text-text-muted" aria-live="polite" aria-atomic="true">
        {resultLabel}
      </p>
    </div>
  )
}
