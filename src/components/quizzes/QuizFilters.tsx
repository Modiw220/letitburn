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
    <div className="rounded-[24px] border border-border-card bg-bg-card/45 p-4 md:p-5">
      <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-calm-cyan">
            Filter gently
          </p>
          <p className="mt-2 text-sm text-text-muted">
            Browse by mood, topic, or whatever feels easiest to start with.
          </p>
        </div>
        <p className="text-sm text-text-muted" aria-live="polite" aria-atomic="true">
          {resultLabel}
        </p>
      </div>

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
    </div>
  )
}
