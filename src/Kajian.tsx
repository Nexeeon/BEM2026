import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  BookOpen,
  ChevronDown,
  Compass,
  Instagram,
  Lightbulb,
  Mail,
  Menu,
  MessageCircle,
  X,
  Youtube,
} from "lucide-react";

type DropdownName = "academic" | "echo" | null;

// ============================================================
// DATA CARD "MENGAPA KAJIAN?"
// ============================================================
const whyKajianData = [
  {
    icon: Compass,
    title: "ANALISIS MENDALAM",
    description:
      "Mengkaji isu-isu terkini melalui pendekatan akademis dan objektif, menghasilkan kajian tertulis yang memberikan pemahaman komprehensif.",
  },
  {
    icon: MessageCircle,
    title: "PENYEBARAN GAGASAN",
    description:
      "Menyediakan media untuk menyampaikan gagasan dan kajian yang dapat memicu diskusi sehat dan konstruktif antar mahasiswa.",
  },
  {
    icon: Lightbulb,
    title: "WAWASAN BARU",
    description:
      "Membuka perspektif baru tentang fenomena sosial, politik, dan akademik melalui publikasi kajian yang relevan.",
  },
];

export default function Kajian() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] =
    useState<DropdownName>(null);
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

              {/* ================================================== */}
              {/* BRANDING */}
              {/* ================================================== */}
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
                        openDropdown === "academic"
                          ? "rotate-180"
                          : ""
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
                        href="/#agenda"
                        className="block rounded-lg px-3 py-2.5 text-xs font-semibold text-slate-600 outline-none transition-all duration-200 ease-out hover:bg-amber-50 hover:text-amber-700 active:scale-[0.99] focus-visible:ring-2 focus-visible:ring-amber-400/50"
                        onClick={closeMenus}
                      >
                        Scholarship Info
                      </a>

                      {/* ORGANISASI MAHASISWA */}
                      <a
                        href="/#agenda"
                        className="block rounded-lg px-3 py-2.5 text-xs font-semibold text-slate-600 outline-none transition-all duration-200 ease-out hover:bg-amber-50 hover:text-amber-700 active:scale-[0.99] focus-visible:ring-2 focus-visible:ring-amber-400/50"
                        onClick={closeMenus}
                      >
                        Organisasi Mahasiswa
                      </a>

                      {/* MAHASISWA BERDAMPAK */}
                      <a
                        href="/#agenda"
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
                        : "text-amber-600 hover:bg-white/55 hover:text-amber-700"
                    }`}
                  >
                    Campus Echo

                    <ChevronDown
                      size={14}
                      className={`transition-transform duration-200 ease-out ${
                        openDropdown === "echo"
                          ? "rotate-180"
                          : ""
                      }`}
                    />
                  </button>

                  {openDropdown === "echo" && (
                    <div className="absolute left-0 top-full mt-2 w-52 overflow-hidden rounded-xl border border-slate-200/70 bg-white/95 p-1.5 shadow-xl backdrop-blur-xl">

                      {/* KAJIAN */}
                      <Link
                        to="/kajian"
                        className="block rounded-lg bg-amber-50 px-3 py-2.5 text-xs font-semibold text-amber-700 outline-none transition-all duration-200 ease-out active:scale-[0.99] focus-visible:ring-2 focus-visible:ring-amber-400/50"
                        onClick={closeMenus}
                      >
                        Kajian
                      </Link>

                      {/* BISIK KAMPUS */}
                      <Link
                        to="/bisik-kampus"
                        className="block rounded-lg px-3 py-2.5 text-xs font-semibold text-slate-600 outline-none transition-all duration-200 ease-out hover:bg-amber-50 hover:text-amber-700 active:scale-[0.99] focus-visible:ring-2 focus-visible:ring-amber-400/50"
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

                {/* CONTACT US */}
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
                  to="/#visi"
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
                      : "text-slate-600 hover:bg-slate-50 hover:text-amber-600"
                  }`}
                  onClick={() => toggleDropdown("academic")}
                >
                  Academic Information

                  <ChevronDown
                    size={14}
                    className={`transition-transform duration-200 ease-out ${
                      openDropdown === "academic"
                        ? "rotate-180"
                        : ""
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
                      href="/#agenda"
                      className="block rounded-md px-3 py-2.5 text-sm text-slate-600 outline-none transition-all duration-200 hover:bg-white hover:text-amber-700 active:scale-[0.99] focus-visible:ring-2 focus-visible:ring-amber-400/50"
                      onClick={closeMenus}
                    >
                      Scholarship Info
                    </a>

                    <a
                      href="/#agenda"
                      className="block rounded-md px-3 py-2.5 text-sm text-slate-600 outline-none transition-all duration-200 hover:bg-white hover:text-amber-700 active:scale-[0.99] focus-visible:ring-2 focus-visible:ring-amber-400/50"
                      onClick={closeMenus}
                    >
                      Organisasi Mahasiswa
                    </a>

                    <a
                      href="/#agenda"
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
                      : "text-amber-600 hover:bg-slate-50 hover:text-amber-700"
                  }`}
                  onClick={() => toggleDropdown("echo")}
                >
                  Campus Echo

                  <ChevronDown
                    size={14}
                    className={`transition-transform duration-200 ease-out ${
                      openDropdown === "echo"
                        ? "rotate-180"
                        : ""
                    }`}
                  />
                </button>

                {openDropdown === "echo" && (
                  <div className="mt-1 rounded-lg bg-slate-50 p-1">

                    {/* KAJIAN */}
                    <Link
                      to="/kajian"
                      className="block rounded-md bg-amber-50 px-3 py-2.5 text-sm font-semibold text-amber-700 outline-none transition-all duration-200 active:scale-[0.99] focus-visible:ring-2 focus-visible:ring-amber-400/50"
                      onClick={closeMenus}
                    >
                      Kajian
                    </Link>

                    {/* BISIK KAMPUS */}
                    <Link
                      to="/bisik-kampus"
                      className="block rounded-md px-3 py-2.5 text-sm text-slate-600 outline-none transition-all duration-200 hover:bg-white hover:text-amber-700 active:scale-[0.99] focus-visible:ring-2 focus-visible:ring-amber-400/50"
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

                {/* CONTACT */}
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
        {/* HERO SECTION - KAJIAN */}
        {/* ======================================================== */}
        <section className="relative mx-auto flex min-h-[60vh] w-full max-w-7xl items-center px-[clamp(1.25rem,4vw,3.5rem)] py-[clamp(2rem,5vh,5rem)]">
          <div className="grid w-full items-center gap-[clamp(2rem,4vw,5rem)] lg:grid-cols-12">

            {/* TEKS KIRI */}
            <div className="relative z-10 flex flex-col items-start justify-center text-left lg:col-span-6">

              <span className="mb-4 inline-flex items-center gap-2 rounded-full bg-amber-100/80 px-4 py-1.5 text-[10px] font-black uppercase tracking-[0.15em] text-amber-700 backdrop-blur-sm">
                <BookOpen size={14} className="text-amber-600" />
                Campus Echo
              </span>

              <h1
                className="font-serif font-black uppercase tracking-wide text-amber-500 leading-[1.12]"
                style={{ fontSize: "clamp(2.8rem, 5.5vw, 5rem)" }}
              >
                KAJIAN
              </h1>

              <p
                className="mt-[clamp(1rem,1.8vw,1.75rem)] max-w-2xl font-medium leading-relaxed text-slate-700"
                style={{ fontSize: "clamp(0.95rem, 1.15vw, 1.1rem)" }}
              >
                Proses analisis isu-isu terkini baik internal kampus maupun
                eksternal, dilakukan secara berkala oleh Departemen KASTRAT.
                Platform ini menjadi wadah diskusi mendalam tentang fenomena
                sosial, politik, dan akademik yang relevan dengan kehidupan
                mahasiswa.
              </p>

              {/* TOMBOL */}
              <div className="mt-6">
                <a
                  href="https://zaap.bio/kajianbempolsri25"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-amber-500 px-8 py-3.5 text-sm font-bold text-white shadow-lg shadow-amber-500/30 outline-none transition-all duration-200 ease-out hover:bg-amber-600 hover:shadow-amber-500/40 active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-amber-400/70"
                >
                  <BookOpen size={18} />
                  Lihat Kajian Sekarang
                  <ArrowRight size={18} />
                </a>
              </div>

            </div>

            {/* FOTO KAMPUS */}
            <div className="relative flex w-full items-center justify-center lg:col-span-6 lg:justify-end">
              <div className="relative flex w-full items-center justify-center">

                <div
                  className="pointer-events-none absolute right-0 top-1/2 -translate-y-1/2 rounded-full bg-gradient-to-tr from-amber-400/20 via-orange-300/15 to-amber-200/30 blur-2xl"
                  style={{
                    width: "clamp(260px, 38vw, 540px)",
                    height: "clamp(260px, 38vw, 540px)",
                  }}
                />

                <div className="relative z-10 flex h-auto w-full flex-col items-center justify-center">
                  <div
                    className="w-full max-w-md rounded-3xl border-2 border-dashed border-amber-300/60 bg-white/40 shadow-xl backdrop-blur-sm transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-2xl"
                    style={{ aspectRatio: "4/3" }}
                  >
                    <div className="flex h-full flex-col items-center justify-center p-8 text-center">

                      <div className="mb-3 text-6xl text-amber-300/60">
                        🖼️
                      </div>

                      <p className="text-sm font-medium text-slate-400">
                        Foto Kampus
                      </p>

                      <p className="mt-1 text-xs text-slate-300">
                        (Segera hadir)
                      </p>

                      <div className="mt-4 flex justify-center gap-2">
                        <span className="h-0.5 w-12 rounded-full bg-amber-200/50" />
                        <span className="h-0.5 w-6 rounded-full bg-amber-300/70" />
                        <span className="h-0.5 w-12 rounded-full bg-amber-200/50" />
                      </div>

                    </div>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </section>

        {/* ======================================================== */}
        {/* MENGAPA KAJIAN? */}
        {/* ======================================================== */}
        <section className="bg-white/85 px-5 py-20 backdrop-blur-md lg:px-8 lg:py-28">
          <div className="mx-auto max-w-7xl">

            <div className="max-w-2xl">
              <h2 className="text-3xl font-black tracking-tight text-slate-900 sm:text-4xl">
                MENGAPA KAJIAN?
              </h2>

              <p className="mt-4 max-w-xl text-sm leading-7 text-slate-600">
                Kajian menjadi sarana untuk berpikir kritis, menelaah isu-isu
                aktual, dan memperluas wawasan mahasiswa maupun masyarakat.
              </p>
            </div>

            <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {whyKajianData.map((item, index) => (
                <article
                  key={index}
                  className="group rounded-3xl border border-slate-200 bg-white/90 p-8 backdrop-blur-sm transition-all duration-200 ease-out hover:-translate-y-1 hover:border-amber-300 hover:shadow-xl hover:shadow-amber-900/5"
                >
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-amber-50 text-amber-600 transition-all duration-200 group-hover:bg-amber-500 group-hover:text-white">
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
        {/* CTA */}
        {/* ======================================================== */}
        <section className="px-5 py-20 lg:px-8 lg:py-28">
          <div className="mx-auto max-w-4xl text-center">

            <div className="rounded-3xl border border-amber-300/40 bg-white/90 p-8 shadow-xl backdrop-blur-md transition-all duration-300 ease-out hover:shadow-2xl sm:p-12">

              <BookOpen
                size={48}
                className="mx-auto mb-4 text-amber-500"
              />

              <h2 className="text-3xl font-black tracking-tight text-slate-900 sm:text-4xl">
                BERGABUNG DENGAN KAJIAN
              </h2>

              <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-slate-600">
                Akses kajian-kajian terbaru dari Departemen KASTRAT BEM POLSRI
                dan temukan wawasan baru dari isu-isu yang sedang hangat.
                Setiap kajian tersedia dalam format PDF untuk dibaca kapan
                saja.
              </p>

              <a
                href="https://zaap.bio/kajianbempolsri25"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-8 inline-flex items-center gap-3 rounded-full bg-amber-500 px-10 py-4 text-sm font-bold text-white shadow-lg shadow-amber-500/30 outline-none transition-all duration-200 ease-out hover:bg-amber-600 hover:shadow-amber-500/40 active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-amber-400/70"
              >
                <BookOpen size={18} />
                LIHAT KAJIAN SEKARANG
                <ArrowRight size={18} />
              </a>

            </div>
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
                    <h2 className="font-bold">
                      Kabinet Lentera Sriwijaya
                    </h2>

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
              <p>
                © BEM Politeknik Negeri Sriwijaya. All rights reserved.
              </p>
            </div>

          </div>
        </footer>

      </div>
    </main>
  );
}