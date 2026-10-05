import { useState, type FormEvent } from 'react'
import { Link } from 'react-router-dom'
import Footer from '../components/layout/Footer'
import Header from '../components/layout/Header'
import PageSectionIntro from '../components/common/PageSectionIntro'
import { PRIVACY_CONTACT_CONFIG } from '../config/privacyConfig'
import { usePageMeta } from '../hooks/usePageMeta'
import { invokeFunction } from '../lib/invokeFunction'

interface ContactPageProps {
  theme: 'dark' | 'light'
  onToggleTheme: () => void
}

interface ContactSubmitResult {
  submitted: boolean
  message: string
}

function ContactPageContent() {
  usePageMeta({
    title: 'Contact | Let It Burn',
    description:
      'Get in touch about Let It Burn, privacy questions, or product feedback.',
    canonicalPath: '/contact',
  })

  const supportEmail = PRIVACY_CONTACT_CONFIG.supportEmail || PRIVACY_CONTACT_CONFIG.privacyEmail
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [subject, setSubject] = useState('')
  const [message, setMessage] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError(null)
    setSuccess(null)

    const trimmedEmail = email.trim()
    const trimmedMessage = message.trim()
    if (!trimmedEmail.includes('@')) {
      setError('Please enter a valid email address.')
      return
    }
    if (!trimmedMessage) {
      setError('Please include a short message.')
      return
    }

    setSubmitting(true)
    try {
      const result = await invokeFunction<ContactSubmitResult>(
        'submit-contact',
        {
          name: name.trim() || undefined,
          email: trimmedEmail,
          subject: subject.trim() || undefined,
          message: trimmedMessage,
        },
        { requireAuth: false },
      )
      setSuccess(result.message || 'Thanks. Your message has been received.')
      setName('')
      setEmail('')
      setSubject('')
      setMessage('')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to send your message right now.')
    } finally {
      setSubmitting(false)
    }
  }

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

              <form onSubmit={handleSubmit} className="mt-6 space-y-4" noValidate>
                <label className="block space-y-2">
                  <span className="text-sm font-medium text-text-main">Name</span>
                  <input
                    type="text"
                    name="name"
                    autoComplete="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full rounded-xl border border-white/12 bg-white/[0.04] px-4 py-3 text-sm text-text-main outline-none ring-calm-cyan/40 placeholder:text-text-muted focus:ring-2"
                    placeholder="Optional"
                  />
                </label>

                <label className="block space-y-2">
                  <span className="text-sm font-medium text-text-main">Email</span>
                  <input
                    type="email"
                    name="email"
                    autoComplete="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full rounded-xl border border-white/12 bg-white/[0.04] px-4 py-3 text-sm text-text-main outline-none ring-calm-cyan/40 placeholder:text-text-muted focus:ring-2"
                    placeholder="you@example.com"
                  />
                </label>

                <label className="block space-y-2">
                  <span className="text-sm font-medium text-text-main">Subject</span>
                  <input
                    type="text"
                    name="subject"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="w-full rounded-xl border border-white/12 bg-white/[0.04] px-4 py-3 text-sm text-text-main outline-none ring-calm-cyan/40 placeholder:text-text-muted focus:ring-2"
                    placeholder="Optional"
                  />
                </label>

                <label className="block space-y-2">
                  <span className="text-sm font-medium text-text-main">Message</span>
                  <textarea
                    name="message"
                    required
                    rows={5}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full resize-y rounded-xl border border-white/12 bg-white/[0.04] px-4 py-3 text-sm text-text-main outline-none ring-calm-cyan/40 placeholder:text-text-muted focus:ring-2"
                    placeholder="Share what would help."
                  />
                </label>

                {error && (
                  <p
                    className="rounded-xl border border-fire-orange/30 bg-fire-orange/10 px-4 py-3 text-sm text-bright-orange"
                    role="alert"
                  >
                    {error}
                  </p>
                )}

                {success && (
                  <p
                    className="rounded-xl border border-calm-cyan/30 bg-calm-cyan/10 px-4 py-3 text-sm text-text-main"
                    role="status"
                  >
                    {success}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={submitting}
                  className="inline-flex min-h-[48px] w-full items-center justify-center rounded-xl border border-calm-cyan/40 bg-calm-cyan/15 px-6 py-3 text-sm font-semibold text-calm-cyan transition-colors hover:bg-calm-cyan/20 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {submitting ? 'Sending…' : 'Send message'}
                </button>
              </form>
            </article>

            <article className="rounded-2xl border border-calm-cyan/20 bg-calm-cyan/6 p-5">
              <h2 className="font-heading text-xl font-semibold text-text-main">
                Current contact status
              </h2>
              {supportEmail ? (
                <p className="mt-3 text-sm leading-relaxed text-text-muted">
                  Email:{' '}
                  <a className="text-calm-cyan hover:underline" href={`mailto:${supportEmail}`}>
                    {supportEmail}
                  </a>
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
