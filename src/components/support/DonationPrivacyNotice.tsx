import { Link } from 'react-router-dom'

export default function DonationPrivacyNotice() {
  return (
    <section className="mt-12 rounded-2xl border border-border-card bg-bg-card/40 px-5 py-5 md:px-6">
      <h2 className="font-heading text-base font-semibold text-text-main md:text-lg">Privacy</h2>
      <p className="mt-2 text-sm text-text-muted">
        Payment providers may process information required to complete and verify a transaction.
        Let It Burn should collect only the information needed to manage the donation.
      </p>
      <p className="mt-2 text-sm text-text-muted">
        You do not need a Let It Burn account to donate.{' '}
        <Link to="/privacy" className="text-calm-cyan underline-offset-2 hover:underline">
          Privacy
        </Link>
      </p>
    </section>
  )
}
