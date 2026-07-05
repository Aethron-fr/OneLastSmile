import { useState, useRef, useEffect } from 'react'

const SECRET_LETTER = `Dear Anushka,

If you found this... then you truly looked.

Most people just skim. They read the surface and move on.
But you — you stayed long enough to find the part
that wasn't meant to be easy to find.

So here it is. The thing I never said out loud.

I don't know what we are.
I don't know what we were.
But I know that some mornings I wake up and
the first thing my mind reaches for is the thought of you.
Not your name. Not your face.
Just... the feeling of knowing you exist somewhere.

That's not nothing.
That's actually everything.

I built this whole thing because I couldn't say
any of this to your face without it falling apart.
So I put it here.
Hidden.
For someone patient enough to look.

You found it.
That means something.

— S`

export default function SecretLetter() {
  const [phase, setPhase]     = useState('hidden')   // hidden | unlocking | open | closing
  const [progress, setProgress] = useState(0)
  const holdTimer   = useRef(null)
  const progressRef = useRef(null)
  const startTime   = useRef(null)
  const rafId       = useRef(null)

  const HOLD_MS = 3000

  const startHold = () => {
    if (phase !== 'hidden') return
    startTime.current = performance.now()
    setPhase('unlocking')

    rafId.current = requestAnimationFrame(function tick(now) {
      const elapsed = now - startTime.current
      const pct = Math.min(elapsed / HOLD_MS, 1)
      setProgress(pct)
      if (pct < 1) {
        rafId.current = requestAnimationFrame(tick)
      } else {
        setPhase('open')
        setProgress(1)
      }
    })
  }

  const cancelHold = () => {
    if (phase !== 'unlocking') return
    cancelAnimationFrame(rafId.current)
    setPhase('hidden')
    setProgress(0)
  }

  const close = () => {
    setPhase('closing')
    setTimeout(() => { setPhase('hidden'); setProgress(0) }, 700)
  }

  useEffect(() => () => cancelAnimationFrame(rafId.current), [])

  return (
    <>
      {/* Trigger word embedded in footer — invisible hint */}
      <span
        className={`secret-trigger ${phase === 'unlocking' ? 'secret-triggering' : ''}`}
        onMouseDown={startHold}
        onMouseUp={cancelHold}
        onMouseLeave={cancelHold}
        onTouchStart={startHold}
        onTouchEnd={cancelHold}
        title="..."
        style={{ userSelect: 'none' }}
      >
        love
        {/* Progress ring */}
        {phase === 'unlocking' && (
          <svg className="secret-progress-ring" viewBox="0 0 36 36">
            <circle cx="18" cy="18" r="15" fill="none" stroke="rgba(255,77,133,0.15)" strokeWidth="2"/>
            <circle
              cx="18" cy="18" r="15" fill="none"
              stroke="rgba(255,77,133,0.8)" strokeWidth="2"
              strokeDasharray={`${progress * 94.25} 94.25`}
              strokeLinecap="round"
              transform="rotate(-90 18 18)"
            />
          </svg>
        )}
      </span>

      {/* The Secret Modal */}
      {phase !== 'hidden' && (
        <div className={`secret-overlay ${phase === 'open' ? 'secret-open' : ''} ${phase === 'closing' ? 'secret-closing' : ''}`}>
          <div className="secret-modal">

            <div className="secret-found-badge">
              <i className="fas fa-lock-open"></i>
              &nbsp;You found it.
            </div>

            <div className="secret-letter-body">
              {SECRET_LETTER.trim().split('\n').map((line, i) =>
                line === ''
                  ? <br key={i} />
                  : <p key={i} className={line.startsWith('—') ? 'secret-signature' : ''}>{line}</p>
              )}
            </div>

            <button className="secret-close-btn" onClick={close}>
              Close &times;
            </button>

            <p className="secret-footer-note">
              This was always here. For someone who looked.
            </p>
          </div>
        </div>
      )}
    </>
  )
}
