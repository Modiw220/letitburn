import { useState } from 'react'
import { HeartHandshake } from 'lucide-react'

interface DonationOption {
  amount: string
  label: string
  isCustom?: boolean
}

const donationOptions: DonationOption[] = [
  { amount: '$1', label: 'Supporter' },
  { amount: '$3', label: 'Helper' },
  { amount: '$5', label: 'Guardian' },
  { amount: 'Custom Amount', label: 'You choose', isCustom: true },
]

export default function SupportSection() {
  const [selected, setSelected] = useState<string | null>(null)

  return (
    <section
      id="support"
      className="content-container scroll-mt-24 py-8 md:py-12"
      aria-labelledby="support-heading"
    >
      <div className="relative overflow-hidden rounded-2xl border border-border-card bg-bg-card px-6 py-8 md:px-10 md:py-10">
        <div className="decorative-heart-line" aria-hidden="true">
          <svg viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg">
            <path d="M40 65 C20 45, 5 30, 20 15 C30 8, 40 18, 40 18 C40 18, 50 8, 60 15 C75 30, 60 45, 40 65Z" />
          </svg>
        </div>

        <div className="relative flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex max-w-md items-start gap-4">
            <span
              className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-support-gold/30 bg-support-gold/10"
              aria-hidden="true"
            >
              <HeartHandshake
                className="h-6 w-6 text-support-gold"
                strokeWidth={1.75}
              />
            </span>
            <div>
              <h2
                id="support-heading"
                className="font-heading text-xl font-semibold text-text-main md:text-2xl"
              >
                Help keep this space free for everyone.
              </h2>
              <p className="mt-2 text-[15px] text-text-muted">
                Your support makes a difference.
              </p>
            </div>
          </div>

          <div
            className="grid grid-cols-2 gap-3 sm:flex sm:flex-wrap lg:justify-end"
            role="group"
            aria-label="Donation amount options"
          >
            {donationOptions.map((option) => {
              const key = option.isCustom ? 'custom' : option.amount
              const isSelected = selected === key

              return (
                <button
                  key={key}
                  type="button"
                  onClick={() => setSelected(key)}
                  aria-pressed={isSelected}
                  className={`flex min-w-[120px] flex-col items-center rounded-xl border px-4 py-3 text-center transition-all hover:-translate-y-0.5 focus-visible:-translate-y-0.5 ${
                    option.isCustom
                      ? 'border-support-gold/60 hover:border-support-gold hover:shadow-[0_0_20px_rgba(246,185,59,0.15)]'
                      : 'border-border-card hover:border-white/25'
                  } ${
                    isSelected
                      ? option.isCustom
                        ? 'border-support-gold bg-support-gold/10'
                        : 'border-white/30 bg-white/5'
                      : 'bg-bg-secondary/50'
                  }`}
                >
                  <span className="text-base font-semibold text-text-main">
                    {option.amount}
                  </span>
                  <span className="mt-0.5 text-xs text-text-muted">
                    {option.label}
                  </span>
                </button>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
