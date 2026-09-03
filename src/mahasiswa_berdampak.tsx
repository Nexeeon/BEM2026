import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";
import {
  ChevronDown,
  Instagram,
  Mail,
  Menu,
  X,
  Youtube,
  Sparkles,
} from "lucide-react";

type DropdownName = "academic" | "echo" | null;

export default function MahasiswaBerdampak() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<DropdownName>(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
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
        {/* NAVBAR FULL-WIDTH — MASTER */}
        <Navbar />

        {/* HERO SECTION */}
        <section className="relative flex flex-1 flex-col items-center justify-center px-5 py-20 lg:py-28 overflow-hidden text-center">
          <div className="relative z-10 mx-auto w-full max-w-4xl flex flex-col items-center">
            {/* BADGE */}
           

            {/* SUBTITLE */}
            <p className="text-xs sm:text-sm font-semibold uppercase tracking-[0.25em] text-slate-600 mb-6">
              COME! WE ARE PREPARING SOMETHING SPECIAL FOR YOU!
            </p>

            {/* COMING SOON TYPOGRAPHY & TICKER MARQUEE DENGAN ORANGE/GOLD DARI TAMPILAN ABOUT */}
            <div className="relative w-full py-6 flex flex-col items-center justify-center my-2">
              <h1 className="font-serif text-5xl sm:text-7xl lg:text-9xl font-black tracking-tight text-[#d97706] uppercase drop-shadow-sm select-none z-0">
                COMING
              </h1>

              {/* TICKER MARQUEE WARNA EMAS ORANGE SESUAI JUDUL ABOUT */}
              <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 -rotate-3 sm:-rotate-2 bg-[#d97706] py-3 sm:py-4 shadow-xl border-y-2 border-amber-400 z-20 overflow-hidden whitespace-nowrap flex items-center">
                <div className="animate-marquee flex gap-6 text-xs sm:text-sm font-black uppercase tracking-[0.2em] text-white px-4">
                  <span>✦ MAHASISWA BERDAMPAK ✦ COMING SOON</span>
                  <span>✦ BEM POLSRI ✦ KABINET KILAU GEMILANG</span>
                  <span>✦ STAY TUNED ✦ MAHASISWA BERDAMPAK ✦ COMING SOON</span>
                  <span>✦ BEM POLSRI ✦ KABINET KILAU GEMILANG</span>
                </div>
              </div>

              <h1 className="font-serif text-5xl sm:text-7xl lg:text-9xl font-black tracking-tight text-[#d97706] uppercase drop-shadow-sm select-none z-10 mt-1 sm:mt-2">
                SOON
              </h1>
            </div>

            {/* DESKRIPSI */}
            <p className="mt-8 max-w-xl text-sm sm:text-base font-medium text-slate-700 leading-relaxed">
              Kami sedang menyiapkan wadah apresiasi khusus untuk menampilkan
              rekam jejak, karya inovatif, serta kontribusi nyata mahasiswa
              Politeknik Negeri Sriwijaya bagi kampus dan masyarakat.
            </p>

            <div className="mt-10 flex flex-col sm:flex-row items-center gap-4">
              <Link
                to="/"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-slate-900 px-6 py-3.5 text-xs font-bold uppercase tracking-wider text-white shadow-lg shadow-slate-900/10 transition-all duration-200 hover:bg-amber-700 hover:shadow-amber-700/20 active:scale-95"
              >
                Kembali ke Beranda
              </Link>
            </div>

            <p className="mt-8 text-xs font-semibold tracking-wider uppercase text-slate-500">
              STAY WITH US FOR MORE UPDATES
            </p>
          </div>
        </section>

        {/* FOOTER */}
        <footer
          id="footer"
          className="mt-auto bg-slate-950 px-5 pb-8 pt-16 text-white lg:px-8"
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
                  <a href="/about" className="hover:text-white transition-all">
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
                  <Mail size={16} className="mt-1 shrink-0 text-amber-400" />
                  bem@polsri.ac.id
                </p>
                <p className="mt-3 text-sm leading-6 text-slate-400">
                  Jl. Srijaya Negara, Bukit Besar, Palembang
                </p>
                <div className="mt-5 flex gap-2">
                  <a
                    href="https://www.instagram.com/bempolsri_/"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Instagram"
                    className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-800 text-slate-300 hover:bg-amber-500 hover:text-white transition-all"
                  >
                    <Instagram size={16} />
                  </a>
                  <a
                    href="https://x.com/polsrimenfess"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="X Twitter"
                    className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-800 text-xs font-black text-slate-300 hover:bg-amber-500 hover:text-white transition-all"
                  >
                    𝕏
                  </a>
                  <a
                    href="https://www.youtube.com/@bemkmpolsri3259"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="YouTube"
                    className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-800 text-slate-300 hover:bg-amber-500 hover:text-white transition-all"
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
