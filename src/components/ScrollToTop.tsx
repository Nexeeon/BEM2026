import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useScrollStore } from "../store/useScrollStore";

/**
 * ScrollToTop Component
 * Resets scroll position to top (0, 0) instantly and resets Zustand scroll state
 * whenever the route pathname changes. No loading screen or artificial delay.
 */
export default function ScrollToTop() {
  const { pathname } = useLocation();
  const resetScrollState = useScrollStore((state) => state.resetScrollState);

  useEffect(() => {
    // 1. Reset browser scroll position immediately
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant" as ScrollBehavior,
    });

    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;

    // 2. Reset Zustand scroll state for the newly loaded page
    resetScrollState();
  }, [pathname, resetScrollState]);

  return null;
}
