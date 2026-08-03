import Header from '../components/layout/Header'
import Footer from '../components/layout/Footer'
import DonationPrivacyNotice from '../components/support/DonationPrivacyNotice'
import DonationSection from '../components/support/DonationSection'
import DonationTransparency from '../components/support/DonationTransparency'
import FinalSupportMessage from '../components/support/FinalSupportMessage'
import ImpactGrid from '../components/support/ImpactGrid'
import MissionSection from '../components/support/MissionSection'
import OtherWaysToSupport from '../components/support/OtherWaysToSupport'
import SupportHero from '../components/support/SupportHero'
import SupportSafetyNotice from '../components/support/SupportSafetyNotice'
import { usePageMeta } from '../hooks/usePageMeta'
import { useReducedMotion } from '../hooks/useReducedMotion'

interface SupportPageProps {
  theme: 'dark' | 'light'
  onToggleTheme: () => void
}

function SupportPageContent() {
  usePageMeta({
    title: 'Support Let It Burn',
    description:
      'Support Let It Burn and help maintain free private emotional-release, relaxation, sound, drawing, and self-reflection tools.',
    canonicalPath: '/support',
  })

  const reducedMotion = useReducedMotion()

  return (
    <main
      className={`support-page relative py-8 md:py-12 ${
        reducedMotion ? 'support-page--reduced' : ''
      }`}
    >
      <div className="support-page-glow" aria-hidden="true" />

      <div className="content-container relative z-[1] mx-auto max-w-[1200px]">
        <SupportHero />
        <DonationSection />
        <ImpactGrid />
        <MissionSection />
        <DonationTransparency />
        <OtherWaysToSupport />
        <FinalSupportMessage />
        <SupportSafetyNotice />
        <DonationPrivacyNotice />
      </div>
    </main>
  )
}

export default function SupportPage({ theme, onToggleTheme }: SupportPageProps) {
  return (
    <>
      <Header theme={theme} onToggleTheme={onToggleTheme} />
      <SupportPageContent />
      <Footer />
    </>
  )
}
