import { privacyRightsGroups } from '../../data/privacyRights'

export default function PrivacyRightsSection() {
  return (
    <div className="privacy-rights space-y-6 text-sm leading-relaxed text-text-muted">
      {privacyRightsGroups.map((group) => (
        <article key={group.id} className="rounded-2xl border border-white/8 bg-white/[0.02] p-5">
          <h3 className="font-medium text-text-main">{group.region}</h3>
          <p className="mt-2">{group.introduction}</p>
          {group.rights.length > 0 && (
            <ul className="mt-3 list-disc space-y-1 pl-5">
              {group.rights.map((right) => (
                <li key={right}>{right}</li>
              ))}
            </ul>
          )}
          {group.notes.length > 0 && (
            <ul className="mt-3 list-disc space-y-1 pl-5 text-text-muted/90">
              {group.notes.map((note) => (
                <li key={note}>{note}</li>
              ))}
            </ul>
          )}
        </article>
      ))}

      <p>
        To submit a privacy request, use the verified privacy contact method when it is available.
        Identity verification may be required, and some information may need to be retained for legal
        reasons.
      </p>
    </div>
  )
}
