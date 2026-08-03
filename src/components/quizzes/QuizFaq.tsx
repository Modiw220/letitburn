import { ChevronDown } from 'lucide-react'
import { useId, useState } from 'react'
import { quizFaqs } from '../../data/quizFaqs'

export default function QuizFaq() {
  const baseId = useId()
  const [openId, setOpenId] = useState<string | null>(null)

  return (
    <section
      className="mt-16 md:mt-20"
      aria-labelledby="quiz-faq-heading"
    >
      <h2
        id="quiz-faq-heading"
        className="font-heading text-2xl font-semibold text-text-main md:text-3xl"
      >
        Common questions
      </h2>

      <div className="mt-6 space-y-3">
        {quizFaqs.map((faq) => {
          const isOpen = openId === faq.id
          const panelId = `${baseId}-${faq.id}`

          return (
            <div
              key={faq.id}
              className="rounded-xl border border-border-card bg-bg-card/40"
            >
              <button
                type="button"
                className="flex min-h-[52px] w-full items-center justify-between gap-4 px-5 py-4 text-left"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpenId(isOpen ? null : faq.id)}
              >
                <span className="font-medium text-text-main">{faq.question}</span>
                <ChevronDown
                  className={`h-5 w-5 shrink-0 text-text-muted transition-transform ${
                    isOpen ? 'rotate-180' : ''
                  }`}
                  aria-hidden="true"
                />
              </button>
              {isOpen && (
                <div id={panelId} className="border-t border-white/8 px-5 pb-4 pt-1">
                  <p className="text-sm leading-relaxed text-text-muted">{faq.answer}</p>
                </div>
              )}
            </div>
          )
        })}
      </div>
    </section>
  )
}
