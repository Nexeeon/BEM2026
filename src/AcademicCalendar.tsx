import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Menu,
  X,
  Calendar as CalendarIcon,
  Search,
  Filter,
  CheckCircle2,
  Clock,
} from "lucide-react";

type DropdownName = "academic" | "echo" | null;

interface CalendarEvent {
  id: string;
  day: string;
  dayNum?: number;
  title: string;
  type: "Akademik" | "Kemahasiswaan" | "Ujian" | "Libur";
  color: string;
  semester: "Ganjil" | "Genap";
}

interface CalendarMonthData {
  year: number;
  monthIndex: number;
  monthName: string;
  firstDayOffset: number; // 0: Min, 1: Sen, 2: Sel, dst.
  daysInMonth: number;
  events: CalendarEvent[];
}

// Data Kalender Lengkap berdasarkan Dokumen Resmi Polsri TA 2026/2027
const academicCalendarData: CalendarMonthData[] = [
  {
    year: 2026,
    monthIndex: 8,
    monthName: "September 2026",
    firstDayOffset: 2,
    daysInMonth: 30,
    events: [
      {
        id: "g-13",
        day: "7 Sep 2026",
        dayNum: 7,
        title: "Awal Kegiatan SMT. Ganjil TA. 2026/2027",
        type: "Akademik",
        color: "bg-amber-500",
        semester: "Ganjil",
      },
      {
        id: "g-8",
        day: "21 - 25 Sep 2026",
        dayNum: 21,
        title: "Audit Mutu Internal (AMI)",
        type: "Akademik",
        color: "bg-slate-700 text-white",
        semester: "Ganjil",
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
        id: "g-9",
        day: "19 - 21 Okt 2026",
        dayNum: 19,
        title: "Ujian LA/Skripsi Susulan (3 bln)",
        type: "Ujian",
        color: "bg-red-500 text-white",
        semester: "Ganjil",
      },
      {
        id: "g-15",
        day: "26 - 31 Okt 2026",
        dayNum: 26,
        title: "Ujian Tengah Semester (UTS) SMT. Ganjil",
        type: "Ujian",
        color: "bg-orange-500 text-white",
        semester: "Ganjil",
      },
      {
        id: "g-10",
        day: "27 Okt 2026",
        dayNum: 27,
        title: "Yudisium Susulan",
        type: "Akademik",
        color: "bg-slate-800 text-white",
        semester: "Ganjil",
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
        id: "g-16",
        day: "2 - 7 Nov 2026",
        dayNum: 2,
        title: "Input Nilai UTS di SISAK",
        type: "Akademik",
        color: "bg-yellow-500 text-slate-900",
        semester: "Ganjil",
      },
      {
        id: "g-11",
        day: "7 Nov 2026",
        dayNum: 7,
        title: "Wisuda ke-42 Susulan",
        type: "Kemahasiswaan",
        color: "bg-amber-600 text-white",
        semester: "Ganjil",
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
        id: "g-12",
        day: "25 Des 2026",
        dayNum: 25,
        title: "Libur Akhir Tahun 2026",
        type: "Libur",
        color: "bg-rose-600 text-white",
        semester: "Ganjil",
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
        id: "g-14",
        day: "9 Jan 2027",
        dayNum: 9,
        title: "Akhir Kegiatan Pembelajaran SMT. Ganjil 2026-2027",
        type: "Akademik",
        color: "bg-amber-600 text-white",
        semester: "Ganjil",
      },
      {
        id: "g-17",
        day: "11 - 16 Jan 2027",
        dayNum: 11,
        title: "Ujian Akhir Semester (UAS) Ganjil TA. 2026/2027",
        type: "Ujian",
        color: "bg-red-600 text-white",
        semester: "Ganjil",
      },
      {
        id: "g-18",
        day: "12 - 23 Jan 2027",
        dayNum: 12,
        title: "Input Nilai UAS di SISAK",
        type: "Akademik",
        color: "bg-yellow-500 text-slate-900",
        semester: "Ganjil",
      },
      {
        id: "g-19",
        day: "18 - 23 Jan 2027",
        dayNum: 18,
        title: "Seminar Laporan KP",
        type: "Akademik",
        color: "bg-slate-700 text-white",
        semester: "Ganjil",
      },
      {
        id: "g-20",
        day: "25 - 27 Jan 2027",
        dayNum: 25,
        title: "Pra Yudisium Semester Ganjil 2026/2027",
        type: "Akademik",
        color: "bg-slate-800 text-white",
        semester: "Ganjil",
      },
      {
        id: "g-21",
        day: "29 Jan 2027",
        dayNum: 29,
        title: "Yudisium Semester Ganjil TA. 2026/2027",
        type: "Akademik",
        color: "bg-amber-500 text-slate-900",
        semester: "Ganjil",
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
        id: "g-22",
        day: "1 - 12 Feb 2027",
        dayNum: 1,
        title: "Libur Semester Ganjil TA. 2026/2027",
        type: "Libur",
        color: "bg-rose-500 text-white",
        semester: "Ganjil",
      },
      {
        id: "gn-1",
        day: "1 - 12 Feb 2027",
        dayNum: 1,
        title: "Daftar Ulang SMT. Genap TA. 2026/2027",
        type: "Akademik",
        color: "bg-blue-600 text-white",
        semester: "Genap",
      },
      {
        id: "gn-2",
        day: "15 Feb 2027",
        dayNum: 15,
        title: "Awal Kegiatan Pembelajaran SMT. Genap TA. 2026/2027",
        type: "Akademik",
        color: "bg-teal-600 text-white",
        semester: "Genap",
      },
      {
        id: "gn-3",
        day: "15 Feb - 19 Jun 2027",
        dayNum: 15,
        title: "Semester Genap TA. 2026/2027 Pagi, KJP1, dan KJP2",
        type: "Akademik",
        color: "bg-sky-600 text-white",
        semester: "Genap",
      },
      {
        id: "gn-4",
        day: "Feb - Jul 2027",
        title: "Pelaksanaan Kegiatan Magang Mahasiswa",
        type: "Kemahasiswaan",
        color: "bg-indigo-600 text-white",
        semester: "Genap",
      },
      {
        id: "gn-5",
        day: "22 - 26 Feb 2027",
        dayNum: 22,
        title: "Pelaporan Data PDDikti (Evaluasi & Rencana Belajar)",
        type: "Akademik",
        color: "bg-slate-700 text-white",
        semester: "Genap",
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
        id: "gn-7",
        day: "10 - 11 Mar 2027",
        dayNum: 10,
        title: "Libur Hari Raya Idul Fitri TA. 2026/2027",
        type: "Libur",
        color: "bg-rose-500 text-white",
        semester: "Genap",
      },
      {
        id: "gn-6",
        day: "Maret - Juli 2027",
        title: "Pendaftaran Ulang Mhs. Baru TA. 2027/2028",
        type: "Akademik",
        color: "bg-amber-600 text-white",
        semester: "Genap",
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
        id: "gn-8",
        day: "12 - 17 Apr 2027",
        dayNum: 12,
        title: "Ujian Tengah Semester (UTS) TA. 2026/2027",
        type: "Ujian",
        color: "bg-orange-500 text-white",
        semester: "Genap",
      },
      {
        id: "gn-9",
        day: "19 - 23 Apr 2027",
        dayNum: 19,
        title: "Input Nilai UTS di SISAK",
        type: "Akademik",
        color: "bg-yellow-500 text-slate-900",
        semester: "Genap",
      },
    ],
  },
  {
    year: 2027,
    monthIndex: 4,
    monthName: "Mei 2027",
    firstDayOffset: 6,
    daysInMonth: 31,
    events: [],
  },
  {
    year: 2027,
    monthIndex: 5,
    monthName: "Juni 2027",
    firstDayOffset: 2,
    daysInMonth: 30,
    events: [
      {
        id: "gn-10",
        day: "19 Jun 2027",
        dayNum: 19,
        title: "Akhir Kegiatan Pembelajaran SMT. Genap TA. 2026/2027",
        type: "Akademik",
        color: "bg-teal-600 text-white",
        semester: "Genap",
      },
      {
        id: "gn-11",
        day: "21 - 26 Jun 2027",
        dayNum: 21,
        title: "Ujian Akhir Semester (UAS) Genap TA. 2026/2027",
        type: "Ujian",
        color: "bg-red-600 text-white",
        semester: "Genap",
      },
      {
        id: "gn-12",
        day: "28 Jun - 3 Jul 2027",
        dayNum: 28,
        title: "Ujian Lap. Akhir / Tugas Akhir TA. 2026/2027",
        type: "Ujian",
        color: "bg-purple-600 text-white",
        semester: "Genap",
      },
    ],
  },
  {
    year: 2027,
    monthIndex: 6,
    monthName: "Juli 2027",
    firstDayOffset: 4,
    daysInMonth: 31,
    events: [
      {
        id: "gn-13",
        day: "5 - 9 Jul 2027",
        dayNum: 5,
        title: "Pra Yudisium Semester Genap",
        type: "Akademik",
        color: "bg-slate-700 text-white",
        semester: "Genap",
      },
      {
        id: "gn-14",
        day: "12 - 17 Jul 2027",
        dayNum: 12,
        title: "Seminar MBKM",
        type: "Kemahasiswaan",
        color: "bg-indigo-600 text-white",
        semester: "Genap",
      },
      {
        id: "gn-16",
        day: "23 Jul 2027",
        dayNum: 23,
        title: "Yudisium Semester Genap TA. 2026/2027",
        type: "Akademik",
        color: "bg-amber-500 text-slate-900",
        semester: "Genap",
      },
      {
        id: "gn-17",
        day: "26 - 30 Jul 2027",
        dayNum: 26,
        title: "Pra Pengajuan PISN (Penomoran Ijazah & Sertifikat Profesi)",
        type: "Akademik",
        color: "bg-slate-800 text-white",
        semester: "Genap",
      },
      {
        id: "gn-15a",
        day: "26 - 31 Jul 2027",
        dayNum: 26,
        title: "Diksarlin TA. 27/28 Gelombang 1",
        type: "Kemahasiswaan",
        color: "bg-blue-600 text-white",
        semester: "Genap",
      },
      {
        id: "gn-18",
        day: "26 Jul - 31 Ags 2027",
        dayNum: 26,
        title: "Libur Semester Genap TA. 2026/2027",
        type: "Libur",
        color: "bg-rose-500 text-white",
        semester: "Genap",
      },
      {
        id: "gn-19",
        day: "26 Jul - 31 Ags 2027",
        dayNum: 26,
        title: "Daftar Ulang SMT. Ganjil TA. 2026/2027",
        type: "Akademik",
        color: "bg-teal-600 text-white",
        semester: "Genap",
      },
    ],
  },
  {
    year: 2027,
    monthIndex: 7,
    monthName: "Agustus 2027",
    firstDayOffset: 0,
    daysInMonth: 31,
    events: [
      {
        id: "gn-15b",
        day: "2 - 7 Ags 2027",
        dayNum: 2,
        title: "Diksarlin TA. 27/28 Gelombang 2",
        type: "Kemahasiswaan",
        color: "bg-blue-600 text-white",
        semester: "Genap",
      },
      {
        id: "gn-15c",
        day: "9 - 12 Ags 2027",
        dayNum: 9,
        title: "SISDIKTI TA. 27/28",
        type: "Kemahasiswaan",
        color: "bg-indigo-600 text-white",
        semester: "Genap",
      },
      {
        id: "gn-20",
        day: "20 - 21 Ags 2027",
        dayNum: 20,
        title: "Wisuda ke-43",
        type: "Kemahasiswaan",
        color: "bg-amber-600 text-white",
        semester: "Genap",
      },
    ],
  },
  {
    year: 2027,
    monthIndex: 8,
    monthName: "September 2027",
    firstDayOffset: 3,
    daysInMonth: 30,
    events: [
      {
        id: "gn-21",
        day: "6 Sep 2027",
        dayNum: 6,
        title: "Awal Kegiatan SMT. Ganjil TA. 2027/2028",
        type: "Akademik",
        color: "bg-teal-600 text-white",
        semester: "Genap",
      },
      {
        id: "gn-22",
        day: "20 - 24 Sep 2027",
        dayNum: 20,
        title: "Audit Mutu Internal (AMI)",
        type: "Akademik",
        color: "bg-slate-700 text-white",
        semester: "Genap",
      },
    ],
  },
];

// Daftar Agenda Lengkap Semester Ganjil (dari gambar Keterangan)
const ganjilFullList = [
  {
    no: "1",
    title: "Libur Hari Raya Idul Fitri TA. 2025/2026",
    date: "20 - 21 Maret 2026",
  },
  {
    no: "2",
    title: "Pendaftar Ulang Mhs. Baru 2025/2026",
    date: "Maret - Juli 2026",
  },
  { no: "3a", title: "Diksarlin Gelombang 1", date: "27 Juli - 1 Ags. 2026" },
  { no: "3b", title: "Diksarlin Gelombang 2", date: "3 - 8 Agustus 2026" },
  { no: "3c", title: "SISDIKTI", date: "10 - 13 Agustus 2026" },
  {
    no: "4",
    title: "Yudisium Semester Genap TA. 2025/2026",
    date: "24 Juli 2026",
  },
  {
    no: "5",
    title: "Libur Semester Genap TA. 2025/2026",
    date: "27 Juli - 31 Ags. 2026",
  },
  {
    no: "6",
    title: "Daftar Ulang SMT. Ganjil TA. 2025/2026",
    date: "27 Juli - 31 Ags. 2026",
  },
  { no: "7", title: "Wisuda ke-42", date: "22 - 23 Agustus 2026" },
  {
    no: "8",
    title: "Audit Mutu Internal (AMI)",
    date: "21 - 25 September 2026",
  },
  {
    no: "9",
    title: "Ujian LA/Skripsi Susulan (3 bln)",
    date: "19 - 21 Oktober 2026",
  },
  { no: "10", title: "Yudisium Susulan", date: "27 Oktober 2026" },
  { no: "11", title: "Wisuda ke-42 Susulan", date: "7 November 2026" },
  { no: "12", title: "Libur Akhir Tahun 2026", date: "25 Desember 2026" },
  {
    no: "13",
    title: "Awal Kegiatan SMT. Ganjil TA. 2026/2027",
    date: "Senin, 7 September 2026",
  },
  {
    no: "14",
    title: "Akhir Kegiatan Pembelajaran 2026-2027",
    date: "Sabtu, 9 Januari 2027",
  },
  {
    no: "15",
    title: "Ujian Tengah Semester TA. 2026/2027",
    date: "26 - 31 Okt 2026",
  },
  { no: "16", title: "Input Nilai UTS di SISAK", date: "2 - 7 November 2026" },
  {
    no: "17",
    title: "Ujian Akhir Semester Ganjil TA. 2026/2027",
    date: "11 - 16 Januari 2027",
  },
  { no: "18", title: "Input Nilai UAS di SISAK", date: "12 - 23 Januari 2027" },
  { no: "19", title: "Seminar Laporan KP", date: "18 - 23 Januari 2027" },
  {
    no: "20",
    title: "Pra Yudisium Semester Ganjil 2026/2027",
    date: "25 - 27 Januari 2027",
  },
  {
    no: "21",
    title: "Yudisium Semester Ganjil TA. 2026/2027",
    date: "Jumat, 29 Januari 2027",
  },
  {
    no: "22",
    title: "Libur Semester Ganjil TA. 2026/2027",
    date: "1 - 12 Februari 2027",
  },
];

// Daftar Agenda Lengkap Semester Genap (dari gambar Keterangan)
const genapFullList = [
  {
    no: "1",
    title: "Daftar Ulang SMT. Genap TA. 2026/2027",
    date: "1 - 12 Feb. 2027",
  },
  {
    no: "2",
    title: "Awal Kegiatan Pembelajaran SMT. Genap TA. 2026/2027",
    date: "Senin, 15 Februari 2027",
  },
  {
    no: "3",
    title: "Semester Genap TA. 2026/2027 Pagi, KJP1, dan KJP2",
    date: "15 Feb. - 19 Juni 2027",
  },
  {
    no: "4",
    title: "Pelaksanaan Kegiatan Magang Mahasiswa",
    date: "Februari - Juli 2027",
  },
  {
    no: "5a",
    title: "Pelaporan PDDikti: Evaluasi Hasil Belajar 20261",
    date: "22 - 26 Februari 2027",
  },
  {
    no: "5b",
    title: "Pelaporan PDDikti: Penyusunan Rencana Belajar 20262",
    date: "22 - 26 Februari 2027",
  },
  {
    no: "6",
    title: "Pendaftaran Ulang Mhs. Baru TA. 2027/2028",
    date: "Maret - Juli 2027",
  },
  {
    no: "7",
    title: "Libur Hari Raya Idul Fitri TA. 2026/2027",
    date: "10 - 11 Maret 2027",
  },
  {
    no: "8",
    title: "Ujian Tengah Semester (UTS) TA. 2026/2027",
    date: "12 - 17 April 2027",
  },
  { no: "9", title: "Input Nilai UTS di SISAK", date: "19 - 23 April 2027" },
  {
    no: "10",
    title: "Akhir Kegiatan Pembelajaran SMT. Genap TA. 2026/2027",
    date: "Sabtu, 19 Juni 2027",
  },
  {
    no: "11",
    title: "Ujian Akhir Semester (UAS) Genap TA. 2026/2027",
    date: "21 - 26 Juni 2027",
  },
  {
    no: "12",
    title: "Ujian Lap. Akhir / Tugas Akhir TA. 2026/2027",
    date: "28 Juni - 3 Juli 2027",
  },
  { no: "13", title: "Pra Yudisium", date: "5 - 9 Juli 2027" },
  { no: "14", title: "Seminar MBKM", date: "12 - 17 Juli 2027" },
  {
    no: "15a",
    title: "Diksarlin TA. 27/28 Gelombang 1",
    date: "26 - 31 Juli 2027",
  },
  {
    no: "15b",
    title: "Diksarlin TA. 27/28 Gelombang 2",
    date: "2 - 7 Agustus 2027",
  },
  { no: "15c", title: "SISDIKTI TA. 27/28", date: "9 - 12 Agustus 2027" },
  {
    no: "16",
    title: "Yudisium Semester Genap TA. 2026/2027",
    date: "23 Juli 2027",
  },
  {
    no: "17",
    title: "Pra Pengajuan PISN (Ijazah & Sertifikat Profesi)",
    date: "26 - 30 Juli 2027",
  },
  {
    no: "18",
    title: "Libur Semester Genap TA. 2026/2027",
    date: "26 Juli - 31 Ags. 2027",
  },
  {
    no: "19",
    title: "Daftar Ulang SMT. Ganjil TA. 2026/2027",
    date: "26 Juli - 31 Ags. 2027",
  },
  { no: "20", title: "Wisuda ke-43", date: "20 - 21 Agustus 2027" },
  {
    no: "21",
    title: "Awal Kegiatan SMT. Ganjil TA. 2027/2028",
    date: "Senin, 6 Sep. 2027",
  },
  { no: "22", title: "Audit Mutu Internal (AMI)", date: "20 - 24 Sep. 2027" },
];

export default function AcademicCalendarPage() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<DropdownName>(null);
  const [currentMonthIdx, setCurrentMonthIdx] = useState(0);
  const [scrolled, setScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState<string>("Semua");
  const [selectedSemester, setSelectedSemester] = useState<"Ganjil" | "Genap">(
    "Ganjil",
  );

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
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
    if (currentMonthIdx > 0) setCurrentMonthIdx(currentMonthIdx - 1);
  };

  const handleNextMonth = () => {
    if (currentMonthIdx < academicCalendarData.length - 1)
      setCurrentMonthIdx(currentMonthIdx + 1);
  };

  const filteredEvents = activeMonth.events.filter((event) => {
    const matchesSearch = event.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesType = selectedType === "Semua" || event.type === selectedType;
    return matchesSearch && matchesType;
  });

  const fullListToShow =
    selectedSemester === "Ganjil" ? ganjilFullList : genapFullList;

  const filteredFullList = fullListToShow.filter(
    (item) =>
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.date.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <main className="relative min-h-screen overflow-x-clip bg-[url('/images/bgweb.jpeg')] bg-cover bg-fixed bg-center bg-no-repeat pt-[72px] text-slate-900 scroll-smooth">
      <div className="min-h-screen bg-white/70">
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
                  className="rounded-lg px-3.5 py-2 text-sm font-medium text-slate-600 outline-none transition-all hover:bg-white/55 hover:text-amber-600"
                  onClick={closeMenus}
                >
                  Home
                </Link>

                <a
                  href="/about"
                  className="rounded-lg px-3.5 py-2 text-sm font-medium text-slate-600 outline-none transition-all hover:bg-white/55 hover:text-amber-600"
                  onClick={closeMenus}
                >
                  About
                </a>

                <div className="relative">
                  <button
                    type="button"
                    onClick={() => toggleDropdown("academic")}
                    className={`flex items-center gap-1 rounded-lg px-3.5 py-2 text-sm font-medium outline-none transition-all ${
                      openDropdown === "academic"
                        ? "bg-white/60 text-amber-700"
                        : "text-amber-600 hover:bg-white/55"
                    }`}
                  >
                    Academic Information
                    <ChevronDown
                      size={14}
                      className={`transition-transform ${
                        openDropdown === "academic" ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {openDropdown === "academic" && (
                    <div className="absolute left-0 top-full mt-2 w-60 overflow-hidden rounded-xl border border-slate-200/70 bg-white/95 p-1.5 shadow-xl backdrop-blur-xl">
                      <Link
                        to="/calendar"
                        className="block rounded-lg bg-amber-50 px-3 py-2.5 text-xs font-semibold text-amber-700"
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

                      <a
                        href="/#agenda"
                        className="block rounded-lg px-3 py-2.5 text-xs font-semibold text-slate-600 hover:bg-amber-50 hover:text-amber-700"
                        onClick={closeMenus}
                      >
                        Organisasi Mahasiswa
                      </a>

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

                <div className="relative">
                  <button
                    type="button"
                    onClick={() => toggleDropdown("echo")}
                    className={`flex items-center gap-1 rounded-lg px-3.5 py-2 text-sm font-medium outline-none transition-all ${
                      openDropdown === "echo"
                        ? "bg-white/60 text-amber-700"
                        : "text-slate-600 hover:bg-white/55 hover:text-amber-600"
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
                  className="ml-1 rounded-lg px-3.5 py-2 text-sm font-medium text-slate-600 hover:bg-white/50 hover:text-amber-600"
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

        {/* CONTENT */}
        <section className="relative px-5 py-10 lg:px-8 lg:py-14">
          <div className="mx-auto max-w-7xl">
            {/* TITLE HEADER */}
            <div className="mx-auto max-w-3xl text-center">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-100/90 px-4 py-1.5 text-[10px] font-black uppercase tracking-[0.16em] text-amber-800 backdrop-blur-sm">
                <CalendarIcon size={13} />
                Politeknik Negeri Sriwijaya
              </span>

              <h1
                className="mt-3 font-serif font-black uppercase tracking-wide text-amber-500 drop-shadow-sm"
                style={{ fontSize: "clamp(2.2rem, 4.5vw, 3.8rem)" }}
              >
                ACADEMIC CALENDAR
              </h1>

              <p className="mx-auto mt-2 text-xs font-bold uppercase tracking-widest text-slate-600 sm:text-sm">
                TAHUN AKADEMIK 2026 / 2027
              </p>
            </div>

            {/* CONTROLS (SEARCH & FILTER) */}
            <div className="mt-8 flex flex-col gap-4 rounded-2xl border border-white/80 bg-white/60 p-4 shadow-sm backdrop-blur-md sm:flex-row sm:items-center sm:justify-between">
              <div className="relative flex-1">
                <Search
                  size={18}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                />
                <input
                  type="text"
                  placeholder="Cari agenda, ujian, yudisium, atau libur..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full rounded-xl border border-slate-200/80 bg-white/90 py-2.5 pl-10 pr-4 text-xs font-medium text-slate-800 outline-none transition-all placeholder:text-slate-400 focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20"
                />
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <Filter size={15} className="text-slate-500" />
                {["Semua", "Akademik", "Ujian", "Kemahasiswaan", "Libur"].map(
                  (type) => (
                    <button
                      key={type}
                      type="button"
                      onClick={() => setSelectedType(type)}
                      className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition-all ${
                        selectedType === type
                          ? "bg-amber-500 text-white shadow-sm"
                          : "bg-white/80 text-slate-600 hover:bg-amber-50 hover:text-amber-700"
                      }`}
                    >
                      {type}
                    </button>
                  ),
                )}
              </div>
            </div>

            {/* MONTHLY CALENDAR GRID & MONTH DETAILED EVENT */}
            <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_1.1fr]">
              {/* CALENDAR GRID */}
              <div className="rounded-3xl border border-white/80 bg-white/95 p-6 shadow-xl backdrop-blur-md sm:p-8">
                <div className="flex items-center justify-between">
                  <button
                    type="button"
                    onClick={handlePrevMonth}
                    disabled={currentMonthIdx === 0}
                    className="rounded-full p-2 text-slate-500 transition-all hover:bg-amber-50 hover:text-amber-600 disabled:opacity-30"
                  >
                    <ChevronLeft size={22} />
                  </button>

                  <div className="text-center">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-amber-600">
                      Kalender Akademik Polsri
                    </p>
                    <h2 className="mt-0.5 text-xl font-black text-slate-900 sm:text-2xl">
                      {activeMonth.monthName}
                    </h2>
                  </div>

                  <button
                    type="button"
                    onClick={handleNextMonth}
                    disabled={
                      currentMonthIdx === academicCalendarData.length - 1
                    }
                    className="rounded-full p-2 text-slate-500 transition-all hover:bg-amber-50 hover:text-amber-600 disabled:opacity-30"
                  >
                    <ChevronRight size={22} />
                  </button>
                </div>

                {/* DAYS OF WEEK */}
                <div className="mt-6 grid grid-cols-7 gap-1 text-center text-[10px] font-bold text-slate-400 sm:gap-2 sm:text-xs">
                  {["MIN", "SEN", "SEL", "RAB", "KAM", "JUM", "SAB"].map(
                    (day) => (
                      <span key={day} className="py-1">
                        {day}
                      </span>
                    ),
                  )}

                  {Array.from(
                    { length: activeMonth.firstDayOffset },
                    (_, i) => (
                      <div key={`empty-${i}`} className="aspect-square" />
                    ),
                  )}

                  {Array.from(
                    { length: activeMonth.daysInMonth },
                    (_, index) => {
                      const dayNumber = index + 1;
                      const eventMatch = activeMonth.events.find(
                        (e) => e.dayNum === dayNumber,
                      );

                      return (
                        <div
                          key={dayNumber}
                          className={`flex aspect-square items-center justify-center rounded-xl text-xs font-bold transition-all ${
                            eventMatch
                              ? "bg-amber-500 text-white shadow-md shadow-amber-500/30"
                              : "text-slate-700 hover:bg-amber-50 hover:text-amber-700"
                          }`}
                        >
                          {dayNumber}
                        </div>
                      );
                    },
                  )}
                </div>

                <div className="mt-8 flex flex-wrap items-center justify-center gap-4 border-t border-slate-100 pt-4 text-xs font-semibold text-slate-500">
                  <span className="flex items-center gap-1.5">
                    <span className="h-3 w-3 rounded-full bg-amber-500" />
                    Tanggal Agenda/Event
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="h-3 w-3 rounded-full bg-slate-200" />
                    Hari Kuliah Regular
                  </span>
                </div>
              </div>

              {/* MONTH EVENTS SUMMARY */}
              <div className="flex flex-col justify-between rounded-3xl bg-slate-900/95 p-6 text-white shadow-2xl backdrop-blur-md sm:p-8">
                <div>
                  <div className="flex items-center justify-between border-b border-white/10 pb-5">
                    <div>
                      <p className="text-xs font-bold uppercase tracking-widest text-amber-400">
                        Agenda Bulan Ini
                      </p>
                      <h3 className="mt-1 text-2xl font-bold">
                        {activeMonth.monthName}
                      </h3>
                    </div>
                    <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-bold text-amber-300">
                      {filteredEvents.length} Kegiatan
                    </span>
                  </div>

                  <div className="mt-6 space-y-3.5">
                    {filteredEvents.length > 0 ? (
                      filteredEvents.map((event) => (
                        <div
                          key={event.id}
                          className="flex items-start gap-3.5 rounded-2xl border border-white/10 bg-white/5 p-3.5 transition-all hover:bg-white/10"
                        >
                          <div
                            className={`flex min-w-[70px] shrink-0 flex-col items-center justify-center rounded-xl px-2 py-2 text-center font-bold ${event.color}`}
                          >
                            <span className="text-xs font-black leading-tight">
                              {event.day}
                            </span>
                          </div>

                          <div className="min-w-0 flex-1">
                            <span className="inline-block rounded bg-white/10 px-2 py-0.5 text-[9px] font-semibold tracking-wide text-amber-300">
                              {event.type} • Semester {event.semester}
                            </span>
                            <h4 className="mt-1 text-sm font-semibold text-white leading-snug">
                              {event.title}
                            </h4>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="rounded-2xl border border-dashed border-white/15 p-10 text-center text-xs text-slate-400">
                        Tidak ada agenda khusus pada bulan ini.
                      </div>
                    )}
                  </div>
                </div>

                <div className="mt-6 border-t border-white/10 pt-4 text-[11px] text-slate-400">
                  * Klik tombol navigasi bulan di samping untuk melihat jadwal
                  perkuliahan bulan lainnya.
                </div>
              </div>
            </div>

            {/* FULL TABULAR KETERANGAN (SEMESTER GANJIL & GENAP) */}
            <div className="mt-14 rounded-3xl border border-white/80 bg-white/90 p-6 shadow-xl backdrop-blur-md sm:p-10">
              <div className="flex flex-col gap-4 border-b border-slate-200 pb-6 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <span className="text-[10px] font-black uppercase tracking-widest text-amber-600">
                    Daftar Keterangan Lengkap
                  </span>
                  <h2 className="mt-1 text-2xl font-black text-slate-900 sm:text-3xl">
                    Agenda Akademik Polsri 2026/2027
                  </h2>
                </div>

                {/* SEMESTER TOGGLE BUTTONS */}
                <div className="inline-flex rounded-xl bg-slate-100 p-1">
                  <button
                    type="button"
                    onClick={() => setSelectedSemester("Ganjil")}
                    className={`rounded-lg px-5 py-2 text-xs font-bold transition-all ${
                      selectedSemester === "Ganjil"
                        ? "bg-amber-500 text-white shadow-md"
                        : "text-slate-600 hover:text-slate-900"
                    }`}
                  >
                    Semester Ganjil
                  </button>
                  <button
                    type="button"
                    onClick={() => setSelectedSemester("Genap")}
                    className={`rounded-lg px-5 py-2 text-xs font-bold transition-all ${
                      selectedSemester === "Genap"
                        ? "bg-amber-500 text-white shadow-md"
                        : "text-slate-600 hover:text-slate-900"
                    }`}
                  >
                    Semester Genap
                  </button>
                </div>
              </div>

              {/* LIST ITEMS TABLE */}
              <div className="mt-6 overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-slate-200 text-[11px] font-bold uppercase tracking-wider text-slate-400">
                      <th className="py-3 px-3 w-12 text-center">No</th>
                      <th className="py-3 px-4">Nama Kegiatan / Agenda</th>
                      <th className="py-3 px-4 text-right sm:text-left">
                        Tanggal / Waktu Pelaksanaan
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-xs sm:text-sm font-medium text-slate-800">
                    {filteredFullList.length > 0 ? (
                      filteredFullList.map((item, idx) => (
                        <tr
                          key={idx}
                          className="transition-colors hover:bg-amber-50/60"
                        >
                          <td className="py-3.5 px-3 text-center font-bold text-amber-600">
                            {item.no}
                          </td>
                          <td className="py-3.5 px-4 font-semibold text-slate-900">
                            {item.title}
                          </td>
                          <td className="py-3.5 px-4 text-right sm:text-left text-slate-600 font-semibold">
                            <span className="inline-flex items-center gap-1.5 rounded-md bg-slate-100 px-2.5 py-1 text-xs text-slate-700">
                              <Clock size={12} className="text-amber-600" />
                              {item.date}
                            </span>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td
                          colSpan={3}
                          className="py-8 text-center text-xs text-slate-400"
                        >
                          Tidak ditemukan agenda yang sesuai.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
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
                  <a href="/#visi" className="hover:text-white transition-all">
                    Tentang Kami
                  </a>
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
                <h3 className="text-xs font-black uppercase tracking-widest text-amber-400">
                  Mari Terhubung
                </h3>
                <p className="mt-5 flex items-start gap-2 text-sm leading-6 text-slate-400">
                  <span className="mt-1 shrink-0 text-amber-400">✉</span>
                  bem@polsri.ac.id
                </p>
                <p className="mt-3 text-sm leading-6 text-slate-400">
                  Jl. Srijaya Negara, Bukit Besar,
                  <br />
                  Palembang, Sumatera Selatan
                </p>
              </div>
            </div>

            <div className="mt-14 border-t border-white/10 pt-6 text-xs text-slate-500">
              <p>© BEM Politeknik Negeri Sriwijaya. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </div>
    </main>
  );
}
