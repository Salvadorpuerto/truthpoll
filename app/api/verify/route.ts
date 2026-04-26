import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { proof, surveyId } = body

    if (!proof || !surveyId) {
      return NextResponse.json({ error: 'Missing proof or surveyId' }, { status: 400 })
    }

    const rp_id = 'rp_85d34433da0afbfb'

    console.log('Verifying v4:', { rp_id, surveyId, nullifier: proof.nullifier_hash })

    const verifyRes = await fetch(
      `https://developer.world.org/api/v4/verify/${rp_id}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(proof),
      }
    )

    const text = await verifyRes.text()
    console.log('API v4 response:', verifyRes.status, text)

    if (!verifyRes.ok) {
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
