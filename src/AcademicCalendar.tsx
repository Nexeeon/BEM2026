import React, { useState, useMemo, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
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
  Instagram,
  Mail,
  Youtube,
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

type DropdownName = "academic" | "echo" | null;

export interface AcademicEvent {
  id: string;
  title: string;
  startDate: string;
  endDate: string;
  category: EventCategory;
  semester: SemesterType;
  academicYear: string;
  description?: string;
  location?: string;
}

// ============================================================================
// DATA SET
// ============================================================================

const ACADEMIC_EVENTS: AcademicEvent[] = [
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
    description:
      "Pelaksanaan Ujian Tengah Semester (UTS) Ganjil TA 2025/2026.",
  },
  {
    id: "8",
    title: "Ujian Semester Ganjil",
    startDate: "2026-01-05",
    endDate: "2026-01-10",
    category: "ujian",
    semester: "ganjil",
    academicYear: "2025/2026",
    description:
      "Pelaksanaan Ujian Akhir Semester (UAS) Ganjil TA 2025/2026.",
  },
  {
    id: "9",
    title: "Yudisium Semester Ganjil",
    startDate: "2026-01-23",
    endDate: "2026-01-23",
    category: "akademik",
    semester: "ganjil",
    academicYear: "2025/2026",
    description:
      "Pelaksanaan Yudisium kelulusan Semester Ganjil TA 2025/2026.",
  },
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
    description:
      "Rentang operasional perkuliahan perkuliahan Semester Genap.",
  },
  {
    id: "13",
    title: "Ujian Tengah Semester Genap",
    startDate: "2026-03-30",
    endDate: "2026-04-04",
    category: "ujian",
    semester: "genap",
    academicYear: "2025/2026",
    description:
      "Pelaksanaan Ujian Tengah Semester (UTS) Genap TA 2025/2026.",
  },
  {
    id: "14",
    title: "Ujian Semester Genap",
    startDate: "2026-07-06",
    endDate: "2026-07-11",
    category: "ujian",
    semester: "genap",
    academicYear: "2025/2026",
    description:
      "Pelaksanaan Ujian Akhir Semester (UAS) Genap TA 2025/2026.",
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
    description:
      "Yudisium kelulusan mahasiswa Semester Genap TA 2025/2026.",
  },
  {
    id: "17",
    title: "Libur Semester Genap",
    startDate: "2026-08-03",
    endDate: "2026-08-28",
    category: "libur",
    semester: "genap",
    academicYear: "2025/2026",
    description:
      "Masa libur perkuliahan akhir tahun akademik.",
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
    description:
      "Upacara Wisuda ke-42 Politeknik Negeri Sriwijaya.",
  },
  {
    id: "20",
    title: "Awal Kegiatan SMT Ganjil TA 26/27",
    startDate: "2026-09-07",
    endDate: "2026-09-07",
    category: "semester",
    semester: "genap",
    academicYear: "2025/2026",
    description:
      "Pembukaan tahun ajaran baru 2026/2027.",
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

const formatDateRange = (
  startDateStr: string,
  endDateStr: string,
): string => {
  if (startDateStr === endDateStr) {
    return formatDateIndonesian(startDateStr);
  }

  const start = new Date(startDateStr);
  const end = new Date(endDateStr);

  if (
    start.getMonth() === end.getMonth() &&
    start.getFullYear() === end.getFullYear()
  ) {
    return `${start.getDate()} – ${end.getDate()} ${
      MONTH_NAMES[start.getMonth()]
    } ${start.getFullYear()}`;
  }

  return `${formatDateIndonesian(startDateStr)} – ${formatDateIndonesian(
    endDateStr,
  )}`;
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
  const [currentDate, setCurrentDate] = useState<Date>(
    new Date(2025, 8, 1),
  );

  const [selectedYear, setSelectedYear] =
    useState<string>("2025/2026");

  const [semesterFilter, setSemesterFilter] = useState<
    "all" | "ganjil" | "genap"
  >("all");

  const [categoryFilter, setCategoryFilter] =
    useState<string>("all");

  const [searchQuery, setSearchQuery] =
    useState<string>("");

  const [selectedDateStr, setSelectedDateStr] =
    useState<string | null>(null);

  const [activeModalEvent, setActiveModalEvent] =
    useState<AcademicEvent | null>(null);

  // Navbar
  const [mobileOpen, setMobileOpen] =
    useState(false);

  const [openDropdown, setOpenDropdown] =
    useState<DropdownName>(null);

  const [scrolled, setScrolled] =
    useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const toggleDropdown = (
    name: Exclude<DropdownName, null>,
  ) => {
    setOpenDropdown(
      openDropdown === name ? null : name,
    );
  };

  const closeMenus = () => {
    setMobileOpen(false);
    setOpenDropdown(null);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setActiveModalEvent(null);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const filteredEvents = useMemo(() => {
    return ACADEMIC_EVENTS.filter((event) => {
      if (event.academicYear !== selectedYear) {
        return false;
      }

      if (
        semesterFilter !== "all" &&
        event.semester !== semesterFilter
      ) {
        return false;
      }

      if (
        categoryFilter !== "all" &&
        event.category !== categoryFilter
      ) {
        return false;
      }

      if (searchQuery.trim() !== "") {
        const query = searchQuery.toLowerCase();

        const matchTitle =
          event.title.toLowerCase().includes(query);

        const matchDesc =
          event.description
            ?.toLowerCase()
            .includes(query);

        const matchCat =
          event.category
            .toLowerCase()
            .includes(query);

        return (
          matchTitle ||
          matchDesc ||
          matchCat
        );
      }

      return true;
    });
  }, [
    selectedYear,
    semesterFilter,
    categoryFilter,
    searchQuery,
  ]);

  const handlePrevMonth = () => {
    setCurrentDate(
      (prev) =>
        new Date(
          prev.getFullYear(),
          prev.getMonth() - 1,
          1,
        ),
    );
  };

  const handleNextMonth = () => {
    setCurrentDate(
      (prev) =>
        new Date(
          prev.getFullYear(),
          prev.getMonth() + 1,
          1,
        ),
    );
  };

  const handleResetToday = () => {
    setCurrentDate(new Date());

    const todayStr = new Date()
      .toISOString()
      .split("T")[0];

    setSelectedDateStr(todayStr);
  };

  const calendarGrid = useMemo(() => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    const firstDayOfMonth = new Date(
      year,
      month,
      1,
    );

    const lastDayOfMonth = new Date(
      year,
      month + 1,
      0,
    );

    let startDayOfWeek =
      firstDayOfMonth.getDay() - 1;

    if (startDayOfWeek === -1) {
      startDayOfWeek = 6;
    }

    const totalDays =
      lastDayOfMonth.getDate();

    const grid: Array<{
      dateStr: string;
      dayNumber: number;
      isCurrentMonth: boolean;
    }> = [];

    const prevMonthLastDay =
      new Date(year, month, 0).getDate();

    for (
      let i = startDayOfWeek - 1;
      i >= 0;
      i--
    ) {
      const prevDate = new Date(
        year,
        month - 1,
        prevMonthLastDay - i,
      );

      const dateStr = prevDate
        .toISOString()
        .split("T")[0];

      grid.push({
        dateStr,
        dayNumber: prevMonthLastDay - i,
        isCurrentMonth: false,
      });
    }

    for (
      let day = 1;
      day <= totalDays;
      day++
    ) {
      const dateStr = `${year}-${String(
        month + 1,
      ).padStart(2, "0")}-${String(day).padStart(
        2,
        "0",
      )}`;

      grid.push({
        dateStr,
        dayNumber: day,
        isCurrentMonth: true,
      });
    }

    const remainingSlots = 42 - grid.length;

    for (
      let i = 1;
      i <=
      (remainingSlots < 7
        ? remainingSlots
        : remainingSlots - 7);
      i++
    ) {
      const nextDate = new Date(
        year,
        month + 1,
        i,
      );

      const dateStr = nextDate
        .toISOString()
        .split("T")[0];

      grid.push({
        dateStr,
        dayNumber: i,
        isCurrentMonth: false,
      });
    }

    return grid;
  }, [currentDate]);

  const getEventsForDate = useCallback(
    (dateStr: string) => {
      return filteredEvents.filter((event) =>
        isDateInRange(
          dateStr,
          event.startDate,
          event.endDate,
        ),
      );
    },
    [filteredEvents],
  );

  const selectedDateEvents = useMemo(() => {
    if (!selectedDateStr) {
      return [];
    }

    return getEventsForDate(selectedDateStr);
  }, [
    selectedDateStr,
    getEventsForDate,
  ]);

  const todayStr = new Date()
    .toISOString()
    .split("T")[0];

  return (
    <main className="relative min-h-screen overflow-x-clip bg-[url('/images/bgweb.jpeg')] bg-cover bg-fixed bg-center bg-no-repeat pt-[72px] text-slate-900">
      <div className="min-h-screen bg-white/65">

        {/* ============================================================ */}
        {/* NAVBAR */}
        {/* ============================================================ */}

        <header
          className={`fixed inset-x-0 top-0 z-[100] transition-all duration-300 ${
            scrolled
              ? "border-b border-slate-200/70 bg-white/80 shadow-sm backdrop-blur-xl"
              : "border-b border-white/20 bg-white/20 backdrop-blur-md"
          }`}
        >
          <div className="w-full">
            <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between px-5 lg:px-8">

              {/* BRAND */}
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
                  onClick={closeMenus}
                  className="rounded-lg px-3.5 py-2 text-sm font-medium text-slate-600 transition-all hover:bg-white/55 hover:text-amber-600"
                >
                  Home
                </Link>

                <Link
                  to="/#visi"
                  onClick={closeMenus}
                  className="rounded-lg px-3.5 py-2 text-sm font-medium text-slate-600 transition-all hover:bg-white/55 hover:text-amber-600"
                >
                  About
                </Link>

                {/* ACADEMIC */}
                <div className="relative">
                  <button
                    type="button"
                    onClick={() =>
                      toggleDropdown("academic")
                    }
                    className={`flex items-center gap-1 rounded-lg px-3.5 py-2 text-sm font-medium ${
                      openDropdown === "academic"
                        ? "bg-amber-50 text-amber-700"
                        : "text-amber-700 hover:bg-white/55"
                    }`}
                  >
                    Academic Information

                    <ChevronRight
                      size={15}
                      className={`rotate-90 transition-transform ${
                        openDropdown === "academic"
                          ? "rotate-[270deg]"
                          : ""
                      }`}
                    />
                  </button>

                  {openDropdown === "academic" && (
                    <div className="absolute left-0 top-full mt-2 w-60 overflow-hidden rounded-xl border border-slate-200/70 bg-white/95 p-1.5 shadow-xl backdrop-blur-xl">

                      <Link
                        to="/calendar"
                        onClick={closeMenus}
                        className="block rounded-lg bg-amber-50 px-3 py-2.5 text-xs font-semibold text-amber-700"
                      >
                        Academic Calendar
                      </Link>

                      <a
                        href="/#agenda"
                        onClick={closeMenus}
                        className="block rounded-lg px-3 py-2.5 text-xs font-semibold text-slate-600 hover:bg-amber-50 hover:text-amber-700"
                      >
                        Scholarship Info
                      </a>

                      <a
                        href="/#agenda"
                        onClick={closeMenus}
                        className="block rounded-lg px-3 py-2.5 text-xs font-semibold text-slate-600 hover:bg-amber-50 hover:text-amber-700"
                      >
                        Organisasi Mahasiswa
                      </a>

                      <a
                        href="/#agenda"
                        onClick={closeMenus}
                        className="block rounded-lg px-3 py-2.5 text-xs font-semibold text-slate-600 hover:bg-amber-50 hover:text-amber-700"
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
                    onClick={() =>
                      toggleDropdown("echo")
                    }
                    className={`flex items-center gap-1 rounded-lg px-3.5 py-2 text-sm font-medium ${
                      openDropdown === "echo"
                        ? "bg-amber-50 text-amber-700"
                        : "text-slate-600 hover:bg-white/55 hover:text-amber-600"
                    }`}
                  >
                    Campus Echo

                    <ChevronRight
                      size={15}
                      className={`rotate-90 transition-transform ${
                        openDropdown === "echo"
                          ? "rotate-[270deg]"
                          : ""
                      }`}
                    />
                  </button>

                  {openDropdown === "echo" && (
                    <div className="absolute left-0 top-full mt-2 w-52 overflow-hidden rounded-xl border border-slate-200/70 bg-white/95 p-1.5 shadow-xl backdrop-blur-xl">

                      <Link
                        to="/kajian"
                        onClick={closeMenus}
                        className="block rounded-lg px-3 py-2.5 text-xs font-semibold text-slate-600 hover:bg-amber-50 hover:text-amber-700"
                      >
                        Kajian
                      </Link>

                      <Link
                        to="/bisik-kampus"
                        onClick={closeMenus}
                        className="block rounded-lg px-3 py-2.5 text-xs font-semibold text-slate-600 hover:bg-amber-50 hover:text-amber-700"
                      >
                        Bisik Kampus
                      </Link>

                      <a
                        href="#"
                        onClick={(e) =>
                          e.preventDefault()
                        }
                        className="block rounded-lg px-3 py-2.5 text-xs font-semibold text-slate-600 hover:bg-amber-50 hover:text-amber-700"
                      >
                        Polsrifess
                      </a>
                    </div>
                  )}
                </div>

                {/* CONTACT */}
                <Link
                  to="/contact"
                  onClick={closeMenus}
                  className="ml-1 rounded-lg px-3.5 py-2 text-sm font-medium text-slate-600 hover:bg-white/50 hover:text-amber-600"
                >
                  Contact Us
                </Link>
              </nav>

              {/* MOBILE */}
              <button
                type="button"
                aria-label={
                  mobileOpen
                    ? "Tutup menu"
                    : "Buka menu"
                }
                aria-expanded={mobileOpen}
                className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/40 bg-white/40 text-slate-700 backdrop-blur-md lg:hidden"
                onClick={() =>
                  setMobileOpen(!mobileOpen)
                }
              >
                <span className="text-xl leading-none">
                  {mobileOpen ? "×" : "☰"}
                </span>
              </button>
            </div>

            {/* MOBILE NAV */}
            {mobileOpen && (
              <div className="border-t border-slate-200/70 bg-white/95 px-5 py-3 shadow-lg backdrop-blur-xl lg:hidden">

                <Link
                  to="/"
                  onClick={closeMenus}
                  className="block rounded-lg px-3 py-3 text-sm font-medium text-slate-600 hover:bg-slate-50 hover:text-amber-600"
                >
                  Home
                </Link>

                <Link
                  to="/#visi"
                  onClick={closeMenus}
                  className="block rounded-lg px-3 py-3 text-sm font-medium text-slate-600 hover:bg-slate-50 hover:text-amber-600"
                >
                  About
                </Link>

                {/* MOBILE ACADEMIC */}
                <button
                  type="button"
                  onClick={() =>
                    toggleDropdown("academic")
                  }
                  className={`mt-1 flex w-full items-center justify-between rounded-lg px-3 py-3 text-sm font-medium ${
                    openDropdown === "academic"
                      ? "bg-amber-50 text-amber-700"
                      : "text-slate-600 hover:bg-slate-50 hover:text-amber-600"
                  }`}
                >
                  Academic Information

                  <span
                    className={`transition-transform ${
                      openDropdown === "academic"
                        ? "rotate-180"
                        : ""
                    }`}
                  >
                    ⌄
                  </span>
                </button>

                {openDropdown === "academic" && (
                  <div className="mt-1 rounded-lg bg-slate-50 p-1">

                    <Link
                      to="/calendar"
                      onClick={closeMenus}
                      className="block rounded-md bg-amber-50 px-3 py-2.5 text-sm font-semibold text-amber-700"
                    >
                      Academic Calendar
                    </Link>

                    <a
                      href="/#agenda"
                      onClick={closeMenus}
                      className="block rounded-md px-3 py-2.5 text-sm text-slate-600 hover:bg-white hover:text-amber-700"
                    >
                      Scholarship Info
                    </a>

                    <a
                      href="/#agenda"
                      onClick={closeMenus}
                      className="block rounded-md px-3 py-2.5 text-sm text-slate-600 hover:bg-white hover:text-amber-700"
                    >
                      Organisasi Mahasiswa
                    </a>

                    <a
                      href="/#agenda"
                      onClick={closeMenus}
                      className="block rounded-md px-3 py-2.5 text-sm text-slate-600 hover:bg-white hover:text-amber-700"
                    >
                      Mahasiswa Berdampak
                    </a>
                  </div>
                )}

                {/* MOBILE CAMPUS ECHO */}
                <button
                  type="button"
                  onClick={() =>
                    toggleDropdown("echo")
                  }
                  className={`mt-1 flex w-full items-center justify-between rounded-lg px-3 py-3 text-sm font-medium ${
                    openDropdown === "echo"
                      ? "bg-amber-50 text-amber-700"
                      : "text-slate-600 hover:bg-slate-50 hover:text-amber-600"
                  }`}
                >
                  Campus Echo

                  <span
                    className={`transition-transform ${
                      openDropdown === "echo"
                        ? "rotate-180"
                        : ""
                    }`}
                  >
                    ⌄
                  </span>
                </button>

                {openDropdown === "echo" && (
                  <div className="mt-1 rounded-lg bg-slate-50 p-1">

                    <Link
                      to="/kajian"
                      onClick={closeMenus}
                      className="block rounded-md px-3 py-2.5 text-sm text-slate-600 hover:bg-white hover:text-amber-700"
                    >
                      Kajian
                    </Link>

                    <Link
                      to="/bisik-kampus"
                      onClick={closeMenus}
                      className="block rounded-md px-3 py-2.5 text-sm text-slate-600 hover:bg-white hover:text-amber-700"
                    >
                      Bisik Kampus
                    </Link>

                    <a
                      href="#"
                      onClick={(e) =>
                        e.preventDefault()
                      }
                      className="block rounded-md px-3 py-2.5 text-sm text-slate-600 hover:bg-white hover:text-amber-700"
                    >
                      Polsrifess
                    </a>
                  </div>
                )}

                <Link
                  to="/contact"
                  onClick={closeMenus}
                  className="mt-1 block rounded-lg px-3 py-3 text-sm font-medium text-slate-600 hover:bg-slate-50 hover:text-amber-600"
                >
                  Contact Us
                </Link>
              </div>
            )}
          </div>
        </header>

        {/* ============================================================ */}
        {/* MAIN CONTENT */}
        {/* ============================================================ */}

        <div className="mx-auto w-full max-w-7xl px-4 py-8 transition-all duration-300 sm:px-6 lg:px-8">

          {/* HEADER */}
          <header className="mb-8 flex flex-col gap-6 border-b border-slate-200 pb-8 text-center dark:border-slate-800 sm:text-left md:flex-row md:items-end md:justify-between">

            <div>
              <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-primary">
                <BookOpen className="h-3.5 w-3.5" />
                <span>Academic Information</span>
              </div>

              <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
                Academic Calendar
              </h1>

              <p className="mt-2 max-w-2xl text-sm text-slate-600 dark:text-slate-400 sm:text-base">
                Temukan jadwal akademik dan agenda penting
                Politeknik Negeri Sriwijaya dalam satu
                kalender.
              </p>
            </div>

            <div className="flex items-center justify-center gap-3 self-center rounded-xl bg-slate-100 p-1.5 dark:bg-slate-800/80 md:self-auto">
              <label
                htmlFor="year-select"
                className="pl-2 text-xs font-medium text-slate-500 dark:text-slate-400"
              >
                Academic Year
              </label>

              <select
                id="year-select"
                value={selectedYear}
                onChange={(e) =>
                  setSelectedYear(e.target.value)
                }
                className="cursor-pointer rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-sm font-semibold text-slate-800 shadow-sm focus:outline-none focus:ring-2 focus:ring-primary dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200"
              >
                <option value="2025/2026">
                  2025 / 2026
                </option>
              </select>
            </div>
          </header>

          {/* SEARCH & FILTERS */}
          <div className="mb-8 space-y-4">

            <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-center">

              <div className="flex w-full items-center rounded-xl bg-slate-100 p-1 dark:bg-slate-800/60 sm:w-auto">
                <button
                  onClick={() =>
                    setSemesterFilter("all")
                  }
                  className={`flex-1 rounded-lg px-4 py-2 text-xs font-medium transition-all duration-200 sm:flex-initial sm:text-sm ${
                    semesterFilter === "all"
                      ? "bg-white font-semibold text-slate-900 shadow-sm dark:bg-slate-900 dark:text-white"
                      : "text-slate-600 hover:text-slate-900 dark:text-slate-400"
                  }`}
                >
                  ALL SEMESTER
                </button>

                <button
                  onClick={() =>
                    setSemesterFilter("ganjil")
                  }
                  className={`flex-1 rounded-lg px-4 py-2 text-xs font-medium transition-all duration-200 sm:flex-initial sm:text-sm ${
                    semesterFilter === "ganjil"
                      ? "bg-white font-semibold text-slate-900 shadow-sm dark:bg-slate-900 dark:text-white"
                      : "text-slate-600 hover:text-slate-900 dark:text-slate-400"
                  }`}
                >
                  GANJIL
                </button>

                <button
                  onClick={() =>
                    setSemesterFilter("genap")
                  }
                  className={`flex-1 rounded-lg px-4 py-2 text-xs font-medium transition-all duration-200 sm:flex-initial sm:text-sm ${
                    semesterFilter === "genap"
                      ? "bg-white font-semibold text-slate-900 shadow-sm dark:bg-slate-900 dark:text-white"
                      : "text-slate-600 hover:text-slate-900 dark:text-slate-400"
                  }`}
                >
                  GENAP
                </button>
              </div>

              <div className="relative max-w-md flex-1">
                <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) =>
                    setSearchQuery(e.target.value)
                  }
                  placeholder="Cari agenda akademik (misal: wisuda, ujian)..."
                  className="w-full rounded-xl border border-slate-200 bg-white py-2.5 pl-10 pr-4 text-sm text-slate-900 shadow-sm transition-all placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary/50 dark:border-slate-800 dark:bg-slate-900 dark:text-white"
                  aria-label="Cari agenda akademik"
                />

                {searchQuery && (
                  <button
                    onClick={() =>
                      setSearchQuery("")
                    }
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  >
                    <X className="h-4 w-4" />
                  </button>
                )}
              </div>
            </div>

            <div className="flex items-center gap-2 overflow-x-auto pb-2 pt-1">
              <span className="mr-1 flex shrink-0 items-center gap-1 text-xs font-semibold uppercase tracking-wider text-slate-400">
                <Filter className="h-3 w-3" />
                Filter:
              </span>

              <button
                onClick={() =>
                  setCategoryFilter("all")
                }
                className={`shrink-0 rounded-lg px-3 py-1.5 text-xs font-medium transition-all ${
                  categoryFilter === "all"
                    ? "bg-slate-900 text-white dark:bg-white dark:text-slate-900"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-400"
                }`}
              >
                Semua Kategori
              </button>

              {Object.keys(CATEGORY_COLORS).map(
                (catKey) => {
                  const cat =
                    catKey as EventCategory;

                  const style =
                    CATEGORY_COLORS[cat];

                  const isActive =
                    categoryFilter === cat;

                  return (
                    <button
                      key={cat}
                      onClick={() =>
                        setCategoryFilter(cat)
                      }
                      className={`flex shrink-0 items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium capitalize transition-all ${
                        isActive
                          ? "ring-2 ring-primary ring-offset-1 " +
                            style.bg +
                            " " +
                            style.text
                          : "bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-400"
                      }`}
                    >
                      <span
                        className={`h-2 w-2 rounded-full ${style.dot}`}
                      />
                      {cat}
                    </button>
                  );
                },
              )}
            </div>
          </div>

          {/* CALENDAR */}
          <div className="mb-16 grid grid-cols-1 gap-8 lg:grid-cols-3">

            <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-6 lg:col-span-2">

              <div className="mb-6 flex items-center justify-between">
                <h2 className="text-lg font-bold text-slate-900 dark:text-white sm:text-xl">
                  {MONTH_NAMES[
                    currentDate.getMonth()
                  ]}{" "}
                  {currentDate.getFullYear()}
                </h2>

                <div className="flex items-center gap-2">
                  <button
                    onClick={handleResetToday}
                    className="flex items-center gap-1 rounded-lg bg-slate-100 px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300"
                    title="Kembali ke hari ini"
                    aria-label="Kembali ke hari ini"
                  >
                    <RotateCcw className="h-3 w-3" />
                    <span>TODAY</span>
                  </button>

                  <div className="flex items-center rounded-lg bg-slate-100 p-0.5 dark:bg-slate-800">
                    <button
                      onClick={handlePrevMonth}
                      className="rounded-md p-1.5 text-slate-600 hover:bg-white dark:text-slate-300 dark:hover:bg-slate-700"
                      aria-label="Bulan Sebelumnya"
                    >
                      <ChevronLeft className="h-5 w-5" />
                    </button>

                    <button
                      onClick={handleNextMonth}
                      className="rounded-md p-1.5 text-slate-600 hover:bg-white dark:text-slate-300 dark:hover:bg-slate-700"
                      aria-label="Bulan Berikutnya"
                    >
                      <ChevronRight className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              </div>

              <div className="mb-2 grid grid-cols-7 text-center">
                {DAYS_SHORT.map((day) => (
                  <div
                    key={day}
                    className="py-2 text-xs font-bold tracking-wider text-slate-400 dark:text-slate-500"
                  >
                    {day}
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-7 gap-1 sm:gap-2">
                {calendarGrid.map(
                  (item, idx) => {
                    const dayEvents =
                      getEventsForDate(
                        item.dateStr,
                      );

                    const isToday =
                      item.dateStr ===
                      todayStr;

                    const isSelected =
                      item.dateStr ===
                      selectedDateStr;

                    return (
                      <button
                        key={idx}
                        onClick={() =>
                          setSelectedDateStr(
                            item.dateStr,
                          )
                        }
                        className={`group relative flex min-h-[64px] flex-col items-center justify-between rounded-xl border p-1 transition-all duration-150 sm:min-h-[80px] sm:p-2 ${
                          !item.isCurrentMonth
                            ? "border-transparent bg-slate-50/50 text-slate-300 dark:bg-slate-900/30 dark:text-slate-700"
                            : isSelected
                              ? "border-primary bg-primary/5 text-primary shadow-sm ring-2 ring-primary/20"
                              : isToday
                                ? "border-amber-400 bg-amber-50/30 text-amber-900 dark:bg-amber-950/20 dark:text-amber-200"
                                : "border-slate-100 bg-white hover:border-slate-300 dark:border-slate-800/60 dark:bg-slate-900 dark:hover:border-slate-700"
                        }`}
                        aria-label={`Tanggal ${item.dayNumber}`}
                      >
                        <div className="flex w-full items-center justify-between">
                          <span
                            className={`flex h-6 w-6 items-center justify-center rounded-full text-xs font-semibold sm:text-sm ${
                              isToday
                                ? "bg-amber-500 font-bold text-white"
                                : isSelected
                                  ? "bg-primary text-white"
                                  : "group-hover:text-primary"
                            }`}
                          >
                            {item.dayNumber}
                          </span>
                        </div>

                        <div className="my-1 flex w-full flex-col gap-1">
                          <div className="hidden w-full flex-col gap-1 sm:flex">
                            {dayEvents
                              .slice(0, 2)
                              .map((evt) => (
                                <div
                                  key={evt.id}
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setActiveModalEvent(
                                      evt,
                                    );
                                  }}
                                  className={`truncate rounded px-1.5 py-0.5 text-[10px] font-medium ${CATEGORY_COLORS[evt.category].bg} ${CATEGORY_COLORS[evt.category].text}`}
                                  title={evt.title}
                                >
                                  {evt.title}
                                </div>
                              ))}

                            {dayEvents.length > 2 && (
                              <span className="pl-1 text-left text-[9px] font-medium text-slate-400">
                                +{dayEvents.length - 2} lagi
                              </span>
                            )}
                          </div>

                          <div className="mt-1 flex justify-center gap-1 sm:hidden">
                            {dayEvents
                              .slice(0, 3)
                              .map((evt) => (
                                <span
                                  key={evt.id}
                                  className={`h-1.5 w-1.5 rounded-full ${CATEGORY_COLORS[evt.category].dot}`}
                                />
                              ))}
                          </div>
                        </div>
                      </button>
                    );
                  },
                )}
              </div>
            </div>

            {/* SIDE PANEL */}
            <div className="flex h-full flex-col rounded-2xl border border-slate-200 bg-slate-50 p-5 dark:border-slate-800 dark:bg-slate-900/50">

              <div className="mb-4 flex items-center justify-between border-b border-slate-200 pb-4 dark:border-slate-800">
                <div>
                  <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                    Agenda Tanggal
                  </span>

                  <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                    {selectedDateStr
                      ? formatDateIndonesian(
                          selectedDateStr,
                        )
                      : "Pilih Tanggal"}
                  </h3>
                </div>

                <CalendarIcon className="h-5 w-5 text-slate-400" />
              </div>

              <div className="flex-1 space-y-3 overflow-y-auto pr-1">
                {!selectedDateStr ? (
                  <div className="py-12 text-center text-sm text-slate-400">
                    Klik tanggal pada kalender
                    untuk melihat detail agenda.
                  </div>
                ) : selectedDateEvents.length ===
                  0 ? (
                  <div className="py-12 text-center text-sm text-slate-400">
                    Tidak ada agenda akademik
                    pada tanggal ini.
                  </div>
                ) : (
                  selectedDateEvents.map(
                    (evt) => {
                      const style =
                        CATEGORY_COLORS[
                          evt.category
                        ];

                      return (
                        <div
                          key={evt.id}
                          onClick={() =>
                            setActiveModalEvent(
                              evt,
                            )
                          }
                          className="group cursor-pointer rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition-all hover:shadow-md dark:border-slate-800 dark:bg-slate-900"
                        >
                          <div className="mb-2 flex items-center justify-between">
                            <span
                              className={`rounded px-2 py-0.5 text-[10px] font-bold uppercase ${style.bg} ${style.text}`}
                            >
                              {evt.category}
                            </span>

                            <span className="text-xs font-semibold uppercase text-slate-400">
                              Smt{" "}
                              {evt.semester}
                            </span>
                          </div>

                          <h4 className="text-sm font-semibold text-slate-900 transition-colors group-hover:text-primary dark:text-white">
                            {evt.title}
                          </h4>

                          <p className="mt-1 flex items-center gap-1 text-xs text-slate-500 dark:text-slate-400">
                            <Clock className="h-3 w-3" />
                            {formatDateRange(
                              evt.startDate,
                              evt.endDate,
                            )}
                          </p>
                        </div>
                      );
                    },
                  )
                )}
              </div>
            </div>
          </div>

          {/* TIMELINE */}
          <section className="mt-12">
            <div className="mb-8 border-b border-slate-200 pb-4 dark:border-slate-800">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                Timeline Agenda Semester
              </h2>

              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                Daftar kronologis seluruh aktivitas
                akademik Politeknik Negeri Sriwijaya
              </p>
            </div>

            <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">

              {/* GANJIL */}
              {(semesterFilter === "all" ||
                semesterFilter === "ganjil") && (
                <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">

                  <div className="mb-6 flex items-center gap-3 border-b border-slate-100 pb-3 dark:border-slate-800">
                    <div className="h-8 w-3 rounded-full bg-blue-600" />

                    <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                      SEMESTER GANJIL
                    </h3>
                  </div>

                  <div className="relative space-y-8 border-l-2 border-slate-200 pl-6 dark:border-slate-800">
                    {filteredEvents
                      .filter(
                        (e) =>
                          e.semester ===
                          "ganjil",
                      )
                      .map((evt) => {
                        const style =
                          CATEGORY_COLORS[
                            evt.category
                          ];

                        return (
                          <div
                            key={evt.id}
                            onClick={() =>
                              setActiveModalEvent(
                                evt,
                              )
                            }
                            className="group relative cursor-pointer"
                          >
                            <div
                              className={`absolute -left-[31px] top-1.5 h-4 w-4 rounded-full border-2 border-white dark:border-slate-900 ${style.dot} transition-transform group-hover:scale-125`}
                            />

                            <div className="rounded-xl border border-slate-100 bg-slate-50 p-4 transition-all hover:border-slate-300 dark:border-slate-800 dark:bg-slate-800/40">
                              <div className="mb-1 flex items-center justify-between gap-2">
                                <span
                                  className={`rounded px-2 py-0.5 text-[10px] font-bold uppercase ${style.bg} ${style.text}`}
                                >
                                  {evt.category}
                                </span>

                                <span className="text-xs font-semibold text-slate-400">
                                  {formatDateRange(
                                    evt.startDate,
                                    evt.endDate,
                                  )}
                                </span>
                              </div>

                              <h4 className="text-sm font-bold text-slate-800 transition-colors group-hover:text-primary dark:text-slate-100">
                                {evt.title}
                              </h4>

                              {evt.description && (
                                <p className="mt-2 line-clamp-2 text-xs text-slate-500 dark:text-slate-400">
                                  {
                                    evt.description
                                  }
                                </p>
                              )}
                            </div>
                          </div>
                        );
                      })}
                  </div>
                </div>
              )}

              {/* GENAP */}
              {(semesterFilter === "all" ||
                semesterFilter === "genap") && (
                <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">

                  <div className="mb-6 flex items-center gap-3 border-b border-slate-100 pb-3 dark:border-slate-800">
                    <div className="h-8 w-3 rounded-full bg-emerald-600" />

                    <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                      SEMESTER GENAP
                    </h3>
                  </div>

                  <div className="relative space-y-8 border-l-2 border-slate-200 pl-6 dark:border-slate-800">
                    {filteredEvents
                      .filter(
                        (e) =>
                          e.semester ===
                          "genap",
                      )
                      .map((evt) => {
                        const style =
                          CATEGORY_COLORS[
                            evt.category
                          ];

                        return (
                          <div
                            key={evt.id}
                            onClick={() =>
                              setActiveModalEvent(
                                evt,
                              )
                            }
                            className="group relative cursor-pointer"
                          >
                            <div
                              className={`absolute -left-[31px] top-1.5 h-4 w-4 rounded-full border-2 border-white dark:border-slate-900 ${style.dot} transition-transform group-hover:scale-125`}
                            />

                            <div className="rounded-xl border border-slate-100 bg-slate-50 p-4 transition-all hover:border-slate-300 dark:border-slate-800 dark:bg-slate-800/40">
                              <div className="mb-1 flex items-center justify-between gap-2">
                                <span
                                  className={`rounded px-2 py-0.5 text-[10px] font-bold uppercase ${style.bg} ${style.text}`}
                                >
                                  {evt.category}
                                </span>

                                <span className="text-xs font-semibold text-slate-400">
                                  {formatDateRange(
                                    evt.startDate,
                                    evt.endDate,
                                  )}
                                </span>
                              </div>

                              <h4 className="text-sm font-bold text-slate-800 transition-colors group-hover:text-primary dark:text-slate-100">
                                {evt.title}
                              </h4>

                              {evt.description && (
                                <p className="mt-2 line-clamp-2 text-xs text-slate-500 dark:text-slate-400">
                                  {
                                    evt.description
                                  }
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

          {/* ============================================================ */}
          {/* MODAL */}
          {/* ============================================================ */}

          {activeModalEvent && (
            <div className="fixed inset-0 z-[150] flex items-center justify-center bg-slate-900/60 p-4 backdrop-blur-sm">
              <div
                className="relative w-full max-w-lg rounded-2xl border border-slate-200 bg-white p-6 shadow-2xl dark:border-slate-800 dark:bg-slate-900"
                role="dialog"
                aria-modal="true"
              >

                <button
                  onClick={() =>
                    setActiveModalEvent(null)
                  }
                  className="absolute right-4 top-4 rounded-lg p-1 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600 dark:hover:bg-slate-800"
                  aria-label="Tutup modal"
                >
                  <X className="h-5 w-5" />
                </button>

                <div className="mb-4">
                  <span
                    className={`mb-3 inline-block rounded-md px-2.5 py-1 text-xs font-extrabold uppercase ${
                      CATEGORY_COLORS[
                        activeModalEvent.category
                      ].bg
                    } ${
                      CATEGORY_COLORS[
                        activeModalEvent.category
                      ].text
                    }`}
                  >
                    {activeModalEvent.category}
                  </span>

                  <h3 className="text-xl font-extrabold text-slate-900 dark:text-white">
                    {activeModalEvent.title}
                  </h3>
                </div>

                <div className="mb-6 space-y-3 rounded-xl border border-slate-100 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-800/50">
                  <div className="flex items-center gap-3 text-sm text-slate-600 dark:text-slate-300">
                    <Clock className="h-4 w-4 shrink-0 text-primary" />

                    <span className="font-medium">
                      {formatDateRange(
                        activeModalEvent.startDate,
                        activeModalEvent.endDate,
                      )}
                    </span>
                  </div>

                  <div className="flex items-center gap-3 text-sm text-slate-600 dark:text-slate-300">
                    <Tag className="h-4 w-4 shrink-0 text-primary" />

                    <span className="font-medium capitalize">
                      Semester{" "}
                      {activeModalEvent.semester}{" "}
                      (
                      {
                        activeModalEvent.academicYear
                      }
                      )
                    </span>
                  </div>
                </div>

                {activeModalEvent.description && (
                  <div className="mb-6">
                    <h4 className="mb-2 text-xs font-bold uppercase tracking-wider text-slate-400">
                      Deskripsi Kegiatan
                    </h4>

                    <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                      {
                        activeModalEvent.description
                      }
                    </p>
                  </div>
                )}

                <div className="flex justify-end">
                  <button
                    onClick={() =>
                      setActiveModalEvent(null)
                    }
                    className="rounded-xl bg-slate-100 px-5 py-2.5 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-200"
                  >
                    CLOSE ×
                  </button>
                </div>
              </div>
            </div>
          )}

        </div>

        {/* ============================================================ */}
        {/* FOOTER */}
        {/* ============================================================ */}

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
                    <h2 className="font-bold">
                      Kabinet Kilau Gemilang
                    </h2>

                    <p className="mt-1 text-xs text-slate-400">
                      BEM Politeknik Negeri Sriwijaya
                    </p>
                  </div>
                </div>

                <p className="mt-6 max-w-xs text-sm leading-7 text-slate-400">
                  Menjadi wadah yang aktif, responsif,
                  dan konstruktif untuk Politeknik
                  Negeri Sriwijaya yang lebih
                  berdampak.
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
                    className="rounded-md transition-all duration-200 hover:text-white"
                  >
                    Tentang Kami
                  </Link>

                  <Link
                    to="/#agenda"
                    className="rounded-md transition-all duration-200 hover:text-white"
                  >
                    Agenda Kegiatan
                  </Link>

                  <Link
                    to="/calendar"
                    className="rounded-md transition-all duration-200 hover:text-white"
                  >
                    Academic Calendar
                  </Link>

                  <Link
                    to="/contact"
                    className="rounded-md transition-all duration-200 hover:text-white"
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
                  <Mail
                    size={16}
                    className="mt-1 shrink-0 text-amber-400"
                  />
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
                    href="https://www.instagram.com/bempolsri_/"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Instagram"
                    className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-800 text-slate-300 transition-all duration-200 hover:bg-amber-500 hover:text-white"
                  >
                    <Instagram size={16} />
                  </a>

                  {/* X */}
                  <a
                    href="https://x.com/polsrimenfess"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="X Twitter"
                    className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-800 text-slate-300 transition-all duration-200 hover:bg-amber-500 hover:text-white"
                  >
                    𝕏
                  </a>

                  {/* YOUTUBE */}
                  <a
                    href="https://www.youtube.com/@bemkmpolsri3259"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="YouTube"
                    className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-800 text-slate-300 transition-all duration-200 hover:bg-amber-500 hover:text-white"
                  >
                    <Youtube size={17} />
                  </a>

                </div>
              </div>
            </div>

            {/* COPYRIGHT */}
            <div className="mt-14 border-t border-white/10 pt-6 text-xs text-slate-500">
              <p>
                © BEM Politeknik Negeri Sriwijaya.
                All rights reserved.
              </p>
            </div>

          </div>
        </footer>

      </div>
    </main>
  );
};

export default AcademicCalendar;