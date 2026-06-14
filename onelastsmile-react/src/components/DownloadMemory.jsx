import { memo } from 'react'

export default memo(function DownloadMemory() {
  return (
    <section className="download-memory-section" style={{
      padding: '60px 20px',
      textAlign: 'center',
      background: 'transparent',
      position: 'relative',
      zIndex: 10
    }}>
      <div className="reveal" style={{
        background: 'var(--glass-bg)',
        border: '1px solid var(--glass-border)',
        borderRadius: '24px',
        padding: '40px 30px',
        maxWidth: '500px',
        margin: '0 auto',
        backdropFilter: 'blur(10px)'
      }}>
        <i className="fas fa-gift" style={{ fontSize: '2.5rem', color: 'var(--primary-color)', marginBottom: '20px' }}></i>
        <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.8rem', color: '#fff', marginBottom: '15px' }}>A Keepsake For You</h2>
        <p style={{ fontFamily: 'var(--font-serif)', fontSize: '1rem', color: 'var(--text-muted)', marginBottom: '30px', lineHeight: '1.6' }}>
          Some memories are too precious to leave behind in the digital void.
          <br/>
          I saved a piece of this story just for you. Keep it safe, as a reminder of what this meant.
        </p>
        <a 
          href="/OneLastSmile-memory.html" 
          download="OneLastSmile-memory.html"
          className="btn-primary"
          style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', textDecoration: 'none' }}
        >
          <i className="fas fa-download"></i>
          Download This Memory
        </a>
      </div>
    </section>
  )
})
