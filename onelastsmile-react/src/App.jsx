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

const LOCK_KEY = 'oneLastSmile_faded'

export default function App() {
  // ── PERMANENT LOCK: check this FIRST, before anything else ──
  const isPermanentlyLocked = localStorage.getItem(LOCK_KEY) === 'true'

  const [phase, setPhase] = useState(() => {
    // If permanently locked → jump straight to faded screen
    if (isPermanentlyLocked) return 'faded'
    return 'birthday'
  })

  const [isPlaying, setIsPlaying] = useState(false)

  // Mood music hook (Part 2)
  const { setMood, stopMood } = useMoodMusic()

  // If faded, render immediately — no site init, no audio preload, nothing
  if (phase === 'faded') {
    return <FadedScreen />
  }

  // ── Birthday flow → Opening flow → Warning → Main ──

  const handleBirthdayEnter = () => {
    // Return visitor: skip opening + warning, straight to lock
    if (localStorage.getItem('onelastsmile_viewed') === 'true') {
      setPhase('lock')
    } else {
      setPhase('opening')
    }
  }

  const handleOpeningComplete = () => {
    setPhase('warning')
  }

  const handleWarningContinue = () => {
    try { localStorage.setItem('onelastsmile_viewed', 'true') } catch (e) {}
    setPhase('main')
  }

  return (
    <>
      <DualCursor />

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
