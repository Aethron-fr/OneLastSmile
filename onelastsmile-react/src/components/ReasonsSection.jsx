import { memo } from 'react'
import { useReveal } from '../hooks/useReveal'

const reasons = [
  { icon:'fa-comments',    title:'The Conversations',      text:"The quiet talks we used to have where nothing felt rushed. Those simple, unscripted conversations always felt more genuine to me than anything else." },
  { icon:'fa-user',        title:'Your Presence',          text:"You didn't have to do anything grand. Simply knowing you were there or seeing you walk by quietly changed the whole atmosphere for me." },
  { icon:'fa-bookmark',    title:'The Little Memories',    text:"I still hold onto the smallest details—an unexpected smile, a familiar greeting, or words you said long ago that stayed in my mind." },
  { icon:'fa-heart',       title:'The Way You Made Me Feel', text:"Being around you brought a quiet comfort I rarely found anywhere else. Even on ordinary days, your presence gave me something to look forward to." },
  { icon:'fa-feather',     title:'The Person You Are',     text:"I never looked for an idealized version of you. I cared for the real person—your moods, your quietness, and everything that made you who you are." },
  { icon:'fa-clock',       title:'The Time We Shared',     text:"From school days to the conversations we had later, every chapter involving you became an important part of my story." },
]

export default memo(function ReasonsSection() {
  const ref = useReveal()

  return (
    <section className="reasons-section" id="reasons" ref={ref}>
      <div className="section-header reveal">
        <p className="section-label"><i className="fas fa-heart"></i> Silent Truths</p>
        <h2 className="section-title">Why I Love You</h2>
        <div className="title-ornament"><i className="fas fa-heart"></i></div>
      </div>
      <div className="reasons-grid">
        {reasons.map(r => (
          <div className="reason-card reveal" key={r.title}>
            <div className="reason-icon"><i className={`fas ${r.icon}`}></i></div>
            <h4>{r.title}</h4>
            <p>{r.text}</p>
          </div>
        ))}
      </div>
    </section>
  )
})
