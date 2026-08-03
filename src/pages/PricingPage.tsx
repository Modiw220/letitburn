import { useMemo } from 'react'
import Header from '../components/layout/Header'
import Footer from '../components/layout/Footer'
import FreeCoreSection from '../components/pricing/FreeCoreSection'
import PricingComparisonTable from '../components/pricing/PricingComparisonTable'
import PricingConfigurationWarning from '../components/pricing/PricingConfigurationWarning'
import PricingDisclosure from '../components/pricing/PricingDisclosure'
import PricingFaq from '../components/pricing/PricingFaq'
import PricingHero from '../components/pricing/PricingHero'
import PricingPrinciples from '../components/pricing/PricingPrinciples'
import PricingSupportPanel from '../components/pricing/PricingSupportPanel'
import PurchaseProcess from '../components/pricing/PurchaseProcess'
import RelaxationBundleSection from '../components/pricing/RelaxationBundleSection'
import UpgradeCatalogue from '../components/pricing/UpgradeCatalogue'
import UpgradeFilters from '../components/pricing/UpgradeFilters'
import { useUpgradeFilters } from '../hooks/useUpgradeFilters'
import { usePageMeta } from '../hooks/usePageMeta'
import { useReducedMotion } from '../hooks/useReducedMotion'
import { buildPricingStructuredData } from '../utils/pricingStructuredData'

interface PricingPageProps {
  theme: 'dark' | 'light'
  onToggleTheme: () => void
}

function PricingPageContent() {
  const structuredData = useMemo(() => buildPricingStructuredData(), [])
  const reducedMotion = useReducedMotion()
  const { category, setCategory, filteredProducts, resultLabel } = useUpgradeFilters()

  usePageMeta({
    title: 'Pricing and Optional Upgrades | Let It Burn',
    description:
      'Compare optional Let It Burn upgrades, including quiz reports, ad-free access, coloring packs, sound tools, premium soundscapes, and planned relaxation bundles.',
    canonicalPath: '/pricing',
    ...(structuredData ? { structuredData } : {}),
  })

  return (
    <main
      className={`pricing-page relative py-8 md:py-12 ${
        reducedMotion ? 'pricing-page--reduced' : ''
      }`}
    >
      <div className="pricing-page-glow" aria-hidden="true" />

      <div className="content-container relative z-[1] mx-auto max-w-[1320px]">
        <PricingConfigurationWarning />
        <PricingHero />
        <FreeCoreSection />
        <PricingComparisonTable />
        <UpgradeFilters
          category={category}
          onCategoryChange={setCategory}
          resultLabel={resultLabel}
        />
        <UpgradeCatalogue products={filteredProducts} />
        <RelaxationBundleSection />
        <PurchaseProcess />
        <PricingPrinciples />
        <PricingFaq />
        <PricingSupportPanel />
        <PricingDisclosure />
      </div>
    </main>
  )
}

export default function PricingPage({ theme, onToggleTheme }: PricingPageProps) {
  return (
    <>
      <Header theme={theme} onToggleTheme={onToggleTheme} />
      <PricingPageContent />
      <Footer />
    </>
  )
}
