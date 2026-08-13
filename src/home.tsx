import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  ArrowUpRight,
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  Compass,
  Lightbulb,
  Megaphone,
  Menu,
  Scale,
  Tag,
  Target,
  Users,
  X,
} from "lucide-react";

/* ============================================================================
 * TYPE DEFINITIONS & DATA
 * ============================================================================ */

type DropdownName = "academic" | "echo" | null;

interface Mission {
  icon: React.ElementType;
  number: string;
  text: string;
}

const missions: Mission[] = [
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

export interface UpdateInfoData {
  number: string;
  category: string;
  title: string;
  description: string;
  image: string;
}

/* DATA HANYA MEMUAT 3 PROGRAM (PKM, PPK ORMAWA, PMW) */
const updateInfos: UpdateInfoData[] = [
  {
    number: "01",
    category: "Inovasi & Kreativitas",
    title: "Program Kreatifitas Mahasiswa (PKM)",
    description:
      "Program Kreatifitas Mahasiswa (PKM) adalah kegiatan yang diselenggarakan oleh Ditjenbelmawa (Direktorat Jendral Pembelajaran dan Kemahasiswaan) Serta Kemendikbudristek dengan tujuan untuk memberi ruang kepada mahasiswa dalam mengembangkan potensi dan keahlian pada inovasi dan kreatifitas.",
    image: "/assets/PPK_ORMAWAA.jpg",
  },
  {
    number: "02",
    category: "Kapasitas Ormawa",
    title: "PPK ORMAWA",
    description:
      "PPK ORMAWA (Program Penguatan Kapasitas Organisasi Kemahasiswaan) Tahun 2025 merupakan program yang bertujuan untuk memperkuat peran organisasi kemahasiswaan dalam pengembangan kapasitas, kepemimpinan, serta kontribusi nyata terhadap masyarakat. Program ini menyeleksi proposal kegiatan dari berbagai organisasi mahasiswa. Sebanyak 10 proposal terbaik diumumkan sebagai bentuk apresiasi atas gagasan dan rencana kegiatan yang dinilai unggul dan berdampak.",
    image: "/assets/Program_Kreatifitas_Mahasiswa.jpg",
  },
  {
    number: "03",
    category: "Kewirausahaan",
    title: "Program Mahasiswa Wirausaha (PMW)",
    description:
      "Program Mahasiswa Wirausaha (PMW) Tahun 2025 adalah program yang diselenggarakan oleh Politeknik Negeri Sriwijaya melalui Unit Pengembangan Karir dan Kewirausahaan. Tujuannya adalah membekali mahasiswa dengan pengetahuan dan pengalaman berwirausaha secara nyata. Tahapan program meliputi seleksi proposal, pembekalan, pendampingan bisnis, program magang, monitoring dan evaluasi, hingga kompetisi dan expo rencana bisnis.",
    image: "/assets/Program_Mahasiswa_Wirausaha.jpg",
  },
];

/* ============================================================================
 * MAIN HOME COMPONENT
 * ============================================================================ */

export default function Home() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [, setOpenDropdown] = useState<DropdownName>(null);
  const [currentMonthIdx, setCurrentMonthIdx] = useState(0);
  const [scrolled, setScrolled] = useState(false);
  const [selectedInfo, setSelectedInfo] = useState<UpdateInfoData | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Control body scroll when modal is active
  useEffect(() => {
    if (selectedInfo) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [selectedInfo]);

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
                  className="rounded-lg px-3.5 py-2 text-sm font-medium text-amber-600 outline-none transition-all duration-200 hover:bg-amber-50/80 hover:text-amber-700 active:scale-[0.98]"
                  onClick={closeMenus}
                >
                  Home
                </Link>
                <a
                  href="#visi"
                  className="rounded-lg px-3.5 py-2 text-sm font-medium text-slate-600 outline-none transition-all duration-200 hover:bg-white/55 hover:text-amber-600 active:scale-[0.98]"
                  onClick={closeMenus}
                >
                  About
                </a>
                <a
                  href="#update-info"
                  className="rounded-lg px-3.5 py-2 text-sm font-medium text-slate-600 outline-none transition-all duration-200 hover:bg-white/55 hover:text-amber-600 active:scale-[0.98]"
                  onClick={closeMenus}
                >
                  Update Info
                </a>
                <Link
                  to="/contact"
                  className="ml-1 rounded-lg px-3.5 py-2 text-sm font-medium text-slate-600 outline-none transition-all duration-200 hover:bg-white/50 hover:text-amber-600 active:scale-[0.98]"
                  onClick={closeMenus}
                >
                  Contact Us
                </Link>
              </nav>

              <button
                type="button"
                aria-label={mobileOpen ? "Tutup menu" : "Buka menu"}
                aria-expanded={mobileOpen}
                className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/40 bg-white/40 text-slate-700 outline-none backdrop-blur-md transition-all duration-200 hover:border-amber-300 hover:bg-white/60 hover:text-amber-600 active:scale-[0.97] lg:hidden"
                onClick={() => setMobileOpen(!mobileOpen)}
              >
                {mobileOpen ? <X size={21} /> : <Menu size={21} />}
              </button>
            </div>
          </div>
        </header>

        {/* HERO SECTION */}
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
                eksekutif di lingkungan Politeknik Negeri Sriwijaya.
              </p>
            </div>

            <div className="relative flex w-full items-center justify-center lg:col-span-6 lg:justify-end">
              <img
                src="/images/logo.png"
                alt="Gedung Politeknik Negeri Sriwijaya"
                className="relative z-10 h-auto w-full max-w-md object-contain"
              />
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
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                {missions.map((mission) => (
                  <article
                    key={mission.number}
                    className="group rounded-3xl border border-slate-200 bg-white/90 p-6 backdrop-blur-sm transition-all duration-200 hover:-translate-y-1 hover:border-amber-300 hover:shadow-xl"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-amber-50 text-amber-600 transition-all duration-200 group-hover:bg-amber-500 group-hover:text-white">
                        <mission.icon size={21} />
                      </div>
                      <span className="text-3xl font-black text-slate-200">
                        {mission.number}
                      </span>
                    </div>

                    <p className="mt-5 text-xs leading-6 text-slate-600">
                      {mission.text}
                    </p>
                  </article>
                ))}
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
            <div className="rounded-3xl bg-white/90 p-5 shadow-lg backdrop-blur-md sm:p-8">
              <div className="flex items-center justify-between">
                <button
                  type="button"
                  aria-label="Bulan sebelumnya"
                  onClick={handlePrevMonth}
                  disabled={currentMonthIdx === 0}
                  className="rounded-full p-2 text-slate-500 outline-none transition-all duration-200 hover:bg-amber-50 hover:text-amber-600 disabled:opacity-30"
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
                  className="rounded-full p-2 text-slate-500 outline-none transition-all duration-200 hover:bg-amber-50 hover:text-amber-600 disabled:opacity-30"
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
                          ? "bg-amber-500 font-black text-white shadow-md hover:bg-amber-600"
                          : "text-slate-700 hover:bg-amber-50 hover:text-amber-700"
                      }`}
                    >
                      {dayNumber}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* AGENDA */}
            <div className="flex flex-col justify-between rounded-3xl bg-slate-900/95 p-5 text-white shadow-lg backdrop-blur-md sm:p-8">
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
                        className="group flex items-center gap-3.5 rounded-2xl border border-white/10 bg-white/5 p-3 transition-all duration-200 hover:bg-white/10"
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
                            {event.type} • Polsri
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
            </div>
          </div>
        </section>

        {/* SECTION UPDATE INFO */}
        <section
          id="update-info"
          className="relative border-t border-slate-200/60 bg-white/80 py-20 backdrop-blur-md lg:py-32"
        >
          <div className="mx-auto max-w-7xl px-5 lg:px-8">
            <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
              {/* LEFT SIDE: STICKY INTRO */}
              <div className="lg:col-span-5">
                <div className="lg:sticky lg:top-28 lg:max-h-[calc(100vh-140px)] lg:flex lg:flex-col lg:justify-between">
                  <div>
                    <p className="text-xs font-black uppercase tracking-[0.25em] text-amber-600">
                      LIST OF
                    </p>

                    <h2 className="mt-2 font-serif text-4xl font-black uppercase tracking-tight text-slate-900 sm:text-5xl lg:text-6xl lg:leading-[1.08]">
                      UPDATE <br className="hidden lg:block" />
                      <span className="text-amber-500">INFO</span>
                    </h2>

                    <div className="my-6 h-1 w-16 rounded-full bg-amber-500" />

                    <p className="max-w-md text-sm font-medium leading-relaxed text-slate-600 sm:text-base">
                      Sebagai bentuk komitmen dalam menyediakan informasi
                      terkini, BEM Polsri menghadirkan pusat informasi kampus.
                      Mulai dari program hibah nasional, pengembangan kapasitas
                      organisasi, hingga pembekalan wirausaha—semua informasi
                      penting tersedia di sini.
                    </p>
                  </div>

                  <div className="hidden lg:mt-12 lg:block">
                    <span className="text-[11px] font-bold uppercase tracking-widest text-slate-400">
                      Scroll untuk melihat artikel
                    </span>
                  </div>
                </div>
              </div>

              {/* RIGHT SIDE: EDITORIAL FEED */}
              <div className="flex flex-col gap-16 sm:gap-24 lg:col-span-7 lg:gap-32">
                {updateInfos.map((item) => (
                  <article
                    key={item.number}
                    onClick={() => setSelectedInfo(item)}
                    className="group relative cursor-pointer border-b border-slate-200/80 pb-12 transition-all duration-300 ease-out hover:border-amber-400/80 sm:pb-16"
                  >
                    <div className="flex items-baseline justify-between">
                      <span className="font-serif text-4xl font-black text-amber-500 transition-transform duration-300 group-hover:scale-105 sm:text-5xl lg:text-6xl">
                        {item.number}
                      </span>

                      <span className="rounded-full bg-slate-100 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-slate-600 transition-colors duration-300 group-hover:bg-amber-500 group-hover:text-white">
                        {item.category}
                      </span>
                    </div>

                    <h3 className="mt-4 flex items-center justify-between text-2xl font-bold tracking-tight text-slate-900 transition-colors duration-300 group-hover:text-amber-600 sm:text-3xl lg:text-4xl">
                      <span>{item.title}</span>
                      <ArrowUpRight
                        size={28}
                        className="shrink-0 text-slate-300 transition-all duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-amber-500"
                      />
                    </h3>

                    <div className="relative mt-6 overflow-hidden rounded-2xl bg-slate-100 shadow-md transition-shadow duration-300 group-hover:shadow-xl sm:mt-8">
                      <img
                        src={item.image}
                        alt={item.title}
                        loading="lazy"
                        className="h-auto w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.025]"
                      />

                      <div className="absolute inset-0 bg-slate-950/0 transition-colors duration-300 group-hover:bg-slate-950/10" />
                    </div>

                    <p className="mt-6 text-sm leading-relaxed text-slate-600 sm:text-base sm:leading-7">
                      {item.description}
                    </p>

                    <div className="mt-4 inline-flex items-center gap-1 text-xs font-black uppercase tracking-wider text-amber-600 transition-colors group-hover:text-amber-700">
                      <span>Lihat Detail Informasi</span>
                      <ArrowUpRight size={14} />
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* MODAL DETAIL UPDATE INFO */}
        {selectedInfo && (
          <div
            className="fixed inset-0 z-[150] flex items-center justify-center p-4 sm:p-6 md:p-10"
            aria-modal="true"
            role="dialog"
          >
            {/* Backdrop Overlay */}
            <div
              className="fixed inset-0 bg-slate-950/70 backdrop-blur-md transition-opacity animate-in fade-in duration-300"
              onClick={() => setSelectedInfo(null)}
            />

            {/* Modal Card Content */}
            <div className="relative z-10 max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-3xl border border-slate-200/80 bg-white shadow-2xl transition-all duration-300 animate-in zoom-in-95">
              <button
                type="button"
                onClick={() => setSelectedInfo(null)}
                aria-label="Tutup Detail"
                className="absolute right-4 top-4 z-20 flex h-10 w-10 items-center justify-center rounded-full border border-slate-200/80 bg-white/80 text-slate-700 backdrop-blur-md transition-all duration-200 hover:bg-slate-100 hover:text-amber-600 active:scale-95"
              >
                <X size={20} />
              </button>

              <div className="relative w-full overflow-hidden bg-slate-900 pt-[56.25%]">
                <img
                  src={selectedInfo.image}
                  alt={selectedInfo.title}
                  className="absolute inset-0 h-full w-full object-contain"
                />
              </div>

              <div className="p-6 sm:p-8 md:p-10">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="font-serif text-2xl font-black text-amber-500/80 sm:text-3xl">
                    {selectedInfo.number}
                  </span>
                  <div className="h-4 w-px bg-slate-200" />
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-500/10 px-3 py-1 text-xs font-bold text-amber-600">
                    <Tag size={12} />
                    {selectedInfo.category}
                  </span>
                </div>

                <h2 className="mt-4 text-2xl font-black tracking-tight text-slate-900 sm:text-3xl md:text-4xl">
                  {selectedInfo.title}
                </h2>

                <div className="mt-6 border-t border-slate-100 pt-6">
                  <p className="whitespace-pre-line text-sm leading-relaxed text-slate-600 sm:text-base sm:leading-8">
                    {selectedInfo.description}
                  </p>
                </div>

                <div className="mt-8 flex justify-end">
                  <button
                    type="button"
                    onClick={() => setSelectedInfo(null)}
                    className="rounded-xl bg-slate-900 px-6 py-2.5 text-xs font-bold text-white transition-all hover:bg-amber-500 active:scale-95"
                  >
                    Tutup Informasi
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* FOOTER */}
        <footer
          id="footer"
          className="bg-slate-950 px-5 pb-8 pt-16 text-white lg:px-8"
        >
          <div className="mx-auto max-w-7xl">
            <div className="flex flex-col justify-between gap-3 border-t border-white/10 pt-6 text-xs text-slate-500 sm:flex-row">
              <p>© BEM Politeknik Negeri Sriwijaya. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </div>
    </main>
  );
}

/* Helper Component */
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
