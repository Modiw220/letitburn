import { Lock } from 'lucide-react'

const premiumItems = [
  {
    title: 'Premium Coloring Packs',
    description: 'Expanded collections of detailed calming designs.',
  },
  {
    title: 'High-Resolution Export',
    description: 'Export artwork prepared for larger screens and printing.',
  },
  {
    title: 'Printable Coloring Sheets',
    description: 'Download clean templates for offline coloring.',
  },
  {
    title: 'Premium Brushes',
    description: 'Watercolor, pencil, marker, and textured brush styles.',
  },
]

export default function PremiumPreview() {
  return (
    <section className="mt-12 opacity-80" aria-labelledby="premium-preview-heading">
      <div className="mb-6 flex items-center gap-3">
        <h2
          id="premium-preview-heading"
          className="font-heading text-xl font-semibold text-text-main"
        >
          More creative tools are coming.
        </h2>
        <span className="rounded-full border border-border-card px-2.5 py-0.5 text-[10px] uppercase tracking-wider text-text-muted">
          Coming later
        </span>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {premiumItems.map((item) => (
          <article
            key={item.title}
            className="relative rounded-2xl border border-border-card bg-bg-card/60 p-5"
          >
            <Lock
              className="mb-3 h-4 w-4 text-text-muted/50"
              aria-hidden="true"
            />
            <h3 className="text-sm font-semibold text-text-main">{item.title}</h3>
            <p className="mt-2 text-xs leading-relaxed text-text-muted">
              {item.description}
            </p>
          </article>
        ))}
      </div>
    </section>
  )
}
