import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  ArrowUpRight,
  Award,
  ChevronDown,
  Instagram,
  Layers,
  Mail,
  MapPin,
  Menu,
  Sparkles,
  Users,
  X,
  Youtube,
} from "lucide-react";

type DropdownName = "academic" | "echo" | null;

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

export default function OrganisasiMahasiswa() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<DropdownName>(null);
  const [scrolled, setScrolled] = useState(false);

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
  // DROPDOWN
  // ============================================================
  const toggleDropdown = (name: Exclude<DropdownName, null>) => {
    setOpenDropdown(openDropdown === name ? null : name);
  };

  const closeMenus = () => {
    setMobileOpen(false);
    setOpenDropdown(null);
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <main className="relative min-h-screen overflow-x-clip bg-[url('/images/bgweb.jpeg')] bg-cover bg-fixed bg-center bg-no-repeat pt-[72px] text-slate-900 scroll-smooth">
      {/* ======================================================== */}
      {/* OVERLAY BACKGROUND */}
      {/* ======================================================== */}
      <div className="min-h-screen bg-white/65">
        {/* ====================================================== */}
        {/* NAVBAR */}
        {/* ====================================================== */}
        <header
          className={`fixed inset-x-0 top-0 z-[100] transition-all duration-300 ${
            scrolled
              ? "border-b border-slate-200/70 bg-white/80 shadow-sm backdrop-blur-xl"
              : "border-b border-white/20 bg-white/20 backdrop-blur-md"
          }`}
        >
          <div className="w-full">
            <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between px-5 lg:px-8">
              {/* BRANDING */}
              <Link
                to="/"
                className="flex shrink-0 items-center gap-3"
                onClick={closeMenus}
              >
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
              </Link>

              {/* ================================================== */}
              {/* DESKTOP NAVIGATION */}
              {/* ================================================== */}
              <nav className="hidden items-center gap-1 lg:flex">
                <Link
                  to="/"
                  className="rounded-lg px-3.5 py-2 text-sm font-medium text-slate-600 outline-none transition-all duration-200 ease-out hover:bg-white/55 hover:text-amber-600 active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-amber-400/70"
                  onClick={closeMenus}
                >
                  Home
                </Link>

                <Link
                  to="/about"
                  className="rounded-lg px-3.5 py-2 text-sm font-medium text-slate-600 outline-none transition-all duration-200 ease-out hover:bg-white/55 hover:text-amber-600 active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-amber-400/70"
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
                      openDropdown === "academic"
                        ? "bg-white/60 text-amber-700"
                        : "text-amber-600 hover:bg-white/55 hover:text-amber-700"
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
                        href="/scholarship-info"
                        className="block rounded-lg px-3 py-2.5 text-xs font-semibold text-slate-600 outline-none transition-all duration-200 ease-out hover:bg-amber-50 hover:text-amber-700 active:scale-[0.99] focus-visible:ring-2 focus-visible:ring-amber-400/50"
                        onClick={closeMenus}
                      >
                        Scholarship Info
                      </a>

                      <Link
                        to="/organisasi-mahasiswa"
                        className="block rounded-lg bg-amber-50 px-3 py-2.5 text-xs font-semibold text-amber-700 outline-none transition-all duration-200 ease-out active:scale-[0.99] focus-visible:ring-2 focus-visible:ring-amber-400/50"
                        onClick={closeMenus}
                      >
                        Organisasi Mahasiswa
                      </Link>

                      <a
                        href="/mahasiswa-berdampak"
                        className="block rounded-lg px-3 py-2.5 text-xs font-semibold text-slate-600 outline-none transition-all duration-200 ease-out hover:bg-amber-50 hover:text-amber-700 active:scale-[0.99] focus-visible:ring-2 focus-visible:ring-amber-400/50"
                        onClick={closeMenus}
                      >
                        Mahasiswa Berdampak
                      </a>
                    </div>
                  )}
                </div>

                {/* CAMPUS ECHO */}
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => toggleDropdown("echo")}
                    className={`flex items-center gap-1 rounded-lg px-3.5 py-2 text-sm font-medium outline-none transition-all duration-200 ease-out active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-amber-400/70 ${
                      openDropdown === "echo"
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
                        className="block rounded-lg px-3 py-2.5 text-xs font-semibold text-slate-600 outline-none transition-all duration-200 ease-out hover:bg-amber-50 hover:text-amber-700 active:scale-[0.99] focus-visible:ring-2 focus-visible:ring-amber-400/50"
                        onClick={closeMenus}
                      >
                        Kajian
                      </Link>

                      <Link
                        to="/bisik-kampus"
                        className="block rounded-lg px-3 py-2.5 text-xs font-semibold text-slate-600 outline-none transition-all duration-200 ease-out hover:bg-amber-50 hover:text-amber-700 active:scale-[0.99] focus-visible:ring-2 focus-visible:ring-amber-400/50"
                        onClick={closeMenus}
                      >
                        Bisik Kampus
                      </Link>

                      <Link
                        to="/polsrifess"
                        className="block rounded-lg px-3 py-2.5 text-xs font-semibold text-slate-600 outline-none transition-all duration-200 ease-out hover:bg-amber-50 hover:text-amber-700 active:scale-[0.99] focus-visible:ring-2 focus-visible:ring-amber-400/50"
                        onClick={closeMenus}
                      >
                        Polsrifess
                      </Link>
                    </div>
                  )}
                </div>

                <Link
                  to="/contact"
                  className="ml-1 rounded-lg px-3.5 py-2 text-sm font-medium text-slate-600 outline-none transition-all duration-200 ease-out hover:bg-white/50 hover:text-amber-600 active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-amber-400/70"
                  onClick={closeMenus}
                >
                  Contact Us
                </Link>
              </nav>

              {/* MOBILE BUTTON */}
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

            {/* MOBILE NAVIGATION */}
            {mobileOpen && (
              <div className="border-t border-slate-200/70 bg-white/95 px-5 py-3 shadow-lg backdrop-blur-xl lg:hidden">
                <Link
                  to="/"
                  className="block rounded-lg px-3 py-3 text-sm font-medium text-slate-600 outline-none transition-all duration-200 hover:bg-slate-50 hover:text-amber-600 active:scale-[0.99] focus-visible:ring-2 focus-visible:ring-amber-400/50"
                  onClick={closeMenus}
                >
                  Home
                </Link>

                <Link
                  to="/about"
                  className="block rounded-lg px-3 py-3 text-sm font-medium text-slate-600 outline-none transition-all duration-200 hover:bg-slate-50 hover:text-amber-600 active:scale-[0.99] focus-visible:ring-2 focus-visible:ring-amber-400/50"
                  onClick={closeMenus}
                >
                  About
                </Link>

                {/* MOBILE ACADEMIC */}
                <button
                  type="button"
                  className={`mt-1 flex w-full items-center justify-between rounded-lg px-3 py-3 text-sm font-medium outline-none transition-all duration-200 ease-out active:scale-[0.99] focus-visible:ring-2 focus-visible:ring-amber-400/50 ${
                    openDropdown === "academic"
                      ? "bg-amber-50 text-amber-700"
                      : "text-amber-600 hover:bg-slate-50 hover:text-amber-700"
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
                      className="block rounded-md px-3 py-2.5 text-sm font-semibold text-slate-600 outline-none transition-all duration-200 hover:bg-white hover:text-amber-700 active:scale-[0.99] focus-visible:ring-2 focus-visible:ring-amber-400/50"
                      onClick={closeMenus}
                    >
                      Academic Calendar
                    </Link>

                    <a
                      href="/scholarship-info"
                      className="block rounded-md px-3 py-2.5 text-sm text-slate-600 outline-none transition-all duration-200 hover:bg-white hover:text-amber-700 active:scale-[0.99] focus-visible:ring-2 focus-visible:ring-amber-400/50"
                      onClick={closeMenus}
                    >
                      Scholarship Info
                    </a>

                    <Link
                      to="/organisasi-mahasiswa"
                      className="block rounded-md bg-amber-50 px-3 py-2.5 text-sm font-semibold text-amber-700 outline-none transition-all duration-200 active:scale-[0.99] focus-visible:ring-2 focus-visible:ring-amber-400/50"
                      onClick={closeMenus}
                    >
                      Organisasi Mahasiswa
                    </Link>

                    <a
                      href="/mahasiswa-berdampak"
                      className="block rounded-md px-3 py-2.5 text-sm text-slate-600 outline-none transition-all duration-200 hover:bg-white hover:text-amber-700 active:scale-[0.99] focus-visible:ring-2 focus-visible:ring-amber-400/50"
                      onClick={closeMenus}
                    >
                      Mahasiswa Berdampak
                    </a>
                  </div>
                )}

                {/* MOBILE CAMPUS ECHO */}
                <button
                  type="button"
                  className={`mt-1 flex w-full items-center justify-between rounded-lg px-3 py-3 text-sm font-medium outline-none transition-all duration-200 ease-out active:scale-[0.99] focus-visible:ring-2 focus-visible:ring-amber-400/50 ${
                    openDropdown === "echo"
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
                      className="block rounded-md px-3 py-2.5 text-sm font-semibold text-slate-600 outline-none transition-all duration-200 hover:bg-white hover:text-amber-700 active:scale-[0.99] focus-visible:ring-2 focus-visible:ring-amber-400/50"
                      onClick={closeMenus}
                    >
                      Kajian
                    </Link>

                    <Link
                      to="/bisik-kampus"
                      className="block rounded-md px-3 py-2.5 text-sm text-slate-600 outline-none transition-all duration-200 hover:bg-white hover:text-amber-700 active:scale-[0.99] focus-visible:ring-2 focus-visible:ring-amber-400/50"
                      onClick={closeMenus}
                    >
                      Bisik Kampus
                    </Link>

                    <Link
                      to="/polsrifess"
                      className="block rounded-md px-3 py-2.5 text-sm text-slate-600 outline-none transition-all duration-200 hover:bg-white hover:text-amber-700 active:scale-[0.99] focus-visible:ring-2 focus-visible:ring-amber-400/50"
                      onClick={closeMenus}
                    >
                      Polsrifess
                    </Link>
                  </div>
                )}

                <Link
                  to="/contact"
                  className="mt-1 block rounded-lg px-3 py-3 text-sm font-medium text-slate-600 outline-none transition-all duration-200 hover:bg-slate-50 hover:text-amber-600 active:scale-[0.99] focus-visible:ring-2 focus-visible:ring-amber-400/50"
                  onClick={closeMenus}
                >
                  Contact Us
                </Link>
              </div>
            )}
          </div>
        </header>

        {/* ======================================================== */}
        {/* HERO SECTION */}
        {/* ======================================================== */}
        <section className="mx-auto max-w-7xl px-5 pt-12 pb-16 lg:px-8 lg:pt-16 lg:pb-20">
          <div className="relative rounded-3xl border border-slate-200/70 bg-white/80 p-8 shadow-xl backdrop-blur-xl sm:p-12 lg:p-16">
            <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-80 h-80 bg-amber-400/5 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10 max-w-3xl">
              <span className="mb-6 inline-flex items-center gap-2 rounded-full bg-amber-50 px-4 py-1.5 text-xs font-black uppercase tracking-[0.15em] text-amber-700 border border-amber-200/60">
                <Sparkles size={14} className="text-amber-600" />
                Kabinet Kilau Gemilang
              </span>

              <h1 className="text-3xl font-black tracking-tight text-slate-900 sm:text-5xl lg:text-6xl mb-6 leading-tight">
                ORGANISASI <span className="text-amber-600">MAHASISWA</span>
              </h1>

              <p className="text-base sm:text-lg font-medium leading-relaxed text-slate-600 mb-8">
                "Ruang tumbuh, berkolaborasi, dan berdampak bagi mahasiswa
                Politeknik Negeri Sriwijaya."
              </p>

              <div className="flex flex-wrap gap-3 pt-2">
                <button
                  onClick={() => scrollToSection("section-hmj")}
                  className="inline-flex items-center gap-2 rounded-full bg-amber-500 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-amber-500/30 outline-none transition-all duration-200 ease-out hover:bg-amber-600 hover:shadow-amber-500/40 active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-amber-400/70"
                >
                  HMJ <ChevronDown size={16} className="-rotate-90" />
                </button>
                <button
                  onClick={() => scrollToSection("section-ukm")}
                  className="inline-flex items-center gap-2 rounded-full border border-amber-300 bg-white/90 px-6 py-3 text-sm font-bold text-amber-700 outline-none transition-all duration-200 ease-out hover:bg-amber-50 active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-amber-400/50"
                >
                  UKM <ChevronDown size={16} className="-rotate-90" />
                </button>
                <button
                  onClick={() => scrollToSection("section-komunitas")}
                  className="inline-flex items-center gap-2 rounded-full border border-amber-300 bg-white/90 px-6 py-3 text-sm font-bold text-amber-700 outline-none transition-all duration-200 ease-out hover:bg-amber-50 active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-amber-400/50"
                >
                  Komunitas <ChevronDown size={16} className="-rotate-90" />
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* ======================================================== */}
        {/* STATISTIK SECTION */}
        {/* ======================================================== */}
        <section className="mx-auto max-w-7xl px-5 mb-20 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="rounded-3xl border border-slate-200/80 bg-white/90 p-6 sm:p-8 backdrop-blur-md shadow-xl flex items-center gap-5 transition-all duration-200 ease-out hover:-translate-y-1 hover:border-amber-300 hover:shadow-2xl group">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-amber-50 text-amber-600 transition-all duration-200 group-hover:bg-amber-500 group-hover:text-white">
                <Layers size={28} />
              </div>
              <div>
                <div className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight mb-1">
                  10
                </div>
                <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                  Himpunan Mahasiswa Jurusan
                </div>
              </div>
            </div>

            <div className="rounded-3xl border border-slate-200/80 bg-white/90 p-6 sm:p-8 backdrop-blur-md shadow-xl flex items-center gap-5 transition-all duration-200 ease-out hover:-translate-y-1 hover:border-amber-300 hover:shadow-2xl group">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-amber-50 text-amber-600 transition-all duration-200 group-hover:bg-amber-500 group-hover:text-white">
                <Award size={28} />
              </div>
              <div>
                <div className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight mb-1">
                  7
                </div>
                <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                  Unit Kegiatan Mahasiswa
                </div>
              </div>
            </div>

            <div className="rounded-3xl border border-slate-200/80 bg-white/90 p-6 sm:p-8 backdrop-blur-md shadow-xl flex items-center gap-5 transition-all duration-200 ease-out hover:-translate-y-1 hover:border-amber-300 hover:shadow-2xl group">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-amber-50 text-amber-600 transition-all duration-200 group-hover:bg-amber-500 group-hover:text-white">
                <Users size={28} />
              </div>
              <div>
                <div className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight mb-1">
                  5
                </div>
                <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                  Komunitas
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ======================================================== */}
        {/* SECTION 1 — HMJ */}
        {/* ======================================================== */}
        <section
          id="section-hmj"
          className="mx-auto max-w-7xl px-5 mb-24 lg:px-8 scroll-mt-28"
        >
          <div className="max-w-2xl mb-12">
            <span className="text-amber-600 text-xs font-black uppercase tracking-widest block mb-2">
              Pilar Akademik & Profesional
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight mb-4">
              HIMPUNAN MAHASISWA JURUSAN
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-7">
              "Wadah mahasiswa pada masing-masing jurusan untuk mengembangkan
              kompetensi akademik, profesional, dan solidaritas mahasiswa."
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {hmjData.map((item, index) => (
              <div
                key={index}
                className="rounded-3xl border border-slate-200 bg-white/90 p-6 flex flex-col justify-between backdrop-blur-sm transition-all duration-200 ease-out hover:-translate-y-1 hover:border-amber-300 hover:shadow-xl hover:shadow-amber-900/5 group"
              >
                <div>
                  <div className="w-full h-48 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center p-4 mb-6 overflow-hidden relative">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="max-h-full max-w-full object-contain transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>

                  <span className="inline-block px-3 py-1 rounded-full bg-amber-50 text-amber-700 text-[10px] font-bold uppercase tracking-wide mb-2">
                    {item.category}
                  </span>
                  <h3 className="text-base font-bold text-slate-900 leading-snug mb-4 group-hover:text-amber-700 transition-colors">
                    {item.name}
                  </h3>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-amber-600 cursor-pointer">
                  <span>Lihat Detail</span>
                  <ArrowUpRight
                    size={14}
                    className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ======================================================== */}
        {/* SECTION 2 — UKM */}
        {/* ======================================================== */}
        <section
          id="section-ukm"
          className="mx-auto max-w-7xl px-5 mb-24 lg:px-8 scroll-mt-28"
        >
          <div className="max-w-2xl mb-12">
            <span className="text-amber-600 text-xs font-black uppercase tracking-widest block mb-2">
              Minat, Bakat & Kreativitas
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight mb-4">
              UNIT KEGIATAN MAHASISWA
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-7">
              "Wadah mahasiswa Politeknik Negeri Sriwijaya untuk mengembangkan
              minat, bakat, kreativitas, dan prestasi."
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {ukmData.map((item, index) => (
              <div
                key={index}
                className="rounded-3xl border border-slate-200 bg-white/90 p-6 flex flex-col justify-between backdrop-blur-sm transition-all duration-200 ease-out hover:-translate-y-1 hover:border-amber-300 hover:shadow-xl hover:shadow-amber-900/5 group"
              >
                <div>
                  <div className="w-full h-48 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center p-4 mb-6 overflow-hidden relative">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="max-h-full max-w-full object-contain transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>

                  <span className="inline-block px-3 py-1 rounded-full bg-amber-50 text-amber-700 text-[10px] font-bold uppercase tracking-wide mb-2">
                    {item.category}
                  </span>
                  <h3 className="text-base font-bold text-slate-900 leading-snug mb-4 group-hover:text-amber-700 transition-colors">
                    {item.name}
                  </h3>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-amber-600 cursor-pointer">
                  <span>Lihat Detail</span>
                  <ArrowUpRight
                    size={14}
                    className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ======================================================== */}
        {/* SECTION 3 — KOMUNITAS */}
        {/* ======================================================== */}
        <section
          id="section-komunitas"
          className="mx-auto max-w-7xl px-5 mb-20 lg:px-8 scroll-mt-28"
        >
          <div className="max-w-2xl mb-12">
            <span className="text-amber-600 text-xs font-black uppercase tracking-widest block mb-2">
              Kolaborasi & Pengabdian
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight mb-4">
              KOMUNITAS
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-7">
              "Kumpulan ruang gerak kolaboratif mahasiswa untuk mengeksplorasi
              potensi khusus di luar kegiatan akademik utama."
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {komunitasData.map((item, index) => (
              <div
                key={index}
                className="rounded-3xl border border-slate-200 bg-white/90 p-6 flex flex-col justify-between backdrop-blur-sm transition-all duration-200 ease-out hover:-translate-y-1 hover:border-amber-300 hover:shadow-xl hover:shadow-amber-900/5 group"
              >
                <div>
                  <div className="w-full h-48 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center p-4 mb-6 overflow-hidden relative">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="max-h-full max-w-full object-contain transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>

                  <span className="inline-block px-3 py-1 rounded-full bg-amber-50 text-amber-700 text-[10px] font-bold uppercase tracking-wide mb-2">
                    {item.category}
                  </span>
                  <h3 className="text-base font-bold text-slate-900 leading-snug mb-4 group-hover:text-amber-700 transition-colors">
                    {item.name}
                  </h3>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-amber-600 cursor-pointer">
                  <span>Lihat Detail</span>
                  <ArrowUpRight
                    size={14}
                    className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ======================================================== */}
        {/* FOOTER */}
        {/* ======================================================== */}
        <footer className="bg-slate-950 px-5 pb-8 pt-16 text-white lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr] md:gap-8">
              {/* BRAND */}
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

              {/* NAVIGASI */}
              <div>
                <h3 className="text-xs font-black uppercase tracking-widest text-amber-400">
                  Navigasi
                </h3>

                <div className="mt-5 grid gap-3 text-sm text-slate-400">
                  <Link
                    to="/about"
                    className="rounded-md outline-none transition-all duration-200 hover:text-white focus-visible:ring-2 focus-visible:ring-amber-400/60"
                  >
                    Tentang Kami
                  </Link>

                  <Link
                    to="/agenda"
                    className="rounded-md outline-none transition-all duration-200 hover:text-white focus-visible:ring-2 focus-visible:ring-amber-400/60"
                  >
                    Agenda Kegiatan
                  </Link>

                  <Link
                    to="/contact"
                    className="rounded-md outline-none transition-all duration-200 hover:text-white focus-visible:ring-2 focus-visible:ring-amber-400/60"
                  >
                    Contact Us
                  </Link>
                </div>
              </div>

              {/* MARI TERHUBUNG */}
              <div>
                <h3 className="text-xs font-black uppercase tracking-widest text-amber-400">
                  Mari Terhubung
                </h3>

                <p className="mt-5 flex items-start gap-2 text-sm leading-6 text-slate-400">
                  <Mail size={16} className="mt-1 shrink-0 text-amber-400" />
                  bem@polsri.ac.id
                </p>

                <p className="mt-3 flex items-start gap-2 text-sm leading-6 text-slate-400">
                  <MapPin size={16} className="mt-1 shrink-0 text-amber-400" />
                  <span>
                    Jl. Srijaya Negara, Bukit Besar, Palembang, Sumatera Selatan
                  </span>
                </p>

                <div className="mt-5 flex gap-2">
                  <a
                    href="https://www.instagram.com/bempolsri_?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Instagram"
                    className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-800 text-slate-300 outline-none transition-all duration-200 hover:bg-amber-500 hover:text-white active:scale-[0.95] focus-visible:ring-2 focus-visible:ring-amber-400/70"
                  >
                    <Instagram size={16} />
                  </a>

                  <a
                    href="https://x.com/polsrimenfess"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="X Twitter"
                    className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-800 text-slate-300 outline-none transition-all duration-200 hover:bg-amber-500 hover:text-white active:scale-[0.95] focus-visible:ring-2 focus-visible:ring-amber-400/70"
                  >
                    𝕏
                  </a>

                  <a
                    href="https://www.youtube.com/@bemkmpolsri3259"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="YouTube"
                    className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-800 text-slate-300 outline-none transition-all duration-200 hover:bg-amber-500 hover:text-white active:scale-[0.95] focus-visible:ring-2 focus-visible:ring-amber-400/70"
                  >
                    <Youtube size={17} />
                  </a>
                </div>
              </div>
            </div>

            {/* COPYRIGHT */}
            <div className="mt-14 flex flex-col justify-between gap-3 border-t border-white/10 pt-6 text-xs text-slate-500 sm:flex-row">
              <p>© BEM Politeknik Negeri Sriwijaya. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </div>
    </main>
  );
}
