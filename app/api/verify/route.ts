import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { proof, surveyId, answers } = body

    if (!proof || !surveyId) {
      return NextResponse.json({ error: 'Missing proof or surveyId' }, { status: 400 })
    }

    const app_id = process.env.NEXT_PUBLIC_APP_ID
    const action = `survey_${surveyId}`

    // Verify proof via Worldcoin cloud API directly
    const verifyRes = await fetch(
      `https://developer.worldcoin.org/api/v2/verify/${app_id}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nullifier_hash: proof.nullifier_hash,
          merkle_root: proof.merkle_root,
          proof: proof.proof,
          verification_level: proof.verification_level,
          action: action,
        }),
      }
    )

    const verifyData = await verifyRes.json()

    if (!verifyRes.ok) {
      return NextResponse.json(
        { error: 'World ID verification failed', detail: verifyData },
        { status: 400 }
      )
    }

    // ✅ Valid — log response (replace with DB in production)
    console.log('Valid response:', {
      surveyId,
      nullifier: proof.nullifier_hash,
      answers,
      timestamp: new Date().toISOString(),
    })

    return NextResponse.json({
      success: true,
      message: 'Response recorded. Reward will be sent to your wallet.',
      nullifier: proof.nullifier_hash,
    })
  } catch (err) {
    console.error('Verify error:', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
