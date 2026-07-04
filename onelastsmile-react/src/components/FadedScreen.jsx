import { useState, useEffect } from 'react'

/* ─────────────────────────────────────────────
   Shown immediately on load if the user previously
   chose "Let It Fade Away" on the final choice screen.
   Reuses the exact same FadeText messages as FinalChoice.
───────────────────────────────────────────── */

function FadeText({ delay, text }) {
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const t = setTimeout(() => setVisible(true), delay)
    return () => clearTimeout(t)
  }, [delay])

  return (
    <p style={{
      opacity: visible ? 1 : 0,
      transition: 'opacity 1.5s ease',
      whiteSpace: 'pre-line',
      fontFamily: 'var(--font-serif)',
      fontSize: 'clamp(1rem, 2.8vw, 1.3rem)',
      color: 'rgba(255, 200, 220, 0.85)',
      lineHeight: 1.9,
      marginBottom: '2rem',
      textShadow: '0 0 20px rgba(255,77,133,0.2)',
    }}>
      {text}
    </p>
  )
}

export default function FadedScreen() {
  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      background: '#000',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'column',
      textAlign: 'center',
      padding: '40px 24px',
      zIndex: 999999,
    }}>
      <div style={{ maxWidth: '560px' }}>
        <FadeText
          delay={800}
          text={"If this story doesn't belong in your life,\nI'll let it fade quietly."}
        />
        <FadeText
          delay={3800}
          text={"Not because it didn't matter,\nbut because loving you\nwas never about forcing you to stay."}
        />
        <FadeText
          delay={7500}
          text={"Some stories don't last forever,\nbut they still remain real."}
        />
        <FadeText
          delay={11500}
          text={"— Swapnadip"}
        />
      </div>
    </div>
  )
}
