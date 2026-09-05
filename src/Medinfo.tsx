import React, { useState, useEffect, useRef, memo } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { Palette, Globe, Instagram, ChevronLeft, ChevronRight } from "lucide-react";

// ============================================================
// TYPE
// ============================================================
interface Anggota {
  nama: string;
  jabatan: string;
  foto: string;
  instagram: string;
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
const pimpinanMedinfo: Anggota[] = [
  {
    nama: "Karenina Indira Putri",
    jabatan: "Kepala Departemen Media dan Informasi",
    foto: "/images/medinfo/𝗞𝗲𝗽𝗮𝗹𝗮 𝗗𝗲𝗽𝗮𝗿𝘁𝗲𝗺𝗲𝗻 — 𝗞𝗮𝗿𝗲𝗻𝗶𝗻𝗮 𝗜𝗻𝗱𝗶𝗿𝗮 𝗣𝘂𝘁𝗿𝗶.png",
    instagram: "karenidr__", // dira
  },
  {
    nama: "Putri Indah Sari",
    jabatan: "Sekretaris Departemen Media dan Informasi",
    foto: "/images/medinfo/𝗦𝗲𝗸𝗿𝗲𝘁𝗮𝗿𝗶𝘀 𝗗𝗲𝗽𝗮𝗿𝘁𝗲𝗺𝗲𝗻 — 𝗣𝘂𝘁𝗿𝗶 𝗜𝗻𝗱𝗮𝗵 𝗦𝗮𝗿𝗶.png",
    instagram: "ptriindhhsari", // putri
  },
];

// ============================================================
// DATA BIDANG KEAHLIAN (DIVISI)
// ============================================================
const divisiList: Divisi[] = [
  {
    id: "desain-grafis",
    icon: <Palette size={18} />,
    nama: "BIDANG KREATIF & DESAIN GRAFIS",
    deskripsi:
      "Bertanggung jawab dalam merancang identitas visual, estetika publikasi media sosial, atribut visual acara, serta seluruh materi kreatif organisasi.",
    anggota: [
      {
        nama: "M. Hudzaifah",
        jabatan: "Kepala Divisi Desain Grafis",
        foto: "/images/medinfo/desain/𝗞𝗲𝗽𝗮𝗹𝗮 𝗗𝗶𝘃𝗶𝘀𝗶 𝗗𝗲𝘀𝗮𝗶𝗻 𝗚𝗿𝗮𝗳𝗶𝘀 — 𝗠. 𝗛𝘂𝗱𝘇𝗮𝗶𝗳𝗮𝗵.png",
        instagram: "im.ujaybae", // jay
      },
      {
        nama: "Naila Ananta Rizma",
        jabatan: "Staf Ahli Divisi Design Grafis",
        foto: "/images/medinfo/desain/Naila Ananta Rizma-Staf Ahli Divisi Design Grafis.png",
        instagram: "naila_ananta.r", // naila
      },
      {
        nama: "Okta Ananda Dwi Lestari",
        jabatan: "Staf Ahli Divisi Design Grafis",
        foto: "/images/medinfo/desain/Okta Ananda Dwi Lestari-Staf Ahli Divisi Design Grafis.png",
        instagram: "ananda.okta", // okta
      },
      {
        nama: "Delsya Alfita Sanbela",
        jabatan: "Staf Muda Desain Grafis",
        foto: "/images/medinfo/desain/Delsya Alfita Sanbela-Staf Muda Desain Grafis.png",
        instagram: "delsyaalf", // delsya
      },
      {
        nama: "Dimas Arya Bimasakti",
        jabatan: "Staf Muda Desain Grafis",
        foto: "/images/medinfo/desain/Dimas Arya Bimasakti-Staf Muda Desain Grafis.png",
        instagram: "arya.b15", // dimas
      },
      {
        nama: "Fahrezy Kurniawan",
        jabatan: "Staf Muda Desain Grafis",
        foto: "/images/medinfo/desain/Fahrezy Kurniawan-Staf Muda Desain Grafis.png",
        instagram: "markojigg", // fahrezy
      },
      {
        nama: "Muhammad Agil Prasetyo",
        jabatan: "Staf Muda Desain Grafis",
        foto: "/images/medinfo/desain/Muhammad Agil Prasetyo-Staf Muda Desain Grafis.png",
        instagram: "agilprstyoo", // agil
      },
      {
        nama: "Muhammad Ilham Firdaus",
        jabatan: "Staf Muda Desain Grafis",
        foto: "/images/medinfo/desain/Muhammad Ilham Firdaus-Staf Muda Desain Grafis.png",
        instagram: "m_ilhmmmd", // daus
      },
      {
        nama: "Rifki Taruna Wijaya",
        jabatan: "Staf Muda Desain Grafis",
        foto: "/images/medinfo/desain/Rifki Taruna Wijaya-Staf Muda Desain Grafis.png",
        instagram: "rifky3885", // rifki
      },
    ],
  },
  {
    id: "sosmed-website",
    icon: <Globe size={18} />,
    nama: "BIDANG MEDIA SOSIAL & PENGELOLAAN WEBSITE",
    deskripsi:
      "Fokus pada optimalisasi saluran komunikasi digital, manajemen platform media sosial resmi, diseminasi informasi publik, serta pemeliharaan sistem website.",
    anggota: [
      {
        nama: "Kilau Najma",
        jabatan: "Kepala Divisi Social Media dan Website",
        foto: "/images/medinfo/sosmed/𝗞𝗲𝗽𝗮𝗹𝗮 𝗗𝗶𝘃𝗶𝘀𝗶 𝗠𝗲𝗱𝗶𝗮 𝗦𝗼𝘀𝗶𝗮𝗹 𝗱𝗮𝗻 𝗪𝗲𝗯𝘀𝗶𝘁𝗲 — 𝗞𝗶𝗹𝗮𝘂 𝗡𝗮𝗷𝗺𝗮.png",
        instagram: "kilaunjmh_", // kilau
      },
      {
        nama: "Tria Ramadhanti",
        jabatan: "Kepala Divisi Social Media dan Website",
        foto: "/images/medinfo/sosmed/Tria Ramadhanti-Kepala Divisi Social Media dan Website.png",
        instagram: "tiak.knr", // tiak
      },
      {
        nama: "Annisa Rahmasa Putri Yohanggi",
        jabatan: "Staf Muda Social Media dan Website",
        foto: "/images/medinfo/sosmed/Annisa Rahmasa Putri Yohanggi-Staf Muda Social Media dan Website.png",
        instagram: "anisarhpy_", // annissa
      },
      {
        nama: "Calvin Gabriel Pratama Damanik",
        jabatan: "Staf Muda Social Media dan Website",
        foto: "/images/medinfo/sosmed/Calvin Gabriel Pratama Damanik-Staf Muda Social Media dan Website.png",
        instagram: "nexeeon.d", // calvin
      },
      {
        nama: "M. Anugrah Satria Usman",
        jabatan: "Staf Muda Social Media dan Website",
        foto: "/images/medinfo/sosmed/M. Anugrah Satria Usman-Staf Muda Social Media dan Website.png",
        instagram: "grh.0001", // anugrah
      },
      {
        nama: "Muhammad Rizky Faaliih",
        jabatan: "Staf Muda Social Media dan Website",
        foto: "/images/medinfo/sosmed/Muhammad Rizky Faaliih-Staf Muda Social Media dan Website.png",
        instagram: "mr_faallih", // falih
      },
      {
        nama: "Rizka Putri Ramadhani",
        jabatan: "Staf Muda Social Media dan Website",
        foto: "/images/medinfo/sosmed/Rizka Putri Ramadhani-Staf Muda Social Media dan Website.png",
        instagram: "rizkarpr", // rizka
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
// COMPONENT: DIVISI SECTION (Dengan Fitur Looping Otomatis)
// ============================================================
const DivisiSection = memo(({ divisi }: { divisi: Divisi }) => {
  const sliderRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const startXRef = useRef(0);
  const scrollLeftRef = useRef(0);

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

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!sliderRef.current || e.button !== 0) return;
    setIsDragging(true);
    startXRef.current = e.clientX;
    scrollLeftRef.current = sliderRef.current.scrollLeft;
    try {
      sliderRef.current.setPointerCapture(e.pointerId);
    } catch {}
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging || !sliderRef.current) return;
    const deltaX = e.clientX - startXRef.current;
    sliderRef.current.scrollLeft = scrollLeftRef.current - deltaX;
  };

  const handlePointerUpOrCancel = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    setIsDragging(false);
    if (sliderRef.current) {
      try {
        if (sliderRef.current.hasPointerCapture(e.pointerId)) {
          sliderRef.current.releasePointerCapture(e.pointerId);
        }
      } catch {}
    }
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
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUpOrCancel}
            onPointerCancel={handlePointerUpOrCancel}
            className={`flex gap-6 overflow-x-auto pb-4 pt-1 px-1 select-none touch-pan-x [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden ${
              isDragging ? "cursor-grabbing" : "cursor-grab"
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
// MAIN COMPONENT
// ============================================================
export default function Medinfo() {
  return (
    <main className="relative min-h-screen overflow-x-clip bg-[url('/images/bgweb.webp')] bg-cover bg-fixed bg-center bg-no-repeat pt-[72px] text-slate-900 scroll-smooth">
      <div className="min-h-screen bg-white/65">
        <Navbar activePage="medinfo" />

        {/* HERO SECTION */}
        <section className="relative flex min-h-[calc(100vh-72px)] w-full items-center justify-center overflow-hidden px-4 py-16 sm:px-6 lg:px-8">
          <div className="absolute inset-0 z-0 overflow-hidden">
            <img
              src="/images/medinfo/fullMedinfo.webp"
              alt="Departemen Media dan Informasi BEM Polsri"
              className="h-full w-full object-cover object-center scale-105 transition-transform duration-1000"
              loading="eager"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-white/80 via-white/70 to-white/90 backdrop-blur-[2px]" />
            <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-36 bg-gradient-to-t from-white via-white/80 to-transparent" />
          </div>

          <div className="relative z-20 mx-auto flex max-w-4xl flex-col items-center justify-center text-center animate-fadeIn">
            <div className="mb-4 sm:mb-6">
              <img
                src="/images/medinfo/medinfologo.webp"
                alt="Logo Medinfo BEM Polsri"
                className="h-28 w-auto object-contain filter drop-shadow-md sm:h-36 lg:h-44"
                loading="eager"
              />
            </div>

            <p className="text-xs font-black uppercase tracking-[0.35em] text-slate-600 sm:text-sm md:text-base">
              DEPARTEMEN
            </p>

            <h1 className="mt-2 font-serif text-3xl font-black uppercase leading-[1.12] tracking-tight text-amber-500 drop-shadow-sm sm:text-5xl md:text-6xl lg:text-7xl">
              MEDIA DAN INFORMASI
            </h1>

            <p className="mt-5 max-w-2xl px-2 text-xs font-medium leading-relaxed text-slate-700 sm:px-4 sm:text-base lg:text-lg lg:leading-normal">
              Departemen Media dan Informasi (Medinfo) berfungsi sebagai garda terdepan penyebaran informasi publik serta pengelolaan platform digital kampus secara kreatif, interaktif, dan profesional.
            </p>
          </div>
        </section>

        {/* PIMPINAN DEPARTEMEN */}
        <section className="mx-auto max-w-7xl px-5 py-12 lg:px-8 lg:py-20">
          <div className="text-center">
            
            <h2 className="mt-2 font-serif text-3xl font-black uppercase tracking-tight text-amber-500 sm:text-4xl lg:text-5xl">
              PIMPINAN DEPARTEMEN
            </h2>
          </div>

          <div className="mt-12 flex flex-wrap justify-center gap-6">
            {pimpinanMedinfo.map((pimpinan, index) => (
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

        {/* STRUKTUR BIDANG KEAHLIAN */}
        <section className="mx-auto max-w-7xl px-5 py-12 pb-28 lg:px-8 lg:py-20">
          <div className="text-center">
            <h2 className="mt-2 font-serif text-3xl font-black uppercase tracking-tight text-amber-500 sm:text-4xl lg:text-5xl">
              STRUKTURAL DEPARTEMENT MEDINFO
            </h2>
          </div>

          {divisiList.map((divisi) => (
            <DivisiSection key={divisi.id} divisi={divisi} />
          ))}
        </section>

        <Footer />
      </div>
    </main>
  );
}