import { useState, useEffect } from 'react'

export default function LockScreen() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 380)
    return () => clearTimeout(t)
  }, [])

  return (
    <div id="lockScreen" className={visible ? 'lock-visible' : ''} style={{ display: 'flex' }}>
      <div className="lock-content">
        <p className="lock-line lock-line-1">You&rsquo;ve already seen it once.</p>
        <p className="lock-line lock-line-2">Some things are meant to stay like that.</p>
      </div>
    </div>
  )
}
