import type { QuizDefinition } from '../../types/quizEngine'

export const lowMoodSelfReflectionQuiz: QuizDefinition = {
  id: 'low-mood-reflection',
  slug: 'low-mood-self-reflection',
  title: 'Low Mood Self-Reflection',
  eyebrow: 'LOW MOOD SELF-REFLECTION',
  introHeading: 'How has your mood been lately?',
  introDescription:
    'This gentle check-in looks at mood, interest, energy, sleep, motivation, and connection with daily life.',
  estimatedMinutes: 3,
  accentColor: '#6B8FA3',
  questions: [
    {
      id: 'lm-q1',
      order: 1,
      text: 'I can still enjoy small parts of my day.',
      dimension: 'mood-interest',
    },
    {
      id: 'lm-q2',
      order: 2,
      text: 'Things that usually matter to me still feel somewhat interesting.',
      dimension: 'mood-interest',
    },
    {
      id: 'lm-q3',
      order: 3,
      text: 'My mood feels light enough to get through most of the day.',
      dimension: 'mood-interest',
    },
    {
      id: 'lm-q4',
      order: 4,
      text: 'I believe this heavier period can shift, even if slowly.',
      dimension: 'mood-interest',
    },
    {
      id: 'lm-q5',
      order: 5,
      text: 'I have enough energy to handle basic daily tasks.',
      dimension: 'energy-motivation',
    },
    {
      id: 'lm-q6',
      order: 6,
      text: 'I can start tasks even when motivation feels low.',
      dimension: 'energy-motivation',
    },
    {
      id: 'lm-q7',
      order: 7,
      text: 'I feel motivated to care for myself in small ways.',
      dimension: 'energy-motivation',
    },
    {
      id: 'lm-q8',
      order: 8,
      text: 'My sleep leaves me feeling at least somewhat rested.',
      dimension: 'sleep-rest',
    },
    {
      id: 'lm-q9',
      order: 9,
      text: 'I can fall asleep or return to sleep without long struggle most nights.',
      dimension: 'sleep-rest',
    },
    {
      id: 'lm-q10',
      order: 10,
      text: 'Rest helps my mood more than it feels pointless.',
      dimension: 'sleep-rest',
    },
    {
      id: 'lm-q11',
      order: 11,
      text: 'I still feel connected to parts of my daily routine.',
      dimension: 'daily-engagement',
    },
    {
      id: 'lm-q12',
      order: 12,
      text: 'I can reach out to someone or accept contact when I need it.',
      dimension: 'daily-engagement',
    },
    {
      id: 'lm-q13',
      order: 13,
      text: 'I get through the day without feeling completely withdrawn.',
      dimension: 'daily-engagement',
    },
    {
      id: 'lm-q14',
      order: 14,
      text: 'I can name one thing that might support my mood today.',
      dimension: 'daily-engagement',
    },
  ],
}
