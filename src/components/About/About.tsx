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
              Hi, I'm <strong>Mark Airon</strong> — a Computer Science student majoring in Data
              Science at Laguna University. I build full-stack systems, automate workflows with AI,
              and design interfaces that feel like the future.
            </p>
            <p className="bio-text rv" style={d(1)}>
              Lately I've also been working as a freelance <strong>Shopify developer</strong>,
              customizing storefronts with Liquid, HTML, CSS and JavaScript so brands look sharp,
              load clean and are easy to shop and find.
            </p>
            <p className="bio-text rv" style={d(2)}>
              My focus is bridging performant structure with immersive aesthetics — experiences that
              function flawlessly and leave a lasting impression.
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