import { AlertCircle, HeartHandshake, Shield } from 'lucide-react'
import { Link } from 'react-router-dom'
import Footer from '../components/layout/Footer'
import Header from '../components/layout/Header'
import PageSectionIntro from '../components/common/PageSectionIntro'
import { usePageMeta } from '../hooks/usePageMeta'

interface SafetyResourcesPageProps {
  theme: 'dark' | 'light'
  onToggleTheme: () => void
}

const resourceCards = [
  {
    title: 'If you may be in immediate danger',
    description:
      'Leave the website and contact your local emergency services or go to the nearest emergency department.',
    icon: AlertCircle,
  },
  {
    title: 'If you need urgent human support',
    description:
      'Reach out to a trusted person nearby, a local crisis line, or a qualified mental health professional in your area.',
    icon: HeartHandshake,
  },
  {
    title: 'If you only need a quieter next step',
    description:
      'Choose one simple action: drink water, move to a brighter room, step away from the screen, or return to a grounding tool.',
    icon: Shield,
  },
] as const

function SafetyResourcesContent() {
  usePageMeta({
    title: 'Safety Resources | Let It Burn',
    description:
      'Guidance for stepping away from Let It Burn and finding immediate or local support when reflection tools are not enough.',
    canonicalPath: '/safety-resources',
  })

  return (
    <main className="page-shell page-shell--editorial py-8 md:py-12">
      <div className="content-container max-w-[1080px]">
        <section className="rounded-[28px] border border-border-card bg-bg-card/75 p-6 md:p-8 lg:p-10">
          <PageSectionIntro
            eyebrow="Safety Resources"
            title="This website is quiet support, not emergency care."
            description="If this moment feels bigger than a private note, drawing, sound, or quiz can hold, step away from the tool and choose direct human support instead."
          />

          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {resourceCards.map((card) => {
              const Icon = card.icon
              return (
                <article
                  key={card.title}
                  className="rounded-2xl border border-white/8 bg-white/[0.03] p-5"
                >
                  <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-white/[0.05] text-calm-cyan">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <h2 className="mt-4 font-heading text-lg font-semibold text-text-main">
                    {card.title}
                  </h2>
                  <p className="mt-2 text-sm leading-relaxed text-text-muted">
                    {card.description}
                  </p>
                </article>
              )
            })}
          </div>

          <div className="mt-8 grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="rounded-2xl border border-calm-cyan/20 bg-calm-cyan/6 p-5">
              <h2 className="font-heading text-xl font-semibold text-text-main">
                A practical next-step list
              </h2>
              <ol className="mt-4 space-y-3 text-sm leading-relaxed text-text-muted">
                <li>1. Stop the current activity and move away from the page.</li>
                <li>2. Contact a real person you trust or a local professional resource.</li>
                <li>3. If you feel physically unsafe, contact local emergency services now.</li>
              </ol>
            </div>

            <div className="rounded-2xl border border-white/8 bg-white/[0.03] p-5">
              <h2 className="font-heading text-xl font-semibold text-text-main">
                When you come back
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-text-muted">
                Let It Burn can support quieter moments before or after harder feelings, but it is
                not designed to replace urgent or ongoing care.
              </p>
              <div className="mt-5 flex flex-wrap gap-3">
                <Link
                  to="/burn-thoughts"
                  className="inline-flex min-h-[44px] items-center justify-center rounded-xl border border-fire-orange/35 bg-fire-orange/10 px-4 py-2.5 text-sm font-semibold text-bright-orange"
                >
                  Return to Burn Thoughts
                </Link>
                <Link
                  to="/contact"
                  className="inline-flex min-h-[44px] items-center justify-center rounded-xl border border-white/12 bg-white/[0.04] px-4 py-2.5 text-sm font-medium text-text-main"
                >
                  Contact the project
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  )
}

export default function SafetyResourcesPage({
  theme,
  onToggleTheme,
}: SafetyResourcesPageProps) {
  return (
    <>
      <Header theme={theme} onToggleTheme={onToggleTheme} />
      <SafetyResourcesContent />
      <Footer />
    </>
  )
}
