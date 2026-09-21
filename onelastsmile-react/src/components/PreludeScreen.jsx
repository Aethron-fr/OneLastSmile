import { useState, useEffect, useCallback, useRef } from 'react'

/* ─────────────────────────────────────────────
   DIALOGUE DATA
   Each entry is an array of "runs" (spans).
   A run is { text, em } where em=true means emphasis.
   A null entry creates a visual pause (extra gap).
───────────────────────────────────────────── */
const BLOCKS = [
  // 1
  [{ text: 'Hey Anushka.' }],
  // pause
  null,
  // 2
  [{ text: 'Before you step in, I want you to know something.' }],
  // pause
  null,
  // 3
  [
    { text: 'Everything you are about to see is only what I feel.\nMy heart, seen through my own eyes.\nThis is ' },
    { text: 'you', em: true },
    { text: ', the way ' },
    { text: 'I', em: true },
    { text: ' see you.' },
  ],
  // pause
  null,
  // 4
  [{ text: 'And it never means you have to feel the same.\nNot even a little.\nThere is no expectation hiding behind any of this.' }],
  // pause
  null,
  // 5
  [
    { text: "I'm not asking for anything.\nNo reply. No reason. No answer.\nI just wanted to say it somewhere beautiful,\ninstead of keeping it silent inside me." },
  ],
  // pause
  null,
  // 6
  [{ text: "So please, don't worry.\nDon't overthink it.\nDon't feel any pressure.\nAnd please... don't mind." }],
  // pause
  null,
  // 7
  [
    { text: 'This is just a ' },
    { text: 'gift', em: true },
    { text: '.\nMade ' },
    { text: 'completely', em: true },
    { text: ', entirely, only for you.\nEvery page, every word, every little detail\nwas made with you in my mind.' },
  ],
  // pause
  null,
  // 8
  [{ text: 'So come in.\nJust visit, and see what I feel for you.' }],
  // pause
  null,
  // 9 — final, lingers longer
  [
    { text: 'Stay happy. Stay blessed.\nAnd whatever happens, whatever comes,\nkeep ' },
    { text: 'smiling', em: true },
    { text: '.\nThat\'s all I\'ve ever really wanted. 🤍' },
  ],
]

// Only the real lines (not nulls) get animated slots
const LINES = BLOCKS.filter(b => b !== null)

/* ─────────────────────────────────────────────
   Timing helpers
───────────────────────────────────────────── */
// Delay between lines (ms).  Nulls add an extra gap to the *next* line.
function buildSchedule() {
  const schedule = [] // { lineIdx, delay }
  let cursor = 1200   // first line appears after 1.2 s
  let lineIdx = 0
  BLOCKS.forEach(b => {
    if (b === null) {
      cursor += 800   // extra pause for blank separator
    } else {
      schedule.push({ lineIdx, delay: cursor })
      // last line gets a longer linger before buttons appear
      cursor += lineIdx === LINES.length - 1 ? 3200 : 2000
      lineIdx++
    }
  })
  return schedule
}
const SCHEDULE = buildSchedule()
const BUTTONS_DELAY = SCHEDULE[SCHEDULE.length - 1].delay +
  (LINES.length > 0 ? 3200 : 0)

/* ─────────────────────────────────────────────
   Helper: render a block's runs as JSX
───────────────────────────────────────────── */
function renderRuns(runs) {
  return runs.map((run, i) => {
    const parts = run.text.split('\n')
    const inner = parts.map((p, j) => (
      <span key={j}>
        {p}
        {j < parts.length - 1 && <br />}
      </span>
    ))
    return run.em
      ? <em key={i} className="prl-em">{inner}</em>
      : <span key={i}>{inner}</span>
  })
}

/* ─────────────────────────────────────────────
   SESSION / DEV GATE
───────────────────────────────────────────── */
const SESSION_KEY = 'ols_prelude_seen'
export function shouldShowPrelude() {
  const forceShow = new URLSearchParams(window.location.search).get('prelude') === '1'
  if (forceShow) return true
  return sessionStorage.getItem(SESSION_KEY) !== 'true'
}
function markPrologueSeen() {
  try { sessionStorage.setItem(SESSION_KEY, 'true') } catch (_) {}
}

/* ─────────────────────────────────────────────
   MAIN COMPONENT
───────────────────────────────────────────── */
export default function PreludeScreen({ onEnter }) {
  const [visibleCount, setVisibleCount] = useState(0)  // how many lines are visible
  const [showButtons, setShowButtons]   = useState(false)
  const [declined, setDeclined]         = useState(false)
  const [exiting, setExiting]           = useState(false)

  const timersRef    = useRef([])
  const skippedRef   = useRef(false)
  const prefersReduced = useRef(
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  )

  // Schedule all line reveals + button reveal
  useEffect(() => {
    // If reduced motion → show everything instantly
    if (prefersReduced.current) {
      setVisibleCount(LINES.length)
      setShowButtons(true)
      return
    }

    SCHEDULE.forEach(({ lineIdx, delay }) => {
      const t = setTimeout(() => {
        if (!skippedRef.current) setVisibleCount(lineIdx + 1)
      }, delay)
      timersRef.current.push(t)
    })

    const tb = setTimeout(() => {
      setShowButtons(true)
    }, BUTTONS_DELAY)
    timersRef.current.push(tb)

    return () => timersRef.current.forEach(clearTimeout)
  }, [])

  // Skip: reveal all remaining lines immediately
  const skip = useCallback(() => {
    if (showButtons || skippedRef.current) return
    skippedRef.current = true
    timersRef.current.forEach(clearTimeout)
    setVisibleCount(LINES.length)
    // buttons appear shortly after skip
    const t = setTimeout(() => setShowButtons(true), 700)
    timersRef.current.push(t)
  }, [showButtons])

  const handleEnter = useCallback(() => {
    markPrologueSeen()
    setExiting(true)
    setTimeout(onEnter, 900)
  }, [onEnter])

  const handleDecline = useCallback(() => {
    markPrologueSeen()
    setDeclined(true)
  }, [])

  return (
    <div
      className={`prl-root${exiting ? ' prl-exit' : ''}`}
      onClick={!showButtons ? skip : undefined}
      aria-label="Before you enter"
      role="main"
    >
      {/* Subtle ambient glow */}
      <div className="prl-glow" aria-hidden="true" />

      <div className="prl-scroll-area">
        <div className="prl-content">

          {!declined ? (
            <>
              {/* Lines */}
              <div className="prl-lines" aria-live="polite">
                {LINES.map((runs, idx) => (
                  <p
                    key={idx}
                    className={`prl-line${idx === LINES.length - 1 ? ' prl-line--final' : ''}${idx < visibleCount ? ' prl-line--visible' : ''}`}
                    style={{ transitionDelay: '0ms' }}
                  >
                    {renderRuns(runs)}
                  </p>
                ))}
              </div>

              {/* Skip hint */}
              {!showButtons && visibleCount > 0 && (
                <p className="prl-skip-hint" aria-hidden="true">
                  tap anywhere to skip
                </p>
              )}

              {/* Buttons */}
              <div className={`prl-btns${showButtons ? ' prl-btns--visible' : ''}`}>
                <button
                  className="prl-btn-primary"
                  onClick={handleEnter}
                  aria-label="Enter the gift"
                >
                  Enter the gift&nbsp;→
                </button>
                <button
                  className="prl-btn-secondary"
                  onClick={handleDecline}
                  aria-label="Not right now"
                >
                  Not right now
                </button>
              </div>
            </>
          ) : (
            /* Soft decline message */
            <div className="prl-decline">
              <p>
                That&apos;s completely okay.{' '}
                The gift will be right here whenever you feel like opening it.&nbsp;🤍
              </p>
            </div>
          )}

        </div>
      </div>
    </div>
  )
}
