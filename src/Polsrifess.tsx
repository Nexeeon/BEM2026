import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";
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
    <main className="relative min-h-screen overflow-x-clip bg-[url('/images/bgweb.webp')] bg-cover bg-fixed bg-center bg-no-repeat pt-[72px] text-slate-900 scroll-smooth">
      <div className="min-h-screen bg-white/65">
        {/* NAVBAR — sama persis dengan Home, tidak diubah */}
        <Navbar />

        {/* ======================================================== */}
        {/* HERO — DIRINGKAS, TEKS OVERLAY DI ATAS GAMBAR */}
        {/* ======================================================== */}
        <section className="relative w-full">
          <Reveal className="relative block w-full overflow-hidden bg-slate-100">
            {/* GAMBAR HERO — TINGGI DIPERKECIL DARI FULL SCREEN */}
            <img
              src="/images/Program_kerja/polsrifess.webp"
              alt="Tampilan Polsrifess"
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
                    Platform berbasis media sosial yang dikelola BEM Polsri
                    sebagai wadah berbagi cerita, opini, keresahan, maupun
                    informasi seputar kampus secara anonim - dibangun untuk
                    komunikasi dua arah yang santai namun tetap aktif dan
                    bertanggung jawab.
                  </p>

                  {/* TOMBOL AKSI */}
                  <div className="mt-5 sm:mt-6">
                    <a
                      href={MENFESS_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-full bg-amber-500 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-amber-500/30 outline-none transition-all duration-200 ease-out hover:bg-amber-600 hover:shadow-amber-500/40 active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-amber-400/70"
                    >
                      <Send size={18} />
                      Kunjungi Polsrifess
                      <ExternalLink size={18} />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </section>

        {/* STATISTIK — marquee bergulir otomatis, TIDAK DIUBAH */}
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
                  <div
                    key={index}
                    className="flex items-center gap-5 px-2 py-3"
                  >
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

        {/* CARA PENGGUNAAN — TIDAK DIUBAH */}
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

        {/* PANDUAN / ATURAN — TIDAK DIUBAH */}
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
                      <Ban
                        size={16}
                        className="mt-0.5 shrink-0 text-amber-400"
                      />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
        </section>

        {/* CTA PANDUAN LENGKAP — TIDAK DIUBAH */}
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