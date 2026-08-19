import React, { useState, useRef, useEffect, MouseEvent } from "react";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  ChevronDown,
  Menu,
  X,
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize,
  Sparkles,
  Target,
  Users,
  Award,
} from "lucide-react";

// --- TYPES & INTERFACES ---
interface MissionItem {
  id: string;
  desc: string;
}

interface StatItem {
  id: string;
  value: string;
  label: string;
  sublabel: string;
}

interface TeamMember {
  name: string;
  role: string;
  dept: string;
  image: string;
}

export default function About(): React.ReactElement {
  // --- NAVBAR STATE ---
  const [mobileOpen, setMobileOpen] = useState<boolean>(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = (): void => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleDropdown = (name: string): void => {
    setOpenDropdown(openDropdown === name ? null : name);
  };

  const closeMenus = (): void => {
    setMobileOpen(false);
    setOpenDropdown(null);
  };

  // --- VIDEO PLAYER STATE & INTERACTION ---
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(true);
  const [isVideoHovered, setIsVideoHovered] = useState<boolean>(false);

  const togglePlay = (): void => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
        setIsPlaying(false);
      } else {
        videoRef.current.play();
        setIsPlaying(true);
      }
    }
  };

  const toggleMute = (e: MouseEvent<HTMLButtonElement>): void => {
    e.stopPropagation();
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const toggleFullscreen = (e: MouseEvent<HTMLButtonElement>): void => {
    e.stopPropagation();
    if (videoRef.current) {
      if (videoRef.current.requestFullscreen) {
        videoRef.current.requestFullscreen();
      } else if ((videoRef.current as any).webkitRequestFullscreen) {
        (videoRef.current as any).webkitRequestFullscreen();
      }
    }
  };

  // --- PARALLAX ANIMATION HOOKS ---
  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 500], [0, 80]);
  const opacityHero = useTransform(scrollY, [0, 300], [1, 0.3]);

  // --- STATISTIK ORGANISASI DATA ---
  const statsData: StatItem[] = [
    {
      id: "01",
      value: "01",
      label: "Kabinet",
      sublabel: "Kilau Gemilang",
    },
    {
      id: "02",
      value: "2025/2026",
      label: "Periode",
      sublabel: "Kepengurusan",
    },
    {
      id: "03",
      value: "[XX+]",
      label: "Program Kerja",
      sublabel: "Berdampak Nyata",
    },
    {
      id: "04",
      value: "[XX+]",
      label: "Fungsionaris",
      sublabel: "Penggerak Sinergi",
    },
  ];

  // --- UPDATE VISI & MISI BEM POLSRI 2026 ---
  const visiText: string =
    "Menjadikan Badan Eksekutif Mahasiswa Politeknik Negeri Sriwijaya sebagai lembaga yang berdampak positif bagi Mahasiswa/i dan Institusi Politeknik Negeri Sriwijaya";

  const misiData: MissionItem[] = [
    {
      id: "01",
      desc: "Mewadahi dan memperjuangkan aspirasi mahasiswa secara terbuka, responsif, dan bertanggung jawab melalui mekanisme penyerapan aspirasi yang aktif, dialogis, dan berkelanjutan.",
    },
    {
      id: "02",
      desc: "Mendorong peningkatan kualitas pembelajaran organisasi dan kepemimpinan mahasiswa melalui program pengembangan soft skill, manajerial, dan profesionalisme yang terarah.",
    },
    {
      id: "03",
      desc: "Mengembangkan budaya kajian dan advokasi yang konstruktif dan solutif sebagai landasan pengambilan sikap BEM terhadap isu-isu yang ada.",
    },
    {
      id: "04",
      desc: "Memperkuat sinergi dan kolaborasi internal maupun eksternal melalui kerja sama antar lembaga mahasiswa serta partisipasi aktif dalam kegiatan yang berdampak positif.",
    },
    {
      id: "05",
      desc: "Meningkatkan kualitas dan kuantitas informasi yang disajikan kepada mahasiswa dan masyarakat melalui berbagai media.",
    },
  ];

  // --- TEAM PREVIEW DATA ---
  const teamMembers: TeamMember[] = [
    {
      name: "[NAMA MENTERI/KORPUS]",
      role: "Menteri / Koordinator",
      dept: "Kementerian Dalam Negeri",
      image: "/images/placeholder-avatar.jpg",
    },
    {
      name: "[NAMA MENTERI/KORPUS]",
      role: "Menteri / Koordinator",
      dept: "Kementerian Luar Negeri",
      image: "/images/placeholder-avatar.jpg",
    },
    {
      name: "[NAMA MENTERI/KORPUS]",
      role: "Menteri / Koordinator",
      dept: "Kementerian Perhubungan & Advokasi",
      image: "/images/placeholder-avatar.jpg",
    },
    {
      name: "[NAMA MENTERI/KORPUS]",
      role: "Menteri / Koordinator",
      dept: "Kementerian Riset & Inovasi",
      image: "/images/placeholder-avatar.jpg",
    },
  ];

  return (
    <main className="relative min-h-screen overflow-x-hidden bg-[url('/images/bgweb.jpeg')] bg-cover bg-fixed bg-center bg-no-repeat text-[#24344D] selection:bg-[#F39A0A] selection:text-white font-sans">
      {/* OVERLAY UNTUK MENJAGA TRANSPARANSI BGWEB */}
      <div className="min-h-screen bg-[#FFFDF8]/85 backdrop-blur-[2px]">
        {/* ==================== NAVBAR ==================== */}
        <header
          className={`fixed inset-x-0 top-0 z-[100] transition-all duration-300 ${
            scrolled
              ? "border-b border-slate-200/70 bg-white/80 shadow-sm backdrop-blur-xl"
              : "border-b border-white/20 bg-white/20 backdrop-blur-md"
          }`}
        >
          <div className="w-full">
            <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between px-5 lg:px-8">
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

              <nav className="hidden items-center gap-1 lg:flex">
                <Link
                  to="/"
                  className="rounded-lg px-3.5 py-2 text-sm font-medium text-slate-600 outline-none transition-all hover:bg-white/55 hover:text-[#F39A0A]"
                  onClick={closeMenus}
                >
                  Home
                </Link>

                <Link
                  to="/about"
                  className="rounded-lg px-3.5 py-2 text-sm font-semibold text-[#F39A0A] bg-white/60 outline-none transition-all"
                  onClick={closeMenus}
                >
                  About
                </Link>

                <div className="relative">
                  <button
                    type="button"
                    onClick={() => toggleDropdown("academic")}
                    className={`flex items-center gap-1 rounded-lg px-3.5 py-2 text-sm font-medium outline-none transition-all ${
                      openDropdown === "academic"
                        ? "bg-white/60 text-[#F39A0A]"
                        : "text-slate-600 hover:bg-white/55 hover:text-[#F39A0A]"
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
                        className="block rounded-lg px-3 py-2.5 text-xs font-semibold text-slate-600 outline-none transition-all duration-200 ease-out hover:bg-amber-50 hover:text-amber-700 active:scale-[0.99] focus-visible:ring-2 focus-visible:ring-amber-400/50"
                        onClick={closeMenus}
                      >
                        Academic Calendar
                      </Link>

                      <a
                        href="#agenda"
                        className="block rounded-lg px-3 py-2.5 text-xs font-semibold text-slate-600 outline-none transition-all duration-200 ease-out hover:bg-amber-50 hover:text-amber-700 active:scale-[0.99] focus-visible:ring-2 focus-visible:ring-amber-400/50"
                        onClick={closeMenus}
                      >
                        Scholarship Info
                      </a>

                      <a
                        href="#agenda"
                        className="block rounded-lg px-3 py-2.5 text-xs font-semibold text-slate-600 outline-none transition-all duration-200 ease-out hover:bg-amber-50 hover:text-amber-700 active:scale-[0.99] focus-visible:ring-2 focus-visible:ring-amber-400/50"
                        onClick={closeMenus}
                      >
                        Organisasi Mahasiswa
                      </a>

                      <a
                        href="#agenda"
                        className="block rounded-lg px-3 py-2.5 text-xs font-semibold text-slate-600 outline-none transition-all duration-200 ease-out hover:bg-amber-50 hover:text-amber-700 active:scale-[0.99] focus-visible:ring-2 focus-visible:ring-amber-400/50"
                        onClick={closeMenus}
                      >
                        Mahasiswa Berdampak
                      </a>
                    </div>
                  )}
                </div>

                <div className="relative">
                  <button
                    type="button"
                    onClick={() => toggleDropdown("echo")}
                    className={`flex items-center gap-1 rounded-lg px-3.5 py-2 text-sm font-medium outline-none transition-all ${
                      openDropdown === "echo"
                        ? "bg-white/60 text-[#F39A0A]"
                        : "text-slate-600 hover:bg-white/55 hover:text-[#F39A0A]"
                    }`}
                  >
                    Campus Echo
                    <ChevronDown
                      size={14}
                      className={`transition-transform ${
                        openDropdown === "echo" ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {openDropdown === "echo" && (
                    <div className="absolute left-0 top-full mt-2 w-52 overflow-hidden rounded-xl border border-slate-200/70 bg-white/95 p-1.5 shadow-xl backdrop-blur-xl">
                      <Link
                        to="/kajian"
                        className="block rounded-lg px-3 py-2.5 text-xs font-semibold text-slate-600 hover:bg-amber-50 hover:text-[#F39A0A]"
                        onClick={closeMenus}
                      >
                        Kajian
                      </Link>
                      <Link
                        to="/bisik-kampus"
                        className="block rounded-lg px-3 py-2.5 text-xs font-semibold text-slate-600 hover:bg-amber-50 hover:text-[#F39A0A]"
                        onClick={closeMenus}
                      >
                        Bisik Kampus
                      </Link>
                    </div>
                  )}
                </div>

                <Link
                  to="/contact"
                  className="ml-1 rounded-lg px-3.5 py-2 text-sm font-medium text-slate-600 hover:bg-white/50 hover:text-[#F39A0A]"
                  onClick={closeMenus}
                >
                  Contact Us
                </Link>
              </nav>

              <button
                type="button"
                className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/40 bg-white/40 text-slate-700 lg:hidden"
                onClick={() => setMobileOpen(!mobileOpen)}
              >
                {mobileOpen ? <X size={21} /> : <Menu size={21} />}
              </button>
            </div>
          </div>
        </header>

        {/* MOBILE MENU */}
        {mobileOpen && (
          <div className="fixed inset-x-0 top-[72px] z-[99] border-b border-slate-200 bg-white/95 p-5 shadow-2xl backdrop-blur-xl lg:hidden">
            <div className="flex flex-col gap-3">
              <Link
                to="/"
                className="rounded-lg px-3 py-2 text-sm font-medium text-slate-700 hover:bg-amber-50 hover:text-[#F39A0A]"
                onClick={closeMenus}
              >
                Home
              </Link>
              <Link
                to="/about"
                className="rounded-lg bg-amber-50 px-3 py-2 text-sm font-bold text-[#F39A0A]"
                onClick={closeMenus}
              >
                About Us
              </Link>
              <Link
                to="/calendar"
                className="rounded-lg px-3 py-2 text-sm font-medium text-slate-700 hover:bg-amber-50 hover:text-[#F39A0A]"
                onClick={closeMenus}
              >
                Academic Calendar
              </Link>
              <Link
                to="/contact"
                className="rounded-lg px-3 py-2 text-sm font-medium text-slate-700 hover:bg-amber-50 hover:text-[#F39A0A]"
                onClick={closeMenus}
              >
                Contact Us
              </Link>
            </div>
          </div>
        )}

        {/* ==================== 1. HERO — TENTANG KAMI ==================== */}
        <section className="relative min-h-[88vh] flex items-center justify-center px-5 pt-28 pb-16 lg:px-8 overflow-hidden">
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[550px] h-[550px] bg-gradient-to-tr from-[#F5D98A]/30 to-[#F39A0A]/20 rounded-full blur-3xl pointer-events-none -z-10" />

          <motion.div
            style={{ y: heroY, opacity: opacityHero }}
            className="mx-auto max-w-7xl w-full grid items-center gap-12 lg:grid-cols-12"
          >
            <div className="lg:col-span-7 text-center lg:text-left">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="inline-flex items-center gap-2 rounded-full border border-[#D4AF37]/40 bg-[#FFF8E7]/80 px-4 py-1.5 text-xs font-bold text-[#D4AF37] shadow-sm backdrop-blur-md"
              >
                <Sparkles size={14} className="animate-pulse text-[#F39A0A]" />
                BEM POLITEKNIK NEGERI SRIWIJAYA
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.1 }}
                className="mt-4 font-serif text-4xl sm:text-6xl md:text-7xl font-black uppercase tracking-tight text-[#24344D] leading-[1.05]"
              >
                TENTANG{" "}
                <span className="text-[#F39A0A] drop-shadow-sm">KAMI</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.2 }}
                className="mt-3 text-lg sm:text-2xl font-bold tracking-wide text-[#D4AF37] italic"
              >
                "Menyala Membara, Berkarya Bersama"
              </motion.p>

              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.3 }}
                className="mt-6 max-w-2xl text-sm sm:text-base leading-relaxed text-slate-600 font-medium"
              >
                Badan Eksekutif Mahasiswa (BEM) Politeknik Negeri Sriwijaya
                adalah poros penggerak keberlanjutan karya, pergerakan, dan
                pelayanan mahasiswa. Kami berdiri kokoh untuk melayani,
                memperjuangkan aspirasi, dan menciptakan inovasi yang berdampak
                nyata bagi civitas akademika serta masyarakat luas.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.4 }}
                className="mt-8 flex flex-wrap items-center justify-center lg:justify-start gap-4"
              >
                <a
                  href="#siapa-kami"
                  className="rounded-xl bg-gradient-to-r from-[#F39A0A] to-[#D4AF37] px-6 py-3.5 text-xs sm:text-sm font-bold uppercase tracking-wider text-white shadow-lg shadow-[#F39A0A]/25 transition-all hover:scale-105 hover:shadow-xl active:scale-95"
                >
                  Jelajahi Perjalanan
                </a>
                <a
                  href="#struktur-organisasi"
                  className="rounded-xl border border-[#D4AF37]/40 bg-white/60 px-6 py-3.5 text-xs sm:text-sm font-bold uppercase tracking-wider text-[#24344D] backdrop-blur-md transition-all hover:bg-white hover:text-[#F39A0A] hover:border-[#F39A0A]"
                >
                  Lihat Struktur
                </a>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="lg:col-span-5 flex justify-center relative"
            >
              <div className="relative w-64 sm:w-80 lg:w-96 aspect-square rounded-full bg-gradient-to-br from-[#FFF8E7] via-white to-[#F5D98A]/30 p-4 shadow-2xl border border-white/80 backdrop-blur-md flex items-center justify-center">
                <div className="absolute inset-2 rounded-full border-2 border-dashed border-[#D4AF37]/40 animate-[spin_40s_linear_infinite]" />
                <div className="absolute inset-6 rounded-full border border-[#F39A0A]/20" />

                <motion.img
                  src="/images/logo.png"
                  alt="Logo BEM Polsri"
                  className="w-44 sm:w-56 lg:w-64 object-contain drop-shadow-xl"
                  animate={{ y: [0, -10, 0] }}
                  transition={{
                    duration: 5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
              </div>
            </motion.div>
          </motion.div>
        </section>

        {/* ==================== 2. WHO WE ARE / SIAPA KAMI ==================== */}
        <section id="siapa-kami" className="relative py-20 px-5 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="grid gap-12 lg:grid-cols-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
                className="lg:col-span-5 relative"
              >
                <span className="text-xs font-black uppercase tracking-[0.2em] text-[#F39A0A]">
                  Latar Belakang Organisasi
                </span>
                <h2 className="mt-2 text-3xl sm:text-5xl font-black font-serif text-[#24344D] uppercase leading-tight">
                  SIAPA <br />
                  <span className="text-[#D4AF37]">KAMI?</span>
                </h2>
                <div className="mt-6 rounded-2xl border border-amber-200/60 bg-white/70 p-6 shadow-xl backdrop-blur-md relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-[#F5D98A]/20 rounded-bl-full pointer-events-none" />
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                    Lembaga Eksekutif Mahasiswa
                  </p>
                  <p className="mt-2 text-2xl font-serif font-black text-[#24344D]">
                    Politeknik Negeri Sriwijaya
                  </p>
                  <p className="mt-4 text-xs font-semibold text-slate-500 leading-relaxed">
                    Menjadi wadah inklusif yang menampung, mengolah, dan
                    menyalurkan karya serta aspirasi seluruh civitas akademika
                    Polsri.
                  </p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
                className="lg:col-span-7 space-y-6 text-slate-700 text-sm sm:text-base leading-relaxed font-medium"
              >
                <div className="rounded-2xl border border-white/80 bg-white/60 p-6 sm:p-8 shadow-sm backdrop-blur-md">
                  <p>
                    <strong className="text-[#24344D] font-bold">
                      Badan Eksekutif Mahasiswa Politeknik Negeri Sriwijaya
                    </strong>{" "}
                    adalah lembaga eksekutif tertinggi di tingkat perguruan
                    tinggi yang memegang amanah untuk menjalankan roda
                    organisasi, advokasi, dan pelayanan mahasiswa secara
                    terpadu.
                  </p>
                  <p className="mt-4">
                    Melalui semangat{" "}
                    <em className="text-[#F39A0A] font-semibold">
                      "Menyala Membara, Berkarya Bersama"
                    </em>
                    , BEM Polsri bertindak sebagai jembatan aspirasi antara
                    mahasiswa dan pihak rektorat, sekaligus menjadi agen
                    perubahan dalam ranah sosial kemasyarakatan.
                  </p>
                  <p className="mt-4">
                    Setiap kementerian dan dinas di dalam tubuh BEM Polsri
                    bekerja secara sinergis, menghadirkan program kerja unggulan
                    yang inklusif, relevan dengan tantangan zaman, serta
                    berorientasi pada pengembangan potensi vokasi generasi muda
                    Indonesia.
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ==================== 3. STATISTIK ORGANISASI ==================== */}
        <section className="relative py-16 px-5 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6"
            >
              {statsData.map((stat: StatItem, idx: number) => (
                <motion.div
                  key={stat.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className="rounded-2xl border border-white/80 bg-gradient-to-b from-white/80 to-[#FFF8E7]/80 p-6 text-center shadow-md backdrop-blur-md transition-all duration-300 hover:scale-105 hover:border-[#F39A0A]/50"
                >
                  <span className="text-[10px] font-black uppercase tracking-widest text-[#D4AF37]">
                    {stat.id}
                  </span>
                  <p className="mt-2 text-3xl sm:text-5xl font-black font-serif text-[#24344D]">
                    {stat.value}
                  </p>
                  <p className="mt-2 text-xs sm:text-sm font-bold uppercase tracking-wider text-[#F39A0A]">
                    {stat.label}
                  </p>
                  <p className="text-[11px] font-semibold text-slate-500">
                    {stat.sublabel}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ==================== 4. VIDEO STRUKTUR ORGANISASI ==================== */}
        <section
          id="struktur-organisasi"
          className="relative py-20 px-5 lg:px-8"
        >
          <div className="mx-auto max-w-7xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center max-w-3xl mx-auto"
            >
              <span className="inline-flex items-center gap-1.5 rounded-full bg-[#FFF8E7] border border-[#D4AF37]/30 px-4 py-1.5 text-[11px] font-bold uppercase tracking-widest text-[#D4AF37]">
                <Users size={13} className="text-[#F39A0A]" />
                SATU VISI, BANYAK PERAN
              </span>
              <h2 className="mt-4 font-serif text-3xl sm:text-5xl font-black uppercase text-[#24344D]">
                Kenali Struktur & Penggerak Organisasi
              </h2>
              <p className="mt-3 text-sm sm:text-base text-slate-600 font-medium leading-relaxed">
                Setiap langkah kami lahir dari kerja bersama. Kenali struktur
                dan orang-orang yang menggerakkan BEM Politeknik Negeri
                Sriwijaya.
              </p>
            </motion.div>

            {/* VIDEO CONTAINER */}
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="mt-10 relative mx-auto max-w-5xl rounded-3xl border-2 border-white/80 bg-slate-900 shadow-2xl overflow-hidden group"
              onMouseEnter={() => setIsVideoHovered(true)}
              onMouseLeave={() => setIsVideoHovered(false)}
            >
              <div className="relative aspect-video w-full bg-slate-950 flex items-center justify-center">
                <video
                  ref={videoRef}
                  src="/videos/struktur-organisasi.mp4"
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.01]"
                  loop
                  playsInline
                  muted={isMuted}
                  onClick={togglePlay}
                />

                <div
                  className={`absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-slate-950/40 transition-opacity duration-300 ${
                    isPlaying && !isVideoHovered ? "opacity-0" : "opacity-100"
                  }`}
                  onClick={togglePlay}
                />

                <div className="absolute top-4 left-4 sm:top-6 sm:left-6 z-20 pointer-events-none">
                  <span className="inline-block rounded-md bg-[#24344D]/80 backdrop-blur-md px-3 py-1 text-[10px] sm:text-xs font-black uppercase tracking-wider text-[#F5D98A] border border-white/10">
                    STRUKTUR ORGANISASI
                  </span>
                  <h3 className="mt-1 text-xs sm:text-sm font-bold text-white tracking-wide drop-shadow-md">
                    BEM POLITEKNIK NEGERI SRIWIJAYA
                  </h3>
                </div>

                <button
                  type="button"
                  onClick={togglePlay}
                  className={`absolute z-30 flex h-16 w-16 sm:h-20 sm:w-20 items-center justify-center rounded-full bg-[#F39A0A]/90 text-white shadow-2xl backdrop-blur-md transition-all duration-300 hover:scale-110 hover:bg-[#F39A0A] active:scale-95 ${
                    isPlaying && !isVideoHovered
                      ? "opacity-0 scale-75"
                      : "opacity-100 scale-100"
                  }`}
                  aria-label={isPlaying ? "Pause Video" : "Play Video"}
                >
                  {isPlaying ? (
                    <Pause className="w-8 h-8 sm:w-10 sm:h-10 fill-current" />
                  ) : (
                    <Play className="w-8 h-8 sm:w-10 sm:h-10 fill-current ml-1" />
                  )}
                </button>

                <div
                  className={`absolute bottom-0 inset-x-0 z-20 flex items-center justify-between p-4 sm:p-6 transition-opacity duration-300 ${
                    isPlaying && !isVideoHovered ? "opacity-0" : "opacity-100"
                  }`}
                >
                  <button
                    type="button"
                    onClick={togglePlay}
                    className="flex items-center gap-2 text-xs font-bold text-white hover:text-[#F5D98A] transition-colors"
                  >
                    {isPlaying ? <Pause size={18} /> : <Play size={18} />}
                    <span>{isPlaying ? "PAUSE" : "PLAY VIDEO"}</span>
                  </button>

                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={toggleMute}
                      className="rounded-lg bg-white/10 p-2 text-white hover:bg-white/20 transition-all"
                      aria-label="Mute/Unmute"
                    >
                      {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
                    </button>
                    <button
                      type="button"
                      onClick={toggleFullscreen}
                      className="rounded-lg bg-white/10 p-2 text-white hover:bg-white/20 transition-all"
                      aria-label="Fullscreen"
                    >
                      <Maximize size={18} />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ==================== 5. VISION & MISSION (TEKS TERBARU 2026) ==================== */}
        <section id="visi-misi" className="relative py-20 px-5 lg:px-8">
          <div className="mx-auto max-w-7xl">
            {/* VISI */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="rounded-3xl border border-white/90 bg-gradient-to-br from-white/90 via-white/70 to-[#FFF8E7]/90 p-8 sm:p-12 shadow-xl backdrop-blur-md relative overflow-hidden"
            >
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-[#F39A0A]/10 rounded-full blur-2xl" />

              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#F39A0A] text-white shadow-md">
                  <Target size={20} />
                </div>
                <div>
                  <span className="text-[10px] font-black uppercase tracking-widest text-[#F39A0A]">
                    Arah Pergerakan
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-black font-serif text-[#24344D]">
                    VISI BEM POLSRI
                  </h2>
                </div>
              </div>

              <blockquote className="mt-6 border-l-4 border-[#F39A0A] pl-4 sm:pl-6 text-lg sm:text-2xl font-serif italic font-semibold text-[#24344D] leading-relaxed">
                "{visiText}"
              </blockquote>
            </motion.div>

            {/* MISI */}
            <div className="mt-12">
              <div className="mb-8 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#24344D] text-white shadow-md">
                  <Award size={20} />
                </div>
                <div>
                  <span className="text-[10px] font-black uppercase tracking-widest text-[#D4AF37]">
                    Langkah Strategis
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-black font-serif text-[#24344D]">
                    MISI ORGANISASI
                  </h2>
                </div>
              </div>

              <div className="grid gap-4 sm:gap-6 md:grid-cols-2">
                {misiData.map((misi: MissionItem, index: number) => (
                  <motion.div
                    key={misi.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="group relative rounded-2xl border border-white/80 bg-white/70 p-6 shadow-sm transition-all duration-300 hover:border-[#F39A0A]/50 hover:bg-white hover:shadow-xl backdrop-blur-md"
                  >
                    <div className="flex items-start gap-4">
                      <span className="font-serif text-3xl font-black text-[#D4AF37] transition-colors duration-300 group-hover:text-[#F39A0A]">
                        {misi.id}
                      </span>
                      <div>
                        <p className="text-xs sm:text-sm leading-relaxed text-[#24344D] font-medium pt-1">
                          {misi.desc}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ==================== 6. PENGURUS INTI (KETUA & WAKIL KETUA) ==================== */}
        <section className="relative py-20 px-5 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center max-w-2xl mx-auto mb-16"
            >
              <span className="text-xs font-black uppercase tracking-widest text-[#F39A0A]">
                Kepemimpinan
              </span>
              <h2 className="mt-2 text-3xl sm:text-5xl font-black font-serif text-[#24344D] uppercase">
                PENGURUS INTI
              </h2>
            </motion.div>

            <div className="grid gap-12 lg:grid-cols-2">
              {/* KETUA BEM */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
                className="group relative rounded-3xl border border-white/80 bg-white/60 p-6 sm:p-8 shadow-xl backdrop-blur-md flex flex-col sm:flex-row items-center gap-8 overflow-hidden"
              >
                <div className="relative w-48 h-60 sm:w-56 sm:h-72 rounded-2xl bg-gradient-to-tr from-[#FFF8E7] to-[#F5D98A]/40 overflow-hidden shrink-0 border border-amber-200">
                  <img
                    src="/images/placeholder-avatar.jpg"
                    alt="President BEM Polsri"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="text-center sm:text-left">
                  <span className="text-[10px] font-black uppercase tracking-widest text-[#F39A0A]">
                    KETUA BEM
                  </span>
                  <h3 className="mt-2 text-2xl font-serif font-black text-[#24344D]">
                    [NAMA KETUA BEM]
                  </h3>
                  <p className="mt-1 text-xs font-bold text-[#D4AF37] uppercase tracking-wider">
                    Presiden Mahasiswa
                  </p>
                  <p className="mt-4 text-xs text-slate-500 font-medium leading-relaxed">
                    Memimpin dan menahkodai pergerakan BEM Polsri dalam
                    menghadirkan kepemimpinan yang responsif, inklusif, serta
                    berdampak.
                  </p>
                </div>
              </motion.div>

              {/* WAKIL KETUA BEM */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.2 }}
                className="group relative rounded-3xl border border-white/80 bg-white/60 p-6 sm:p-8 shadow-xl backdrop-blur-md flex flex-col sm:flex-row items-center gap-8 overflow-hidden"
              >
                <div className="relative w-48 h-60 sm:w-56 sm:h-72 rounded-2xl bg-gradient-to-tr from-[#FFF8E7] to-[#F5D98A]/40 overflow-hidden shrink-0 border border-amber-200">
                  <img
                    src="/images/placeholder-avatar.jpg"
                    alt="Vice President BEM Polsri"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="text-center sm:text-left">
                  <span className="text-[10px] font-black uppercase tracking-widest text-[#F39A0A]">
                    WAKIL KETUA BEM
                  </span>
                  <h3 className="mt-2 text-2xl font-serif font-black text-[#24344D]">
                    [NAMA WAKIL KETUA]
                  </h3>
                  <p className="mt-1 text-xs font-bold text-[#D4AF37] uppercase tracking-wider">
                    Wakil Presiden Mahasiswa
                  </p>
                  <p className="mt-4 text-xs text-slate-500 font-medium leading-relaxed">
                    Mendampingi serta mengoordinasikan jajaran kementerian untuk
                    memastikan ketercapaian seluruh visi dan misi organisasi.
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ==================== 7. TEAM PREVIEW ==================== */}
        <section className="relative py-20 px-5 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-12 gap-4">
              <div>
                <span className="text-xs font-black uppercase tracking-widest text-[#F39A0A]">
                  Jajaran Kabinet
                </span>
                <h2 className="mt-2 text-3xl font-black font-serif text-[#24344D] uppercase">
                  MENTERI & KOORDINATOR
                </h2>
              </div>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {teamMembers.map((member: TeamMember, idx: number) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className="rounded-2xl border border-white/80 bg-white/60 p-5 shadow-sm backdrop-blur-md transition-all duration-300 hover:scale-105 hover:bg-white hover:shadow-xl"
                >
                  <div className="aspect-square w-full rounded-xl bg-slate-100 overflow-hidden border border-amber-100">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="mt-4">
                    <h3 className="text-sm font-bold text-[#24344D]">
                      {member.name}
                    </h3>
                    <p className="text-[11px] font-bold text-[#F39A0A]">
                      {member.role}
                    </p>
                    <p className="text-[10px] text-slate-500 mt-1">
                      {member.dept}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ==================== FOOTER ==================== */}
        <footer
          id="footer"
          className="bg-[#24344D] px-5 pb-8 pt-16 text-white lg:px-8"
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
                    <h2 className="font-bold text-white">
                      Kabinet Kilau Gemilang
                    </h2>
                    <p className="mt-1 text-xs text-slate-300">
                      BEM Politeknik Negeri Sriwijaya
                    </p>
                  </div>
                </div>

                <p className="mt-6 max-w-xs text-sm leading-7 text-slate-300">
                  Menjadi wadah yang aktif, responsif, dan konstruktif untuk
                  Politeknik Negeri Sriwijaya yang lebih berdampak.
                </p>
              </div>

              <div>
                <h3 className="text-xs font-black uppercase tracking-widest text-[#F5D98A]">
                  Navigasi
                </h3>
                <div className="mt-5 grid gap-3 text-sm text-slate-300">
                  <Link to="/about" className="hover:text-white transition-all">
                    Tentang Kami
                  </Link>
                  <a
                    href="/#agenda"
                    className="hover:text-white transition-all"
                  >
                    Agenda Kegiatan
                  </a>
                  <Link
                    to="/contact"
                    className="hover:text-white transition-all"
                  >
                    Contact Us
                  </Link>
                </div>
              </div>

              <div>
                <h3 className="text-xs font-black uppercase tracking-widest text-[#F5D98A]">
                  Mari Terhubung
                </h3>
                <p className="mt-5 flex items-start gap-2 text-sm leading-6 text-slate-300">
                  <span className="mt-1 shrink-0 text-[#F5D98A]">✉</span>
                  bem@polsri.ac.id
                </p>
                <p className="mt-3 text-sm leading-6 text-slate-300">
                  Jl. Srijaya Negara, Bukit Besar,
                  <br />
                  Palembang, Sumatera Selatan
                </p>
              </div>
            </div>

            <div className="mt-14 border-t border-white/10 pt-6 text-xs text-slate-400">
              <p>© BEM Politeknik Negeri Sriwijaya. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </div>
    </main>
  );
}
