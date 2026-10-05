import { Link } from 'react-router-dom'
import {
  ADVERTISING_PROVIDER,
  EMAIL_PROVIDER_CONFIG,
  MINIMUM_USER_AGE,
  PAYMENT_ENV,
  PAYMENT_PRIVACY_CONFIG,
  PRIVACY_CONTACT_CONFIG,
  PRIVACY_FEATURE_FLAGS,
} from '../../config/privacyConfig'
import { enabledStorageEntries } from '../../data/storageRegistry'
import CookieDisclosureTable from './CookieDisclosureTable'
import PrivacyRequestForm from './PrivacyRequestForm'
import PrivacyRetentionTable from './PrivacyRetentionTable'
import PrivacyRightsSection from './PrivacyRightsSection'

interface PrivacySectionContentProps {
  sectionId: string
}

function Highlight({ children }: { children: React.ReactNode }) {
  return (
    <blockquote className="privacy-highlight mt-4 border-l-2 border-calm-cyan/40 pl-4 text-sm italic text-text-main md:text-base">
      {children}
    </blockquote>
  )
}

export default function PrivacySectionContent({ sectionId }: PrivacySectionContentProps) {
  switch (sectionId) {
    case 'privacy-promise':
      return (
        <div className="privacy-section-content space-y-4 text-sm leading-relaxed text-text-muted">
          <p>
            Privacy is part of how Let It Burn is built. Sensitive content should not be retained
            without a clear reason, and the core tools are intended to remain usable without an
            account.
          </p>
          <p>
            Personal writing and quiz-answer content is not sold. Private writing is not used to
            create advertising profiles. Technical systems may still process limited connection,
            security, and error information needed to operate and protect the website.
          </p>
          <p>This policy applies to the website and its integrated services as they are configured.</p>
          <Highlight>
            We are not here to diagnose you. We are here to give you a private moment to breathe.
          </Highlight>
        </div>
      )

    case 'burn-thoughts':
      return (
        <div className="privacy-section-content space-y-4 text-sm leading-relaxed text-text-muted">
          <p>
            Note text exists in active browser memory during your writing session. The Burn Your
            Thoughts feature does not intentionally save note text to a database, LocalStorage,
            SessionStorage, URLs, analytics systems, or advertising systems.
          </p>
          <p>
            When burning begins, the editable note is cleared from active application state. Any
            temporary visual snapshot used for the animation is removed after the animation completes.
            Refreshing or leaving the page does not restore the note.
          </p>
          <p>
            Once the note is burned, Let It Burn does not provide a way to recover it. Your device,
            operating system, browser extensions, screenshots, or network environment are outside the
            control of this application.
          </p>
        </div>
      )

    case 'drawing':
      return (
        <div className="privacy-section-content space-y-4 text-sm leading-relaxed text-text-muted">
          <p>
            Drawing data is held in browser memory while you use the canvas. Artwork is not
            automatically uploaded, automatically saved to the platform, or added to a public gallery.
          </p>
          <p>
            Downloading creates a file on your device, and you decide what happens to that file.
            Leaving or refreshing the page may clear unsaved artwork.
          </p>
          <p>
            Browser storage is not used for drawing content in the current implementation. If autosave
            or cloud features are added later, this policy should be updated before launch.
          </p>
        </div>
      )

    case 'sounds':
      return (
        <div className="privacy-section-content space-y-4 text-sm leading-relaxed text-text-muted">
          <p>
            Sound playback does not require an account. Selected volume, mute preference, last
            selected sound, and sleep timer preset may be stored locally in your browser so your
            preferences can be remembered.
          </p>
          <p>
            Active playback does not begin automatically when you return. Sleep timer countdowns are
            not intended to be permanently stored. The platform may receive ordinary technical requests
            for audio files.
          </p>
          <p>
            Sound preferences are not sold as emotional profiles, and listening activity should not be
            used to infer medical or psychological conditions. Advertisements, if enabled, are intended
            to remain separate from playback controls.
          </p>
          <div className="overflow-x-auto">
            <table className="privacy-table mt-2 min-w-full text-left text-sm">
              <caption className="sr-only">Verified local storage keys used by the Sounds feature</caption>
              <thead>
                <tr>
                  <th scope="col">Key</th>
                  <th scope="col">Purpose</th>
                  <th scope="col">Duration</th>
                </tr>
              </thead>
              <tbody>
                {enabledStorageEntries
                  .filter((entry) => entry.key.startsWith('letItBurn.'))
                  .map((entry) => (
                    <tr key={entry.key}>
                      <td>{entry.key}</td>
                      <td>{entry.purpose}</td>
                      <td>{entry.duration}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      )

    case 'quizzes':
      return (
        <div className="privacy-section-content space-y-4 text-sm leading-relaxed text-text-muted">
          <div>
            <h3 className="font-medium text-text-main">Free quiz flow</h3>
            <ul className="mt-2 list-disc space-y-1 pl-5">
              <li>Answers remain in active browser memory during the session</li>
              <li>Answers are not placed in URLs, LocalStorage, or advertising systems</li>
              <li>Basic scores are calculated locally where implemented</li>
              <li>Leaving or refreshing clears the in-progress quiz when no secure recovery feature exists</li>
            </ul>
          </div>
          <div>
            <h3 className="font-medium text-text-main">Paid report flow</h3>
            <ul className="mt-2 list-disc space-y-1 pl-5">
              <li>A full report may require payment verification through a configured payment service</li>
              <li>Only information necessary to verify access should be sent for payment processing</li>
              <li>Report generation may happen locally or through a configured server depending on implementation</li>
              <li>Email delivery requires you to provide an email address voluntarily</li>
              <li>Quiz results are reflections, not diagnoses</li>
            </ul>
          </div>
          <p>Quiz answers and results are not used for targeted advertising.</p>
        </div>
      )

    case 'payments':
      return (
        <div className="privacy-section-content space-y-4 text-sm leading-relaxed text-text-muted">
          <p>
            Let It Burn should not collect raw card details through custom form fields. Payment
            providers may process card, billing, fraud-prevention, and transaction data according to
            their own policies and legal obligations.
          </p>
          <p>
            The platform may receive transaction identifiers, amount, currency, status, date, and
            limited customer details needed to verify a purchase or donation. Prices and payment status
            should be verified server-side when a secure backend is configured.
          </p>
          <p>
            You do not need a Let It Burn account to make a supported one-time purchase or donation
            unless the implementation changes. Payment information is not used to infer emotional
            state.
          </p>
          {PAYMENT_PRIVACY_CONFIG.providerName ? (
            <p>
              Configured payment provider:{' '}
              {PAYMENT_PRIVACY_CONFIG.providerPrivacyUrl ? (
                <a
                  href={PAYMENT_PRIVACY_CONFIG.providerPrivacyUrl}
                  className="text-calm-cyan underline-offset-2 hover:underline"
                  target="_blank"
                  rel="noreferrer"
                >
                  {PAYMENT_PRIVACY_CONFIG.providerName}
                </a>
              ) : (
                PAYMENT_PRIVACY_CONFIG.providerName
              )}
            </p>
          ) : (
            <p>
              {import.meta.env.DEV
                ? 'Payment provider details are not configured yet. Current development modes may use mock payment simulation.'
                : 'Payment provider details will be disclosed here when a live payment service is configured.'}
            </p>
          )}
          {import.meta.env.DEV && (
            <p className="text-xs text-text-muted/80">
              Current configured modes: quiz {PAYMENT_ENV.quizMode}, donation {PAYMENT_ENV.donationMode}.
            </p>
          )}
        </div>
      )

    case 'emails':
      return (
        <div className="privacy-section-content space-y-4 text-sm leading-relaxed text-text-muted">
          <p>
            An email address is requested only when you ask for email delivery of a report. Downloading
            a report should not require email.
          </p>
          <p>
            Email is used to deliver the requested report. Report delivery consent is separate from
            marketing consent, and marketing consent is not preselected. Email addresses should not
            automatically be added to a newsletter.
          </p>
          <p>
            When email delivery is configured, the delivery service may process the email address and
            message metadata. Failed-delivery logs may be retained temporarily according to the
            configured provider or legal requirement.
          </p>
          {EMAIL_PROVIDER_CONFIG.enabled && EMAIL_PROVIDER_CONFIG.name ? (
            <p>Configured email delivery provider: {EMAIL_PROVIDER_CONFIG.name}</p>
          ) : (
            <p>
              {import.meta.env.DEV
                ? 'Email delivery provider details are not configured yet.'
                : 'Email delivery is only used when a delivery service is configured and you choose email delivery.'}
            </p>
          )}
        </div>
      )

    case 'cookies':
      return (
        <div className="privacy-section-content space-y-4 text-sm leading-relaxed text-text-muted">
          <p>
            Let It Burn currently uses browser storage for essential and preference features. The
            application does not set its own cookies in the current frontend implementation. Third-party
            cookies may apply only if optional analytics or advertising providers are enabled and
            configured.
          </p>
          <CookieDisclosureTable />
          <p>
            Declining optional technologies should not prevent access to core release and relaxation
            tools.
          </p>
          {PRIVACY_FEATURE_FLAGS.consentManagerEnabled ? (
            <button
              type="button"
              className="min-h-[44px] rounded-xl border border-white/10 px-4 py-2.5 text-sm font-medium text-text-main"
            >
              Manage Cookie Preferences
            </button>
          ) : import.meta.env.DEV ? (
            <p className="text-xs text-amber-200/90">
              TODO: A consent manager must be implemented before enabling optional analytics or
              advertising in production.
            </p>
          ) : null}
        </div>
      )

    case 'advertising':
      return (
        <div className="privacy-section-content space-y-4 text-sm leading-relaxed text-text-muted">
          {PRIVACY_FEATURE_FLAGS.adsEnabled ? (
            <>
              <p>
                Advertisements may appear on less emotionally sensitive pages such as the Sounds page.
                They must not appear beside Burn Your Thoughts writing content, inside individual quiz
                questions, beside private results, or beside payment controls.
              </p>
              <p>
                Note text, drawing content, and quiz answers are not sent to advertising providers.
                Advertising providers may still use cookies, device information, approximate location, or
                contextual page information where permitted.
              </p>
              {ADVERTISING_PROVIDER.name && <p>Configured advertising provider: {ADVERTISING_PROVIDER.name}</p>}
            </>
          ) : (
            <p>Advertising is not currently enabled.</p>
          )}
          <p>
            The platform does not sell emotional writing or private quiz-answer content. Contextual
            advertising is preferred around sensitive subject areas when advertising is used.
          </p>
        </div>
      )

    case 'rights':
      return <PrivacyRightsSection />

    case 'retention':
      return (
        <div className="privacy-section-content">
          <PrivacyRetentionTable />
          <p className="mt-4 text-sm leading-relaxed text-text-muted">
            Backup deletion may not be immediate where backups exist and store relevant data, depending
            on hosting configuration.
          </p>
        </div>
      )

    case 'children':
      return (
        <div className="privacy-section-content space-y-4 text-sm leading-relaxed text-text-muted">
          {MINIMUM_USER_AGE === null ? (
            import.meta.env.DEV ? (
              <p>
                TODO: Replace with verified production information before publishing. The intended
                audience minimum age has not been finalized.
              </p>
            ) : (
              <p>
                The intended audience for this service should be confirmed before production
                publication.
              </p>
            )
          ) : (
            <p>The service is intended for users aged {MINIMUM_USER_AGE} and older.</p>
          )}
          <p>
            Let It Burn does not knowingly seek children&apos;s private emotional data. Parents or
            guardians may contact the platform regarding information involving a child using the
            verified privacy contact method when available.
          </p>
          <p>Age rules vary by region, and payment features may have provider-specific age requirements.</p>
        </div>
      )

    case 'changes':
      return (
        <div className="privacy-section-content space-y-4 text-sm leading-relaxed text-text-muted">
          <p>
            We may update this policy when the platform, providers, or legal requirements change. The
            effective date will be updated, and material changes may be highlighted on the website when
            appropriate.
          </p>
          <p>
            Continued use after a change does not replace consent when consent is legally required.
          </p>
          {PRIVACY_FEATURE_FLAGS.versionHistoryEnabled && (
            <p>
              <a href="#changes" className="text-calm-cyan underline-offset-2 hover:underline">
                View policy version history
              </a>
            </p>
          )}
        </div>
      )

    case 'contact':
      return (
        <div className="privacy-section-content space-y-4 text-sm leading-relaxed text-text-muted">
          <p>Contact us with privacy questions or requests using the verified methods below.</p>
          {PRIVACY_CONTACT_CONFIG.privacyEmail ? (
            <p>
              Privacy contact:{' '}
              <a
                href={`mailto:${PRIVACY_CONTACT_CONFIG.privacyEmail}`}
                className="text-calm-cyan underline-offset-2 hover:underline"
              >
                {PRIVACY_CONTACT_CONFIG.privacyEmail}
              </a>
            </p>
          ) : import.meta.env.DEV ? (
            <p>TODO: Replace with verified production information before publishing.</p>
          ) : null}
          {PRIVACY_CONTACT_CONFIG.supportEmail && (
            <p>
              Support contact:{' '}
              <a
                href={`mailto:${PRIVACY_CONTACT_CONFIG.supportEmail}`}
                className="text-calm-cyan underline-offset-2 hover:underline"
              >
                {PRIVACY_CONTACT_CONFIG.supportEmail}
              </a>
            </p>
          )}
          {PRIVACY_CONTACT_CONFIG.dataProtectionContact && (
            <p>Data protection contact: {PRIVACY_CONTACT_CONFIG.dataProtectionContact}</p>
          )}
          {PRIVACY_CONTACT_CONFIG.mailingAddress && (
            <p>Mailing address: {PRIVACY_CONTACT_CONFIG.mailingAddress}</p>
          )}
          {PRIVACY_FEATURE_FLAGS.privacyRequestFormEnabled ? (
            <div className="pt-2">
              <PrivacyRequestForm />
            </div>
          ) : (
            <p>
              Privacy request submission is not yet available through the website. Use the verified
              privacy contact method when it is published.
            </p>
          )}
          <p>
            Need support? Visit{' '}
            <Link to="/safety-resources" className="text-calm-cyan underline-offset-2 hover:underline">
              Safety Resources
            </Link>
            . The privacy contact is not an emergency service.
          </p>
        </div>
      )

    default:
      return null
  }
}
