import { Heart } from 'lucide-react'

export default function FinalSupportMessage() {
  const scrollToDonate = () => {
    document.getElementById('donate')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section className="support-final-message mt-16 text-center md:mt-20" aria-labelledby="final-message-heading">
      <Heart className="mx-auto h-6 w-6 text-support-gold/70" aria-hidden="true" />
      <div className="mx-auto mt-6 max-w-2xl space-y-4 text-sm leading-relaxed text-text-muted md:text-base">
        <p>
          Some people arrive here with a sentence they cannot say out loud. Others only need rain
          sounds, a blank canvas, or a few minutes to understand what they are feeling.
        </p>
        <p>Support helps keep those moments simple, private, and available.</p>
        <p id="final-message-heading" className="text-base text-text-main md:text-lg">
          Thank you for caring about a space you may never see someone else use.
        </p>
      </div>
      <button
        type="button"
        className="mt-6 text-sm text-calm-cyan underline-offset-2 hover:underline"
        onClick={scrollToDonate}
      >
        Return to donation options
      </button>
    </section>
  )
}
