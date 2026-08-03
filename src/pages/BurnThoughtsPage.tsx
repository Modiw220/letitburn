import Header from '../components/layout/Header'
import Footer from '../components/layout/Footer'
import BurnExperience from '../components/burn/BurnExperience'

interface BurnThoughtsPageProps {
  theme: 'dark' | 'light'
  onToggleTheme: () => void
}

export default function BurnThoughtsPage({
  theme,
  onToggleTheme,
}: BurnThoughtsPageProps) {
  return (
    <>
      <Header theme={theme} onToggleTheme={onToggleTheme} />
      <main>
        <BurnExperience />
      </main>
      <Footer />
    </>
  )
}
