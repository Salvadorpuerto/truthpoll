'use client'
import type { Survey } from '@/lib/surveys'

export default function SurveyCard({ survey, delay, onClick }: {
  survey: Survey
  delay: number
  onClick: () => void
}) {
  const pct = Math.round((survey.responseCount / survey.maxResponses) * 100)
  const closed = !survey.active || pct >= 100

  return (
    <div
      onClick={closed ? undefined : onClick}
      className="animate-fadeUp"
      style={{
        margin: '0 16px 12px',
        background: 'var(--surface)',
        border: '1px solid var(--border)',
        borderRadius: 12,
        overflow: 'hidden',
        cursor: closed ? 'default' : 'pointer',
        animationDelay: `${delay}s`,
        transition: 'all 0.2s',
        opacity: closed ? 0.5 : 1,
      }}
    >
      <div style={{ padding: '16px 16px 12px' }}>
        <div style={{ fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#a99cff', marginBottom: 8, fontWeight: 500 }}>
          {survey.category}
        </div>
        <div style={{ fontFamily: 'Syne, sans-serif', fontSize: 15, fontWeight: 700, lineHeight: 1.3, marginBottom: 10 }}>
          {survey.title}
        </div>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          <Chip color="green">+{survey.rewardWLD} WLD</Chip>
          <Chip color="gold">🏆 Badge</Chip>
          <Chip color="purple">{survey.questions?.length ?? '?'} questions</Chip>
        </div>
      </div>

      <div style={{
        padding: '10px 16px 14px',
        borderTop: '1px solid var(--border)',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }}>
        <div style={{ flex: 1, marginRight: 12 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 9, color: 'var(--muted)', marginBottom: 4 }}>
            <span>{survey.responseCount.toLocaleString()} / {survey.maxResponses.toLocaleString()}</span>
            <span style={{ color: closed ? 'var(--muted)' : 'var(--accent)' }}>{pct}%</span>
          </div>
          <div style={{ height: 3, background: 'rgba(255,255,255,0.06)', borderRadius: 2, overflow: 'hidden' }}>
            <div style={{
              height: '100%',
              width: `${Math.min(pct, 100)}%`,
              background: closed ? 'var(--muted)' : 'linear-gradient(90deg, var(--accent), var(--accent2))',
              borderRadius: 2,
            }} />
          </div>
        </div>
        <div style={{ fontFamily: 'Syne, sans-serif', fontSize: 13, fontWeight: 700, color: closed ? 'var(--muted)' : 'var(--accent)', textAlign: 'right' }}>
          {closed ? 'Closed' : `${survey.rewardWLD} WLD`}
          {!closed && <div style={{ fontSize: 9, color: 'var(--muted)', fontWeight: 400 }}>+ NFT</div>}
        </div>
      </div>
    </div>
  )
}

function Chip({ children, color }: { children: React.ReactNode; color: 'green' | 'gold' | 'purple' | 'muted' }) {
  const styles: Record<string, React.CSSProperties> = {
    green: { background: 'rgba(76,255,176,0.1)', color: 'var(--accent)', border: '1px solid rgba(76,255,176,0.2)' },
    gold: { background: 'rgba(255,209,102,0.1)', color: 'var(--gold)', border: '1px solid rgba(255,209,102,0.2)' },
    purple: { background: 'rgba(124,108,255,0.1)', color: '#a99cff', border: '1px solid rgba(124,108,255,0.2)' },
    muted: { background: 'rgba(255,255,255,0.05)', color: 'var(--muted)', border: '1px solid var(--border)' },
  }
  return (
    <span style={{ fontSize: 10, padding: '3px 8px', borderRadius: 4, fontWeight: 500, ...styles[color] }}>
      {children}
    </span>
  )
}
