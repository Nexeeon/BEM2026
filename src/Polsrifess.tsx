import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowUpRight,
  Ban,
  CheckCircle2,
  ChevronDown,
  ExternalLink,
  Instagram,
  Mail,
  MessagesSquare,
  Menu,
  Send,
  ShieldCheck,
  Sparkles,
  Users,
  X,
  Youtube,
  LucideProps,
} from "lucide-react";

type DropdownName = "academic" | "echo" | null;

/* ============================================================
   REVEAL — animasi fade-up ringan saat elemen masuk viewport.
   Dipakai secukupnya, bukan di semua elemen, biar tetap terasa
   profesional dan tidak berlebihan.
============================================================ */
function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out ${
        visible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
      } ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

/* ============================================================
   DATA
============================================================ */
interface StatItem {
  value: string;
  label: string;
}

const stats: StatItem[] = [
  { value: "800+", label: "Menfess Terpost" },
  { value: "800+", label: "Pengguna Aktif" },
  { value: "24/7", label: "Selalu Online" },
  { value: "100%", label: "Anonim" },
];

// Duplikat 4x supaya animasi marquee terlihat menyambung mulus
const statsMarquee: StatItem[] = [...stats, ...stats, ...stats, ...stats];

interface StepItem {
  icon: React.ComponentType<LucideProps>;
  number: string;
  title: string;
  text: string;
}

const steps: StepItem[] = [
  {
    icon: Send,
    number: "01",
    title: "Kirim Pesanmu",
    text: "Tulis cerita, opini, keresahan, atau info kampus lewat form pengiriman menfess. Tidak perlu login atau memasukkan identitas apa pun.",
  },
  {
    icon: ShieldCheck,
    number: "02",
    title: "Diperiksa Admin",
    text: "Setiap pesan yang masuk ditinjau lebih dulu oleh tim Departemen Media Informasi untuk memastikan sesuai dengan aturan yang berlaku.",
  },
  {
    icon: MessagesSquare,
    number: "03",
    title: "Tayang di Polsrifess",
    text: "Pesan yang lolos tinjauan akan diposting secara anonim di akun X Polsrifess dan bisa mulai ditanggapi mahasiswa lain.",
  },
];

const allowedList = [
  "Opini, kritik, dan saran yang membangun untuk kampus",
  "Cerita, curhatan, atau pertanyaan seputar kehidupan kampus",
  "Informasi akademik maupun non-akademik yang bermanfaat",
  "Promosi kegiatan UKM, HMJ, atau organisasi mahasiswa",
];

const forbiddenList = [
  "Ujaran kebencian, SARA, atau konten yang menyerang pribadi",
  "Identitas pribadi orang lain tanpa persetujuan (doxing)",
  "Konten pornografi, perjudian, atau promosi produk ilegal",
  "Hoaks atau informasi yang belum dapat dipertanggungjawabkan",
];

/* ============================================================
   PAGE
============================================================ */
export default function Polsrifess() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<DropdownName>(null);
  const [scrolled, setScrolled] = useState(false);

  const MENFESS_URL =
    "https://x.com/polsrimenfess?t=MOnYjjIORMkooZrAUZwJcg&s=09";

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

  return (
    <main className="relative min-h-screen overflow-x-clip bg-[url('/images/bgweb.jpeg')] bg-cover bg-fixed bg-center bg-no-repeat pt-[72px] text-slate-900 scroll-smooth">
      <div className="min-h-screen bg-white/65">
        {/* NAVBAR — sama persis dengan Home, tidak diubah */}
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
                  className="rounded-lg px-3.5 py-2 text-sm font-medium text-slate-600 outline-none transition-all duration-200 ease-out hover:bg-white/55 hover:text-amber-600 active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-amber-400/70"
                  onClick={closeMenus}
                >
                  Home
                </Link>

                <a
                  href="/#visi"
                  className="rounded-lg px-3.5 py-2 text-sm font-medium text-slate-600 outline-none transition-all duration-200 ease-out hover:bg-white/55 hover:text-amber-600 active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-amber-400/70"
                  onClick={closeMenus}
                >
                  About
                </a>

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
                        href="/#agenda"
                        className="block rounded-lg px-3 py-2.5 text-xs font-semibold text-slate-600 outline-none transition-all duration-200 ease-out hover:bg-amber-50 hover:text-amber-700 active:scale-[0.99] focus-visible:ring-2 focus-visible:ring-amber-400/50"
                        onClick={closeMenus}
                      >
                        Scholarship Info
                      </a>
                      <a
                        href="/#agenda"
                        className="block rounded-lg px-3 py-2.5 text-xs font-semibold text-slate-600 outline-none transition-all duration-200 ease-out hover:bg-amber-50 hover:text-amber-700 active:scale-[0.99] focus-visible:ring-2 focus-visible:ring-amber-400/50"
                        onClick={closeMenus}
                      >
                        Organisasi Mahasiswa
                      </a>
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
                      <Link
                        to="/polsrifess"
                        className="block rounded-lg px-3 py-2.5 text-xs font-semibold text-amber-700 outline-none transition-all duration-200 ease-out hover:bg-amber-50 active:scale-[0.99] focus-visible:ring-2 focus-visible:ring-amber-400/50"
                        onClick={closeMenus}
                      >
                        Polsrifess
                      </Link>
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

            {mobileOpen && (
              <div className="border-t border-slate-200/70 bg-white/95 px-5 py-3 shadow-lg backdrop-blur-xl lg:hidden">
                <Link
                  to="/"
                  className="block rounded-lg px-3 py-3 text-sm font-medium text-slate-600 outline-none transition-all duration-200 hover:bg-slate-50 hover:text-amber-600 active:scale-[0.99] focus-visible:ring-2 focus-visible:ring-amber-400/50"
                  onClick={closeMenus}
                >
                  Home
                </Link>
                <a
                  href="/#visi"
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
                    <Link
                      to="/polsrifess"
                      className="block rounded-md px-3 py-2.5 text-sm font-semibold text-amber-700 outline-none transition-all duration-200 hover:bg-white active:scale-[0.99] focus-visible:ring-2 focus-visible:ring-amber-400/50"
                      onClick={closeMenus}
                    >
                      Polsrifess
                    </Link>
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
        <section className="relative mx-auto flex min-h-[calc(100vh-72px)] w-full max-w-7xl items-center px-[clamp(1.25rem,4vw,3.5rem)] py-[clamp(2rem,4vh,4rem)]">
          <div className="grid w-full items-center gap-[clamp(2rem,4vw,4rem)] lg:grid-cols-12">
            <Reveal className="relative z-10 flex flex-col items-start justify-center text-left lg:col-span-6">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-100/80 px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-[0.16em] text-amber-700">
                <Sparkles size={13} />
                Ruang Aspirasi Anonim
              </span>

              <h1
                className="mt-5 font-serif font-black uppercase tracking-wide text-amber-500 leading-[1.1]"
                style={{ fontSize: "clamp(2.4rem, 5vw, 4.2rem)" }}
              >
                POLSRIFESS
              </h1>

              <p
                className="mt-5 max-w-xl font-medium leading-relaxed text-slate-700"
                style={{ fontSize: "clamp(0.875rem, 1.1vw, 1.05rem)" }}
              >
                Platform berbasis media sosial yang dikelola BEM Polsri
                sebagai wadah berbagi cerita, opini, keresahan, maupun
                informasi seputar kampus secara anonim - dibangun untuk
                komunikasi dua arah yang santai namun tetap aktif dan
                bertanggung jawab.
              </p>

              <div className="mt-6">
                <a
                  href={MENFESS_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-amber-500 px-8 py-3.5 text-sm font-bold text-white shadow-lg shadow-amber-500/30 outline-none transition-all duration-200 ease-out hover:bg-amber-600 hover:shadow-amber-500/40 active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-amber-400/70"
                >
                  <Send size={18} />
                  Kunjungi Polsrifess
                  <ExternalLink size={18} />
                </a>
              </div>
            </Reveal>

            {/* VISUAL — foto Polsrifess */}
            <Reveal delay={120} className="relative flex w-full items-center justify-center lg:col-span-6 lg:justify-end">
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
                    className="w-full max-w-md overflow-hidden rounded-3xl shadow-xl transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-2xl"
                    style={{ aspectRatio: "4/3" }}
                  >
                    <img
                      src="/images/Program_kerja/polsrifess.jpeg"
                      alt="Tampilan Polsrifess"
                      className="h-full w-full object-cover"
                    />
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* STATISTIK — marquee bergulir otomatis, gaya sama seperti Bisik Kampus */}
        <section className="relative overflow-hidden bg-gradient-to-r from-amber-400 via-amber-500 to-orange-600 py-14 lg:py-16">
          <style>{`
            @keyframes marquee-smooth {
              from { transform: translateX(0); }
              to { transform: translateX(-25%); }
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
                  <div key={index} className="flex items-center gap-5 px-2 py-3">
                    <span
                      className="font-black tracking-tight text-white drop-shadow-sm"
                      style={{ fontSize: "clamp(2.6rem, 4.5vw, 4.2rem)" }}
                    >
                      {stat.value}
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

        {/* CARA PENGGUNAAN */}
        <section
          id="cara-penggunaan"
          className="bg-white/85 px-5 py-20 backdrop-blur-md lg:px-8 lg:py-28"
        >
          <div className="mx-auto max-w-7xl">
            <Reveal>
              <SectionIntro
                eyebrow="Tiga Langkah Mudah"
                title="Cara Menggunakan Polsrifess"
                text="Prosesnya singkat — dari pesan yang kamu tulis sampai tayang secara anonim di linimasa Polsrifess."
              />
            </Reveal>

            <div className="mt-14 grid gap-4 sm:grid-cols-3">
              {steps.map((step, idx) => {
                const Icon = step.icon;
                return (
                  <Reveal key={step.number} delay={idx * 100}>
                    <article className="group h-full rounded-3xl border border-slate-200 bg-white/90 p-6 backdrop-blur-sm transition-all duration-200 ease-out hover:-translate-y-1 hover:border-amber-300 hover:shadow-xl hover:shadow-amber-900/5">
                      <div className="flex items-start justify-between">
                        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-amber-50 text-amber-600 transition-all duration-200 group-hover:bg-amber-500 group-hover:text-white">
                          <Icon size={21} />
                        </div>
                        <span className="text-3xl font-black text-slate-200">
                          {step.number}
                        </span>
                      </div>

                      <h3 className="mt-5 text-base font-bold text-slate-900">
                        {step.title}
                      </h3>
                      <p className="mt-2 text-xs leading-6 text-slate-600">
                        {step.text}
                      </p>
                    </article>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </section>

        {/* PANDUAN / ATURAN */}
        <section className="mx-auto max-w-7xl px-5 py-16 lg:px-8 lg:py-24">
          <Reveal>
            <SectionIntro
              eyebrow="Jaga Bersama"
              title="Yang Boleh & Tidak Boleh Dikirim"
              text="Polsrifess terbuka untuk siapa saja, selama tetap mengikuti aturan dasar agar ruang ini nyaman untuk semua."
            />
          </Reveal>

          <div className="mt-10 grid gap-5 lg:grid-cols-2">
            <Reveal>
              <div className="h-full rounded-3xl border border-amber-200/60 bg-white/90 p-7 shadow-sm backdrop-blur-sm sm:p-8">
                <div className="flex items-center gap-2.5">
                  <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-amber-100 text-amber-600">
                    <CheckCircle2 size={18} />
                  </span>
                  <h3 className="text-base font-bold text-slate-900">
                    Boleh Dikirim
                  </h3>
                </div>

                <ul className="mt-5 space-y-3">
                  {allowedList.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-2.5 text-xs leading-6 text-slate-600 sm:text-sm"
                    >
                      <CheckCircle2
                        size={16}
                        className="mt-0.5 shrink-0 text-amber-500"
                      />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>

            <Reveal delay={100}>
              <div className="h-full rounded-3xl border border-slate-200 bg-slate-900/95 p-7 text-white shadow-sm backdrop-blur-sm sm:p-8">
                <div className="flex items-center gap-2.5">
                  <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/10 text-amber-400">
                    <Ban size={18} />
                  </span>
                  <h3 className="text-base font-bold text-white">
                    Tidak Diperbolehkan
                  </h3>
                </div>

                <ul className="mt-5 space-y-3">
                  {forbiddenList.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-2.5 text-xs leading-6 text-slate-300 sm:text-sm"
                    >
                      <Ban size={16} className="mt-0.5 shrink-0 text-amber-400" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
        </section>

        {/* CTA PANDUAN LENGKAP */}
        <section className="mx-auto max-w-7xl px-5 pb-20 lg:px-8 lg:pb-28">
          <Reveal>
            <div className="relative overflow-hidden rounded-3xl border border-amber-300/40 bg-gradient-to-br from-amber-50 via-white to-amber-50 p-8 text-center shadow-xl backdrop-blur-md sm:p-12">
              <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full border-[20px] border-amber-500/15" />
              <div className="pointer-events-none absolute -bottom-12 -left-10 h-40 w-40 rounded-full border-[20px] border-amber-500/10" />

              <div className="relative mx-auto flex max-w-xl flex-col items-center">
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-500 text-white shadow-lg shadow-amber-500/30">
                  <Users size={22} />
                </span>

                <h3 className="mt-5 text-2xl font-bold text-slate-900 sm:text-3xl">
                  Butuh Panduan Lebih Lengkap?
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-slate-600 sm:text-base">
                  Simak panduan lengkap cara mengirim, format pesan, dan
                  ketentuan lain seputar Polsrifess di halaman berikut.
                </p>

                <a
                  href="https://polsrifess.carrd.co"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group mt-7 inline-flex items-center gap-2 rounded-xl bg-slate-900 px-6 py-3 text-sm font-bold text-white outline-none transition-all duration-200 ease-out hover:-translate-y-0.5 hover:bg-amber-500 active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-amber-400/70"
                >
                  Kunjungi polsrifess.carrd.co
                  <ExternalLink
                    size={15}
                    className="transition-transform duration-200 ease-out group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  />
                </a>
              </div>
            </div>
          </Reveal>
        </section>

        {/* FOOTER — sama persis dengan Home, tidak diubah */}
        <footer className="bg-slate-950 px-5 pb-8 pt-16 text-white lg:px-8">
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
                  <Link
                    to="/"
                    className="rounded-md outline-none transition-all duration-200 hover:text-white focus-visible:ring-2 focus-visible:ring-amber-400/60"
                  >
                    Beranda
                  </Link>
                  <a
                    href="https://x.com/polsrimenfess?t=MOnYjjIORMkooZrAUZwJcg&s=09"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-md outline-none transition-all duration-200 hover:text-white focus-visible:ring-2 focus-visible:ring-amber-400/60"
                  >
                    Kunjungi Polsrifess
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