export default function MissionSection() {
  return (
    <section id="why" className="mt-16 md:mt-20" aria-labelledby="why-heading">
      <h2 id="why-heading" className="font-heading text-2xl font-semibold text-text-main md:text-3xl">
        Why this website exists.
      </h2>

      <div className="mt-6 max-w-3xl space-y-4 text-sm leading-relaxed text-text-muted md:text-base">
        <p>
          Some thoughts arrive when everything else is quiet. You may not want to explain them, save
          them, post them, or turn them into a conversation. Sometimes you only need somewhere
          private to let them leave your head.
        </p>
        <p>
          Let It Burn is being built for those moments. It offers simple tools for emotional
          release, calming sound, drawing, and self-reflection without asking people to create an
          account first.
        </p>
        <p>
          Support helps keep those tools available while the project continues to grow carefully and
          responsibly.
        </p>
      </div>

      <blockquote className="mt-8 max-w-2xl border-l-2 border-calm-cyan/40 pl-5 text-base italic text-text-main md:text-lg">
        You should not need to perform your feelings before you are allowed to release them.
      </blockquote>
    </section>
  )
}
