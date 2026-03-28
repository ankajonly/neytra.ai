import { useEffect } from 'react';
import { gsap } from 'gsap';

export function useGsapReveal(ref) {
  useEffect(() => {
    if (!ref.current) {
      return undefined;
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '[data-reveal]',
        { opacity: 0, y: 28 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.12,
          ease: 'power3.out',
        },
      );
    }, ref);

    return () => ctx.revert();
  }, [ref]);
}