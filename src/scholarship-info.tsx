import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  Instagram,
  Mail,
  Youtube,
  ArrowUpRight,
  CalendarClock,
} from "lucide-react";

type DropdownName = "academic" | "echo" | null;

type Scholarship = {
  id: string;
  name: string;
  category: string;
  description: string;
  link: string;
  deadline?: string;
  image: string;
};

const scholarships: Scholarship[] = [
  {
    id: "bi",
    name: "Beasiswa Bank Indonesia",
    category: "Beasiswa Instansi Pemerintah",
    description:
      "Diselenggarakan oleh Bank Indonesia untuk mahasiswa aktif minimal semester 2 dengan IPK ≥ 3.00. Penerima akan tergabung dalam komunitas GenBI dan mendapatkan pembinaan kepemimpinan, pelatihan soft skill, serta kesempatan berjejaring dengan sesama penerima se-Indonesia. Program ini menjadi langkah awal untuk mencetak generasi muda yang unggul dan berdaya saing dalam pembangunan nasional.",
    link: "https://www.bi.go.id/id/default.aspx",
    image: "/images/beasiswa/Logo Bank Indonesia.jpg",
  },
  {
    id: "kse",
    name: "Beasiswa Karya Salemba Empat",
    category: "Beasiswa Yayasan",
    description:
      "Diselenggarakan oleh Yayasan Karya Salemba Empat bagi mahasiswa semester ≥2 dari keluarga kurang mampu. Selain tunjangan hidup Rp750.000/bulan selama 1 tahun, penerima juga mendapat pelatihan soft skill, akses jaringan alumni nasional, dan pendampingan pengembangan karakter. KSE mendorong mahasiswa POLSRI untuk tumbuh menjadi individu yang aktif, mandiri, dan siap menghadapi tantangan masa depan.",
    link: "https://beasiswa.or.id/",
    image: "/images/beasiswa/logo-Karya-Salemba-Empat-KSE.jpg",
  },
  {
    id: "kip",
    name: "Beasiswa KIP-Kuliah",
    category: "Beasiswa Pemerintah",
    description:
      "Program pemerintah bagi mahasiswa baru dari keluarga tidak mampu namun berprestasi, mencakup pembebasan biaya kuliah penuh dan bantuan biaya hidup hingga lulus. KIP-Kuliah membuka akses pendidikan tinggi tanpa hambatan finansial, sekaligus mendukung POLSRI mencetak lulusan yang unggul, berdaya saing, dan siap membangun bangsa.",
    link: "https://kip-kuliah.kemdiktisaintek.go.id/",
    image: "/images/beasiswa/KIP BELAKANG.jpeg",
  },
  {
    id: "smart",
    name: "Smart Scholarship",
    category: "Beasiswa YBM BRILiaN",
    description:
      "Program pendayagunaan zakat YBM BRILiaN di bidang pendidikan bagi mahasiswa D3/D4/S1 berprestasi dari keluarga kurang mampu. Benefit yang didapat meliputi subsidi UKT 2 semester, jejaring nasional & internasional, mentoring, serta pengalaman pemberdayaan masyarakat untuk membentuk SDM yang unggul dan berkarakter.",
    link: "https://brilianscholarship.id/login",
    deadline: "Pendaftaran hingga 24 Oktober 2025",
    image: "/images/beasiswa/Smart Scholarship.jpg",
  },
];

export default function ScholarshipInfo() {
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress: heroScrollProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const heroY = useTransform(heroScrollProgress, [0, 1], [0, -80]);
  const heroOpacity = useTransform(heroScrollProgress, [0, 0.75, 1], [1, 0.4, 0]);

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
    <main className="relative min-h-screen overflow-x-clip bg-[url('/images/bgweb.webp')] bg-cover bg-fixed bg-center bg-no-repeat pt-[72px] text-slate-900 scroll-smooth">
      <div className="min-h-screen bg-white/65">
        {/* =========================================================
            NAVBAR — MASTER
        ========================================================= */}
        <Navbar />

        {/* =========================================================
            HERO / INTRO SECTION
        ========================================================= */}
        <motion.section
          ref={heroRef}
          style={{ opacity: heroOpacity, y: heroY }}
          className="relative px-5 pb-10 pt-16 lg:px-8 lg:pb-14 lg:pt-24"
        >
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="mx-auto max-w-4xl text-center"
          >
            <p className="mb-5 text-xs font-semibold uppercase tracking-[0.25em] text-slate-600 sm:text-sm">
              Academic Information
            </p>

            <h1 className="font-serif text-4xl font-black tracking-tight text-amber-500 sm:text-5xl lg:text-6xl">
              Informasi Beasiswa
            </h1>

            <p className="mx-auto mt-6 max-w-xl text-sm font-medium leading-relaxed text-slate-700 sm:text-base">
              Kumpulan peluang beasiswa dan bantuan pendanaan studi yang bisa
              diakses mahasiswa Politeknik Negeri Sriwijaya, mulai dari
              program pemerintah hingga yayasan dan lembaga mitra kampus.
            </p>
          </motion.div>
        </motion.section>

        {/* =========================================================
            SCHOLARSHIP LIST
        ========================================================= */}
        <section className="relative px-5 pb-20 lg:px-8 lg:pb-28">
          <div className="mx-auto flex max-w-5xl flex-col gap-6">
            {scholarships.map((item, index) => {
              const reversed = index % 2 === 1;

              return (
                <motion.article
                  key={item.id}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: false, amount: 0.2 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="group overflow-hidden rounded-2xl border border-amber-900/10 bg-white/70 shadow-sm backdrop-blur-sm transition-all duration-200 ease-out hover:border-amber-900/20 hover:shadow-md"
                >
                  <div
                    className={`flex flex-col ${
                      reversed ? "md:flex-row-reverse" : "md:flex-row"
                    }`}
                  >
                    {/* VISUAL IMAGE PANEL */}
                    <div className="relative flex h-60 w-full shrink-0 items-center justify-center p-4 md:h-auto md:w-64">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="h-full w-full object-contain object-center transition-transform duration-300 ease-out group-hover:scale-105"
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
                </motion.article>
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
              <p>© Departemen Media Informasi BEM Politeknik Negeri Sriwijaya. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </div>
    </main>
  );
}