import { useEffect } from "react";
import { useScrollStore } from "../store/useScrollStore";

/**
 * Lightweight passive scroll listener that updates scrollY in Zustand
 * using requestAnimationFrame for optimal 60fps+ rendering performance.
 */
export function useScrollListener() {
  const setScrollY = useScrollStore((state) => state.setScrollY);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrollY(window.scrollY);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [setScrollY]);
}
