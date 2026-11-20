import { useState, useEffect, useRef } from 'react'

/* ─────────────────────────────────────────────
   6-screen opening flow shown AFTER the birthday
   cinematic, BEFORE the one-time warning screen.
   Reuses all bd-* CSS classes from BirthdayFlow.
───────────────────────────────────────────── */

const SCREENS = [
  {
    id: 1,
    mood: 'apology',
    ornament: 'Something I Wanted to Say',
    heading: 'Sorry, Anushka...',
    lines: [
      "Before anything else, I want to say I'm sorry.",
      "",
      "If I have ever hurt you through my words, my behaviour or anything I did without realising it, I genuinely regret that.",
      "",
      "And if there were times when you felt that I had forgotten you or that you no longer mattered to me, I wish I had been better at showing you otherwise.",
      "",
      "You were never someone I simply forgot about.",
      "",
      "You've meant far more to me than I've probably managed to express.",
    ],
    btnLabel: 'Continue →',
    icon: 'fas fa-heart',
  },
  {
    id: 2,
    mood: 'precious',
    ornament: 'Something Made for You',
    heading: 'This Is More Than Just a Birthday Gift.',
    lines: [
      "I could have bought you something from a shop.",
      "",
      "But I didn't want this particular gift to be something ordinary.",
      "",
      "I wanted to make something myself, put my own time into it and give you something that would feel personal.",
      "",
      "That's why I created this entire website.",
      "",
      "Every page, every colour, every animation and every little detail was something I thought about while making it.",
      "",
      "I know it isn't something expensive or physical.",
      "",
      "But I put a lot of myself into making it.",
      "",
      "And because this may be the last personal gift I give you, I wanted it to be something memorable.",
    ],
    btnLabel: 'Next →',
    icon: 'fas fa-gift',
  },
  {
    id: 3,
    mood: 'importance',
    ornament: 'You Should Know This',
    heading: 'You Have Meant More to Me Than You Know.',
    lines: [
      "I don't think I've ever properly explained how important you are to me.",
      "",
      "From those school days to the conversations we had later, so many little moments involving you became important memories for me.",
      "",
      "Sometimes even an ordinary conversation with you could make my day better.",
      "",
      "Your presence mattered to me in ways I never knew how to explain.",
      "",
      "I'm not saying you had to feel the same way.",
      "",
      "I just want you to know that you were, and still are, someone incredibly special to me.",
    ],
    btnLabel: 'Continue →',
    icon: 'fas fa-star',
  },
  {
    id: 4,
    mood: 'confession',
    ornament: 'A Little Honesty',
    heading: "There Are Things I've Never Managed to Say.",
    lines: [
      "I have tried many times to explain what I feel for you.",
      "",
      "But whenever I actually tried to put it into words, I never felt like I was explaining it properly.",
      "",
      "I love you, Anushka.",
      "",
      "Not because I expect something from you, and not because I want you to feel obligated to say anything back.",
      "",
      "I simply do.",
      "",
      "And I didn't want to leave these words unsaid.",
    ],
    btnLabel: 'Continue →',
    icon: 'fas fa-heart',
  },
  {
    id: 5,
    mood: 'wish',
    ornament: 'Your Special Day',
    heading: 'Happy Birthday, Anushka. ❤️',
    lines: [
      "On your birthday, I genuinely wish you all the happiness you deserve.",
      "",
      "I hope you achieve everything you dream about.",
      "",
      "I hope you meet good people, experience beautiful things and have many reasons to smile.",
      "",
      "Please take care of yourself.",
      "",
      "Whatever happens in life, I will always wish the very best for you.",
      "",
      "Happy Birthday.",
      "",
      "— Swapnadip",
    ],
    btnLabel: 'Continue →',
    icon: 'fas fa-cake-candles',
    isBig: true,
  },
  {
    id: 6,
    mood: 'warning',
    ornament: 'Before You Enter',
    heading: 'This Little World Is Meant to Be Opened Once.',
    lines: [
      "I made this website as a one-time experience.",
      "",
      "So take your time and explore everything at your own pace.",
      "",
      "There are memories, messages and things I wanted you to see.",
      "",
      "I don't want you to rush through it.",
      "",
      "Once the experience is completed, you may not be able to open it again on this browser.",
      "",
      "I hope you enjoy what I've made for you.",
    ],
    btnLabel: 'Enter the Website →',
    icon: 'fas fa-lock',
    isFinal: true,
  },
]

export default function OpeningFlow({ onComplete, setMood }) {
  const [screen, setScreen]   = useState(1)
  const [exiting, setExiting] = useState(false)
  const canvasRef = useRef(null)

  /* ── particle canvas (same as BirthdayFlow) ── */
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    canvas.width  = window.innerWidth
    canvas.height = window.innerHeight
    const resize  = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight }
    window.addEventListener('resize', resize, { passive: true })

    const colors = ['255,77,133', '162,57,202', '255,179,198', '255,255,255']
    const particles = Array.from({ length: 60 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: Math.random() * 2.2 + 0.5,
      speed: Math.random() * 0.5 + 0.15,
      opacity: Math.random() * 0.4 + 0.05,
      color: colors[Math.floor(Math.random() * colors.length)],
      phase: Math.random() * Math.PI * 2,
      twinkle: Math.random() * 0.018 + 0.008,
    }))

    let rafId
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      particles.forEach(p => {
        p.phase += p.twinkle
        const alpha = p.opacity * (0.5 + 0.5 * Math.sin(p.phase))
        ctx.fillStyle = `rgba(${p.color},${alpha})`
        ctx.beginPath(); ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2); ctx.fill()
        p.y -= p.speed; p.x += Math.sin(p.y * 0.009) * 0.25
        if (p.y < -10) { p.y = canvas.height + 10; p.x = Math.random() * canvas.width }
      })
      rafId = requestAnimationFrame(animate)
    }
    animate()
    return () => { cancelAnimationFrame(rafId); window.removeEventListener('resize', resize) }
  }, [])

  /* ── set mood when screen changes ── */
  useEffect(() => {
    const s = SCREENS.find(s => s.id === screen)
    if (s?.mood && setMood) setMood(s.mood)
  }, [screen, setMood])

  const goNext = (fromId) => {
    setExiting(true)
    setTimeout(() => {
      setExiting(false)
      const next = fromId + 1
      if (next > SCREENS.length) {
        onComplete()
      } else {
        setScreen(next)
      }
    }, 700)
  }

  const data = SCREENS.find(s => s.id === screen)
  if (!data) return null

  const isActive  = !exiting
  const isExiting = exiting

  return (
    <div id="openingFlow" style={{
      position: 'fixed', inset: 0, zIndex: 99999,
      background: 'radial-gradient(ellipse at center, #12052a 0%, #0a0118 100%)',
      overflow: 'hidden',
    }}>
      <canvas ref={canvasRef} style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }} />

      <div
        className={`bd-screen${isActive ? ' active' : ''}${isExiting ? ' exiting' : ''}`}
        style={{ position: 'absolute', inset: 0 }}
      >
        <i className={`bd-icon ${data.icon}`} />
        <div className="bd-ornament">{data.ornament}</div>

        {data.isBig ? (
          <h1
            className="bd-heading"
            style={{
              fontSize: 'clamp(2rem, 6vw, 3.5rem)',
              textShadow: '0 0 30px rgba(255,77,133,0.6), 0 0 60px rgba(255,77,133,0.3)',
              marginBottom: '2rem',
            }}
          >
            {data.heading}
          </h1>
        ) : (
          <h2 className="bd-heading">{data.heading}</h2>
        )}

        {data.lines.map((line, i) =>
          line === '' ? (
            <br key={i} />
          ) : (
            <p
              key={i}
              className="bd-text"
              style={data.isBig ? {
                fontSize: 'clamp(1rem, 2.5vw, 1.25rem)',
                opacity: 0.9,
                lineHeight: 2,
              } : {}}
            >
              {line}
            </p>
          )
        )}

        <button className="bd-btn" onClick={() => goNext(data.id)} style={{ marginTop: '2rem' }}>
          <span>{data.btnLabel}</span>
          {!data.isFinal && <i className="fas fa-chevron-right" />}
        </button>
      </div>

      {/* Step dots */}
      <div id="bdDots" style={{ position: 'fixed', bottom: '32px', left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: '10px', zIndex: 10 }}>
        {SCREENS.map(s => (
          <span
            key={s.id}
            className={`bd-dot${screen === s.id ? ' active' : ''}`}
          />
        ))}
      </div>
    </div>
  )
}
