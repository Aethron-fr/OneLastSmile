import { useRef, useCallback } from 'react'

const MOOD_TRACKS = {
  apology:    '/audio/mood-apology.mp3',
  precious:   '/audio/mood-precious.mp3',
  importance: '/audio/mood-importance.mp3',
  joke:       '/audio/mood-joke.mp3',
  wish:       '/audio/mood-wish.mp3',
  warning:    '/audio/mood-warning.mp3',
  nostalgic:  '/audio/mood-nostalgic.mp3',
  confession: '/audio/mood-confession.mp3',
  hopeful:    '/audio/mood-hopeful.mp3',
  fading:     '/audio/mood-fading.mp3',
}

const MAX_VOLUME = 0.45 // keep mood music softer than main song

export default function useMoodMusic() {
  const currentAudioRef = useRef(null)
  const currentMoodRef  = useRef(null)
  const fadeIntervalRef = useRef(null)

  const setMood = useCallback((mood, { fadeMs = 1500, loop = true } = {}) => {
    if (mood === currentMoodRef.current) return
    if (!MOOD_TRACKS[mood]) return

    // Clear any running crossfade
    if (fadeIntervalRef.current) clearInterval(fadeIntervalRef.current)

    const nextAudio = new Audio(MOOD_TRACKS[mood])
    nextAudio.loop = loop
    nextAudio.volume = 0
    nextAudio.play().catch(() => {}) // gracefully handle autoplay block

    const prevAudio = currentAudioRef.current
    const steps = 30
    let step = 0
    const intervalMs = fadeMs / steps

    fadeIntervalRef.current = setInterval(() => {
      step++
      const progress = step / steps
      nextAudio.volume = Math.min(progress * MAX_VOLUME, MAX_VOLUME)
      if (prevAudio) prevAudio.volume = Math.max(MAX_VOLUME * (1 - progress), 0)

      if (step >= steps) {
        clearInterval(fadeIntervalRef.current)
        fadeIntervalRef.current = null
        if (prevAudio) {
          prevAudio.pause()
          prevAudio.src = '' // release resource
        }

        // For fading mood: after track ends, truly silence it
        if (!loop) {
          nextAudio.addEventListener('ended', () => {
            nextAudio.pause()
            nextAudio.src = ''
            currentAudioRef.current = null
            currentMoodRef.current = null
          }, { once: true })
        }
      }
    }, intervalMs)

    currentAudioRef.current = nextAudio
    currentMoodRef.current = mood
  }, [])

  const stopMood = useCallback(({ fadeMs = 1000 } = {}) => {
    if (!currentAudioRef.current) return
    const audio = currentAudioRef.current
    const steps = 20
    let step = 0
    const startVol = audio.volume
    const iv = setInterval(() => {
      step++
      audio.volume = Math.max(startVol * (1 - step / steps), 0)
      if (step >= steps) {
        clearInterval(iv)
        audio.pause()
        audio.src = ''
        currentAudioRef.current = null
        currentMoodRef.current = null
      }
    }, fadeMs / steps)
  }, [])

  return { setMood, stopMood }
}
