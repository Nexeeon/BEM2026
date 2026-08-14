import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  ArrowUpRight,
  CalendarDays,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Compass,
  Instagram,
  Lightbulb,
  Mail,
  Megaphone,
  Menu,
  Scale,
  Target,
  Users,
  X,
  Youtube,
  LucideProps,
} from "lucide-react";

type DropdownName = "academic" | "echo" | null;

interface MissionItem {
  icon: React.ComponentType<LucideProps>;
  number: string;
  text: string;
}

interface UpdateInfoItemData {
  number: string;
  category: string;
  title: string;
  description: string;
  fullDescription: string;
  image: string;
}

/* DATA 3 UPDATE INFO TERBARU */
const updateInfos: UpdateInfoItemData[] = [
  {
    number: "01",
    category: "INOVASI & KREATIVITAS",
    title: "Program Kreatifitas Mahasiswa",
    description:
      "Kegiatan Ditjenbelmawa & Kemendikbudristek untuk memberi ruang mahasiswa mengembangkan potensi dan keahlian inovasi.",
    fullDescription:
      "Program Kreatifitas Mahasiswa (PKM) adalah kegiatan yang diselenggarkan oleh Ditjenbelmawa (Direktorat Jendral Pembelajaran dan Kemahasiswaan) Serta Kemendikbudristek dengan tujuan untuk memberi ruang kepada mahasiswa dalam mengembangkan potensi dan keahlian pada inovasi dan kreatifitas.",
    image: "/images/Program_Kreatifitas_Mahasiswa.jpg",
  },
  {
    number: "02",
    category: "ORGANISASI & KEPEMIMPINAN",
    title: "PPK ORMAWA",
    description:
      "Program memperkuat peran organisasi kemahasiswaan dalam pengembangan kapasitas, kepemimpinan, dan kontribusi nyata.",
    fullDescription:
      "PPK ORMAWA (Program Penguatan Kapasitas Organisasi Kemahasiswaan) Tahun 2025 merupakan program yang bertujuan untuk memperkuat peran organisasi kemahasiswaan dalam pengembangan kapasitas, kepemimpinan, serta kontribusi nyata terhadap masyarakat. Program ini menyeleksi proposal kegiatan dari berbagai organisasi mahasiswa. Sebanyak 10 proposal terbaik diumumkan sebagai bentuk apresiasi atas gagasan dan rencana kegiatan yang dinilai unggul dan berdampak.",
    image: "/images/PPK_ORMAWA.jpg",
  },
  {
    number: "03",
    category: "KEWIRAUSAHAAN",
    title: "Program Mahasiswa Wirausaha (PMW)",
    description:
      "Program Polsri melalui UPKK untuk membekali mahasiswa dengan pengetahuan dan pengalaman berwirausaha nyata.",
    fullDescription:
      "Program Mahasiswa Wirausaha (PMW) Tahun 2025 adalah program yang diselenggarakan oleh Politeknik Negeri Sriwijaya melalui Unit Pengembangan Karir dan Kewirausahaan. Tujuannya adalah membekali mahasiswa dengan pengetahuan dan pengalaman berwirausaha secara nyata. Tahapan program meliputi seleksi proposal, pembekalan, pendampingan bisnis, program magang, monitoring dan evaluasi, hingga kompetisi dan expo rencana bisnis.",
    image: "/images/Program_Mahasiswa_Wirausaha.jpg",
  },
];

const missions: MissionItem[] = [
  {
    icon: Compass,
    number: "01",
    text: "Mewadahi dan memperjuangkan aspirasi mahasiswa secara terbuka, responsif, dan bertanggung jawab melalui mekanisme penyerapan aspirasi yang aktif, dialogis, dan berkelanjutan.",
  },
  {
    icon: Lightbulb,
    number: "02",
    text: "Mendorong peningkatan kualitas pembelajaran organisasi dan kepemimpinan mahasiswa melalui program pengembangan soft skill, manajerial, dan profesionalisme yang terarah.",
  },
  {
    icon: Scale,
    number: "03",
    text: "Mengembangkan budaya kajian dan advokasi yang konstruktif dan solutif sebagai landasan pengambilan sikap BEM terhadap isu-isu yang ada.",
  },
  {
    icon: Users,
    number: "04",
    text: "Memperkuat sinergi dan kolaborasi internal maupun eksternal melalui kerja sama antar lembaga mahasiswa serta partisipasi aktif dalam kegiatan yang berdampak positif.",
  },
  {
    icon: Megaphone,
    number: "05",
    text: "Meningkatkan kualitas dan kuantitas informasi yang disajikan kepada mahasiswa dan masyarakat melalui berbagai media.",
  },
];

interface CalendarMonthData {
  year: number;
  monthIndex: number;
  monthName: string;
  firstDayOffset: number;
  daysInMonth: number;
  events: {
    day: string;
    title: string;
    type: "Akademik" | "Agenda BEM" | "Kemahasiswaan";
    color: string;
    dayNum: number;
  }[];
}

const academicCalendarData: CalendarMonthData[] = [
  {
    year: 2026,
    monthIndex: 8,
    monthName: "September 2026",
    firstDayOffset: 2,
    daysInMonth: 30,
    events: [
      {
        day: "07",
        dayNum: 7,
        title: "Awal Kegiatan SMT. Ganjil TA 2026/2027",
        type: "Akademik",
        color: "bg-amber-500",
      },
      {
        day: "21-25",
        dayNum: 21,
        title: "Audit Mutu Internal (AMI)",
        type: "Akademik",
        color: "bg-slate-700",
      },
    ],
  },
  {
    year: 2026,
    monthIndex: 9,
    monthName: "Oktober 2026",
    firstDayOffset: 4,
    daysInMonth: 31,
    events: [
      {
        day: "19-21",
        dayNum: 19,
        title: "Ujian LA/Skripsi Susulan (3 bln)",
        type: "Akademik",
        color: "bg-amber-600",
      },
      {
        day: "26-31",
        dayNum: 26,
        title: "Ujian Tengah Semester (UTS) Ganjil",
        type: "Akademik",
        color: "bg-orange-500",
      },
      {
        day: "27",
        dayNum: 27,
        title: "Yudisium Susulan",
        type: "Akademik",
        color: "bg-slate-700",
      },
    ],
  },
  {
    year: 2026,
    monthIndex: 10,
    monthName: "November 2026",
    firstDayOffset: 0,
    daysInMonth: 30,
    events: [
      {
        day: "02-07",
        dayNum: 2,
        title: "Input Nilai UTS di SISAK",
        type: "Akademik",
        color: "bg-yellow-500",
      },
      {
        day: "07",
        dayNum: 7,
        title: "Wisuda ke-42 Susulan",
        type: "Kemahasiswaan",
        color: "bg-amber-400",
      },
    ],
  },
  {
    year: 2026,
    monthIndex: 11,
    monthName: "Desember 2026",
    firstDayOffset: 2,
    daysInMonth: 31,
    events: [
      {
        day: "25",
        dayNum: 25,
        title: "Libur Akhir Tahun 2026",
        type: "Akademik",
        color: "bg-slate-800",
      },
    ],
  },
  {
    year: 2027,
    monthIndex: 0,
    monthName: "Januari 2027",
    firstDayOffset: 5,
    daysInMonth: 31,
    events: [
      {
        day: "09",
        dayNum: 9,
        title: "Akhir Kegiatan Pembelajaran SMT Ganjil",
        type: "Akademik",
        color: "bg-amber-600",
      },
      {
        day: "11-16",
        dayNum: 11,
        title: "Ujian Akhir Semester (UAS) Ganjil",
        type: "Akademik",
        color: "bg-orange-500",
      },
      {
        day: "12-23",
        dayNum: 12,
        title: "Input Nilai UAS di SISAK",
        type: "Akademik",
        color: "bg-yellow-500",
      },
      {
        day: "18-23",
        dayNum: 18,
        title: "Seminar Laporan KP",
        type: "Akademik",
        color: "bg-slate-700",
      },
      {
        day: "25-27",
        dayNum: 25,
        title: "Pra Yudisium Semester Ganjil",
        type: "Akademik",
        color: "bg-slate-800",
      },
      {
        day: "29",
        dayNum: 29,
        title: "Yudisium Semester Ganjil TA 2026/2027",
        type: "Akademik",
        color: "bg-amber-500",
      },
    ],
  },
  {
    year: 2027,
    monthIndex: 1,
    monthName: "Februari 2027",
    firstDayOffset: 1,
    daysInMonth: 28,
    events: [
      {
        day: "01-12",
        dayNum: 1,
        title: "Libur Semester Ganjil & Daftar Ulang SMT Genap",
        type: "Akademik",
        color: "bg-slate-700",
      },
      {
        day: "15",
        dayNum: 15,
        title: "Awal Kegiatan Pembelajaran SMT Genap",
        type: "Akademik",
        color: "bg-amber-500",
      },
      {
        day: "22-26",
        dayNum: 22,
        title: "Pelaporan Data PDDikti",
        type: "Akademik",
        color: "bg-yellow-500",
      },
    ],
  },
  {
    year: 2027,
    monthIndex: 2,
    monthName: "Maret 2027",
    firstDayOffset: 1,
    daysInMonth: 31,
    events: [
      {
        day: "10-11",
        dayNum: 10,
        title: "Libur Hari Raya Idul Fitri TA 2026/2027",
        type: "Akademik",
        color: "bg-amber-400",
      },
    ],
  },
  {
    year: 2027,
    monthIndex: 3,
    monthName: "April 2027",
    firstDayOffset: 4,
    daysInMonth: 30,
    events: [
      {
        day: "12-17",
        dayNum: 12,
        title: "Ujian Tengah Semester (UTS) Genap",
        type: "Akademik",
        color: "bg-orange-500",
      },
      {
        day: "19-23",
        dayNum: 19,
        title: "Input Nilai UTS di SISAK",
        type: "Akademik",
        color: "bg-yellow-500",
      },
    ],
  },
];

export default function Home() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<DropdownName>(null);
  const [currentMonthIdx, setCurrentMonthIdx] = useState(0);
  const [scrolled, setScrolled] = useState(false);
  const [selectedModal, setSelectedModal] = useState<UpdateInfoItemData | null>(
    null,
  );

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const toggleDropdown = (name: Exclude<DropdownName, null>) => {
    setOpenDropdown(openDropdown === name ? null : name);
  };

  const closeMenus = () => {
    setMobileOpen(false);
    setOpenDropdown(null);
  };

  const activeMonth = academicCalendarData[currentMonthIdx];

  const handlePrevMonth = () => {
    if (currentMonthIdx > 0) {
      setCurrentMonthIdx(currentMonthIdx - 1);
    }
  };

  const handleNextMonth = () => {
    if (currentMonthIdx < academicCalendarData.length - 1) {
      setCurrentMonthIdx(currentMonthIdx + 1);
    }
  };

  return (
    <main className="relative min-h-screen overflow-x-clip bg-[url('/images/bgweb.jpeg')] bg-cover bg-fixed bg-center bg-no-repeat pt-[72px] text-slate-900 scroll-smooth">
      <div className="min-h-screen bg-white/65">
        {/* NAVBAR */}
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

              {/* DESKTOP NAV */}
              <nav className="hidden items-center gap-1 lg:flex">
                <Link
                  to="/"
                  className="rounded-lg px-3.5 py-2 text-sm font-medium text-amber-600 outline-none transition-all duration-200 ease-out hover:bg-amber-50/80 hover:text-amber-700 active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-amber-400/70"
                  onClick={closeMenus}
                >
                  Home
                </Link>

                <a
                  href="#visi"
                  className="rounded-lg px-3.5 py-2 text-sm font-medium text-slate-600 outline-none transition-all duration-200 ease-out hover:bg-white/55 hover:text-amber-600 active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-amber-400/70"
                  onClick={closeMenus}
                >
                  About
                </a>

                {/* ACADEMIC INFORMATION */}
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => toggleDropdown("academic")}
                    className={`flex items-center gap-1 rounded-lg px-3.5 py-2 text-sm font-medium outline-none transition-all duration-200 ease-out active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-amber-400/70 ${
                      openDropdown === "academic"
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

                      <a
                        href="#"
                        className="block rounded-lg px-3 py-2.5 text-xs font-semibold text-slate-600 outline-none transition-all duration-200 ease-out hover:bg-amber-50 hover:text-amber-700 active:scale-[0.99] focus-visible:ring-2 focus-visible:ring-amber-400/50"
                        onClick={(e) => e.preventDefault()}
                      >
                        Polsrifess
                      </a>
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
                  className="block rounded-lg px-3 py-3 text-sm font-semibold text-amber-600 outline-none transition-all duration-200 hover:bg-amber-50 active:scale-[0.99] focus-visible:ring-2 focus-visible:ring-amber-400/50"
                  onClick={closeMenus}
                >
                  Home
                </Link>

                <a
                  href="#visi"
                  className="block rounded-lg px-3 py-3 text-sm font-medium text-slate-600 outline-none transition-all duration-200 hover:bg-slate-50 hover:text-amber-600 active:scale-[0.99] focus-visible:ring-2 focus-visible:ring-amber-400/50"
                  onClick={closeMenus}
                >
                  About
                </a>

                <button
                  type="button"
                  className={`mt-1 flex w-full items-center justify-between rounded-lg px-3 py-3 text-sm font-medium outline-none transition-all duration-200 ease-out active:scale-[0.99] focus-visible:ring-2 focus-visible:ring-amber-400/50 ${
                    openDropdown === "academic"
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
                      className="block rounded-md px-3 py-2.5 text-sm font-semibold text-slate-600 outline-none transition-all duration-200 hover:bg-white hover:text-amber-700 active:scale-[0.99] focus-visible:ring-2 focus-visible:ring-amber-400/50"
                      onClick={closeMenus}
                    >
                      Academic Calendar
                    </Link>

                    <a
                      href="#agenda"
                      className="block rounded-md px-3 py-2.5 text-sm text-slate-600 outline-none transition-all duration-200 hover:bg-white hover:text-amber-700 active:scale-[0.99] focus-visible:ring-2 focus-visible:ring-amber-400/50"
                      onClick={closeMenus}
                    >
                      Scholarship Info
                    </a>

                    <a
                      href="#agenda"
                      className="block rounded-md px-3 py-2.5 text-sm text-slate-600 outline-none transition-all duration-200 hover:bg-white hover:text-amber-700 active:scale-[0.99] focus-visible:ring-2 focus-visible:ring-amber-400/50"
                      onClick={closeMenus}
                    >
                      Organisasi Mahasiswa
                    </a>

                    <a
                      href="#agenda"
                      className="block rounded-md px-3 py-2.5 text-sm text-slate-600 outline-none transition-all duration-200 hover:bg-white hover:text-amber-700 active:scale-[0.99] focus-visible:ring-2 focus-visible:ring-amber-400/50"
                      onClick={closeMenus}
                    >
                      Mahasiswa Berdampak
                    </a>
                  </div>
                )}

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
                      className="block rounded-md px-3 py-2.5 text-sm text-slate-600 outline-none transition-all duration-200 hover:bg-white hover:text-amber-700 active:scale-[0.99] focus-visible:ring-2 focus-visible:ring-amber-400/50"
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

                    <a
                      href="#"
                      className="block rounded-md px-3 py-2.5 text-sm text-slate-600 outline-none transition-all duration-200 hover:bg-white hover:text-amber-700 active:scale-[0.99] focus-visible:ring-2 focus-visible:ring-amber-400/50"
                      onClick={(e) => e.preventDefault()}
                    >
                      Polsrifess
                    </a>
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

        {/* HERO */}
        <section
          id="home"
          className="relative mx-auto flex min-h-[calc(100vh-72px)] w-full max-w-7xl items-center justify-center px-[clamp(1.25rem,4vw,3.5rem)] py-[clamp(1.5rem,3.5vh,4rem)]"
        >
          <div className="grid w-full items-center gap-[clamp(1.5rem,3.5vw,4rem)] lg:grid-cols-12">
            <div className="relative z-10 flex flex-col items-start justify-center text-left lg:col-span-6">
              <h1
                className="font-serif font-black uppercase tracking-wide text-amber-500 leading-[1.12]"
                style={{ fontSize: "clamp(2.2rem, 4.5vw, 4rem)" }}
              >
                BEM POLITEKNIK NEGERI SRIWIJAYA
              </h1>

              <p
                className="mt-[clamp(1rem,1.8vw,1.75rem)] max-w-xl font-medium leading-relaxed text-slate-700"
                style={{ fontSize: "clamp(0.875rem, 1.1vw, 1.05rem)" }}
              >
                BEM Polsri adalah organisasi mahasiswa yang menjalankan fungsi
                eksekutif di lingkungan Politeknik Negeri Sriwijaya. Kami
                berkomitmen untuk menjadi wadah yang aktif, responsif, dan
                konstruktif melalui berbagai program kerja, pengabdian, serta
                pelayanan yang berdampak bagi mahasiswa dan masyarakat.
              </p>

              <div className="mt-[clamp(1.25rem,2.2vw,2.25rem)]" />
            </div>

            <div className="relative flex w-full items-center justify-center lg:col-span-6 lg:justify-end">
              <div className="relative flex w-full items-center justify-center">
                <div
                  className="pointer-events-none absolute right-0 top-1/2 -translate-y-1/2 rounded-full bg-gradient-to-tr from-amber-400/20 via-orange-300/15 to-amber-200/30 blur-2xl"
                  style={{
                    width: "clamp(260px, 38vw, 540px)",
                    height: "clamp(260px, 38vw, 540px)",
                  }}
                />

                <img
                  src="/images/logo.png"
                  alt="Gedung Politeknik Negeri Sriwijaya"
                  className="relative z-10 h-auto w-full object-contain filter drop-shadow-md transition-all duration-300"
                  style={{
                    width: "clamp(280px, 42vw, 580px)",
                    maxHeight: "clamp(320px, 58vh, 600px)",
                  }}
                />
              </div>
            </div>
          </div>
        </section>

        {/* VISI & MISI */}
        <section
          id="visi"
          className="bg-white/85 px-5 py-20 backdrop-blur-md lg:px-8 lg:py-28"
        >
          <div className="mx-auto max-w-7xl">
            <SectionIntro
              eyebrow="Arah Gerak Kami"
              title="Visi & Misi BEM Polsri — Kabinet Kilau Gemilang"
              text="Menjadi penerang bagi seluruh mahasiswa untuk bertumbuh, berkolaborasi, dan menciptakan perubahan yang berarti."
            />

            <div className="mt-14 grid gap-5 lg:grid-cols-[.8fr_1.2fr]">
              <div className="relative overflow-hidden rounded-3xl border border-amber-300/40 bg-gradient-to-br from-amber-50 via-white to-amber-50 p-8 shadow-xl backdrop-blur-md lg:p-10">
                <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full border-[25px] border-amber-500/20" />

                <div className="relative">
                  <div className="mb-8 flex items-center justify-between">
                    <span className="rounded-full bg-amber-400 px-3 py-1.5 text-[10px] font-black uppercase tracking-widest text-slate-900">
                      Visi
                    </span>

                    <Target className="text-amber-500" size={30} />
                  </div>

                  <h3 className="text-2xl font-bold leading-snug text-slate-900">
                    Menjadikan BEM Polsri sebagai lembaga{" "}
                    <span className="text-amber-600">berdampak positif</span>{" "}
                    bagi mahasiswa dan institusi.
                  </h3>

                  <p className="mt-7 text-sm leading-7 text-slate-600">
                    Menjadikan Badan Eksekutif Mahasiswa Politeknik Negeri
                    Sriwijaya sebagai lembaga yang berdampak positif bagi
                    Mahasiswa/i dan Institusi Politeknik Negeri Sriwijaya.
                  </p>
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                {missions.map((mission) => {
                  const Icon = mission.icon;
                  return (
                    <article
                      key={mission.number}
                      className="group rounded-3xl border border-slate-200 bg-white/90 p-6 backdrop-blur-sm transition-all duration-200 ease-out hover:-translate-y-1 hover:border-amber-300 hover:shadow-xl hover:shadow-amber-900/5"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-amber-50 text-amber-600 transition-all duration-200 group-hover:bg-amber-500 group-hover:text-white">
                          <Icon size={21} />
                        </div>

                        <span className="text-3xl font-black text-slate-200">
                          {mission.number}
                        </span>
                      </div>

                      <p className="mt-5 text-xs leading-6 text-slate-600">
                        {mission.text}
                      </p>
                    </article>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* AGENDA & KALENDER */}
        <section
          id="agenda"
          className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-28"
        >
          <SectionIntro
            eyebrow="Catat Tanggalnya"
            title="Kalender Kegiatan & Akademik"
            text="Ikuti berbagai agenda penting dan kegiatan akademis resmi Politeknik Negeri Sriwijaya Tahun Akademik 2026/2027."
          />

          <div className="mt-10 grid gap-6 lg:grid-cols-[.85fr_1.15fr]">
            {/* KALENDER */}
            <div className="rounded-3xl bg-white/90 p-5 shadow-lg shadow-slate-900/5 backdrop-blur-md sm:p-8">
              <div className="flex items-center justify-between">
                <button
                  type="button"
                  aria-label="Bulan sebelumnya"
                  onClick={handlePrevMonth}
                  disabled={currentMonthIdx === 0}
                  className="rounded-full p-2 text-slate-500 outline-none transition-all duration-200 hover:bg-amber-50 hover:text-amber-600 active:scale-[0.96] disabled:opacity-30"
                >
                  <ChevronLeft size={20} />
                </button>

                <div className="text-center">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-amber-600 sm:text-xs">
                    Kalender Akademik 2026/2027
                  </p>

                  <h3 className="mt-0.5 text-lg font-black text-slate-900 sm:text-xl">
                    {activeMonth.monthName}
                  </h3>
                </div>

                <button
                  type="button"
                  aria-label="Bulan berikutnya"
                  onClick={handleNextMonth}
                  disabled={currentMonthIdx === academicCalendarData.length - 1}
                  className="rounded-full p-2 text-slate-500 outline-none transition-all duration-200 hover:bg-amber-50 hover:text-amber-600 active:scale-[0.96] disabled:opacity-30"
                >
                  <ChevronRight size={20} />
                </button>
              </div>

              <div className="mt-6 grid grid-cols-7 gap-1 text-center text-[10px] font-bold text-slate-400 sm:gap-2 sm:text-xs">
                {["MIN", "SEN", "SEL", "RAB", "KAM", "JUM", "SAB"].map(
                  (day) => (
                    <span key={day} className="py-1">
                      {day}
                    </span>
                  ),
                )}

                {Array.from({ length: activeMonth.firstDayOffset }, (_, i) => (
                  <div key={`empty-${i}`} className="aspect-square" />
                ))}

                {Array.from({ length: activeMonth.daysInMonth }, (_, index) => {
                  const dayNumber = index + 1;
                  const eventMatch = activeMonth.events.find(
                    (e) => e.dayNum === dayNumber,
                  );

                  return (
                    <button
                      key={dayNumber}
                      type="button"
                      className={`flex aspect-square items-center justify-center rounded-lg text-xs outline-none transition-all duration-200 sm:text-sm ${
                        eventMatch
                          ? "bg-amber-500 font-black text-white shadow-md shadow-amber-500/30 hover:bg-amber-600 active:scale-[0.96]"
                          : "text-slate-700 hover:bg-amber-50 hover:text-amber-700 active:scale-[0.96]"
                      }`}
                    >
                      {dayNumber}
                    </button>
                  );
                })}
              </div>

              <div className="mt-6 flex flex-wrap items-center justify-center gap-4 border-t border-slate-100 pt-4 text-[11px] font-semibold text-slate-500">
                <span className="flex items-center gap-1.5">
                  <i className="h-2.5 w-2.5 rounded-full bg-amber-500" />
                  Tanggal Penting / Event
                </span>

                <span className="flex items-center gap-1.5">
                  <i className="h-2.5 w-2.5 rounded-full bg-slate-200" />
                  Hari Biasa
                </span>
              </div>
            </div>

            {/* AGENDA */}
            <div className="flex flex-col justify-between rounded-3xl bg-slate-900/95 p-5 text-white shadow-lg shadow-slate-900/10 backdrop-blur-md sm:p-8">
              <div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-widest text-amber-400">
                      Agenda & Kegiatan
                    </p>

                    <h3 className="mt-1 text-xl font-bold sm:text-2xl">
                      {activeMonth.monthName}
                    </h3>
                  </div>

                  <CalendarDays className="shrink-0 text-amber-400" size={28} />
                </div>

                <div className="mt-6 space-y-3">
                  {activeMonth.events.length > 0 ? (
                    activeMonth.events.map((event, idx) => (
                      <div
                        key={idx}
                        className="group flex items-center gap-3.5 rounded-2xl border border-white/10 bg-white/5 p-3 transition-all duration-200 ease-out hover:bg-white/10 hover:shadow-lg hover:shadow-black/10"
                      >
                        <div
                          className={`flex h-12 w-12 shrink-0 flex-col items-center justify-center rounded-xl font-bold text-slate-900 ${event.color}`}
                        >
                          <strong className="text-base leading-none sm:text-lg">
                            {event.day}
                          </strong>
                        </div>

                        <div className="min-w-0 flex-1">
                          <h4 className="truncate text-xs font-bold text-white sm:text-sm">
                            {event.title}
                          </h4>

                          <p className="mt-0.5 text-[11px] text-slate-400">
                            {event.type}
                            <span className="mx-1 text-slate-600">•</span>
                            Polsri
                          </p>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="rounded-2xl border border-dashed border-white/10 p-6 text-center text-xs text-slate-400">
                      Tidak ada agenda besar tercatat pada bulan ini.
                    </div>
                  )}
                </div>
              </div>

              <div className="mt-6 border-t border-white/10 pt-4 text-xs text-slate-400">
                * Jadwal dapat berubah sewaktu-waktu sesuai kebijakan kampus.
              </div>
            </div>
          </div>
        </section>

        {/* SATU SECTION UPDATE INFO (TEPAT DI BAWAH CALENDAR) */}
        <section
          id="update-info"
          className="relative mx-auto max-w-7xl px-5 py-20 lg:px-8 lg:py-28"
        >
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            {/* BAGIAN KIRI (STICKY DESKTOP) */}
            <div className="lg:col-span-5">
              <div className="lg:sticky lg:top-28">
                <p className="text-xs font-black uppercase tracking-[0.25em] text-amber-600">
                  LIST OF
                </p>

                <h2 className="mt-2 font-serif text-4xl font-black uppercase tracking-tight text-slate-900 leading-none sm:text-5xl lg:text-6xl">
                  UPDATE <br />
                  <span className="text-amber-500">INFO</span>
                </h2>

                <p className="mt-6 text-sm font-medium leading-relaxed text-slate-600 sm:text-base">
                  Sebagai bentuk komitmen dalam menyediakan informasi terkini,
                  BEM Polsri menghadirkan pusat informasi kampus. Informasi
                  penting terkait pengembangan potensi, organisasi, dan
                  kewirausahaan mahasiswa tersedia di sini.
                </p>

                <div className="mt-8 flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-slate-400">
                  <span className="inline-block h-2 w-2 animate-pulse rounded-full bg-amber-500" />
                  SCROLL UNTUK MELIHAT ARTIKEL
                </div>
              </div>
            </div>

            {/* BAGIAN KANAN (EDITORIAL ARTICLES LIST) */}
            <div className="space-y-16 lg:col-span-7 lg:space-y-24">
              {updateInfos.map((item) => (
                <article
                  key={item.number}
                  className="group relative border-b border-slate-200/80 pb-12 transition-all duration-300 hover:opacity-100"
                >
                  <div className="flex items-baseline justify-between">
                    <span className="font-serif text-3xl font-black text-amber-500/80 sm:text-4xl">
                      {item.number}
                    </span>
                    <span className="rounded-full bg-slate-100 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-slate-600">
                      {item.category}
                    </span>
                  </div>

                  <h3 className="mt-4 text-2xl font-bold tracking-tight text-slate-900 transition-colors group-hover:text-amber-600 sm:text-3xl">
                    {item.title}
                  </h3>

                  {/* FOTO SESUAI FILE YANG TERSEDIA */}
                  <div className="mt-6 overflow-hidden rounded-2xl border border-slate-200 bg-slate-100 shadow-sm transition-all duration-300 group-hover:shadow-lg">
                    <img
                      src={item.image}
                      alt={item.title}
                      loading="lazy"
                      className="h-[260px] w-full object-cover object-center transition-transform duration-500 ease-out group-hover:scale-105 sm:h-[340px]"
                    />
                  </div>

                  <p className="mt-5 text-sm leading-relaxed text-slate-600 sm:text-base">
                    {item.description}
                  </p>

                  <button
                    type="button"
                    onClick={() => setSelectedModal(item)}
                    className="mt-6 inline-flex items-center gap-2 text-xs font-black uppercase tracking-wider text-slate-900 transition-colors hover:text-amber-600"
                  >
                    LIHAT DETAIL INFORMASI
                    <ArrowUpRight size={16} className="text-amber-500" />
                  </button>
                </article>
              ))}
            </div>
          </div>

          {/* MODAL DETAIL INFORMASI - GAMBAR TAMPIL UTUH */}
          {selectedModal && (
            <div className="fixed inset-0 z-[150] flex items-center justify-center bg-slate-950/60 p-4 backdrop-blur-sm transition-opacity">
              <div className="relative max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-3xl bg-white p-6 shadow-2xl sm:p-8">
                <button
                  type="button"
                  onClick={() => setSelectedModal(null)}
                  className="absolute right-5 top-5 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-slate-100 text-slate-600 transition-colors hover:bg-amber-500 hover:text-white"
                >
                  <X size={18} />
                </button>

                <span className="font-serif text-2xl font-black text-amber-500">
                  {selectedModal.number}
                </span>

                <span className="ml-3 rounded-full bg-amber-50 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-amber-700">
                  {selectedModal.category}
                </span>

                <h3 className="mt-3 text-2xl font-bold text-slate-900 sm:text-3xl">
                  {selectedModal.title}
                </h3>

                {/* CONTAINER GAMBAR UTUH (CONTAIN) */}
                <div className="mt-5 flex items-center justify-center overflow-hidden rounded-2xl border border-slate-100 bg-slate-900/5 p-2">
                  <img
                    src={selectedModal.image}
                    alt={selectedModal.title}
                    className="max-h-[60vh] w-full object-contain"
                  />
                </div>

                <p className="mt-6 text-sm leading-relaxed text-slate-700 sm:text-base">
                  {selectedModal.fullDescription}
                </p>

                <div className="mt-8 border-t border-slate-100 pt-4 text-right">
                  <button
                    type="button"
                    onClick={() => setSelectedModal(null)}
                    className="rounded-xl bg-slate-900 px-5 py-2.5 text-xs font-bold text-white transition-colors hover:bg-amber-500"
                  >
                    Tutup
                  </button>
                </div>
              </div>
            </div>
          )}
        </section>

        {/* FOOTER */}
        <footer
          id="footer"
          className="bg-slate-950 px-5 pb-8 pt-16 text-white lg:px-8"
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
                  <a
                    href="#visi"
                    className="rounded-md outline-none transition-all duration-200 hover:text-white focus-visible:ring-2 focus-visible:ring-amber-400/60"
                  >
                    Tentang Kami
                  </a>

                  <a
                    href="#agenda"
                    className="rounded-md outline-none transition-all duration-200 hover:text-white focus-visible:ring-2 focus-visible:ring-amber-400/60"
                  >
                    Agenda Kegiatan
                  </a>

                  <Link
                    to="/contact"
                    className="rounded-md outline-none transition-all duration-200 hover:text-white focus-visible:ring-2 focus-visible:ring-amber-400/60"
                  >
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

                <p className="mt-3 text-sm leading-6 text-slate-400">
                  Jl. Srijaya Negara, Bukit Besar,
                  <br />
                  Palembang, Sumatera Selatan
                </p>

                <div className="mt-5 flex gap-2">
                  <a
                    href="https://www.instagram.com/bempolsri_/"
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
                    className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-800 text-xs font-black text-slate-300 outline-none transition-all duration-200 hover:bg-amber-500 hover:text-white active:scale-[0.95] focus-visible:ring-2 focus-visible:ring-amber-400/70"
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

            <div className="mt-14 flex flex-col justify-between gap-3 border-t border-white/10 pt-6 text-xs text-slate-500 sm:flex-row">
              <p>© BEM Politeknik Negeri Sriwijaya. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </div>
    </main>
  );
}

function SectionIntro({
  eyebrow,
  title,
  text,
}: {
  eyebrow: string;
  title: string;
  text: string;
}) {
  return (
    <div className="max-w-2xl">
      <p className="text-xs font-black uppercase tracking-[0.2em] text-amber-600">
        {eyebrow}
      </p>

      <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-900 sm:text-4xl">
        {title}
      </h2>

      <p className="mt-4 max-w-xl text-sm leading-7 text-slate-600">{text}</p>
    </div>
  );
}