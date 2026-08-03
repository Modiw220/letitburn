import type { ReflectionDimension } from '../types/quizEngine'
import type { BasicQuizResult } from '../types/quizResults'
import { findAttentionDimension, findStrongestDimension } from './calculateDimensionScores'

const PROMPT_POOL: Record<string, string[]> = {
  'emotional-awareness': [
    'What feeling has been asking for more attention recently?',
    'When do you notice emotions building before you can name them?',
    'What helps you stay present with a feeling without rushing to fix it?',
  ],
  'energy-rest': [
    'Which part of your routine takes more energy than it gives back?',
    'What would a realistic rest break look like today?',
    'Where could you create a little more recovery space this week?',
  ],
  connection: [
    'Who helps you feel most like yourself?',
    'What kind of support would feel realistic rather than ideal?',
    'When did you last feel understood, even briefly?',
  ],
  'coping-recovery': [
    'What has helped you recover from a difficult day before?',
    'What is one calming action you could repeat when stress rises?',
    'What small boundary could protect your energy right now?',
  ],
  general: [
    'What is one thing you could release or simplify today?',
    'What support would feel gentle rather than demanding?',
    'What pattern in your answers feels most worth noticing?',
  ],
}

export function selectReflectionPrompts(result: BasicQuizResult): string[] {
  const strongest = findStrongestDimension(result.dimensions)
  const attention = findAttentionDimension(result.dimensions)

  const prompts = new Set<string>()

  for (const prompt of PROMPT_POOL[attention].slice(0, 2)) {
    prompts.add(prompt)
  }
  for (const prompt of PROMPT_POOL[strongest].slice(0, 1)) {
    prompts.add(prompt)
  }

  if (result.totalScore <= 15) {
    prompts.add('What is one small source of support you could reach for today?')
  } else if (result.totalScore <= 31) {
    prompts.add('Which area feels steadier, and how could it support a harder area?')
  } else {
    prompts.add('What routines or relationships are worth protecting right now?')
  }

  for (const prompt of PROMPT_POOL.general) {
    if (prompts.size >= 6) break
    prompts.add(prompt)
  }

  return Array.from(prompts).slice(0, 6)
}

export function getDimensionPrompt(dimension: ReflectionDimension): string {
  return PROMPT_POOL[dimension][0]
}
