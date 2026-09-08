import { create } from "zustand";

export interface ScrollState {
  scrollY: number;
  activeSection: string | null;
  isScrolling: boolean;
  isHeroVisible: boolean;
  setScrollY: (value: number) => void;
  setActiveSection: (value: string | null) => void;
  setIsScrolling: (value: boolean) => void;
  setHeroVisible: (visible: boolean) => void;
  resetScrollState: () => void;
}

export const useScrollStore = create<ScrollState>((set) => ({
  scrollY: 0,
  activeSection: "hero",
  isScrolling: false,
  isHeroVisible: true,
  setScrollY: (scrollY) =>
    set((state) => (state.scrollY === scrollY ? state : { scrollY })),
  setActiveSection: (activeSection) =>
    set((state) =>
      state.activeSection === activeSection ? state : { activeSection }
    ),
  setIsScrolling: (isScrolling) =>
    set((state) =>
      state.isScrolling === isScrolling ? state : { isScrolling }
    ),
  setHeroVisible: (isHeroVisible) =>
    set((state) =>
      state.isHeroVisible === isHeroVisible ? state : { isHeroVisible }
    ),
  resetScrollState: () =>
    set({
      scrollY: 0,
      activeSection: "hero",
      isScrolling: false,
      isHeroVisible: true,
    }),
}));
