import React, { useState, useEffect, useRef, memo } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { BookOpen, Megaphone, Instagram, ChevronLeft, ChevronRight } from "lucide-react";

// ============================================================
// TYPE DEFINITIONS
// ============================================================
interface Anggota {
  nama: string;
  jabatan: string;
  foto: string;
  instagram?: string;
}

interface Divisi {
  id: string;
  icon: React.ReactNode;
  nama: string;
  deskripsi: string;
  anggota: Anggota[];
}

// ============================================================
// DATA PIMPINAN DEPARTEMEN
// ============================================================
const pimpinanKastrat: Anggota[] = [
  {
    nama: "Reza Sulistomo Marwah",
    jabatan: "Kepala Departemen Kajian dan Aksi Strategis",
    foto: "/images/kastrat/𝗞𝗲𝗽𝗮𝗹𝗮 𝗗𝗲𝗽𝗮𝗿𝘁𝗲𝗺𝗲𝗻 — 𝗥𝗲𝘇𝗮 𝗦𝘂𝗹𝗶𝘀𝘁𝗼𝗺𝗼 𝗠𝗮𝗿𝘄𝗮𝗵.png",
    instagram: "",
  },
  {
    nama: "Tasya Imanda",
    jabatan: "Sekretaris Departemen Kajian dan Aksi Strategis",
    foto: "/images/kastrat/𝗦𝗲𝗸𝗿𝗲𝘁𝗮𝗿𝗶𝘀 𝗗𝗲𝗽𝗮𝗿𝘁𝗲𝗺𝗲𝗻 — 𝗧𝗮𝘀𝘆𝗮 𝗜𝗺𝗮𝗻𝗱𝗮.png",
    instagram: "",
  },
];

// ============================================================
// DATA STRUKTURAL DIVISI KASTRAT
// ============================================================
const divisiList: Divisi[] = [
  {
    id: "kajian-strategis",
    icon: <BookOpen size={18} />,
    nama: "DIVISI KAJIAN STRATEGIS",
    deskripsi:
      "Bertanggung jawab dalam merumuskan, menganalisis, serta mengkaji isu-isu strategis kampus, daerah, maupun nasional guna memberikan pandangan serta rekomendasi kritis organisasi.",
    anggota: [
      {
        nama: "Kazia Dwi Frisma",
        jabatan: "Kepala Divisi Kajian Strategis",
        foto: "/images/kastrat/𝗗𝗶𝘃𝗶𝘀𝗶 𝗞𝗮𝗷𝗶𝗮𝗻 𝗦𝘁𝗿𝗮𝘁𝗲𝗴𝗶𝘀/Kazia Dwi Frisma-Kepala Divisi Kajian Strategis.png",
        instagram: "",
      },
      {
        nama: "Azizah Maharani",
        jabatan: "Staf Ahli Divisi Kajian Strategis",
        foto: "/images/kastrat/𝗗𝗶𝘃𝗶𝘀𝗶 𝗞𝗮𝗷𝗶𝗮𝗻 𝗦𝘁𝗿𝗮𝘁𝗲𝗴𝗶𝘀/Azizah Maharani-Staf Ahli Divisi Kajian Strategis.png",
        instagram: "",
      },
      {
        nama: "Gatan Putra Ramadhan",
        jabatan: "Staf Ahli Divisi Kajian Strategis",
        foto: "/images/kastrat/𝗗𝗶𝘃𝗶𝘀𝗶 𝗞𝗮𝗷𝗶𝗮𝗻 𝗦𝘁𝗿𝗮𝘁𝗲𝗴𝗶𝘀/Gatan Putra Ramadhan-Staf Ahli Divisi Kajian Strategis.png",
        instagram: "",
      },
      {
        nama: "Iasy Zaid Umar Abdillah",
        jabatan: "Staf Muda Kajian Strategis",
        foto: "/images/kastrat/𝗗𝗶𝘃𝗶𝘀𝗶 𝗞𝗮𝗷𝗶𝗮𝗻 𝗦𝘁𝗿𝗮𝘁𝗲𝗴𝗶𝘀/Iyasy Zaid Umar Abdillah-Staf Muda Kajian Strategis.png",
        instagram: "",
      },
      {
        nama: "Rafly Juliandi",
        jabatan: "Staf Ahli Divisi Kajian Strategis",
        foto: "/images/kastrat/𝗗𝗶𝘃𝗶𝘀𝗶 𝗞𝗮𝗷𝗶𝗮𝗻 𝗦𝘁𝗿𝗮𝘁𝗲𝗴𝗶𝘀/Rafly Juliandi-Staf Ahli Divisi Kajian Strategis.png",
        instagram: "",
      },
      {
        nama: "Ragil Alfira",
        jabatan: "Staf Muda Kajian Strategis",
        foto: "/images/kastrat/𝗗𝗶𝘃𝗶𝘀𝗶 𝗞𝗮𝗷𝗶𝗮𝗻 𝗦𝘁𝗿𝗮𝘁𝗲𝗴𝗶𝘀/Ragil Alfira-Staf Muda Kajian Strategis.png",
        instagram: "",
      },
      {
        nama: "Rizki Darma Siringoringo",
        jabatan: "Staf Muda Kajian Strategis",
        foto: "/images/kastrat/𝗗𝗶𝘃𝗶𝘀𝗶 𝗞𝗮𝗷𝗶𝗮𝗻 𝗦𝘁𝗿𝗮𝘁𝗲𝗴𝗶𝘀/Rizki Darma Siringoringo-Staf Muda Kajian Strategis.png",
        instagram: "",
      },
      {
        nama: "Viki Yudistira",
        jabatan: "Staf Muda Kajian Strategis",
        foto: "/images/kastrat/𝗗𝗶𝘃𝗶𝘀𝗶 𝗞𝗮𝗷𝗶𝗮𝗻 𝗦𝘁𝗿𝗮𝘁𝗲𝗴𝗶𝘀/Vivi Putri Refmi-Staf Muda Kajian Strategis.png",
        instagram: "",
      },
    ],
  },
  {
    id: "aksi-propaganda",
    icon: <Megaphone size={18} />,
    nama: "DIVISI AKSI DAN PROPAGANDA",
    deskripsi:
      "Bertanggung jawab dalam merencanakan, mengordinasikan, dan mengeksekusi gerakan aksi serta propaganda massa untuk menyuarakan aspirasi mahasiswa secara taktis, kritis, dan berdampak.",
    anggota: [
      {
        nama: "Jilbran Pramana Sukma",
        jabatan: "Kepala Divisi Aksi dan Propaganda",
        foto: "/images/kastrat/𝗗𝗶𝘃𝗶𝘀𝗶 𝗔𝗸𝘀𝗶 𝗱𝗮𝗻 𝗣𝗿𝗼𝗽𝗮𝗴𝗮𝗻𝗱𝗮/Jilbran Pramana Sukma-Kepala Divisi Aksi dan Propaganda.png",
        instagram: "",
      },
      {
        nama: "Bima Hasmar Pradana",
        jabatan: "Staf Muda Aksi dan Propaganda",
        foto: "/images/kastrat/𝗗𝗶𝘃𝗶𝘀𝗶 𝗔𝗸𝘀𝗶 𝗱𝗮𝗻 𝗣𝗿𝗼𝗽𝗮𝗴𝗮𝗻𝗱𝗮/Bima Hasmar Pradana-Staf Muda Aksi dan Propaganda.png",
        instagram: "",
      },
      {
        nama: "Iqbal Yoga Pranata",
        jabatan: "Staf Muda Aksi dan Propaganda",
        foto: "/images/kastrat/𝗗𝗶𝘃𝗶𝘀𝗶 𝗔𝗸𝘀𝗶 𝗱𝗮𝗻 𝗣𝗿𝗼𝗽𝗮𝗴𝗮𝗻𝗱𝗮/Iqbal Yoga Pranata.png",
        instagram: "",
      },
      {
        nama: "M. Hakim Aditya",
        jabatan: "Staf Muda Aksi dan Propaganda",
        foto: "/images/kastrat/𝗗𝗶𝘃𝗶𝘀𝗶 𝗔𝗸𝘀𝗶 𝗱𝗮𝗻 𝗣𝗿𝗼𝗽𝗮𝗴𝗮𝗻𝗱𝗮/M. Hakim Aditya-Staf Muda Aksi dan Propaganda.png",
        instagram: "",
      },
      {
        nama: "M. Zaeni Dahlan",
        jabatan: "Staf Muda Aksi dan Propaganda",
        foto: "/images/kastrat/𝗗𝗶𝘃𝗶𝘀𝗶 𝗔𝗸𝘀𝗶 𝗱𝗮𝗻 𝗣𝗿𝗼𝗽𝗮𝗴𝗮𝗻𝗱𝗮/M. Zaeni Dahlan-Staf Muda Aksi dan Propaganda.png",
        instagram: "",
      },
    ],
  },
];

// ============================================================
// COMPONENT: MEMBER CARD (Memoized untuk Mencegah Re-render)
// ============================================================
const MemberCard = memo(({ member }: { member: Anggota }) => {
  return (
    <div className="group flex flex-col overflow-hidden rounded-2xl border border-amber-200/70 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-amber-300 hover:shadow-lg w-[260px] sm:w-[280px] shrink-0 select-none will-change-transform">
      <div className="relative w-full overflow-hidden bg-slate-100 pointer-events-none" style={{ aspectRatio: "3/4" }}>
        <img
          src={member.foto}
          alt={member.nama}
          className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
          decoding="async"
          draggable="false"
        />
      </div>

      <div className="flex flex-1 flex-col p-4">
        <h5 className="text-sm font-bold leading-snug text-slate-900 sm:text-[15px] line-clamp-1">
          {member.nama}
        </h5>
        <p className="mt-1 text-[11px] font-semibold leading-tight text-amber-600 sm:text-xs line-clamp-2">
          {member.jabatan}
        </p>

        <hr className="my-3 border-slate-100" />

        <div className="flex items-center gap-1.5 text-slate-500">
          <Instagram size={13} className="shrink-0 text-amber-500" />
          {member.instagram ? (
            <a
              href={`https://instagram.com/${member.instagram.replace("@", "")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[11px] font-medium text-amber-600 hover:text-amber-700 hover:underline transition-colors"
            >
              {member.instagram.startsWith("@")
                ? member.instagram
                : `@${member.instagram}`}
            </a>
          ) : (
            <span className="text-[11px] text-slate-400 italic">—</span>
          )}
        </div>
      </div>
    </div>
  );
});

MemberCard.displayName = "MemberCard";

// ============================================================
// COMPONENT: DIVISI SECTION (Dengan Fitur Looping Otomatis & Drag)
// ============================================================
const DivisiSection = memo(({ divisi }: { divisi: Divisi }) => {
  const sliderRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeftState, setScrollLeftState] = useState(0);

  // Efek Looping Carousel Otomatis
  useEffect(() => {
    if (divisi.anggota.length === 0) return;

    const interval = setInterval(() => {
      if (!isHovered && !isDragging && sliderRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = sliderRef.current;
        const scrollAmount = 300;

        // Jika sudah di ujung kanan (atau hampir mentok), kembali ke awal (0) secara mulus
        if (scrollLeft + clientWidth >= scrollWidth - 10) {
          sliderRef.current.scrollTo({ left: 0, behavior: "smooth" });
        } else {
          sliderRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
        }
      }
    }, 4000);

    return () => clearInterval(interval);
  }, [isHovered, isDragging, divisi.anggota.length]);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!sliderRef.current) return;
    setIsDragging(true);
    setStartX(e.pageX - sliderRef.current.offsetLeft);
    setScrollLeftState(sliderRef.current.scrollLeft);
  };

  const handleMouseLeaveOrUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !sliderRef.current) return;
    e.preventDefault();
    const x = e.pageX - sliderRef.current.offsetLeft;
    const walk = (x - startX) * 1.5;
    sliderRef.current.scrollLeft = scrollLeftState - walk;
  };

  // Navigasi Tombol Kiri (Jika di awal dan ditekan, looping ke ujung kanan)
  const scrollLeftBtn = () => {
    if (sliderRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = sliderRef.current;
      if (scrollLeft <= 10) {
        sliderRef.current.scrollTo({ left: scrollWidth, behavior: "smooth" });
      } else {
        sliderRef.current.scrollBy({ left: -300, behavior: "smooth" });
      }
    }
  };

  // Navigasi Tombol Kanan (Jika di ujung kanan dan ditekan, looping kembali ke awal)
  const scrollRightBtn = () => {
    if (sliderRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = sliderRef.current;
      if (scrollLeft + clientWidth >= scrollWidth - 10) {
        sliderRef.current.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        sliderRef.current.scrollBy({ left: 300, behavior: "smooth" });
      }
    }
  };

  return (
    <div className="mt-16">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex-1">
          <h3 className="mt-3 font-serif text-2xl font-black uppercase tracking-tight text-amber-600 sm:text-3xl">
            {divisi.nama}
          </h3>
          <p className="mt-2 max-w-2xl text-xs font-medium leading-relaxed text-slate-600 sm:text-sm">
            {divisi.deskripsi}
          </p>
        </div>

        {divisi.anggota.length > 0 && (
          <div className="hidden sm:flex items-center gap-2 self-end sm:self-center">
            <button
              onClick={scrollLeftBtn}
              aria-label="Previous slide"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-amber-200 bg-white text-amber-700 shadow-sm transition-all hover:bg-amber-50 hover:border-amber-300 active:scale-95"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={scrollRightBtn}
              aria-label="Next slide"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-amber-200 bg-white text-amber-700 shadow-sm transition-all hover:bg-amber-50 hover:border-amber-300 active:scale-95"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        )}
      </div>

      <div className="mt-5 flex items-center gap-3">
        <div className="h-[2px] w-12 rounded-full bg-amber-400" />
        <div className="h-[2px] flex-1 rounded-full bg-amber-100" />
      </div>

      {divisi.anggota.length > 0 ? (
        <div 
          className="relative mt-8 group/carousel"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div
            ref={sliderRef}
            onMouseDown={handleMouseDown}
            onMouseLeave={handleMouseLeaveOrUp}
            onMouseUp={handleMouseLeaveOrUp}
            onMouseMove={handleMouseMove}
            className={`flex gap-6 overflow-x-auto pb-4 pt-1 px-1 scroll-smooth snap-x snap-mandatory [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden ${
              isDragging ? "cursor-grabbing select-none" : "cursor-grab"
            }`}
          >
            {divisi.anggota.map((member, idx) => (
              <div key={idx} className="snap-start shrink-0">
                <MemberCard member={member} />
              </div>
            ))}
          </div>

          <div className="flex justify-between items-center px-2 mt-3">
            <div className="flex sm:hidden items-center gap-3">
              <button
                onClick={scrollLeftBtn}
                aria-label="Previous slide"
                className="flex h-8 w-8 items-center justify-center rounded-full border border-amber-200 bg-white text-amber-700 shadow-sm active:scale-95"
              >
                <ChevronLeft size={16} />
              </button>
              <button
                onClick={scrollRightBtn}
                aria-label="Next slide"
                className="flex h-8 w-8 items-center justify-center rounded-full border border-amber-200 bg-white text-amber-700 shadow-sm active:scale-95"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="mt-8 flex items-center justify-center rounded-2xl border-2 border-dashed border-amber-200 bg-amber-50/50 px-6 py-12 text-center">
          <p className="text-sm font-medium text-slate-400">
            Data anggota bidang akan segera diperbarui.
          </p>
        </div>
      )}
    </div>
  );
});

DivisiSection.displayName = "DivisiSection";

// ============================================================
// MAIN COMPONENT: KASTRAT
// ============================================================
export default function Kastrat() {
  return (
    <main className="relative min-h-screen overflow-x-clip bg-[url('/images/bgweb.jpeg')] bg-cover bg-fixed bg-center bg-no-repeat pt-[72px] text-slate-900 scroll-smooth">
      <div className="min-h-screen bg-white/65">
        <Navbar activePage="kastrat" />

        {/* 1. HERO SECTION */}
        <section className="relative flex min-h-[calc(100vh-72px)] w-full items-center justify-center overflow-hidden px-4 py-16 sm:px-6 lg:px-8">
          <div className="absolute inset-0 z-0 overflow-hidden">
            <img
              src="/images/kastrat/fullkastrat.png"
              alt="Departemen Kajian dan Aksi Strategis BEM Polsri"
              className="h-full w-full object-cover object-center scale-105 transition-transform duration-1000"
              loading="eager"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-white/80 via-white/70 to-white/90 backdrop-blur-[2px]" />
            <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-36 bg-gradient-to-t from-white via-white/80 to-transparent" />
          </div>

          <div className="relative z-20 mx-auto flex max-w-4xl flex-col items-center justify-center text-center animate-fadeIn">
            <div className="mb-4 sm:mb-6">
              <img
                src="/images/kastrat/Logo Kastrat.png"
                alt="Logo Kastrat BEM Polsri"
                className="h-28 w-auto object-contain filter drop-shadow-md sm:h-36 lg:h-44"
                loading="eager"
              />
            </div>

            <p className="text-xs font-black uppercase tracking-[0.35em] text-slate-600 sm:text-sm md:text-base">
              DEPARTEMEN
            </p>

            <h1 className="mt-2 font-serif text-3xl font-black uppercase leading-[1.12] tracking-tight text-amber-500 drop-shadow-sm sm:text-5xl md:text-6xl lg:text-7xl">
              KAJIAN DAN AKSI STRATEGIS
            </h1>

            <p className="mt-5 max-w-2xl px-2 text-xs font-medium leading-relaxed text-slate-700 sm:px-4 sm:text-base lg:text-lg lg:leading-normal">
              Departemen Kajian dan Aksi Strategis berperan dalam melakukan kajian terhadap isu-isu strategis, menghimpun aspirasi, serta mengawal dan mengimplementasikan gerakan mahasiswa secara kritis, responsif, dan solutif.
            </p>
          </div>
        </section>

        {/* 2. PIMPINAN DEPARTEMEN */}
        <section className="mx-auto max-w-7xl px-5 py-12 lg:px-8 lg:py-20">
          <div className="text-center">
            <h2 className="mt-2 font-serif text-3xl font-black uppercase tracking-tight text-amber-500 sm:text-4xl lg:text-5xl">
              PIMPINAN DEPARTEMEN
            </h2>
          </div>

          <div className="mt-12 flex flex-wrap justify-center gap-6">
            {pimpinanKastrat.map((pimpinan, index) => (
              <div
                key={index}
                className="group w-full max-w-[260px] overflow-hidden rounded-2xl border border-amber-200/80 bg-white shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl will-change-transform"
              >
                <div className="relative w-full overflow-hidden bg-slate-100" style={{ aspectRatio: "3/4" }}>
                  <img
                    src={pimpinan.foto}
                    alt={pimpinan.nama}
                    className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
                <div className="flex flex-col p-4">
                  <h3 className="text-sm font-bold text-slate-900 sm:text-[15px]">
                    {pimpinan.nama}
                  </h3>
                  <p className="mt-1 text-[11px] font-semibold text-amber-600 sm:text-xs">
                    {pimpinan.jabatan}
                  </p>
                  <hr className="my-3 border-slate-100" />
                  <div className="flex items-center gap-1.5 text-slate-500">
                    <Instagram size={13} className="shrink-0 text-amber-500" />
                    {pimpinan.instagram ? (
                      <a
                        href={`https://instagram.com/${pimpinan.instagram.replace("@", "")}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[11px] font-medium text-amber-600 hover:text-amber-700 hover:underline transition-colors"
                      >
                        {pimpinan.instagram.startsWith("@")
                          ? pimpinan.instagram
                          : `@${pimpinan.instagram}`}
                      </a>
                    ) : (
                      <span className="text-[11px] text-slate-400 italic">—</span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 3. STRUKTURAL DEPARTEMEN KASTRAT */}
        <section className="mx-auto max-w-7xl px-5 py-12 pb-28 lg:px-8 lg:py-20">
          <div className="text-center">
            <h2 className="mt-2 font-serif text-3xl font-black uppercase tracking-tight text-amber-500 sm:text-4xl lg:text-5xl">
              STRUKTURAL DEPARTEMEN KASTRAT
            </h2>
          </div>

          {divisiList.map((divisi) => (
            <DivisiSection key={divisi.id} divisi={divisi} />
          ))}
        </section>

        {/* 4. FOOTER */}
        <Footer />
      </div>
    </main>
  );
}
