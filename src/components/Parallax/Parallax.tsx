import type { ReactNode } from 'react';
import { useParallax } from '../../hooks/useParallax';

interface Props {
  speed?: number;
  axis?: 'x' | 'y';
  className?: string;
  children?: ReactNode;
}

export default function Parallax({ speed = 0.15, axis = 'y', className, children }: Props) {
  const ref = useParallax<HTMLDivElement>(speed, axis);
  return (
    <div ref={ref} className={className} aria-hidden="true">
      {children}
    </div>
  );
}