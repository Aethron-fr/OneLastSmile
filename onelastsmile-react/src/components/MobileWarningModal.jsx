import { useState, useEffect } from 'react';

export default function MobileWarningModal() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (!sessionStorage.getItem('mobileWarningDismissed')) {
      const timer = setTimeout(() => {
        setShow(true);
      }, 100);
      return () => clearTimeout(timer);
    }
  }, []);

  const dismiss = () => {
    setShow(false);
    sessionStorage.setItem('mobileWarningDismissed', 'true');
  };

  if (!show) return null;

  return (
    <div className="mobile-warning-modal active" style={{ zIndex: 999999999 }}>
      <div className="mwm-content">
        <i className="fas fa-desktop mwm-icon"></i>
        <h2 className="mwm-title">For the Best Experience</h2>
        <p className="mwm-text">
          This experience was crafted with intricate details and cinematic effects that are <strong>best viewed on a desktop or laptop</strong>.
          <br /><br />
          You can still continue on mobile, but you might miss out on the full magic.
        </p>
        <button className="btn-primary mwm-btn" onClick={dismiss}>Continue Anyway</button>
      </div>
    </div>
  );
}
