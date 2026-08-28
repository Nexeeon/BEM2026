import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Home as HomeIcon,
  Phone,
  Mail,
  Globe,
  Share2,
  Instagram,
  Youtube,
  Menu,
  X,
  QrCode,
  ChevronDown,
  ArrowRight,
} from "lucide-react";

type DropdownName = "academic" | "echo" | null;

export default function Contact() {
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

  return (
    <main className="relative min-h-screen overflow-x-clip bg-[url('/images/bgweb.jpeg')] bg-cover bg-fixed bg-center bg-no-repeat pt-[72px] text-slate-900">
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
              {/* DESKTOP NAV */}
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
                      <Link
                        to="/scholarship-info"
                        className="block rounded-lg px-3 py-2.5 text-xs font-semibold text-slate-600 outline-none transition-all duration-200 ease-out hover:bg-amber-50 hover:text-amber-700 active:scale-[0.99] focus-visible:ring-2 focus-visible:ring-amber-400/50"
                        onClick={closeMenus}
                      >
                        Scholarship Info
                      </Link>

                      {/* ORGANISASI MAHASISWA */}
                      <Link
                        to="/#agenda"
                        className="block rounded-lg px-3 py-2.5 text-xs font-semibold text-slate-600 outline-none transition-all duration-200 ease-out hover:bg-amber-50 hover:text-amber-700 active:scale-[0.99] focus-visible:ring-2 focus-visible:ring-amber-400/50"
                        onClick={closeMenus}
                      >
                        Organisasi Mahasiswa
                      </Link>

                      {/* MAHASISWA BERDAMPAK */}
                      <Link
                        to="/mahasiswa-berdampak"
                        className="block rounded-lg px-3 py-2.5 text-xs font-semibold text-slate-600 outline-none transition-all duration-200 ease-out hover:bg-amber-50 hover:text-amber-700 active:scale-[0.99] focus-visible:ring-2 focus-visible:ring-amber-400/50"
                        onClick={closeMenus}
                      >
                        Mahasiswa Berdampak
                      </Link>
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
                        className="block rounded-lg px-3 py-2.5 text-xs font-semibold text-slate-600 outline-none transition-all duration-200 ease-out hover:bg-amber-50 hover:text-amber-700 active:scale-[0.99] focus-visible:ring-2 focus-visible:ring-amber-400/50"
                        onClick={closeMenus}
                      >
                        Bisik Kampus
                      </Link>

                      {/* POLSRIFESS - SUDAH DIPERBAIKI */}
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

                {/* CONTACT */}
                <Link
                  to="/contact"
                  className="ml-1 rounded-lg bg-white/60 px-3.5 py-2 text-sm font-medium text-amber-700 outline-none transition-all duration-200 ease-out active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-amber-400/70"
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

            {/* ================================================== */}
            {/* MOBILE NAV */}
            {/* ================================================== */}
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
                    <Link
                      to="/#agenda"
                      className="block rounded-md px-3 py-2.5 text-sm text-slate-600 outline-none transition-all duration-200 hover:bg-white hover:text-amber-700 active:scale-[0.99] focus-visible:ring-2 focus-visible:ring-amber-400/50"
                      onClick={closeMenus}
                    >
                      Scholarship Info
                    </Link>

                    {/* ORGANISASI MAHASISWA */}
                    <Link
                      to="/#agenda"
                      className="block rounded-md px-3 py-2.5 text-sm text-slate-600 outline-none transition-all duration-200 hover:bg-white hover:text-amber-700 active:scale-[0.99] focus-visible:ring-2 focus-visible:ring-amber-400/50"
                      onClick={closeMenus}
                    >
                      Organisasi Mahasiswa
                    </Link>

                    {/* MAHASISWA BERDAMPAK */}
                    <Link
                      to="/#agenda"
                      className="block rounded-md px-3 py-2.5 text-sm text-slate-600 outline-none transition-all duration-200 hover:bg-white hover:text-amber-700 active:scale-[0.99] focus-visible:ring-2 focus-visible:ring-amber-400/50"
                      onClick={closeMenus}
                    >
                      Mahasiswa Berdampak
                    </Link>
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
                      className="block rounded-md px-3 py-2.5 text-sm text-slate-600 outline-none transition-all duration-200 hover:bg-white hover:text-amber-700 active:scale-[0.99] focus-visible:ring-2 focus-visible:ring-amber-400/50"
                      onClick={closeMenus}
                    >
                      Bisik Kampus
                    </Link>

                    {/* POLSRIFESS - SUDAH DIPERBAIKI */}
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
                  className="mt-1 block rounded-lg bg-amber-50 px-3 py-3 text-sm font-semibold text-amber-700 outline-none transition-all duration-200 active:scale-[0.99] focus-visible:ring-2 focus-visible:ring-amber-400/50"
                  onClick={closeMenus}
                >
                  Contact Us
                </Link>
              </div>
            )}
          </div>
        </header>

        {/* ====================================================== */}
        {/* CONTACT CONTENT */}
        {/* ====================================================== */}
        <section className="relative px-5 py-20 lg:px-8 lg:py-28">
          <div className="mx-auto max-w-7xl">
            {/* HEADER */}
            <div className="mx-auto max-w-3xl text-center">
              <span className="inline-flex items-center rounded-full bg-amber-100/80 px-4 py-1.5 text-[10px] font-black uppercase tracking-[0.16em] text-amber-700 backdrop-blur-sm">
                Hubungi Kami
              </span>

              <h1
                className="mt-5 font-serif font-black uppercase tracking-wide text-amber-500"
                style={{
                  fontSize: "clamp(3rem, 6vw, 5rem)",
                }}
              >
                CONTACT US
              </h1>

              <p className="mx-auto mt-5 max-w-3xl text-sm leading-7 text-slate-700 sm:text-base">
                Kami dari BEM POLSRI siap mendengarkan suara dan aspirasi
                kalian. Apapun yang ingin disampaikan— baik kritik, saran,
                pertanyaan, maupun kerja sama— kalian bisa langsung hubungi kami
                lewat kontak yang tersedia.
              </p>
            </div>

            {/* MAIN CONTACT AREA */}
            <div className="mt-16 grid items-center gap-10 lg:grid-cols-12 lg:gap-12">
              {/* LOGO */}
              <div className="flex justify-center lg:col-span-4">
                <div className="relative flex aspect-square w-full max-w-sm items-center justify-center rounded-[2.5rem] border border-white/60 bg-white/45 p-10 shadow-xl backdrop-blur-md transition-all duration-500 ease-out hover:-translate-y-1 hover:shadow-2xl">
                  <div className="pointer-events-none absolute inset-8 rounded-full bg-amber-300/15 blur-3xl" />

                  <img
                    src="/images/logo.png"
                    alt="Logo BEM POLSRI"
                    className="relative z-10 w-52 object-contain drop-shadow-md transition-transform duration-500 ease-out hover:scale-[1.03] sm:w-60 lg:w-72"
                  />
                </div>
              </div>

              {/* CONTACT INFORMATION */}
              <div className="lg:col-span-5">
                <div className="grid gap-4 sm:grid-cols-2">
                  {/* ALAMAT */}
                  <ContactCard
                    icon={<HomeIcon size={20} />}
                    title="Alamat"
                    description="Jl. Srijaya Negara, Bukit Lama."
                  />

                  {/* KONTAK HUMAS */}
                  <ContactCard
                    icon={<Phone size={19} />}
                    title="Kontak Humas"
                    description="+62 822 89132699 (Indra)"
                  />

                  {/* EMAIL */}
                  <a
                    href="mailto:bem@polsri.ac.id"
                    className="group rounded-2xl border border-slate-200/80 bg-white/85 p-5 shadow-sm backdrop-blur-sm outline-none transition-all duration-300 ease-out hover:-translate-y-1 hover:border-amber-300 hover:shadow-lg hover:shadow-amber-900/5 focus-visible:ring-2 focus-visible:ring-amber-400/60"
                  >
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-amber-50 text-amber-600 transition-all duration-300 group-hover:bg-amber-500 group-hover:text-white">
                      <Mail size={18} />
                    </div>

                    <h3 className="mt-4 text-sm font-bold text-slate-800">
                      Email
                    </h3>

                    <p className="mt-1 text-xs leading-5 text-slate-600">
                      bem@polsri.ac.id
                    </p>
                  </a>

                  {/* MORE INFORMATION */}
                  <ContactCard
                    icon={<Globe size={20} />}
                    title="More Information"
                    description="About Us"
                  />
                </div>

                {/* SOCIAL MEDIA */}
                <div className="mt-7 rounded-2xl border border-slate-200/80 bg-white/75 p-5 backdrop-blur-sm">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-50 text-amber-600">
                      <Share2 size={17} />
                    </div>

                    <div>
                      <p className="text-sm font-bold text-slate-800">
                        Media Sosial
                      </p>

                      <p className="text-xs text-slate-500">
                        Ikuti informasi terbaru dari BEM POLSRI.
                      </p>
                    </div>
                  </div>

                  <div className="mt-4 flex gap-2">
                    {/* INSTAGRAM */}
                    <SocialButton
                      href="https://www.instagram.com/bempolsri_/"
                      label="Instagram BEM POLSRI"
                    >
                      <Instagram size={17} />
                    </SocialButton>

                    {/* YOUTUBE */}
                    <SocialButton
                      href="https://www.youtube.com/@BEMKMPOLSRI"
                      label="YouTube BEM KM POLSRI"
                    >
                      <Youtube size={17} />
                    </SocialButton>

                    {/* X */}
                    <a
                      href="https://x.com/polsrimenfess"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="X Polsri Menfess"
                      className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-500 text-sm font-bold text-white outline-none transition-all duration-300 ease-out hover:bg-amber-600 hover:shadow-lg hover:shadow-amber-500/20 active:scale-[0.96] focus-visible:ring-2 focus-visible:ring-amber-400/70"
                    >
                      𝕏
                    </a>
                  </div>
                </div>
              </div>

              {/* QR CODE */}
              <div className="flex justify-center lg:col-span-3">
                <div className="w-full max-w-sm rounded-3xl border border-amber-200/70 bg-white/90 p-7 text-center shadow-xl backdrop-blur-md transition-all duration-500 ease-out hover:-translate-y-1 hover:shadow-2xl">
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-50 text-amber-600">
                    <QrCode size={22} />
                  </div>

                  <h3 className="mt-4 text-sm font-black uppercase tracking-wide text-slate-900">
                    Scan untuk Informasi
                  </h3>

                  <p className="mx-auto mt-2 max-w-[220px] text-xs leading-5 text-slate-500">
                    Akses cepat ke tautan resmi BEM POLSRI.
                  </p>

                  <div className="mt-5 rounded-2xl border border-slate-100 bg-white p-4 shadow-sm">
                    <img
                      src="/images/qrbem.png"
                      alt="QR BEM POLSRI"
                      className="mx-auto aspect-square w-full max-w-[190px] object-contain rounded-lg"
                    />
                  </div>

                  <div className="mt-5 inline-flex items-center gap-2 text-xs font-semibold text-amber-600">
                    Lihat informasi resmi BEM POLSRI
                    <ArrowRight size={14} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ====================================================== */}
        {/* FOOTER */}
        {/* ====================================================== */}
        <footer
          id="footer"
          className="bg-slate-950 px-5 pb-8 pt-16 text-white lg:px-8"
        >
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

              {/* KONTAK */}
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
                    href="https://www.instagram.com/bempolsri_/"
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
                    className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-800 text-slate-300 font-bold outline-none transition-all duration-200 hover:bg-amber-500 hover:text-white active:scale-[0.95] focus-visible:ring-2 focus-visible:ring-amber-400/70"
                  >
                    𝕏
                  </a>

                  {/* YOUTUBE */}
                  <a
                    href="https://www.youtube.com/@BEMKMPOLSRI"
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
                © 2026 BEM Politeknik Negeri Sriwijaya. All rights reserved.
              </p>
            </div>
          </div>
        </footer>
      </div>
    </main>
  );
}

/* ============================================================
   CONTACT CARD
============================================================ */
function ContactCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="group rounded-2xl border border-slate-200/80 bg-white/85 p-5 shadow-sm backdrop-blur-sm transition-all duration-300 ease-out hover:-translate-y-1 hover:border-amber-300 hover:shadow-lg hover:shadow-amber-900/5">

      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-amber-50 text-amber-600 transition-all duration-300 ease-out group-hover:bg-amber-500 group-hover:text-white">
        {icon}
      </div>

      <h3 className="mt-4 text-sm font-bold text-slate-800">
        {title}
      </h3>

      <p className="mt-1 text-xs leading-5 text-slate-600">
        {description}
      </p>

    </div>
  );
}

/* ============================================================
   SOCIAL BUTTON
============================================================ */
function SocialButton({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-500 text-white outline-none transition-all duration-300 ease-out hover:bg-amber-600 hover:shadow-lg hover:shadow-amber-500/20 active:scale-[0.96] focus-visible:ring-2 focus-visible:ring-amber-400/70"
    >
      {children}
    </a>
  );
}