import { NextRequest, NextResponse } from 'next/server'
import { verifyCloudProof, IVerifyResponse, ISuccessResult } from '@worldcoin/idkit'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { proof, surveyId, answers } = body

    if (!proof || !surveyId) {
      return NextResponse.json({ error: 'Missing proof or surveyId' }, { status: 400 })
    }

    const app_id = process.env.NEXT_PUBLIC_APP_ID as `app_${string}`
    const action = `survey_${surveyId}`

    // Verify the World ID proof via Worldcoin cloud API
    const verifyRes: IVerifyResponse = await verifyCloudProof(
      proof as ISuccessResult,
      app_id,
      action,
    )

    if (!verifyRes.success) {
      return NextResponse.json(
        { error: 'World ID verification failed', detail: verifyRes },
        { status: 400 }
      )
    }

    // ✅ Proof is valid — save response
    // In production: save to DB, check nullifier_hash not used before
    console.log('Valid response:', {
      surveyId,
      nullifier: proof.nullifier_hash,
      answers,
      timestamp: new Date().toISOString(),
    })

    // TODO: trigger WLD payment + NFT mint via smart contract here

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
