'use client'

// ─── Bottom Navigation ─────────────────────────────────────────────────────

export function BottomNav({ active, onChange }: {
  active: 'feed' | 'create' | 'profile'
  onChange: (tab: 'feed' | 'create' | 'profile') => void
}) {
  const tabs = [
    { id: 'feed' as const, label: 'Surveys', icon: '📋' },
    { id: 'create' as const, label: 'Create', icon: '✏️' },
    { id: 'profile' as const, label: 'My Badges', icon: '🏆' },
  ]

  return (
    <nav style={{
      position: 'fixed', bottom: 0, left: '50%', transform: 'translateX(-50%)',
      width: '100%', maxWidth: 430,
      background: 'var(--surface)', borderTop: '1px solid var(--border)',
      display: 'grid', gridTemplateColumns: '1fr 1fr 1fr',
      zIndex: 40,
    }}>
      {tabs.map(tab => (
        <button
          key={tab.id}
          onClick={() => onChange(tab.id)}
          style={{
            padding: '12px 8px 10px',
            background: 'none', border: 'none',
            color: active === tab.id ? 'var(--accent)' : 'var(--muted)',
            cursor: 'pointer', textAlign: 'center',
            borderTop: `2px solid ${active === tab.id ? 'var(--accent)' : 'transparent'}`,
            transition: 'all 0.2s',
          }}
        >
          <div style={{ fontSize: 18, marginBottom: 2 }}>{tab.icon}</div>
          <div style={{ fontSize: 10, fontFamily: 'DM Mono, monospace', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            {tab.label}
          </div>
        </button>
      ))}
    </nav>
  )
}

// ─── Create View ───────────────────────────────────────────────────────────

export function CreateView() {
  return (
    <div style={{ padding: 20 }}>
      <div style={{ fontFamily: 'Syne, sans-serif', fontSize: 20, fontWeight: 800, marginBottom: 4 }}>
        Create Survey
      </div>
      <div style={{ fontSize: 11, color: 'var(--muted)', marginBottom: 24, lineHeight: 1.5 }}>
        Deploy a verified survey to 38M+ World App users. Pay in WLD — respondents earn directly.
      </div>

      {[
        { label: 'Survey Title', type: 'input', placeholder: 'e.g. Consumer sentiment Q2 2026' },
        { label: 'Description', type: 'textarea', placeholder: 'What is this survey about?' },
      ].map(field => (
        <div key={field.label} style={{ marginBottom: 16 }}>
          <label style={{ fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--muted)', fontWeight: 500, display: 'block', marginBottom: 6 }}>
            {field.label}
          </label>
          {field.type === 'textarea' ? (
            <textarea placeholder={field.placeholder} style={inputStyle as any} rows={3} />
          ) : (
            <input type="text" placeholder={field.placeholder} style={inputStyle as any} />
          )}
        </div>
      ))}

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 16 }}>
        <div>
          <label style={labelStyle}>Reward per response</label>
          <input type="number" defaultValue="2.5" min="0.1" step="0.1" style={inputStyle as any} />
          <div style={{ fontSize: 10, color: 'var(--muted)', marginTop: 4, opacity: 0.7 }}>WLD tokens</div>
        </div>
        <div>
          <label style={labelStyle}>Max responses</label>
          <input type="number" defaultValue="1000" min="10" style={inputStyle as any} />
        </div>
      </div>

      {/* Info box */}
      <div style={{
        background: 'rgba(76,255,176,0.05)', border: '1px solid rgba(76,255,176,0.15)',
        borderRadius: 10, padding: 14, marginBottom: 20,
      }}>
        <div style={{ fontSize: 10, color: 'var(--accent)', fontWeight: 500, marginBottom: 6 }}>◆ What you get</div>
        {[
          'Every respondent verified as unique human via World ID',
          'Anonymous demographics (age range, country)',
          'Fraud-proof data — no bots, no duplicate responses',
          'NFT badges auto-minted for respondents',
        ].map((item, i) => (
          <div key={i} style={{ fontSize: 11, color: 'rgba(240,240,248,0.6)', marginBottom: 4, display: 'flex', gap: 6 }}>
            <span style={{ color: 'var(--accent)', fontSize: 8 }}>◆</span> {item}
          </div>
        ))}
      </div>

      <button style={{
        width: '100%', background: 'var(--accent)', border: 'none', borderRadius: 10,
        padding: 14, color: '#0a0a0f', fontFamily: 'Syne, sans-serif', fontSize: 14, fontWeight: 800,
        cursor: 'pointer',
      }}
        onClick={() => alert('Survey creation coming in full version!\n\nThis will deploy a smart contract to World Chain and create your survey.')}
      >
        Deploy Survey →
      </button>
    </div>
  )
}

// ─── Profile View ──────────────────────────────────────────────────────────

export function ProfileView() {
  const badges = [
    { emoji: '🏛', name: 'Inflation Study', date: 'Apr 12', airdrop: true },
    { emoji: '🗳', name: 'AI Policy', date: 'Apr 8', airdrop: false },
    { emoji: '🌐', name: 'DeFi Patterns', date: 'Mar 30', airdrop: true },
    { emoji: '🏥', name: 'Health Access', date: 'Mar 22', airdrop: false },
    { emoji: '📱', name: 'UX Research', date: 'Mar 15', airdrop: false },
    { emoji: '⚡', name: 'Energy Survey', date: 'Mar 5', airdrop: true },
  ]

  return (
    <div style={{ padding: 20 }}>
      {/* Profile header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 24, paddingBottom: 20, borderBottom: '1px solid var(--border)' }}>
        <div style={{
          width: 52, height: 52, borderRadius: '50%',
          background: 'linear-gradient(135deg, var(--accent2), var(--accent))',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontFamily: 'Syne, sans-serif', fontSize: 20, fontWeight: 800, color: 'white',
        }}>A</div>
        <div>
          <div style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: 16, marginBottom: 2 }}>anon_researcher</div>
          <div style={{ fontSize: 10, color: 'var(--muted)' }}>World App user</div>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 4,
            background: 'rgba(76,255,176,0.08)', border: '1px solid rgba(76,255,176,0.2)',
            borderRadius: 20, padding: '3px 8px', fontSize: 10, color: 'var(--accent)', marginTop: 4,
          }}>
            ✓ World ID Verified
          </div>
        </div>
      </div>

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 10, marginBottom: 24 }}>
        {[['6', 'Surveys'], ['18.5', 'WLD Earned'], ['6', 'Badges']].map(([val, label]) => (
          <div key={label} style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 10, padding: 12, textAlign: 'center' }}>
            <div style={{ fontFamily: 'Syne, sans-serif', fontSize: 18, fontWeight: 800, color: 'var(--accent)', marginBottom: 3 }}>{val}</div>
            <div style={{ fontSize: 9, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>{label}</div>
          </div>
        ))}
      </div>

      {/* Badges */}
      <div style={{ fontFamily: 'Syne, sans-serif', fontSize: 13, fontWeight: 700, marginBottom: 14, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        NFT Badges
        <span style={{ fontSize: 10, color: 'var(--muted)', fontWeight: 400, fontFamily: 'DM Mono, monospace' }}>{badges.length} collected</span>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10, marginBottom: 8 }}>
        {badges.map((badge, i) => (
          <div key={i} className="animate-fadeUp" style={{
            background: 'var(--surface)',
            border: `1px solid ${badge.airdrop ? 'rgba(255,209,102,0.2)' : 'var(--border)'}`,
            borderRadius: 10, padding: '14px 10px', textAlign: 'center',
            animationDelay: `${i * 0.05}s`,
          }}>
            <div style={{ fontSize: 28, marginBottom: 8 }}>{badge.emoji}</div>
            <div style={{ fontFamily: 'Syne, sans-serif', fontSize: 10, fontWeight: 700, color: badge.airdrop ? 'var(--gold)' : 'var(--text)', marginBottom: 3, lineHeight: 1.3 }}>
              {badge.name}
            </div>
            <div style={{ fontSize: 9, color: 'var(--muted)' }}>{badge.date}</div>
          </div>
        ))}
      </div>

      <div style={{ fontSize: 10, color: 'var(--muted)', textAlign: 'center', marginBottom: 24 }}>
        🏆 gold border = airdrop eligible
      </div>

      {/* Earnings */}
      <div style={{ borderTop: '1px solid var(--border)', paddingTop: 20 }}>
        <div style={{ fontFamily: 'Syne, sans-serif', fontSize: 13, fontWeight: 700, marginBottom: 14 }}>Claimable Earnings</div>
        <div style={{
          background: 'var(--surface)', border: '1px solid var(--border)',
          borderRadius: 10, padding: 16, display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        }}>
          <div>
            <div style={{ fontFamily: 'Syne, sans-serif', fontSize: 24, fontWeight: 800, color: 'var(--accent)' }}>5.5 WLD</div>
            <div style={{ fontSize: 10, color: 'var(--muted)', marginTop: 2 }}>from 3 completed surveys</div>
          </div>
          <button style={{
            background: 'rgba(76,255,176,0.1)', border: '1px solid rgba(76,255,176,0.3)',
            borderRadius: 8, padding: '10px 16px', color: 'var(--accent)',
            fontFamily: 'Syne, sans-serif', fontSize: 12, fontWeight: 700, cursor: 'pointer',
          }}>
            Claim →
          </button>
        </div>
      </div>
    </div>
  )
}

// ─── Shared styles ─────────────────────────────────────────────────────────

const inputStyle: React.CSSProperties = {
  width: '100%', background: 'var(--surface)', border: '1px solid var(--border)',
  borderRadius: 8, padding: '10px 12px', color: '#f0f0f8',
  fontFamily: 'DM Mono, monospace', fontSize: 12, outline: 'none',
  resize: 'none' as any,
}

const labelStyle: React.CSSProperties = {
  fontSize: 10, textTransform: 'uppercase' as const, letterSpacing: '0.1em',
  color: 'var(--muted)', fontWeight: 500, display: 'block', marginBottom: 6,
}

export default BottomNav
