import { DependencyList, RefObject, useEffect } from 'react';
import { gsap } from '../lib/gsap';

export function useGsapContext(
  scopeRef: RefObject<HTMLElement | null>,
  callback: (ctx: gsap.Context) => void,
  deps: DependencyList = []
) {
  useEffect(() => {
    const el = scopeRef.current;
    if (!el) return;
    const ctx = gsap.context((self) => {
      callback(self);
    }, el);
    return () => {
      ctx.revert();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}
