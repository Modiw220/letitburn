import type { QuizDefinition } from '../../types/quizEngine'

export const attachmentStyleQuiz: QuizDefinition = {
  id: 'attachment-style',
  slug: 'attachment-style-test',
  title: 'Attachment Style Test',
  eyebrow: 'ATTACHMENT STYLE TEST',
  introHeading: 'How do you respond to closeness and distance?',
  introDescription:
    'Explore how you may respond to closeness, distance, trust, reassurance, and emotional connection.',
  estimatedMinutes: 4,
  accentColor: '#E8A0B0',
  questions: [
    {
      id: 'as-q1',
      order: 1,
      text: 'I can enjoy closeness without feeling trapped.',
      dimension: 'closeness-comfort',
    },
    {
      id: 'as-q2',
      order: 2,
      text: 'I let people matter to me without constant fear of losing myself.',
      dimension: 'closeness-comfort',
    },
    {
      id: 'as-q3',
      order: 3,
      text: 'Warmth from others feels welcome more often than overwhelming.',
      dimension: 'closeness-comfort',
    },
    {
      id: 'as-q4',
      order: 4,
      text: 'I can stay connected while still keeping personal space.',
      dimension: 'closeness-comfort',
    },
    {
      id: 'as-q5',
      order: 5,
      text: 'When someone needs space, I can stay steady rather than panic.',
      dimension: 'distance-response',
    },
    {
      id: 'as-q6',
      order: 6,
      text: 'Time apart does not immediately feel like rejection.',
      dimension: 'distance-response',
    },
    {
      id: 'as-q7',
      order: 7,
      text: 'I can ask for contact without demanding constant presence.',
      dimension: 'distance-response',
    },
    {
      id: 'as-q8',
      order: 8,
      text: 'I recover when a relationship has a quiet or distant stretch.',
      dimension: 'distance-response',
    },
    {
      id: 'as-q9',
      order: 9,
      text: 'I generally trust that people who care will stay consistent enough.',
      dimension: 'trust-reassurance',
    },
    {
      id: 'as-q10',
      order: 10,
      text: 'I can accept reassurance when it is offered.',
      dimension: 'trust-reassurance',
    },
    {
      id: 'as-q11',
      order: 11,
      text: 'I can offer trust in steps rather than all at once or not at all.',
      dimension: 'trust-reassurance',
    },
    {
      id: 'as-q12',
      order: 12,
      text: 'I ask for reassurance in ways that feel clear rather than testing.',
      dimension: 'trust-reassurance',
    },
    {
      id: 'as-q13',
      order: 13,
      text: 'I feel able to share emotions with someone I trust.',
      dimension: 'emotional-bond',
    },
    {
      id: 'as-q14',
      order: 14,
      text: 'Emotional connection feels possible for me, even if it takes time.',
      dimension: 'emotional-bond',
    },
    {
      id: 'as-q15',
      order: 15,
      text: 'I can receive care without immediately pulling away.',
      dimension: 'emotional-bond',
    },
    {
      id: 'as-q16',
      order: 16,
      text: 'I stay engaged when a relationship becomes more emotionally open.',
      dimension: 'emotional-bond',
    },
    {
      id: 'as-q17',
      order: 17,
      text: 'I repair after a misunderstanding instead of shutting down completely.',
      dimension: 'emotional-bond',
    },
    {
      id: 'as-q18',
      order: 18,
      text: 'I believe secure connection is something I can grow toward.',
      dimension: 'trust-reassurance',
    },
  ],
}
