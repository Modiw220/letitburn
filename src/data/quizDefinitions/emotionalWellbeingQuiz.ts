import type { QuizDefinition } from '../../types/quizEngine'

export const emotionalWellbeingQuiz: QuizDefinition = {
  id: 'emotional-wellbeing',
  slug: 'emotional-wellbeing-check-in',
  title: 'Emotional Wellbeing Check-In',
  eyebrow: 'EMOTIONAL WELLBEING CHECK-IN',
  introHeading: 'How have you been feeling lately?',
  introDescription:
    'This short check-in can help you reflect on your emotions, energy, relationships, and ability to recover from difficult moments.',
  estimatedMinutes: 3,
  accentColor: '#46CAD4',
  questions: [
    {
      id: 'ew-q1',
      order: 1,
      text: 'I can recognize what I am feeling.',
      dimension: 'emotional-awareness',
    },
    {
      id: 'ew-q2',
      order: 2,
      text: 'I can express my emotions in a way that feels manageable.',
      dimension: 'emotional-awareness',
    },
    {
      id: 'ew-q3',
      order: 3,
      text: 'I can make space for difficult feelings without becoming completely overwhelmed.',
      dimension: 'emotional-awareness',
    },
    {
      id: 'ew-q4',
      order: 4,
      text: 'I have enough energy for the basic parts of my day.',
      dimension: 'energy-rest',
    },
    {
      id: 'ew-q5',
      order: 5,
      text: 'I have been able to rest or slow down when I need to.',
      dimension: 'energy-rest',
    },
    {
      id: 'ew-q6',
      order: 6,
      text: 'My daily routine leaves some room for recovery.',
      dimension: 'energy-rest',
    },
    {
      id: 'ew-q7',
      order: 7,
      text: 'I feel connected to at least one person I trust.',
      dimension: 'connection',
    },
    {
      id: 'ew-q8',
      order: 8,
      text: 'I feel able to ask for support when I need it.',
      dimension: 'connection',
    },
    {
      id: 'ew-q9',
      order: 9,
      text: 'I have moments when I feel understood or less alone.',
      dimension: 'connection',
    },
    {
      id: 'ew-q10',
      order: 10,
      text: 'I have at least one healthy way to calm myself during stress.',
      dimension: 'coping-recovery',
    },
    {
      id: 'ew-q11',
      order: 11,
      text: 'I can recover after a difficult moment, even if it takes time.',
      dimension: 'coping-recovery',
    },
    {
      id: 'ew-q12',
      order: 12,
      text: 'I can identify one small action that may support me today.',
      dimension: 'coping-recovery',
    },
  ],
}
