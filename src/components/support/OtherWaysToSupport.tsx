import { Link } from 'react-router-dom'
import { useCopyLink } from '../../hooks/useCopyLink'

const otherWays = [
  {
    title: 'Share the website',
    text: 'Send it privately to someone who may find the tools useful.',
  },
  {
    title: 'Send thoughtful feedback',
    text: 'Tell us what feels calm, confusing, useful, or unnecessary.',
  },
  {
    title: 'Return when you need it',
    text: 'Using the tools helps reveal which parts of the project deserve more care.',
  },
]

export default function OtherWaysToSupport() {
  const { copyLink, message } = useCopyLink()

  return (
    <section className="mt-16 md:mt-20" aria-labelledby="other-ways-heading">
      <h2 id="other-ways-heading" className="font-heading text-2xl font-semibold text-text-main md:text-3xl">
        Other ways to help.
      </h2>

      <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-3">
        {otherWays.map((item) => (
          <article
            key={item.title}
            className="rounded-2xl border border-white/8 bg-white/[0.02] p-5 opacity-90"
          >
            <h3 className="font-medium text-text-main">{item.title}</h3>
            <p className="mt-2 text-sm text-text-muted">{item.text}</p>
          </article>
        ))}
      </div>

      <div className="mt-6 flex flex-wrap gap-3">
        <button
          type="button"
          className="min-h-[44px] rounded-xl border border-white/10 px-4 py-2.5 text-sm font-medium text-text-main"
          onClick={() => void copyLink()}
        >
          Copy Website Link
        </button>
        <Link
          to="/contact"
          className="inline-flex min-h-[44px] items-center rounded-xl border border-white/10 px-4 py-2.5 text-sm font-medium text-text-muted hover:text-text-main"
        >
          Send Feedback
        </Link>
      </div>

      <p className="sr-only" aria-live="polite">
        {message}
      </p>
      {message && <p className="mt-3 text-sm text-calm-cyan">{message}</p>}
    </section>
  )
}
