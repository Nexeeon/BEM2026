import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  ChevronDown,
  Instagram,
  Mail,
  Menu,
  MessageCircle,
  Scale,
  Shield,
  X,
  Youtube,
} from "lucide-react";

type DropdownName = "academic" | "echo" | null;

// ============================================================
// DATA CARD "MENGAPA BISIK KAMPUS?"
// ============================================================
const whyBisikData = [
  {
    icon: Shield,
    title: "AMAN & TERPERCAYA",
    description:
      "Privasi Anda terjamin. Semua aspirasi dikelola dengan standar keamanan tinggi dan kerahasiaan identitas terjaga.",
  },
  {
    icon: MessageCircle,
    title: "KOMUNIKASI EFEKTIF",
    description:
      "Jembatan komunikasi langsung antara mahasiswa dengan pihak kampus untuk solusi yang tepat sasaran.",
  },
  {
    icon: Scale,
    title: "TINDAK LANJUT CEPAT",
    description:
      "Setiap aspirasi akan ditindaklanjuti dengan proses yang jelas dan transparan untuk perubahan nyata.",
  },
];

// ============================================================
// DATA STATISTIK
// ============================================================
const statsData = [
  { number: "50+", label: "Aspirasi Terkumpul" },
  { number: "99%", label: "Tingkat Respons" },
  { number: "24/7", label: "Selalu Terbuka" },
  { number: "100%", label: "Terjaga Privasi" },
];

// Duplikat untuk efek marquee
const statsMarquee = [...statsData, ...statsData, ...statsData, ...statsData];

// ============================================================
// LINK GOOGLE FORM BISIK KAMPUS
// ============================================================
const FORM_BISIK_KAMPUS =
  "https://docs.google.com/forms/d/e/1FAIpQLSeO0k_4l3ogFWdW6se2G-pEillmx1y70fTA5pn1Q3gkR6rtOQ/viewform";

export default function BisikKampus() {
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

  return (
    <main className="relative min-h-screen overflow-x-clip bg-[url('/images/bgweb.jpeg')] bg-cover bg-fixed bg-center bg-no-repeat pt-[72px] text-slate-900 scroll-smooth">
      <div className="min-h-screen bg-white/65">
        {/* ====================================================== */}
        {/* NAVBAR — TIDAK DIUBAH */}
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

              {/* ================================================== */}
              {/* DESKTOP NAVIGATION */}
              {/* ================================================== */}
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

                {/* ================================================== */}
                {/* ACADEMIC INFORMATION */}
                {/* ================================================== */}
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
                      {/* ACADEMIC CALENDAR */}
                      <Link
                        to="/calendar"
                        className="block rounded-lg px-3 py-2.5 text-xs font-semibold text-slate-600 outline-none transition-all duration-200 ease-out hover:bg-amber-50 hover:text-amber-700 active:scale-[0.99] focus-visible:ring-2 focus-visible:ring-amber-400/50"
                        onClick={closeMenus}
                      >
                        Academic Calendar
                      </Link>

                      {/* SCHOLARSHIP INFO */}
                      <a
                        href="/scholarship-info"
                        className="block rounded-lg px-3 py-2.5 text-xs font-semibold text-slate-600 outline-none transition-all duration-200 ease-out hover:bg-amber-50 hover:text-amber-700 active:scale-[0.99] focus-visible:ring-2 focus-visible:ring-amber-400/50"
                        onClick={closeMenus}
                      >
                        Scholarship Info
                      </a>

                      {/* ORGANISASI MAHASISWA */}
                      <a
                        href="/organisasi-mahasiswa"
                        className="block rounded-lg px-3 py-2.5 text-xs font-semibold text-slate-600 outline-none transition-all duration-200 ease-out hover:bg-amber-50 hover:text-amber-700 active:scale-[0.99] focus-visible:ring-2 focus-visible:ring-amber-400/50"
                        onClick={closeMenus}
                      >
                        Organisasi Mahasiswa
                      </a>

                      {/* MAHASISWA BERDAMPAK */}
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

                {/* ================================================== */}
                {/* CAMPUS ECHO */}
                {/* ================================================== */}
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => toggleDropdown("echo")}
                    className={`flex items-center gap-1 rounded-lg px-3.5 py-2 text-sm font-medium outline-none transition-all duration-200 ease-out active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-amber-400/70 ${
                      openDropdown === "echo"
                        ? "bg-white/60 text-amber-700"
                        : "text-amber-600 hover:bg-white/55 hover:text-amber-700"
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
                        className="block rounded-lg px-3 py-2.5 text-xs font-semibold text-slate-600 outline-none transition-all duration-200 ease-out hover:bg-amber-50 hover:text-amber-700 active:scale-[0.99] focus-visible:ring-2 focus-visible:ring-amber-400/50"
                        onClick={closeMenus}
                      >
                        Kajian
                      </Link>

                      {/* BISIK KAMPUS */}
                      <Link
                        to="/bisik-kampus"
                        className="block rounded-lg bg-amber-50 px-3 py-2.5 text-xs font-semibold text-amber-700 outline-none transition-all duration-200 ease-out active:scale-[0.99] focus-visible:ring-2 focus-visible:ring-amber-400/50"
                        onClick={closeMenus}
                      >
                        Bisik Kampus
                      </Link>

                      {/* POLSRIFESS */}
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

                {/* ================================================== */}
                {/* CONTACT US */}
                {/* ================================================== */}
                <Link
                  to="/contact"
                  className="ml-1 rounded-lg px-3.5 py-2 text-sm font-medium text-slate-600 outline-none transition-all duration-200 ease-out hover:bg-white/50 hover:text-amber-600 active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-amber-400/70"
                  onClick={closeMenus}
                >
                  Contact Us
                </Link>
              </nav>

              {/* ================================================== */}
              {/* MOBILE BUTTON */}
              {/* ================================================== */}
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

            {/* ====================================================== */}
            {/* MOBILE NAVIGATION */}
            {/* ====================================================== */}
            {mobileOpen && (
              <div className="border-t border-slate-200/70 bg-white/95 px-5 py-3 shadow-lg backdrop-blur-xl lg:hidden">
                {/* HOME */}
                <Link
                  to="/"
                  className="block rounded-lg px-3 py-3 text-sm font-medium text-slate-600 outline-none transition-all duration-200 hover:bg-slate-50 hover:text-amber-600 active:scale-[0.99] focus-visible:ring-2 focus-visible:ring-amber-400/50"
                  onClick={closeMenus}
                >
                  Home
                </Link>

                {/* ABOUT */}
                <Link
                  to="/about"
                  className="block rounded-lg px-3 py-3 text-sm font-medium text-slate-600 outline-none transition-all duration-200 hover:bg-slate-50 hover:text-amber-600 active:scale-[0.99] focus-visible:ring-2 focus-visible:ring-amber-400/50"
                  onClick={closeMenus}
                >
                  About
                </Link>

                {/* ================================================== */}
                {/* MOBILE ACADEMIC */}
                {/* ================================================== */}
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
                    {/* ACADEMIC CALENDAR */}
                    <Link
                      to="/calendar"
                      className="block rounded-md px-3 py-2.5 text-sm font-semibold text-slate-600 outline-none transition-all duration-200 hover:bg-white hover:text-amber-700 active:scale-[0.99] focus-visible:ring-2 focus-visible:ring-amber-400/50"
                      onClick={closeMenus}
                    >
                      Academic Calendar
                    </Link>

                    {/* SCHOLARSHIP INFO */}
                    <a
                      href="/#agenda"
                      className="block rounded-md px-3 py-2.5 text-sm text-slate-600 outline-none transition-all duration-200 hover:bg-white hover:text-amber-700 active:scale-[0.99] focus-visible:ring-2 focus-visible:ring-amber-400/50"
                      onClick={closeMenus}
                    >
                      Scholarship Info
                    </a>

                    {/* ORGANISASI MAHASISWA */}
                    <a
                      href="/#agenda"
                      className="block rounded-md px-3 py-2.5 text-sm text-slate-600 outline-none transition-all duration-200 hover:bg-white hover:text-amber-700 active:scale-[0.99] focus-visible:ring-2 focus-visible:ring-amber-400/50"
                      onClick={closeMenus}
                    >
                      Organisasi Mahasiswa
                    </a>

                    {/* MAHASISWA BERDAMPAK */}
                    <a
                      href="/#agenda"
                      className="block rounded-md px-3 py-2.5 text-sm text-slate-600 outline-none transition-all duration-200 hover:bg-white hover:text-amber-700 active:scale-[0.99] focus-visible:ring-2 focus-visible:ring-amber-400/50"
                      onClick={closeMenus}
                    >
                      Mahasiswa Berdampak
                    </a>
                  </div>
                )}

                {/* ================================================== */}
                {/* MOBILE CAMPUS ECHO */}
                {/* ================================================== */}
                <button
                  type="button"
                  className={`mt-1 flex w-full items-center justify-between rounded-lg px-3 py-3 text-sm font-medium outline-none transition-all duration-200 ease-out active:scale-[0.99] focus-visible:ring-2 focus-visible:ring-amber-400/50 ${
                    openDropdown === "echo"
                      ? "bg-amber-50 text-amber-700"
                      : "text-amber-600 hover:bg-slate-50 hover:text-amber-700"
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
                    {/* KAJIAN */}
                    <Link
                      to="/kajian"
                      className="block rounded-md px-3 py-2.5 text-sm text-slate-600 outline-none transition-all duration-200 hover:bg-white hover:text-amber-700 active:scale-[0.99] focus-visible:ring-2 focus-visible:ring-amber-400/50"
                      onClick={closeMenus}
                    >
                      Kajian
                    </Link>

                    {/* BISIK KAMPUS */}
                    <Link
                      to="/bisik-kampus"
                      className="block rounded-md bg-amber-50 px-3 py-2.5 text-sm font-semibold text-amber-700 outline-none transition-all duration-200 active:scale-[0.99] focus-visible:ring-2 focus-visible:ring-amber-400/50"
                      onClick={closeMenus}
                    >
                      Bisik Kampus
                    </Link>

                    {/* POLSRIFESS */}
                    <Link
                      to="/polsrifess"
                      className="block rounded-md px-3 py-2.5 text-sm text-slate-600 outline-none transition-all duration-200 hover:bg-white hover:text-amber-700 active:scale-[0.99] focus-visible:ring-2 focus-visible:ring-amber-400/50"
                      onClick={closeMenus}
                    >
                      Polsrifess
                    </Link>
                  </div>
                )}

                {/* ================================================== */}
                {/* CONTACT */}
                {/* ================================================== */}
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
        {/* HERO SECTION — DIRINGKAS, TEKS OVERLAY DI ATAS GAMBAR */}
        {/* ======================================================== */}
        <section className="relative w-full">
          <div className="relative w-full overflow-hidden bg-slate-100">
            {/* FOTO BISIK KAMPUS — TINGGI DIPERKECIL */}
            <img
              src="/images/Program_kerja/bisik-kampus.png"
              alt="Foto Bisik Kampus"
              className="block h-[360px] w-full object-cover object-center sm:h-[440px] lg:h-[520px]"
            />

            {/* SCRIM GELAP AGAR TEKS TERBACA */}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/75 via-black/30 to-transparent" />

            {/* KONTEN DI ATAS GAMBAR */}
            <div className="absolute inset-x-0 bottom-0">
              <div className="mx-auto max-w-7xl px-5 pb-8 lg:px-8 lg:pb-12">
                <div className="max-w-3xl">
                  {/* BADGE */}
                  

                  {/* DESKRIPSI */}
                  <p className="max-w-2xl text-sm font-medium leading-relaxed text-white/90 sm:text-base">
                    Form Bisik Kampus sebagai wadah untuk menampung, menyalurkan
                    dan menindaklanjuti setiap aspirasi Mahasiswa Politeknik
                    Negeri Sriwijaya. Sebuah platform yang menghubungkan suara
                    mahasiswa dengan pihak yang berwenang untuk menciptakan
                    perubahan positif di lingkungan kampus.
                  </p>

                  {/* TOMBOL AKSI */}
                  <div className="mt-5 sm:mt-6">
                    <a
                      href={FORM_BISIK_KAMPUS}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-full bg-amber-500 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-amber-500/30 outline-none transition-all duration-200 ease-out hover:bg-amber-600 hover:shadow-amber-500/40 active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-amber-400/70"
                    >
                      <MessageCircle size={18} />
                      Isi Form Bisik Kampus
                      <ArrowRight size={18} />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ============================================================ */}
        {/* STATS SECTION — TIDAK DIUBAH */}
        {/* ============================================================ */}
        <section className="relative overflow-hidden bg-gradient-to-r from-amber-400 via-amber-500 to-orange-600 py-14 lg:py-16">
          <style>{`
            @keyframes marquee-smooth {
              from {
                transform: translateX(0);
              }

              to {
                transform: translateX(-25%);
              }
            }

            .animate-marquee-smooth {
              animation: marquee-smooth 25s linear infinite;
            }
          `}</style>

          {/* FADE KIRI */}
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-32 bg-gradient-to-r from-amber-400 via-amber-400/60 to-transparent" />

          {/* FADE KANAN */}
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-32 bg-gradient-to-l from-orange-600 via-orange-600/60 to-transparent" />

          <div className="relative mx-auto max-w-7xl overflow-hidden px-5 lg:px-8">
            <div className="relative flex items-center">
              <div className="flex animate-marquee-smooth items-center gap-16 whitespace-nowrap">
                {statsMarquee.map((stat, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-5 px-2 py-3"
                  >
                    <span
                      className="font-black tracking-tight text-white drop-shadow-sm"
                      style={{
                        fontSize: "clamp(2.6rem, 4.5vw, 4.2rem)",
                      }}
                    >
                      {stat.number}
                    </span>

                    <span className="h-10 w-px bg-white/40" />

                    <span className="text-sm font-semibold uppercase tracking-wider text-white/90 sm:text-base lg:text-lg">
                      {stat.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ======================================================== */}
        {/* MENGAPA BISIK KAMPUS? — TIDAK DIUBAH */}
        {/* ======================================================== */}
        <section className="bg-white/85 px-5 py-20 backdrop-blur-md lg:px-8 lg:py-28">
          <div className="mx-auto max-w-7xl">
            <div className="max-w-2xl">
              <h2 className="text-3xl font-black tracking-tight text-slate-900 sm:text-4xl">
                MENGAPA BISIK KAMPUS?
              </h2>

              <p className="mt-4 max-w-xl text-sm leading-7 text-slate-600">
                Platform terpercaya untuk menyampaikan aspirasi, keluhan, dan
                saran demi kemajuan kampus bersama.
              </p>
            </div>

            <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {whyBisikData.map((item, index) => (
                <article
                  key={index}
                  className="group rounded-3xl border border-slate-200 bg-white/90 p-8 backdrop-blur-sm transition-all duration-300 ease-out hover:-translate-y-1 hover:border-amber-300 hover:shadow-xl hover:shadow-amber-900/5"
                >
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-amber-50 text-amber-600 transition-all duration-300 group-hover:bg-amber-500 group-hover:text-white">
                    <item.icon size={28} />
                  </div>

                  <h3 className="mt-6 text-lg font-black tracking-tight text-slate-900">
                    {item.title}
                  </h3>

                  <p className="mt-3 text-sm leading-7 text-slate-600">
                    {item.description}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ======================================================== */}
        {/* CTA — TIDAK DIUBAH */}
        {/* ======================================================== */}
        <section className="px-5 py-20 lg:px-8 lg:py-28">
          <div className="mx-auto max-w-4xl text-center">
            <div className="rounded-3xl border border-amber-300/40 bg-white/90 p-8 shadow-xl backdrop-blur-md transition-all duration-300 ease-out hover:shadow-2xl sm:p-12">
              <MessageCircle
                size={48}
                className="mx-auto mb-4 text-amber-500"
              />

              <h2 className="text-3xl font-black tracking-tight text-slate-900 sm:text-4xl">
                SUARAKAN ASPIRASIMU SEKARANG!
              </h2>

              <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-slate-600">
                Bergabunglah dengan mahasiswa lainnya yang telah mempercayai
                Bisik Kampus sebagai wadah aspirasi. Setiap suara penting untuk
                kemajuan kampus kita bersama.
              </p>

              <a
                href={FORM_BISIK_KAMPUS}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-8 inline-flex items-center gap-3 rounded-full bg-amber-500 px-10 py-4 text-sm font-bold text-white shadow-lg shadow-amber-500/30 outline-none transition-all duration-200 ease-out hover:bg-amber-600 hover:shadow-amber-500/40 active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-amber-400/70"
              >
                <MessageCircle size={18} />
                MULAI SAMPAIKAN ASPIRASI
                <ArrowRight size={18} />
              </a>
            </div>
          </div>
        </section>

        {/* ======================================================== */}
        {/* FOOTER — TIDAK DIUBAH */}
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
                    to="/calendar"
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