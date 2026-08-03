import { Search } from 'lucide-react'

interface QuizEmptyStateProps {
  onClearSearch: () => void
  onViewAll: () => void
  hasSearch: boolean
}

export default function QuizEmptyState({
  onClearSearch,
  onViewAll,
  hasSearch,
}: QuizEmptyStateProps) {
  return (
    <div className="col-span-full flex flex-col items-center rounded-2xl border border-dashed border-white/10 bg-white/[0.02] px-6 py-14 text-center">
      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white/5 text-text-muted">
        <Search className="h-6 w-6" aria-hidden="true" />
      </div>
      <h3 className="mt-5 font-heading text-xl font-semibold text-text-main">No quizzes found.</h3>
      <p className="mt-2 max-w-md text-sm text-text-muted">
        Try another category or clear your search.
      </p>
      <div className="mt-6 flex flex-wrap justify-center gap-3">
        {hasSearch && (
          <button
            type="button"
            className="min-h-[44px] rounded-xl border border-white/15 px-5 py-2.5 text-sm font-medium text-text-main transition-colors hover:bg-white/5"
            onClick={onClearSearch}
          >
            Clear Search
          </button>
        )}
        <button
          type="button"
          className="min-h-[44px] rounded-xl border border-calm-cyan/30 bg-calm-cyan/10 px-5 py-2.5 text-sm font-semibold text-calm-cyan transition-colors hover:bg-calm-cyan/15"
          onClick={onViewAll}
        >
          View All Quizzes
        </button>
      </div>
    </div>
  )
}
