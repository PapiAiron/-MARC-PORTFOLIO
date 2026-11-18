import { useEffect, useRef } from 'react';

interface Options { min?: number; max?: number }

/**
 * Scales the element's font-size so its text fills (never exceeds) the
 * width of its parent. The element must have `width: max-content`.
 */
export function useFitText<T extends HTMLElement>({ min = 12, max = 1000 }: Options = {}) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    const box = el?.parentElement;
    if (!el || !box) return;

    let lastWidth = -1;
    const fit = () => {
      const available = box.clientWidth;
      if (!available) return;
      lastWidth = available;
      el.style.fontSize = '100px';
      const natural = el.getBoundingClientRect().width;
      if (!natural) return;
      const size = Math.min(max, Math.max(min, (available / natural) * 100 * 0.98));
      el.style.fontSize = `${size.toFixed(2)}px`;
    };

    fit();
    const ro = new ResizeObserver(() => {
      if (box.clientWidth !== lastWidth) fit();
    });
    ro.observe(box);
    document.fonts?.ready.then(fit); // re-fit once the custom font has loaded

    return () => ro.disconnect();
  }, [min, max]);

  return ref;
}