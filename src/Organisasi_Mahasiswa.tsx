import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  ArrowUpRight,
  ChevronDown,
  Instagram,
  Layers,
  Mail,
  Menu,
  Youtube,
  Search,
  ExternalLink,
  House,
  Trophy,
  UsersRound,
  RotateCcw,
  X,
} from "lucide-react";

type DropdownName = "academic" | "echo" | null;

interface OrgItem {
  id: string;
  name: string;
  category: "HMJ" | "UKM" | "Komunitas" | "MPM" | "BEM";
  image: string;
}

// ============================================================
// DATA ORGANISASI MAHASISWA (URUTAN WAJIB)
// ============================================================
const mpmData: OrgItem[] = [
  {
    id: "kom-2",
    name: "Majelis Permusyawaratan Mahasiswa (MPM)",
    category: "Komunitas",
    image: "/images/Komunitas/mpm.webp",
  },
];

const bemData: OrgItem[] = [
  {
    id: "bem-1",
    name: "BEM Politeknik Negeri Sriwijaya",
    category: "Komunitas",
    image: "/images/logo.png",
  },
];

const hmjData: OrgItem[] = [
  {
    id: "hmj-1",
    name: "Administrasi Bisnis",
    category: "HMJ",
    image: "/images/HMJ/AB.png",
  },
  {
    id: "hmj-2",
    name: "Akuntansi",
    category: "HMJ",
    image: "/images/HMJ/akuntansi.png",
  },
  {
    id: "hmj-3",
    name: "Bahasa dan Pariwisata",
    category: "HMJ",
    image: "/images/HMJ/bahasa dan pariwisata.png",
  },
  {
    id: "hmj-4",
    name: "Teknik Elektro",
    category: "HMJ",
    image: "/images/HMJ/elektro.png",
  },
  {
    id: "hmj-5",
    name: "Teknik Mesin",
    category: "HMJ",
    image: "/images/HMJ/mesin.png",
  },
  {
    id: "hmj-6",
    name: "Manajemen Informatika",
    category: "HMJ",
    image: "/images/HMJ/mi.png",
  },
  {
    id: "hmj-7",
    name: "Rekayasa Teknologi dan Bisnis Pertanian",
    category: "HMJ",
    image: "/images/HMJ/RTBP.png",
  },
  {
    id: "hmj-8",
    name: "Teknik Sipil",
    category: "HMJ",
    image: "/images/HMJ/sipil.png",
  },
  {
    id: "hmj-9",
    name: "Teknik Kimia",
    category: "HMJ",
    image: "/images/HMJ/Tekkim.png",
  },
  {
    id: "hmj-10",
    name: "Teknik Komputer",
    category: "HMJ",
    image: "/images/HMJ/tekom.png",
  },
];

const ukmData: OrgItem[] = [
  {
    id: "ukm-1",
    name: "English Debating Society (EDS)",
    category: "UKM",
    image: "/images/UKM/eds.webp",
  },
  {
    id: "ukm-2",
    name: "UKM Himpala Bahtera Buana (HBB)",
    category: "UKM",
    image: "/images/UKM/himpala.webp",
  },
  {
    id: "ukm-3",
    name: "Keluarga Tarbiyah Islamiah (KARISMA)",
    category: "UKM",
    image: "/images/UKM/karisma.webp",
  },
  {
    id: "ukm-4",
    name: "Mahasiswa Riset dan Sains (MARS)",
    category: "UKM",
    image: "/images/UKM/mars.webp",
  },
  {
    id: "ukm-5",
    name: "Olahraga",
    category: "UKM",
    image: "/images/UKM/olahraga.webp",
  },
  {
    id: "ukm-6",
    name: "Simpony",
    category: "UKM",
    image: "/images/UKM/simpony.webp",
  },
  {
    id: "ukm-7",
    name: "Warta Politeknik Sriwijaya (WPS)",
    category: "UKM",
    image: "/images/UKM/wps.webp",
  },
];

const komunitasData: OrgItem[] = [
  {
    id: "kom-1",
    name: "Bujang Gadis Politeknik Negeri Sriwijaya (BGPOL)",
    category: "Komunitas",
    image: "/images/Komunitas/bgp.webp",
  },
  {
    id: "kom-2",
    name: "Majelis Permusyawaratan Mahasiswa (MPM)",
    category: "Komunitas",
    image: "/images/Komunitas/mpm.webp",
  },
  {
    id: "kom-3",
    name: "Pramuka",
    category: "Komunitas",
    image: "/images/Komunitas/pramuka.webp",
  },
  {
    id: "kom-4",
    name: "Automation Robotic Club of Sriwijaya (ARCOS)",
    category: "Komunitas",
    image: "/images/Komunitas/robotik.webp",
  },
  {
    id: "kom-5",
    name: "Entrepreneur (Kewirausahaan) Polsri",
    category: "Komunitas",
    image: "/images/Komunitas/wirausaha.webp",
  },
];

export default function OrganisasiMahasiswa() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<DropdownName>(null);
  const [scrolled, setScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

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
  // DROPDOWN & HELPER FUNCTIONS
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
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Gabungan seluruh organisasi untuk pencarian global
  const allOrganizations: OrgItem[] = [
    ...mpmData,
    ...bemData,
    ...hmjData,
    ...ukmData,
    ...komunitasData,
  ];

  const searchResults = searchQuery.trim()
    ? allOrganizations.filter((item) =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase().trim()),
      )
    : [];

  return (
    <main className="relative min-h-screen overflow-x-clip bg-[url('/images/bgweb.jpeg')] bg-cover bg-fixed bg-center bg-no-repeat pt-[72px] text-slate-900 scroll-smooth">
      {/* ======================================================== */}
      {/* OVERLAY BACKGROUND */}
      {/* ======================================================== */}
      <div className="min-h-screen bg-white/65">
        {/* ====================================================== */}
        {/* NAVBAR — PERSIS DENGAN KAJIAN.TSX */}
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

              {/* DESKTOP NAVIGATION */}
              <nav className="hidden items-center gap-1 lg:flex">
                {/* HOME */}
                <Link
                  to="/"
                  className="rounded-lg px-3.5 py-2 text-sm font-medium text-slate-600 outline-none transition-all duration-200 ease-out hover:bg-white/55 hover:text-amber-600 active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-amber-400/70"
                  onClick={closeMenus}
                >
                  Home
                </Link>

                {/* ABOUT */}
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
                        ? "bg-white/60 text-amber-600"
                        : "text-amber-600 hover:bg-white/55 hover:text-amber-600"
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
                      {/* ACADEMIC CALENDAR */}
                      <Link
                        to="/calendar"
                        className="block rounded-lg px-3 py-2.5 text-xs font-semibold text-slate-600 outline-none transition-all duration-200 ease-out hover:bg-amber-50 hover:text-amber-600 active:scale-[0.99] focus-visible:ring-2 focus-visible:ring-amber-400/50"
                        onClick={closeMenus}
                      >
                        Academic Calendar
                      </Link>

                      {/* SCHOLARSHIP INFO */}
                      <a
                        href="/scholarship-info"
                        className="block rounded-lg px-3 py-2.5 text-xs font-semibold text-slate-600 outline-none transition-all duration-200 ease-out hover:bg-amber-50 hover:text-amber-600 active:scale-[0.99] focus-visible:ring-2 focus-visible:ring-amber-400/50"
                        onClick={closeMenus}
                      >
                        Scholarship Info
                      </a>

                      {/* ORGANISASI MAHASISWA (ACTIVE) */}
                      <Link
                        to="/organisasi-mahasiswa"
                        className="block rounded-lg bg-amber-50 px-3 py-2.5 text-xs font-semibold text-amber-600 outline-none transition-all duration-200 ease-out active:scale-[0.99] focus-visible:ring-2 focus-visible:ring-amber-400/50"
                        onClick={closeMenus}
                      >
                        Organisasi Mahasiswa
                      </Link>

                      {/* MAHASISWA BERDAMPAK */}
                      <a
                        href="/mahasiswa-berdampak"
                        className="block rounded-lg px-3 py-2.5 text-xs font-semibold text-slate-600 outline-none transition-all duration-200 ease-out hover:bg-amber-50 hover:text-amber-600 active:scale-[0.99] focus-visible:ring-2 focus-visible:ring-amber-400/50"
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
                        ? "bg-white/60 text-amber-600"
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
                      {/* KAJIAN */}
                      <Link
                        to="/kajian"
                        className="block rounded-lg px-3 py-2.5 text-xs font-semibold text-slate-600 outline-none transition-all duration-200 ease-out hover:bg-amber-50 hover:text-amber-600 active:scale-[0.99] focus-visible:ring-2 focus-visible:ring-amber-400/50"
                        onClick={closeMenus}
                      >
                        Kajian
                      </Link>

                      {/* BISIK KAMPUS */}
                      <Link
                        to="/bisik-kampus"
                        className="block rounded-lg px-3 py-2.5 text-xs font-semibold text-slate-600 outline-none transition-all duration-200 ease-out hover:bg-amber-50 hover:text-amber-600 active:scale-[0.99] focus-visible:ring-2 focus-visible:ring-amber-400/50"
                        onClick={closeMenus}
                      >
                        Bisik Kampus
                      </Link>

                      {/* POLSRIFESS */}
                      <Link
                        to="/polsrifess"
                        className="block rounded-lg px-3 py-2.5 text-xs font-semibold text-slate-600 outline-none transition-all duration-200 ease-out hover:bg-amber-50 hover:text-amber-600 active:scale-[0.99] focus-visible:ring-2 focus-visible:ring-amber-400/50"
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
                      ? "bg-amber-50 text-amber-600"
                      : "text-amber-600 hover:bg-slate-50 hover:text-amber-600"
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
                      className="block rounded-md px-3 py-2.5 text-sm font-semibold text-slate-600 outline-none transition-all duration-200 hover:bg-white hover:text-amber-600 active:scale-[0.99] focus-visible:ring-2 focus-visible:ring-amber-400/50"
                      onClick={closeMenus}
                    >
                      Academic Calendar
                    </Link>

                    <a
                      href="/scholarship-info"
                      className="block rounded-md px-3 py-2.5 text-sm text-slate-600 outline-none transition-all duration-200 hover:bg-white hover:text-amber-600 active:scale-[0.99] focus-visible:ring-2 focus-visible:ring-amber-400/50"
                      onClick={closeMenus}
                    >
                      Scholarship Info
                    </a>

                    <Link
                      to="/organisasi-mahasiswa"
                      className="block rounded-md bg-amber-50 px-3 py-2.5 text-sm font-semibold text-amber-600 outline-none transition-all duration-200 active:scale-[0.99] focus-visible:ring-2 focus-visible:ring-amber-400/50"
                      onClick={closeMenus}
                    >
                      Organisasi Mahasiswa
                    </Link>

                    <a
                      href="/mahasiswa-berdampak"
                      className="block rounded-md px-3 py-2.5 text-sm text-slate-600 outline-none transition-all duration-200 hover:bg-white hover:text-amber-600 active:scale-[0.99] focus-visible:ring-2 focus-visible:ring-amber-400/50"
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
                      ? "bg-amber-50 text-amber-600"
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
                      className="block rounded-md px-3 py-2.5 text-sm font-semibold text-slate-600 outline-none transition-all duration-200 hover:bg-white hover:text-amber-600 active:scale-[0.99] focus-visible:ring-2 focus-visible:ring-amber-400/50"
                      onClick={closeMenus}
                    >
                      Kajian
                    </Link>

                    <Link
                      to="/bisik-kampus"
                      className="block rounded-md px-3 py-2.5 text-sm text-slate-600 outline-none transition-all duration-200 hover:bg-white hover:text-amber-600 active:scale-[0.99] focus-visible:ring-2 focus-visible:ring-amber-400/50"
                      onClick={closeMenus}
                    >
                      Bisik Kampus
                    </Link>

                    <Link
                      to="/polsrifess"
                      className="block rounded-md px-3 py-2.5 text-sm text-slate-600 outline-none transition-all duration-200 hover:bg-white hover:text-amber-600 active:scale-[0.99] focus-visible:ring-2 focus-visible:ring-amber-400/50"
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
        {/* MENGENAL LEBIH DEKAT (HANYA MUNCUL SAAT SEARCH KOSONG) */}
        {/* ======================================================== */}
        {!searchQuery.trim() && (
          <section className="px-5 pt-8 lg:px-8 lg:pt-12">
            <div className="mx-auto max-w-7xl">
              <div className="relative overflow-hidden rounded-3xl border border-amber-300/40 bg-white/90 p-8 shadow-xl backdrop-blur-md transition-all duration-300 ease-out hover:shadow-2xl sm:p-12 lg:p-14">
                {/* ACCENT GLOW */}
                <div className="pointer-events-none absolute -left-20 -top-20 h-64 w-64 rounded-full bg-amber-400/20 blur-3xl" />
                <div className="pointer-events-none absolute -bottom-20 -right-20 h-64 w-64 rounded-full bg-amber-500/20 blur-3xl" />

                <div className="relative z-10 mx-auto max-w-3xl text-center">
               

                  <h1 className="text-3xl font-black tracking-tight text-amber-600 sm:text-4xl lg:text-5xl">
                  Organisasi Mahasiswa Politeknik Negeri Sriwijayai
                  </h1>

                  <p className="mt-4 text-base font-medium leading-relaxed text-slate-600 sm:text-lg">
                    Organisasi Mahasiswa Politeknik Negeri Sriwijaya merupakan
                    wadah mahasiswa untuk mengembangkan minat, bakat,
                    kompetensi, kepemimpinan, kreativitas, serta kontribusi
                    nyata di lingkungan kampus maupun masyarakat luas.
                  </p>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* ======================================================== */}
        {/* JENIS-JENIS ORGANISASI MAHASISWA (HANYA KONDISI KOSONG) */}
        {/* ======================================================== */}
        {!searchQuery.trim() && (
          <section className="px-5 py-12 lg:px-8 lg:py-16">
            <div className="mx-auto max-w-7xl">
              <div className="mx-auto max-w-3xl text-center mb-10">
                <h2 className="text-2xl font-black tracking-tight text-amber-600 sm:text-3xl">
                  JENIS-JENIS ORGANISASI MAHASISWA
                </h2>
                <p className="mt-3 text-sm leading-7 text-slate-600 sm:text-base">
                  Organisasi Mahasiswa Politeknik Negeri Sriwijaya terdiri dari
                  lima bentuk organisasi yang menjadi wadah mahasiswa untuk
                  berorganisasi, mengembangkan potensi, serta berkontribusi di
                  lingkungan kampus.
                </p>
              </div>

              {/* 5 CARDS LAYOUT */}
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-5 items-stretch">
                {/* 1. MPM */}
                <div className="group flex flex-col justify-between rounded-3xl border border-slate-200 bg-white/90 p-6 backdrop-blur-sm transition-all duration-200 ease-out hover:-translate-y-1 hover:border-amber-300 hover:shadow-xl hover:shadow-amber-900/5">
                  <div>
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-50 p-2 mb-5 transition-transform duration-200 group-hover:scale-110 overflow-hidden">
                      <img
                        src="/images/Komunitas/mpm.webp"
                        alt="MPM Logo"
                        className="h-full w-full object-contain"
                      />
                    </div>
                    <h3 className="text-lg font-black tracking-tight text-slate-900 group-hover:text-amber-600 transition-colors">
                      MPM
                    </h3>
                    <p className="mt-1 text-xs font-bold text-amber-600 uppercase tracking-wider">
                      Majelis Permusyawaratan Mahasiswa
                    </p>
                    <p className="mt-3 text-xs leading-relaxed text-slate-600">
                      Organisasi mahasiswa yang menjalankan fungsi legislasi,
                      pengawasan, dan penegakan norma organisasi mahasiswa.
                    </p>
                  </div>
                  <div className="mt-6 pt-4 border-t border-slate-100">
                    <button
                      type="button"
                      onClick={() => scrollToSection("section-mpm")}
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-600 hover:text-amber-700 transition-colors"
                    >
                      Lihat Organisasi
                      <ArrowRight
                        size={14}
                        className="transition-transform duration-200 group-hover:translate-x-1"
                      />
                    </button>
                  </div>
                </div>

                {/* 2. BEM */}
                <div className="group flex flex-col justify-between rounded-3xl border border-slate-200 bg-white/90 p-6 backdrop-blur-sm transition-all duration-200 ease-out hover:-translate-y-1 hover:border-amber-300 hover:shadow-xl hover:shadow-amber-900/5">
                  <div>
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-50 p-2 mb-5 transition-transform duration-200 group-hover:scale-110 overflow-hidden">
                      <img
                        src="/images/logo.png"
                        alt="BEM Logo"
                        className="h-full w-full object-contain"
                      />
                    </div>
                    <h3 className="text-lg font-black tracking-tight text-slate-900 group-hover:text-amber-600 transition-colors">
                      BEM
                    </h3>
                    <p className="mt-1 text-xs font-bold text-amber-600 uppercase tracking-wider">
                      Badan Eksekutif Mahasiswa
                    </p>
                    <p className="mt-3 text-xs leading-relaxed text-slate-600">
                      Lembaga eksekutif mahasiswa yang menjalankan program
                      kerja, mengoordinasikan kegiatan mahasiswa, dan menjadi
                      jembatan antarorganisasi mahasiswa.
                    </p>
                  </div>
                  <div className="mt-6 pt-4 border-t border-slate-100">
                    <button
                      type="button"
                      onClick={() => scrollToSection("section-bem")}
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-600 hover:text-amber-700 transition-colors"
                    >
                      Lihat Organisasi
                      <ArrowRight
                        size={14}
                        className="transition-transform duration-200 group-hover:translate-x-1"
                      />
                    </button>
                  </div>
                </div>

                {/* 3. HMJ */}
                <div className="group flex flex-col justify-between rounded-3xl border border-slate-200 bg-white/90 p-6 backdrop-blur-sm transition-all duration-200 ease-out hover:-translate-y-1 hover:border-amber-300 hover:shadow-xl hover:shadow-amber-900/5">
                  <div>
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-50 text-amber-600 mb-5 transition-transform duration-200 group-hover:scale-110">
                      <House size={24} strokeWidth={2} />
                    </div>
                    <h3 className="text-lg font-black tracking-tight text-slate-900 group-hover:text-amber-600 transition-colors">
                      HMJ
                    </h3>
                    <p className="mt-1 text-xs font-bold text-amber-600 uppercase tracking-wider">
                      Himpunan Mahasiswa Jurusan
                    </p>
                    <p className="mt-3 text-xs leading-relaxed text-slate-600">
                      Wadah mahasiswa pada masing-masing jurusan untuk
                      mengembangkan kompetensi akademik, profesional, dan
                      solidaritas mahasiswa.
                    </p>
                  </div>
                  <div className="mt-6 pt-4 border-t border-slate-100">
                    <button
                      type="button"
                      onClick={() => scrollToSection("section-hmj")}
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-600 hover:text-amber-700 transition-colors"
                    >
                      Lihat Organisasi
                      <ArrowRight
                        size={14}
                        className="transition-transform duration-200 group-hover:translate-x-1"
                      />
                    </button>
                  </div>
                </div>

                {/* 4. UKM */}
                <div className="group flex flex-col justify-between rounded-3xl border border-slate-200 bg-white/90 p-6 backdrop-blur-sm transition-all duration-200 ease-out hover:-translate-y-1 hover:border-amber-300 hover:shadow-xl hover:shadow-amber-900/5">
                  <div>
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-50 text-amber-600 mb-5 transition-transform duration-200 group-hover:scale-110">
                      <Trophy size={24} strokeWidth={2} />
                    </div>
                    <h3 className="text-lg font-black tracking-tight text-slate-900 group-hover:text-amber-600 transition-colors">
                      UKM
                    </h3>
                    <p className="mt-1 text-xs font-bold text-amber-600 uppercase tracking-wider">
                      Unit Kegiatan Mahasiswa
                    </p>
                    <p className="mt-3 text-xs leading-relaxed text-slate-600">
                      Wadah mahasiswa untuk mengembangkan minat, bakat,
                      kreativitas, dan prestasi dalam berbagai bidang.
                    </p>
                  </div>
                  <div className="mt-6 pt-4 border-t border-slate-100">
                    <button
                      type="button"
                      onClick={() => scrollToSection("section-ukm")}
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-600 hover:text-amber-700 transition-colors"
                    >
                      Lihat Organisasi
                      <ArrowRight
                        size={14}
                        className="transition-transform duration-200 group-hover:translate-x-1"
                      />
                    </button>
                  </div>
                </div>

                {/* 5. KOMUNITAS */}
                <div className="group flex flex-col justify-between rounded-3xl border border-slate-200 bg-white/90 p-6 backdrop-blur-sm transition-all duration-200 ease-out hover:-translate-y-1 hover:border-amber-300 hover:shadow-xl hover:shadow-amber-900/5 sm:col-span-2 lg:col-span-1">
                  <div>
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-50 text-amber-600 mb-5 transition-transform duration-200 group-hover:scale-110">
                      <UsersRound size={24} strokeWidth={2} />
                    </div>
                    <h3 className="text-lg font-black tracking-tight text-slate-900 group-hover:text-amber-600 transition-colors">
                      KOMUNITAS
                    </h3>
                    <p className="mt-1 text-xs font-bold text-amber-600 uppercase tracking-wider">
                      Komunitas Kampus
                    </p>
                    <p className="mt-3 text-xs leading-relaxed text-slate-600">
                      Ruang kolaborasi mahasiswa yang terbentuk berdasarkan
                      minat, kreativitas, bakat, dan ketertarikan yang sama.
                    </p>
                  </div>
                  <div className="mt-6 pt-4 border-t border-slate-100">
                    <button
                      type="button"
                      onClick={() => scrollToSection("section-komunitas")}
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-600 hover:text-amber-700 transition-colors"
                    >
                      Lihat Organisasi
                      <ArrowRight
                        size={14}
                        className="transition-transform duration-200 group-hover:translate-x-1"
                      />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* ======================================================== */}
        {/* INTERACTIVE FILTER & SEARCH TOOLBAR */}
        {/* ======================================================== */}
        <section className="sticky top-[80px] z-40 px-5 py-3 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="flex flex-col gap-4 rounded-2xl border border-amber-300/40 bg-white/95 p-3.5 shadow-lg backdrop-blur-xl sm:flex-row sm:items-center sm:justify-between">
              {/* FILTER BUTTONS */}
              <div className="flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  onClick={() => scrollToSection("section-mpm")}
                  className="rounded-xl border border-amber-200 bg-amber-50/80 px-4 py-2 text-xs font-bold text-amber-600 transition-all duration-200 hover:bg-amber-500 hover:text-white active:scale-[0.98]"
                >
                  MPM
                </button>
                <button
                  type="button"
                  onClick={() => scrollToSection("section-bem")}
                  className="rounded-xl border border-amber-200 bg-amber-50/80 px-4 py-2 text-xs font-bold text-amber-600 transition-all duration-200 hover:bg-amber-500 hover:text-white active:scale-[0.98]"
                >
                  BEM
                </button>
                <button
                  type="button"
                  onClick={() => scrollToSection("section-hmj")}
                  className="rounded-xl border border-amber-200 bg-amber-50/80 px-4 py-2 text-xs font-bold text-amber-600 transition-all duration-200 hover:bg-amber-500 hover:text-white active:scale-[0.98]"
                >
                  HMJ (10)
                </button>
                <button
                  type="button"
                  onClick={() => scrollToSection("section-ukm")}
                  className="rounded-xl border border-amber-200 bg-amber-50/80 px-4 py-2 text-xs font-bold text-amber-600 transition-all duration-200 hover:bg-amber-500 hover:text-white active:scale-[0.98]"
                >
                  UKM (7)
                </button>
                <button
                  type="button"
                  onClick={() => scrollToSection("section-komunitas")}
                  className="rounded-xl border border-amber-200 bg-amber-50/80 px-4 py-2 text-xs font-bold text-amber-600 transition-all duration-200 hover:bg-amber-500 hover:text-white active:scale-[0.98]"
                >
                  Komunitas (5)
                </button>
              </div>

              {/* SEARCH INPUT */}
              <div className="relative w-full sm:w-64">
                <Search
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                  size={16}
                />
                <input
                  type="text"
                  placeholder="Cari organisasi..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50/80 py-2 pl-9 pr-4 text-xs font-medium text-slate-800 outline-none transition-all placeholder:text-slate-400 focus:border-amber-400 focus:bg-white focus:ring-2 focus:ring-amber-400/30"
                />
              </div>
            </div>
          </div>
        </section>

        {/* ======================================================== */}
        {/* CONDITIONAL RENDERING: SEARCH RESULTS MODE VS NORMAL MODE */}
        {/* ======================================================== */}
        {searchQuery.trim() ? (
          <section className="px-5 py-10 lg:px-8">
            <div className="mx-auto max-w-7xl">
              {searchResults.length > 0 ? (
                <div>
                  <div className="mb-6">
                    <h2 className="text-2xl font-black tracking-tight text-amber-600 sm:text-3xl">
                      HASIL PENCARIAN
                    </h2>
                    <p className="mt-1 text-sm text-slate-600">
                      Menampilkan {searchResults.length} organisasi yang sesuai
                      dengan "{searchQuery}"
                    </p>
                  </div>

                  <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
                    {searchResults.map((item) => (
                      <OrgCard key={item.id} item={item} />
                    ))}
                  </div>
                </div>
              ) : (
                <div className="mx-auto max-w-md rounded-3xl border border-slate-200 bg-white/90 p-10 text-center shadow-lg backdrop-blur-md">
                  <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-amber-50 text-amber-600">
                    <Search size={24} />
                  </div>
                  <h3 className="text-lg font-black tracking-tight text-slate-900">
                    Organisasi tidak ditemukan
                  </h3>
                  <p className="mt-2 text-xs leading-relaxed text-slate-600">
                    Tidak ada organisasi yang sesuai dengan pencarian "
                    {searchQuery}".
                  </p>
                  <button
                    type="button"
                    onClick={() => setSearchQuery("")}
                    className="mt-6 inline-flex items-center gap-2 rounded-xl bg-amber-500 px-5 py-2.5 text-xs font-bold text-white shadow-md shadow-amber-500/20 transition-all hover:bg-amber-600 active:scale-95"
                  >
                    <RotateCcw size={14} />
                    Reset Pencarian
                  </button>
                </div>
              )}
            </div>
          </section>
        ) : (
          <>
            {/* ======================================================== */}
            {/* SECTION MPM */}
            {/* ======================================================== */}
            <section
              id="section-mpm"
              className="scroll-mt-36 px-5 py-10 lg:px-8"
            >
              <div className="mx-auto max-w-7xl">
                <div className="max-w-3xl">
                  <h2 className="text-2xl font-black tracking-tight text-amber-600 sm:text-3xl">
                    MAJELIS PERMUSYAWARATAN MAHASISWA
                  </h2>
                  <p className="mt-2 text-sm leading-7 text-slate-600">
                    Organisasi mahasiswa yang menjalankan fungsi legislasi,
                    pengawasan, dan penegakan norma organisasi mahasiswa.
                  </p>
                </div>

                <div className="mt-8 grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
                  {mpmData.map((item) => (
                    <OrgCard key={item.id} item={item} />
                  ))}
                </div>
              </div>
            </section>

            {/* ======================================================== */}
            {/* SECTION BEM */}
            {/* ======================================================== */}
            <section
              id="section-bem"
              className="scroll-mt-36 px-5 py-10 lg:px-8"
            >
              <div className="mx-auto max-w-7xl">
                <div className="max-w-3xl">
                  <h2 className="text-2xl font-black tracking-tight text-amber-600 sm:text-3xl">
                    BADAN EKSEKUTIF MAHASISWA
                  </h2>
                  <p className="mt-2 text-sm leading-7 text-slate-600">
                    Lembaga eksekutif mahasiswa yang menjalankan program kerja,
                    mengoordinasikan kegiatan mahasiswa, dan menjadi jembatan
                    antarorganisasi mahasiswa.
                  </p>
                </div>

                <div className="mt-8 grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
                  {bemData.map((item) => (
                    <OrgCard key={item.id} item={item} />
                  ))}
                </div>
              </div>
            </section>

            {/* ======================================================== */}
            {/* SECTION HMJ */}
            {/* ======================================================== */}
            <section
              id="section-hmj"
              className="scroll-mt-36 px-5 py-10 lg:px-8"
            >
              <div className="mx-auto max-w-7xl">
                <div className="max-w-3xl">
                  <h2 className="text-2xl font-black tracking-tight text-amber-600 sm:text-3xl">
                    HIMPUNAN MAHASISWA JURUSAN
                  </h2>
                  <p className="mt-2 text-sm leading-7 text-slate-600">
                    Wadah mahasiswa pada masing-masing jurusan untuk
                    mengembangkan kompetensi akademik, profesional, dan
                    solidaritas mahasiswa.
                  </p>
                </div>

                <div className="mt-8 grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
                  {hmjData.map((item) => (
                    <OrgCard key={item.id} item={item} />
                  ))}
                </div>
              </div>
            </section>

            {/* ======================================================== */}
            {/* SECTION UKM */}
            {/* ======================================================== */}
            <section
              id="section-ukm"
              className="scroll-mt-36 px-5 py-10 lg:px-8"
            >
              <div className="mx-auto max-w-7xl">
                <div className="max-w-3xl">
                  <h2 className="text-2xl font-black tracking-tight text-amber-600 sm:text-3xl">
                    UNIT KEGIATAN MAHASISWA
                  </h2>
                  <p className="mt-2 text-sm leading-7 text-slate-600">
                    Wadah mahasiswa Politeknik Negeri Sriwijaya untuk
                    mengembangkan minat, bakat, kreativitas, dan prestasi.
                  </p>
                </div>

                <div className="mt-8 grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                  {ukmData.map((item) => (
                    <OrgCard key={item.id} item={item} />
                  ))}
                </div>
              </div>
            </section>

            {/* ======================================================== */}
            {/* SECTION KOMUNITAS */}
            {/* ======================================================== */}
            <section
              id="section-komunitas"
              className="scroll-mt-36 px-5 py-10 lg:px-8"
            >
              <div className="mx-auto max-w-7xl">
                <div className="max-w-3xl">
                  <h2 className="text-2xl font-black tracking-tight text-amber-600 sm:text-3xl">
                    KOMUNITAS
                  </h2>
                  <p className="mt-2 text-sm leading-7 text-slate-600">
                    Ruang kolaborasi mahasiswa yang terbentuk berdasarkan minat,
                    kreativitas, bakat, dan ketertarikan yang sama.
                  </p>
                </div>

                <div className="mt-8 grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3">
                  {komunitasData.map((item) => (
                    <OrgCard key={item.id} item={item} />
                  ))}
                </div>
              </div>
            </section>
          </>
        )}

        {/* ======================================================== */}
        {/* CTA / PENUTUP */}
        {/* ======================================================== */}
        <section className="px-5 py-16 lg:px-8 lg:py-20">
          <div className="mx-auto max-w-4xl text-center">
            <div className="rounded-3xl border border-amber-300/40 bg-white/90 p-8 shadow-xl backdrop-blur-md transition-all duration-300 ease-out hover:shadow-2xl sm:p-12">
              <UsersRound
                size={48}
                className="mx-auto mb-4 text-amber-500"
                strokeWidth={2}
              />

              <h2 className="text-3xl font-black tracking-tight text-amber-600 sm:text-4xl">
                BERSAMA, BERKOLABORASI, DAN BERDAMPAK
              </h2>

              <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-slate-600">
                Temukan tempat bereksplorasi dan maksimalkan potensi terbaikmu
                selama perkuliahan di Politeknik Negeri Sriwijaya.
              </p>

              <Link
                to="/contact"
                className="mt-8 inline-flex items-center gap-3 rounded-full bg-amber-500 px-10 py-4 text-sm font-bold text-white shadow-lg shadow-amber-500/30 outline-none transition-all duration-200 ease-out hover:bg-amber-600 hover:shadow-amber-500/40 active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-amber-400/70"
              >
                HUBUNGI KAMI
                <ArrowRight size={18} />
              </Link>
            </div>
          </div>
        </section>

        {/* ======================================================== */}
        {/* FOOTER — PERSIS DENGAN KAJIAN.TSX */}
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
                    to="/#visi"
                    className="rounded-md outline-none transition-all duration-200 hover:text-white focus-visible:ring-2 focus-visible:ring-amber-400/60"
                  >
                    Tentang Kami
                  </Link>

                  <Link
                    to="/#agenda"
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

                <p className="mt-3 text-sm leading-6 text-slate-400">
                  Jl. Srijaya Negara, Bukit Besar,
                  <br />
                  Palembang, Sumatera Selatan
                </p>

                <div className="mt-5 flex gap-2">
                  {/* INSTAGRAM */}
                  <a
                    href="https://www.instagram.com/bempolsri_?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Instagram"
                    className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-800 text-slate-300 outline-none transition-all duration-200 hover:bg-amber-500 hover:text-white active:scale-[0.95] focus-visible:ring-2 focus-visible:ring-amber-400/70"
                  >
                    <Instagram size={16} />
                  </a>

                  {/* X */}
                  <a
                    href="https://x.com/polsrimenfess"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="X Twitter"
                    className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-800 text-slate-300 outline-none transition-all duration-200 hover:bg-amber-500 hover:text-white active:scale-[0.95] focus-visible:ring-2 focus-visible:ring-amber-400/70"
                  >
                    𝕏
                  </a>

                  {/* YOUTUBE */}
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

// ============================================================
// SUBKOMPONEN CARD ORGANISASI MAHASISWA (PERSIS GAYA KAJIAN)
// ============================================================
function OrgCard({ item }: { item: OrgItem }) {
  const [imgError, setImgError] = useState(false);

  return (
    <article className="group flex flex-col justify-between rounded-3xl border border-slate-200 bg-white/90 p-6 backdrop-blur-sm transition-all duration-200 ease-out hover:-translate-y-1 hover:border-amber-300 hover:shadow-xl hover:shadow-amber-900/5">
      <div>
        {/* TOP BADGE */}
        <div className="flex items-center justify-between">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-50 px-3 py-1 text-[10px] font-bold uppercase tracking-wide text-amber-600">
            {item.category}
          </span>
          <ExternalLink
            size={16}
            className="text-slate-300 transition-all duration-200 group-hover:text-amber-500"
          />
        </div>

        {/* LOGO ORGANISASI */}
        <div className="my-6 flex h-28 w-full items-center justify-center rounded-2xl bg-slate-50/70 p-3 transition-transform duration-200 group-hover:scale-105">
          {!imgError ? (
            <img
              src={item.image}
              alt={item.name}
              onError={() => setImgError(true)}
              className="max-h-full max-w-full object-contain drop-shadow-sm"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center rounded-xl bg-amber-100/70 font-black text-amber-600">
              {item.name.substring(0, 3).toUpperCase()}
            </div>
          )}
        </div>

        {/* NAMA ORGANISASI */}
        <h3 className="text-base font-black leading-snug text-slate-900 transition-colors duration-200 group-hover:text-amber-600">
          {item.name}
        </h3>
      </div>

      {/* FOOTER CARD */}
      <div className="mt-6 border-t border-slate-100 pt-4">
        <span className="inline-flex items-center gap-1 text-xs font-bold text-amber-600">
          Lihat Detail
          <ArrowUpRight
            size={14}
            className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          />
        </span>
      </div>
    </article>
  );
}
