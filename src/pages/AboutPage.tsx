import { useMemo } from 'react'
import Header from '../components/layout/Header'
import Footer from '../components/layout/Footer'
import AboutClosingSection from '../components/about/AboutClosingSection'
import AboutHero from '../components/about/AboutHero'
import AboutSafetySection from '../components/about/AboutSafetySection'
import AboutToolsGrid from '../components/about/AboutToolsGrid'
import FundingTransparency from '../components/about/FundingTransparency'
import PlatformBoundaries from '../components/about/PlatformBoundaries'
import PlatformDefinition from '../components/about/PlatformDefinition'
import PrivacyPhilosophy from '../components/about/PrivacyPhilosophy'
import { usePageMeta } from '../hooks/usePageMeta'
import { useReducedMotion } from '../hooks/useReducedMotion'
import { buildAboutPageStructuredData } from '../utils/aboutStructuredData'

interface AboutPageProps {
  theme: 'dark' | 'light'
  onToggleTheme: () => void
}

function AboutPageContent() {
  const structuredData = useMemo(() => buildAboutPageStructuredData(), [])

  usePageMeta({
    title: 'About Let It Burn | Private Reflection and Relaxation Tools',
    description:
      'Learn what Let It Burn is, why anonymous emotional release matters, and how the platform approaches privacy, safety, and self-reflection.',
    canonicalPath: '/about',
    structuredData,
  })

  const reducedMotion = useReducedMotion()

  return (
    <main
      className={`about-page relative py-8 md:py-12 ${
        reducedMotion ? 'about-page--reduced' : ''
      }`}
    >
      <div className="about-page-glow" aria-hidden="true" />

      <div className="content-container relative z-[1] mx-auto max-w-[1200px]">
        <AboutHero />
        <div className="mt-16 rounded-[28px] border border-border-card bg-bg-card/40 px-5 py-6 md:px-8 md:py-8">
          <PlatformDefinition />
          <PlatformBoundaries />
        </div>
        <div className="mt-10 rounded-[28px] border border-border-card bg-bg-card/28 px-5 py-6 md:px-8 md:py-8">
          <PrivacyPhilosophy />
          <AboutToolsGrid />
        </div>
        <div className="mt-10 rounded-[28px] border border-border-card bg-bg-card/20 px-5 py-6 md:px-8 md:py-8">
          <FundingTransparency />
          <AboutSafetySection />
        </div>
        <AboutClosingSection />
      </div>
    </main>
  )
}

export default function AboutPage({ theme, onToggleTheme }: AboutPageProps) {
  return (
    <>
      <Header theme={theme} onToggleTheme={onToggleTheme} />
      <AboutPageContent />
      <Footer />
    </>
  )
}
