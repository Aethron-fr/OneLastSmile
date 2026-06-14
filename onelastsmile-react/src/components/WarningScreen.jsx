import { useState, useEffect } from 'react'

export default function WarningScreen({ onContinue }) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    // slight delay to allow transition from birthday flow
    const t = setTimeout(() => setVisible(true), 380)
    return () => clearTimeout(t)
  }, [])

  const handleContinue = () => {
    setVisible(false)
    setTimeout(() => {
      onContinue()
    }, 600)
  }

  return (
    <div id="warningScreen" className={visible ? 'warning-visible' : ''} style={{ display: 'flex' }}>
      <div className="warning-content">
        <p className="warning-pre">Before you go further&hellip;</p>
        <div className="warning-body">
          <p>This isn&rsquo;t just a page.</p>
          <p>It&rsquo;s something that was written once&hellip;<br/>and meant to be felt once.</p>
          <p>So if you choose to continue,<br/>read it slowly.</p>
        </div>
        <p className="warning-soft">Some things don&rsquo;t come back twice.</p>
        <button className="warning-btn" onClick={handleContinue} style={{ touchAction: 'manipulation' }}>I Understand &rarr;</button>
      </div>
    </div>
  )
}
