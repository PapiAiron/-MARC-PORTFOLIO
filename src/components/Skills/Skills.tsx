import { useEffect, useRef, type CSSProperties } from 'react';
import { useReveal } from '../../hooks/useReveal';
import SectionHeading from '../SectionHeading/SectionHeading';
import './Skills.css';
import Parallax from '../Parallax/Parallax';

import {
  SiPython, SiSharp, SiDotnet, SiOpenjdk, SiHtml5, SiCss, SiJavascript,
  SiReact, SiTypescript, SiVite, SiMysql, SiFirebase, SiFigma, SiShopify,
} from 'react-icons/si';
import {
  Workflow, Cog, PenTool, Sparkles, Droplets, LayoutTemplate, ShoppingBag, Search,
  Smartphone, type LucideIcon,
} from 'lucide-react';
import type { IconType } from 'react-icons';

type AnyIcon = IconType | LucideIcon;

// Brand icons where one exists; generic lucide icons for concepts.
const skillIconMap: Record<string, AnyIcon> = {
  Python: SiPython,
  'C#': SiSharp,
  '.NET': SiDotnet,
  Java: SiOpenjdk,
  HTML: SiHtml5,
  CSS: SiCss,
  JavaScript: SiJavascript,
  React: SiReact,
  TypeScript: SiTypescript,
  Vite: SiVite,
  SQL: SiMysql,
  MySQL: SiMysql,
  Firebase: SiFirebase,
  Figma: SiFigma,
  Shopify: SiShopify,
  Liquid: Droplets,
  'Theme Customization': LayoutTemplate,
  'Product Pages': ShoppingBag,
  'On-page SEO': Search,
  'Responsive Design': Smartphone,
  'UI/UX Design': PenTool,
  Gumloop: Sparkles,
  'Workflow Automation': Workflow,
  'Process Optimization': Cog,
};

const skillCategories = [
  { title: 'Shopify & E-commerce', accent: '#95bf47', skills: ['Shopify', 'Liquid', 'Theme Customization', 'Product Pages', 'On-page SEO', 'Responsive Design'] },
  { title: 'Web Development', accent: '#00ffe7', skills: ['HTML', 'CSS', 'JavaScript', 'React', 'TypeScript', 'Vite'] },
  { title: 'Software Development', accent: '#ff8a3d', skills: ['Python', 'C#', '.NET', 'Java'] },
  { title: 'AI & Automation', accent: '#a78bfa', skills: ['Gumloop', 'Workflow Automation', 'Process Optimization'] },
  { title: 'Data & Design', accent: '#ff00aa', skills: ['SQL', 'MySQL', 'Firebase', 'Figma', 'UI/UX Design'] },
];

const TOOLS = ['Shopify', 'React', 'TypeScript', 'JavaScript', 'Python', 'Firebase', 'Figma', 'Vite', 'Java', '.NET'];

const d = (n: number) => ({ '--i': n } as CSSProperties);

export default function Skills() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const listRef = useReveal<HTMLDivElement>(0.1);

  // Faint matrix rain — kept as a signature, but subtle and paused off-screen
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789$+-*/=%#&_(){}<>[]^~'.split('');
    const fontSize = 16;
    let drops: number[] = [];
    let raf = 0;
    let running = false;
    let last = 0;
    const interval = 1000 / 24;

    const init = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      canvas.width = parent.offsetWidth;
      canvas.height = parent.offsetHeight;
      drops = Array.from({ length: Math.ceil(canvas.width / fontSize) }, () => 1);
    };

    const draw = (t: number) => {
      raf = requestAnimationFrame(draw);
      if (t - last < interval) return;
      last = t;

      ctx.fillStyle = 'rgba(10, 10, 15, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = '#00ffe7';
      ctx.font = `${fontSize}px "Share Tech Mono", monospace`;

      for (let i = 0; i < drops.length; i++) {
        const ch = letters[Math.floor(Math.random() * letters.length)];
        ctx.fillText(ch, i * fontSize, drops[i] * fontSize);
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) drops[i] = 0;
        drops[i]++;
      }
    };

    const start = () => { if (!running) { running = true; raf = requestAnimationFrame(draw); } };
    const stop = () => { running = false; cancelAnimationFrame(raf); };

    init();
    const io = new IntersectionObserver(([e]) => (e.isIntersecting ? start() : stop()));
    io.observe(canvas);
    window.addEventListener('resize', init);

    return () => {
      stop();
      io.disconnect();
      window.removeEventListener('resize', init);
    };
  }, []);

  return (
    <section id="skills" className="skills-section site-section">
      <Parallax className="wm wm-right" axis="x" speed={-0.22}>SKILLS</Parallax>
      <Parallax className="orb orb-blue orb-tl" speed={0.2} />
      <Parallax className="orb orb-magenta orb-br" speed={-0.15} />
      <canvas ref={canvasRef} className="matrix-canvas" aria-hidden="true" />

      <div className="section-container skills-content">
        <SectionHeading
          index="02"
          label="Skills"
          title={<>The stack behind <em>the work.</em></>}
          lead="From React and Firebase apps to Shopify Liquid storefronts and AI automations."
        />

        <div ref={listRef} className="skills-list">
          {skillCategories.map((cat, idx) => (
            <div key={cat.title} className="skill-row rv" style={{ ...d(idx), '--accent': cat.accent } as CSSProperties}>
              <h3 className="skill-cat">
                <span className="skill-cat-num">0{idx + 1}</span>
                {cat.title}
              </h3>
              <div className="skill-badges">
                {cat.skills.map((skill) => {
                  const Icon = skillIconMap[skill];
                  return (
                    <span key={skill} className="chip skill-badge">
                      {Icon && <Icon className="skill-badge-icon" aria-hidden="true" />}
                      {skill}
                    </span>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="tools-marquee" aria-hidden="true">
        <div className="tools-track">
          {[0, 1].map((g) => (
            <div className="tools-group" key={g}>
              {TOOLS.map((name) => {
                const Icon = skillIconMap[name];
                return (
                  <span key={`${g}-${name}`}>
                    {Icon && <Icon />}
                    {name}
                  </span>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}