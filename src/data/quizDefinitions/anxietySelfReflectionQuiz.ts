import type { QuizDefinition } from '../../types/quizEngine'

export const anxietySelfReflectionQuiz: QuizDefinition = {
  id: 'anxiety-reflection',
  slug: 'anxiety-self-reflection',
  title: 'Anxiety Self-Reflection',
  eyebrow: 'ANXIETY SELF-REFLECTION',
  introHeading: 'What worry patterns are showing up?',
  introDescription:
    'This gentle reflection helps you notice worry, body tension, uncertainty, avoidance, and feeling on edge.',
  estimatedMinutes: 3,
  accentColor: '#9B7EBD',
  questions: [
    {
      id: 'ax-q1',
      order: 1,
      text: 'I can return my focus after a worrying thought shows up.',
      dimension: 'worry-thinking',
    },
    {
      id: 'ax-q2',
      order: 2,
      text: 'I can leave conversations or problems alone without long mental replay.',
      dimension: 'worry-thinking',
    },
    {
      id: 'ax-q3',
      order: 3,
      text: 'I can pause a worrying thought without spiraling for long.',
      dimension: 'worry-thinking',
    },
    {
      id: 'ax-q4',
      order: 4,
      text: 'I can tell useful caution apart from unhelpful worry.',
      dimension: 'worry-thinking',
    },
    {
      id: 'ax-q5',
      order: 5,
      text: 'My body stays relatively calm during ordinary moments.',
      dimension: 'anxiety-tension',
    },
    {
      id: 'ax-q6',
      order: 6,
      text: 'When stress rises, I can settle my breathing or muscle tension enough to continue.',
      dimension: 'anxiety-tension',
    },
    {
      id: 'ax-q7',
      order: 7,
      text: 'I can settle my body enough to continue with my day.',
      dimension: 'anxiety-tension',
    },
    {
      id: 'ax-q8',
      order: 8,
      text: 'I can stay reasonably calm even when plans are unclear.',
      dimension: 'uncertainty',
    },
    {
      id: 'ax-q9',
      order: 9,
      text: 'I can move forward without needing every detail predicted in advance.',
      dimension: 'uncertainty',
    },
    {
      id: 'ax-q10',
      order: 10,
      text: 'I can tolerate not knowing without needing immediate answers.',
      dimension: 'uncertainty',
    },
    {
      id: 'ax-q11',
      order: 11,
      text: 'I can face mildly uncomfortable situations without shutting down.',
      dimension: 'avoidance-edge',
    },
    {
      id: 'ax-q12',
      order: 12,
      text: 'After a stressful moment, I can return to a steadier state.',
      dimension: 'avoidance-edge',
    },
    {
      id: 'ax-q13',
      order: 13,
      text: 'I approach situations that matter even when I feel uneasy.',
      dimension: 'avoidance-edge',
    },
    {
      id: 'ax-q14',
      order: 14,
      text: 'I have at least one way to calm myself when worry rises.',
      dimension: 'avoidance-edge',
    },
  ],
}
