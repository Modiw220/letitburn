import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom'
import { useMemo } from 'react'
import { useTheme } from './hooks/useTheme'
import HomePage from './pages/HomePage'
import BurnThoughtsPage from './pages/BurnThoughtsPage'
import RelaxingDrawingPage from './pages/RelaxingDrawingPage'
import SoundsPage from './pages/SoundsPage'
import QuizzesPage from './pages/QuizzesPage'
import IndividualQuizPage from './pages/IndividualQuizPage'
import SupportPage from './pages/SupportPage'
import AboutPage from './pages/AboutPage'
import PrivacyPage from './pages/PrivacyPage'
import PricingPage from './pages/PricingPage'

function App() {
  const { theme, toggleTheme } = useTheme()

  const router = useMemo(
    () =>
      createBrowserRouter([
        {
          path: '/',
          element: (
            <HomePage theme={theme} onToggleTheme={toggleTheme} />
          ),
        },
        {
          path: '/burn-thoughts',
          element: (
            <BurnThoughtsPage theme={theme} onToggleTheme={toggleTheme} />
          ),
        },
        {
          path: '/relaxing-drawing',
          element: (
            <RelaxingDrawingPage theme={theme} onToggleTheme={toggleTheme} />
          ),
        },
        {
          path: '/sounds',
          element: (
            <SoundsPage theme={theme} onToggleTheme={toggleTheme} />
          ),
        },
        {
          path: '/white-noise',
          element: <Navigate to="/sounds" replace />,
        },
        {
          path: '/quizzes',
          element: (
            <QuizzesPage theme={theme} onToggleTheme={toggleTheme} />
          ),
        },
        {
          path: '/quizzes/:quizSlug',
          element: (
            <IndividualQuizPage theme={theme} onToggleTheme={toggleTheme} />
          ),
        },
        {
          path: '/support',
          element: (
            <SupportPage theme={theme} onToggleTheme={toggleTheme} />
          ),
        },
        {
          path: '/donate',
          element: <Navigate to="/support" replace />,
        },
        {
          path: '/about',
          element: (
            <AboutPage theme={theme} onToggleTheme={toggleTheme} />
          ),
        },
        {
          path: '/privacy',
          element: (
            <PrivacyPage theme={theme} onToggleTheme={toggleTheme} />
          ),
        },
        {
          path: '/pricing',
          element: (
            <PricingPage theme={theme} onToggleTheme={toggleTheme} />
          ),
        },
        {
          path: '/upgrades',
          element: <Navigate to="/pricing" replace />,
        },
      ]),
    [theme, toggleTheme],
  )

  return <RouterProvider router={router} />
}

export default App
