import { useState, useEffect, useRef, useCallback } from "react";
import { Link, useLocation } from "react-router-dom";
import { ChevronDown, Menu, X } from "lucide-react";

type DropdownName = "academic" | "echo" | null;

interface NavbarProps {
  activePage?: string;
}

export default function Navbar({ activePage: activePageProp }: NavbarProps) {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<DropdownName>(null);
  const [scrolled, setScrolled] = useState(false);
  const navRef = useRef<HTMLElement>(null);

  const closeMenus = useCallback(() => {
    setMobileOpen(false);
    setOpenDropdown(null);
  }, []);

  // Passive scroll listener dengan requestAnimationFrame untuk performa 60fps+
  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrolled(window.scrollY > 20);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Click outside & Escape key listener untuk Accessibility
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        closeMenus();
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closeMenus();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [closeMenus]);

  // Auto-determine active page from pathname if prop is not provided
  let activePage = activePageProp;
  if (!activePage) {
    const path = location.pathname;
    if (path === "/") activePage = "home";
    else if (path === "/about") activePage = "about";
    else if (path === "/calendar" || path === "/academic-calendar") activePage = "calendar";
    else if (path === "/scholarship-info") activePage = "scholarship";
    else if (path === "/organisasi-mahasiswa") activePage = "organisasi";
    else if (path === "/mahasiswa-berdampak") activePage = "mahasiswa-berdampak";
    else if (path === "/kajian") activePage = "kajian";
    else if (path === "/bisik-kampus") activePage = "bisik-kampus";
    else if (path === "/polsrifess") activePage = "polsrifess";
    else if (path === "/medinfo" || path === "/departemen/medinfo") activePage = "medinfo";
    else if (path === "/kastrat" || path === "/departemen/kastrat") activePage = "kastrat";
    else if (path === "/psdm" || path === "/departemen/psdm") activePage = "psdm";
    else if (path === "/adkesma" || path === "/departemen/adkesma") activePage = "adkesma";
    else if (path === "/humas" || path === "/departemen/humas") activePage = "humas";
    else if (path === "/contact") activePage = "contact";
  }

  const isAcademicActive = [
    "calendar",
    "scholarship",
    "organisasi",
    "mahasiswa-berdampak",
  ].includes(activePage || "");

  const isEchoActive = ["kajian", "bisik-kampus", "polsrifess"].includes(
    activePage || ""
  );

  const toggleDropdown = (name: Exclude<DropdownName, null>) => {
    setOpenDropdown(openDropdown === name ? null : name);
  };

  return (
    <header
      ref={navRef}
      className={`fixed inset-x-0 top-0 z-[100] transition-all duration-300 ${
        scrolled
          ? "border-b border-slate-200/70 bg-white/80 shadow-sm backdrop-blur-xl"
          : "border-b border-white/20 bg-white/20 backdrop-blur-md"
      }`}
    >
      <div className="w-full">
        <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between px-5 lg:px-8">
          {/* BRANDING */}
          <Link to="/" className="flex shrink-0 items-center gap-3" onClick={closeMenus}>
            <img
              src="/images/logo.webp"
              alt="Logo Kabinet Kilau Gemilang"
              className="h-10 w-10 object-contain"
            />

            <div className="leading-tight">
              <p className="text-sm font-bold tracking-tight text-slate-800 sm:text-[15px]">
                Kabinet Kilau Gemilang
              </p>

              <p className="mt-0.5 text-[9px] font-medium uppercase tracking-[0.14em] text-slate-500 sm:text-[10px]">
                BEM Politeknik Negeri Sriwijaya
              </p>
            </div>
          </Link>

          {/* DESKTOP NAV */}
          <nav className="hidden items-center gap-1 lg:flex">
            {/* HOME */}
            <Link
              to="/"
              className={`rounded-lg px-3.5 py-2 text-sm font-medium outline-none transition-all duration-200 ease-out active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-amber-400/70 ${
                activePage === "home"
                  ? "text-amber-600 bg-amber-50/80 hover:text-amber-700"
                  : "text-slate-600 hover:bg-white/55 hover:text-amber-600"
              }`}
              onClick={closeMenus}
            >
              Home
            </Link>

            {/* ABOUT */}
            <Link
              to="/about"
              className={`rounded-lg px-3.5 py-2 text-sm font-medium outline-none transition-all duration-200 ease-out active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-amber-400/70 ${
                activePage === "about"
                  ? "text-amber-600 bg-amber-50/80 hover:text-amber-700"
                  : "text-slate-600 hover:bg-white/55 hover:text-amber-600"
              }`}
              onClick={closeMenus}
            >
              About
            </Link>

            {/* ACADEMIC INFORMATION */}
            <div className="relative">
              <button
                type="button"
                onClick={() => toggleDropdown("academic")}
                className={`flex items-center gap-1 rounded-lg px-3.5 py-2 text-sm font-medium outline-none transition-all duration-200 ease-out active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-amber-400/70 ${
                  isAcademicActive || openDropdown === "academic"
                    ? "bg-white/60 text-amber-700"
                    : "text-slate-600 hover:bg-white/55 hover:text-amber-600"
                }`}
              >
                Academic Information
                <ChevronDown
                  size={14}
                  className={`transition-transform duration-200 ease-out ${
                    openDropdown === "academic" ? "rotate-180" : ""
                  }`}
                />
              </button>

              {openDropdown === "academic" && (
                <div className="absolute left-0 top-full mt-2 w-60 overflow-hidden rounded-xl border border-slate-200/70 bg-white/95 p-1.5 shadow-xl backdrop-blur-xl">
                  <Link
                    to="/calendar"
                    className={`block rounded-lg px-3 py-2.5 text-xs font-semibold outline-none transition-all duration-200 ease-out active:scale-[0.99] focus-visible:ring-2 focus-visible:ring-amber-400/50 ${
                      activePage === "calendar"
                        ? "bg-amber-50 text-amber-600 font-bold"
                        : "text-slate-600 hover:bg-amber-50 hover:text-amber-700"
                    }`}
                    onClick={closeMenus}
                  >
                    Academic Calendar
                  </Link>

                  <Link
                    to="/scholarship-info"
                    className={`block rounded-lg px-3 py-2.5 text-xs font-semibold outline-none transition-all duration-200 ease-out active:scale-[0.99] focus-visible:ring-2 focus-visible:ring-amber-400/50 ${
                      activePage === "scholarship"
                        ? "bg-amber-50 text-amber-600 font-bold"
                        : "text-slate-600 hover:bg-amber-50 hover:text-amber-700"
                    }`}
                    onClick={closeMenus}
                  >
                    Scholarship Info
                  </Link>

                  <Link
                    to="/organisasi-mahasiswa"
                    className={`block rounded-lg px-3 py-2.5 text-xs font-semibold outline-none transition-all duration-200 ease-out active:scale-[0.99] focus-visible:ring-2 focus-visible:ring-amber-400/50 ${
                      activePage === "organisasi"
                        ? "bg-amber-50 text-amber-600 font-bold"
                        : "text-slate-600 hover:bg-amber-50 hover:text-amber-700"
                    }`}
                    onClick={closeMenus}
                  >
                    Organisasi Mahasiswa
                  </Link>

                  <Link
                    to="/mahasiswa-berdampak"
                    className={`block rounded-lg px-3 py-2.5 text-xs font-semibold outline-none transition-all duration-200 ease-out active:scale-[0.99] focus-visible:ring-2 focus-visible:ring-amber-400/50 ${
                      activePage === "mahasiswa-berdampak"
                        ? "bg-amber-50 text-amber-600 font-bold"
                        : "text-slate-600 hover:bg-amber-50 hover:text-amber-700"
                    }`}
                    onClick={closeMenus}
                  >
                    Mahasiswa Berdampak
                  </Link>
                </div>
              )}
            </div>

            {/* CAMPUS ECHO */}
            <div className="relative">
              <button
                type="button"
                onClick={() => toggleDropdown("echo")}
                className={`flex items-center gap-1 rounded-lg px-3.5 py-2 text-sm font-medium outline-none transition-all duration-200 ease-out active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-amber-400/70 ${
                  isEchoActive || openDropdown === "echo"
                    ? "bg-white/60 text-amber-700"
                    : "text-slate-600 hover:bg-white/55 hover:text-amber-600"
                }`}
              >
                Campus Echo
                <ChevronDown
                  size={14}
                  className={`transition-transform duration-200 ease-out ${
                    openDropdown === "echo" ? "rotate-180" : ""
                  }`}
                />
              </button>

              {openDropdown === "echo" && (
                <div className="absolute left-0 top-full mt-2 w-52 overflow-hidden rounded-xl border border-slate-200/70 bg-white/95 p-1.5 shadow-xl backdrop-blur-xl">
                  <Link
                    to="/kajian"
                    className={`block rounded-lg px-3 py-2.5 text-xs font-semibold outline-none transition-all duration-200 ease-out active:scale-[0.99] focus-visible:ring-2 focus-visible:ring-amber-400/50 ${
                      activePage === "kajian"
                        ? "bg-amber-50 text-amber-600 font-bold"
                        : "text-slate-600 hover:bg-amber-50 hover:text-amber-700"
                    }`}
                    onClick={closeMenus}
                  >
                    Kajian
                  </Link>

                  <Link
                    to="/bisik-kampus"
                    className={`block rounded-lg px-3 py-2.5 text-xs font-semibold outline-none transition-all duration-200 ease-out active:scale-[0.99] focus-visible:ring-2 focus-visible:ring-amber-400/50 ${
                      activePage === "bisik-kampus"
                        ? "bg-amber-50 text-amber-600 font-bold"
                        : "text-slate-600 hover:bg-amber-50 hover:text-amber-700"
                    }`}
                    onClick={closeMenus}
                  >
                    Bisik Kampus
                  </Link>

                  <Link
                    to="/polsrifess"
                    className={`block rounded-lg px-3 py-2.5 text-xs font-semibold outline-none transition-all duration-200 ease-out active:scale-[0.99] focus-visible:ring-2 focus-visible:ring-amber-400/50 ${
                      activePage === "polsrifess"
                        ? "bg-amber-50 text-amber-600 font-bold"
                        : "text-slate-600 hover:bg-amber-50 hover:text-amber-700"
                    }`}
                    onClick={closeMenus}
                  >
                    Polsrifess
                  </Link>
                </div>
              )}
            </div>

            {/* CONTACT US */}
            <Link
              to="/contact"
              className={`ml-1 rounded-lg px-3.5 py-2 text-sm font-medium outline-none transition-all duration-200 ease-out active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-amber-400/70 ${
                activePage === "contact"
                  ? "text-amber-600 bg-amber-50/80 hover:text-amber-700"
                  : "text-slate-600 hover:bg-white/50 hover:text-amber-600"
              }`}
              onClick={closeMenus}
            >
              Contact Us
            </Link>
          </nav>

          {/* MOBILE MENU BUTTON */}
          <button
            type="button"
            aria-label={mobileOpen ? "Tutup menu" : "Buka menu"}
            aria-expanded={mobileOpen}
            className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/40 bg-white/40 text-slate-700 outline-none backdrop-blur-md transition-all duration-200 ease-out hover:border-amber-300 hover:bg-white/60 hover:text-amber-600 active:scale-[0.97] focus-visible:ring-2 focus-visible:ring-amber-400/70 lg:hidden"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X size={21} /> : <Menu size={21} />}
          </button>
        </div>

        {/* MOBILE MENU CONTENT */}
        {mobileOpen && (
          <div className="border-t border-slate-200/70 bg-white/95 px-5 py-3 shadow-lg backdrop-blur-xl lg:hidden">
            <Link
              to="/"
              className={`block rounded-lg px-3 py-3 text-sm font-medium outline-none transition-all duration-200 active:scale-[0.99] focus-visible:ring-2 focus-visible:ring-amber-400/50 ${
                activePage === "home"
                  ? "bg-amber-50 font-semibold text-amber-600"
                  : "text-slate-600 hover:bg-slate-50 hover:text-amber-600"
              }`}
              onClick={closeMenus}
            >
              Home
            </Link>

            <Link
              to="/about"
              className={`block rounded-lg px-3 py-3 text-sm font-medium outline-none transition-all duration-200 active:scale-[0.99] focus-visible:ring-2 focus-visible:ring-amber-400/50 ${
                activePage === "about"
                  ? "bg-amber-50 font-semibold text-amber-600"
                  : "text-slate-600 hover:bg-slate-50 hover:text-amber-600"
              }`}
              onClick={closeMenus}
            >
              About
            </Link>

            {/* MOBILE ACADEMIC */}
            <button
              type="button"
              className={`mt-1 flex w-full items-center justify-between rounded-lg px-3 py-3 text-sm font-medium outline-none transition-all duration-200 ease-out active:scale-[0.99] focus-visible:ring-2 focus-visible:ring-amber-400/50 ${
                isAcademicActive || openDropdown === "academic"
                  ? "bg-amber-50 text-amber-700"
                  : "text-slate-600 hover:bg-slate-50 hover:text-amber-600"
              }`}
              onClick={() => toggleDropdown("academic")}
            >
              Academic Information
              <ChevronDown
                size={14}
                className={`transition-transform duration-200 ease-out ${
                  openDropdown === "academic" ? "rotate-180" : ""
                }`}
              />
            </button>

            {openDropdown === "academic" && (
              <div className="mt-1 rounded-lg bg-slate-50 p-1">
                <Link
                  to="/calendar"
                  className={`block rounded-md px-3 py-2.5 text-sm outline-none transition-all duration-200 active:scale-[0.99] focus-visible:ring-2 focus-visible:ring-amber-400/50 ${
                    activePage === "calendar"
                      ? "bg-amber-50 font-semibold text-amber-600"
                      : "text-slate-600 hover:bg-white hover:text-amber-700"
                  }`}
                  onClick={closeMenus}
                >
                  Academic Calendar
                </Link>

                <Link
                  to="/scholarship-info"
                  className={`block rounded-md px-3 py-2.5 text-sm outline-none transition-all duration-200 active:scale-[0.99] focus-visible:ring-2 focus-visible:ring-amber-400/50 ${
                    activePage === "scholarship"
                      ? "bg-amber-50 font-semibold text-amber-600"
                      : "text-slate-600 hover:bg-white hover:text-amber-700"
                  }`}
                  onClick={closeMenus}
                >
                  Scholarship Info
                </Link>

                <Link
                  to="/organisasi-mahasiswa"
                  className={`block rounded-md px-3 py-2.5 text-sm outline-none transition-all duration-200 active:scale-[0.99] focus-visible:ring-2 focus-visible:ring-amber-400/50 ${
                    activePage === "organisasi"
                      ? "bg-amber-50 font-semibold text-amber-600"
                      : "text-slate-600 hover:bg-white hover:text-amber-700"
                  }`}
                  onClick={closeMenus}
                >
                  Organisasi Mahasiswa
                </Link>

                <Link
                  to="/mahasiswa-berdampak"
                  className={`block rounded-md px-3 py-2.5 text-sm outline-none transition-all duration-200 active:scale-[0.99] focus-visible:ring-2 focus-visible:ring-amber-400/50 ${
                    activePage === "mahasiswa-berdampak"
                      ? "bg-amber-50 font-semibold text-amber-600"
                      : "text-slate-600 hover:bg-white hover:text-amber-700"
                  }`}
                  onClick={closeMenus}
                >
                  Mahasiswa Berdampak
                </Link>
              </div>
            )}

            {/* MOBILE CAMPUS ECHO */}
            <button
              type="button"
              className={`mt-1 flex w-full items-center justify-between rounded-lg px-3 py-3 text-sm font-medium outline-none transition-all duration-200 ease-out active:scale-[0.99] focus-visible:ring-2 focus-visible:ring-amber-400/50 ${
                isEchoActive || openDropdown === "echo"
                  ? "bg-amber-50 text-amber-700"
                  : "text-slate-600 hover:bg-slate-50 hover:text-amber-600"
              }`}
              onClick={() => toggleDropdown("echo")}
            >
              Campus Echo
              <ChevronDown
                size={14}
                className={`transition-transform duration-200 ease-out ${
                  openDropdown === "echo" ? "rotate-180" : ""
                }`}
              />
            </button>

            {openDropdown === "echo" && (
              <div className="mt-1 rounded-lg bg-slate-50 p-1">
                <Link
                  to="/kajian"
                  className={`block rounded-md px-3 py-2.5 text-sm outline-none transition-all duration-200 active:scale-[0.99] focus-visible:ring-2 focus-visible:ring-amber-400/50 ${
                    activePage === "kajian"
                      ? "bg-amber-50 font-semibold text-amber-600"
                      : "text-slate-600 hover:bg-white hover:text-amber-700"
                  }`}
                  onClick={closeMenus}
                >
                  Kajian
                </Link>

                <Link
                  to="/bisik-kampus"
                  className={`block rounded-md px-3 py-2.5 text-sm outline-none transition-all duration-200 active:scale-[0.99] focus-visible:ring-2 focus-visible:ring-amber-400/50 ${
                    activePage === "bisik-kampus"
                      ? "bg-amber-50 font-semibold text-amber-600"
                      : "text-slate-600 hover:bg-white hover:text-amber-700"
                  }`}
                  onClick={closeMenus}
                >
                  Bisik Kampus
                </Link>

                <Link
                  to="/polsrifess"
                  className={`block rounded-md px-3 py-2.5 text-sm outline-none transition-all duration-200 active:scale-[0.99] focus-visible:ring-2 focus-visible:ring-amber-400/50 ${
                    activePage === "polsrifess"
                      ? "bg-amber-50 font-semibold text-amber-600"
                      : "text-slate-600 hover:bg-white hover:text-amber-700"
                  }`}
                  onClick={closeMenus}
                >
                  Polsrifess
                </Link>
              </div>
            )}

            <Link
              to="/contact"
              className={`mt-1 block rounded-lg px-3 py-3 text-sm font-medium outline-none transition-all duration-200 active:scale-[0.99] focus-visible:ring-2 focus-visible:ring-amber-400/50 ${
                activePage === "contact"
                  ? "bg-amber-50 font-semibold text-amber-600"
                  : "text-slate-600 hover:bg-slate-50 hover:text-amber-600"
              }`}
              onClick={closeMenus}
            >
              Contact Us
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}
