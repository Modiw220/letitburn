import { Search, X } from 'lucide-react'

interface QuizSearchProps {
  value: string
  onChange: (value: string) => void
  onClear: () => void
}

export default function QuizSearch({ value, onChange, onClear }: QuizSearchProps) {
  return (
    <div className="relative mt-5 max-w-md">
      <label htmlFor="quiz-search" className="sr-only">
        Search quizzes
      </label>
      <Search
        className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-text-muted"
        aria-hidden="true"
      />
      <input
        id="quiz-search"
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search quizzes"
        className="min-h-[44px] w-full rounded-xl border border-white/10 bg-bg-main/50 py-2.5 pl-10 pr-10 text-sm text-text-main placeholder:text-text-muted/70"
        autoComplete="off"
      />
      {value && (
        <button
          type="button"
          className="absolute right-1 top-1/2 flex min-h-[44px] min-w-[44px] -translate-y-1/2 items-center justify-center rounded-lg text-text-muted hover:text-text-main"
          onClick={onClear}
          aria-label="Clear search"
        >
          <X className="h-4 w-4" aria-hidden="true" />
        </button>
      )}
    </div>
  )
}
