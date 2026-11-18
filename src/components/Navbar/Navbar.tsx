import { useEffect, useState } from 'react';
import './Navbar.css';

const LINKS = ['Home', 'About', 'Skills', 'Projects', 'Experience', 'Education', 'Contact'];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Active link via IntersectionObserver (cheaper than measuring on every scroll)
  useEffect(() => {
    const els = LINKS.map((l) => document.getElementById(l.toLowerCase())).filter(
      Boolean
    ) as HTMLElement[];
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActiveSection(e.target.id)),
      { rootMargin: '-45% 0px -50% 0px' }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  // Lock body scroll + close on Escape while the mobile menu is open
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setIsOpen(false);
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [isOpen]);

  const go = (link: string) => {
    setIsOpen(false);
    document.getElementById(link.toLowerCase())?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''} ${isOpen ? 'menu-open' : ''}`}>
      <div className="nav-container">
        <button className="nav-logo" onClick={() => go('home')} aria-label="Back to top">
          <span className="logo-brace">&lt;</span>
          <span className="logo-text"> MARK </span>
          <span className="logo-brace">/&gt;</span>
        </button>

        <button
          className={`hamburger ${isOpen ? 'active' : ''}`}
          onClick={() => setIsOpen((o) => !o)}
          aria-label="Toggle menu"
          aria-expanded={isOpen}
        >
          <span />
          <span />
        </button>

        <ul className={`nav-links ${isOpen ? 'active' : ''}`}>
          {LINKS.map((link, i) => (
            <li key={link} style={{ ['--i' as string]: i }}>
              <button
                onClick={() => go(link)}
                className={activeSection === link.toLowerCase() ? 'active' : ''}
              >
                <span className="nav-num">0{i + 1}</span>
                {link}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}