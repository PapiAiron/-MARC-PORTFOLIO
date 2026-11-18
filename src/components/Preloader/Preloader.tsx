import { useEffect, useState } from 'react';
import './Preloader.css';

interface PreloaderProps {
  onComplete: () => void;
}

export default function Preloader({ onComplete }: PreloaderProps) {
  const [progress, setProgress] = useState(0);
  const [leaving, setLeaving] = useState(false);

  useEffect(() => {
    const id = setInterval(() => {
      setProgress((p) => Math.min(100, p + Math.floor(Math.random() * 9) + 4));
    }, 120);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    if (progress < 100) return;
    const t1 = setTimeout(() => setLeaving(true), 350);
    const t2 = setTimeout(() => onComplete(), 1100);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [progress, onComplete]);

  return (
    <div className={`preloader ${leaving ? 'leaving' : ''}`} role="status" aria-label="Loading">
      <div className="scanner-line" />
      <div className="pre-top">
        <span>&lt; MARK_AIRON /&gt;</span>
        <span>PORTFOLIO_2026</span>
      </div>
      <div className="pre-bottom">
        <p className="pre-label">INITIALIZING SYSTEM</p>
        <p className="pre-count">{String(progress).padStart(3, '0')}</p>
      </div>
      <div className="pre-bar">
        <div className="pre-bar-fill" style={{ transform: `scaleX(${progress / 100})` }} />
      </div>
    </div>
  );
}