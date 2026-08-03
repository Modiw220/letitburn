import { useCallback, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import Header from '../components/layout/Header'
import Footer from '../components/layout/Footer'
import FullReportPreview from '../components/quizzes/FullReportPreview'
import QuizDisclaimer from '../components/quizzes/QuizDisclaimer'
import QuizFaq from '../components/quizzes/QuizFaq'
import QuizFilters from '../components/quizzes/QuizFilters'
import QuizGrid from '../components/quizzes/QuizGrid'
import QuizHowItWorks from '../components/quizzes/QuizHowItWorks'
import QuizPrivacyNotice from '../components/quizzes/QuizPrivacyNotice'
import QuizSupportPanel from '../components/quizzes/QuizSupportPanel'
import QuizTrustStrip from '../components/quizzes/QuizTrustStrip'
import QuizzesHero from '../components/quizzes/QuizzesHero'
import { useQuizFilters, type QuizFilterCategory } from '../hooks/useQuizFilters'
import { useQuizSearch } from '../hooks/useQuizSearch'
import { useQuizzesPageMeta } from '../hooks/usePageMeta'
import { useReducedMotion } from '../hooks/useReducedMotion'

interface QuizzesPageProps {
  theme: 'dark' | 'light'
  onToggleTheme: () => void
}

const VALID_CATEGORIES = new Set<QuizFilterCategory>([
  'all',
  'wellbeing',
  'stress-mood',
  'personality',
  'relationships',
])

function QuizzesPageContent() {
  useQuizzesPageMeta()
  const reducedMotion = useReducedMotion()
  const [searchParams, setSearchParams] = useSearchParams()

  const initialCategory = searchParams.get('category')
  const initialSearch = searchParams.get('search') ?? ''

  const { searchTerm, setSearchTerm, clearSearch } = useQuizSearch(initialSearch)
  const { category, setCategory, filteredQuizzes, resultLabel, resetFilters } =
    useQuizFilters(searchTerm)

  useEffect(() => {
    if (initialCategory && VALID_CATEGORIES.has(initialCategory as QuizFilterCategory)) {
      setCategory(initialCategory as QuizFilterCategory)
    }
  }, [initialCategory, setCategory])

  useEffect(() => {
    const params = new URLSearchParams()
    if (category !== 'all') params.set('category', category)
    if (searchTerm.trim()) params.set('search', searchTerm.trim())
    setSearchParams(params, { replace: true })
  }, [category, searchTerm, setSearchParams])

  const handleViewAll = useCallback(() => {
    resetFilters()
    clearSearch()
  }, [clearSearch, resetFilters])

  return (
    <main
      className={`quizzes-page relative py-8 md:py-12 ${
        reducedMotion ? 'quizzes-page--reduced' : ''
      }`}
    >
      <div className="quizzes-page-glow" aria-hidden="true" />

      <div className="content-container relative z-[1]">
        <QuizzesHero />
        <QuizTrustStrip />

        <section id="quiz-list" className="mt-12 md:mt-14" aria-labelledby="quiz-list-heading">
          <h2 id="quiz-list-heading" className="sr-only">
            Quiz listing
          </h2>

          <QuizFilters
            category={category}
            onCategoryChange={setCategory}
            resultLabel={resultLabel}
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            onSearchClear={clearSearch}
          />

          <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
            <QuizGrid
              quizzes={filteredQuizzes}
              hasSearch={Boolean(searchTerm.trim())}
              onClearSearch={clearSearch}
              onViewAll={handleViewAll}
            />
          </div>

          <QuizDisclaimer />
        </section>

        <QuizHowItWorks />
        <FullReportPreview />
        <QuizPrivacyNotice />
        <QuizFaq />
        <QuizSupportPanel />
      </div>
    </main>
  )
}

export default function QuizzesPage({ theme, onToggleTheme }: QuizzesPageProps) {
  return (
    <>
      <Header theme={theme} onToggleTheme={onToggleTheme} />
      <QuizzesPageContent />
      <Footer />
    </>
  )
}
