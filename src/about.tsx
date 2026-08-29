import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { motion, PanInfo } from "framer-motion";
import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Menu,
  X as CloseIcon,
  Mail,
  Instagram,
  Youtube,
  Quote,
} from "lucide-react";

type DropdownName = "academic" | "echo" | null;

// DATA ANGGOTA PEJABAT TERAS BEM
const pejabatTerasData = [
  {
    nama: "Hartanti Adiningtyas",
    jabatan: "Sekretaris Umum",
    instagram: "@hartanti_tyas",
    url: "https://instagram.com/hartanti_tyas",
    foto: "/images/Pejabat_Teras/Sekretaris Umum.png",
  },
  {
    nama: "Citra Maulidya",
    jabatan: "Wakil Sekretaris Umum",
    instagram: "@citramldyaa",
    url: "https://instagram.com/citramldyaa",
    foto: "/images/Pejabat_Teras/Wakil Sekretaris Umum.png",
  },
  {
    nama: "Sulistiani Zahra",
    jabatan: "Bendahara Umum",
    instagram: "@sulistz",
    url: "https://instagram.com/sulistz",
    foto: "/images/Pejabat_Teras/Bendahara Umum.png",
  },
  {
    nama: "Khezia Firma Dwi Aulia",
    jabatan: "Wakil Bendahara Umum",
    instagram: "@kheziafdaulia",
    url: "https://instagram.com/kheziafdaulia",
    foto: "/images/Pejabat_Teras/Wakil Bendahara Umum.png",
  },
  {
    nama: "Afiq Al Bukhari",
    jabatan: "Pelaksana Tugas Wakil Ketua Umum",
    instagram: "@afiqqqqquunn_",
    url: "https://instagram.com/afiqqqqquunn_",
    foto: "/images/Pejabat_Teras/Pelaksana Tugas Wakil Ketua Umum.png",
  },
  {
    nama: "Helal Humandra",
    jabatan: "Koordinator Bidang I",
    instagram: "@humandra10",
    url: "https://instagram.com/humandra10",
    foto: "/images/Pejabat_Teras/Koordinator Bidang I.png",
  },
  {
    nama: "Agoes Putra Pratama",
    jabatan: "Koordinator Bidang II",
    instagram: "@agoesptrp",
    url: "https://instagram.com/agoesptrp",
    foto: "/images/Pejabat_Teras/Koordinator Bidang II.png",
  },
];

export default function About() {
  const [mobileOpen, setMobileOpen] = useState<boolean>(false);
  const [openDropdown, setOpenDropdown] = useState<DropdownName>(null);
  const [scrolled, setScrolled] = useState<boolean>(false);
  const [videoError, setVideoError] = useState<boolean>(false);

  // ============================================================
  // CAROUSEL & AUTO-SLIDING STATE
  // ============================================================
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isPaused, setIsPaused] = useState<boolean>(false);

  const getItemsPerPage = () => {
    if (typeof window !== "undefined") {
      if (window.innerWidth >= 1024) return 4; // Desktop: 4 kartu
      if (window.innerWidth >= 768) return 2; // Tablet: 2 kartu
    }
    return 1; // Mobile: 1 kartu
  };

  const [itemsPerPage, setItemsPerPage] = useState<number>(getItemsPerPage());

  useEffect(() => {
    const handleResize = () => {
      const newItemsPerPage = getItemsPerPage();
      setItemsPerPage(newItemsPerPage);
      setCurrentIndex((prev) =>
        Math.min(prev, Math.max(0, pejabatTerasData.length - newItemsPerPage)),
      );
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const maxIndex = Math.max(0, pejabatTerasData.length - itemsPerPage);

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? maxIndex : prev - 1));
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  };

  // EFEK AUTO SLIDE (Setiap 3 Detik)
  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      nextSlide();
    }, 3000); // Durasi per ganti slide: 3000 ms = 3 detik

    return () => clearInterval(interval);
  }, [currentIndex, isPaused, maxIndex]);

  // Touch / Drag Swipe Handler
  const handleDragEnd = (_: any, info: PanInfo) => {
    const offset = info.offset.x;
    const velocity = info.velocity.x;

    if (offset < -50 || velocity < -500) {
      nextSlide();
    } else if (offset > 50 || velocity > 500) {
      prevSlide();
    }
  };

  // ============================================================
  // SCROLL DETECTION
  // ============================================================
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
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
                        to="/scholarship-info"
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
                        to="/mahasiswa-berdampak"
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
              <div className="border-t border-slate-200/70 bg-white/95 px-5 py-3 shadow-lg backdrop-blur-xl text-slate-900 lg:hidden">
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
                    Pastikan file video berada di
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

        {/* SECTION VISI & MISI */}
        <section id="visi" className="mx-auto max-w-7xl px-5 py-16 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-[1fr_360px] lg:gap-16">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="flex flex-col justify-center space-y-8 text-slate-800"
            >
              <div>
                <h2 className="text-3xl font-black uppercase tracking-wider text-amber-500 sm:text-4xl">
                  VISION
                </h2>
                <p className="mt-4 text-base font-medium leading-relaxed text-slate-700 sm:text-lg">
                  Menjadikan Badan Eksekutif Mahasiswa Politeknik Negeri
                  Sriwijaya sebagai lembaga yang berdampak positif bagi
                  Mahasiswa/i dan Institusi Politeknik Negeri Sriwijaya.
                </p>
              </div>

              <div>
                <h2 className="text-3xl font-black uppercase tracking-wider text-amber-500 sm:text-4xl">
                  MISSION
                </h2>
                <ol className="mt-4 space-y-4 text-base font-normal leading-relaxed text-slate-700">
                  <li className="flex gap-2">
                    <span className="font-semibold text-slate-900">1.</span>
                    <span>
                      Mewadahi dan memperjuangkan aspirasi mahasiswa secara
                      terbuka, responsif, dan bertanggung jawab melalui
                      mekanisme penyerapan aspirasi yang aktif, dialogis, dan
                      berkelanjutan.
                    </span>
                  </li>
                  <li className="flex gap-2">
                    <span className="font-semibold text-slate-900">2.</span>
                    <span>
                      Mendorong peningkatan kualitas pembelajaran organisasi dan
                      kepemimpinan mahasiswa melalui program pengembangan soft
                      skill, manajerial, dan profesionalisme yang terarah.
                    </span>
                  </li>
                  <li className="flex gap-2">
                    <span className="font-semibold text-slate-900">3.</span>
                    <span>
                      Mengembangkan budaya kajian dan advokasi yang konstruktif
                      dan solutif sebagai landasan pengambilan sikap BEM
                      terhadap isu-isu yang ada.
                    </span>
                  </li>
                  <li className="flex gap-2">
                    <span className="font-semibold text-slate-900">4.</span>
                    <span>
                      Memperkuat sinergi dan kolaborasi internal maupun
                      eksternal melalui kerja sama antar lembaga mahasiswa serta
                      partisipasi aktif dalam kegiatan yang berdampak positif.
                    </span>
                  </li>
                  <li className="flex gap-2">
                    <span className="font-semibold text-slate-900">5.</span>
                    <span>
                      Meningkatkan kualitas dan kuantitas informasi yang
                      disajikan kepada mahasiswa dan masyarakat melalui berbagai
                      media.
                    </span>
                  </li>
                </ol>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex flex-col items-center justify-center space-y-10"
            >
              <div className="relative flex h-40 w-40 items-center justify-center rounded-full border-4 border-amber-400 bg-white p-4 shadow-xl">
                <img
                  src="/images/logo.png"
                  alt="Logo BEM Polsri"
                  className="h-24 w-24 object-contain"
                />
              </div>

              <div className="w-full rounded-2xl border border-amber-300/60 bg-white/90 p-6 text-center shadow-lg backdrop-blur-sm sm:p-8">
                <span className="text-3xl font-serif text-amber-400">“</span>
                <p className="mt-[-10px] text-lg font-semibold italic text-slate-800">
                  Kabinet Kilau Gemilang
                </p>
                <p className="mt-3 text-xs font-bold uppercase tracking-widest text-amber-600">
                  - BEM POLSRI 2026 -
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* SECTION KETUA UMUM BEM */}
        <section
          id="ketua-umum"
          className="mx-auto max-w-7xl px-5 pb-12 pt-4 lg:px-8"
        >
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-8 text-center"
          >
            <h2 className="text-3xl font-black uppercase tracking-wider text-amber-500 sm:text-4xl">
              Pejabat Teras
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="rounded-3xl border border-amber-200/80 bg-white/90 p-6 shadow-xl backdrop-blur-md sm:p-8 md:p-10"
          >
            <div className="grid gap-8 lg:grid-cols-12 lg:items-center lg:gap-10">
              <div className="flex flex-col justify-between lg:col-span-7">
                <div>
                  <div className="mb-2">
                    <Quote
                      size={36}
                      className="rotate-180 text-amber-500 fill-amber-500/20 stroke-[1.5]"
                    />
                  </div>

                  <h3 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl lg:text-3xl">
                    Ketua Umum BEM Politeknik Sriwijaya
                  </h3>

                  <div className="my-6 border-l-4 border-amber-400 pl-4 py-0.5">
                    <p className="text-sm font-normal italic leading-relaxed text-slate-600 sm:text-base">
                      "Mahasiswa bukan hanya bagian dari perubahan, tetapi
                      merupakan penggerak utama perubahan itu sendiri. Bersama,
                      kita wujudkan Kabinet Kilau Gemilang yang berdampak,
                      inklusif, dan berkelanjutan."
                    </p>
                  </div>
                </div>

                <div className="border-t border-slate-200/80 pt-5">
                  <h4 className="text-lg font-bold text-slate-900 sm:text-xl">
                    Achmad Jemmy Ramadhan
                  </h4>
                  <div className="mt-1 space-y-0.5 text-xs font-semibold sm:text-sm">
                   
                    <a
                      href="https://www.instagram.com/achmdjmmyr_/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 pt-1 text-slate-600 hover:text-amber-600 transition-colors"
                    >
                      <Instagram size={15} className="text-amber-500" />
                      <span>@achmdjmmyr_</span>
                    </a>
                  </div>

                  <div className="mt-2 flex justify-end">
                    <Quote
                      size={36}
                      className="text-amber-500 fill-amber-500/20 stroke-[1.5]"
                    />
                  </div>
                </div>
              </div>

              <div className="lg:col-span-5 flex justify-center items-center">
                <div className="relative overflow-hidden rounded-2xl border-2 border-amber-300/80 bg-slate-100 shadow-xl w-full h-[360px] sm:h-[420px]">
                  <img
                    src="/images/Pejabat_Teras/Ketua Umum BEM.png"
                    alt="Achmad Jemmy Ramadhan - Ketua Umum BEM Politeknik Sriwijaya"
                    className="h-full w-full object-cover object-center filter contrast-[1.02] brightness-[1.01] transition-all duration-300 hover:scale-105"
                  />
                </div>
              </div>
            </div>
          </motion.div>
        </section>

        {/* ====================================================== */}
        {/* SECTION CAROUSEL SLIDER OTOMATIS (AUTO-SLIDE) */}
        {/* ====================================================== */}
        <section
          id="pejabat-teras-bem"
          className="mx-auto max-w-7xl px-5 pb-16 pt-2 lg:px-8"
        >
          <div
            className="relative"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            onTouchStart={() => setIsPaused(true)}
            onTouchEnd={() => setIsPaused(false)}
          >
            {/* NAVIGASI TOMBOL SLIDER (KANAN ATAS) */}
            <div className="mb-6 flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-widest text-slate-400">
             
              </span>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={prevSlide}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white/90 shadow-md text-slate-700 backdrop-blur-sm transition-all hover:bg-amber-50 hover:text-amber-600 active:scale-95"
                  aria-label="Previous Slide"
                >
                  <ChevronLeft size={20} />
                </button>
                <button
                  type="button"
                  onClick={nextSlide}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white/90 shadow-md text-slate-700 backdrop-blur-sm transition-all hover:bg-amber-50 hover:text-amber-600 active:scale-95"
                  aria-label="Next Slide"
                >
                  <ChevronRight size={20} />
                </button>
              </div>
            </div>

            {/* SLIDER CAROUSEL TRACK (ANIMATED WITH FRAMER MOTION) */}
            <div className="overflow-hidden rounded-2xl py-2">
              <motion.div
                className="flex cursor-grab active:cursor-grabbing"
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.2}
                onDragEnd={handleDragEnd}
                animate={{
                  x: `-${currentIndex * (100 / itemsPerPage)}%`,
                }}
                transition={{
                  type: "spring",
                  stiffness: 200,
                  damping: 25,
                }}
              >
                {pejabatTerasData.map((item, idx) => (
                  <div
                    key={idx}
                    className="w-full shrink-0 px-3 sm:w-1/2 lg:w-1/4 select-none"
                  >
                    <motion.div
                      whileHover={{ y: -6 }}
                      transition={{ duration: 0.2 }}
                      className="group flex h-full flex-col overflow-hidden rounded-2xl border border-amber-200/80 bg-white/90 shadow-lg backdrop-blur-md transition-all duration-300 hover:shadow-2xl"
                    >
                      {/* FOTO CONTAINER */}
                      <div className="relative h-[320px] w-full overflow-hidden bg-slate-100 sm:h-[340px]">
                        <img
                          src={item.foto}
                          alt={item.nama}
                          draggable={false}
                          className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                        />
                      </div>

                      {/* DETAIL TEKS */}
                      <div className="flex flex-1 flex-col justify-between p-5">
                        <div>
                          <h4 className="text-base font-bold text-slate-900 sm:text-lg">
                            {item.nama}
                          </h4>
                          <p className="mt-1 text-xs font-semibold text-amber-600 sm:text-sm">
                            {item.jabatan}
                          </p>
                        </div>

                        <div className="mt-4 border-t border-slate-200/80 pt-3">
                          <a
                            href={item.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-600 transition-colors hover:text-amber-600 sm:text-sm"
                          >
                            <Instagram size={15} className="text-amber-500" />
                            <span>{item.instagram}</span>
                          </a>
                        </div>
                      </div>
                    </motion.div>
                  </div>
                ))}
              </motion.div>
            </div>

            {/* DOTS INDICATOR */}
            <div className="mt-8 flex justify-center gap-2">
              {Array.from({ length: maxIndex + 1 }).map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  className={`h-2.5 rounded-full transition-all duration-300 ${
                    currentIndex === idx
                      ? "w-8 bg-amber-500"
                      : "w-2.5 bg-slate-300 hover:bg-slate-400"
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>
          </div>
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
                    <h2 className="font-bold">Kabinet Kilau Gemilang</h2>
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
                  <Link to="/about" className="hover:text-white">
                    Tentang Kami
                  </Link>
                  <Link to="/calendar" className="hover:text-white">
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
