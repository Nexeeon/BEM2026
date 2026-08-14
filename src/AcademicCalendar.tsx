import React, { useState, useMemo, useEffect, useCallback } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Search,
  Calendar as CalendarIcon,
  Clock,
  Tag,
  X,
  RotateCcw,
  BookOpen,
  Filter,
} from "lucide-react";

// ============================================================================
// TYPES & INTERFACES
// ============================================================================

export type EventCategory =
  | "akademik"
  | "ujian"
  | "libur"
  | "pendaftaran"
  | "wisuda"
  | "semester"
  | "orientasi"
  | "lainnya";

export type SemesterType = "ganjil" | "genap";

export interface AcademicEvent {
  id: string;
  title: string;
  startDate: string; // ISO format: YYYY-MM-DD
  endDate: string; // ISO format: YYYY-MM-DD
  category: EventCategory;
  semester: SemesterType;
  academicYear: string; // e.g., "2025/2026"
  description?: string;
  location?: string;
}

// ============================================================================
// DATA SET (Berdasarkan Referensi Data Resmi BEM POLSRI)
// ============================================================================

const ACADEMIC_EVENTS: AcademicEvent[] = [
  // SEMESTER GANJIL 2025/2026
  {
    id: "1",
    title: "DIKSARLIN TA 25/26",
    startDate: "2025-07-28",
    endDate: "2025-08-02",
    category: "orientasi",
    semester: "ganjil",
    academicYear: "2025/2026",
    description:
      "Pendidikan Dasar Kedisiplinan bagi mahasiswa baru Politeknik Negeri Sriwijaya Tahun Akademik 2025/2026.",
  },
  {
    id: "2",
    title: "Yudisium Semester Genap TA 24/25",
    startDate: "2025-08-01",
    endDate: "2025-08-01",
    category: "akademik",
    semester: "ganjil",
    academicYear: "2025/2026",
    description:
      "Pelaksanaan Yudisium untuk kelulusan Semester Genap Tahun Akademik 2024/2025.",
  },
  {
    id: "3",
    title: "Libur Semester Genap TA 24/25",
    startDate: "2025-08-04",
    endDate: "2025-08-29",
    category: "libur",
    semester: "ganjil",
    academicYear: "2025/2026",
    description:
      "Masa libur perkuliahan semester genap bagi seluruh mahasiswa.",
  },
  {
    id: "4",
    title: "Daftar Ulang SMT. Ganjil TA. 25/26",
    startDate: "2025-08-04",
    endDate: "2025-08-29",
    category: "pendaftaran",
    semester: "ganjil",
    academicYear: "2025/2026",
    description:
      "Pembayaran UKT dan registrasi ulang mahasiswa untuk Semester Ganjil TA 2025/2026.",
  },
  {
    id: "5",
    title: "Wisuda ke-41",
    startDate: "2025-08-23",
    endDate: "2025-08-24",
    category: "wisuda",
    semester: "ganjil",
    academicYear: "2025/2026",
    description: "Upacara Wisuda ke-41 Politeknik Negeri Sriwijaya.",
  },
  {
    id: "6",
    title: "Awal Kegiatan SMT Ganjil TA. 25/26",
    startDate: "2025-09-01",
    endDate: "2025-09-01",
    category: "semester",
    semester: "ganjil",
    academicYear: "2025/2026",
    description:
      "Hari pertama perkuliahan efektif Semester Ganjil TA 2025/2026.",
  },
  {
    id: "7",
    title: "Ujian Tengah Semester Ganjil",
    startDate: "2025-10-27",
    endDate: "2025-11-01",
    category: "ujian",
    semester: "ganjil",
    academicYear: "2025/2026",
    description: "Pelaksanaan Ujian Tengah Semester (UTS) Ganjil TA 2025/2026.",
  },
  {
    id: "8",
    title: "Ujian Semester Ganjil",
    startDate: "2026-01-05",
    endDate: "2026-01-10",
    category: "ujian",
    semester: "ganjil",
    academicYear: "2025/2026",
    description: "Pelaksanaan Ujian Akhir Semester (UAS) Ganjil TA 2025/2026.",
  },
  {
    id: "9",
    title: "Yudisium Semester Ganjil",
    startDate: "2026-01-23",
    endDate: "2026-01-23",
    category: "akademik",
    semester: "ganjil",
    academicYear: "2025/2026",
    description: "Pelaksanaan Yudisium kelulusan Semester Ganjil TA 2025/2026.",
  },

  // SEMESTER GENAP 2025/2026
  {
    id: "10",
    title: "Daftar Ulang SMT Genap TA 25/26",
    startDate: "2026-01-26",
    endDate: "2026-02-07",
    category: "pendaftaran",
    semester: "genap",
    academicYear: "2025/2026",
    description:
      "Proses administrasi dan daftar ulang mahasiswa untuk Semester Genap TA 2025/2026.",
  },
  {
    id: "11",
    title: "Awal Kegiatan SMT Genap TA 25/26",
    startDate: "2026-02-09",
    endDate: "2026-02-09",
    category: "semester",
    semester: "genap",
    academicYear: "2025/2026",
    description:
      "Awal dimulainya perkuliahan efektif Semester Genap TA 2025/2026.",
  },
  {
    id: "12",
    title: "Semester Genap TA 25/26",
    startDate: "2026-02-09",
    endDate: "2026-06-13",
    category: "semester",
    semester: "genap",
    academicYear: "2025/2026",
    description: "Rentang operasional perkuliahan perkuliahan Semester Genap.",
  },
  {
    id: "13",
    title: "Ujian Tengah Semester Genap",
    startDate: "2026-03-30",
    endDate: "2026-04-04",
    category: "ujian",
    semester: "genap",
    academicYear: "2025/2026",
    description: "Pelaksanaan Ujian Tengah Semester (UTS) Genap TA 2025/2026.",
  },
  {
    id: "14",
    title: "Ujian Semester Genap",
    startDate: "2026-07-06",
    endDate: "2026-07-11",
    category: "ujian",
    semester: "genap",
    academicYear: "2025/2026",
    description: "Pelaksanaan Ujian Akhir Semester (UAS) Genap TA 2025/2026.",
  },
  {
    id: "15",
    title: "Ujian KP (Kerja Praktek)",
    startDate: "2026-07-20",
    endDate: "2026-07-25",
    category: "ujian",
    semester: "genap",
    academicYear: "2025/2026",
    description:
      "Pelaksanaan sidang/ujian Kerja Praktek bagi mahasiswa semester akhir.",
  },
  {
    id: "16",
    title: "Yudisium Semester Genap TA 25/26",
    startDate: "2026-07-31",
    endDate: "2026-07-31",
    category: "akademik",
    semester: "genap",
    academicYear: "2025/2026",
    description: "Yudisium kelulusan mahasiswa Semester Genap TA 2025/2026.",
  },
  {
    id: "17",
    title: "Libur Semester Genap",
    startDate: "2026-08-03",
    endDate: "2026-08-28",
    category: "libur",
    semester: "genap",
    academicYear: "2025/2026",
    description: "Masa libur perkuliahan akhir tahun akademik.",
  },
  {
    id: "18",
    title: "Daftar Ulang SMT Ganjil TA 26/27",
    startDate: "2026-08-03",
    endDate: "2026-08-28",
    category: "pendaftaran",
    semester: "genap",
    academicYear: "2025/2026",
    description:
      "Registrasi dan pendaftaran ulang untuk tahun akademik berikutnya.",
  },
  {
    id: "19",
    title: "Wisuda ke-42",
    startDate: "2026-08-22",
    endDate: "2026-08-23",
    category: "wisuda",
    semester: "genap",
    academicYear: "2025/2026",
    description: "Upacara Wisuda ke-42 Politeknik Negeri Sriwijaya.",
  },
  {
    id: "20",
    title: "Awal Kegiatan SMT Ganjil TA 26/27",
    startDate: "2026-09-07",
    endDate: "2026-09-07",
    category: "semester",
    semester: "genap",
    academicYear: "2025/2026",
    description: "Pembukaan tahun ajaran baru 2026/2027.",
  },
  {
    id: "21",
    title: "Audit Mutu Internal (AMI)",
    startDate: "2026-09-15",
    endDate: "2026-09-19",
    category: "akademik",
    semester: "genap",
    academicYear: "2025/2026",
    description:
      "Pelaksanaan Audit Mutu Internal Akademik Politeknik Negeri Sriwijaya.",
  },
];

// ============================================================================
// HELPER FUNCTIONS & STYLES
// ============================================================================

const CATEGORY_COLORS: Record<
  EventCategory,
  { bg: string; text: string; dot: string; border: string }
> = {
  akademik: {
    bg: "bg-blue-50 dark:bg-blue-950/30",
    text: "text-blue-700 dark:text-blue-400",
    dot: "bg-blue-500",
    border: "border-blue-200 dark:border-blue-800",
  },
  ujian: {
    bg: "bg-rose-50 dark:bg-rose-950/30",
    text: "text-rose-700 dark:text-rose-400",
    dot: "bg-rose-500",
    border: "border-rose-200 dark:border-rose-800",
  },
  libur: {
    bg: "bg-emerald-50 dark:bg-emerald-950/30",
    text: "text-emerald-700 dark:text-emerald-400",
    dot: "bg-emerald-500",
    border: "border-emerald-200 dark:border-emerald-800",
  },
  pendaftaran: {
    bg: "bg-amber-50 dark:bg-amber-950/30",
    text: "text-amber-700 dark:text-amber-400",
    dot: "bg-amber-500",
    border: "border-amber-200 dark:border-amber-800",
  },
  wisuda: {
    bg: "bg-purple-50 dark:bg-purple-950/30",
    text: "text-purple-700 dark:text-purple-400",
    dot: "bg-purple-500",
    border: "border-purple-200 dark:border-purple-800",
  },
  semester: {
    bg: "bg-indigo-50 dark:bg-indigo-950/30",
    text: "text-indigo-700 dark:text-indigo-400",
    dot: "bg-indigo-500",
    border: "border-indigo-200 dark:border-indigo-800",
  },
  orientasi: {
    bg: "bg-cyan-50 dark:bg-cyan-950/30",
    text: "text-cyan-700 dark:text-cyan-400",
    dot: "bg-cyan-500",
    border: "border-cyan-200 dark:border-cyan-800",
  },
  lainnya: {
    bg: "bg-slate-50 dark:bg-slate-900",
    text: "text-slate-700 dark:text-slate-400",
    dot: "bg-slate-500",
    border: "border-slate-200 dark:border-slate-800",
  },
};

const MONTH_NAMES = [
  "Januari",
  "Februari",
  "Maret",
  "April",
  "Mei",
  "Juni",
  "Juli",
  "Agustus",
  "September",
  "Oktober",
  "November",
  "Desember",
];

const DAYS_SHORT = ["SEN", "SEL", "RAB", "KAM", "JUM", "SAB", "MIN"];

const formatDateIndonesian = (dateStr: string): string => {
  if (!dateStr) return "";
  const date = new Date(dateStr);
  const day = date.getDate();
  const month = MONTH_NAMES[date.getMonth()];
  const year = date.getFullYear();
  return `${day} ${month} ${year}`;
};

const formatDateRange = (startDateStr: string, endDateStr: string): string => {
  if (startDateStr === endDateStr) {
    return formatDateIndonesian(startDateStr);
  }
  const start = new Date(startDateStr);
  const end = new Date(endDateStr);

  if (
    start.getMonth() === end.getMonth() &&
    start.getFullYear() === end.getFullYear()
  ) {
    return `${start.getDate()} – ${end.getDate()} ${MONTH_NAMES[start.getMonth()]} ${start.getFullYear()}`;
  }
  return `${formatDateIndonesian(startDateStr)} – ${formatDateIndonesian(endDateStr)}`;
};

const isDateInRange = (
  dateStr: string,
  startDateStr: string,
  endDateStr: string,
): boolean => {
  const target = new Date(dateStr).getTime();
  const start = new Date(startDateStr).getTime();
  const end = new Date(endDateStr).getTime();
  return target >= start && target <= end;
};

// ============================================================================
// MAIN COMPONENT
// ============================================================================

export const AcademicCalendar: React.FC = () => {
  // State Navigasi Tanggal (Default: September 2025 sesuai data rujukan utama)
  const [currentDate, setCurrentDate] = useState<Date>(new Date(2025, 8, 1));
  const [selectedYear, setSelectedYear] = useState<string>("2025/2026");
  const [semesterFilter, setSemesterFilter] = useState<
    "all" | "ganjil" | "genap"
  >("all");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");

  // Interaction State
  const [selectedDateStr, setSelectedDateStr] = useState<string | null>(null);
  const [activeModalEvent, setActiveModalEvent] =
    useState<AcademicEvent | null>(null);

  // Close modal with ESC key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setActiveModalEvent(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Filter Events berdasarkan state pencarian & kategori
  const filteredEvents = useMemo(() => {
    return ACADEMIC_EVENTS.filter((event) => {
      // Academic year
      if (event.academicYear !== selectedYear) return false;

      // Semester filter
      if (semesterFilter !== "all" && event.semester !== semesterFilter)
        return false;

      // Category filter
      if (categoryFilter !== "all" && event.category !== categoryFilter)
        return false;

      // Search query
      if (searchQuery.trim() !== "") {
        const query = searchQuery.toLowerCase();
        const matchTitle = event.title.toLowerCase().includes(query);
        const matchDesc = event.description?.toLowerCase().includes(query);
        const matchCat = event.category.toLowerCase().includes(query);
        return matchTitle || matchDesc || matchCat;
      }

      return true;
    });
  }, [selectedYear, semesterFilter, categoryFilter, searchQuery]);

  // Handle Navigasi Bulan
  const handlePrevMonth = () => {
    setCurrentDate(
      (prev) => new Date(prev.getFullYear(), prev.getMonth() - 1, 1),
    );
  };

  const handleNextMonth = () => {
    setCurrentDate(
      (prev) => new Date(prev.getFullYear(), prev.getMonth() + 1, 1),
    );
  };

  const handleResetToday = () => {
    setCurrentDate(new Date());
    const todayStr = new Date().toISOString().split("T")[0];
    setSelectedDateStr(todayStr);
  };

  // Kalkulasi Grid Kalender
  const calendarGrid = useMemo(() => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    const firstDayOfMonth = new Date(year, month, 1);
    const lastDayOfMonth = new Date(year, month + 1, 0);

    // Dapatkan hari dalam seminggu (Senin = 0, Minggu = 6)
    let startDayOfWeek = firstDayOfMonth.getDay() - 1;
    if (startDayOfWeek === -1) startDayOfWeek = 6; // Pengondisian untuk Minggu

    const totalDays = lastDayOfMonth.getDate();
    const grid: Array<{
      dateStr: string;
      dayNumber: number;
      isCurrentMonth: boolean;
    }> = [];

    // Hari dari bulan sebelumnya
    const prevMonthLastDay = new Date(year, month, 0).getDate();
    for (let i = startDayOfWeek - 1; i >= 0; i--) {
      const prevDate = new Date(year, month - 1, prevMonthLastDay - i);
      const dateStr = prevDate.toISOString().split("T")[0];
      grid.push({
        dateStr,
        dayNumber: prevMonthLastDay - i,
        isCurrentMonth: false,
      });
    }

    // Hari bulan saat ini
    for (let day = 1; day <= totalDays; day++) {
      const dateObj = new Date(year, month, day);
      // Format YYYY-MM-DD lokal aman
      const dateStr = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
      grid.push({ dateStr, dayNumber: day, isCurrentMonth: true });
    }

    // Pad sisa grid ke kelipatan 7
    const remainingSlots = 42 - grid.length; // 6 baris x 7 hari
    for (
      let i = 1;
      i <= (remainingSlots < 7 ? remainingSlots : remainingSlots - 7);
      i++
    ) {
      const nextDate = new Date(year, month + 1, i);
      const dateStr = nextDate.toISOString().split("T")[0];
      grid.push({ dateStr, dayNumber: i, isCurrentMonth: false });
    }

    return grid;
  }, [currentDate]);

  // Event pada tanggal tertentu
  const getEventsForDate = useCallback(
    (dateStr: string) => {
      return filteredEvents.filter((event) =>
        isDateInRange(dateStr, event.startDate, event.endDate),
      );
    },
    [filteredEvents],
  );

  // Selected date events
  const selectedDateEvents = useMemo(() => {
    if (!selectedDateStr) return [];
    return getEventsForDate(selectedDateStr);
  }, [selectedDateStr, getEventsForDate]);

  const todayStr = new Date().toISOString().split("T")[0];

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 transition-all duration-300">
      {/* ============================================================================ */}
      {/* HEADER SECTION                                                               */}
      {/* ============================================================================ */}
      <header className="mb-8 text-center sm:text-left flex flex-col md:flex-row md:items-end md:justify-between gap-6 border-b border-slate-200 dark:border-slate-800 pb-8">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold tracking-wider uppercase bg-primary/10 text-primary mb-3">
            <BookOpen className="w-3.5 h-3.5" />
            <span>Academic Information</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Academic Calendar
          </h1>
          <p className="mt-2 text-sm sm:text-base text-slate-600 dark:text-slate-400 max-w-2xl">
            Temukan jadwal akademik dan agenda penting Politeknik Negeri
            Sriwijaya dalam satu kalender.
          </p>
        </div>

        {/* YEAR SELECTOR */}
        <div className="flex items-center justify-center sm:justify-start gap-3 bg-slate-100 dark:bg-slate-800/80 p-1.5 rounded-xl self-center md:self-auto">
          <label
            htmlFor="year-select"
            className="text-xs font-medium text-slate-500 dark:text-slate-400 pl-2"
          >
            Academic Year
          </label>
          <select
            id="year-select"
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
            className="bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 text-sm font-semibold py-1.5 px-3 rounded-lg border border-slate-200 dark:border-slate-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-primary cursor-pointer"
          >
            <option value="2025/2026">2025 / 2026</option>
          </select>
        </div>
      </header>

      {/* ============================================================================ */}
      {/* CONTROLS: SEARCH & FILTERS                                                   */}
      {/* ============================================================================ */}
      <div className="mb-8 space-y-4">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          {/* SEMESTER FILTER BUTTONS */}
          <div className="flex items-center p-1 bg-slate-100 dark:bg-slate-800/60 rounded-xl w-full sm:w-auto">
            <button
              onClick={() => setSemesterFilter("all")}
              className={`flex-1 sm:flex-initial px-4 py-2 text-xs sm:text-sm font-medium rounded-lg transition-all duration-200 ${
                semesterFilter === "all"
                  ? "bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-sm font-semibold"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900"
              }`}
            >
              ALL SEMESTER
            </button>
            <button
              onClick={() => setSemesterFilter("ganjil")}
              className={`flex-1 sm:flex-initial px-4 py-2 text-xs sm:text-sm font-medium rounded-lg transition-all duration-200 ${
                semesterFilter === "ganjil"
                  ? "bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-sm font-semibold"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900"
              }`}
            >
              GANJIL
            </button>
            <button
              onClick={() => setSemesterFilter("genap")}
              className={`flex-1 sm:flex-initial px-4 py-2 text-xs sm:text-sm font-medium rounded-lg transition-all duration-200 ${
                semesterFilter === "genap"
                  ? "bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-sm font-semibold"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900"
              }`}
            >
              GENAP
            </button>
          </div>

          {/* SEARCH BAR */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari agenda akademik (misal: wisuda, ujian)..."
              className="w-full pl-10 pr-4 py-2.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all shadow-sm"
              aria-label="Cari agenda akademik"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* CATEGORY FILTER BADGES */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none pt-1">
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1 shrink-0 mr-1">
            <Filter className="w-3 h-3" /> Filter:
          </span>
          <button
            onClick={() => setCategoryFilter("all")}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium shrink-0 transition-all ${
              categoryFilter === "all"
                ? "bg-slate-900 text-white dark:bg-white dark:text-slate-900"
                : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200"
            }`}
          >
            Semua Kategori
          </button>
          {Object.keys(CATEGORY_COLORS).map((catKey) => {
            const cat = catKey as EventCategory;
            const style = CATEGORY_COLORS[cat];
            const isActive = categoryFilter === cat;
            return (
              <button
                key={cat}
                onClick={() => setCategoryFilter(cat)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium capitalize shrink-0 transition-all flex items-center gap-1.5 ${
                  isActive
                    ? "ring-2 ring-primary ring-offset-1 " +
                      style.bg +
                      " " +
                      style.text
                    : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200"
                }`}
              >
                <span className={`w-2 h-2 rounded-full ${style.dot}`} />
                {cat}
              </button>
            );
          })}
        </div>
      </div>

      {/* ============================================================================ */}
      {/* CALENDAR & DAILY PREVIEW LAYOUT                                             */}
      {/* ============================================================================ */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
        {/* MAIN CALENDAR GRID (2 Columns in LG) */}
        <div className="lg:col-span-2 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden p-4 sm:p-6">
          {/* MONTH NAVIGATION HEADER */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
                {MONTH_NAMES[currentDate.getMonth()]}{" "}
                {currentDate.getFullYear()}
              </h2>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleResetToday}
                className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-700 dark:text-slate-300 transition-colors flex items-center gap-1"
                title="Kembali ke hari ini"
                aria-label="Kembali ke hari ini"
              >
                <RotateCcw className="w-3 h-3" />
                <span>TODAY</span>
              </button>
              <div className="flex items-center bg-slate-100 dark:bg-slate-800 rounded-lg p-0.5">
                <button
                  onClick={handlePrevMonth}
                  className="p-1.5 rounded-md hover:bg-white dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 transition-colors"
                  aria-label="Bulan Sebelumnya"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={handleNextMonth}
                  className="p-1.5 rounded-md hover:bg-white dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 transition-colors"
                  aria-label="Bulan Berikutnya"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>

          {/* DAYS OF WEEK HEADER */}
          <div className="grid grid-cols-7 mb-2 text-center">
            {DAYS_SHORT.map((day) => (
              <div
                key={day}
                className="py-2 text-xs font-bold text-slate-400 dark:text-slate-500 tracking-wider"
              >
                {day}
              </div>
            ))}
          </div>

          {/* GRID TANGGAL */}
          <div className="grid grid-cols-7 gap-1 sm:gap-2">
            {calendarGrid.map((item, idx) => {
              const dayEvents = getEventsForDate(item.dateStr);
              const isToday = item.dateStr === todayStr;
              const isSelected = item.dateStr === selectedDateStr;

              return (
                <button
                  key={idx}
                  onClick={() => setSelectedDateStr(item.dateStr)}
                  className={`min-h-[64px] sm:min-h-[80px] p-1 sm:p-2 rounded-xl flex flex-col items-center justify-between border transition-all duration-150 group relative ${
                    !item.isCurrentMonth
                      ? "text-slate-300 dark:text-slate-700 border-transparent bg-slate-50/50 dark:bg-slate-900/30"
                      : isSelected
                        ? "border-primary bg-primary/5 text-primary shadow-sm ring-2 ring-primary/20"
                        : isToday
                          ? "border-amber-400 bg-amber-50/30 dark:bg-amber-950/20 text-amber-900 dark:text-amber-200"
                          : "border-slate-100 dark:border-slate-800/60 hover:border-slate-300 dark:hover:border-slate-700 bg-white dark:bg-slate-900"
                  }`}
                  aria-label={`Tanggal ${item.dayNumber}`}
                >
                  {/* TANGGAL NUMBER */}
                  <div className="w-full flex justify-between items-center">
                    <span
                      className={`text-xs sm:text-sm font-semibold w-6 h-6 rounded-full flex items-center justify-center ${
                        isToday
                          ? "bg-amber-500 text-white font-bold"
                          : isSelected
                            ? "bg-primary text-white"
                            : "group-hover:text-primary"
                      }`}
                    >
                      {item.dayNumber}
                    </span>
                  </div>

                  {/* INDICATOR AGENDA */}
                  <div className="w-full flex flex-col gap-1 my-1">
                    {/* Desktop View: Badge Ringkas */}
                    <div className="hidden sm:flex flex-col gap-1 w-full">
                      {dayEvents.slice(0, 2).map((evt) => (
                        <div
                          key={evt.id}
                          onClick={(e) => {
                            e.stopPropagation();
                            setActiveModalEvent(evt);
                          }}
                          className={`text-[10px] truncate px-1.5 py-0.5 rounded font-medium ${CATEGORY_COLORS[evt.category].bg} ${CATEGORY_COLORS[evt.category].text}`}
                          title={evt.title}
                        >
                          {evt.title}
                        </div>
                      ))}
                      {dayEvents.length > 2 && (
                        <span className="text-[9px] text-slate-400 text-left font-medium pl-1">
                          +{dayEvents.length - 2} lagi
                        </span>
                      )}
                    </div>

                    {/* Mobile View: Dots Only */}
                    <div className="flex sm:hidden justify-center gap-1 mt-1">
                      {dayEvents.slice(0, 3).map((evt) => (
                        <span
                          key={evt.id}
                          className={`w-1.5 h-1.5 rounded-full ${CATEGORY_COLORS[evt.category].dot}`}
                        />
                      ))}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* SIDE PANEL: SELECTED DATE AGENDA / QUICK VIEW */}
        <div className="bg-slate-50 dark:bg-slate-900/50 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 flex flex-col h-full">
          <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-4 mb-4">
            <div>
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Agenda Tanggal
              </span>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                {selectedDateStr
                  ? formatDateIndonesian(selectedDateStr)
                  : "Pilih Tanggal"}
              </h3>
            </div>
            <CalendarIcon className="w-5 h-5 text-slate-400" />
          </div>

          <div className="flex-1 overflow-y-auto space-y-3 pr-1">
            {!selectedDateStr ? (
              <div className="text-center py-12 text-slate-400 text-sm">
                Klik tanggal pada kalender untuk melihat detail agenda.
              </div>
            ) : selectedDateEvents.length === 0 ? (
              <div className="text-center py-12 text-slate-400 text-sm">
                Tidak ada agenda akademik pada tanggal ini.
              </div>
            ) : (
              selectedDateEvents.map((evt) => {
                const style = CATEGORY_COLORS[evt.category];
                return (
                  <div
                    key={evt.id}
                    onClick={() => setActiveModalEvent(evt)}
                    className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-all cursor-pointer group"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span
                        className={`px-2 py-0.5 text-[10px] font-bold uppercase rounded ${style.bg} ${style.text}`}
                      >
                        {evt.category}
                      </span>
                      <span className="text-xs text-slate-400 uppercase font-semibold">
                        Smt {evt.semester}
                      </span>
                    </div>
                    <h4 className="font-semibold text-slate-900 dark:text-white text-sm group-hover:text-primary transition-colors">
                      {evt.title}
                    </h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {formatDateRange(evt.startDate, evt.endDate)}
                    </p>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>

      {/* ============================================================================ */}
      {/* SEMESTER TIMELINE SECTION                                                   */}
      {/* ============================================================================ */}
      <section className="mt-12">
        <div className="mb-8 border-b border-slate-200 dark:border-slate-800 pb-4">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
            Timeline Agenda Semester
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Daftar kronologis seluruh aktivitas akademik Politeknik Negeri
            Sriwijaya
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* SEMESTER GANJIL TIMELINE */}
          {(semesterFilter === "all" || semesterFilter === "ganjil") && (
            <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
              <div className="flex items-center gap-3 mb-6 pb-3 border-b border-slate-100 dark:border-slate-800">
                <div className="w-3 h-8 bg-blue-600 rounded-full" />
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                  SEMESTER GANJIL
                </h3>
              </div>

              <div className="relative pl-6 border-l-2 border-slate-200 dark:border-slate-800 space-y-8">
                {filteredEvents
                  .filter((e) => e.semester === "ganjil")
                  .map((evt) => {
                    const style = CATEGORY_COLORS[evt.category];
                    return (
                      <div
                        key={evt.id}
                        onClick={() => setActiveModalEvent(evt)}
                        className="relative group cursor-pointer"
                      >
                        {/* Dot indicator */}
                        <div
                          className={`absolute -left-[31px] top-1.5 w-4 h-4 rounded-full border-2 border-white dark:border-slate-900 ${style.dot} transition-transform group-hover:scale-125`}
                        />

                        <div className="bg-slate-50 dark:bg-slate-800/40 p-4 rounded-xl border border-slate-100 dark:border-slate-800 hover:border-slate-300 transition-all">
                          <div className="flex items-center justify-between gap-2 mb-1">
                            <span
                              className={`px-2 py-0.5 text-[10px] font-bold uppercase rounded ${style.bg} ${style.text}`}
                            >
                              {evt.category}
                            </span>
                            <span className="text-xs font-semibold text-slate-400">
                              {formatDateRange(evt.startDate, evt.endDate)}
                            </span>
                          </div>
                          <h4 className="font-bold text-slate-800 dark:text-slate-100 text-sm group-hover:text-primary transition-colors">
                            {evt.title}
                          </h4>
                          {evt.description && (
                            <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 line-clamp-2">
                              {evt.description}
                            </p>
                          )}
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>
          )}

          {/* SEMESTER GENAP TIMELINE */}
          {(semesterFilter === "all" || semesterFilter === "genap") && (
            <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
              <div className="flex items-center gap-3 mb-6 pb-3 border-b border-slate-100 dark:border-slate-800">
                <div className="w-3 h-8 bg-emerald-600 rounded-full" />
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                  SEMESTER GENAP
                </h3>
              </div>

              <div className="relative pl-6 border-l-2 border-slate-200 dark:border-slate-800 space-y-8">
                {filteredEvents
                  .filter((e) => e.semester === "genap")
                  .map((evt) => {
                    const style = CATEGORY_COLORS[evt.category];
                    return (
                      <div
                        key={evt.id}
                        onClick={() => setActiveModalEvent(evt)}
                        className="relative group cursor-pointer"
                      >
                        {/* Dot indicator */}
                        <div
                          className={`absolute -left-[31px] top-1.5 w-4 h-4 rounded-full border-2 border-white dark:border-slate-900 ${style.dot} transition-transform group-hover:scale-125`}
                        />

                        <div className="bg-slate-50 dark:bg-slate-800/40 p-4 rounded-xl border border-slate-100 dark:border-slate-800 hover:border-slate-300 transition-all">
                          <div className="flex items-center justify-between gap-2 mb-1">
                            <span
                              className={`px-2 py-0.5 text-[10px] font-bold uppercase rounded ${style.bg} ${style.text}`}
                            >
                              {evt.category}
                            </span>
                            <span className="text-xs font-semibold text-slate-400">
                              {formatDateRange(evt.startDate, evt.endDate)}
                            </span>
                          </div>
                          <h4 className="font-bold text-slate-800 dark:text-slate-100 text-sm group-hover:text-primary transition-colors">
                            {evt.title}
                          </h4>
                          {evt.description && (
                            <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 line-clamp-2">
                              {evt.description}
                            </p>
                          )}
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ============================================================================ */}
      {/* MODAL EVENT DETAIL                                                          */}
      {/* ============================================================================ */}
      {activeModalEvent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
          <div
            className="bg-white dark:bg-slate-900 rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 dark:border-slate-800 relative animate-scale-up"
            role="dialog"
            aria-modal="true"
          >
            {/* CLOSE BUTTON */}
            <button
              onClick={() => setActiveModalEvent(null)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              aria-label="Tutup modal"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="mb-4">
              <span
                className={`inline-block px-2.5 py-1 text-xs font-extrabold uppercase rounded-md mb-3 ${
                  CATEGORY_COLORS[activeModalEvent.category].bg
                } ${CATEGORY_COLORS[activeModalEvent.category].text}`}
              >
                {activeModalEvent.category}
              </span>
              <h3 className="text-xl font-extrabold text-slate-900 dark:text-white">
                {activeModalEvent.title}
              </h3>
            </div>

            <div className="space-y-3 mb-6 bg-slate-50 dark:bg-slate-800/50 p-4 rounded-xl border border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-3 text-sm text-slate-600 dark:text-slate-300">
                <Clock className="w-4 h-4 text-primary shrink-0" />
                <span className="font-medium">
                  {formatDateRange(
                    activeModalEvent.startDate,
                    activeModalEvent.endDate,
                  )}
                </span>
              </div>
              <div className="flex items-center gap-3 text-sm text-slate-600 dark:text-slate-300">
                <Tag className="w-4 h-4 text-primary shrink-0" />
                <span className="font-medium capitalize">
                  Semester {activeModalEvent.semester} (
                  {activeModalEvent.academicYear})
                </span>
              </div>
            </div>

            {activeModalEvent.description && (
              <div className="mb-6">
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                  Deskripsi Kegiatan
                </h4>
                <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  {activeModalEvent.description}
                </p>
              </div>
            )}

            <div className="flex justify-end">
              <button
                onClick={() => setActiveModalEvent(null)}
                className="px-5 py-2.5 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-700 dark:text-slate-200 rounded-xl text-sm font-semibold transition-colors"
              >
                CLOSE ×
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AcademicCalendar;
