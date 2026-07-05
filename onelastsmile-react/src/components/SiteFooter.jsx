import { memo, useState, useEffect } from 'react'
import SecretLetter from './SecretLetter'

function getDaysSince() {
  const start = new Date('2025-01-03T00:00:00') // 3 January
  const now   = new Date()
  const diff  = Math.floor((now - start) / (1000 * 60 * 60 * 24))
  return diff
}

export default memo(function SiteFooter() {
  const [days, setDays] = useState(getDaysSince())

  useEffect(() => {
    const t = setInterval(() => setDays(getDaysSince()), 60000)
    return () => clearInterval(t)
  }, [])

  return (
    <footer className="footer">

      {/* Date Counter */}
      <div className="footer-counter">
        <span className="footer-counter-number">{days}</span>
        <span className="footer-counter-label">days since 3rd January</span>
      </div>

      <div className="footer-hearts">
        <i className="fas fa-leaf"></i>
        <i className="fas fa-dove"></i>
        <i className="fas fa-leaf"></i>
      </div>

      <p className="footer-text">
        Made with quiet devotion by <strong>Swapnadip Ghosh</strong> for <strong>Anushka</strong>
      </p>

      {/* Secret trigger embedded naturally in the quote */}
      <p className="footer-sub">
        If <SecretLetter /> is true, no effort ever goes to waste.
      </p>

      <p className="footer-hint">hold the word above for a secret</p>

      <p className="footer-copy">Silent Memories — 2026</p>
    </footer>
  )
})
