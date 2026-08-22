import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ChevronDown,
  Menu,
  X as CloseIcon,
  Mail,
  Instagram,
  Youtube,
} from "lucide-react";

type DropdownName = "academic" | "echo" | null;

export default function About() {
  const [mobileOpen, setMobileOpen] = useState<boolean>(false);
  const [openDropdown, setOpenDropdown] = useState<DropdownName>(null);
  const [scrolled, setScrolled] = useState<boolean>(false);
  const [videoError, setVideoError] = useState<boolean>(false);

  // ============================================================
  // SCROLL DETECTION
  // ============================================================
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // ============================================================
  // DROPDOWN & MENU HANDLERS
  // ============================================================
  const toggleDropdown = (name: Exclude<DropdownName, null>) => {
    setOpenDropdown((prev) => (prev === name ? null : name));
  };

  const closeMenus = () => {
    setMobileOpen(false);
    setOpenDropdown(null);
  };

  return (
    <main className="relative min-h-screen overflow-x-clip bg-[url('/images/bgweb.jpeg')] bg-cover bg-fixed bg-center bg-no-repeat pt-[72px] text-slate-900">
      <div className="min-h-screen bg-white/65">
        {/* NAVBAR */}
        <header
          className={`fixed inset-x-0 top-0 z-[100] transition-all duration-300 ${
            scrolled
              ? "border-b border-slate-200/70 bg-white/80 shadow-sm backdrop-blur-xl text-slate-900"
              : "border-b border-white/20 bg-white/20 backdrop-blur-md text-slate-900"
          }`}
        >
          <div className="w-full">
            <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between px-5 lg:px-8">
              {/* BRANDING */}
              <div className="flex shrink-0 items-center gap-3">
                <img
                  src="/images/logo.png"
                  alt="Logo Kabinet Lentera Sriwijaya"
                  className="h-10 w-10 object-contain"
                />
                <div className="leading-tight">
                  <p className="text-sm font-bold tracking-tight text-slate-800 sm:text-[15px]">
                    Kabinet Lentera Sriwijaya
                  </p>
                  <p className="mt-0.5 text-[9px] font-medium uppercase tracking-[0.14em] text-slate-500 sm:text-[10px]">
                    BEM Politeknik Negeri Sriwijaya
                  </p>
                </div>
              </div>

              {/* DESKTOP NAV */}
              <nav className="hidden items-center gap-1 lg:flex">
                <Link
                  to="/"
                  className="rounded-lg px-3.5 py-2 text-sm font-medium text-slate-600 outline-none transition-all duration-200 hover:bg-white/55 hover:text-amber-600 focus-visible:ring-2 focus-visible:ring-amber-400/70"
                  onClick={closeMenus}
                >
                  Home
                </Link>

                <Link
                  to="/#visi"
                  className="rounded-lg bg-white/60 px-3.5 py-2 text-sm font-medium text-amber-700 outline-none transition-all duration-200 focus-visible:ring-2 focus-visible:ring-amber-400/70"
                  onClick={closeMenus}
                >
                  About
                </Link>

                {/* ACADEMIC INFORMATION */}
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => toggleDropdown("academic")}
                    className={`flex items-center gap-1 rounded-lg px-3.5 py-2 text-sm font-medium outline-none transition-all duration-200 ${
                      openDropdown === "academic"
                        ? "bg-white/60 text-amber-700"
                        : "text-slate-600 hover:bg-white/55 hover:text-amber-600"
                    }`}
                  >
                    Academic Information
                    <ChevronDown
                      size={14}
                      className={`transition-transform duration-200 ${
                        openDropdown === "academic" ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {openDropdown === "academic" && (
                    <div className="absolute left-0 top-full mt-2 w-60 overflow-hidden rounded-xl border border-slate-200/70 bg-white/95 p-1.5 shadow-xl backdrop-blur-xl">
                      <Link
                        to="/calendar"
                        className="block rounded-lg px-3 py-2.5 text-xs font-semibold text-slate-600 hover:bg-amber-50 hover:text-amber-700"
                        onClick={closeMenus}
                      >
                        Academic Calendar
                      </Link>
                      <Link
                        to="/#agenda"
                        className="block rounded-lg px-3 py-2.5 text-xs font-semibold text-slate-600 hover:bg-amber-50 hover:text-amber-700"
                        onClick={closeMenus}
                      >
                        Scholarship Info
                      </Link>
                      <Link
                        to="/#agenda"
                        className="block rounded-lg px-3 py-2.5 text-xs font-semibold text-slate-600 hover:bg-amber-50 hover:text-amber-700"
                        onClick={closeMenus}
                      >
                        Organisasi Mahasiswa
                      </Link>
                      <Link
                        to="/#agenda"
                        className="block rounded-lg px-3 py-2.5 text-xs font-semibold text-slate-600 hover:bg-amber-50 hover:text-amber-700"
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
                    className={`flex items-center gap-1 rounded-lg px-3.5 py-2 text-sm font-medium outline-none transition-all duration-200 ${
                      openDropdown === "echo"
                        ? "bg-white/60 text-amber-700"
                        : "text-slate-600 hover:bg-white/55 hover:text-amber-600"
                    }`}
                  >
                    Campus Echo
                    <ChevronDown
                      size={14}
                      className={`transition-transform duration-200 ${
                        openDropdown === "echo" ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {openDropdown === "echo" && (
                    <div className="absolute left-0 top-full mt-2 w-52 overflow-hidden rounded-xl border border-slate-200/70 bg-white/95 p-1.5 shadow-xl backdrop-blur-xl">
                      <Link
                        to="/kajian"
                        className="block rounded-lg px-3 py-2.5 text-xs font-semibold text-slate-600 hover:bg-amber-50 hover:text-amber-700"
                        onClick={closeMenus}
                      >
                        Kajian
                      </Link>
                      <Link
                        to="/bisik-kampus"
                        className="block rounded-lg px-3 py-2.5 text-xs font-semibold text-slate-600 hover:bg-amber-50 hover:text-amber-700"
                        onClick={closeMenus}
                      >
                        Bisik Kampus
                      </Link>
                      <Link
                        to="/polsrifess"
                        className="block rounded-lg px-3 py-2.5 text-xs font-semibold text-slate-600 hover:bg-amber-50 hover:text-amber-700"
                        onClick={closeMenus}
                      >
                        Polsrifess
                      </Link>
                    </div>
                  )}
                </div>

                <Link
                  to="/contact"
                  className="ml-1 rounded-lg px-3.5 py-2 text-sm font-medium text-slate-600 outline-none transition-all duration-200 hover:bg-white/55 hover:text-amber-600 focus-visible:ring-2 focus-visible:ring-amber-400/70"
                  onClick={closeMenus}
                >
                  Contact Us
                </Link>
              </nav>

              {/* MOBILE MENU BUTTON */}
              <button
                type="button"
                aria-label={mobileOpen ? "Tutup menu" : "Buka menu"}
                className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/40 bg-white/40 text-slate-700 outline-none backdrop-blur-md transition-all hover:bg-white/60 hover:text-amber-600 lg:hidden"
                onClick={() => setMobileOpen((prev) => !prev)}
              >
                {mobileOpen ? <CloseIcon size={21} /> : <Menu size={21} />}
              </button>
            </div>

            {/* MOBILE NAV */}
            {mobileOpen && (
              <div className="border-t border-slate-200/70 bg-white/95 px-5 py-3 shadow-lg backdrop-blur-xl lg:hidden text-slate-900">
                <Link
                  to="/"
                  className="block rounded-lg px-3 py-3 text-sm font-medium text-slate-600 hover:bg-slate-50 hover:text-amber-600"
                  onClick={closeMenus}
                >
                  Home
                </Link>
                <Link
                  to="/#visi"
                  className="block rounded-lg bg-amber-50 px-3 py-3 text-sm font-semibold text-amber-700"
                  onClick={closeMenus}
                >
                  About
                </Link>

                <button
                  type="button"
                  className="mt-1 flex w-full items-center justify-between rounded-lg px-3 py-3 text-sm font-medium text-slate-600 hover:bg-slate-50"
                  onClick={() => toggleDropdown("academic")}
                >
                  Academic Information
                  <ChevronDown
                    size={14}
                    className={`transition-transform duration-200 ${
                      openDropdown === "academic" ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {openDropdown === "academic" && (
                  <div className="mt-1 rounded-lg bg-slate-50 p-1">
                    <Link
                      to="/calendar"
                      className="block rounded-md px-3 py-2.5 text-sm font-semibold text-slate-600 hover:bg-white hover:text-amber-700"
                      onClick={closeMenus}
                    >
                      Academic Calendar
                    </Link>
                    <Link
                      to="/#agenda"
                      className="block rounded-md px-3 py-2.5 text-sm text-slate-600 hover:bg-white hover:text-amber-700"
                      onClick={closeMenus}
                    >
                      Scholarship Info
                    </Link>
                  </div>
                )}

                <button
                  type="button"
                  className="mt-1 flex w-full items-center justify-between rounded-lg px-3 py-3 text-sm font-medium text-slate-600 hover:bg-slate-50"
                  onClick={() => toggleDropdown("echo")}
                >
                  Campus Echo
                  <ChevronDown
                    size={14}
                    className={`transition-transform duration-200 ${
                      openDropdown === "echo" ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {openDropdown === "echo" && (
                  <div className="mt-1 rounded-lg bg-slate-50 p-1">
                    <Link
                      to="/kajian"
                      className="block rounded-md px-3 py-2.5 text-sm text-slate-600 hover:bg-white hover:text-amber-700"
                      onClick={closeMenus}
                    >
                      Kajian
                    </Link>
                    <Link
                      to="/bisik-kampus"
                      className="block rounded-md px-3 py-2.5 text-sm text-slate-600 hover:bg-white hover:text-amber-700"
                      onClick={closeMenus}
                    >
                      Bisik Kampus
                    </Link>
                  </div>
                )}

                <Link
                  to="/contact"
                  className="mt-1 block rounded-lg px-3 py-3 text-sm font-medium text-slate-600 hover:bg-slate-50 hover:text-amber-600"
                  onClick={closeMenus}
                >
                  Contact Us
                </Link>
              </div>
            )}
          </div>
        </header>

        {/* HERO VIDEO */}
        <section className="w-full px-4 pb-12 pt-6 md:px-8 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="relative min-h-[380px] w-full overflow-hidden rounded-2xl bg-slate-950 shadow-2xl sm:min-h-[500px] md:rounded-3xl lg:min-h-[650px]"
          >
            {!videoError && (
              <video
                src="/vidiobem/PengenalanBEM.mp4"
                autoPlay
                muted
                loop
                playsInline
                preload="auto"
                className="absolute inset-0 h-full w-full object-cover"
                onError={() => setVideoError(true)}
              />
            )}

            {videoError && (
              <div className="absolute inset-0 flex items-center justify-center bg-slate-950 p-6 text-center">
                <div>
                  <p className="text-lg font-bold text-white">
                    Video tidak dapat diputar.
                  </p>
                  <p className="mt-2 text-sm text-slate-400">
                    Pastikan file file video berada di
                    public/vidiobem/PengenalanBEM.mp4
                  </p>
                </div>
              </div>
            )}

            <div className="absolute inset-0 z-10 bg-black/20" />
            <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

            <div className="relative z-20 flex min-h-[380px] flex-col justify-end p-6 text-white sm:min-h-[500px] md:p-10 lg:min-h-[650px] lg:p-14">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="max-w-4xl"
              >
                <h1 className="text-4xl font-black uppercase leading-[1.05] tracking-tight drop-shadow-lg sm:text-5xl md:text-6xl lg:text-7xl">
                  BEM POLITEKNIK
                  <br />
                  SRIWIJAYA
                </h1>
                <p className="mt-4 text-xl font-bold tracking-wide text-amber-400 drop-shadow sm:text-2xl md:text-3xl">
                  Kabinet Kilau Gemilang
                </p>
              </motion.div>
            </div>
          </motion.div>
        </section>

        {/* FOOTER */}
        <footer
          id="footer"
          className="border-t border-white/10 bg-slate-950 px-5 pb-8 pt-16 text-white lg:px-8"
        >
          <div className="mx-auto max-w-7xl">
            <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr] md:gap-8">
              <div>
                <div className="flex items-center gap-3">
                  <img
                    src="/images/logo.png"
                    alt="Logo BEM Polsri"
                    className="h-12 w-12 object-contain"
                  />
                  <div>
                    <h2 className="font-bold">Kabinet Lentera Sriwijaya</h2>
                    <p className="mt-1 text-xs text-slate-400">
                      BEM Politeknik Negeri Sriwijaya
                    </p>
                  </div>
                </div>
                <p className="mt-6 max-w-xs text-sm leading-7 text-slate-400">
                  Menjadi wadah yang aktif, responsif, dan konstruktif untuk
                  Politeknik Negeri Sriwijaya yang lebih berdampak.
                </p>
              </div>

              <div>
                <h3 className="text-xs font-black uppercase tracking-widest text-amber-400">
                  Navigasi
                </h3>
                <div className="mt-5 grid gap-3 text-sm text-slate-400">
                  <Link to="/#visi" className="hover:text-white">
                    Tentang Kami
                  </Link>
                  <Link to="/#agenda" className="hover:text-white">
                    Agenda Kegiatan
                  </Link>
                  <Link to="/contact" className="hover:text-white">
                    Contact Us
                  </Link>
                </div>
              </div>

              <div>
                <h3 className="text-xs font-black uppercase tracking-widest text-amber-400">
                  Mari Terhubung
                </h3>
                <p className="mt-5 flex items-start gap-2 text-sm leading-6 text-slate-400">
                  <Mail size={16} className="mt-1 shrink-0 text-amber-400" />
                  bem@polsri.ac.id
                </p>
                <div className="mt-5 flex gap-2">
                  <a
                    href="https://www.instagram.com/bempolsri_/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-800 text-slate-300 hover:bg-amber-500 hover:text-white"
                  >
                    <Instagram size={16} />
                  </a>
                  <a
                    href="https://x.com/polsrimenfess"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-800 font-bold text-slate-300 hover:bg-amber-500 hover:text-white"
                  >
                    𝕏
                  </a>
                  <a
                    href="https://www.youtube.com/@BEMKMPOLSRI"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-800 text-slate-300 hover:bg-amber-500 hover:text-white"
                  >
                    <Youtube size={17} />
                  </a>
                </div>
              </div>
            </div>

            <div className="mt-14 border-t border-white/10 pt-6 text-xs text-slate-500">
              <p>
                © 2026 BEM Politeknik Negeri Sriwijaya. All rights reserved.
              </p>
            </div>
          </div>
        </footer>
      </div>
    </main>
  );
}
