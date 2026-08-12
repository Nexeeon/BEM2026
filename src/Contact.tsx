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
} from "lucide-react";

type DropdownName = "academic" | "echo" | null;

export default function Contact() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] =
    useState<DropdownName>(null);
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
    <main className="min-h-screen bg-[url('/images/bgweb.jpeg')] bg-cover bg-fixed bg-center bg-no-repeat text-slate-900 flex flex-col justify-between">
      <div className="min-h-screen bg-white/75 backdrop-blur-[2px] flex flex-col justify-between">
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
                className="font-medium text-slate-600 hover:text-amber-600 text-sm"
                onClick={() => setMobileOpen(false)}
              >
                Home
              </Link>

              <Link
                to="/#visi"
                className="font-medium text-slate-600 hover:text-amber-600 text-sm"
                onClick={() => setMobileOpen(false)}
              >
                About
              </Link>

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
                className="font-medium text-amber-600 hover:text-amber-700 text-sm"
                onClick={() => setMobileOpen(false)}
              >
                Contact Us
              </Link>
            </nav>
          </div>
        </header>

        {/* CONTENT CONTACT PAGE */}
        <div className="relative py-16 px-6 lg:px-12 flex items-center justify-center my-auto">
          <div className="mx-auto w-full max-w-6xl">
            {/* HEADER SECTION */}
            <div className="mb-14 text-center">
              <p className="text-base font-serif text-amber-600 mb-1 tracking-wide">
                Hubungi Kami
              </p>

              <h1 className="font-serif text-5xl md:text-6xl font-normal text-amber-500 mb-6">
                Contact Us
              </h1>

              <p className="mx-auto max-w-3xl text-sm md:text-base leading-relaxed text-slate-700 font-normal">
                Kami dari BEM POLSRI siap mendengarkan suara dan aspirasi
                kalian. Apapun yang ingin disampaikan—baik kritik, saran,
                pertanyaan, maupun kerja sama, kalian bisa langsung hubungi kami
                lewat kontak yang tersedia.
              </p>
            </div>

            {/* CONTENT SECTION */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              {/* LOGO */}
              <div className="lg:col-span-4 flex justify-center">
                <img
                  src="/images/logo.png"
                  alt="Logo BEM POLSRI"
                  className="w-60 md:w-72 lg:w-80 object-contain drop-shadow-md"
                />
              </div>

              {/* INFORMASI KONTAK */}
              <div className="lg:col-span-5 flex flex-col justify-center space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-6">
                  <div className="flex items-start gap-3.5">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-slate-100 text-amber-600 shadow-sm">
                      <HomeIcon
                        size={20}
                        className="fill-amber-600 text-amber-600"
                      />
                    </div>

                    <div>
                      <h3 className="text-sm font-bold text-slate-800">
                        Alamat
                      </h3>

                      <p className="mt-0.5 text-xs text-slate-600">
                        Jl. Srijaya Negara, Bukit Lama.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3.5">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-slate-100 text-amber-600 shadow-sm">
                      <Phone
                        size={18}
                        className="fill-amber-600 text-amber-600"
                      />
                    </div>

                    <div>
                      <h3 className="text-sm font-bold text-slate-800">
                        Kontak Humas
                      </h3>

                      <p className="mt-0.5 text-xs text-slate-600">
                        +62 822 89132699 (Indra)
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3.5">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-slate-100 text-amber-600 shadow-sm">
                      <Mail
                        size={18}
                        className="fill-amber-600 text-amber-600"
                      />
                    </div>

                    <div>
                      <h3 className="text-sm font-bold text-slate-800">
                        Email
                      </h3>

                      <a
                        href="mailto:bem@polsri.ac.id"
                        className="mt-0.5 block text-xs text-slate-600 hover:underline"
                      >
                        bem@polsri.ac.id
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-3.5">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-slate-100 text-amber-600 shadow-sm">
                      <Globe size={20} className="text-amber-600" />
                    </div>

                    <div>
                      <h3 className="text-sm font-bold text-slate-800">
                        More Information
                      </h3>

                      <p className="mt-0.5 text-xs text-slate-600">
                        About Us
                      </p>
                    </div>
                  </div>
                </div>

                {/* MEDIA SOSIAL */}
                <div className="flex items-center gap-2.5 pt-2">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-100 text-amber-600">
                    <Share2 size={16} />
                  </div>

                  <a
                    href="https://www.instagram.com/bempolsri_/"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Instagram BEM POLSRI"
                    className="flex h-9 w-9 items-center justify-center rounded-full bg-amber-600 text-white shadow hover:bg-amber-700 transition"
                  >
                    <Instagram size={16} />
                  </a>

                  <a
                    href="https://www.youtube.com/@BEMKMPOLSRI"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="YouTube BEM KM POLSRI"
                    className="flex h-9 w-9 items-center justify-center rounded-full bg-amber-600 text-white shadow hover:bg-amber-700 transition"
                  >
                    <Youtube size={16} />
                  </a>

                  <a
                    href="https://x.com/polsrimenfess"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="X Polsri Menfess"
                    className="flex h-9 w-9 items-center justify-center rounded-full bg-amber-600 text-white font-bold text-xs shadow hover:bg-amber-700 transition"
                  >
                    𝕏
                  </a>
                </div>
              </div>

              {/* QR CODE */}
              <div className="lg:col-span-3 flex flex-col items-center justify-center">
                <div className="bg-white/90 p-5 rounded-2xl border border-amber-200/80 shadow-md backdrop-blur-md flex flex-col items-center text-center">
                  <img
                    src="/images/qrbem.png"
                    alt="QR BEM POLSRI"
                    className="w-40 h-40 object-contain rounded-lg border border-slate-100"
                  />

                  <div className="mt-3 flex items-center gap-1.5 text-amber-600 font-bold text-xs">
                    <QrCode size={14} />
                    <span>Scan untuk Informasi</span>
                  </div>

                  <p className="text-[11px] text-slate-500 mt-1">
                    Akses cepat ke tautan resmi BEM POLSRI
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

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
                  <Link
                    to="/#visi"
                    className="transition hover:text-white"
                  >
                    Tentang Kami
                  </Link>

                  <Link
                    to="/#agenda"
                    className="transition hover:text-white"
                  >
                    Agenda Kegiatan
                  </Link>

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
                    href="https://www.youtube.com/@BEMKMPOLSRI"
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
                © 2026 BEM Politeknik Negeri Sriwijaya. All rights reserved.
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
      {items.map((item) => {
        const isKajian = item === "Kajian";

        return (
          <Link
            to={isKajian ? "/kajian" : "/#agenda"}
            key={item}
            className="block rounded-lg px-3 py-2.5 text-xs font-semibold text-slate-600 transition hover:bg-amber-50 hover:text-amber-700"
          >
            {item}
          </Link>
        );
      })}
    </div>
  );
}
