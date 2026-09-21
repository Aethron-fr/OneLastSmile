import { useState, useEffect } from 'react'
import './legacy.css'
import './perf.css'
import DualCursor from './components/DualCursor'
import BirthdayFlow from './components/BirthdayFlow'
import OpeningFlow from './components/OpeningFlow'
import MainSite from './components/MainSite'
import WarningScreen from './components/WarningScreen'
import LockScreen from './components/LockScreen'
import FadedScreen from './components/FadedScreen'
import useMoodMusic from './hooks/useMoodMusic'
import PreludeScreen, { shouldShowPrelude } from './components/PreludeScreen'

const LOCK_KEY = 'oneLastSmile_faded'

// ── Global Mute Button (dev helper) ───────────────────────
function GlobalMuteBtn() {
  const [muted, setMuted] = useState(false)

  const toggle = () => {
    const next = !muted
    setMuted(next)
    // Mute every <audio> element in the DOM instantly
    document.querySelectorAll('audio').forEach(a => { a.muted = next })
  }

  return (
    <button
      onClick={toggle}
      title={muted ? 'Unmute' : 'Mute all audio'}
      style={{
        position:   'fixed',
        bottom:     '20px',
        right:      '20px',
        zIndex:     1000001,
        background: muted ? 'rgba(255,77,133,0.18)' : 'rgba(20,5,35,0.75)',
        border:     `1px solid ${muted ? 'rgba(255,77,133,0.6)' : 'rgba(255,255,255,0.15)'}`,
        color:      muted ? '#ff4d85' : 'rgba(255,255,255,0.6)',
        borderRadius: '50%',
        width:      '42px',
        height:     '42px',
        fontSize:   '1rem',
        cursor:     'pointer',
        display:    'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backdropFilter: 'blur(8px)',
        transition: 'all 0.25s ease',
        boxShadow:  muted ? '0 0 14px rgba(255,77,133,0.3)' : 'none',
      }}
    >
      <i className={`fas ${muted ? 'fa-volume-mute' : 'fa-volume-up'}`}></i>
    </button>
  )
}

export default function App() {
  // ── PERMANENT LOCK: check this FIRST, before anything else ──
  const isPermanentlyLocked = localStorage.getItem(LOCK_KEY) === 'true'

  const [phase, setPhase] = useState(() => {
    if (isPermanentlyLocked) return 'faded'
    // Show prelude intro once per session (or if ?prelude=1)
    if (shouldShowPrelude()) return 'prelude'
    return 'birthday'
  })

  const [isPlaying, setIsPlaying] = useState(false)

  // Mood music hook (Part 2)
  const { setMood, stopMood } = useMoodMusic()

  // If faded, render immediately — no site init, no audio preload, nothing
  if (phase === 'faded') {
    return <FadedScreen />
  }

  // ── Prelude → Birthday flow → Warning → Opening → Main ──

  const handlePreludeDone = () => setPhase('birthday')

  const handleBirthdayEnter = () => {
    // Return visitor: skip everything, straight to lock
    if (localStorage.getItem('onelastsmile_viewed') === 'true') {
      setPhase('lock')
    } else {
      // First time: show warning FIRST before the opening
      setPhase('warning')
    }
  }

  const handleWarningContinue = () => {
    // Warning accepted → now show the cinematic ONE LAST SMILE opening
    setPhase('opening')
  }

  const handleOpeningComplete = () => {
    // Opening done → mark viewed and enter the main site
    try { localStorage.setItem('onelastsmile_viewed', 'true') } catch (e) {}
    setPhase('main')
  }

  return (
    <>
      <DualCursor />

      {/* 🔇 Global mute button — always visible for dev work */}
      <GlobalMuteBtn />

      {phase === 'prelude' && (
        <PreludeScreen onEnter={handlePreludeDone} />
      )}

      {phase === 'birthday' && (
        <BirthdayFlow
          onEnter={handleBirthdayEnter}
          isPlaying={isPlaying}
          setIsPlaying={setIsPlaying}
        />
      )}

      {phase === 'opening' && (
        <OpeningFlow
          onComplete={handleOpeningComplete}
          setMood={setMood}
        />
      )}

      {phase === 'warning' && (
        <WarningScreen onContinue={handleWarningContinue} />
      )}

      {phase === 'lock' && (
        <LockScreen />
      )}

      {phase === 'main' && (
        <MainSite
          isPlaying={isPlaying}
          setIsPlaying={setIsPlaying}
          setMood={setMood}
        />
      )}
    </>
  )
}

