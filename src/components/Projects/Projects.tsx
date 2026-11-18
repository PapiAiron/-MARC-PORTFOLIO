import { useState, type CSSProperties, type MouseEvent } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { useReveal } from '../../hooks/useReveal';
import SectionHeading from '../SectionHeading/SectionHeading';
import './Projects.css';
import Parallax from '../Parallax/Parallax';

type Category = 'Web Apps' | 'Shopify' | 'AI';

interface Project {
  title: string;
  subtitle: string;
  category: Category;
  tech: string[];
  description: string;
  link: string;
  image: string; // drop screenshots (~1200x800) into /public/images/projects/
}

const projects: Project[] = [
  {
    title: 'Ad to Cart',
    subtitle: 'Digital Products & eBook Store',
    category: 'Shopify',
    tech: ['Shopify', 'Liquid', 'HTML/CSS', 'SEO'],
    description:
      'Shopify store for affordable educational eBooks and curated bundles on Digital Marketing, Advertising and Trading — with clear categories, essential policy pages and instant-access messaging.',
    link: 'https://www.adtocart.pro/',
    image: '/images/projects/adtocart.png',
  },
  {
    title: "Rich People's Closet",
    subtitle: 'Luxury Consignment Store',
    category: 'Shopify',
    tech: ['Shopify', 'Liquid', 'HTML/CSS', 'SEO'],
    description:
      'Minimalist editorial storefront for designer consignment: custom homepage sections, collection layouts, responsive product presentation and sold-item indicators on product cards.',
    link: 'https://richpeoplescloset.com/',
    image: '/images/projects/rpc.png',
  },
  {
    title: 'TALA.Sys',
    subtitle: 'TechFactorsInc Ops System',
    category: 'Web Apps',
    tech: ['React/Vite', 'TypeScript', 'Firebase'],
    description:
      'Internal operations system managing equipment deployments, inspections, inventory logistics and user control. Hardened architecture for seamless enterprise ops.',
    link: 'https://techfactorsincequipmentmanagementsystem.onrender.com/',
    image: '/images/projects/tashohoho.png',
  },
  {
    title: '3N8Analytics',
    subtitle: 'Supply Chain Forecasting',
    category: 'Web Apps',
    tech: ['React/Vite', 'JavaScript', 'Firebase'],
    description:
      'Causal forecasting & simulation engine for beverage supply chains. Predicts demand to optimize inventory management for Pepsi distribution nodes.',
    link: 'https://www.3n8analytics.site/',
    image: '/images/projects/3n8sh.png',
  },
  {
    title: 'Botani-Snap AI',
    subtitle: 'Plant Identification System',
    category: 'AI',
    tech: ['React', 'Python', 'Firebase', 'AI Models'],
    description:
      'Visual AI recognition system: use the camera or upload a photo to classify plant species and get curated care instructions in real time.',
    link: 'https://github.com/thebadsektor/tc3202-3b-4',
    image: '/images/projects/bota.jpg',
  },
];

const FILTERS: ('All' | Category)[] = ['All', 'Web Apps', 'Shopify', 'AI'];

const d = (n: number) => ({ '--i': n } as CSSProperties);

const ACCENT: Record<Category, string> = {
  'Web Apps': '#00ffe7',
  Shopify: '#95bf47',
  AI: '#a78bfa',
};

export default function Projects() {
  const [filter, setFilter] = useState<'All' | Category>('All');
  const gridRef = useReveal<HTMLDivElement>(0.05);

  const visible = filter === 'All' ? projects : projects.filter((p) => p.category === filter);

  // Cursor spotlight
  const handleMove = (e: MouseEvent<HTMLAnchorElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty('--mx', `${e.clientX - r.left}px`);
    e.currentTarget.style.setProperty('--my', `${e.clientY - r.top}px`);
  };

  return (
    <section id="projects" className="projects-section site-section">
      <Parallax className="wm wm-left" axis="x" speed={0.18}>WORK</Parallax>
      <Parallax className="orb orb-green orb-bl" speed={0.22} />
      <Parallax className="orb orb-cyan orb-tr" speed={-0.12} />
      <div className="section-container">
        <SectionHeading
          index="03"
          label="Projects"
          title={<>Selected <em>work.</em></>}
          lead="Web apps, AI tools and Shopify storefronts — shipped and live."
        />

        <div className="proj-filters" role="tablist" aria-label="Filter projects">
          {FILTERS.map((f) => (
            <button
              key={f}
              role="tab"
              aria-selected={filter === f}
              className={`proj-filter ${filter === f ? 'active' : ''}`}
              onClick={() => setFilter(f)}
            >
              {f}
            </button>
          ))}
        </div>

        <div ref={gridRef} className="projects-grid">
          {visible.map((proj, idx) => (
            <a
              key={`${filter}-${proj.title}`}
              href={proj.link}
              target="_blank"
              rel="noopener noreferrer"
              className="proj-card"
              style={{ ...d(idx), '--accent': ACCENT[proj.category] } as CSSProperties}
              onMouseMove={handleMove}
              aria-label={`Open ${proj.title}`}
            >
              <div className="proj-thumb">
                <img
                  src={proj.image}
                  alt={`${proj.title} preview`}
                  loading="lazy"
                  onError={(e) => e.currentTarget.parentElement?.classList.add('no-image')}
                />
                <span className="proj-cat">{proj.category}</span>
              </div>

              <div className="proj-body">
                <div className="proj-head">
                  <div>
                    <span className="proj-num">{String(idx + 1).padStart(2, '0')}</span>
                    <h3>{proj.title}</h3>
                    <p className="proj-subtitle">{proj.subtitle}</p>
                  </div>
                  <span className="proj-arrow"><ArrowUpRight size={20} /></span>
                </div>

                <p className="proj-desc">{proj.description}</p>

                <div className="proj-tech">
                  {proj.tech.map((t) => (
                    <span key={t} className="chip">{t}</span>
                  ))}
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}