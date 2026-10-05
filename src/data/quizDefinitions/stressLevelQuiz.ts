import type { QuizDefinition } from '../../types/quizEngine'

export const stressLevelQuiz: QuizDefinition = {
  id: 'stress-level',
  slug: 'stress-level-quiz',
  title: 'Stress Level Quiz',
  eyebrow: 'STRESS LEVEL QUIZ',
  introHeading: 'How is pressure showing up for you?',
  introDescription:
    'This short reflection can help you notice how demands, tension, rest, and daily overwhelm may currently be affecting you.',
  estimatedMinutes: 2,
  accentColor: '#5B8DEF',
  questions: [
    {
      id: 'sl-q1',
      order: 1,
      text: 'I can manage what is expected of me without constant pressure.',
      dimension: 'pressure-demands',
    },
    {
      id: 'sl-q2',
      order: 2,
      text: 'I keep up with daily responsibilities without feeling constantly rushed.',
      dimension: 'pressure-demands',
    },
    {
      id: 'sl-q3',
      order: 3,
      text: 'My body stays relatively settled during ordinary parts of the day.',
      dimension: 'physical-tension',
    },
    {
      id: 'sl-q4',
      order: 4,
      text: 'I can help my body settle when I pause.',
      dimension: 'physical-tension',
    },
    {
      id: 'sl-q5',
      order: 5,
      text: 'I get enough rest to feel somewhat recovered.',
      dimension: 'rest-recovery',
    },
    {
      id: 'sl-q6',
      order: 6,
      text: 'I can step away from demands long enough to reset.',
      dimension: 'rest-recovery',
    },
    {
      id: 'sl-q7',
      order: 7,
      text: 'My evenings or free time still leave room for recovery.',
      dimension: 'rest-recovery',
    },
    {
      id: 'sl-q8',
      order: 8,
      text: 'I can handle small interruptions without feeling overloaded.',
      dimension: 'daily-overwhelm',
    },
    {
      id: 'sl-q9',
      order: 9,
      text: 'Unfinished tasks do not crowd my mind all day.',
      dimension: 'daily-overwhelm',
    },
    {
      id: 'sl-q10',
      order: 10,
      text: 'I can still find a moment of calm during a busy day.',
      dimension: 'daily-overwhelm',
    },
  ],
}
