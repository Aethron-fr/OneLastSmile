import { useEffect, useRef, useState, useCallback } from 'react'
import { useReveal } from '../hooks/useReveal'

const LETTER_TEXT = `Anushka,

I don't know where to begin because there is so much I have wanted to tell you.

I still remember seeing you back in Class 9. At that time, I had no idea how important you would eventually become in my life.

After our Class 10 results, when we started talking more, those conversations slowly became something I looked forward to.

I remember the little things. The ordinary conversations, the familiar moments and the days when simply talking to you made me happy.

When I told you how I felt, things did not happen the way I had hoped. There were misunderstandings, distance and moments that were genuinely painful for me.

I tried to understand everything and tried to move forward, but my feelings never disappeared as easily as I thought they would.

I know that I cannot decide how you feel.

I know that love cannot be demanded or expected in return.

But I also don't want to pretend that what I felt was small.

I love you, Anushka.

You have been an incredibly important part of my life, and I will always remember that.

I wish things could have been different.

I wish I could have said everything properly while we still had the chance.

But even if our paths never cross again, I will always hope that life treats you kindly.

Thank you for being a part of my story.

— Swapnadip`

export default function LoveLetter() {
  const [displayed, setDisplayed] = useState('')
  const [done, setDone]     = useState(false)
  const startedRef  = useRef(false)
  const ivRef       = useRef(null)
  const idxRef      = useRef(0)
  const sectionRef  = useReveal()

  const startTypewriter = useCallback(() => {
    if (startedRef.current) return
    startedRef.current = true
    setDisplayed(''); setDone(false); idxRef.current = 0
    ivRef.current = setInterval(() => {
      if (idxRef.current < LETTER_TEXT.length) {
        // Batch 3 chars per tick to reduce setState calls (≈ same visual speed at 30ms)
        const chunk = LETTER_TEXT.slice(idxRef.current, idxRef.current + 3)
        setDisplayed(prev => prev + chunk)
        idxRef.current += 3
      } else {
        clearInterval(ivRef.current)
        setDone(true)
      }
    }, 30)
  }, [])

  const replay = useCallback(() => {
    clearInterval(ivRef.current)
    startedRef.current = false
    setDisplayed(''); setDone(false)
    setTimeout(startTypewriter, 50)
  }, [startTypewriter])

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          section.querySelectorAll('.reveal').forEach(el => el.classList.add('active'))
          setTimeout(startTypewriter, 500)
          obs.disconnect()
        }
      })
    }, { threshold: 0.3 })
    obs.observe(section)
    return () => { obs.disconnect(); clearInterval(ivRef.current) }
  }, [sectionRef, startTypewriter])

  return (
    <section className="letter-section" id="letter" ref={sectionRef}>
      <div className="section-header reveal">
        <p className="section-label"><i className="fas fa-envelope-open-text"></i> From My Heart</p>
        <h2 className="section-title">A Love Letter</h2>
        <div className="title-ornament"><i className="fas fa-heart"></i></div>
      </div>
      <div className="letter-container reveal">
        <div className="letter-paper">
          <div className="letter-seal"><i className="fas fa-heart"></i></div>
          <p className="letter-date">April 2026</p>
          <p className="letter-greeting">My Dearest Anushka,</p>
          <div className="letter-body" id="letterBody">
            <p id="typewriterText" style={{ whiteSpace: 'pre-wrap' }}>
              {displayed}
              {!done && <span className="typewriter-cursor"></span>}
            </p>
          </div>
          <div className="letter-signature">
            <p>With all my love, forever &amp; always,</p>
            <p className="letter-sign">— Swapnadip 💕</p>
          </div>
        </div>
        <button className="letter-replay-btn" id="replayLetter" onClick={replay}>
          <i className="fas fa-redo"></i> Read Again
        </button>
      </div>
    </section>
  )
}
