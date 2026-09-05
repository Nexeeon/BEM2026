import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";
import LoadingScreen from "./LoadingScreen";
import {
  ArrowUpRight,
  CalendarDays,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Instagram,
  Mail,
  Menu,
  X,
  Youtube,
} from "lucide-react";

type DropdownName = "academic" | "echo" | null;

interface MissionItem {
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

/* DATA PROGRAM KERJA */
const programs = [
  {
    title: "AKSI",
    image: "/images/Program_kerja/aksi.webp",
  },
  {
    title: "BISIK KAMPUS",
    image: "/images/Program_kerja/bisik-kampus.webp",
  },
  {
    title: "INSPIRE PROJECT",
    image: "/images/Program_kerja/Inpire Project.webp",
  },
  {
    title: "KAJIAN",
    image: "/images/Program_kerja/kajian.webp",
  },
  {
    title: "POLSRIESS",
    image: "/images/Program_kerja/polsrifess.webp",
  },
];

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
    image: "/images/Program_Kreatifitas_Mahasiswa.webp",
  },
  {
    number: "02",
    category: "ORGANISASI & KEPEMIMPINAN",
    title: "PPK ORMAWA",
    description:
      "Program memperkuat peran organisasi kemahasiswaan dalam pengembangan kapasitas, kepemimpinan, dan kontribusi nyata.",
    fullDescription:
      "PPK ORMAWA (Program Penguatan Kapasitas Organisasi Kemahasiswaan) Tahun 2025 merupakan program yang bertujuan untuk memperkuat peran organisasi kemahasiswaan dalam pengembangan kapasitas, kepemimpinan, serta kontribusi nyata terhadap masyarakat. Program ini menyeleksi proposal kegiatan dari berbagai organisasi mahasiswa. Sebanyak 10 proposal terbaik diumumkan sebagai bentuk apresiasi atas gagasan dan rencana kegiatan yang dinilai unggul dan berdampak.",
    image: "/images/PPK_ORMAWA.webp",
  },
  {
    number: "03",
    category: "KEWIRAUSAHAAN",
    title: "Program Mahasiswa Wirausaha (PMW)",
    description:
      "Program Polsri melalui UPKK untuk membekali mahasiswa dengan pengetahuan dan pengalaman berwirausaha nyata.",
    fullDescription:
      "Program Mahasiswa Wirausaha (PMW) Tahun 2025 adalah program yang diselenggarakan oleh Politeknik Negeri Sriwijaya melalui Unit Pengembangan Karir dan Kewirausahaan. Tujuannya adalah membekali mahasiswa dengan pengetahuan dan pengalaman berwirausaha secara nyata. Tahapan program meliputi seleksi proposal, pembekalan, pendampingan bisnis, program magang, monitoring dan evaluasi, hingga kompetisi dan expo rencana bisnis.",
    image: "/images/Program_Mahasiswa_Wirausaha.webp",
  },
];

const missions: MissionItem[] = [
  {
    number: "01",
    text: "Mewadahi dan memperjuangkan aspirasi mahasiswa secara terbuka, responsif, dan bertanggung jawab melalui mekanisme penyerapan aspirasi yang aktif, dialogis, dan berkelanjutan.",
  },
  {
    number: "02",
    text: "Mendorong peningkatan kualitas pembelajaran organisasi dan kepemimpinan mahasiswa melalui program pengembangan soft skill, manajerial, dan profesionalisme yang terarah.",
  },
  {
    number: "03",
    text: "Mengembangkan budaya kajian dan advokasi yang konstruktif dan solutif sebagai landasan pengambilan sikap BEM terhadap isu-isu yang ada.",
  },
  {
    number: "04",
    text: "Memperkuat sinergi dan kolaborasi internal maupun eksternal melalui kerja sama antar lembaga mahasiswa serta partisipasi aktif dalam kegiatan yang berdampak positif.",
  },
  {
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
  const [showLoading, setShowLoading] = useState<boolean>(() => {
    return sessionStorage.getItem("homeIntroPlayed") !== "true";
  });

  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<DropdownName>(null);
  const [currentMonthIdx, setCurrentMonthIdx] = useState(0);
  const [scrolled, setScrolled] = useState(false);
  const [selectedModal, setSelectedModal] = useState<UpdateInfoItemData | null>(
    null,
  );

  /* STATE CAROUSEL PROGRAM KAMI */
  const [currentSlide, setCurrentSlide] = useState(0);
  const touchStartX = useRef<number>(0);
  const touchEndX = useRef<number>(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Autoplay Carousel (5 detik per slide)
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % programs.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const handleNextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % programs.length);
  };

  const handlePrevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? programs.length - 1 : prev - 1));
  };

  // Swipe gesture handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    const distance = touchStartX.current - touchEndX.current;
    if (distance > 50) {
      handleNextSlide();
    } else if (distance < -50) {
      handlePrevSlide();
    }
    touchStartX.current = 0;
    touchEndX.current = 0;
  };

  const handleFinishLoading = () => {
    sessionStorage.setItem("homeIntroPlayed", "true");
    setShowLoading(false);
  };

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
    <main className="relative min-h-screen overflow-x-clip bg-[url('/images/bgweb.webp')] bg-cover bg-fixed bg-center bg-no-repeat pt-[72px] text-slate-900 scroll-smooth">
      {/* LOADING SCREEN */}
      {showLoading && <LoadingScreen onFinish={handleFinishLoading} />}

      <div className="min-h-screen bg-white/65">
        {/* NAVBAR */}
        <Navbar />

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
                  src="/images/logo.webp"
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

        {/* VISI & MISI SECTION */}
        <section
          id="visi"
          className="relative bg-gradient-to-b from-white/90 via-amber-50/30 to-white/90 px-5 py-20 backdrop-blur-md lg:px-8 lg:py-28"
        >
          <div className="mx-auto max-w-7xl">
            {/* GRID DESKTOP */}
            <div className="grid gap-12 lg:grid-cols-12 lg:items-start lg:gap-16">
              {/* BAGIAN KIRI: VISI & MISI */}
              <div className="flex flex-col justify-between lg:col-span-7">
                {/* VISI */}
                <div>
               

                  <h2 className="mt-4 font-serif text-4xl font-black uppercase tracking-tight text-amber-500 sm:text-5xl lg:text-6xl">
                    VISI
                  </h2>

                  <p className="mt-5 text-base font-medium leading-relaxed text-slate-700 sm:text-lg lg:text-xl lg:leading-normal">
                    Menjadikan Badan Eksekutif Mahasiswa Politeknik Negeri
                    Sriwijaya sebagai lembaga yang{" "}
                    <span className="font-bold text-amber-600 underline decoration-amber-300 decoration-2 underline-offset-4">
                      berdampak positif
                    </span>{" "}
                    bagi Mahasiswa/i dan Institusi Politeknik Negeri Sriwijaya.
                  </p>
                </div>

                <hr className="my-10 border-slate-200/80 lg:my-12" />

                {/* MISI */}
                <div>
                  <h3 className="font-serif text-3xl font-black uppercase tracking-tight text-amber-500 sm:text-4xl">
                    MISI
                  </h3>

                  <div className="mt-8 space-y-6 sm:space-y-7">
                    {missions.map((mission) => (
                      <div
                        key={mission.number}
                        className="group flex items-start gap-4 rounded-2xl border border-slate-100 bg-white/70 p-4 transition-all duration-300 hover:border-amber-300/80 hover:bg-white hover:shadow-md sm:gap-6 sm:p-5"
                      >
                        <span className="font-serif text-2xl font-black text-amber-500/90 transition-transform duration-300 group-hover:scale-110 sm:text-3xl">
                          {mission.number}
                        </span>

                        <p className="text-sm font-medium leading-relaxed text-slate-700 sm:text-base">
                          {mission.text}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* BAGIAN KANAN: FOTO UTAMA & CARD */}
              <div className="flex flex-col items-center justify-center lg:col-span-5 lg:sticky lg:top-28">
                <div className="relative w-full overflow-hidden rounded-3xl border border-amber-300/50 bg-white p-3 shadow-xl shadow-amber-900/5 backdrop-blur-md transition-all duration-300 hover:border-amber-400 hover:shadow-2xl sm:p-4">
                  <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl bg-slate-100">
                    <img
                      src="/images/foto_KabinetKilauGemilang.webp"
                      alt="Foto Kabinet Kilau Gemilang - BEM POLSRI"
                      className="h-full w-full object-cover object-center transition-transform duration-700 ease-out hover:scale-105"
                      loading="lazy"
                    />
                  </div>

                  <div className="mt-4 rounded-xl border border-amber-200/60 bg-gradient-to-r from-amber-50/90 via-white to-amber-50/90 p-4 text-center shadow-inner">
                    <p className="font-serif text-lg font-bold tracking-tight text-slate-900 sm:text-xl">
                      "Kabinet Kilau Gemilang"
                    </p>
                    <p className="mt-1 text-xs font-semibold uppercase tracking-[0.2em] text-amber-600">
                      — BEM POLSRI 2026 —
                    </p>
                  </div>
                </div>
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

        {/* ================================================== */}
        {/* SECTION PROGRAM KAMI */}
        {/* ================================================== */}
        <section
          id="program-kami"
          className="relative py-20 lg:py-28 overflow-hidden"
        >
          {/* HEADING & PENJELASAN */}
          <div className="mx-auto max-w-7xl px-5 lg:px-8">
            <div className="text-center">
              <p className="text-xs font-black uppercase tracking-[0.3em] text-slate-500 sm:text-sm">
                LIST OF
              </p>
              <h2 className="mt-1 font-serif text-4xl font-black uppercase tracking-tight text-amber-500 sm:text-5xl lg:text-6xl">
                PROGRAM KAMI
              </h2>
            </div>

            <div className="mx-auto mt-6 max-w-3xl text-center">
              <p className="text-sm font-medium leading-relaxed text-slate-700 sm:text-base lg:text-lg lg:leading-normal">
                Sebagai bentuk komitmen dalam menghadirkan peran aktif mahasiswa
                terhadap berbagai isu di lingkungan kampus dan masyarakat, BEM
                Polsri menghadirkan sejumlah program unggulan. Mulai dari ruang
                edukasi dan inovasi, media komunikasi mahasiswa, kegiatan
                sosial, kewirausahaan melalui unit usaha, hingga aksi langsung
                di lapangan—seluruh program ini dirancang untuk memperkuat
                kepemimpinan, mendorong kolaborasi, dan memberikan dampak nyata.
              </p>
            </div>
          </div>

          {/* CAROUSEL AREA (FULL WIDTH EDGE-TO-EDGE) */}
          <div className="relative mt-12 sm:mt-16 w-screen left-1/2 right-1/2 -ml-[50vw] -mr-[50vw]">
            {/* Tombol Navigasi Kanan Atas */}
            <div className="absolute right-6 top-6 z-30 flex items-center gap-3">
              <button
                type="button"
                onClick={handlePrevSlide}
                className="flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-slate-950/60 text-white backdrop-blur-md transition-all duration-200 hover:bg-amber-500 hover:text-slate-950 active:scale-95"
                aria-label="Previous Slide"
              >
                <ChevronLeft size={22} />
              </button>

              <button
                type="button"
                onClick={handleNextSlide}
                className="flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-slate-950/60 text-white backdrop-blur-md transition-all duration-200 hover:bg-amber-500 hover:text-slate-950 active:scale-95"
                aria-label="Next Slide"
              >
                <ChevronRight size={22} />
              </button>
            </div>

            {/* SLIDER CONTAINER */}
            <div
              className="relative w-full overflow-hidden bg-slate-950 h-[380px] sm:h-[500px] lg:h-[600px]"
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            >
              {programs.map((item, index) => (
                <div
                  key={index}
                  className={`absolute inset-0 h-full w-full transition-opacity duration-700 ease-in-out ${
                    index === currentSlide
                      ? "opacity-100 z-10"
                      : "opacity-0 z-0"
                  }`}
                >
                  {/* Layer 1: Foto Program */}
                  <img
                    src={item.image}
                    alt={item.title}
                    className="h-full w-full object-cover object-center"
                  />

                  {/* Layer 2: Overlay Gradient Transparan (Tanpa Background Solid Gelap) */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent" />

                  {/* Layer 3 & 4: Badge & Judul Program */}
                  <div className="absolute bottom-8 left-6 right-6 z-20 sm:bottom-12 sm:left-12 sm:right-12 lg:left-16">
                    <span className="inline-block rounded-full border border-amber-400/50 bg-amber-500/20 px-3 py-1 text-xs font-black tracking-widest text-amber-300 backdrop-blur-md">
                      PROGRAM KERJA
                    </span>
                    <h3 className="mt-2 font-serif text-3xl font-black uppercase tracking-wider text-white drop-shadow-md sm:text-4xl lg:text-5xl">
                      {item.title}
                    </h3>
                  </div>
                </div>
              ))}
            </div>

            {/* Layer 5: Indicator Dots Navigasi */}
            <div className="absolute bottom-4 left-1/2 z-30 flex -translate-x-1/2 items-center gap-2 sm:bottom-6">
              {programs.map((_, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => setCurrentSlide(index)}
                  className={`h-2.5 rounded-full transition-all duration-300 ${
                    index === currentSlide
                      ? "w-8 bg-amber-500"
                      : "w-2.5 bg-white/40 hover:bg-white/70"
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </section>

        {/* UPDATE INFO */}
        <section
          id="update-info"
          className="relative mx-auto max-w-7xl px-5 py-20 lg:px-8 lg:py-28"
        >
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
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

          {/* MODAL */}
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
                    src="/images/logo.webp"
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
                    href="/about"
                    className="rounded-md outline-none transition-all duration-200 hover:text-white focus-visible:ring-2 focus-visible:ring-amber-400/60"
                  >
                    Tentang Kami
                  </a>

                  <a
                    href="/calendar"
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
