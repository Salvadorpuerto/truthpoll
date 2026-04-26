'use client'
import { useState } from 'react'
import { IDKitWidget, VerificationLevel, ISuccessResult } from '@worldcoin/idkit'
import type { Survey } from '@/lib/surveys'

type Answers = Record<string, string | number>

export default function SurveyDetail({ survey, onClose }: {
  survey: Survey
  onClose: () => void
}) {
  const [answers, setAnswers] = useState<Answers>({})
  const [step, setStep] = useState<'questions' | 'verifying' | 'success' | 'error'>('questions')
  const [errorMsg, setErrorMsg] = useState('')

  const allAnswered = survey.questions.every(q => answers[q.id] !== undefined)

  // Called when World ID proof is received — send to backend for verification
  const handleVerify = async (proof: ISuccessResult) => {
    const res = await fetch('/api/verify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        proof,
        surveyId: survey.id,
        answers,
      }),
    })
    if (!res.ok) {
      const data = await res.json()
      throw new Error(data.error || 'Verification failed')
    }
  }

  const onSuccess = () => {
    setStep('success')
  }

  const onError = (error: any) => {
    setErrorMsg(error?.message || 'Something went wrong')
    setStep('error')
  }

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 50,
      background: 'var(--bg)', overflowY: 'auto',
      animation: 'slideUp 0.3s ease',
    }}>
      <style>{`
        @keyframes slideUp {
          from { transform: translateY(100%); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
      `}</style>

      {/* Header */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: 12,
        padding: '16px 20px', borderBottom: '1px solid var(--border)',
        position: 'sticky', top: 0, background: 'var(--bg)', zIndex: 10,
      }}>
        <button onClick={onClose} style={{
          width: 32, height: 32, borderRadius: 8, border: '1px solid var(--border)',
          background: 'var(--surface)', color: '#f0f0f8', fontSize: 16, cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>←</button>
        <div style={{ flex: 1 }}>
          <div style={{ fontFamily: 'Syne, sans-serif', fontSize: 14, fontWeight: 700 }}>
            {survey.category}
          </div>
          <div style={{ fontSize: 10, color: 'var(--muted)' }}>
            {survey.questions.length} questions · ~{Math.ceil(survey.questions.length * 0.5)} min
          </div>
        </div>
        <div style={{ fontFamily: 'Syne, sans-serif', fontSize: 13, fontWeight: 700, color: 'var(--accent)', textAlign: 'right' }}>
          {survey.rewardWLD} WLD
          <div style={{ fontSize: 9, color: 'var(--muted)', fontWeight: 400 }}>+ NFT</div>
        </div>
      </div>

      <div style={{ padding: 20, paddingBottom: 40 }}>

        {/* Success state */}
        {step === 'success' && (
          <div style={{ textAlign: 'center', padding: '40px 20px' }}>
            <div style={{ fontSize: 64, marginBottom: 20 }}>🎉</div>
            <div style={{ fontFamily: 'Syne, sans-serif', fontSize: 24, fontWeight: 800, marginBottom: 8 }}>
              Response Submitted!
            </div>
            <div style={{ fontSize: 12, color: 'var(--muted)', lineHeight: 1.7, marginBottom: 24 }}>
              Your identity was verified by World ID.<br />No personal data was stored.
            </div>
            <div style={{ display: 'flex', gap: 12, justifyContent: 'center', marginBottom: 28 }}>
              <div style={{ background: 'var(--surface)', border: '1px solid rgba(76,255,176,0.3)', borderRadius: 20, padding: '8px 16px', fontFamily: 'Syne, sans-serif', fontSize: 13, fontWeight: 700, color: 'var(--accent)' }}>
                +{survey.rewardWLD} WLD
              </div>
              <div style={{ background: 'var(--surface)', border: '1px solid rgba(255,209,102,0.3)', borderRadius: 20, padding: '8px 16px', fontFamily: 'Syne, sans-serif', fontSize: 13, fontWeight: 700, color: 'var(--gold)' }}>
                🏆 NFT Badge
              </div>
            </div>
            <button onClick={onClose} style={{
              background: 'var(--accent)', border: 'none', borderRadius: 10,
              padding: '12px 32px', color: '#0a0a0f',
              fontFamily: 'Syne, sans-serif', fontSize: 14, fontWeight: 800, cursor: 'pointer',
            }}>
              Back to Surveys
            </button>
          </div>
        )}

        {/* Error state */}
        {step === 'error' && (
          <div style={{ textAlign: 'center', padding: '40px 20px' }}>
            <div style={{ fontSize: 48, marginBottom: 16 }}>❌</div>
            <div style={{ fontFamily: 'Syne, sans-serif', fontSize: 18, fontWeight: 700, marginBottom: 8 }}>Verification Failed</div>
            <div style={{ fontSize: 12, color: 'var(--muted)', marginBottom: 24 }}>{errorMsg}</div>
            <button onClick={() => setStep('questions')} style={{
              background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 10,
              padding: '10px 24px', color: '#f0f0f8',
              fontFamily: 'Syne, sans-serif', fontSize: 13, fontWeight: 700, cursor: 'pointer',
            }}>
              Try Again
            </button>
          </div>
        )}

        {/* Questions state */}
        {(step === 'questions' || step === 'verifying') && (
          <>
            {/* Title */}
            <div style={{ fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.12em', color: '#a99cff', fontWeight: 500, marginBottom: 8 }}>
              {survey.category}
            </div>
            <div style={{ fontFamily: 'Syne, sans-serif', fontSize: 20, fontWeight: 800, lineHeight: 1.2, marginBottom: 10 }}>
              {survey.title}
            </div>
            <div style={{ fontSize: 12, lineHeight: 1.7, color: 'rgba(240,240,248,0.6)', marginBottom: 20 }}>
              {survey.description}
            </div>

            {/* Reward box */}
            <div style={{
              background: 'var(--surface)', border: '1px solid rgba(76,255,176,0.15)',
              borderRadius: 10, padding: '14px 16px',
              display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20,
            }}>
              <div style={{ width: 40, height: 40, background: 'rgba(76,255,176,0.1)', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, flexShrink: 0 }}>
                💰
              </div>
              <div>
                <div style={{ fontFamily: 'Syne, sans-serif', fontSize: 18, fontWeight: 800, color: 'var(--accent)' }}>
                  {survey.rewardWLD} WLD + 🏆 NFT
                </div>
                <div style={{ fontSize: 10, color: 'var(--muted)', marginTop: 2 }}>
                  Paid instantly after World ID verification
                </div>
              </div>
            </div>

            {/* World ID info box */}
            <div style={{
              background: 'rgba(124,108,255,0.06)', border: '1px solid rgba(124,108,255,0.2)',
              borderRadius: 10, padding: '14px 16px', marginBottom: 20,
            }}>
              <div style={{ fontFamily: 'Syne, sans-serif', fontSize: 12, fontWeight: 700, color: '#a99cff', marginBottom: 8 }}>
                ◆ World ID Verification
              </div>
              {[
                'Confirms you are a unique human (1 response only)',
                'Reveals age range & country anonymously',
                'Zero personal data stored on-chain',
                'ZK proof — your identity stays private',
              ].map((item, i) => (
                <div key={i} style={{ fontSize: 11, color: 'rgba(240,240,248,0.5)', display: 'flex', alignItems: 'center', gap: 6, marginBottom: 4 }}>
                  <span style={{ color: '#a99cff', fontSize: 7 }}>◆</span> {item}
                </div>
              ))}
            </div>

            {/* Questions */}
            <div style={{ fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--muted)', marginBottom: 12, fontWeight: 500 }}>
              Questions
            </div>

            {survey.questions.map((q, i) => (
              <div key={q.id} className="animate-fadeUp" style={{ marginBottom: 20, animationDelay: `${i * 0.05}s` }}>
                <div style={{ fontFamily: 'Syne, sans-serif', fontSize: 13, fontWeight: 600, marginBottom: 10, lineHeight: 1.4 }}>
                  <span style={{ color: 'var(--muted)', fontWeight: 400 }}>{i + 1}. </span>
                  {q.text}
                </div>

                {q.type === 'choice' && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                    {q.options!.map((opt) => (
                      <button
                        key={opt}
                        onClick={() => setAnswers(a => ({ ...a, [q.id]: opt }))}
                        style={{
                          background: answers[q.id] === opt ? 'rgba(76,255,176,0.08)' : 'var(--surface)',
                          border: `1px solid ${answers[q.id] === opt ? 'var(--accent)' : 'var(--border)'}`,
                          borderRadius: 8, padding: '10px 14px',
                          color: answers[q.id] === opt ? 'var(--accent)' : '#f0f0f8',
                          fontFamily: 'DM Mono, monospace', fontSize: 12,
                          cursor: 'pointer', textAlign: 'left', transition: 'all 0.15s',
                        }}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                )}

                {q.type === 'scale' && (
                  <>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 6 }}>
                      {[1, 2, 3, 4, 5].map((n) => (
                        <button
                          key={n}
                          onClick={() => setAnswers(a => ({ ...a, [q.id]: n }))}
                          style={{
                            background: answers[q.id] === n ? 'rgba(124,108,255,0.12)' : 'var(--surface)',
                            border: `1px solid ${answers[q.id] === n ? 'var(--accent2)' : 'var(--border)'}`,
                            borderRadius: 8, padding: '10px 4px',
                            color: answers[q.id] === n ? '#a99cff' : '#f0f0f8',
                            fontFamily: 'Syne, sans-serif', fontSize: 14, fontWeight: 700,
                            cursor: 'pointer', textAlign: 'center', transition: 'all 0.15s',
                          }}
                        >
                          {n}
                        </button>
                      ))}
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 9, color: 'var(--muted)', marginTop: 4, padding: '0 2px' }}>
                      <span>{q.labels![0]}</span>
                      <span>{q.labels![1]}</span>
                    </div>
                  </>
                )}
              </div>
            ))}

            {/* World ID Button */}
            <IDKitWidget
              app_id={process.env.NEXT_PUBLIC_APP_ID as `app_${string}`}
              action={survey.id}
              verification_level={VerificationLevel.Device}
              handleVerify={handleVerify}
              onSuccess={onSuccess}
            >
              {({ open }) => (
                <button
                  onClick={allAnswered ? open : undefined}
                  disabled={!allAnswered || step === 'verifying'}
                  style={{
                    width: '100%',
                    background: allAnswered ? 'linear-gradient(135deg, #1a1a2e, #16213e)' : 'var(--surface)',
                    border: `1px solid ${allAnswered ? 'rgba(76,255,176,0.3)' : 'var(--border)'}`,
                    borderRadius: 12, padding: 16,
                    color: allAnswered ? '#f0f0f8' : 'var(--muted)',
                    fontFamily: 'Syne, sans-serif', fontSize: 14, fontWeight: 700,
                    cursor: allAnswered ? 'pointer' : 'not-allowed',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
                    marginBottom: 10, transition: 'all 0.2s',
                    opacity: allAnswered ? 1 : 0.6,
                  }}
                >
                  <div style={{
                    width: 28, height: 28, background: 'white', borderRadius: '50%',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 14, color: '#000', fontWeight: 900,
                  }}>W</div>
                  {!allAnswered ? 'Answer all questions first' : 'Verify with World ID & Submit'}
                </button>
              )}
            </IDKitWidget>

            <div style={{ fontSize: 10, color: 'var(--muted)', textAlign: 'center', lineHeight: 1.5 }}>
              Opens World App for verification · Takes ~10 seconds · No personal data stored
            </div>
          </>
        )}
      </div>
    </div>
  )
}
