import Header from '../components/layout/Header'
import Footer from '../components/layout/Footer'
import HeroSection from '../components/home/HeroSection'
import ToolsSection from '../components/home/ToolsSection'
import SupportSection from '../components/home/SupportSection'
import TrustSection from '../components/home/TrustSection'

interface HomePageProps {
  theme: 'dark' | 'light'
  onToggleTheme: () => void
}

export default function HomePage({ theme, onToggleTheme }: HomePageProps) {
  return (
    <>
      <Header theme={theme} onToggleTheme={onToggleTheme} />
      <main>
        <HeroSection />
        <ToolsSection />
        <SupportSection />
        <TrustSection />
      </main>
      <Footer />
    </>
  )
}
