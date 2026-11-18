import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

ScrollTrigger.config({
  ignoreMobileResize: true,
});

export { gsap, ScrollTrigger };

export function refreshScrollTriggerAfterPaint() {
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      try {
        ScrollTrigger.refresh();
      } catch {
        // Ignore refresh errors during unmount transitions
      }
    });
  });
}
