import { useEffect } from "react";
import { useScrollStore } from "../store/useScrollStore";

/**
 * Custom hook to detect active sections using IntersectionObserver.
 * Lightweight and performant: updates Zustand state only when section intersection changes.
 */
export function useSectionObserver(sectionIds: string[]) {
  const setActiveSection = useScrollStore((state) => state.setActiveSection);
  const setHeroVisible = useScrollStore((state) => state.setHeroVisible);

  useEffect(() => {
    if (typeof window === "undefined" || !("IntersectionObserver" in window)) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.id;
            if (id) {
              setActiveSection(id);
              if (id === "hero") {
                setHeroVisible(true);
              }
            }
          } else {
            if (entry.target.id === "hero") {
              setHeroVisible(false);
            }
          }
        });
      },
      {
        threshold: 0.25,
        rootMargin: "-10% 0px -40% 0px",
      }
    );

    const elements: HTMLElement[] = [];
    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) {
        observer.observe(el);
        elements.push(el);
      }
    });

    return () => {
      elements.forEach((el) => observer.unobserve(el));
      observer.disconnect();
    };
  }, [sectionIds, setActiveSection, setHeroVisible]);
}
