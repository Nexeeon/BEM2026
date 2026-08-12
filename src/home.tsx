import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  CalendarDays,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Compass,
  Instagram,
  Lightbulb,
  Mail,
  Megaphone,
  Menu,
  Scale,
  Target,
  Users,
  X,
  Youtube,
} from "lucide-react";

type DropdownName = "academic" | "echo" | null;

const missions = [
  {
    icon: Compass,
    number: "01",
    text: "Mewadahi dan memperjuangkan aspirasi mahasiswa secara terbuka, responsif, dan bertanggung jawab melalui mekanisme penyerapan aspirasi yang aktif, dialogis, dan berkelanjutan.",
  },
  {
    icon: Lightbulb,
    number: "02",
    text: "Mendorong peningkatan kualitas pembelajaran organisasi dan kepemimpinan mahasiswa melalui program pengembangan soft skill, manajerial, dan profesionalisme yang terarah.",
  },
  {
    icon: Scale,
    number: "03",
    text: "Mengembangkan budaya kajian dan advokasi yang konstruktif dan solutif sebagai landasan pengambilan sikap BEM terhadap isu-isu yang ada.",
  },
  {
    icon: Users,
    number: "04",
    text: "Memperkuat sinergi dan kolaborasi internal maupun eksternal melalui kerja sama antar lembaga mahasiswa serta partisipasi aktif dalam kegiatan yang berdampak positif.",
  },
  {
    icon: Megaphone,
    number: "05",
    text: "Meningkatkan kualitas dan kuantitas informasi yang disajikan kepada mahasiswa dan masyarakat melalui berbagai media.",
  },
];

const events = [
  {
    day: "12",
    month: "MAR",
    title: "Pilmapres Polsri 2026",
    type: "Kompetisi",
    color: "bg-amber-400",
  },
  {
    day: "18",
    month: "MAR",
    title: "Polsri Cup Vol. 4",
    type: "Olahraga",
    color: "bg-orange-500",
  },
  {
    day: "26",
    month: "MAR",
    title: "PPK ORMAWA",
    type: "Kemahasiswaan",
    color: "bg-slate-800",
  },
  {
    day: "04",
    month: "APR",
    title: "Program Mahasiswa Wirausaha",
    type: "Pengembangan",
    color: "bg-yellow-500",
  },
];

export default function Home() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] =
    useState<DropdownName>(null);
  const [selectedMonth, setSelectedMonth] = useState("Maret 2026");
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
        {/* HEADER / NAVBAR */}
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
                mobileOpen
                  ? "absolute left-0 right-0 top-full flex"
                  : "hidden"
              } flex-col gap-1 border-b border-amber-100 bg-white/95 px-5 py-4 shadow-md lg:static lg:flex lg:flex-row lg:items-center lg:gap-6 lg:border-0 lg:bg-transparent lg:p-0 lg:shadow-none`}
            >
              <Link
                to="/"
                className="font-medium text-amber-600 hover:text-amber-700 text-sm"
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

              {/* ACADEMIC INFORMATION */}
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

              {/* CAMPUS ECHO */}
              <div className="relative">
                <button
                  className="font-medium text-slate-600 hover:text-amber-600 text-sm flex w-full items-center justify-between gap-1 py-1 lg:py-0"
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
                    {/* KAJIAN */}
                    <Link
                      to="/kajian"
                      className="block rounded-lg px-3 py-2.5 text-xs font-semibold text-slate-600 transition hover:bg-amber-50 hover:text-amber-700"
                      onClick={() => {
                        setMobileOpen(false);
                        setOpenDropdown(null);
                      }}
                    >
                      Kajian
                    </Link>

                    {/* BISIK KAMPUS */}
                    <Link
                      to="/bisik-kampus"
                      className="block rounded-lg px-3 py-2.5 text-xs font-semibold text-slate-600 transition hover:bg-amber-50 hover:text-amber-700"
                      onClick={() => {
                        setMobileOpen(false);
                        setOpenDropdown(null);
                      }}
                    >
                      Bisik Kampus
                    </Link>

                    {/* POLSRIFESS */}
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

        {/* HERO SECTION */}
        <section
          id="home"
          className="relative mx-auto flex min-h-[calc(100vh-85px)] w-full max-w-7xl items-center justify-center px-[clamp(1.25rem,4vw,3.5rem)] py-[clamp(1.5rem,3.5vh,4rem)]"
        >
          <div className="grid w-full items-center gap-[clamp(1.5rem,3.5vw,4rem)] lg:grid-cols-12">
            <div className="relative z-10 flex flex-col items-start justify-center text-left lg:col-span-6">
              <h1
                className="font-serif font-black uppercase tracking-wide text-amber-500 leading-[1.12]"
                style={{ fontSize: "clamp(2.2rem, 4.5vw, 4rem)" }}
              >
                BEM POLITEKNIK NEGERI SRIWIJAYA
              </h1>

              <p
                className="mt-[clamp(1rem,1.8vw,1.75rem)] max-w-xl font-medium leading-relaxed text-slate-700"
                style={{ fontSize: "clamp(0.875rem, 1.1vw, 1.05rem)" }}
              >
                BEM Polsri adalah organisasi mahasiswa yang menjalankan fungsi
                eksekutif di lingkungan Politeknik Negeri Sriwijaya. Kami
                berkomitmen untuk menjadi wadah yang aktif, responsif, dan
                konstruktif melalui berbagai program kerja, pengabdian, serta
                pelayanan yang berdampak bagi mahasiswa dan masyarakat.
              </p>

              <div className="mt-[clamp(1.25rem,2.2vw,2.25rem)]"></div>
            </div>

            <div className="relative flex w-full items-center justify-center lg:col-span-6 lg:justify-end">
              <div className="relative flex w-full items-center justify-center">
                <div
                  className="absolute right-0 top-1/2 -translate-y-1/2 rounded-full bg-gradient-to-tr from-amber-400/20 via-orange-300/15 to-amber-200/30 blur-2xl pointer-events-none"
                  style={{
                    width: "clamp(260px, 38vw, 540px)",
                    height: "clamp(260px, 38vw, 540px)",
                  }}
                />

                <img
                  src="/images/logo.png"
                  alt="Gedung Politeknik Negeri Sriwijaya"
                  className="relative z-10 h-auto w-full object-contain filter drop-shadow-md transition-all duration-300"
                  style={{
                    width: "clamp(280px, 42vw, 580px)",
                    maxHeight: "clamp(320px, 58vh, 600px)",
                  }}
                />
              </div>
            </div>
          </div>
        </section>

        {/* VISI & MISI SECTION */}
        <section
          id="visi"
          className="bg-white/85 px-5 py-20 backdrop-blur-md lg:px-8 lg:py-28"
        >
          <div className="mx-auto max-w-7xl">
            <SectionIntro
              eyebrow="Arah Gerak Kami"
              title="Visi & Misi BEM Polsri — Kabinet Lentera Sriwijaya"
              text="Menjadi penerang bagi seluruh mahasiswa untuk bertumbuh, berkolaborasi, dan menciptakan perubahan yang berarti."
            />

            <div className="mt-14 grid gap-5 lg:grid-cols-[.8fr_1.2fr]">
              <div className="relative overflow-hidden rounded-3xl border border-amber-300/40 bg-gradient-to-br from-amber-50 via-white to-amber-50 p-8 shadow-xl backdrop-blur-md lg:p-10">
                <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full border-[25px] border-amber-500/20" />

                <div className="relative">
                  <div className="mb-8 flex items-center justify-between">
                    <span className="rounded-full bg-amber-400 px-3 py-1.5 text-[10px] font-black uppercase tracking-widest text-slate-900">
                      Visi
                    </span>

                    <Target className="text-amber-500" size={30} />
                  </div>

                  <h3 className="text-2xl font-bold leading-snug text-slate-900">
                    Menjadikan BEM Polsri sebagai lembaga{" "}
                    <span className="text-amber-600">berdampak positif</span>{" "}
                    bagi mahasiswa dan institusi.
                  </h3>

                  <p className="mt-7 text-sm leading-7 text-slate-600">
                    Menjadikan Badan Eksekutif Mahasiswa Politeknik Negeri
                    Sriwijaya sebagai lembaga yang berdampak positif bagi
                    Mahasiswa/i dan Institusi Politeknik Negeri Sriwijaya.
                  </p>
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                {missions.map((mission) => (
                  <article
                    key={mission.number}
                    className="group rounded-3xl border border-slate-200 bg-white/90 p-6 backdrop-blur-sm transition duration-300 hover:-translate-y-1 hover:border-amber-300 hover:shadow-xl hover:shadow-amber-900/5"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-amber-50 text-amber-600 transition group-hover:bg-amber-500 group-hover:text-white">
                        <mission.icon size={21} />
                      </div>

                      <span className="text-3xl font-black text-slate-200">
                        {mission.number}
                      </span>
                    </div>

                    <p className="mt-5 text-xs leading-6 text-slate-600">
                      {mission.text}
                    </p>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* AGENDA SECTION */}
        <section
          id="agenda"
          className="mx-auto max-w-7xl px-5 py-20 lg:px-8 lg:py-28"
        >
          <SectionIntro
            eyebrow="Catat Tanggalnya"
            title="Kalender Kegiatan & Akademik"
            text="Ikuti berbagai agenda penting dan kegiatan seru yang hadir untuk seluruh keluarga besar Politeknik Negeri Sriwijaya."
          />

          <div className="mt-12 grid gap-6 lg:grid-cols-[.78fr_1.22fr]">
            <div className="rounded-3xl bg-white/90 p-6 shadow-lg shadow-slate-900/5 backdrop-blur-md sm:p-8">
              <div className="flex items-center justify-between">
                <button
                  aria-label="Bulan sebelumnya"
                  onClick={() => setSelectedMonth("Februari 2026")}
                  className="rounded-full p-2 text-slate-500 transition hover:bg-amber-50 hover:text-amber-600"
                >
                  <ChevronLeft size={19} />
                </button>

                <div className="text-center">
                  <p className="text-xs font-bold uppercase tracking-widest text-amber-600">
                    Kalender Akademik
                  </p>

                  <h3 className="mt-1 text-xl font-black text-slate-900">
                    {selectedMonth}
                  </h3>
                </div>

                <button
                  aria-label="Bulan berikutnya"
                  onClick={() => setSelectedMonth("April 2026")}
                  className="rounded-full p-2 text-slate-500 transition hover:bg-amber-50 hover:text-amber-600"
                >
                  <ChevronRight size={19} />
                </button>
              </div>

              <div className="mt-8 grid grid-cols-7 gap-2 text-center text-[11px] font-bold text-slate-400">
                {["MIN", "SEN", "SEL", "RAB", "KAM", "JUM", "SAB"].map(
                  (day) => (
                    <span key={day}>{day}</span>
                  ),
                )}

                {Array.from({ length: 31 }, (_, index) => (
                  <span
                    key={index}
                    className={`flex aspect-square items-center justify-center rounded-lg text-sm ${
                      index + 1 === 12
                        ? "bg-amber-500 font-black text-white shadow-md shadow-amber-500/30"
                        : [18, 26].includes(index + 1)
                          ? "bg-amber-50 font-bold text-amber-700"
                          : "text-slate-600 hover:bg-slate-50"
                    }`}
                  >
                    {index + 1}
                  </span>
                ))}
              </div>

              <div className="mt-7 flex flex-wrap gap-4 border-t border-slate-100 pt-5 text-[11px] font-semibold text-slate-500">
                <span className="flex items-center gap-2">
                  <i className="h-2.5 w-2.5 rounded-full bg-amber-500" />
                  Agenda BEM
                </span>

                <span className="flex items-center gap-2">
                  <i className="h-2.5 w-2.5 rounded-full bg-amber-100" />
                  Akademik
                </span>
              </div>
            </div>

            <div className="rounded-3xl bg-slate-900/95 p-6 text-white shadow-lg shadow-slate-900/10 backdrop-blur-md sm:p-8">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest text-amber-400">
                    Agenda Terdekat
                  </p>

                  <h3 className="mt-1 text-2xl font-bold">
                    Jangan sampai terlewat.
                  </h3>
                </div>

                <CalendarDays className="text-amber-400" size={30} />
              </div>

              <div className="mt-7 space-y-3">
                {events.map((event) => (
                  <div
                    key={event.title}
                    className="group flex items-center gap-4 rounded-2xl border border-white/10 bg-white/5 p-3 transition hover:bg-white/10"
                  >
                    <div
                      className={`flex h-14 w-14 shrink-0 flex-col items-center justify-center rounded-xl text-slate-900 ${event.color}`}
                    >
                      <strong className="text-xl leading-none">
                        {event.day}
                      </strong>

                      <span className="mt-1 text-[9px] font-black tracking-widest">
                        {event.month}
                      </span>
                    </div>

                    <div className="min-w-0 flex-1">
                      <h4 className="truncate text-sm font-bold text-white">
                        {event.title}
                      </h4>

                      <p className="mt-1 text-xs text-slate-400">
                        {event.type}
                        <span className="mx-1 text-slate-600">•</span>
                        Polsri
                      </p>
                    </div>

                    <ArrowRight
                      size={16}
                      className="mr-2 text-slate-500 transition group-hover:translate-x-1 group-hover:text-amber-400"
                    />
                  </div>
                ))}
              </div>

              <button className="mt-6 flex items-center gap-2 text-xs font-bold text-amber-400 transition hover:text-amber-300">
                Lihat seluruh agenda <ArrowRight size={14} />
              </button>
            </div>
          </div>
        </section>

        {/* FOOTER */}
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

              <div>
                <h3 className="text-xs font-black uppercase tracking-widest text-amber-400">
                  Navigasi
                </h3>

                <div className="mt-5 grid gap-3 text-sm text-slate-400">
                  <a
                    href="#visi"
                    className="transition hover:text-white"
                  >
                    Tentang Kami
                  </a>

                  <a
                    href="#agenda"
                    className="transition hover:text-white"
                  >
                    Agenda Kegiatan
                  </a>

                  <Link
                    to="/contact"
                    className="transition hover:text-white"
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
                  <a
                    href="https://www.instagram.com/bempolsri_/"
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

function Dropdown({ items }: { items: string[] }) {
  return (
    <div className="static mt-1 w-full rounded-xl border border-amber-100 bg-white p-2 shadow-xl lg:absolute lg:left-0 lg:top-full lg:mt-2 lg:w-56">
      {items.map((item) => (
        <a
          href="#agenda"
          key={item}
          className="block rounded-lg px-3 py-2.5 text-xs font-semibold text-slate-600 transition hover:bg-amber-50 hover:text-amber-700"
        >
          {item}
        </a>
      ))}
    </div>
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

      <p className="mt-4 max-w-xl text-sm leading-7 text-slate-600">
        {text}
      </p>
    </div>
  );
}
