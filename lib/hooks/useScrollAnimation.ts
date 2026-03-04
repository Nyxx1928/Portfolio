import { useInView } from 'framer-motion';
import { useRef } from 'react';

interface UseScrollAnimationOptions {
  threshold?: number;
  triggerOnce?: boolean;
  margin?: string;
}

export function useScrollAnimation(options: UseScrollAnimationOptions = {}) {
  const ref = useRef(null);
  const isInView = useInView(ref, {
    once: options.triggerOnce ?? true,
    amount: options.threshold ?? 0.3,
    margin: (options.margin ?? '0px 0px -100px 0px') as `${number}px ${number}px ${number}px ${number}px`,
  });

  return { ref, isInView };
}
