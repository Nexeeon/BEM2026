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
  Scale,
  Users,
  X,
  Youtube,
} from "lucide-react";

type DropdownName = "academic" | "echo" | null;

// Data untuk card "MENGAPA KAJIAN?"
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
  const [openDropdown, setOpenDropdown] = useState<DropdownName>(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleDropdown = (name: Exclude<DropdownName, null>) => {
    setOpenDropdown(openDropdown === name ? null : name);
  };

  return (
    <main className="min-h-screen bg-[url('/images/bgweb.jpeg')] bg-cover bg-fixed bg-center bg-no-repeat text-slate-900 scroll-smooth overflow-x-hidden">
      <div className="min-h-screen bg-white/65">
        {/* ============================================================ */}
        {/* HEADER / NAVBAR */}
        {/* ============================================================ */}
        <header
          className={`sticky top-0 z-50 transition-all duration-300 ${
            scrolled || mobileOpen
              ? "border-b border-amber-100 bg-white/90 shadow-sm backdrop-blur-md py-3.5"
              : "bg-transparent py-5"
          }`}
        >
          <div className="mx-auto flex max-w-7xl items-center justify-between px-5 lg:px-8">
            <Link
              to="/"
              className="flex items-center gap-3"
              onClick={() => setMobileOpen(false)}
            >
              <img
                src="/images/logo.png"
                alt="Logo Kabinet Lentera Sriwijaya"
                className="h-10 w-10 object-contain"
              />
              <div className="leading-tight">
                <p className="font-bold tracking-tight text-slate-800">
                  Kabinet Lentera Sriwijaya
                </p>
                <p className="mt-0.5 text-[11px] font-medium uppercase tracking-[0.12em] text-slate-500">
                  BEM Politeknik Negeri Sriwijaya
                </p>
              </div>
            </Link>

            <button
              aria-label="Buka menu"
              className="rounded-lg p-2 text-slate-700 lg:hidden"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              {mobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

            <nav
              className={`${
                mobileOpen ? "absolute left-0 right-0 top-full flex" : "hidden"
              } flex-col gap-1 border-b border-amber-100 bg-white/95 px-5 py-4 shadow-md lg:static lg:flex lg:flex-row lg:items-center lg:gap-6 lg:border-0 lg:bg-transparent lg:p-0 lg:shadow-none`}
            >
              <Link
                to="/"
                className="font-medium text-slate-600 hover:text-amber-600 text-sm"
                onClick={() => setMobileOpen(false)}
              >
                Home
              </Link>
              <a
                href="#visi"
                className="font-medium text-slate-600 hover:text-amber-600 text-sm"
                onClick={() => setMobileOpen(false)}
              >
                About
              </a>

              <div className="relative">
                <button
                  className="font-medium text-slate-600 hover:text-amber-600 text-sm flex w-full items-center justify-between gap-1 py-1 lg:py-0"
                  onClick={() => toggleDropdown("academic")}
                >
                  Academic Information{" "}
                  <ChevronDown
                    size={14}
                    className={
                      openDropdown === "academic"
                        ? "rotate-180 transition-transform"
                        : "transition-transform"
                    }
                  />
                </button>
                {openDropdown === "academic" && (
                  <Dropdown
                    items={[
                      "Academic Calendar",
                      "Scholarship Info",
                      "Organisasi Mahasiswa",
                      "Mahasiswa Berdampak",
                    ]}
                  />
                )}
              </div>

              <div className="relative">
                <button
                  className="font-medium text-amber-600 hover:text-amber-700 text-sm flex w-full items-center justify-between gap-1 py-1 lg:py-0"
                  onClick={() => toggleDropdown("echo")}
                >
                  Campus Echo{" "}
                  <ChevronDown
                    size={14}
                    className={
                      openDropdown === "echo"
                        ? "rotate-180 transition-transform"
                        : "transition-transform"
                    }
                  />
                </button>
                {openDropdown === "echo" && (
                  <div className="static mt-1 w-full rounded-xl border border-amber-100 bg-white p-2 shadow-xl lg:absolute lg:left-0 lg:top-full lg:mt-2 lg:w-56">
                    <Link
                      to="/kajian"
                      className="block rounded-lg px-3 py-2.5 text-xs font-semibold text-amber-600 transition hover:bg-amber-50"
                      onClick={() => {
                        setMobileOpen(false);
                        setOpenDropdown(null);
                      }}
                    >
                      Kajian
                    </Link>
                    <a
                      href="#"
                      className="block rounded-lg px-3 py-2.5 text-xs font-semibold text-slate-600 transition hover:bg-amber-50 hover:text-amber-700"
                      onClick={(e) => e.preventDefault()}
                    >
                      Bisik Kampus
                    </a>
                    <a
                      href="#"
                      className="block rounded-lg px-3 py-2.5 text-xs font-semibold text-slate-600 transition hover:bg-amber-50 hover:text-amber-700"
                      onClick={(e) => e.preventDefault()}
                    >
                      Polsrifess
                    </a>
                  </div>
                )}
              </div>

              <Link
                to="/contact"
                className="font-medium text-slate-600 hover:text-amber-600 text-sm"
                onClick={() => setMobileOpen(false)}
              >
                Contact Us
              </Link>
            </nav>
          </div>
        </header>

        {/* ============================================================ */}
        {/* 1. HERO SECTION - KAJIAN */}
        {/* ============================================================ */}
        <section className="relative mx-auto flex min-h-[60vh] w-full max-w-7xl items-center px-[clamp(1.25rem,4vw,3.5rem)] py-[clamp(2rem,5vh,5rem)]">
          <div className="grid w-full items-center gap-[clamp(2rem,4vw,5rem)] lg:grid-cols-12">
            {/* Teks Kiri */}
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

              {/* TOMBOL KE ZAAP */}
              <div className="mt-6">
                <a
                  href="https://zaap.bio/kajianbempolsri25"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-amber-500 px-8 py-3.5 text-sm font-bold text-white shadow-lg shadow-amber-500/30 transition hover:bg-amber-600 hover:shadow-amber-500/40 hover:-translate-y-0.5"
                >
                  <BookOpen size={18} />
                  Lihat Kajian Sekarang
                  <ArrowRight size={18} />
                </a>
              </div>
            </div>

            {/* FRAME FOTO KOSONG DI SAMPING KANAN */}
            <div className="relative flex w-full items-center justify-center lg:col-span-6 lg:justify-end">
              <div className="relative flex w-full items-center justify-center">
                <div
                  className="absolute right-0 top-1/2 -translate-y-1/2 rounded-full bg-gradient-to-tr from-amber-400/20 via-orange-300/15 to-amber-200/30 blur-2xl pointer-events-none"
                  style={{
                    width: "clamp(260px, 38vw, 540px)",
                    height: "clamp(260px, 38vw, 540px)",
                  }}
                />

                <div className="relative z-10 flex h-auto w-full flex-col items-center justify-center">
                  <div
                    className="w-full max-w-md rounded-3xl border-2 border-dashed border-amber-300/60 bg-white/40 backdrop-blur-sm shadow-xl transition hover:shadow-2xl hover:-translate-y-1 duration-300 flex items-center justify-center"
                    style={{ aspectRatio: "4/3" }}
                  >
                    <div className="text-center p-8">
                      <div className="text-amber-300/60 text-6xl mb-3">🖼️</div>
                      <p className="text-sm font-medium text-slate-400">
                        Foto Kampus
                      </p>
                      <p className="text-xs text-slate-300 mt-1">
                        (Segera hadir)
                      </p>
                      <div className="mt-4 flex justify-center gap-2">
                        <span className="w-12 h-0.5 bg-amber-200/50 rounded-full"></span>
                        <span className="w-6 h-0.5 bg-amber-300/70 rounded-full"></span>
                        <span className="w-12 h-0.5 bg-amber-200/50 rounded-full"></span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ============================================================ */}
        {/* 2. MENGAPA KAJIAN? SECTION */}
        {/* ============================================================ */}
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
                  className="group rounded-3xl border border-slate-200 bg-white/90 p-8 backdrop-blur-sm transition duration-300 hover:-translate-y-1 hover:border-amber-300 hover:shadow-xl hover:shadow-amber-900/5"
                >
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-amber-50 text-amber-600 transition group-hover:bg-amber-500 group-hover:text-white">
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

        {/* ============================================================ */}
        {/* 3. CTA SECTION - BERGABUNG DENGAN KAJIAN */}
        {/* ============================================================ */}
        <section className="bg-gradient-to-br from-amber-50 via-white to-amber-50/50 px-5 py-20 lg:px-8 lg:py-28">
          <div className="mx-auto max-w-4xl text-center">
            <div className="rounded-3xl border border-amber-300/40 bg-white/80 p-8 backdrop-blur-md shadow-xl transition hover:shadow-2xl duration-300 sm:p-12">
              <BookOpen size={48} className="text-amber-500 mx-auto mb-4" />
              <h2 className="text-3xl font-black tracking-tight text-slate-900 sm:text-4xl">
                BERGABUNG DENGAN KAJIAN
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-slate-600">
                Akses kajian-kajian terbaru dari Departemen KASTRAT BEM POLSRI
                dan temukan wawasan baru dari isu-isu yang sedang hangat.
                Setiap kajian tersedia dalam format PDF untuk dibaca kapan
                saja.
              </p>
              {/* TOMBOL KE ZAAP */}
              <a
                href="https://zaap.bio/kajianbempolsri25"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-8 inline-flex items-center gap-3 rounded-full bg-amber-500 px-10 py-4 text-sm font-bold text-white shadow-lg shadow-amber-500/30 transition hover:bg-amber-600 hover:shadow-amber-500/40 hover:-translate-y-0.5"
              >
                <BookOpen size={18} />
                LIHAT KAJIAN SEKARANG
                <ArrowRight size={18} />
              </a>
            </div>
          </div>
        </section>

        {/* ============================================================ */}
        {/* FOOTER */}
        {/* ============================================================ */}
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
                    <h2 className="font-bold">Kabinet Lentera Sriwijaya</h2>
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
                  <a href="/#visi" className="transition hover:text-white">
                    Tentang Kami
                  </a>
                  <a href="/#agenda" className="transition hover:text-white">
                    Agenda Kegiatan
                  </a>
                  <Link to="/contact" className="transition hover:text-white">
                    Contact Us
                  </Link>
                </div>
              </div>
              <div>
                <h3 className="text-xs font-black uppercase tracking-widest text-amber-400">
                  Mari Terhubung
                </h3>
                <p className="mt-5 flex items-start gap-2 text-sm leading-6 text-slate-400">
                  <Mail size={16} className="mt-1 shrink-0 text-amber-400" />{" "}
                  bem@polsri.ac.id
                </p>
                <p className="mt-3 text-sm leading-6 text-slate-400">
                  Jl. Srijaya Negara, Bukit Besar,
                  <br />
                  Palembang, Sumatera Selatan
                </p>
                <div className="mt-5 flex gap-2">
                  <a
                    href="https://www.instagram.com/bempolsri_?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Instagram"
                    className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-800 text-slate-300 transition hover:bg-amber-500 hover:text-white"
                  >
                    <Instagram size={16} />
                  </a>
                  <a
                    href="https://x.com/polsrimenfess"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="X Twitter"
                    className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-800 text-slate-300 font-bold transition hover:bg-amber-500 hover:text-white"
                  >
                    𝕏
                  </a>
                  <a
                    href="https://www.youtube.com/@bemkmpolsri3259"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="YouTube"
                    className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-800 text-slate-300 transition hover:bg-amber-500 hover:text-white"
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

// ============================================================
// KOMPONEN DROPDOWN
// ============================================================
function Dropdown({ items }: { items: string[] }) {
  return (
    <div className="static mt-1 w-full rounded-xl border border-amber-100 bg-white p-2 shadow-xl lg:absolute lg:left-0 lg:top-full lg:mt-2 lg:w-56">
      {items.map((item) => (
        <a
          href="#"
          key={item}
          className="block rounded-lg px-3 py-2.5 text-xs font-semibold text-slate-600 transition hover:bg-amber-50 hover:text-amber-700"
          onClick={(e) => e.preventDefault()}
        >
          {item}
        </a>
      ))}
    </div>
  );
}