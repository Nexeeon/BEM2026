import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  ChevronDown,
  Compass,
  FileText,
  Instagram,
  Lightbulb,
  Mail,
  Menu,
  MessageCircle,
  Tag,
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

// ============================================================
// DATA CARD "KAJIAN TERBARU"
// ============================================================
const latestKajianData = [
  {
    title: "Sumsel Resah",
    category: "SOSIAL",
    date: "September 2026",
    cta: "Baca Kajian",
    link: "https://drive.google.com/file/d/144cj2wzBn_mZ_q2wiZWWSSpP7LFQtsHu/view",
  },
  {
    title: "Kajian Pelecehan Seksual Verbal di Kampus",
    category: "KAMPUS",
    date: "September 2026",
    cta: "Baca Kajian",
    link: "https://drive.google.com/file/d/1FmvbmADl2wqFN1ZZkPbiFmpqrnLF3g8V/view?usp=drive_link",
  },
  {
    title: "17 Agustus 1945 Bukan Sekadar Tanggal",
    category: "SEJARAH",
    date: "Agustus 2026",
    cta: "Lihat Kajian",
    link: "https://www.instagram.com/p/DcH9SZoCTl5/?utm_source=ig_web_button_share_sheet&stkn=MzRlODBiNWFlZA==",
  },
];

export default function Kajian() {
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress: heroScrollProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const heroY = useTransform(heroScrollProgress, [0, 1], [0, -100]);
  const heroOpacity = useTransform(heroScrollProgress, [0, 0.75, 1], [1, 0.4, 0]);
  const heroScale = useTransform(heroScrollProgress, [0, 1], [1, 0.96]);

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
    <main className="relative min-h-screen overflow-x-clip bg-[url('/images/bgweb.webp')] bg-cover bg-fixed bg-center bg-no-repeat pt-[72px] text-slate-900 scroll-smooth">
      {/* ======================================================== */}
      {/* OVERLAY BACKGROUND */}
      {/* ======================================================== */}
      <div className="min-h-screen bg-white/65">
        {/* ====================================================== */}
        {/* NAVBAR — MASTER */}
        {/* ====================================================== */}
        <Navbar />

        {/* ======================================================== */}
        {/* HERO SECTION - KAJIAN (DIRINGKAS, TEKS OVERLAY DI GAMBAR) */}
        {/* ======================================================== */}
        <motion.section
          ref={heroRef}
          style={{ opacity: heroOpacity, scale: heroScale, y: heroY }}
          className="relative w-full"
        >
          <div className="relative w-full overflow-hidden bg-slate-100">
            {/* GAMBAR HERO — TINGGI DIPERKECIL */}
            <img
              src="/images/Program_kerja/kajian.webp"
              alt="Banner Kajian BEM POLSRI"
              className="block h-[340px] w-full object-cover object-center sm:h-[420px] lg:h-[500px]"
            />

            {/* SCRIM GELAP DI BAWAH GAMBAR AGAR TEKS TERBACA */}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-transparent" />

            {/* KONTEN DI ATAS GAMBAR */}
            <div className="absolute inset-x-0 bottom-0">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: [0.21, 0.47, 0.32, 0.98] }}
                className="mx-auto flex max-w-7xl flex-col items-start px-5 pb-8 lg:px-8 lg:pb-12"
              >
                {/* DESKRIPSI PROGRAM */}
                <p className="max-w-3xl text-sm font-medium leading-relaxed text-white/90 sm:text-base">
                  Proses analisis isu-isu terkini baik internal kampus maupun
                  eksternal, dilakukan secara berkala oleh Departemen KASTRAT.
                  Platform ini menjadi wadah diskusi mendalam tentang fenomena
                  sosial, politik, dan akademik yang relevan dengan kehidupan
                  mahasiswa.
                </p>

                {/* TOMBOL AKSI */}
                <div className="mt-5 sm:mt-6">
                  <a
                    href="https://kajian-gules.vercel.app/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full bg-amber-500 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-amber-500/30 outline-none transition-all duration-200 ease-out hover:bg-amber-600 hover:shadow-amber-500/40 active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-amber-400/70"
                  >
                    <BookOpen size={18} />
                    Lihat Kajian Sekarang
                    <ArrowRight size={18} />
                  </a>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.section>

        {/* ======================================================== */}
        {/* MENGAPA KAJIAN? */}
        {/* ======================================================== */}
        <motion.section
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.15 }}
          transition={{ duration: 0.7, ease: [0.21, 0.47, 0.32, 0.98] }}
          className="bg-white/85 px-5 py-16 backdrop-blur-md lg:px-8 lg:py-20"
        >
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

            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {whyKajianData.map((item, index) => (
                <motion.article
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: false, amount: 0.2 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
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
                </motion.article>
              ))}
            </div>
          </div>
        </motion.section>

        {/* ======================================================== */}
        {/* KAJIAN TERBARU — EDITORIAL REDESIGN */}
        {/* ======================================================== */}
        <section
          style={{
            backgroundImage: "url('/images/bgkajian.png')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundAttachment: "fixed",
            backgroundRepeat: "no-repeat",
          }}
          className="relative px-5 py-16 lg:px-8 lg:py-24"
        >
          {/* Overlay tipis agar card tetap terbaca */}
          <div className="pointer-events-none absolute inset-0 bg-[#FFF8E7]/80 backdrop-blur-[2px]" />

          <div className="relative mx-auto max-w-7xl">
            {/* ── HEADING ROW ── */}
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <h2
                  className="text-3xl font-black tracking-tight text-[#111827] sm:text-4xl lg:text-5xl"
                  style={{ letterSpacing: "-0.02em" }}
                >
                  KAJIAN TERBARU
                </h2>
                <p className="mt-3 max-w-xl text-sm leading-7 text-[#111827]/60">
                  Beberapa publikasi terbaru dari BEM POLSRI. Klik untuk membaca kajian secara lengkap.
                </p>
              </div>

              {/* LIHAT SEMUA — desktop */}
              <a
                href="https://kajian-gules.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="hidden shrink-0 items-center gap-1.5 rounded-full border border-[#B8860B]/40 bg-white/80 px-5 py-2.5 text-[11px] font-bold uppercase tracking-widest text-[#B8860B] outline-none transition-all duration-200 ease-out hover:border-[#B8860B] hover:bg-[#FFF8E7] active:scale-[0.97] focus-visible:ring-2 focus-visible:ring-[#FFD700]/60 sm:inline-flex"
              >
                LIHAT SEMUA
                <ArrowUpRight size={13} strokeWidth={2.5} />
              </a>
            </div>

            {/* ── CARD GRID ── */}
            <div className="mt-10 grid gap-5 sm:grid-cols-1 lg:grid-cols-3">
              {latestKajianData.map((item, index) => (
                <motion.a
                  key={index}
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: false, amount: 0.2 }}
                  transition={{ duration: 0.45, delay: index * 0.08, ease: [0.21, 0.47, 0.32, 0.98] }}
                  whileHover={{ y: -5 }}
                  className="group flex flex-col justify-between rounded-[22px] border border-[#111827]/10 bg-[#FFF8E7] p-6 shadow-sm transition-[border-color,box-shadow] duration-200 ease-out hover:border-[#B8860B]/40 hover:shadow-md hover:shadow-[#B8860B]/10 sm:p-7"
                >
                  {/* ── TOP ROW: badge + icon ── */}
                  <div className="flex items-center justify-between">
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-[#B8860B]/25 bg-[#FFD700]/15 px-3 py-1 text-[10px] font-black uppercase tracking-widest text-[#B8860B]">
                      <Tag size={10} strokeWidth={2.5} />
                      {item.category}
                    </span>

                    <FileText
                      size={17}
                      strokeWidth={1.75}
                      className="text-[#111827]/20 transition-colors duration-200 group-hover:text-[#B8860B]/60"
                    />
                  </div>

                  {/* ── TITLE ── */}
                  <h3
                    className="mt-5 text-[15px] font-bold leading-snug text-[#111827] transition-colors duration-200 group-hover:text-[#B8860B]"
                    style={{ wordBreak: "break-word" }}
                  >
                    {item.title}
                  </h3>

                  {/* ── DIVIDER + FOOTER ── */}
                  <div className="mt-6">
                    <hr className="border-[#111827]/10" />
                    <div className="mt-4 flex items-center justify-between">
                      <span className="text-[11px] font-medium text-[#111827]/40">
                        {item.date}
                      </span>

                      <span className="inline-flex items-center gap-1 text-[11px] font-black tracking-wide text-[#B8860B]">
                        {item.cta}
                        <ArrowUpRight
                          size={12}
                          strokeWidth={2.5}
                          className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                        />
                      </span>
                    </div>
                  </div>
                </motion.a>
              ))}
            </div>

            {/* LIHAT SEMUA — mobile */}
            <a
              href="https://kajian-gules.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 flex items-center justify-center gap-1.5 rounded-full border border-[#B8860B]/40 bg-white/80 px-5 py-3 text-[11px] font-bold uppercase tracking-widest text-[#B8860B] outline-none transition-all duration-200 ease-out hover:border-[#B8860B] hover:bg-[#FFF8E7] active:scale-[0.97] focus-visible:ring-2 focus-visible:ring-[#FFD700]/60 sm:hidden"
            >
              LIHAT SEMUA
              <ArrowUpRight size={13} strokeWidth={2.5} />
            </a>
          </div>
        </section>

        {/* ======================================================== */}
        {/* CTA */}
        {/* ======================================================== */}
        <section className="px-5 py-16 lg:px-8 lg:py-20">
          <div className="mx-auto max-w-4xl text-center">
            <div className="rounded-3xl border border-amber-300/40 bg-white/90 p-8 shadow-xl backdrop-blur-md transition-all duration-300 ease-out hover:shadow-2xl sm:p-12">
              <BookOpen size={48} className="mx-auto mb-4 text-amber-500" />

              <h2 className="text-3xl font-black tracking-tight text-slate-900 sm:text-4xl">
                BERGABUNG DENGAN KAJIAN
              </h2>

              <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-slate-600">
                Akses kajian-kajian terbaru dari Departemen KASTRAT BEM POLSRI
                dan temukan wawasan baru dari isu-isu yang sedang hangat. Setiap
                kajian tersedia dalam format PDF untuk dibaca kapan saja.
              </p>

              <a
                href="https://kajian-gules.vercel.app/"
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
        {/* FOOTER — TIDAK DIUBAH */}
        {/* ======================================================== */}
        <footer className="bg-slate-950 px-5 pb-8 pt-16 text-white lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr] md:gap-8">
              {/* BRAND */}
              <div>
                <div className="flex items-center gap-3">
                  <img
                    src="/images/logo.webp"
                    alt="Logo BEM Polsri"
                    className="h-12 w-12 object-contain"
                  />

                  <div>
                    <h2 className="font-bold">KabinetKilau Gemilang</h2>

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
              <p>© Departemen Media Informasi BEM Politeknik Negeri Sriwijaya. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </div>
    </main>
  );
}