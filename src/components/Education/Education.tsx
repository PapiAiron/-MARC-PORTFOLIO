import type { CSSProperties } from 'react';
import { GraduationCap } from 'lucide-react';
import { useReveal } from '../../hooks/useReveal';
import SectionHeading from '../SectionHeading/SectionHeading';
import './Education.css';
import Parallax from '../Parallax/Parallax';

const eduData = [
  {
    degree: 'BS Computer Science – Major in Data Science',
    school: 'Laguna University',
    period: '2022 – 2026',
    status: 'Tertiary',
    logo: '/images/lu.png',
  },
  {
    degree: 'Secondary Education (JHS + SHS)',
    school: 'Liceo de Victoria',
    period: '2014 – 2020',
    status: 'Secondary',
    logo: '/images/ldv.png',
  },
  {
    degree: 'Elementary Education',
    school: 'Tomas Daguinsin Elementary School',
    period: '2008 – 2014',
    status: 'Primary',
    logo: '/images/tdes.png',
  },
];

const d = (n: number) => ({ '--i': n } as CSSProperties);

export default function Education() {
  const ref = useReveal<HTMLDivElement>(0.1);

  return (
    <section id="education" className="education-section site-section">
      <Parallax className="wm wm-left" axis="x" speed={0.2}>LEARN</Parallax>
      <Parallax className="orb orb-violet orb-tr" speed={0.2} />
      <Parallax className="orb orb-blue orb-bl" speed={-0.12} />
      <div className="section-container">
        <SectionHeading
          index="05"
          label="Education"
          title={<>Where it <em>started.</em></>}
        />

        <div ref={ref} className="edu-list">
          {eduData.map((edu, idx) => (
            <div key={edu.school} className="edu-row rv" style={d(idx)}>
              <span className="edu-period">{edu.period}</span>

              <div className="edu-info">
                <h3>{edu.degree}</h3>
                <p className="edu-school">{edu.school}</p>
              </div>

              <div className="edu-right">
                <span className="chip edu-status">{edu.status}</span>
                <div className="edu-logo">
                  {edu.logo ? (
                    <img
                      src={edu.logo}
                      alt={`${edu.school} logo`}
                      onError={(e) => (e.currentTarget.style.display = 'none')}
                    />
                  ) : (
                    <GraduationCap size={22} color="var(--secondary-neon)" />
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}