import { useState, useEffect } from 'react'

export default function WarningScreen({ onContinue }) {
  const [visible, setVisible] = useState(false)
  const [step, setStep]       = useState(0) // 0 = intro, 1 = body, 2 = button

  useEffect(() => {
    const t0 = setTimeout(() => setVisible(true), 300)
    const t1 = setTimeout(() => setStep(1), 1200)
    const t2 = setTimeout(() => setStep(2), 2600)
    return () => { clearTimeout(t0); clearTimeout(t1); clearTimeout(t2) }
  }, [])

  const handleContinue = () => {
    setVisible(false)
    setTimeout(() => onContinue(), 700)
  }

  return (
    <div
      id="warningScreen"
      className={visible ? 'warning-visible' : ''}
      style={{ display: 'flex' }}
    >
      <div className="warning-content">

        {/* Brand mark */}
        <div className="warning-brand">
          <i className="fas fa-heart warning-brand-icon"></i>
          <span className="warning-brand-name">OneLastSmile</span>
        </div>

        {/* Headline */}
        <p className="warning-pre">This was made just for you.</p>

        {/* Body lines */}
        <div className={`warning-body warning-body-fade ${step >= 1 ? 'warning-body-visible' : ''}`}>
          <p>It&rsquo;s not just a website.</p>
          <p>It&rsquo;s everything I never said out loud,<br/>put into something you can actually see.</p>
          <p>
            You can only open this <strong>once.</strong><br/>
            Once you leave&hellip; it won&rsquo;t be the same.
          </p>
        </div>

        {/* Soft note */}
        <p className={`warning-soft warning-body-fade ${step >= 1 ? 'warning-body-visible' : ''}`}
           style={{ transitionDelay: '0.6s' }}>
          Some things only happen once. Read it slowly.
        </p>

        {/* CTA */}
        <div className={`warning-body-fade ${step >= 2 ? 'warning-body-visible' : ''}`}>
          <button
            className="warning-btn"
            onClick={handleContinue}
            style={{ touchAction: 'manipulation' }}
          >
            I&rsquo;m ready &rarr;
          </button>
        </div>

      </div>
    </div>
  )
}
