import { useState, useEffect, type ComponentType } from "react";
import { Link } from "react-router-dom";
import {
  ChevronDown,
  Instagram,
  Mail,
  Menu,
  X,
  Youtube,
  Landmark,
  Users,
  GraduationCap,
  Star,
  ArrowUpRight,
  CalendarClock,
  type LucideIcon,
} from "lucide-react";

type DropdownName = "academic" | "echo" | null;

type Scholarship = {
  id: string;
  name: string;
  category: string;
  description: string;
  link: string;
  deadline?: string;
  icon: LucideIcon;
  panel: "amber" | "slate";
};

const scholarships: Scholarship[] = [
  {
    id: "bi",
    name: "Beasiswa Bank Indonesia",
    category: "Beasiswa Instansi Pemerintah",
    description:
      "Diselenggarakan oleh Bank Indonesia untuk mahasiswa aktif minimal semester 2 dengan IPK ≥ 3.00. Penerima akan tergabung dalam komunitas GenBI dan mendapatkan pembinaan kepemimpinan, pelatihan soft skill, serta kesempatan berjejaring dengan sesama penerima se-Indonesia. Program ini menjadi langkah awal untuk mencetak generasi muda yang unggul dan berdaya saing dalam pembangunan nasional.",
    link: "https://www.bi.go.id/id/default.aspx",
    icon: Landmark,
    panel: "amber",
  },
  {
    id: "kse",
    name: "Beasiswa Karya Salemba Empat",
    category: "Beasiswa Yayasan",
    description:
      "Diselenggarakan oleh Yayasan Karya Salemba Empat bagi mahasiswa semester ≥2 dari keluarga kurang mampu. Selain tunjangan hidup Rp750.000/bulan selama 1 tahun, penerima juga mendapat pelatihan soft skill, akses jaringan alumni nasional, dan pendampingan pengembangan karakter. KSE mendorong mahasiswa POLSRI untuk tumbuh menjadi individu yang aktif, mandiri, dan siap menghadapi tantangan masa depan.",
    link: "https://beasiswa.or.id/",
    icon: Users,
    panel: "slate",
  },
  {
    id: "kip",
    name: "Beasiswa KIP-Kuliah",
    category: "Beasiswa Pemerintah",
    description:
      "Program pemerintah bagi mahasiswa baru dari keluarga tidak mampu namun berprestasi, mencakup pembebasan biaya kuliah penuh dan bantuan biaya hidup hingga lulus. KIP-Kuliah membuka akses pendidikan tinggi tanpa hambatan finansial, sekaligus mendukung POLSRI mencetak lulusan yang unggul, berdaya saing, dan siap membangun bangsa.",
    link: "https://kip-kuliah.kemdiktisaintek.go.id/",
    icon: GraduationCap,
    panel: "amber",
  },
  {
    id: "smart",
    name: "Smart Scholarship",
    category: "Beasiswa YBM BRILiaN",
    description:
      "Program pendayagunaan zakat YBM BRILiaN di bidang pendidikan bagi mahasiswa D3/D4/S1 berprestasi dari keluarga kurang mampu. Benefit yang didapat meliputi subsidi UKT 2 semester, jejaring nasional & internasional, mentoring, serta pengalaman pemberdayaan masyarakat untuk membentuk SDM yang unggul dan berkarakter.",
    link: "https://brilianscholarship.id/login",
    deadline: "Pendaftaran hingga 24 Oktober 2025",
    icon: Star,
    panel: "slate",
  },
];

export default function ScholarshipInfo() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<DropdownName>(null);

  const toggleDropdown = (name: Exclude<DropdownName, null>) => {
    setOpenDropdown(openDropdown === name ? null : name);
  };

  const closeMenus = () => {
    setMobileOpen(false);
    setOpenDropdown(null);
  };

  // Menutup menu ketika ukuran layar berubah ke desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setMobileOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <main
      className="relative flex min-h-screen flex-col overflow-x-clip scroll-smooth bg-[#fdfbf7] bg-cover bg-center bg-no-repeat text-slate-900"
      style={{ backgroundImage: `url('/images/bgweb.jpeg')` }}
    >
      {/* OVERLAY KREM TRANSPARAN */}
      <div className="pointer-events-none absolute inset-0 z-0 bg-[#fdfbf7]/60" />

      <div className="relative z-10 flex min-h-screen flex-1 flex-col">
        {/* =========================================================
            NAVBAR - SUDAH STICKY DENGAN POSITION STICKY
        ========================================================= */}
        <header className="sticky top-0 z-[100] w-full border-b border-amber-900/10 bg-[#fdfbf7]/90 shadow-sm backdrop-blur-md">
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

              {/* =====================================================
                  DESKTOP NAVIGATION
              ===================================================== */}
              <nav className="hidden items-center gap-1 lg:flex">
                {/* HOME */}
                <Link
                  to="/"
                  className="rounded-lg px-3.5 py-2 text-sm font-medium text-slate-600 outline-none transition-all duration-200 ease-out hover:bg-amber-100/50 hover:text-amber-700 active:scale-[0.98]"
                  onClick={closeMenus}
                >
                  Home
                </Link>

                {/* ABOUT */}
                <a
                  href="/about"
                  className="rounded-lg px-3.5 py-2 text-sm font-medium text-slate-600 outline-none transition-all duration-200 ease-out hover:bg-amber-100/50 hover:text-amber-700 active:scale-[0.98]"
                  onClick={closeMenus}
                >
                  About
                </a>

                {/* =================================================
                    ACADEMIC INFORMATION
                ================================================= */}
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => toggleDropdown("academic")}
                    className={`flex items-center gap-1 rounded-lg px-3.5 py-2 text-sm font-medium outline-none transition-all duration-200 ease-out active:scale-[0.98] ${
                      openDropdown === "academic"
                        ? "bg-amber-100/60 text-amber-800"
                        : "text-amber-700 hover:bg-amber-100/40 hover:text-amber-800"
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
                    <div className="absolute left-0 top-full z-[110] mt-2 w-60 overflow-hidden rounded-xl border border-amber-900/10 bg-[#fdfbf7] p-1.5 shadow-xl">
                      <Link
                        to="/calendar"
                        className="block rounded-lg px-3 py-2.5 text-xs font-semibold text-slate-600 outline-none transition-all duration-200 ease-out hover:bg-amber-100/60 hover:text-amber-800"
                        onClick={closeMenus}
                      >
                        Academic Calendar
                      </Link>

                      <Link
                        to="/scholarship-info"
                        className="block rounded-lg bg-amber-100/80 px-3 py-2.5 text-xs font-semibold text-amber-800 outline-none transition-all duration-200 ease-out"
                        onClick={closeMenus}
                      >
                        Scholarship Info
                      </Link>

                      <a
                        href="/organisasi-mahasiswa"
                        className="block rounded-lg px-3 py-2.5 text-xs font-semibold text-slate-600 outline-none transition-all duration-200 ease-out hover:bg-amber-100/60 hover:text-amber-800"
                        onClick={closeMenus}
                      >
                        Organisasi Mahasiswa
                      </a>

                      <a
                        href="/mahasiswa-berdampak"
                        className="block rounded-lg px-3 py-2.5 text-xs font-semibold text-slate-600 outline-none transition-all duration-200 ease-out hover:bg-amber-100/60 hover:text-amber-800"
                        onClick={closeMenus}
                      >
                        Mahasiswa Berdampak
                      </a>
                    </div>
                  )}
                </div>

                {/* =================================================
                    CAMPUS ECHO
                ================================================= */}
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => toggleDropdown("echo")}
                    className={`flex items-center gap-1 rounded-lg px-3.5 py-2 text-sm font-medium outline-none transition-all duration-200 ease-out active:scale-[0.98] ${
                      openDropdown === "echo"
                        ? "bg-amber-100/60 text-amber-800"
                        : "text-slate-600 hover:bg-amber-100/40 hover:text-amber-700"
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
                    <div className="absolute left-0 top-full z-[110] mt-2 w-52 overflow-hidden rounded-xl border border-amber-900/10 bg-[#fdfbf7] p-1.5 shadow-xl">
                      <Link
                        to="/kajian"
                        className="block rounded-lg px-3 py-2.5 text-xs font-semibold text-slate-600 outline-none transition-all duration-200 ease-out hover:bg-amber-100/60 hover:text-amber-800"
                        onClick={closeMenus}
                      >
                        Kajian
                      </Link>

                      <Link
                        to="/bisik-kampus"
                        className="block rounded-lg px-3 py-2.5 text-xs font-semibold text-slate-600 outline-none transition-all duration-200 ease-out hover:bg-amber-100/60 hover:text-amber-800"
                        onClick={closeMenus}
                      >
                        Bisik Kampus
                      </Link>

                      <Link
                        to="/polsrifess"
                        className="block rounded-lg px-3 py-2.5 text-xs font-semibold text-slate-600 outline-none transition-all duration-200 ease-out hover:bg-amber-100/60 hover:text-amber-800"
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
                  className="ml-1 rounded-lg px-3.5 py-2 text-sm font-medium text-slate-600 outline-none transition-all duration-200 ease-out hover:bg-amber-100/50 hover:text-amber-700 active:scale-[0.98]"
                  onClick={closeMenus}
                >
                  Contact Us
                </Link>
              </nav>

              {/* =====================================================
                  MOBILE MENU BUTTON
              ===================================================== */}
              <button
                type="button"
                aria-label={mobileOpen ? "Tutup menu" : "Buka menu"}
                aria-expanded={mobileOpen}
                className="flex h-10 w-10 items-center justify-center rounded-lg border border-amber-900/10 bg-amber-50 text-slate-700 outline-none transition-all duration-200 hover:bg-amber-100 lg:hidden"
                onClick={() => setMobileOpen(!mobileOpen)}
              >
                {mobileOpen ? <X size={21} /> : <Menu size={21} />}
              </button>
            </div>

            {/* =====================================================
                MOBILE MENU CONTENT
            ===================================================== */}
            {mobileOpen && (
              <div className="max-h-[calc(100vh-72px)] overflow-y-auto border-t border-amber-900/10 bg-[#fdfbf7] px-5 py-3 shadow-lg lg:hidden">
                {/* HOME */}
                <Link
                  to="/"
                  className="block rounded-lg px-3 py-3 text-sm font-medium text-slate-600 hover:bg-amber-100/50 hover:text-amber-700"
                  onClick={closeMenus}
                >
                  Home
                </Link>

                {/* ABOUT */}
                <a
                  href="/about"
                  className="block rounded-lg px-3 py-3 text-sm font-medium text-slate-600 hover:bg-amber-100/50 hover:text-amber-700"
                  onClick={closeMenus}
                >
                  About
                </a>

                {/* MOBILE ACADEMIC */}
                <button
                  type="button"
                  className={`mt-1 flex w-full items-center justify-between rounded-lg px-3 py-3 text-sm font-semibold ${
                    openDropdown === "academic"
                      ? "bg-amber-100/60 text-amber-800"
                      : "text-amber-700 hover:bg-amber-100/50"
                  }`}
                  onClick={() => toggleDropdown("academic")}
                >
                  Academic Information

                  <ChevronDown
                    size={14}
                    className={`transition-transform duration-200 ${
                      openDropdown === "academic" ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {openDropdown === "academic" && (
                  <div className="mt-1 rounded-lg bg-amber-50/50 p-1">
                    <Link
                      to="/calendar"
                      className="block rounded-md px-3 py-2.5 text-sm font-semibold text-slate-600 hover:bg-white hover:text-amber-800"
                      onClick={closeMenus}
                    >
                      Academic Calendar
                    </Link>

                    <Link
                      to="/scholarship-info"
                      className="block rounded-md bg-white px-3 py-2.5 text-sm font-semibold text-amber-800"
                      onClick={closeMenus}
                    >
                      Scholarship Info
                    </Link>

                    <a
                      href="/organisasi-mahasiswa"
                      className="block rounded-md px-3 py-2.5 text-sm text-slate-600 hover:bg-white hover:text-amber-800"
                      onClick={closeMenus}
                    >
                      Organisasi Mahasiswa
                    </a>

                    <a
                      href="/mahasiswa-berdampak"
                      className="block rounded-md px-3 py-2.5 text-sm text-slate-600 hover:bg-white hover:text-amber-800"
                      onClick={closeMenus}
                    >
                      Mahasiswa Berdampak
                    </a>
                  </div>
                )}

                {/* MOBILE CAMPUS ECHO */}
                <button
                  type="button"
                  className={`mt-1 flex w-full items-center justify-between rounded-lg px-3 py-3 text-sm font-medium ${
                    openDropdown === "echo"
                      ? "bg-amber-100/60 text-amber-800"
                      : "text-slate-600 hover:bg-amber-100/50"
                  }`}
                  onClick={() => toggleDropdown("echo")}
                >
                  Campus Echo

                  <ChevronDown
                    size={14}
                    className={`transition-transform duration-200 ${
                      openDropdown === "echo" ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {openDropdown === "echo" && (
                  <div className="mt-1 rounded-lg bg-amber-50/50 p-1">
                    <Link
                      to="/kajian"
                      className="block rounded-md px-3 py-2.5 text-sm text-slate-600 hover:bg-white hover:text-amber-800"
                      onClick={closeMenus}
                    >
                      Kajian
                    </Link>

                    <Link
                      to="/bisik-kampus"
                      className="block rounded-md px-3 py-2.5 text-sm text-slate-600 hover:bg-white hover:text-amber-800"
                      onClick={closeMenus}
                    >
                      Bisik Kampus
                    </Link>

                    <Link
                      to="/polsrifess"
                      className="block rounded-md px-3 py-2.5 text-sm font-semibold text-slate-600 hover:bg-white hover:text-amber-800"
                      onClick={closeMenus}
                    >
                      Polsrifess
                    </Link>
                  </div>
                )}

                {/* CONTACT */}
                <Link
                  to="/contact"
                  className="mt-1 block rounded-lg px-3 py-3 text-sm font-medium text-slate-600 hover:bg-amber-100/50 hover:text-amber-700"
                  onClick={closeMenus}
                >
                  Contact Us
                </Link>
              </div>
            )}
          </div>
        </header>

        {/* =========================================================
            HERO / INTRO SECTION
        ========================================================= */}
        <section className="relative px-5 pb-10 pt-16 lg:px-8 lg:pb-14 lg:pt-24">
          <div className="mx-auto max-w-4xl text-center">
            <p className="mb-5 text-xs font-semibold uppercase tracking-[0.25em] text-slate-600 sm:text-sm">
              Academic Information
            </p>

            <h1 className="font-serif text-4xl font-black tracking-tight text-[#d97706] sm:text-5xl lg:text-6xl">
              Informasi Beasiswa
            </h1>

            <p className="mx-auto mt-6 max-w-xl text-sm font-medium leading-relaxed text-slate-700 sm:text-base">
              Kumpulan peluang beasiswa dan bantuan pendanaan studi yang bisa
              diakses mahasiswa Politeknik Negeri Sriwijaya, mulai dari
              program pemerintah hingga yayasan dan lembaga mitra kampus.
            </p>
          </div>
        </section>

        {/* =========================================================
            SCHOLARSHIP LIST
        ========================================================= */}
        <section className="relative px-5 pb-20 lg:px-8 lg:pb-28">
          <div className="mx-auto flex max-w-5xl flex-col gap-6">
            {scholarships.map((item, index) => {
              const Icon = item.icon;
              const reversed = index % 2 === 1;
              const isAmberPanel = item.panel === "amber";

              return (
                <article
                  key={item.id}
                  className="group overflow-hidden rounded-2xl border border-amber-900/10 bg-white/70 shadow-sm backdrop-blur-sm transition-all duration-200 ease-out hover:border-amber-900/20 hover:shadow-md"
                >
                  <div
                    className={`flex flex-col ${
                      reversed ? "md:flex-row-reverse" : "md:flex-row"
                    }`}
                  >
                    {/* ICON PANEL */}
                    <div
                      className={`relative flex shrink-0 items-center justify-center overflow-hidden p-10 md:w-64 ${
                        isAmberPanel
                          ? "bg-gradient-to-br from-amber-600 to-amber-800"
                          : "bg-gradient-to-br from-slate-900 to-slate-950"
                      }`}
                    >
                      <div
                        className="absolute inset-0 opacity-[0.15]"
                        style={{
                          backgroundImage:
                            "radial-gradient(circle, #ffffff 1px, transparent 1px)",
                          backgroundSize: "16px 16px",
                        }}
                      />

                      <Icon
                        size={56}
                        className="relative z-10 text-white transition-transform duration-200 ease-out group-hover:scale-105"
                      />
                    </div>

                    {/* CONTENT */}
                    <div className="flex flex-1 flex-col justify-center px-6 py-7 sm:px-8">
                      <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-amber-700">
                        {item.category}
                      </p>

                      <h2 className="mt-2 text-xl font-bold text-slate-900 sm:text-2xl">
                        {item.name}
                      </h2>

                      <p className="mt-3 text-sm leading-relaxed text-slate-600">
                        {item.description}
                      </p>

                      {item.deadline && (
                        <p className="mt-3 flex items-center gap-1.5 text-xs font-semibold text-amber-700">
                          <CalendarClock size={14} />
                          {item.deadline}
                        </p>
                      )}

                      <a
                        href={item.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-5 inline-flex w-fit items-center gap-1.5 rounded-lg bg-slate-900 px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-white transition-all duration-200 ease-out hover:bg-amber-700 active:scale-[0.98]"
                      >
                        Lihat Detail Beasiswa

                        <ArrowUpRight
                          size={14}
                          className="transition-transform duration-200 ease-out group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                        />
                      </a>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </section>

        {/* =========================================================
            FOOTER
        ========================================================= */}
        <footer
          id="footer"
          className="mt-auto bg-slate-950 px-5 pb-8 pt-16 text-white lg:px-8"
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
                  <a
                    href="/about"
                    className="transition-all hover:text-white"
                  >
                    Tentang Kami
                  </a>

                  <a
                    href="/#agenda"
                    className="transition-all hover:text-white"
                  >
                    Agenda Kegiatan
                  </a>

                  <Link
                    to="/contact"
                    className="transition-all hover:text-white"
                  >
                    Contact Us
                  </Link>
                </div>
              </div>

              {/* SOCIAL / CONTACT */}
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
                  Jl. Srijaya Negara, Bukit Besar, Palembang
                </p>

                <div className="mt-5 flex gap-2">
                  {/* INSTAGRAM */}
                  <a
                    href="https://www.instagram.com/bempolsri_/"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Instagram"
                    className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-800 text-slate-300 transition-all hover:bg-amber-500 hover:text-white"
                  >
                    <Instagram size={16} />
                  </a>

                  {/* X */}
                  <a
                    href="https://x.com/polsrimenfess"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="X Twitter"
                    className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-800 text-xs font-black text-slate-300 transition-all hover:bg-amber-500 hover:text-white"
                  >
                    𝕏
                  </a>

                  {/* YOUTUBE */}
                  <a
                    href="https://www.youtube.com/@bemkmpolsri3259"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="YouTube"
                    className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-800 text-slate-300 transition-all hover:bg-amber-500 hover:text-white"
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