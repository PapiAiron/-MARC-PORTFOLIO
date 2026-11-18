import type { CSSProperties, ReactNode } from 'react';
import { useReveal } from '../../hooks/useReveal';

interface Props {
  index: string;
  label: string;
  title: ReactNode;
  lead?: string;
}

const d = (n: number) => ({ '--i': n } as CSSProperties);

export default function SectionHeading({ index, label, title, lead }: Props) {
  const ref = useReveal<HTMLDivElement>();
  return (
    <div ref={ref} className="sh">
      <p className="sh-eyebrow rv" style={d(0)}>
        <span className="sh-index">{index}</span> {label}
      </p>
      <h2 className="sh-title rv" style={d(1)}>{title}</h2>
      {lead && <p className="sh-lead rv" style={d(2)}>{lead}</p>}
    </div>
  );
}