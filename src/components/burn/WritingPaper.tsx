import { forwardRef, useEffect, useId } from 'react'
import { MAX_NOTE_LENGTH } from '../../types/burn'
import { useTextDirection } from '../../hooks/useTextDirection'

interface WritingPaperProps {
  value: string
  onChange: (value: string) => void
  disabled?: boolean
}

const WritingPaper = forwardRef<HTMLTextAreaElement, WritingPaperProps>(
  function WritingPaper({ value, onChange, disabled = false }, ref) {
    const labelId = useId()
    const direction = useTextDirection(value)
    const showCounter = value.length > 0

    useEffect(() => {
      const isDesktop = window.matchMedia('(min-width: 768px)').matches
      if (isDesktop && ref && 'current' in ref && ref.current) {
        ref.current.focus()
      }
    }, [ref])

    return (
      <div className="writing-paper mx-auto w-full">
        <p
          className="writing-paper-prompt font-handwriting text-[13px] text-[#6B5A45]"
          aria-hidden="true"
        >
          Today, I choose to release…
        </p>

        <label id={labelId} htmlFor="burn-note-input" className="sr-only">
          Write what you want to release
        </label>

        <textarea
          ref={ref}
          id="burn-note-input"
          value={value}
          onChange={(event) =>
            onChange(event.target.value.slice(0, MAX_NOTE_LENGTH))
          }
          disabled={disabled}
          placeholder="Write what you want to release…"
          dir={direction}
          spellCheck
          aria-labelledby={labelId}
          aria-describedby="burn-note-privacy"
          className="writing-paper-textarea font-handwriting mt-2 w-full resize-none bg-transparent text-[#2A241D] outline-none placeholder:text-[#8A7968]"
          rows={6}
        />

        {showCounter && (
          <p
            className="mt-2 text-right text-xs text-[#8A7968]"
            aria-live="polite"
          >
            {value.length} / {MAX_NOTE_LENGTH}
          </p>
        )}
      </div>
    )
  },
)

export default WritingPaper
