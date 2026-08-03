import { getQuizRoute, quizzes } from '../data/quizzes'

const SITE_ORIGIN =
  typeof window !== 'undefined' ? window.location.origin : 'https://letitburn.app'

export function buildQuizItemListStructuredData() {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Self-Reflection Quizzes',
    description:
      'Short self-reflection quizzes about emotional wellbeing, stress, burnout, mood, personality, attachment, and relationship patterns.',
    numberOfItems: quizzes.length,
    itemListElement: quizzes.map((quiz, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: quiz.title,
      description: quiz.description,
      url: `${SITE_ORIGIN}${getQuizRoute(quiz.slug)}`,
    })),
  }
}
