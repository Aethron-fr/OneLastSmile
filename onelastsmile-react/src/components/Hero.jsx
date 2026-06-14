import { memo } from 'react'

export default memo(function Hero() {
  return (
    <section className="hero" id="home">
      <div className="hero-overlay"></div>
      <div className="hero-content fade-in-up" style={{
        background: 'rgba(255, 255, 255, 0.03)',
        backdropFilter: 'blur(10px)',
        border: '1px solid rgba(255, 255, 255, 0.05)',
        padding: '50px 30px',
        borderRadius: '30px',
        boxShadow: '0 20px 50px rgba(0,0,0,0.5), inset 0 0 0 1px rgba(255,255,255,0.05)',
        maxWidth: '800px',
        margin: '0 auto',
        position: 'relative',
        zIndex: 2,
        animationDelay: '0.2s'
      }}>
        <div style={{ position: 'absolute', top: '-1px', left: '10%', right: '10%', height: '1px', background: 'linear-gradient(90deg, transparent, rgba(255, 77, 133, 0.8), transparent)' }}></div>
        <p className="hero-subtitle fade-in-up" style={{ animationDelay: '0.4s', color: 'var(--primary-color)', letterSpacing: '3px', fontSize: '0.9rem', textTransform: 'uppercase' }}>
          <i className="fas fa-music" style={{ opacity: 0.7 }}></i>&nbsp; A Song From My Heart To Yours&nbsp; <i className="fas fa-music" style={{ opacity: 0.7 }}></i>
        </p>
        <h1 className="hero-name fade-in-up" style={{ 
          animationDelay: '0.6s', 
          textShadow: '0 0 40px rgba(255, 77, 133, 0.6), 0 0 80px rgba(162, 57, 202, 0.4)',
          marginBottom: '30px',
          fontSize: 'clamp(4rem, 10vw, 7rem)'
        }}>Anushka</h1>
        <p className="hero-tagline fade-in-up" style={{ animationDelay: '0.8s', fontSize: '1.2rem', lineHeight: '1.8', opacity: 0.9 }}>
          I never asked you to love me.<br/>
          I only wished to stay somewhere in your world.<br/>
          This is just what I felt, honestly and quietly.
        </p>
        <div className="hero-from fade-in-up" style={{ animationDelay: '1.0s', marginTop: '25px' }}>
          <span style={{ fontStyle: 'italic', color: 'rgba(255,255,255,0.5)', fontSize: '1rem' }}>— Written patiently from my heart, Swapnadip</span>
        </div>
        <div className="hero-buttons fade-in-up" style={{ animationDelay: '1.2s', marginTop: '40px', gap: '20px' }}>
          <a href="#propose" className="btn-primary" style={{ boxShadow: '0 10px 30px rgba(255, 77, 133, 0.3)' }}>
            <i className="fas fa-envelope"></i>&nbsp; A Message For You
          </a>
          <a href="#about" className="btn-secondary" style={{ background: 'rgba(255,255,255,0.05)' }}>
            <i className="fas fa-heart"></i>&nbsp; Explore
          </a>
        </div>
      </div>
      <div className="scroll-indicator">
        <div className="scroll-mouse"><div className="scroll-wheel"></div></div>
        <p>Scroll Down</p>
      </div>
    </section>
  )
})
