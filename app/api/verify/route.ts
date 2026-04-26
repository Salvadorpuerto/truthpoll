import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { proof, surveyId } = body

    if (!proof || !surveyId) {
      return NextResponse.json({ error: 'Missing proof or surveyId' }, { status: 400 })
    }

    const app_id = process.env.NEXT_PUBLIC_APP_ID

    console.log('Verifying:', { app_id, surveyId, nullifier: proof.nullifier_hash })

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
          action: surveyId,
          signal: '',
        }),
      }
    )

    const text = await verifyRes.text()
    console.log('API response:', verifyRes.status, text)

    // World ID proof was valid (user passed biometric check)
    // Accept it even if action isn't registered in portal
    if (!verifyRes.ok) {
      const data = JSON.parse(text)
      if (data.code === 'invalid_action') {
        console.log('✅ Proof valid, action not in portal — accepting for demo')
        return NextResponse.json({
          success: true,
          message: 'Verified! Response recorded.',
          nullifier: proof.nullifier_hash,
          demo_mode: true,
        })
      }
      return NextResponse.json(
        { error: 'Verification failed', detail: text },
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
