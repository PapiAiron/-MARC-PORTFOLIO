import { useEffect, useRef, type CSSProperties } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { useReveal } from '../../hooks/useReveal';
import SectionHeading from '../SectionHeading/SectionHeading';
import './Experience.css';
import Parallax from '../Parallax/Parallax';

interface Exp {
  title: string;
  company: string;
  period: string;
  current?: boolean;
  details: string[];
  links?: { label: string; href: string }[];
  images?: { src: string; alt?: string }[];
}

const expData: Exp[] = [
  {
    title: 'Freelance Shopify Developer',
    company: 'Self-Employed · Freelance · Remote',
    period: 'Sep 2026 – Present',
    current: true,
    details: [
      'Build and customize Shopify storefronts for different business models, including digital product stores and luxury consignment e-commerce.',
      'Customize themes, layouts, product displays, navigation and collection pages with Liquid, HTML, CSS and JavaScript to match each brand identity.',
      'Implement on-page SEO: product titles, meta descriptions, heading structure, image alt text and URL optimization.',
      'Organize products, collections and navigation to improve discovery, with responsive layouts for a consistent desktop and mobile experience.',
    ],
    links: [
      { label: 'Ad to Cart', href: 'https://www.adtocart.pro/' },
      { label: "Rich People's Closet", href: 'https://puanvs-gb.myshopify.com/' },
    ],
    images: [
      { src: '/images/projects/richp.png', alt: "Rich People's Closet storefront" },
      { src: '/images/projects/add.png', alt: 'Ad to Cart storefront' },
    ],
  },
  {
    title: 'On-the-Job Training',
    company: 'TechFactorsInc',
    period: 'Feb 2026 – Apr 2026',
    details: [
      'Spearheaded the development of TALA.Sys using React, Vite, TypeScript and Firebase.',
      'Executed robotics and Arduino-related hardware/software tasks.',
      'Performed rigorous system auditing, debugging and module testing to ensure enterprise readiness.',
    ],
    images: [{ src: '/images/experience/exp.jpg' }],
  },
  {
    title: 'SPES Program (2023 – 2025)',
    company: 'Victoria, Laguna Engineering Office',
    period: 'Summer Job Program',
    details: [
      'Provided front-office support and communication routing.',
      'Processed and digitized documentation for building permits and zoning applications.',
      'Ensured compliance with local engineering protocols through systematic filing.',
    ],
    images: [{ src: '/images/experience/engr.jpg' }],
  },
];

const d = (n: number) => ({ '--i': n } as CSSProperties);

export default function Experience() {
  const revealRef = useReveal<HTMLDivElement>(0.05);
  const lineRef = useRef<HTMLDivElement>(null);

  // Timeline line fills as you scroll through it
  useEffect(() => {
    const el = lineRef.current;
    if (!el) return;
    let raf = 0;
    const update = () => {
      const r = el.getBoundingClientRect();
      const p = Math.min(1, Math.max(0, (window.innerHeight * 0.65 - r.top) / r.height));
      el.style.setProperty('--progress', String(p));
      raf = 0;
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update); };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section id="experience" className="experience-section site-section">
      <Parallax className="wm wm-right" axis="x" speed={-0.2}>CAREER</Parallax>
      <Parallax className="orb orb-orange orb-tl" speed={0.2} />
      <Parallax className="orb orb-magenta orb-br" speed={-0.14} />
      <div className="section-container">
        <SectionHeading
          index="04"
          label="Experience"
          title={<>Where I've <em>built things.</em></>}
        />

        <div ref={lineRef} className="timeline">
          <div className="timeline-line" aria-hidden="true" />

          <div ref={revealRef}>
            {expData.map((exp, idx) => (
              <article key={exp.title} className="timeline-item rv" style={d(idx)}>
                <span className={`timeline-dot ${exp.current ? 'current' : ''}`} aria-hidden="true" />

                <div className="exp-header">
                  <h3>{exp.title}</h3>
                  <span className="exp-period">{exp.period}</span>
                </div>
                <h4 className="exp-company">{exp.company}</h4>

                <div className="exp-body">
                  {exp.images && exp.images.length > 0 && (
                    <div className="exp-thumbs">
                      {exp.images.map((img, i) => (
                        <div key={img.src} className="exp-thumb">
                          <img
                            src={img.src}
                            alt={img.alt ?? `${exp.company} — ${exp.title} (${i + 1})`}
                            loading="lazy"
                            onError={(e) => e.currentTarget.parentElement?.classList.add('no-image')}
                          />
                        </div>
                      ))}
                    </div>
                  )}
                  <div className="exp-main">
                    <ul className="exp-details">
                      {exp.details.map((detail) => (
                        <li key={detail}>{detail}</li>
                      ))}
                    </ul>
                    {exp.links && (
                      <div className="exp-links">
                        {exp.links.map((l) => (
                          <a
                            key={l.href}
                            href={l.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="chip exp-link"
                          >
                            {l.label} <ArrowUpRight size={14} />
                          </a>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}