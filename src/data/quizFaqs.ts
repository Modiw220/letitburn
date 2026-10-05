import type { QuizFaqItem } from '../types/quizzes'

export const quizFaqs: QuizFaqItem[] = [
  {
    id: 'free',
    question: 'Are the quizzes free?',
    answer:
      'Yes. Every quiz includes a free basic result. A more detailed $1 report may be offered after completion.',
  },
  {
    id: 'diagnosis',
    question: 'Are these quizzes a diagnosis?',
    answer:
      'No. They are designed for personal reflection and are not medical or psychological assessments.',
  },
  {
    id: 'account',
    question: 'Do I need an account?',
    answer: 'No account is required to browse or begin quizzes. Sign in is required only to buy and restore full reports.',
  },
  {
    id: 'report',
    question: 'What is included in the $1 report?',
    answer:
      'The planned report includes a more detailed explanation, answer-pattern breakdown, and reflection prompts.',
  },
]
