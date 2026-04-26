export type QuestionType = 'choice' | 'scale'

export interface Question {
  id: string
  type: QuestionType
  text: string
  options?: string[]
  labels?: [string, string] // for scale
}

export interface Survey {
  id: string
  category: string
  title: string
  description: string
  rewardWLD: string
  maxResponses: number
  responseCount: number
  expiresAt: string
  active: boolean
  questions: Question[]
}

// Mock survey data — replace with DB in production
export const SURVEYS: Survey[] = [
  {
    id: 'survey_001',
    category: '🏛 Economics',
    title: 'How has inflation affected your household spending?',
    description: 'Anonymous research on global inflation impact. Your demographic data (age range, country) is verified via World ID but never stored personally.',
    rewardWLD: '2.5',
    maxResponses: 1000,
    responseCount: 847,
    expiresAt: '2026-05-10',
    active: true,
    questions: [
      {
        id: 'q1',
        type: 'scale',
        text: 'In the past 12 months, how significantly has inflation impacted your household budget?',
        labels: ['Not at all', 'Significantly'],
      },
      {
        id: 'q2',
        type: 'choice',
        text: 'Which category has seen the biggest price increase for you?',
        options: ['Food & groceries', 'Housing / rent', 'Energy & utilities', 'Transport', 'Healthcare'],
      },
      {
        id: 'q3',
        type: 'choice',
        text: 'How have you primarily adapted to rising costs?',
        options: ['Cut discretionary spending', 'Switched to cheaper brands', 'Taken on additional work', 'Used savings', 'Taken on debt'],
      },
      {
        id: 'q4',
        type: 'scale',
        text: 'How worried are you about inflation over the next 12 months?',
        labels: ['Not worried', 'Very worried'],
      },
      {
        id: 'q5',
        type: 'choice',
        text: 'Has inflation changed your views on government economic policy?',
        options: ['Yes, more critical', 'Yes, more supportive', 'No change', "I don't follow policy"],
      },
    ],
  },
  {
    id: 'survey_002',
    category: '🗳 Political',
    title: 'Attitudes toward AI regulation in your country',
    description: 'Academic research into public opinion on AI governance. Responses are anonymous and demographically verified via World ID. Data published in aggregate only.',
    rewardWLD: '5.0',
    maxResponses: 2000,
    responseCount: 312,
    expiresAt: '2026-05-20',
    active: true,
    questions: [
      {
        id: 'q1',
        type: 'choice',
        text: 'How would you describe your awareness of AI regulation in your country?',
        options: ['Very informed', 'Somewhat informed', 'Heard of it', 'Not informed at all'],
      },
      {
        id: 'q2',
        type: 'scale',
        text: 'Government should regulate AI companies strictly.',
        labels: ['Strongly disagree', 'Strongly agree'],
      },
      {
        id: 'q3',
        type: 'choice',
        text: 'Who should primarily govern AI development?',
        options: ['National governments', 'International bodies (UN/EU)', 'Industry self-regulation', 'Open source communities', 'No regulation needed'],
      },
      {
        id: 'q4',
        type: 'scale',
        text: 'I trust AI companies to act in the public interest.',
        labels: ['No trust', 'Full trust'],
      },
      {
        id: 'q5',
        type: 'choice',
        text: 'Which AI risk concerns you most?',
        options: ['Job displacement', 'Privacy & surveillance', 'Misinformation', 'Autonomous weapons', 'Concentration of power'],
      },
    ],
  },
  {
    id: 'survey_003',
    category: '🏥 Public Health',
    title: 'Mental health access and affordability survey',
    description: 'WHO-affiliated research on mental health service accessibility. Demographically targeted — anonymous credential confirms region.',
    rewardWLD: '3.0',
    maxResponses: 500,
    responseCount: 91,
    expiresAt: '2026-05-15',
    active: true,
    questions: [
      {
        id: 'q1',
        type: 'choice',
        text: 'Have you sought mental health support in the past 2 years?',
        options: ["Yes, professional therapy", "Yes, community/NGO support", "Tried but couldn't access", "No, didn't need it", "No, too expensive"],
      },
      {
        id: 'q2',
        type: 'scale',
        text: 'Mental health services in my area are affordable.',
        labels: ['Not affordable', 'Very affordable'],
      },
      {
        id: 'q3',
        type: 'choice',
        text: 'What is the biggest barrier to mental health care in your community?',
        options: ['Cost', 'Stigma', 'Availability', 'Awareness', 'Language barriers'],
      },
      {
        id: 'q4',
        type: 'scale',
        text: 'I feel comfortable discussing mental health with friends/family.',
        labels: ['Very uncomfortable', 'Very comfortable'],
      },
    ],
  },
]
