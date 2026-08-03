import { HeartHandshake } from 'lucide-react'
import { Link } from 'react-router-dom'

interface DonationOption {
  amount: string
  label: string
}

const donationOptions: DonationOption[] = [
  { amount: '$1', label: 'Supporter' },
  { amount: '$3', label: 'Helper' },
  { amount: '$5', label: 'Guardian' },
  { amount: 'Custom Amount', label: 'You choose' },
]

export default function SupportSection() {
  return (
    <section
      id="support"
      className="content-container scroll-mt-24 py-8 md:py-12"
      aria-labelledby="support-heading"
    >
      <div className="relative overflow-hidden rounded-[28px] border border-border-card bg-[linear-gradient(180deg,rgba(255,255,255,0.03),rgba(10,22,38,0.72))] px-6 py-8 md:px-10 md:py-10">
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
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-support-gold">
                Optional support
              </p>
              <h2 id="support-heading" className="mt-2 font-heading text-xl font-semibold text-text-main md:text-2xl">
                Keep the tools quiet, private, and free to begin.
              </h2>
              <p className="mt-2 max-w-md text-[15px] leading-relaxed text-text-muted">
                Donations stay secondary to the product. If you want to help, choose a comfortable amount or visit the support page for the full breakdown.
              </p>
            </div>
          </div>

          <div className="min-w-0 lg:max-w-[430px]">
            <div className="grid grid-cols-2 gap-3" role="group" aria-label="Donation amount options">
              {donationOptions.map((option) => (
                <div
                  key={option.amount}
                  className="flex min-w-[120px] flex-col items-center rounded-xl border border-white/10 bg-bg-secondary/55 px-4 py-3 text-center"
                >
                  <span className="text-base font-semibold text-text-main">
                    {option.amount}
                  </span>
                  <span className="mt-0.5 text-xs text-text-muted">
                    {option.label}
                  </span>
                </div>
              ))}
            </div>
            <div className="mt-5 flex flex-wrap gap-3">
              <Link
                to="/support"
                className="inline-flex min-h-[48px] items-center justify-center rounded-xl border border-support-gold/35 bg-support-gold/10 px-5 py-3 text-sm font-semibold text-support-gold transition-transform hover:-translate-y-0.5"
              >
                Open support options
              </Link>
              <span className="inline-flex min-h-[48px] items-center text-sm text-text-muted">
                Completely optional
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
