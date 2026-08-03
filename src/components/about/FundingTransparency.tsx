import { Link } from 'react-router-dom'

export default function FundingTransparency() {
  return (
    <section className="mt-16 md:mt-20" aria-labelledby="funding-heading">
      <h2 id="funding-heading" className="font-heading text-2xl font-semibold text-text-main md:text-3xl">
        How the platform may be supported.
      </h2>

      <div className="mt-6 max-w-[720px] space-y-4 text-sm leading-relaxed text-text-muted md:text-base">
        <p>
          Let It Burn may be supported through voluntary donations, optional paid reflection
          reports, future premium creative tools, and carefully placed advertising on less sensitive
          pages.
        </p>
        <ul className="space-y-2 pl-5">
          <li className="list-disc">
            Core emotional-release tools should not place ads beside private writing
          </li>
          <li className="list-disc">Paid reports remain optional</li>
          <li className="list-disc">
            Donations do not change access to the basic release experience
          </li>
          <li className="list-disc">Future premium features should be labelled clearly</li>
          <li className="list-disc">
            Advertising should remain separated from emotionally sensitive actions
          </li>
        </ul>
      </div>

      <p className="mt-6">
        <Link
          to="/support"
          className="text-sm text-text-muted underline-offset-2 transition-colors hover:text-text-main hover:underline"
        >
          Read how support helps
        </Link>
      </p>
    </section>
  )
}
