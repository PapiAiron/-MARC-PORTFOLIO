import { useEffect, useRef, useState } from 'react';
import { ArrowDownRight, Download } from 'lucide-react';
import './Hero.css';
import { useMagnetic } from '../../hooks/useMagnetic';
import { useFitText } from '../../hooks/useFitText';
import { useParallax } from '../../hooks/useParallax';
import Parallax from '../Parallax/Parallax';

const ROLES = [
  'Full-Stack Developer',
  'Shopify Developer',
  'Data Analyst',
  'AI Automation Engineer',
  'UI/UX Designer',
  'QA Tester',
];

const MARQUEE = [
  'FULL-STACK DEVELOPER',
  'SHOPIFY + LIQUID',
  'DATA SCIENCE',
  'AI AUTOMATION',
  'UI / UX DESIGN',
];

export default function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [text, setText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [roleIdx, setRoleIdx] = useState(0);

  const primaryBtnRef = useMagnetic<HTMLAnchorElement>(0.3);
const secondaryBtnRef = useMagnetic<HTMLAnchorElement>(0.3);

const nameRef = useFitText<HTMLHeadingElement>({ min: 28, max: 150 });
const textRef = useParallax<HTMLDivElement>(0.1);
const visualRef = useParallax<HTMLDivElement>(0.24);

// 3D tilt on the profile picture
const tiltRef = useRef<HTMLDivElement>(null);
const onTilt = (e: React.MouseEvent<HTMLDivElement>) => {
  const el = tiltRef.current;
  if (!el) return;
  const r = el.getBoundingClientRect();
  const x = (e.clientX - r.left) / r.width - 0.5;
  const y = (e.clientY - r.top) / r.height - 0.5;
  el.style.setProperty('--ry', `${(x * 16).toFixed(1)}deg`);
  el.style.setProperty('--rx', `${(-y * 16).toFixed(1)}deg`);
};
const resetTilt = () => {
  tiltRef.current?.style.setProperty('--rx', '0deg');
  tiltRef.current?.style.setProperty('--ry', '0deg');
};
  // Typewriter
  useEffect(() => {
    const full = ROLES[roleIdx];
    let delay = isDeleting ? 35 : 85;
    if (!isDeleting && text === full) delay = 1800;
    else if (isDeleting && text === '') delay = 400;

    const t = setTimeout(() => {
      if (!isDeleting && text === full) setIsDeleting(true);
      else if (isDeleting && text === '') {
        setIsDeleting(false);
        setRoleIdx((i) => (i + 1) % ROLES.length);
      } else {
        setText(full.slice(0, text.length + (isDeleting ? -1 : 1)));
      }
    }, delay);
    return () => clearTimeout(t);
  }, [text, isDeleting, roleIdx]);

  // Constellation particle canvas (pauses when off-screen)
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const COLORS = ['0,255,231', '255,0,170', '255,230,0'];
    type P = { x: number; y: number; vx: number; vy: number; r: number; c: string };
    let particles: P[] = [];
    let w = 0;
    let h = 0;
    let raf = 0;
    let running = false;

    const init = () => {
      const parent = canvas.parentElement;
      w = parent ? parent.offsetWidth : window.innerWidth;
      h = parent ? parent.offsetHeight : window.innerHeight;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const count = w < 480 ? 28 : w < 900 ? 45 : 70;
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
        r: Math.random() * 1.6 + 0.4,
        c: COLORS[Math.floor(Math.random() * COLORS.length)],
      }));
    };

    const LINK = 120;
    const frame = () => {
      ctx.clearRect(0, 0, w, h);
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > w) p.vx *= -1;
        if (p.y < 0 || p.y > h) p.vy *= -1;

        ctx.fillStyle = `rgba(${p.c},0.8)`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();

        for (let j = i + 1; j < particles.length; j++) {
          const q = particles[j];
          const dx = p.x - q.x;
          const dy = p.y - q.y;
          const d = Math.hypot(dx, dy);
          if (d < LINK) {
            ctx.strokeStyle = `rgba(0,255,231,${(1 - d / LINK) * 0.16})`;
            ctx.lineWidth = 0.6;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(q.x, q.y);
            ctx.stroke();
          }
        }
      }
      raf = requestAnimationFrame(frame);
    };

    const start = () => { if (!running) { running = true; raf = requestAnimationFrame(frame); } };
    const stop = () => { running = false; cancelAnimationFrame(raf); };

    init();
    const io = new IntersectionObserver(([e]) => (e.isIntersecting ? start() : stop()));
    io.observe(canvas);

    let resizeT: number;
    const onResize = () => { clearTimeout(resizeT); resizeT = window.setTimeout(init, 150); };
    window.addEventListener('resize', onResize);

    return () => {
      stop();
      io.disconnect();
      clearTimeout(resizeT);
      window.removeEventListener('resize', onResize);
    };
  }, []);

    return (
    <section id="home" className="hero-section">
      <canvas ref={canvasRef} className="hero-canvas" aria-hidden="true" />

      <Parallax className="orb orb-cyan orb-tr" speed={-0.18} />
      <Parallax className="orb orb-magenta orb-bl" speed={0.3} />
      <Parallax className="orb orb-violet hero-orb-mid" speed={0.12} />

      <div className="hero-content section-container">
        <div ref={textRef} className="hero-text">
          <p className="status-pill">
            <span className="dot" />
            Available for Shopify freelance work
          </p>

          <h1 ref={nameRef} className="glitch-name" aria-label="Mark Airon Cantal">
            <span className="name-line" data-text="MARK AIRON" aria-hidden="true">MARK AIRON</span>
            <span className="name-line grad" data-text="CANTAL" aria-hidden="true">CANTAL</span>
          </h1>

          <h2 className="typewriter-container">
            <span className="prompt">&gt;</span> <span>{text}</span>
            <span className="cursor">_</span>
          </h2>

          <p className="hero-sub">
            I build full-stack systems, Shopify storefronts and AI-driven workflows —
            clean on the surface, solid underneath.
          </p>

          <div className="cta-container">
            <a ref={primaryBtnRef} href="#projects" className="btn btn-primary">
              View projects <ArrowDownRight size={18} />
            </a>
            <a
              ref={secondaryBtnRef}
              href="/files/cv.pdf"
              download="Mark_Airon_Cantal_CV.pdf"
              className="btn btn-ghost"
            >
              Download CV <Download size={16} />
            </a>
          </div>
        </div>

        <div
          ref={visualRef}
          className="hero-visuals"
          onMouseMove={onTilt}
          onMouseLeave={resetTilt}
        >
          <div ref={tiltRef} className="profile-wrapper">
            <div className="ring ring-pulse" />
            <div className="ring ring-dash" />
            <div className="image-container">
              <img src="/images/gradpic.jpg" alt="Mark Airon Cantal" className="profile-img" />
              <div className="img-overlay" />
            </div>
          </div>
        </div>
      </div>

      <div className="hero-marquee" aria-hidden="true">
        <div className="marquee-track">
          {[0, 1].map((g) => (
            <div className="marquee-group" key={g}>
              {MARQUEE.map((label) => (
                <span key={`${g}-${label}`}>
                  {label}
                  <i>✦</i>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      <div className="scroll-cue" aria-hidden="true">
        <span>SCROLL</span>
        <span className="line" />
      </div>
    </section>
  );
}
