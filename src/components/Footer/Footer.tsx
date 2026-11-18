import { ArrowUp } from 'lucide-react';
import { useFitText } from '../../hooks/useFitText';
import Parallax from '../Parallax/Parallax';
import './Footer.css';

const LINKS = ['Home', 'About', 'Skills', 'Projects', 'Experience', 'Education', 'Contact'];

export default function Footer() {
  const bigRef = useFitText<HTMLParagraphElement>({ min: 20, max: 400 });

  const go = (id: string) =>
    document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: 'smooth' });

  return (
    <footer className="footer-section">
      <Parallax className="orb orb-violet orb-bl" speed={0.2} />
      <Parallax className="orb orb-cyan orb-tr" speed={-0.12} />

      <div className="footer-container">
        <p ref={bigRef} className="footer-big" aria-hidden="true">MARK AIRON CANTAL</p>

        <div className="footer-row">
          <nav className="footer-links" aria-label="Footer">
            {LINKS.map((l) => (
              <a
                key={l}
                href={`#${l.toLowerCase()}`}
                onClick={(e) => { e.preventDefault(); go(l); }}
              >
                {l}
              </a>
            ))}
          </nav>

          <button
            className="to-top"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            aria-label="Back to top"
          >
            Top <ArrowUp size={14} />
          </button>
        </div>

        <p className="footer-copy">
          &copy; {new Date().getFullYear()} Mark Airon Cantal. Designed &amp; built for the future.
        </p>
      </div>
    </footer>
  );
}