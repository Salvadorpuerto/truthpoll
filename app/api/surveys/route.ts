import { NextResponse } from 'next/server'
import { SURVEYS } from '@/lib/surveys'

export async function GET() {
  const activeSurveys = SURVEYS.filter(s => s.active)
  // Don't expose full question data in list view
  const list = activeSurveys.map(({ questions, ...s }) => ({
    ...s,
    questionCount: questions.length,
  }))
  return NextResponse.json(list)
}
