import { useEffect, useRef } from 'react';

/**
 * Scroll parallax. Moves the element relative to its parent's position in the
 * viewport. speed > 0 = lags behind the scroll (feels far away),
 * speed < 0 = moves faster (feels close).
 */
export function useParallax<T extends HTMLElement>(speed = 0.15, axis: 'x' | 'y' = 'y') {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    const box = el?.parentElement;
    if (!el || !box) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let raf = 0;
    let visible = true;

    const update = () => {
      raf = 0;
      const r = box.getBoundingClientRect();
      const center = r.top + r.height / 2 - window.innerHeight / 2;
      const v = Math.round(-center * speed * 10) / 10;
      el.style.translate = axis === 'y' ? `0 ${v}px` : `${v}px 0`;
    };
    const onScroll = () => {
      if (visible && !raf) raf = requestAnimationFrame(update);
    };

    const io = new IntersectionObserver(
      ([e]) => {
        visible = e.isIntersecting;
        if (visible) onScroll();
      },
      { rootMargin: '40% 0px 40% 0px' }
    );
    io.observe(box);

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      io.disconnect();
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      cancelAnimationFrame(raf);
    };
  }, [speed, axis]);

  return ref;
}