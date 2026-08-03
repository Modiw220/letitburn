const steps = [
  {
    title: 'Choose an upgrade',
    text: 'Review the exact feature, price, duration, and availability.',
  },
  {
    title: 'See the full summary',
    text: 'Confirm whether the purchase is one-time, time-limited, or tied to a specific report or content pack.',
  },
  {
    title: 'Pay through a secure provider',
    text: 'Card and transaction information should be handled by the configured payment provider rather than custom card fields.',
  },
  {
    title: 'Receive the upgrade',
    text: 'Access should be granted only after secure payment verification.',
  },
]

export default function PurchaseProcess() {
  return (
    <section className="mt-16 md:mt-20" aria-labelledby="purchase-process-heading">
      <h2 id="purchase-process-heading" className="font-heading text-2xl font-semibold text-text-main md:text-3xl">
        How optional purchases work.
      </h2>

      <ol className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2">
        {steps.map((step, index) => (
          <li
            key={step.title}
            className="rounded-2xl border border-white/8 bg-white/[0.02] p-5 md:p-6"
          >
            <span
              className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-calm-cyan/30 bg-calm-cyan/10 text-sm font-semibold text-calm-cyan"
              aria-hidden="true"
            >
              {index + 1}
            </span>
            <h3 className="mt-4 font-medium text-text-main">{step.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-text-muted">{step.text}</p>
          </li>
        ))}
      </ol>

      <p className="mt-6 text-sm text-text-muted">
        No purchase should unlock from a URL parameter or client-only success flag.
      </p>
    </section>
  )
}
