import { memo } from 'react'
import { useReveal } from '../hooks/useReveal'

const events = [
  {
    side: 'left', icon: 'fa-star', date: '2022 — Class 9',
    title: 'The Day I Noticed You — And Never Really Forgot',
    body: "I first saw you standing in front of Ayan sir's batch. It was just a normal day for everyone else, but something quietly stayed in my memory. It wasn't love immediately—just a quiet feeling that simply remained with me.",
  },
  {
    side: 'right', icon: 'fa-comments', date: '2023 — After Class 10 Results',
    title: 'When Conversations Became Part of My Everyday Life',
    body: "We started talking more after the Class 10 results. The conversations slowly became longer, and talking to you just became a normal part of my days. Without me even realizing it, you became a comforting part of my daily routine.",
  },
  {
    side: 'left', icon: 'fa-heart-broken', date: 'Confession Period',
    title: 'The Day I Finally Said What I Was Afraid To Say',
    body: "I gathered the courage to tell you how I felt. It wasn't done perfectly, but it was honest. Unfortunately, misunderstandings happened, and a quiet distance slowly began to grow between us after that.",
  },
  {
    side: 'right', icon: 'fa-utensils', date: 'An Evening in Memory',
    title: 'When Distance Began to Settle In',
    body: "I remember an evening seeing you with everyone else, and for the first time, I felt the quiet reality of how far apart we had grown. It wasn't about anger or resentment—it was just a heavy realization that things were no longer the same.",
  },
  {
    side: 'left', icon: 'fa-calendar-alt', date: 'Passing Days',
    title: 'The Routine of Quiet Care',
    body: "Even as conversations faded, you remained a constant in my thoughts. Simply seeing you on ordinary days was enough to remind me how much I genuinely cared, even without words between us.",
  },
  {
    side: 'right', icon: 'fa-heart', date: 'The Realization',
    title: 'Acceptance and Letting Go',
    body: "Over time, I came to accept that caring for someone doesn't mean life will work out the way you hoped. You have your own feelings, your own life, and your own choices. I love you, Anushka—and learning to step back without resentment was the most honest way I could honor what I felt.",
  },
]

export default memo(function Timeline() {
  const ref = useReveal()

  return (
    <section className="timeline-section" id="timeline" ref={ref}>
      <div className="section-header reveal">
        <p className="section-label"><i className="fas fa-infinity"></i> Our Journey</p>
        <h2 className="section-title">Our Story</h2>
        <div className="title-ornament"><i className="fas fa-heart"></i></div>
      </div>
      <div className="timeline">
        {events.map((ev, i) => (
          <div key={i} className={`timeline-item ${ev.side} reveal`}>
            <div className="timeline-dot"><i className={`fas ${ev.icon}`}></i></div>
            <div className="timeline-content">
              <span className="timeline-date">
                <i className="fas fa-calendar-heart"></i> {ev.date}
              </span>
              <h4>{ev.title}</h4>
              {ev.body ? <p>{ev.body}</p> : null}
              {ev.extra?.map((line, j) => {
                if (typeof line === 'string') return <p key={j} style={{ marginTop: '10px' }}>{line}</p>
                if (line.italic) return <p key={j} style={{ marginTop: '10px', fontStyle: 'italic' }}>{line.italic}</p>
                if (line.bold)   return <p key={j} style={{ marginTop: '10px', fontWeight: 'bold' }}>{line.bold}</p>
                return null
              })}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
})
