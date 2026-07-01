import { useState, useEffect } from 'react'
import './legacy.css'
import './perf.css'
import DualCursor from './components/DualCursor'
import BirthdayFlow from './components/BirthdayFlow'
import MainSite from './components/MainSite'
import WarningScreen from './components/WarningScreen'
import LockScreen from './components/LockScreen'

export default function App() {
  const [phase, setPhase] = useState('birthday') // 'birthday' | 'warning' | 'lock' | 'main'
  const [isPlaying, setIsPlaying] = useState(false)

  // In production, we don't clear the localStorage.
  // The site is meant to be viewed once.

  const handleBirthdayEnter = () => {
    // If already viewed, go straight to lock screen — skip warning
    if (localStorage.getItem('onelastsmile_viewed') === 'true') {
      setPhase('lock')
    } else {
      setPhase('warning')
    }
  }

  const handleWarningContinue = () => {
    // First-time visitor — mark as viewed and let them in
    try { localStorage.setItem('onelastsmile_viewed', 'true') } catch (e) {}
    setPhase('main')
  }

  return (
    <>
      <DualCursor />
      {phase === 'birthday' && (
        <BirthdayFlow onEnter={handleBirthdayEnter} isPlaying={isPlaying} setIsPlaying={setIsPlaying} />
      )}
      {phase === 'warning' && (
        <WarningScreen onContinue={handleWarningContinue} />
      )}
      {phase === 'lock' && (
        <LockScreen />
      )}
      {phase === 'main' && (
        <MainSite isPlaying={isPlaying} setIsPlaying={setIsPlaying} />
      )}
    </>
  )
}
