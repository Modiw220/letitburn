import { donationImpactItems } from '../../data/donationImpactItems'
import ImpactCard from './ImpactCard'

export default function ImpactGrid() {
  return (
    <section id="impact" className="mt-16 md:mt-20" aria-labelledby="impact-heading">
      <h2 id="impact-heading" className="font-heading text-2xl font-semibold text-text-main md:text-3xl">
        What your support helps with.
      </h2>
      <p className="mt-3 max-w-2xl text-sm text-text-muted md:text-base">
        Donations go toward the practical work required to keep this space available and improve it
        over time.
      </p>

      <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-2">
        {donationImpactItems.map((item) => (
          <ImpactCard key={item.id} {...item} />
        ))}
      </div>
    </section>
  )
}
