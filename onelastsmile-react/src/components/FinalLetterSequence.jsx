import { useState, useEffect } from 'react'

const PAGES = [
  {
    id: 1,
    text: "Anushka,\n\nI don't think I have ever managed to explain how much you mean to me.",
    holdTime: 5500,
    effect: 'crimson'
  },
  {
    id: 2,
    text: "I still remember the day I first noticed you in Class 9.\n\nI remember the conversations after Class 10 results.\n\nI remember so many ordinary moments that became important to me simply because you were part of them.",
    holdTime: 6500,
  },
  {
    id: 3,
    text: "I never expected that one person could become such an important part of my life.\n\nBut somehow, you did.\n\nYou became someone whose happiness mattered deeply to me.",
    holdTime: 6000,
  },
  {
    id: 4,
    text: "I love you, Anushka.\n\nI don't think I can simply switch these feelings off.\n\nAnd I don't want to pretend that I will stop caring about you just because life is taking us in different directions.",
    holdTime: 6500,
    effect: 'crimson'
  },
  {
    id: 5,
    text: "Knowing that we may never meet again hurts more than I can explain.\n\nI wish things could have been different.\n\nI wish I had more time to tell you everything properly.\n\nBut I know that some things cannot be changed just because we wish they were different.",
    holdTime: 7000,
  },
  {
    id: 6,
    text: "I am not writing this to make you feel responsible for my sadness.\n\nYou have your own life, your own feelings and your own decisions.\n\nI respect that.\n\nI just wanted you to understand what you have meant to me.",
    holdTime: 6500,
  },
  {
    id: 7,
    text: "Maybe after this, we won't speak or meet again.\n\nI don't know what the future holds.\n\nBut I know that the feelings I have carried for you are not something I will forget overnight.",
    holdTime: 6500,
  },
  {
    id: 8,
    text: "I think a part of me will always love you.\n\nEven if life takes us far away from each other, I will always wish you happiness.\n\nI will always hope that you are safe, healthy and surrounded by people who genuinely care about you.",
    holdTime: 7000,
    effect: 'moon'
  },
  {
    id: 9,
    text: "I may not always be physically beside you.\n\nBut wherever life takes me, I will always carry care and affection for you.\n\nI will never wish anything bad for you.\n\nI will always want the best for you.",
    holdTime: 6500,
  },
  {
    id: 10,
    text: "This website is my last personal gift from my side.\n\nI spent so much time making it because I wanted to give you something that could hold a little part of what I could never explain properly.",
    holdTime: 6500,
  },
  {
    id: 11,
    text: "I don't expect a reply.\n\nI don't expect you to feel the same.\n\nI don't want you to feel guilty.\n\nI just wanted to be honest with you one last time.",
    holdTime: 6000,
  },
  {
    id: 12,
    text: "Thank you for being such an important part of my life, Anushka.\n\nI hope life gives you every happiness you deserve.\n\nI will always love you in my own way.\n\nTake care of yourself.\n\nAnd please, keep smiling.\n\nHappy Birthday.\n\n— Swapnadip",
    holdTime: 8500,
    effect: 'final'
  }
]

export default function FinalLetterSequence() {
  const [isActive, setIsActive] = useState(false)
  const [currentPage, setCurrentPage] = useState(-1)
  const [fadeState, setFadeState] = useState('in')
  const [finished, setFinished] = useState(false)
  const [showSignature, setShowSignature] = useState(false)
  const [hasWatched, setHasWatched] = useState(() => {
    try {
      return localStorage.getItem('watchedFinalSequence') === 'true'
    } catch {
      return false
    }
  })

  useEffect(() => {
    if (!isActive || finished) return

    if (currentPage === -1) {
      const t = setTimeout(() => {
        setCurrentPage(0)
        setFadeState('in')
      }, 3000)
      return () => clearTimeout(t)
    }

    if (currentPage < PAGES.length) {
      if (fadeState === 'in') {
        const t = setTimeout(() => setFadeState('out'), PAGES[currentPage].holdTime)
        return () => clearTimeout(t)
      } else {
        const t = setTimeout(() => {
          if (currentPage === PAGES.length - 1) {
            setFinished(true)
          } else {
            setCurrentPage(currentPage + 1)
            setFadeState('in')
          }
        }, 1500)
        return () => clearTimeout(t)
      }
    }
  }, [isActive, currentPage, fadeState, finished])

  useEffect(() => {
    if (finished) {
      const t1 = setTimeout(() => setShowSignature(true), 4000)
      const t2 = setTimeout(() => setShowSignature(false), 9000)
      const t3 = setTimeout(() => {
        setIsActive(false)
        setFinished(false)
        setCurrentPage(-1)
        setHasWatched(true)
        localStorage.setItem('watchedFinalSequence', 'true')
        document.body.style.overflow = ''
      }, 15000)
      return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3) }
    }
  }, [finished])

  const exitSequence = () => {
    document.body.style.overflow = ''
    setIsActive(false)
    setFinished(false)
    setCurrentPage(-1)
  }

  const skipToNext = () => {
    if (!isActive || finished || currentPage === -1) return
    if (currentPage === PAGES.length - 1) {
      setFadeState('out')
      setTimeout(() => setFinished(true), 1000)
    } else {
      setFadeState('out')
      setTimeout(() => {
        setCurrentPage(prev => prev + 1)
        setFadeState('in')
      }, 500)
    }
  }

  const triggerSequence = () => {
    setIsActive(true)
    document.body.style.overflow = 'hidden'
  }

  if (!isActive) {
    return (
      <div style={{ padding: '60px 20px 80px', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <div style={{ 
          marginBottom: '40px', 
          fontFamily: 'var(--font-serif)', 
          color: 'rgba(255,255,255,0.5)', 
          fontSize: '1.1rem',
          lineHeight: '2',
          letterSpacing: '1px',
          fontStyle: 'italic'
        }}>
          <p>You've seen everything I built for you.</p>
          <p>Every word, every memory, every feeling.</p>
          <p style={{ marginTop: '20px' }}>But before you close this tab...</p>
        </div>
        <div className="final-trigger-container" style={{ padding: 0 }}>
          <button 
            className={`final-trigger-btn ${hasWatched ? 'watched' : ''}`} 
            onClick={triggerSequence}
          >
            one last thing.
          </button>
        </div>
      </div>
    )
  }

  const page = currentPage >= 0 && currentPage < PAGES.length ? PAGES[currentPage] : null

  return (
    <div 
      className={`final-sequence-overlay ${finished ? 'fully-black' : ''} ${page?.effect === 'moon' ? 'moon-glow' : ''} ${page?.effect === 'rain' ? 'rain-distortion' : ''} ${page?.effect === 'crimson' ? 'crimson-glow' : ''} ${page?.effect === 'final' ? 'final-glow' : ''}`}
      onClick={skipToNext}
      style={{ cursor: 'pointer' }}
    >
      
      {!finished && (
        <div className="sequence-controls" onClick={(e) => e.stopPropagation()}>
          <button onClick={exitSequence}>Exit</button>
        </div>
      )}

      <div className="sequence-grain"></div>

      <div className="sequence-content">
        {!finished && page && (
          <p className={`sequence-text ${fadeState === 'in' ? 'visible' : 'hidden'}`}>
            {page.text.split('\n').map((line, i) => (
              <span key={i}>{line}<br/></span>
            ))}
          </p>
        )}

        {finished && (
          <div className="sequence-ending">
            <p className={`signature ${showSignature ? 'visible' : 'hidden'}`}>— Swapnadip</p>
          </div>
        )}
      </div>
      
      {!finished && (
        <div style={{ position: 'absolute', bottom: '30px', left: '50%', transform: 'translateX(-50%)', opacity: 0.3, fontSize: '0.8rem', fontFamily: 'monospace', pointerEvents: 'none' }}>
          tap anywhere to continue
        </div>
      )}
    </div>
  )
}
