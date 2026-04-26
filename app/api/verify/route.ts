import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { proof, surveyId, answers } = body

    if (!proof || !surveyId) {
      return NextResponse.json({ error: 'Missing proof or surveyId' }, { status: 400 })
    }

    const app_id = process.env.NEXT_PUBLIC_APP_ID
    const action = surveyId

    console.log('Verifying:', { app_id, action, nullifier: proof.nullifier_hash })

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
          signal: '',
        }),
      }
    )

    const text = await verifyRes.text()
console.log('API raw response:', verifyRes.status, text)

let verifyData
try {
  verifyData = JSON.parse(text)
} catch {
  return NextResponse.json(
    { error: 'Invalid response from Worldcoin API', raw: text.slice(0, 200) },
    { status: 500 }
  )
}
console.log('API response:', verifyRes.status, verifyData)

    if (!verifyRes.ok) {
      return NextResponse.json(
        { error: 'World ID verification failed', detail: verifyData },
        { status: 400 }
      )
    }

    return NextResponse.json({
      success: true,
      message: 'Response recorded successfully!',
      nullifier: proof.nullifier_hash,
    })

  } catch (err: any) {
    console.error('Verify error:', err)
    return NextResponse.json(
      { error: 'Internal server error', detail: err.message },
      { status: 500 }
    )
  }
}
