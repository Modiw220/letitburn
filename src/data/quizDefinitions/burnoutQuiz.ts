import type { QuizDefinition } from '../../types/quizEngine'

export const burnoutQuiz: QuizDefinition = {
  id: 'burnout',
  slug: 'burnout-quiz',
  title: 'Burnout Quiz',
  eyebrow: 'BURNOUT QUIZ',
  introHeading: 'How much energy do you have left?',
  introDescription:
    'This reflection explores exhaustion, motivation, detachment, and whether your workload still feels workable.',
  estimatedMinutes: 4,
  accentColor: '#E8956A',
  questions: [
    {
      id: 'bo-q1',
      order: 1,
      text: 'I finish ordinary days without feeling completely worn out.',
      dimension: 'exhaustion',
    },
    {
      id: 'bo-q2',
      order: 2,
      text: 'Getting started still feels doable most days.',
      dimension: 'exhaustion',
    },
    {
      id: 'bo-q3',
      order: 3,
      text: 'Rest restores me enough to continue.',
      dimension: 'exhaustion',
    },
    {
      id: 'bo-q4',
      order: 4,
      text: 'I have energy available through most of the day.',
      dimension: 'exhaustion',
    },
    {
      id: 'bo-q5',
      order: 5,
      text: 'I still feel interested in work or responsibilities that once mattered to me.',
      dimension: 'motivation',
    },
    {
      id: 'bo-q6',
      order: 6,
      text: 'I can find meaning in at least some of what I do.',
      dimension: 'motivation',
    },
    {
      id: 'bo-q7',
      order: 7,
      text: 'I feel able to care about the quality of my effort.',
      dimension: 'motivation',
    },
    {
      id: 'bo-q8',
      order: 8,
      text: 'I still have goals that feel worth moving toward.',
      dimension: 'motivation',
    },
    {
      id: 'bo-q9',
      order: 9,
      text: 'I still feel emotionally present with people or roles that matter.',
      dimension: 'detachment',
    },
    {
      id: 'bo-q10',
      order: 10,
      text: 'I can stay present rather than only going through the motions.',
      dimension: 'detachment',
    },
    {
      id: 'bo-q11',
      order: 11,
      text: 'I feel as patient and connected as I want to be most days.',
      dimension: 'detachment',
    },
    {
      id: 'bo-q12',
      order: 12,
      text: 'I engage when I used to, rather than withdrawing.',
      dimension: 'detachment',
    },
    {
      id: 'bo-q13',
      order: 13,
      text: 'My workload feels manageable most days.',
      dimension: 'workload-capacity',
    },
    {
      id: 'bo-q14',
      order: 14,
      text: 'I have enough capacity for unexpected demands.',
      dimension: 'workload-capacity',
    },
    {
      id: 'bo-q15',
      order: 15,
      text: 'I can set limits when too much is asked of me.',
      dimension: 'workload-capacity',
    },
    {
      id: 'bo-q16',
      order: 16,
      text: 'I finish most days with some energy still available.',
      dimension: 'workload-capacity',
    },
  ],
}
