import { Check } from 'lucide-react'
import { ANSWER_OPTIONS } from '../../types/quizEngine'

interface QuizAnswerScaleProps {
  selected?: 0 | 1 | 2 | 3 | 4
  onSelect: (value: 0 | 1 | 2 | 3 | 4) => void
}

export default function QuizAnswerScale({ selected, onSelect }: QuizAnswerScaleProps) {
  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2" role="group" aria-label="Answer choices">
      {ANSWER_OPTIONS.map((option) => {
        const isSelected = selected === option.value
        return (
          <button
            key={option.value}
            type="button"
            className={`quiz-answer-btn flex min-h-[56px] items-center justify-between rounded-xl border px-4 py-3 text-left text-sm transition-colors ${
              isSelected
                ? 'border-calm-cyan bg-calm-cyan/10 text-text-main ring-1 ring-calm-cyan/40'
                : 'border-white/10 bg-white/[0.03] text-text-muted hover:border-white/20 hover:text-text-main'
            }`}
            onClick={() => onSelect(option.value)}
            aria-pressed={isSelected}
          >
            <span>{option.label}</span>
            <span className="flex items-center gap-2 text-xs text-text-muted">
              <span aria-hidden="true">{option.value}</span>
              {isSelected && <Check className="h-4 w-4 text-calm-cyan" aria-hidden="true" />}
            </span>
          </button>
        )
      })}
    </div>
  )
}
