import Header from '../components/layout/Header'
import Footer from '../components/layout/Footer'
import DrawingWorkspace from '../components/drawing/DrawingWorkspace'

interface RelaxingDrawingPageProps {
  theme: 'dark' | 'light'
  onToggleTheme: () => void
}

export default function RelaxingDrawingPage({
  theme,
  onToggleTheme,
}: RelaxingDrawingPageProps) {
  return (
    <>
      <Header theme={theme} onToggleTheme={onToggleTheme} />
      <main className="content-container py-6 md:py-12">
        <DrawingWorkspace />
      </main>
      <Footer />
    </>
  )
}
