import { useState, useEffect, useRef, useCallback } from 'react'
import { useReveal } from '../hooks/useReveal'

const quotes = [
  { text: "Loving you was never about demanding your affection. It was simply about appreciating that you existed in my life.", author: "— An honest feeling" },
  { text: "Some people stay in your memory not because you forced them to, but because they left something genuine behind.", author: "— Quiet thoughts" },
  { text: "I may not know what the future holds, but I know that caring about you was one of the most real things I ever felt.", author: "— Acceptance" },
  { text: "Even if our conversations belong to the past, the gratitude I feel for having known you will always remain.", author: "— With sincerity" },
  { text: "I never wanted to complicate your world. I only wanted you to know that someone quietly wished the best for you.", author: "— Always" },
]

export default function QuotesCarousel() {
  const [current, setCurrent] = useState(0)
  const timerRef = useRef(null)
  const ref = useReveal()

  const resetTimer = useCallback(() => {
    clearInterval(timerRef.current)
    timerRef.current = setInterval(() => setCurrent(c => (c + 1) % quotes.length), 5000)
  }, [])

  useEffect(() => {
    resetTimer()
    return () => clearInterval(timerRef.current)
  }, [resetTimer])

  const goTo = useCallback(i => { setCurrent(i); resetTimer() }, [resetTimer])
  const prev  = useCallback(() => { setCurrent(c => (c - 1 + quotes.length) % quotes.length); resetTimer() }, [resetTimer])
  const next  = useCallback(() => { setCurrent(c => (c + 1) % quotes.length); resetTimer() }, [resetTimer])

  return (
    <section className="quotes-section" id="quotes" ref={ref}>
      <div className="section-header reveal">
        <p className="section-label"><i className="fas fa-quote-left"></i> Words of Love</p>
        <h2 className="section-title">Love Quotes For You</h2>
        <div className="title-ornament"><i className="fas fa-heart"></i></div>
      </div>
      <div className="quotes-carousel reveal">
        {quotes.map((q, i) => (
          <div key={i} className={`quote-card${i === current ? ' active' : ''}`} id={`quote-${i}`}>
            <i className="fas fa-quote-left quote-icon"></i>
            <p className="quote-text">{q.text}</p>
            <p className="quote-author">{q.author}</p>
          </div>
        ))}
        <div className="quotes-dots" id="quotesDots">
          {quotes.map((_, i) => (
            <span key={i} className={`dot${i === current ? ' active' : ''}`} onClick={() => goTo(i)}></span>
          ))}
        </div>
        <div className="quotes-nav">
          <button className="quote-nav-btn" onClick={prev}><i className="fas fa-chevron-left"></i></button>
          <button className="quote-nav-btn" onClick={next}><i className="fas fa-chevron-right"></i></button>
        </div>
      </div>
    </section>
  )
}
