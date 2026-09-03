import { Link } from "react-router-dom";
import { Mail, Instagram, Youtube } from "lucide-react";

export default function Footer() {
  return (
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
  );
}
