import { CALMING_EXERCISES } from '../data/calmingExercises'
import { DIMENSION_LABELS, type QuizDefinition } from '../types/quizEngine'
import type {
  BasicQuizResult,
  DimensionReportSection,
  FullReflectionReport,
} from '../types/quizResults'
import {
  findAttentionDimension,
  findStrongestDimension,
} from './calculateDimensionScores'
import {
  getDimensionInterpretationLabel,
} from './interpretDimensionScore'
import { selectReflectionPrompts } from './selectReflectionPrompts'

const DIMENSION_CONTENT: Record<
  string,
  {
    lowMixed: { paragraphs: string[]; suggestion: string; question: string }
    supportive: { paragraphs: string[]; suggestion: string; question: string }
  }
> = {
  'emotional-awareness': {
    lowMixed: {
      paragraphs: [
        'Your responses suggest that recognizing, expressing, or making room for emotions may feel harder right now. This is a reflection pattern, not a label about who you are.',
        'Many people move through periods when feelings arrive quickly or feel difficult to name. Noticing that pattern can be a useful starting point.',
      ],
      suggestion: 'Pause and name one emotion without trying to fix it.',
      question: 'What feeling has been visiting you most often lately?',
    },
    supportive: {
      paragraphs: [
        'Your responses suggest you currently have some capacity to notice and work with your emotions in manageable ways.',
        'This does not mean every feeling is easy, but emotional awareness may be a resource you can continue to use thoughtfully.',
      ],
      suggestion:
        'Continue using emotional awareness to guide your choices and boundaries.',
      question: 'How does noticing your emotions help you respond to your day?',
    },
  },
  'energy-rest': {
    lowMixed: {
      paragraphs: [
        'Your responses suggest that energy and recovery may feel limited or uneven at the moment.',
        'This may reflect a busy season, interrupted rest, or a routine that leaves little room to recover.',
      ],
      suggestion: 'Choose one task that can be delayed, shortened, or shared.',
      question: 'Where does your energy go first each day?',
    },
    supportive: {
      paragraphs: [
        'Your responses suggest you currently have some balance between activity and recovery.',
        'Protecting rest can help maintain the steadiness you reflected in your answers.',
      ],
      suggestion:
        'Protect the rest and routines that currently help your energy recover.',
      question: 'What recovery habits are worth keeping visible this week?',
    },
  },
  connection: {
    lowMixed: {
      paragraphs: [
        'Your responses suggest that connection or support may feel less available or harder to reach right now.',
        'This can happen during isolating seasons, transitions, or times when asking for help feels difficult.',
      ],
      suggestion: 'Consider sending one simple message to someone who feels safe.',
      question: 'Who comes to mind when you think about feeling understood?',
    },
    supportive: {
      paragraphs: [
        'Your responses suggest you currently have some sense of connection or access to support.',
        'Relationships that feel safe can be an important part of emotional steadiness.',
      ],
      suggestion:
        'Keep investing in the relationships that help you feel understood.',
      question: 'What makes a connection feel safe and supportive to you?',
    },
  },
  'coping-recovery': {
    lowMixed: {
      paragraphs: [
        'Your responses suggest that calming yourself or recovering after stress may feel harder at the moment.',
        'This does not mean you lack resilience. It may simply reflect a period when coping tools feel distant or depleted.',
      ],
      suggestion: 'Choose one calming action you can repeat when stress rises.',
      question: 'What has helped even a little during a stressful moment before?',
    },
    supportive: {
      paragraphs: [
        'Your responses suggest you currently have some ways to settle yourself and recover after difficulty.',
        'Accessible coping tools can make challenging moments feel more manageable over time.',
      ],
      suggestion: 'Keep your current coping tools visible and easy to access.',
      question: 'Which coping tool feels most reliable for you right now?',
    },
  },
}

function buildDimensionSection(
  dimensionResult: BasicQuizResult['dimensions'][number],
): DimensionReportSection {
  const content = DIMENSION_CONTENT[dimensionResult.dimension]
  const variant =
    dimensionResult.interpretation === 'supportive' ? content.supportive : content.lowMixed

  return {
    dimension: dimensionResult.dimension,
    title: DIMENSION_LABELS[dimensionResult.dimension],
    score: dimensionResult.score,
    maximumScore: dimensionResult.maximumScore,
    interpretation: dimensionResult.interpretation,
    interpretationLabel: getDimensionInterpretationLabel(dimensionResult.interpretation),
    explanation: variant.paragraphs,
    reflectionQuestion: variant.question,
    practicalSuggestion: variant.suggestion,
  }
}

export function buildFullReport(
  _definition: QuizDefinition,
  basicResult: BasicQuizResult,
): FullReflectionReport {
  const strongestDimension = findStrongestDimension(basicResult.dimensions)
  const attentionDimension = findAttentionDimension(basicResult.dimensions)

  return {
    basicResult,
    summary: `${basicResult.range.label} Your overall reflection score is ${basicResult.totalScore} out of ${basicResult.maximumScore}. This summary is for personal reflection and is not a medical diagnosis.`,
    dimensionBreakdowns: basicResult.dimensions.map(buildDimensionSection),
    strongestDimension,
    attentionDimension,
    prompts: selectReflectionPrompts(basicResult),
    exercises: CALMING_EXERCISES,
    generatedAt: new Date().toISOString(),
  }
}
