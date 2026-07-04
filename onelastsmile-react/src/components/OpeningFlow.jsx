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
    ornament: 'সত্যিটা বলি',
    heading: 'Sorry, Anushka...',
    lines: [
      'আজকে সবাই তোমাকে সুন্দর সুন্দর কথায়,',
      'সুন্দর সুন্দর গিফটে wish করবে।',
      'আমি একটা সাধারণ "Happy Birthday" লিখে wish করলাম না।',
      '',
      'আগে sorry — যদি মনে হয়ে থাকে আমি ভুলে গেছি,',
      'বা কম গুরুত্ব দিয়েছি।',
      '',
      'সত্যিটা উলটো —',
      'এতটাই গুরুত্ব দিয়েছি যে',
      'একটা টেক্সটে শেষ করতে পারিনি।',
    ],
    btnLabel: 'বলো যাই',
    icon: 'fas fa-heart',
  },
  {
    id: 2,
    mood: 'precious',
    ornament: 'আমার গিফট',
    heading: 'এটা দোকান থেকে কেনা যায় না।',
    lines: [
      'সবাই wish করে, দামী গিফট দেয় —',
      'ফুল, চকলেট, পারফিউম...',
      '',
      'আমি ওসব দিতে পারিনি।',
      'তার বদলে নিজের হাতে, নিজের সময় দিয়ে,',
      'নিজের মতো করে তোমার জন্য কিছু বানিয়েছি।',
      '',
      'এই ওয়েবসাইটটাই আমার গিফট।',
      'প্রতিটা লাইন, প্রতিটা রং, প্রতিটা মুহূর্ত —',
      'সব বানানো শুধু তোমার জন্য।',
    ],
    btnLabel: 'Next',
    icon: 'fas fa-gift',
  },
  {
    id: 3,
    mood: 'importance',
    ornament: 'তুমি মানে কী',
    heading: 'তুমি অনেক কিছু, Anushka.',
    lines: [
      'কিছু মানুষ থাকে যাদের কথা মাথায় আসলেই',
      'কোথাও একটু হালকা লাগে।',
      '',
      'তুমি সেরকম।',
      'তোমার থাকাটা জানলেই অনেক কিছু সহজ হয়ে যায়।',
      '',
      'তুমি জানো না হয়তো,',
      'কিন্তু তোমার অস্তিত্বটাই আলাদা একটা comfort।',
      '',
      'এই দুনিয়ায় তুমি আছো বলে —',
      'কিছু দিন একটু বেশি সুন্দর লেগেছে।',
    ],
    btnLabel: 'Continue',
    icon: 'fas fa-star',
  },
  {
    id: 4,
    mood: 'joke',
    ornament: 'এক সেকেন্ড',
    heading: 'এবার একটু হাসো তো...',
    lines: [
      '(নাহলে পরের পেজে যেতে পারবে না, promise 😄)',
      '',
      'তোমার birthday-তে তুমি যতটা expect করেছিলে —',
      'reality তার থেকে একটু বেশি weird।',
      '',
      'কারণ কেউ তোমার জন্য একটা পুরো website বানিয়ে ফেলেছে।',
      '',
      'Normal? না।',
      'তোমার জন্য? হ্যাঁ। 😅',
    ],
    btnLabel: 'হাসলাম, এখন যাই',
    icon: 'fas fa-face-smile',
  },
  {
    id: 5,
    mood: 'wish',
    ornament: 'জন্মদিনের শুভেচ্ছা',
    heading: 'Happy Birthday, Anushka. 🎂',
    lines: [
      'আজকে তোমার দিন।',
      '',
      'আশা করি আজকের দিনটা তোমার জন্য',
      'অনেক সুন্দর, অনেক হালকা, অনেক ভালো হোক।',
      '',
      'যত দূরেই থাকো,',
      'যত কিছুই হোক না কেন —',
      '',
      'তোমার হাসিটা যেন কোনোদিন না মেলায়।',
      '',
      'তুমি ভালো থাকো। সত্যিই ভালো থাকো।',
      '',
      '— Swapnadip',
    ],
    btnLabel: 'সাইটে যাই',
    icon: 'fas fa-cake-candles',
    isBig: true,
  },
  {
    id: 6,
    mood: 'warning',
    ornament: 'একটু মনোযোগ দাও',
    heading: 'এই সাইটটা হয়তো শুধু একবারই খুলবে।',
    lines: [
      'তাই তাড়াহুড়ো না করে,',
      'সময় নিয়ে, মন দিয়ে দেখো।',
      '',
      'প্রতিটা অংশ যত্ন করে বানানো হয়েছে।',
      '',
      'একবার শেষ হয়ে গেলে',
      'হয়তো আর ফিরে আসা যাবে না এই জায়গায়।',
    ],
    btnLabel: 'Continue →',
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
