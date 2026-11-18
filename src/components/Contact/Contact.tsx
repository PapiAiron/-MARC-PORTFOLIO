import { useRef, useState, type CSSProperties } from 'react';
import { Facebook, Instagram, Linkedin, Github, Mail, Phone, SendHorizontal } from 'lucide-react';
import { useReveal } from '../../hooks/useReveal';
import SectionHeading from '../SectionHeading/SectionHeading';
import './Contact.css';
import Parallax from '../Parallax/Parallax';

type Status = 'idle' | 'sending' | 'sent' | 'error';

const d = (n: number) => ({ '--i': n } as CSSProperties);

const SOCIALS = [
  { label: 'Facebook', href: 'https://www.facebook.com/INJOKERIN0/', Icon: Facebook },
  { label: 'Instagram', href: 'https://www.instagram.com/airon.404/', Icon: Instagram },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/mark-airon-cantal-4a063a32b/', Icon: Linkedin },
  { label: 'GitHub', href: 'https://github.com/PapiAiron', Icon: Github },
];

export default function Contact() {
  const revealRef = useReveal<HTMLDivElement>(0.1);
  const formRef = useRef<HTMLFormElement>(null);
  const mountedAt = useRef(Date.now());
  const [status, setStatus] = useState<Status>('idle');

  const fakeSuccess = () => {
    setStatus('sending');
    setTimeout(() => {
      setStatus('sent');
      formRef.current?.reset();
    }, 800);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formRef.current) return;
    const formData = new FormData(formRef.current);

    // Honeypot: real users never fill this
    if (formData.get('company')) return fakeSuccess();

    // Time-trap: faster than a human could type
    if (Date.now() - mountedAt.current < 2500) return fakeSuccess();

    setStatus('sending');
    try {
      const response = await fetch(formRef.current.action, {
        method: 'POST',
        body: formData,
        headers: { Accept: 'application/json' },
      });
      if (response.ok) {
        setStatus('sent');
        formRef.current.reset();
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  const sending = status === 'sending';

  return (
    <section id="contact" className="contact-section site-section">
      <Parallax className="wm wm-right" axis="x" speed={-0.2}>HELLO</Parallax>
      <Parallax className="orb orb-cyan orb-tl" speed={0.2} />
      <Parallax className="orb orb-magenta orb-br" speed={-0.14} />
      <div className="section-container">
        <SectionHeading
          index="06"
          label="Contact"
          title={<>Let's build something <em>sharp.</em></>}
          lead="Open to freelance Shopify projects, collaborations and full-stack work. Send a ping and I'll get back to you."
        />

        <div ref={revealRef} className="contact-grid">
          <div className="contact-info">
            <div className="direct-contact">
              <a className="contact-item rv" style={d(0)} href="mailto:cantal2227@gmail.com">
                <Mail className="contact-icon" size={20} />
                <span>cantal2227@gmail.com</span>
              </a>
              <a className="contact-item rv" style={d(1)} href="https://wa.me/639761386092">
                <Phone className="contact-icon" size={20} />
                <span>+63 976 138 6092</span>
              </a>
            </div>

            <div className="social-links rv" style={d(2)}>
              {SOCIALS.map(({ label, href, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-icon"
                  aria-label={label}
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          <form
            ref={formRef}
            className="contact-form rv"
            style={d(1)}
            action="https://formspree.io/f/xzdlpdjr"
            method="POST"
            onSubmit={handleSubmit}
          >
            {/* Honeypot */}
            <div className="honeypot-field" aria-hidden="true">
              <label htmlFor="company">Company</label>
              <input type="text" id="company" name="company" tabIndex={-1} autoComplete="off" />
            </div>

            <div className="input-group">
              <label htmlFor="c-name">Name</label>
              <input id="c-name" type="text" name="name" required placeholder="Your name" disabled={sending} />
              <span className="input-highlight" />
            </div>
            <div className="input-group">
              <label htmlFor="c-email">Email</label>
              <input id="c-email" type="email" name="email" required placeholder="you@example.com" disabled={sending} />
              <span className="input-highlight" />
            </div>
            <div className="input-group">
              <label htmlFor="c-msg">Message</label>
              <textarea id="c-msg" name="message" rows={5} required placeholder="Tell me about your project…" disabled={sending} />
              <span className="input-highlight" />
            </div>

            <button type="submit" className="btn btn-primary submit-btn" disabled={sending}>
              {sending ? 'Transmitting…' : 'Send message'}
              <SendHorizontal size={16} />
            </button>

            <div role="status" aria-live="polite">
              {status === 'sent' && (
                <p className="form-status form-success">Transmission received. I'll get back to you soon.</p>
              )}
              {status === 'error' && (
                <p className="form-status form-error">Transmission failed. Please try again or email me directly.</p>
              )}
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}