import { Link } from 'react-router-dom'
import Footer from '../components/layout/Footer'
import Header from '../components/layout/Header'
import PageSectionIntro from '../components/common/PageSectionIntro'
import { PRIVACY_CONTACT_CONFIG } from '../config/privacyConfig'
import { usePageMeta } from '../hooks/usePageMeta'

interface ContactPageProps {
  theme: 'dark' | 'light'
  onToggleTheme: () => void
}

function ContactPageContent() {
  usePageMeta({
    title: 'Contact | Let It Burn',
    description:
      'Get in touch about Let It Burn, privacy questions, or product feedback.',
    canonicalPath: '/contact',
  })

  const supportEmail = PRIVACY_CONTACT_CONFIG.supportEmail || PRIVACY_CONTACT_CONFIG.privacyEmail

  return (
    <main className="page-shell page-shell--editorial py-8 md:py-12">
      <div className="content-container max-w-[1040px]">
        <section className="rounded-[28px] border border-border-card bg-bg-card/75 p-6 md:p-8 lg:p-10">
          <PageSectionIntro
            eyebrow="Contact"
            title="Feedback is welcome. Pressure is not."
            description="Use this page for thoughtful product feedback, privacy questions, or practical support requests about the website itself."
          />

          <div className="mt-8 grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
            <article className="rounded-2xl border border-white/8 bg-white/[0.03] p-5">
              <h2 className="font-heading text-xl font-semibold text-text-main">
                The best reasons to reach out
              </h2>
              <ul className="mt-4 space-y-3 text-sm leading-relaxed text-text-muted">
                <li>Product feedback about what feels calm, confusing, or unnecessary.</li>
                <li>Questions about privacy, payments, or optional reports.</li>
                <li>Broken links, missing flows, or accessibility issues.</li>
              </ul>
            </article>

            <article className="rounded-2xl border border-calm-cyan/20 bg-calm-cyan/6 p-5">
              <h2 className="font-heading text-xl font-semibold text-text-main">
                Current contact status
              </h2>
              {supportEmail ? (
                <p className="mt-3 text-sm leading-relaxed text-text-muted">
                  Email: <a className="text-calm-cyan hover:underline" href={`mailto:${supportEmail}`}>{supportEmail}</a>
                </p>
              ) : (
                <p className="mt-3 text-sm leading-relaxed text-text-muted">
                  A direct support email is still being configured for production. Until then,
                  route urgent wellbeing concerns to local professional or emergency resources
                  instead of waiting on this website.
                </p>
              )}
              <div className="mt-5 flex flex-wrap gap-3">
                <Link
                  to="/privacy"
                  className="inline-flex min-h-[44px] items-center justify-center rounded-xl border border-white/12 bg-white/[0.04] px-4 py-2.5 text-sm font-medium text-text-main"
                >
                  Privacy policy
                </Link>
                <Link
                  to="/safety-resources"
                  className="inline-flex min-h-[44px] items-center justify-center rounded-xl border border-white/12 bg-white/[0.04] px-4 py-2.5 text-sm font-medium text-text-main"
                >
                  Safety resources
                </Link>
              </div>
            </article>
          </div>
        </section>
      </div>
    </main>
  )
}

export default function ContactPage({ theme, onToggleTheme }: ContactPageProps) {
  return (
    <>
      <Header theme={theme} onToggleTheme={onToggleTheme} />
      <ContactPageContent />
      <Footer />
    </>
  )
}
