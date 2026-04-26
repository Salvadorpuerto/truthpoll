'use client'
import { useState } from 'react'
import { SURVEYS } from '@/lib/surveys'
import SurveyCard from '@/components/SurveyCard'
import SurveyDetail from '@/components/SurveyDetail'
import { BottomNav, CreateView, ProfileView } from '@/components/BottomNav'
import type { Survey } from '@/lib/surveys'

export default function Home() {
  const [tab, setTab] = useState<'feed' | 'create' | 'profile'>('feed')
  const [selected, setSelected] = useState<Survey | null>(null)

  return (
    <div style={{ background: 'var(--bg)', minHeight: '100vh', maxWidth: 430, margin: '0 auto', position: 'relative' }}>

      {/* Header */}
      <header style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '18px 20px 14px',
        borderBottom: '1px solid var(--border)',
        background: 'var(--bg)',
        position: 'sticky', top: 0, zIndex: 10,
      }}>
        <div style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: 22, letterSpacing: -0.5 }}>
          Truth<span style={{ color: 'var(--accent)' }}>Poll</span>
        </div>
        <div style={{
          display: 'flex', alignItems: 'center', gap: 6,
          background: 'rgba(76,255,176,0.08)', border: '1px solid rgba(76,255,176,0.2)',
          borderRadius: 20, padding: '5px 10px', fontSize: 11, color: 'var(--accent)',
        }}>
          <div className="animate-pulse-dot" style={{
            width: 6, height: 6, background: 'var(--accent)', borderRadius: '50%'
          }} />
          World App
        </div>
      </header>

      {/* Content */}
      <div style={{ paddingBottom: 80 }}>
        {tab === 'feed' && (
          <div>
            <div style={{ padding: '16px 20px 10px' }}>
              <div style={{ fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--muted)', fontWeight: 500 }}>
                Available Surveys
              </div>
              <div style={{ fontSize: 11, color: 'var(--muted)', opacity: 0.6, marginTop: 2 }}>
                Verified humans only · Earn WLD + NFT badges
              </div>
            </div>
            {SURVEYS.map((survey, i) => (
              <SurveyCard
                key={survey.id}
                survey={survey}
                delay={i * 0.05}
                onClick={() => setSelected(survey)}
              />
            ))}
          </div>
        )}

        {tab === 'create' && <CreateView />}
        {tab === 'profile' && <ProfileView />}
      </div>

      {/* Bottom Nav */}
      <BottomNav active={tab} onChange={setTab} />

      {/* Survey Detail Overlay */}
      {selected && (
        <SurveyDetail
          survey={selected}
          onClose={() => setSelected(null)}
        />
      )}
    </div>
  )
}
