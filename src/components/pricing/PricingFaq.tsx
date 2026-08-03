import { ChevronDown } from 'lucide-react'
import { useState } from 'react'
import { pricingFaqs } from '../../data/pricingFaqs'

export default function PricingFaq() {
  const [openId, setOpenId] = useState<string | null>(pricingFaqs[0]?.id ?? null)

  return (
    <section className="mt-16 md:mt-20" aria-labelledby="pricing-faq-heading">
      <h2 id="pricing-faq-heading" className="font-heading text-2xl font-semibold text-text-main md:text-3xl">
        Frequently asked questions
      </h2>

      <div className="mt-8 space-y-3">
        {pricingFaqs.map((item) => {
          const expanded = openId === item.id
          const panelId = `pricing-faq-${item.id}`

          return (
            <article
              key={item.id}
              className="rounded-2xl border border-white/10 bg-bg-card/50"
            >
              <h3>
                <button
                  type="button"
                  className="pricing-faq-trigger flex min-h-[56px] w-full items-center justify-between gap-4 px-4 py-4 text-left md:px-5"
                  aria-expanded={expanded}
                  aria-controls={panelId}
                  onClick={() => setOpenId(expanded ? null : item.id)}
                >
                  <span className="font-medium text-text-main">{item.question}</span>
                  <ChevronDown
                    className={`h-5 w-5 shrink-0 text-text-muted transition-transform ${
                      expanded ? 'rotate-180' : ''
                    }`}
                    aria-hidden="true"
                  />
                </button>
              </h3>
              <div
                id={panelId}
                className={`px-4 pb-4 md:px-5 ${expanded ? 'block' : 'hidden'}`}
                hidden={!expanded}
              >
                <p className="text-sm leading-relaxed text-text-muted">{item.answer}</p>
              </div>
            </article>
          )
        })}
      </div>
    </section>
  )
}
