import { useEffect, useRef } from 'react';
import './CursorTrail.css';

export default function CursorTrail() {
  const ringRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // No cursor on touch devices
    if (window.matchMedia('(hover: none), (pointer: coarse)').matches) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const ring = ringRef.current;
    const dot = dotRef.current;
    if (!ring || !dot) return;

    let mx = -100, my = -100, rx = -100, ry = -100;
    let raf = 0;

    const onMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
      dot.style.transform = `translate(${mx}px, ${my}px)`;
      ring.classList.add('visible');
      dot.classList.add('visible');
    };
    const onLeave = () => {
      ring.classList.remove('visible');
      dot.classList.remove('visible');
    };
    const onOver = (e: MouseEvent) => {
      const hit = (e.target as HTMLElement).closest('a, button, [role="tab"], input, textarea, label');
      ring.classList.toggle('hover', !!hit);
    };

    const tick = () => {
      rx += (mx - rx) * 0.16;
      ry += (my - ry) * 0.16;
      ring.style.transform = `translate(${rx}px, ${ry}px)`;
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    window.addEventListener('mousemove', onMove, { passive: true });
    window.addEventListener('mouseover', onOver, { passive: true });
    document.addEventListener('mouseleave', onLeave);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseover', onOver);
      document.removeEventListener('mouseleave', onLeave);
    };
  }, []);

  return (
    <>
      <div ref={ringRef} className="cursor-ring" aria-hidden="true"><span /></div>
      <div ref={dotRef} className="cursor-dot" aria-hidden="true"><span /></div>
    </>
  );
}