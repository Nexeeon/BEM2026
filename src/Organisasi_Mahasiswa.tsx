import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Menu,
  X,
  ChevronDown,
  ChevronRight,
  ExternalLink,
  Mail,
  MapPin,
  Instagram,
  Youtube,
  Globe,
  Users,
  Award,
  Layers,
  Sparkles,
  ArrowUpRight,
} from "lucide-react";

// Data Organisasi sesuai spesifikasi & urutan asset
const hmjData = [
  { name: "Administrasi Bisnis", image: "/images/HMJ/AB.png", category: "HMJ" },
  { name: "Akuntansi", image: "/images/HMJ/akuntansi.png", category: "HMJ" },
  {
    name: "Bahasa dan Pariwisata",
    image: "/images/HMJ/bahasa dan pariwisata.png",
    category: "HMJ",
  },
  { name: "Teknik Elektro", image: "/images/HMJ/elektro.png", category: "HMJ" },
  { name: "Teknik Mesin", image: "/images/HMJ/mesin.png", category: "HMJ" },
  {
    name: "Manajemen Informatika",
    image: "/images/HMJ/mi.png",
    category: "HMJ",
  },
  {
    name: "Rekayasa Teknologi dan Bisnis Pertanian",
    image: "/images/HMJ/RTBP.png",
    category: "HMJ",
  },
  { name: "Teknik Sipil", image: "/images/HMJ/sipil.png", category: "HMJ" },
  { name: "Teknik Kimia", image: "/images/HMJ/Tekkim.png", category: "HMJ" },
  { name: "Teknik Komputer", image: "/images/HMJ/tekom.png", category: "HMJ" },
];

const ukmData = [
  {
    name: "English Debating Society (EDS)",
    image: "/images/UKM/eds.webp",
    category: "UKM",
  },
  {
    name: "UKM Himpala Bahtera Buana (HBB)",
    image: "/images/UKM/himpala.webp",
    category: "UKM",
  },
  {
    name: "Keluarga Tarbiyah Islamiah (KARISMA)",
    image: "/images/UKM/karisma.webp",
    category: "UKM",
  },
  {
    name: "Mahasiswa Riset dan Sains (MARS)",
    image: "/images/UKM/mars.webp",
    category: "UKM",
  },
  { name: "Olahraga", image: "/images/UKM/olahraga.webp", category: "UKM" },
  { name: "Simpony", image: "/images/UKM/simpony.webp", category: "UKM" },
  {
    name: "Warta Politeknik Sriwijaya (WPS)",
    image: "/images/UKM/wps.webp",
    category: "UKM",
  },
];

const komunitasData = [
  {
    name: "Bujang Gadis Politeknik Negeri Sriwijaya (BGPOL)",
    image: "/images/Komunitas/bgp.webp",
    category: "Komunitas",
  },
  {
    name: "Automation Robotic Club of Sriwijaya (ARCOS)",
    image: "/images/Komunitas/robotik.webp",
    category: "Komunitas",
  },
  {
    name: "Pramuka",
    image: "/images/Komunitas/pramuka.webp",
    category: "Komunitas",
  },
  {
    name: "Entrepreneur (Kewirausahaan) Polsri",
    image: "/images/Komunitas/wirausaha.webp",
    category: "Komunitas",
  },
  {
    name: "MPM Polsri",
    image: "/images/Komunitas/mpm.webp",
    category: "Komunitas",
  },
];

export const OrganisasiMahasiswa: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [academicDropdownOpen, setAcademicDropdownOpen] = useState(false);
  const [campusEchoDropdownOpen, setCampusEchoDropdownOpen] = useState(false);
  const [mobileAcademicOpen, setMobileAcademicOpen] = useState(false);
  const [mobileEchoOpen, setMobileEchoOpen] = useState(false);

  // Handle Navbar Shadow & Background on Scroll
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Smooth scroll handler for filter buttons
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans relative selection:bg-amber-500/30 selection:text-amber-200 overflow-x-hidden">
      {/* BACKGROUND IMAGE WITH OVERLAY */}
      <div
        className="fixed inset-0 z-0 bg-cover bg-center bg-no-repeat opacity-40 pointer-events-none"
        style={{ backgroundImage: `url('/images/bgweb.jpeg')` }}
      />
      <div className="fixed inset-0 z-0 bg-gradient-to-b from-slate-950/90 via-slate-950/80 to-slate-950/95 pointer-events-none" />

      {/* ================= NAVBAR ================= */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-white/80 dark:bg-slate-900/80 backdrop-blur-md shadow-lg border-b border-slate-200 dark:border-slate-800 py-3"
            : "bg-white/60 dark:bg-slate-950/60 backdrop-blur-md border-b border-white/10 py-4"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo & Brand */}
            <Link to="/" className="flex items-center gap-3 group">
              <img
                src="/images/logo.png"
                alt="Logo BEM Polsri"
                className="w-10 h-10 object-contain transition-transform duration-300 group-hover:scale-105"
              />
              <div className="flex flex-col">
                <span className="font-bold text-slate-900 dark:text-white tracking-wide text-sm sm:text-base leading-tight">
                  Kabinet Kilau Gemilang
                </span>
                <span className="text-xs text-amber-600 dark:text-amber-400 font-medium">
                  BEM Politeknik Negeri Sriwijaya
                </span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
              <Link
                to="/"
                className="px-3.5 py-2 rounded-xl text-sm font-medium text-slate-700 dark:text-slate-200 hover:text-amber-600 dark:hover:text-amber-400 hover:bg-slate-100/60 dark:hover:bg-slate-800/60 transition-all"
              >
                Home
              </Link>

              <Link
                to="/about"
                className="px-3.5 py-2 rounded-xl text-sm font-medium text-slate-700 dark:text-slate-200 hover:text-amber-600 dark:hover:text-amber-400 hover:bg-slate-100/60 dark:hover:bg-slate-800/60 transition-all"
              >
                About
              </Link>

              {/* Academic Information Dropdown */}
              <div
                className="relative"
                onMouseEnter={() => setAcademicDropdownOpen(true)}
                onMouseLeave={() => setAcademicDropdownOpen(false)}
              >
                <button className="px-3.5 py-2 rounded-xl text-sm font-medium text-amber-600 dark:text-amber-400 bg-amber-500/10 flex items-center gap-1.5 transition-all">
                  Academic Information
                  <ChevronDown
                    className={`w-4 h-4 transition-transform duration-200 ${academicDropdownOpen ? "rotate-180" : ""}`}
                  />
                </button>

                {academicDropdownOpen && (
                  <div className="absolute top-full left-0 w-60 pt-2 animate-in fade-in slide-in-from-top-2 duration-200">
                    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-xl p-2 backdrop-blur-lg">
                      <Link
                        to="/academic-calendar"
                        className="block px-3.5 py-2.5 rounded-xl text-sm text-slate-700 dark:text-slate-300 hover:bg-amber-500/10 hover:text-amber-600 dark:hover:text-amber-400 transition-colors"
                      >
                        Academic Calendar
                      </Link>
                      <Link
                        to="/scholarship-info"
                        className="block px-3.5 py-2.5 rounded-xl text-sm text-slate-700 dark:text-slate-300 hover:bg-amber-500/10 hover:text-amber-600 dark:hover:text-amber-400 transition-colors"
                      >
                        Scholarship Info
                      </Link>
                      <Link
                        to="/organisasi-mahasiswa"
                        className="block px-3.5 py-2.5 rounded-xl text-sm font-semibold text-amber-600 dark:text-amber-400 bg-amber-500/10 transition-colors"
                      >
                        Organisasi Mahasiswa
                      </Link>
                      <Link
                        to="/mahasiswa-berdampak"
                        className="block px-3.5 py-2.5 rounded-xl text-sm text-slate-700 dark:text-slate-300 hover:bg-amber-500/10 hover:text-amber-600 dark:hover:text-amber-400 transition-colors"
                      >
                        Mahasiswa Berdampak
                      </Link>
                    </div>
                  </div>
                )}
              </div>

              {/* Campus Echo Dropdown */}
              <div
                className="relative"
                onMouseEnter={() => setCampusEchoDropdownOpen(true)}
                onMouseLeave={() => setCampusEchoDropdownOpen(false)}
              >
                <button className="px-3.5 py-2 rounded-xl text-sm font-medium text-slate-700 dark:text-slate-200 hover:text-amber-600 dark:hover:text-amber-400 hover:bg-slate-100/60 dark:hover:bg-slate-800/60 flex items-center gap-1.5 transition-all">
                  Campus Echo
                  <ChevronDown
                    className={`w-4 h-4 transition-transform duration-200 ${campusEchoDropdownOpen ? "rotate-180" : ""}`}
                  />
                </button>

                {campusEchoDropdownOpen && (
                  <div className="absolute top-full left-0 w-48 pt-2 animate-in fade-in slide-in-from-top-2 duration-200">
                    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-xl p-2 backdrop-blur-lg">
                      <Link
                        to="/kajian"
                        className="block px-3.5 py-2.5 rounded-xl text-sm text-slate-700 dark:text-slate-300 hover:bg-amber-500/10 hover:text-amber-600 dark:hover:text-amber-400 transition-colors"
                      >
                        Kajian
                      </Link>
                      <Link
                        to="/bisik-kampus"
                        className="block px-3.5 py-2.5 rounded-xl text-sm text-slate-700 dark:text-slate-300 hover:bg-amber-500/10 hover:text-amber-600 dark:hover:text-amber-400 transition-colors"
                      >
                        Bisik Kampus
                      </Link>
                      <Link
                        to="/polsrifess"
                        className="block px-3.5 py-2.5 rounded-xl text-sm text-slate-700 dark:text-slate-300 hover:bg-amber-500/10 hover:text-amber-600 dark:hover:text-amber-400 transition-colors"
                      >
                        Polsrifess
                      </Link>
                    </div>
                  </div>
                )}
              </div>

              <Link
                to="/contact-us"
                className="px-3.5 py-2 rounded-xl text-sm font-medium text-slate-700 dark:text-slate-200 hover:text-amber-600 dark:hover:text-amber-400 hover:bg-slate-100/60 dark:hover:bg-slate-800/60 transition-all"
              >
                Contact Us
              </Link>
            </nav>

            {/* Mobile Menu Button */}
            <div className="flex items-center lg:hidden">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-xl text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 focus:outline-none"
                aria-label="Toggle Menu"
              >
                {mobileMenuOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden absolute top-full left-0 right-0 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 shadow-2xl p-4 transition-all animate-in slide-in-from-top-4 duration-300">
            <div className="flex flex-col gap-2">
              <Link
                to="/"
                onClick={() => setMobileMenuOpen(false)}
                className="px-4 py-3 rounded-xl text-base font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                Home
              </Link>
              <Link
                to="/about"
                onClick={() => setMobileMenuOpen(false)}
                className="px-4 py-3 rounded-xl text-base font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                About
              </Link>

              {/* Mobile Academic Dropdown */}
              <div>
                <button
                  onClick={() => setMobileAcademicOpen(!mobileAcademicOpen)}
                  className="w-full px-4 py-3 rounded-xl text-base font-medium text-amber-600 dark:text-amber-400 bg-amber-500/10 flex items-center justify-between"
                >
                  <span>Academic Information</span>
                  <ChevronDown
                    className={`w-5 h-5 transition-transform ${mobileAcademicOpen ? "rotate-180" : ""}`}
                  />
                </button>
                {mobileAcademicOpen && (
                  <div className="pl-4 py-2 flex flex-col gap-1 mt-1 border-l-2 border-amber-500/30 ml-4">
                    <Link
                      to="/academic-calendar"
                      onClick={() => setMobileMenuOpen(false)}
                      className="px-3 py-2 rounded-lg text-sm text-slate-600 dark:text-slate-300"
                    >
                      Academic Calendar
                    </Link>
                    <Link
                      to="/scholarship-info"
                      onClick={() => setMobileMenuOpen(false)}
                      className="px-3 py-2 rounded-lg text-sm text-slate-600 dark:text-slate-300"
                    >
                      Scholarship Info
                    </Link>
                    <Link
                      to="/organisasi-mahasiswa"
                      onClick={() => setMobileMenuOpen(false)}
                      className="px-3 py-2 rounded-lg text-sm font-semibold text-amber-600 dark:text-amber-400 bg-amber-500/10"
                    >
                      Organisasi Mahasiswa
                    </Link>
                    <Link
                      to="/mahasiswa-berdampak"
                      onClick={() => setMobileMenuOpen(false)}
                      className="px-3 py-2 rounded-lg text-sm text-slate-600 dark:text-slate-300"
                    >
                      Mahasiswa Berdampak
                    </Link>
                  </div>
                )}
              </div>

              {/* Mobile Campus Echo Dropdown */}
              <div>
                <button
                  onClick={() => setMobileEchoOpen(!mobileEchoOpen)}
                  className="w-full px-4 py-3 rounded-xl text-base font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center justify-between"
                >
                  <span>Campus Echo</span>
                  <ChevronDown
                    className={`w-5 h-5 transition-transform ${mobileEchoOpen ? "rotate-180" : ""}`}
                  />
                </button>
                {mobileEchoOpen && (
                  <div className="pl-4 py-2 flex flex-col gap-1 mt-1 border-l-2 border-amber-500/30 ml-4">
                    <Link
                      to="/kajian"
                      onClick={() => setMobileMenuOpen(false)}
                      className="px-3 py-2 rounded-lg text-sm text-slate-600 dark:text-slate-300"
                    >
                      Kajian
                    </Link>
                    <Link
                      to="/bisik-kampus"
                      onClick={() => setMobileMenuOpen(false)}
                      className="px-3 py-2 rounded-lg text-sm text-slate-600 dark:text-slate-300"
                    >
                      Bisik Kampus
                    </Link>
                    <Link
                      to="/polsrifess"
                      onClick={() => setMobileMenuOpen(false)}
                      className="px-3 py-2 rounded-lg text-sm text-slate-600 dark:text-slate-300"
                    >
                      Polsrifess
                    </Link>
                  </div>
                )}
              </div>

              <Link
                to="/contact-us"
                onClick={() => setMobileMenuOpen(false)}
                className="px-4 py-3 rounded-xl text-base font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                Contact Us
              </Link>
            </div>
          </div>
        )}
      </header>

      {/* Main Content Wrapper */}
      <main className="relative z-10 pt-28 pb-20">
        {/* ================= HERO SECTION ================= */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
          <div className="relative rounded-3xl p-8 sm:p-12 lg:p-16 overflow-hidden border border-slate-700/50 bg-gradient-to-br from-slate-900/90 via-slate-900/70 to-slate-950/90 shadow-2xl backdrop-blur-xl">
            {/* Glow Decorative Elements */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10 max-w-3xl">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs sm:text-sm font-semibold mb-6 tracking-wide uppercase">
                <Sparkles className="w-4 h-4" />
                Kabinet Kilau Gemilang
              </div>

              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-tight mb-6">
                ORGANISASI{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-200">
                  MAHASISWA
                </span>
              </h1>

              <p className="text-base sm:text-xl text-slate-300 font-normal leading-relaxed mb-8">
                "Ruang tumbuh, berkolaborasi, dan berdampak bagi mahasiswa
                Politeknik Negeri Sriwijaya."
              </p>

              {/* Quick Filter Navigation Buttons */}
              <div className="flex flex-wrap gap-3 pt-2">
                <button
                  onClick={() => scrollToSection("section-hmj")}
                  className="px-6 py-3 rounded-2xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-sm transition-all duration-300 shadow-lg shadow-amber-500/20 hover:scale-105 flex items-center gap-2"
                >
                  HMJ <ChevronRight className="w-4 h-4" />
                </button>
                <button
                  onClick={() => scrollToSection("section-ukm")}
                  className="px-6 py-3 rounded-2xl bg-slate-800/80 hover:bg-slate-700 text-white font-semibold text-sm border border-slate-700 transition-all duration-300 hover:scale-105 flex items-center gap-2"
                >
                  UKM <ChevronRight className="w-4 h-4" />
                </button>
                <button
                  onClick={() => scrollToSection("section-komunitas")}
                  className="px-6 py-3 rounded-2xl bg-slate-800/80 hover:bg-slate-700 text-white font-semibold text-sm border border-slate-700 transition-all duration-300 hover:scale-105 flex items-center gap-2"
                >
                  Komunitas <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* ================= STATISTIK SECTION ================= */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Stat Card 1 */}
            <div className="rounded-3xl p-6 sm:p-8 bg-slate-900/60 border border-slate-800 backdrop-blur-md shadow-xl flex items-center gap-5 transition-all duration-300 hover:border-amber-500/50 hover:bg-slate-900/80 group">
              <div className="w-14 h-14 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 group-hover:scale-110 transition-transform">
                <Layers className="w-7 h-7" />
              </div>
              <div>
                <div className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-1">
                  10
                </div>
                <div className="text-xs sm:text-sm font-semibold text-slate-400 uppercase tracking-wider">
                  Himpunan Mahasiswa Jurusan
                </div>
              </div>
            </div>

            {/* Stat Card 2 */}
            <div className="rounded-3xl p-6 sm:p-8 bg-slate-900/60 border border-slate-800 backdrop-blur-md shadow-xl flex items-center gap-5 transition-all duration-300 hover:border-amber-500/50 hover:bg-slate-900/80 group">
              <div className="w-14 h-14 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 group-hover:scale-110 transition-transform">
                <Award className="w-7 h-7" />
              </div>
              <div>
                <div className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-1">
                  7
                </div>
                <div className="text-xs sm:text-sm font-semibold text-slate-400 uppercase tracking-wider">
                  Unit Kegiatan Mahasiswa
                </div>
              </div>
            </div>

            {/* Stat Card 3 */}
            <div className="rounded-3xl p-6 sm:p-8 bg-slate-900/60 border border-slate-800 backdrop-blur-md shadow-xl flex items-center gap-5 transition-all duration-300 hover:border-amber-500/50 hover:bg-slate-900/80 group">
              <div className="w-14 h-14 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 group-hover:scale-110 transition-transform">
                <Users className="w-7 h-7" />
              </div>
              <div>
                <div className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-1">
                  5
                </div>
                <div className="text-xs sm:text-sm font-semibold text-slate-400 uppercase tracking-wider">
                  Komunitas
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ================= SECTION 1 — HMJ ================= */}
        <section
          id="section-hmj"
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24 scroll-mt-28"
        >
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-amber-400 text-xs sm:text-sm font-bold uppercase tracking-widest block mb-2">
              Pilar Akademik & Profesional
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight mb-4">
              HIMPUNAN MAHASISWA JURUSAN
            </h2>
            <p className="text-slate-300 text-sm sm:text-base">
              "Wadah mahasiswa pada masing-masing jurusan untuk mengembangkan
              kompetensi akademik, profesional, dan solidaritas mahasiswa."
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {hmjData.map((item, index) => (
              <div
                key={index}
                className="rounded-3xl bg-slate-900/70 border border-slate-800/80 p-6 flex flex-col justify-between backdrop-blur-md shadow-xl transition-all duration-300 hover:-translate-y-2 hover:border-amber-500/50 hover:shadow-2xl group"
              >
                <div>
                  {/* Logo Container */}
                  <div className="w-full h-48 rounded-2xl bg-slate-950/60 border border-slate-800/50 flex items-center justify-center p-4 mb-6 overflow-hidden relative">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="max-h-full max-w-full object-contain transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>

                  {/* Category & Name */}
                  <span className="inline-block px-3 py-1 rounded-full bg-amber-500/10 text-amber-400 text-xs font-semibold mb-2">
                    {item.category}
                  </span>
                  <h3 className="text-lg font-bold text-white leading-snug mb-4 group-hover:text-amber-400 transition-colors">
                    {item.name}
                  </h3>
                </div>

                {/* Detail Action */}
                <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between text-sm font-semibold text-amber-400 group-hover:text-amber-300 cursor-pointer">
                  <span>Lihat Detail</span>
                  <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ================= SECTION 2 — UKM ================= */}
        <section
          id="section-ukm"
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24 scroll-mt-28"
        >
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-amber-400 text-xs sm:text-sm font-bold uppercase tracking-widest block mb-2">
              Minat, Bakat & Kreativitas
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight mb-4">
              UNIT KEGIATAN MAHASISWA
            </h2>
            <p className="text-slate-300 text-sm sm:text-base">
              "Wadah mahasiswa Politeknik Negeri Sriwijaya untuk mengembangkan
              minat, bakat, kreativitas, dan prestasi."
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {ukmData.map((item, index) => (
              <div
                key={index}
                className="rounded-3xl bg-slate-900/70 border border-slate-800/80 p-6 flex flex-col justify-between backdrop-blur-md shadow-xl transition-all duration-300 hover:-translate-y-2 hover:border-amber-500/50 hover:shadow-2xl group"
              >
                <div>
                  {/* Logo Container */}
                  <div className="w-full h-48 rounded-2xl bg-slate-950/60 border border-slate-800/50 flex items-center justify-center p-4 mb-6 overflow-hidden relative">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="max-h-full max-w-full object-contain transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>

                  {/* Category & Name */}
                  <span className="inline-block px-3 py-1 rounded-full bg-amber-500/10 text-amber-400 text-xs font-semibold mb-2">
                    {item.category}
                  </span>
                  <h3 className="text-lg font-bold text-white leading-snug mb-4 group-hover:text-amber-400 transition-colors">
                    {item.name}
                  </h3>
                </div>

                {/* Detail Action */}
                <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between text-sm font-semibold text-amber-400 group-hover:text-amber-300 cursor-pointer">
                  <span>Lihat Detail</span>
                  <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ================= SECTION 3 — KOMUNITAS ================= */}
        <section
          id="section-komunitas"
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12 scroll-mt-28"
        >
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-amber-400 text-xs sm:text-sm font-bold uppercase tracking-widest block mb-2">
              Kolaborasi & Pengabdian
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight mb-4">
              KOMUNITAS
            </h2>
            <p className="text-slate-300 text-sm sm:text-base">
              "Kumpulan ruang gerak kolaboratif mahasiswa untuk mengeksplorasi
              potensi khusus di luar kegiatan akademik utama."
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {komunitasData.map((item, index) => (
              <div
                key={index}
                className="rounded-3xl bg-slate-900/70 border border-slate-800/80 p-6 flex flex-col justify-between backdrop-blur-md shadow-xl transition-all duration-300 hover:-translate-y-2 hover:border-amber-500/50 hover:shadow-2xl group"
              >
                <div>
                  {/* Logo Container */}
                  <div className="w-full h-48 rounded-2xl bg-slate-950/60 border border-slate-800/50 flex items-center justify-center p-4 mb-6 overflow-hidden relative">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="max-h-full max-w-full object-contain transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>

                  {/* Category & Name */}
                  <span className="inline-block px-3 py-1 rounded-full bg-amber-500/10 text-amber-400 text-xs font-semibold mb-2">
                    {item.category}
                  </span>
                  <h3 className="text-lg font-bold text-white leading-snug mb-4 group-hover:text-amber-400 transition-colors">
                    {item.name}
                  </h3>
                </div>

                {/* Detail Action */}
                <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between text-sm font-semibold text-amber-400 group-hover:text-amber-300 cursor-pointer">
                  <span>Lihat Detail</span>
                  <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* ================= FOOTER ================= */}
      <footer className="bg-slate-950 border-t border-slate-800 text-slate-300 pt-16 pb-12 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
            {/* Brand Info */}
            <div className="lg:col-span-2">
              <div className="flex items-center gap-3 mb-4">
                <img
                  src="/images/logo.png"
                  alt="Logo BEM"
                  className="w-10 h-10 object-contain"
                />
                <div>
                  <h3 className="text-lg font-bold text-white">
                    Kabinet Kilau Gemilang
                  </h3>
                  <p className="text-xs text-amber-400 font-medium">
                    BEM Politeknik Negeri Sriwijaya
                  </p>
                </div>
              </div>
              <p className="text-slate-400 text-sm leading-relaxed max-w-md mb-6">
                "Menjadi wadah yang aktif, responsif, dan konstruktif untuk
                Politeknik Negeri Sriwijaya yang lebih berdampak."
              </p>
              {/* Social Media Links */}
              <div className="flex items-center gap-3">
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noreferrer"
                  className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-300 hover:text-amber-400 hover:border-amber-500/50 transition-colors"
                >
                  <Instagram className="w-5 h-5" />
                </a>
                <a
                  href="https://youtube.com"
                  target="_blank"
                  rel="noreferrer"
                  className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-300 hover:text-amber-400 hover:border-amber-500/50 transition-colors"
                >
                  <Youtube className="w-5 h-5" />
                </a>
                <a
                  href="https://polsri.ac.id"
                  target="_blank"
                  rel="noreferrer"
                  className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-300 hover:text-amber-400 hover:border-amber-500/50 transition-colors"
                >
                  <Globe className="w-5 h-5" />
                </a>
              </div>
            </div>

            {/* Navigasi Column */}
            <div>
              <h4 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">
                NAVIGASI
              </h4>
              <ul className="space-y-2.5 text-sm">
                <li>
                  <Link
                    to="/about"
                    className="hover:text-amber-400 transition-colors"
                  >
                    Tentang Kami
                  </Link>
                </li>
                <li>
                  <Link
                    to="/agenda"
                    className="hover:text-amber-400 transition-colors"
                  >
                    Agenda Kegiatan
                  </Link>
                </li>
                <li>
                  <Link
                    to="/contact-us"
                    className="hover:text-amber-400 transition-colors"
                  >
                    Contact Us
                  </Link>
                </li>
              </ul>
            </div>

            {/* Mari Terhubung Column */}
            <div>
              <h4 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">
                MARI TERHUBUNG
              </h4>
              <ul className="space-y-3 text-sm text-slate-400">
                <li className="flex items-start gap-2.5">
                  <Mail className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                  <a
                    href="mailto:bem@polsri.ac.id"
                    className="hover:text-amber-400 transition-colors"
                  >
                    bem@polsri.ac.id
                  </a>
                </li>
                <li className="flex items-start gap-2.5">
                  <MapPin className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                  <span>
                    Jl. Srijaya Negara, Bukit Besar, Palembang, Sumatera Selatan
                  </span>
                </li>
              </ul>
            </div>
          </div>

          <div className="pt-8 border-t border-slate-800/80 text-center text-xs text-slate-500">
            &copy; {new Date().getFullYear()} BEM Politeknik Negeri Sriwijaya —
            Kabinet Kilau Gemilang. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default OrganisasiMahasiswa;
