import type { ScoreRange } from '../types/quizResults'

export const EMOTIONAL_WELLBEING_SCORE_RANGES: ScoreRange[] = [
  {
    min: 0,
    max: 15,
    label: 'You may be carrying a lot right now.',
    explanation:
      'Your answers suggest that several parts of your wellbeing may currently feel difficult or depleted. This result is not a diagnosis. It may be useful to focus on one small source of support rather than trying to change everything at once.',
    suggestedNextStep:
      'Choose one gentle action: rest for a few minutes, write down what feels heavy, or reach out to someone you trust.',
  },
  {
    min: 16,
    max: 31,
    label: 'Your wellbeing looks mixed.',
    explanation:
      'Your answers suggest that some areas may feel steady while others need more attention. This is common when life contains both supportive and difficult experiences.',
    suggestedNextStep:
      'Notice your strongest area and use it to support the area that currently feels more difficult.',
  },
  {
    min: 32,
    max: 48,
    label: 'You appear to have several steady supports.',
    explanation:
      'Your answers suggest that you currently have access to several helpful emotional, social, or recovery resources. This does not mean every day feels easy.',
    suggestedNextStep:
      'Protect the routines, relationships, and coping tools that are currently supporting you.',
  },
]
