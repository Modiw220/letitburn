import { useCallback, useEffect, useRef, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { formatCurrencyWithCode } from '../../utils/formatCurrency'
import { isDonationPaymentConfigured } from '../../services/donationPaymentService'
import { useDonationAmount } from '../../hooks/useDonationAmount'
import { useDonationPayment } from '../../hooks/useDonationPayment'
import CustomDonationInput from './CustomDonationInput'
import DonationPaymentPanel from './DonationPaymentPanel'
import DonationSuccess from './DonationSuccess'
import DonationSummary from './DonationSummary'
import DonationTierSelector from './DonationTierSelector'
import DonationVerification from './DonationVerification'

export default function DonationSection() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [showPaymentPanel, setShowPaymentPanel] = useState(false)
  const [liveMessage, setLiveMessage] = useState('')
  const returnVerifiedRef = useRef(false)
  const {
    selection,
    selectTier,
    setCustomAmount,
    validation,
    isCustomSelected,
    clearSelection,
  } = useDonationAmount()

  const announce = useCallback((message: string) => {
    setLiveMessage(message)
  }, [])

  const payment = useDonationPayment({
    onVerified: () => setShowPaymentPanel(false),
    announce,
  })

  const handleSelectTierFixed = (tierId: string) => {
    selectTier(tierId)
    setShowPaymentPanel(false)
    payment.resetPayment()
    const amounts: Record<string, string> = {
      'tier-1': 'One dollar donation selected',
      'tier-3': 'Three dollar donation selected',
      'tier-5': 'Five dollar donation selected',
      'tier-custom': 'Custom donation selected',
    }
    announce(amounts[tierId] ?? 'Donation selected')
  }

  const handleContinue = () => {
    if (!validation.valid || !validation.amount || !validation.amountInMinorUnits) return
    setShowPaymentPanel(true)
  }

  const handleCheckout = () => {
    if (!validation.valid || !validation.amount || !validation.amountInMinorUnits) return
    void payment.startCheckout(validation.amount, validation.amountInMinorUnits)
  }

  const paymentConfigured = isDonationPaymentConfigured()

  useEffect(() => {
    const sessionId = searchParams.get('session_id')
    const fakeSuccess = searchParams.get('donation') === 'success'

    if (fakeSuccess && !sessionId) {
      setSearchParams({}, { replace: true })
      return
    }

    if (!sessionId || returnVerifiedRef.current || !paymentConfigured) return

    returnVerifiedRef.current = true
    setShowPaymentPanel(true)
    void payment.verifyDonation(sessionId).finally(() => {
      setSearchParams({}, { replace: true })
    })
  }, [payment.verifyDonation, paymentConfigured, searchParams, setSearchParams])

  return (
    <section id="donate" className="mt-16 md:mt-20" aria-labelledby="donate-heading">
      <div className="sr-only" aria-live="polite">
        {liveMessage}
      </div>

      <div className="mx-auto max-w-[820px]">
        <h2 id="donate-heading" className="text-center font-heading text-2xl font-semibold text-text-main md:text-3xl">
          Choose what feels comfortable.
        </h2>
        <p className="mt-3 text-center text-sm text-text-muted md:text-base">
          Every amount is optional. Use the website whether or not you donate.
        </p>

        <div className="donation-panel mt-8 rounded-3xl border border-support-gold/15 bg-bg-card/70 p-5 md:p-8">
          <p className="text-center text-sm font-medium text-text-main">One-time donation</p>
          <p className="mt-1 text-center text-sm text-text-muted">
            No subscription or recurring charge.
          </p>

          {!payment.isSuccess && (
            <>
              <div className="mt-8">
                <DonationTierSelector
                  selectedTierId={selection.tierId}
                  onSelect={handleSelectTierFixed}
                />
              </div>

              {isCustomSelected && (
                <CustomDonationInput
                  value={selection.customAmount}
                  onChange={setCustomAmount}
                  error={validation.error}
                  describedById="custom-donation-error"
                />
              )}

              {validation.valid && validation.amount && !showPaymentPanel && (
                <DonationSummary
                  amount={validation.amount}
                  onContinue={handleContinue}
                  onChangeAmount={clearSelection}
                  paymentConfigured={paymentConfigured}
                />
              )}

              {showPaymentPanel && validation.valid && validation.amount && validation.amountInMinorUnits && paymentConfigured && (
                <>
                  {payment.status === 'verifying' || payment.status === 'creating-session' ? (
                    <DonationVerification
                      message={
                        payment.status === 'creating-session'
                          ? 'Preparing secure payment…'
                          : 'Confirming your donation…'
                      }
                    />
                  ) : (
                    <DonationPaymentPanel
                      formattedAmount={formatCurrencyWithCode(validation.amount)}
                      amount={validation.amount}
                      amountInMinorUnits={validation.amountInMinorUnits}
                      isMockMode={payment.isMockMode}
                      status={payment.status}
                      errorMessage={payment.errorMessage}
                      onContinue={handleCheckout}
                      onReturn={() => setShowPaymentPanel(false)}
                      onSimulate={(outcome) =>
                        void payment.simulateMockDonation(
                          outcome,
                          validation.amount!,
                          validation.amountInMinorUnits!,
                        )
                      }
                    />
                  )}
                </>
              )}

              {!paymentConfigured && (
                <p className="mt-6 text-center text-sm text-text-muted">
                  Online donations are not configured yet. Check back later.
                </p>
              )}

              {payment.status === 'cancelled' && payment.errorMessage && (
                <p className="mt-4 text-center text-sm text-text-muted" role="status">
                  Donation cancelled. You can try again whenever you choose.
                </p>
              )}
            </>
          )}

          {payment.isSuccess && payment.verification && (
            <DonationSuccess verification={payment.verification} />
          )}
        </div>
      </div>
    </section>
  )
}
