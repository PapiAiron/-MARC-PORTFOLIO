import { useEffect, useRef, useState, type CSSProperties } from 'react';
import { useReveal } from '../../hooks/useReveal';
import SectionHeading from '../SectionHeading/SectionHeading';
import './About.css';
import Parallax from '../Parallax/Parallax';

const d = (n: number) => ({ '--i': n } as CSSProperties);

function CountUp({ to, suffix = '' }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [val, setVal] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setVal(to);
      return;
    }
    let raf = 0;
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return;
        io.disconnect();
        const start = performance.now();
        const dur = 1400;
        const tick = (now: number) => {
          const p = Math.min((now - start) / dur, 1);
          setVal(Math.round(to * (1 - Math.pow(1 - p, 3))));
          if (p < 1) raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);
      },
      { threshold: 0.6 }
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [to]);

  return <span ref={ref}>{val}{suffix}</span>;
}

const STATS: { value?: number; suffix?: string; text?: string; label: string }[] = [
  { value: 5, suffix: '+', label: 'Projects shipped' },
  { value: 2, label: 'Live Shopify stores' },
  { text: 'DS', label: 'Data Science major' },
];

export default function About() {
  const ref = useReveal<HTMLDivElement>();

  return (
    <section id="about" className="about-section site-section">
      <Parallax className="wm wm-left" axis="x" speed={0.22}>ABOUT</Parallax>
      <Parallax className="orb orb-violet orb-br" speed={0.25} />
      <Parallax className="orb orb-cyan orb-tl" speed={-0.12} />
      <div className="section-container">
        <SectionHeading
          index="01"
          label="About"
          title={<>Systems that work, <em>interfaces</em> that feel good.</>}
        />

        <div ref={ref} className="about-grid">
          <div className="about-bio">
            <p className="bio-text rv" style={d(0)}>
              Hi, I'm <strong>Mark Airon Cantal</strong> — a Computer Science graduate
              majoring in Data Science from Laguna University. I build web applications,
              develop full-stack systems, and explore AI-powered solutions that solve
              real-world problems.
            </p>
            <p className="bio-text rv" style={d(1)}>
              I also work as a freelance <strong>Shopify Developer</strong>, helping
              businesses build and improve their online stores through theme
              customization, custom Liquid development, responsive design, product
              listings, and e-commerce optimization.
            </p>
            <p className="bio-text rv" style={d(2)}>
              I bring together technical problem-solving, thoughtful design, and
              performance-focused development to create digital experiences that
              work seamlessly and deliver real value.
            </p>
          </div>

          <ul className="about-stats">
            {STATS.map((s, i) => (
              <li key={s.label} className="stat-row rv" style={d(i + 1)}>
                <span className="stat-number">
                  {s.value !== undefined ? <CountUp to={s.value} suffix={s.suffix} /> : s.text}
                </span>
                <span className="stat-label">{s.label}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}