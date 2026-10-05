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
  'pressure-demands': [
    'Which expectation feels heaviest right now?',
    'What demand could be delayed, shortened, or shared?',
    'Where do you notice pressure building first in your day?',
  ],
  'physical-tension': [
    'Where does stress show up in your body first?',
    'What helps your body settle even a little?',
    'When do you first notice tension during an ordinary day?',
  ],
  'rest-recovery': [
    'What kind of rest actually helps you?',
    'Where could you protect one short recovery window?',
    'What recovery habit is easiest to keep this week?',
  ],
  'daily-overwhelm': [
    'What unfinished loop takes the most mental space?',
    'What interruption feels hardest to handle lately?',
    'Where could one calm moment fit into a busy day?',
  ],
  exhaustion: [
    'When during the day does your energy drop most?',
    'What would a gentler pace look like for the next day?',
    'What non-essential demand could wait?',
  ],
  motivation: [
    'What still carries even a small spark of meaning?',
    'Which tiny goal feels worth a little movement?',
    'What used to matter that still has a thread left?',
  ],
  detachment: [
    'Where do you most notice yourself going through the motions?',
    'What would low-pressure presence look like today?',
    'Which role or person still feels alive to you?',
  ],
  'workload-capacity': [
    'Which part of your load could bend a little?',
    'What boundary would protect your capacity this week?',
    'Where does your workload exceed what feels workable?',
  ],
  'worry-thinking': [
    'Which worry loop visits you most often?',
    'What helps you leave a thought without finishing every scenario?',
    'How do you tell useful caution from unhelpful worry?',
  ],
  'anxiety-tension': [
    'Where does anxiety show up in your body first?',
    'What body-calming tool feels most reliable?',
    'When does tension rise most during your day?',
  ],
  uncertainty: [
    'What uncertainty feels hardest to sit with?',
    'What is one thing you can control today?',
    'What helps you move forward with incomplete information?',
  ],
  'avoidance-edge': [
    'What have you been avoiding that still matters?',
    'What small approach step feels possible today?',
    'What helps you return to steady after feeling on edge?',
  ],
  'mood-interest': [
    'What small thing still brings even a faint spark?',
    'When does your mood feel a little lighter?',
    'What gentle activity might support your mood today?',
  ],
  'energy-motivation': [
    'Which basic task feels most doable today?',
    'What helps you start when motivation is uneven?',
    'Where does your energy go first each morning?',
  ],
  'sleep-rest': [
    'What most interferes with your rest right now?',
    'Which wind-down habit could you try tonight?',
    'What rest habit is worth protecting this week?',
  ],
  'daily-engagement': [
    'What tiny form of contact feels possible today?',
    'Which daily habit helps you feel less withdrawn?',
    'Who or what still anchors you to daily life?',
  ],
  'thinking-style': [
    'When do you feel most like yourself while thinking?',
    'How do you prefer to take in information?',
    'What environment fits your thinking style best?',
  ],
  'decision-making': [
    'Do you decide better quickly or with more time?',
    'What helps you stand by a decision that fits you?',
    'Which low-stakes choice could you practice today?',
  ],
  'recharge-style': [
    'What kind of downtime actually replenishes you?',
    'Do solitude or company restore you more?',
    'How can you protect your recharge needs this week?',
  ],
  'communication-style': [
    'What is your most natural way to communicate?',
    'When do you feel most understood when you speak?',
    'What need could you express in your own tone today?',
  ],
  'change-approach': [
    'Do you prefer gradual change or decisive shifts?',
    'What helps you recover footing after unexpected change?',
    'How can you break one change into a first step that fits you?',
  ],
  'closeness-comfort': [
    'What makes closeness feel safer for you?',
    'How do you keep warmth without feeling trapped?',
    'Where does closeness feel welcome right now?',
  ],
  'distance-response': [
    'What story do you tell yourself when someone needs space?',
    'What helps you stay steady during quieter stretches?',
    'How can you ask for contact without demanding it?',
  ],
  'trust-reassurance': [
    'What kind of reassurance actually helps you?',
    'How do you build trust in steps that feel safe?',
    'Who feels consistent enough to practice trust with?',
  ],
  'emotional-bond': [
    'What makes emotional openness feel possible?',
    'How do you receive care without pulling away?',
    'What helps you repair after a misunderstanding?',
  ],
  'rel-communication': [
    'What conversation have you been delaying?',
    'What helps people feel heard by you?',
    'Where could clearer wording reduce friction?',
  ],
  boundaries: [
    'Where do you most often overgive?',
    'Which boundary most improves your relationships?',
    'What clear limit could you practice this week?',
  ],
  'conflict-patterns': [
    'What usually happens for you in the middle of conflict?',
    'What helps you repair after a hard conversation?',
    'How can you stay with the issue instead of the person?',
  ],
  'emotional-needs': [
    'What do you most need from close relationships right now?',
    'How do you let yourself receive care?',
    'How can you ask for support in one clear sentence?',
  ],
  general: [
    'What is one thing you could release or simplify today?',
    'What support would feel gentle rather than demanding?',
    'What pattern in your answers feels most worth noticing?',
  ],
}

function promptsFor(dimension: ReflectionDimension): string[] {
  return PROMPT_POOL[dimension] ?? PROMPT_POOL.general
}

export function selectReflectionPrompts(result: BasicQuizResult): string[] {
  const strongest = findStrongestDimension(result.dimensions)
  const attention = findAttentionDimension(result.dimensions)

  const prompts = new Set<string>()

  for (const prompt of promptsFor(attention).slice(0, 2)) {
    prompts.add(prompt)
  }
  for (const prompt of promptsFor(strongest).slice(0, 1)) {
    prompts.add(prompt)
  }

  if (result.percentage <= 33) {
    prompts.add('What is one small source of support you could reach for today?')
  } else if (result.percentage <= 66) {
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
  return promptsFor(dimension)[0]
}
