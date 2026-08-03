import { ShieldCheck } from 'lucide-react'

export default function SoundPrivacyNotice() {
  return (
    <section
      className="mt-8 rounded-2xl border border-border-card bg-bg-card/50 px-5 py-5 md:px-6"
      aria-labelledby="sound-privacy-heading"
    >
      <div className="flex items-start gap-3">
        <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-calm-cyan" aria-hidden="true" />
        <div>
          <h2
            id="sound-privacy-heading"
            className="font-heading text-base font-semibold text-text-main md:text-lg"
          >
            Simple and private.
          </h2>
          <p className="mt-2 text-sm text-text-muted">
            Listening preferences may be stored on this device. No account is required, and your
            audio is not uploaded.
          </p>
          <p className="mt-2 text-sm text-text-muted/90">
            Sound levels should remain comfortable. Take breaks when needed.
          </p>
        </div>
      </div>
    </section>
  )
}
