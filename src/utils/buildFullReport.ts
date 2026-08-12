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

type DimensionVariant = {
  paragraphs: string[]
  suggestion: string
  question: string
}

const DIMENSION_CONTENT: Record<
  string,
  {
    lowMixed: DimensionVariant
    supportive: DimensionVariant
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
  'pressure-demands': {
    lowMixed: {
      paragraphs: [
        'Your responses suggest that expectations and demands may feel heavier than your current capacity.',
        'Pressure often builds when responsibilities stack without enough room to renegotiate them.',
      ],
      suggestion: 'List today’s demands and mark one that can wait or be shared.',
      question: 'Which expectation feels heaviest right now?',
    },
    supportive: {
      paragraphs: [
        'Your responses suggest you currently manage many expectations without constant strain.',
        'That capacity is easier to keep when you continue naming limits early.',
      ],
      suggestion: 'Keep checking whether new requests fit your real capacity.',
      question: 'What helps you decide when a demand is too much?',
    },
  },
  'physical-tension': {
    lowMixed: {
      paragraphs: [
        'Your responses suggest your body may be holding more tension than feels comfortable.',
        'Physical stress signals are often early messengers that the pace or load needs attention.',
      ],
      suggestion: 'Take one slow breath and release your shoulders for thirty seconds.',
      question: 'Where do you feel stress in your body first?',
    },
    supportive: {
      paragraphs: [
        'Your responses suggest your body currently has ways to stay relatively settled.',
        'Keeping brief body check-ins can help that steadiness last.',
      ],
      suggestion: 'Continue noticing early body cues before tension builds.',
      question: 'What helps your body feel settled most reliably?',
    },
  },
  'rest-recovery': {
    lowMixed: {
      paragraphs: [
        'Your responses suggest rest and recovery may be harder to access right now.',
        'Without recovery windows, even ordinary stress can feel larger than it is.',
      ],
      suggestion: 'Protect one short recovery block on your calendar today.',
      question: 'What kind of rest actually helps you, even a little?',
    },
    supportive: {
      paragraphs: [
        'Your responses suggest you currently make some room for recovery.',
        'That habit is worth protecting when pressure rises again.',
      ],
      suggestion: 'Keep your recovery habits visible when the week gets busy.',
      question: 'Which recovery habit is most worth defending this week?',
    },
  },
  'daily-overwhelm': {
    lowMixed: {
      paragraphs: [
        'Your responses suggest daily interruptions and unfinished tasks may feel overcrowding.',
        'Overwhelm often shrinks when one task is finished or parked deliberately.',
      ],
      suggestion: 'Choose one unfinished item to complete or consciously postpone.',
      question: 'What unfinished loop takes the most mental space?',
    },
    supportive: {
      paragraphs: [
        'Your responses suggest you currently keep some calm available during busy days.',
        'Small systems for parking tasks can preserve that calm.',
      ],
      suggestion: 'Keep one simple way to capture tasks so they leave your mind.',
      question: 'What helps you feel less crowded during a busy day?',
    },
  },
  exhaustion: {
    lowMixed: {
      paragraphs: [
        'Your responses suggest fatigue may be taking a larger share of your day.',
        'Exhaustion is information about load and recovery, not a personal failure.',
      ],
      suggestion: 'Reduce one non-essential demand and rest without earning it.',
      question: 'When during the day does your energy drop most sharply?',
    },
    supportive: {
      paragraphs: [
        'Your responses suggest you still have usable energy through much of the day.',
        'Protecting rest now can help keep that reserve from slipping.',
      ],
      suggestion: 'Keep the sleep and pause habits that currently restore you.',
      question: 'What most reliably restores your energy?',
    },
  },
  motivation: {
    lowMixed: {
      paragraphs: [
        'Your responses suggest motivation or meaning may feel harder to access.',
        'Interest often returns in small pieces before it returns in big ones.',
      ],
      suggestion: 'Do one tiny task linked to something that once mattered to you.',
      question: 'What used to feel meaningful that still has a spark left?',
    },
    supportive: {
      paragraphs: [
        'Your responses suggest you still feel connected to purpose or interest in some areas.',
        'That spark is worth feeding with small, realistic effort.',
      ],
      suggestion: 'Schedule one short block for work that still feels meaningful.',
      question: 'Which goal still feels worth a little movement?',
    },
  },
  detachment: {
    lowMixed: {
      paragraphs: [
        'Your responses suggest emotional distance from roles or people may be present.',
        'Detachment can be a temporary shield when energy is low.',
      ],
      suggestion: 'Choose one low-pressure way to be present with someone safe.',
      question: 'Where do you most notice yourself going through the motions?',
    },
    supportive: {
      paragraphs: [
        'Your responses suggest you still feel emotionally present in important places.',
        'Presence is easier to keep when load stays within capacity.',
      ],
      suggestion: 'Protect one relationship or role that still feels alive to you.',
      question: 'What helps you feel present rather than distant?',
    },
  },
  'workload-capacity': {
    lowMixed: {
      paragraphs: [
        'Your responses suggest your workload may be larger than your current capacity.',
        'Capacity changes with rest, support, and how many demands arrive at once.',
      ],
      suggestion: 'Set one clear limit on a request or deadline this week.',
      question: 'Which part of your load feels least negotiable, and which could bend?',
    },
    supportive: {
      paragraphs: [
        'Your responses suggest your workload currently feels more workable.',
        'Keeping boundaries visible helps that balance last.',
      ],
      suggestion: 'Continue checking new requests against your real capacity.',
      question: 'What boundary most protects your capacity?',
    },
  },
  'worry-thinking': {
    lowMixed: {
      paragraphs: [
        'Your responses suggest worry thoughts may return often or linger.',
        'Worry is a mental habit that can soften with practice, not a fixed trait.',
      ],
      suggestion: 'Write one worry down, then set it aside for a short timed break.',
      question: 'Which worry loop visits you most often?',
    },
    supportive: {
      paragraphs: [
        'Your responses suggest you can often return from worry without long spirals.',
        'That skill grows when you keep practicing short resets.',
      ],
      suggestion: 'Keep using the pause that helps you leave a worry loop.',
      question: 'What helps you tell useful caution from unhelpful worry?',
    },
  },
  'anxiety-tension': {
    lowMixed: {
      paragraphs: [
        'Your responses suggest your body may stay tense or alert more than feels comfortable.',
        'Body cues can guide gentle calming before thoughts catch up.',
      ],
      suggestion: 'Try a slow exhale that lasts longer than your inhale, three times.',
      question: 'Where does anxiety show up in your body first?',
    },
    supportive: {
      paragraphs: [
        'Your responses suggest you currently have ways to settle body tension.',
        'Returning to those tools early can keep alertness from building.',
      ],
      suggestion: 'Keep one body-calming habit easy to reach during the day.',
      question: 'Which body-calming tool feels most reliable?',
    },
  },
  uncertainty: {
    lowMixed: {
      paragraphs: [
        'Your responses suggest not knowing may feel especially hard right now.',
        'Uncertainty tolerance often grows in small steps, not all at once.',
      ],
      suggestion: 'Name one thing you can control today and one you can leave open.',
      question: 'What uncertainty feels hardest to sit with lately?',
    },
    supportive: {
      paragraphs: [
        'Your responses suggest you can often move forward without every detail known.',
        'That flexibility is a useful resource in changing seasons.',
      ],
      suggestion: 'Keep practicing small decisions with incomplete information.',
      question: 'What helps you stay steady when plans are unclear?',
    },
  },
  'avoidance-edge': {
    lowMixed: {
      paragraphs: [
        'Your responses suggest avoidance or lingering edge may be present after stress.',
        'Approaching mild discomfort in tiny steps can rebuild confidence.',
      ],
      suggestion: 'Take one small step toward something you have been putting off.',
      question: 'What have you been avoiding that still matters to you?',
    },
    supportive: {
      paragraphs: [
        'Your responses suggest you can often face discomfort and return to steadiness.',
        'That pattern is worth reinforcing when harder moments appear.',
      ],
      suggestion: 'Keep using the calming response that helps after stressful moments.',
      question: 'What helps you return to steady after feeling on edge?',
    },
  },
  'mood-interest': {
    lowMixed: {
      paragraphs: [
        'Your responses suggest interest or mood may feel flatter than usual.',
        'Gentle contact with small pleasures often helps more than forcing big changes.',
      ],
      suggestion: 'Do one tiny enjoyable or meaningful activity for five minutes.',
      question: 'What small thing still brings even a faint spark?',
    },
    supportive: {
      paragraphs: [
        'Your responses suggest some interest and mood steadiness are still available.',
        'Protecting those sparks can support harder days.',
      ],
      suggestion: 'Keep one enjoyable habit in your week even when energy dips.',
      question: 'What currently supports your mood most reliably?',
    },
  },
  'energy-motivation': {
    lowMixed: {
      paragraphs: [
        'Your responses suggest energy or motivation for daily tasks may be limited.',
        'Starting tiny often works better than waiting for full motivation.',
      ],
      suggestion: 'Choose the smallest next step on one basic task and do only that.',
      question: 'Which basic task feels most doable today?',
    },
    supportive: {
      paragraphs: [
        'Your responses suggest you still have usable energy and motivation for basics.',
        'That capacity is easier to keep with rest and realistic goals.',
      ],
      suggestion: 'Keep pairing effort with recovery so motivation does not run dry.',
      question: 'What helps you start when motivation is uneven?',
    },
  },
  'sleep-rest': {
    lowMixed: {
      paragraphs: [
        'Your responses suggest sleep or restorative rest may need more support.',
        'Sleep quality often improves with one consistent, gentle change at a time.',
      ],
      suggestion: 'Pick one wind-down habit to try tonight, such as dimming lights earlier.',
      question: 'What most interferes with your rest right now?',
    },
    supportive: {
      paragraphs: [
        'Your responses suggest rest currently helps your mood and recovery at least somewhat.',
        'Protecting sleep habits can keep that support available.',
      ],
      suggestion: 'Keep the bedtime or wind-down habit that already helps.',
      question: 'Which rest habit is worth protecting this week?',
    },
  },
  'daily-engagement': {
    lowMixed: {
      paragraphs: [
        'Your responses suggest connection with daily life or people may feel distant.',
        'Small points of contact can reopen engagement without pressure.',
      ],
      suggestion: 'Send one simple message or step outside for a few minutes.',
      question: 'What tiny form of contact feels possible today?',
    },
    supportive: {
      paragraphs: [
        'Your responses suggest you still stay engaged with parts of your routine or relationships.',
        'Those anchors can carry you through flatter days.',
      ],
      suggestion: 'Keep one daily anchor that connects you to life outside your head.',
      question: 'Which daily habit helps you feel less withdrawn?',
    },
  },
  'thinking-style': {
    lowMixed: {
      paragraphs: [
        'Your responses suggest your thinking preferences may feel less clear right now.',
        'Self-knowledge often returns when you watch how you solve ordinary problems.',
      ],
      suggestion: 'Notice how you prefer to take in information on one small task today.',
      question: 'When do you feel most like yourself while thinking?',
    },
    supportive: {
      paragraphs: [
        'Your responses suggest you recognize and use your thinking preferences.',
        'That clarity can guide environments and roles that fit better.',
      ],
      suggestion: 'Choose one setting this week that matches how you think best.',
      question: 'How does your thinking style help you in daily decisions?',
    },
  },
  'decision-making': {
    lowMixed: {
      paragraphs: [
        'Your responses suggest decisions may feel slower, harsher, or less grounded in your preferences.',
        'Clearer decisions often come from smaller choices practiced first.',
      ],
      suggestion: 'Make one low-stakes decision today using your preferred pace.',
      question: 'Do you decide better quickly or with more time?',
    },
    supportive: {
      paragraphs: [
        'Your responses suggest your decision style currently feels usable and somewhat clear.',
        'Trusting that style can reduce second-guessing.',
      ],
      suggestion: 'Keep using the decision pace that fits you for important choices.',
      question: 'What helps you stand by a decision that fits you?',
    },
  },
  'recharge-style': {
    lowMixed: {
      paragraphs: [
        'Your responses suggest you may be recharging in ways that do not fully restore you.',
        'Matching downtime to your real preference often matters more than doing more rest.',
      ],
      suggestion: 'Schedule one recharge block that matches solitude or company, whichever restores you.',
      question: 'What kind of downtime actually replenishes you?',
    },
    supportive: {
      paragraphs: [
        'Your responses suggest you know and protect the downtime that restores you.',
        'That self-knowledge is a practical energy skill.',
      ],
      suggestion: 'Keep defending the recharge style that works for you.',
      question: 'How can you protect your recharge needs this week?',
    },
  },
  'communication-style': {
    lowMixed: {
      paragraphs: [
        'Your responses suggest your natural communication style may feel muted or hard to use.',
        'Clearer expression often starts with one honest sentence at a time.',
      ],
      suggestion: 'Practice saying one need in your own natural tone today.',
      question: 'What is your most natural way to communicate?',
    },
    supportive: {
      paragraphs: [
        'Your responses suggest you can communicate in a style that feels like you.',
        'That authenticity often improves closeness and clarity.',
      ],
      suggestion: 'Keep using the communication habits that feel natural and kind.',
      question: 'When do you feel most understood when you speak?',
    },
  },
  'change-approach': {
    lowMixed: {
      paragraphs: [
        'Your responses suggest change may currently feel harder to meet in your preferred way.',
        'Knowing your change pace can reduce unnecessary force.',
      ],
      suggestion: 'Break one upcoming change into a first step that fits your pace.',
      question: 'Do you prefer gradual change or decisive shifts?',
    },
    supportive: {
      paragraphs: [
        'Your responses suggest you can meet change while staying connected to your preferences.',
        'That flexibility is a strength when life shifts.',
      ],
      suggestion: 'Keep planning transitions in the style that fits you best.',
      question: 'What helps you recover footing after unexpected change?',
    },
  },
  'closeness-comfort': {
    lowMixed: {
      paragraphs: [
        'Your responses suggest closeness may feel mixed with fear of losing space or self.',
        'Comfort with closeness often grows in relationships that respect pace.',
      ],
      suggestion: 'Practice a small moment of warmth with someone who feels relatively safe.',
      question: 'What makes closeness feel safer for you?',
    },
    supportive: {
      paragraphs: [
        'Your responses suggest you can enjoy closeness while keeping a sense of self.',
        'That balance supports healthier bonds over time.',
      ],
      suggestion: 'Keep relationships that allow both warmth and personal space.',
      question: 'How do you keep closeness without feeling trapped?',
    },
  },
  'distance-response': {
    lowMixed: {
      paragraphs: [
        'Your responses suggest distance or quiet stretches may feel especially activating.',
        'Steady responses to distance often start with naming the need underneath.',
      ],
      suggestion: 'When distance appears, name one feeling and one request to yourself first.',
      question: 'What story do you tell yourself when someone needs space?',
    },
    supportive: {
      paragraphs: [
        'Your responses suggest you can stay relatively steady when relationships have quieter periods.',
        'That steadiness supports trust on both sides.',
      ],
      suggestion: 'Keep practicing calm check-ins instead of urgent testing.',
      question: 'What helps you stay steady when someone needs space?',
    },
  },
  'trust-reassurance': {
    lowMixed: {
      paragraphs: [
        'Your responses suggest trust or asking for reassurance may feel difficult.',
        'Trust often builds in steps that match your nervous system’s pace.',
      ],
      suggestion: 'Ask for one clear form of reassurance from someone safe.',
      question: 'What kind of reassurance actually helps you?',
    },
    supportive: {
      paragraphs: [
        'Your responses suggest you can offer and receive trust in workable ways.',
        'Clear reassurance habits help keep that trust durable.',
      ],
      suggestion: 'Keep asking for reassurance clearly instead of testing.',
      question: 'How do you build trust in steps that feel safe?',
    },
  },
  'emotional-bond': {
    lowMixed: {
      paragraphs: [
        'Your responses suggest sharing or receiving emotional care may feel harder right now.',
        'Bonding often softens when vulnerability stays small and mutual.',
      ],
      suggestion: 'Share one feeling with someone you trust, without needing a big conversation.',
      question: 'What makes emotional openness feel possible for you?',
    },
    supportive: {
      paragraphs: [
        'Your responses suggest emotional bonding currently feels available in at least some relationships.',
        'Repair and openness help that bond stay strong.',
      ],
      suggestion: 'Keep practicing small repairs after misunderstandings.',
      question: 'What helps you stay engaged when a relationship becomes more open?',
    },
  },
  'rel-communication': {
    lowMixed: {
      paragraphs: [
        'Your responses suggest communication in relationships may leave important things unsaid.',
        'Clearer conversations often start earlier and with more listening.',
      ],
      suggestion: 'Bring up one unfinished topic before it builds further.',
      question: 'What conversation have you been delaying?',
    },
    supportive: {
      paragraphs: [
        'Your responses suggest you communicate with useful clarity and listening.',
        'That skill reduces avoidable conflict over time.',
      ],
      suggestion: 'Keep checking for understanding in important talks.',
      question: 'What helps people feel heard by you?',
    },
  },
  boundaries: {
    lowMixed: {
      paragraphs: [
        'Your responses suggest boundaries may be hard to set or keep without guilt.',
        'Boundaries protect connection by making limits clear enough to respect.',
      ],
      suggestion: 'Practice one clear no or limit in a low-stakes situation.',
      question: 'Where do you most often overgive?',
    },
    supportive: {
      paragraphs: [
        'Your responses suggest you can hold limits while staying in relationship.',
        'That balance supports longer-term trust and energy.',
      ],
      suggestion: 'Keep the boundary habits that protect your time and care.',
      question: 'Which boundary most improves your relationships?',
    },
  },
  'conflict-patterns': {
    lowMixed: {
      paragraphs: [
        'Your responses suggest conflict may escalate, stall, or avoid repair.',
        'Healthier conflict often means staying with the issue and returning after breaks.',
      ],
      suggestion: 'In the next disagreement, name the issue and take one calm repair step.',
      question: 'What usually happens for you in the middle of conflict?',
    },
    supportive: {
      paragraphs: [
        'Your responses suggest you can stay present enough in conflict to repair.',
        'That pattern reduces lasting damage after hard talks.',
      ],
      suggestion: 'Keep using breaks and returns that help conflict stay respectful.',
      question: 'What helps you repair after a hard conversation?',
    },
  },
  'emotional-needs': {
    lowMixed: {
      paragraphs: [
        'Your responses suggest naming or receiving emotional needs may feel difficult.',
        'Needs become easier to meet when they are specific and spoken early.',
      ],
      suggestion: 'Write down one emotional need and practice saying it in one sentence.',
      question: 'What do you most need from close relationships right now?',
    },
    supportive: {
      paragraphs: [
        'Your responses suggest you can name and receive emotional needs with some ease.',
        'That clarity helps relationships feel more mutual.',
      ],
      suggestion: 'Keep asking for support in ways others can understand.',
      question: 'How do you let yourself receive care?',
    },
  },
}

const FALLBACK_CONTENT: {
  lowMixed: DimensionVariant
  supportive: DimensionVariant
} = {
  lowMixed: {
    paragraphs: [
      'Your responses suggest this area may need more gentle attention right now.',
      'This is a reflection pattern for personal awareness, not a diagnosis.',
    ],
    suggestion: 'Choose one small supportive action related to this area today.',
    question: 'What feels most important to notice in this area?',
  },
  supportive: {
    paragraphs: [
      'Your responses suggest this area currently has some supportive capacity.',
      'Protecting what works here can help other areas feel steadier too.',
    ],
    suggestion: 'Keep the habits that already support this area.',
    question: 'What is worth protecting in this area this week?',
  },
}

function buildDimensionSection(
  dimensionResult: BasicQuizResult['dimensions'][number],
): DimensionReportSection {
  const content = DIMENSION_CONTENT[dimensionResult.dimension] ?? FALLBACK_CONTENT
  const variant =
    dimensionResult.interpretation === 'supportive' ? content.supportive : content.lowMixed

  return {
    dimension: dimensionResult.dimension,
    title: DIMENSION_LABELS[dimensionResult.dimension] ?? dimensionResult.dimension,
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
  definition: QuizDefinition,
  basicResult: BasicQuizResult,
): FullReflectionReport {
  const strongestDimension = findStrongestDimension(basicResult.dimensions)
  const attentionDimension = findAttentionDimension(basicResult.dimensions)

  return {
    quizTitle: definition.title,
    quizSlug: definition.slug,
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
