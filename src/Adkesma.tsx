import React, { useState, useEffect, useRef, memo } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { HeartHandshake, Shield, Instagram, ChevronLeft, ChevronRight } from "lucide-react";

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

const pimpinanAdkesma: Anggota[] = [
  {
    nama: "Muhamad Fadil Al Rahman",
    jabatan: "Ketua Departemen ADKESMA",
    foto: "/images/adkesma/Muhamad Fadil Al Rahman-Ketua Departemen ADKESMA.png",
    instagram: "",
  },
  {
    nama: "Meylani Putri",
    jabatan: "Sekretaris Departemen ADKESMA",
    foto: "/images/adkesma/Meylani Putri-Sekretaris Departemen ADKESMA.png",
    instagram: "",
  },
];

const divisiList: Divisi[] = [
  {
    id: "kesejahteraan-mahasiswa",
    icon: <HeartHandshake size={18} />,
    nama: "DIVISI KESEJAHTERAAN MAHASISWA",
    deskripsi:
      "Bertanggung jawab dalam menghimpun dan memperjuangkan bantuan kesejahteraan, beasiswa, serta fasilitas finansial dan akademik bagi seluruh mahasiswa.",
    anggota: [
      {
        nama: "Aidil Ramadhan",
        jabatan: "Kepala Divisi Kesejahteraan Mahasiswa",
        foto: "/images/adkesma/Kesejahteraan Mahasiswa/Aidil Ramadhan-Kepala Divisi Kesejahteraan Mahasiswa.png",
        instagram: "",
      },
      {
        nama: "Eric Ramadhan Depati",
        jabatan: "Staf Ahli Divisi Kesejahteraan Mahasiswa",
        foto: "/images/adkesma/Kesejahteraan Mahasiswa/Eric Ramadhan Depati-Staf Ahli Divisi Kesejahteraan Mahasiswa.png",
        instagram: "",
      },
      {
        nama: "Fakhita Shafa Marwah",
        jabatan: "Staf Ahli Divisi Kesejahteraan Mahasiswa",
        foto: "/images/adkesma/Kesejahteraan Mahasiswa/Fakhita Shafa Marwah-Staf Ahli Divisi Kesejahteraan Mahasiswa.png",
        instagram: "",
      },
      {
        nama: "Muhammad Arka Aisy Hafiy",
        jabatan: "Staf Ahli Divisi Kesejahteraan Mahasiswa",
        foto: "/images/adkesma/Kesejahteraan Mahasiswa/Muhammad Arka Aisy Hafiy-Staf Ahli Divisi Kesejahteraan Mahasiswa.png",
        instagram: "",
      },
      {
        nama: "Geby Rebecca",
        jabatan: "Staf Muda Kesejahteraan Mahasiswa",
        foto: "/images/adkesma/Kesejahteraan Mahasiswa/Geby Rebecca-Staf Muda Kesejahteraan Mahasiswa.png",
        instagram: "",
      },
      {
        nama: "Siti Dinda Amarsha",
        jabatan: "Staf Muda Kesejahteraan Mahasiswa",
        foto: "/images/adkesma/Kesejahteraan Mahasiswa/Siti Dinda Amarsha-Staf Muda Kesejahteraan Mahasiswa.png",
        instagram: "",
      },
    ],
  },
  {
    id: "perlindungan-mahasiswa",
    icon: <Shield size={18} />,
    nama: "DIVISI PERLINDUNGAN MAHASISWA",
    deskripsi:
      "Bertanggung jawab dalam memberikan pendampingan advokasi, perlindungan hak-hak mahasiswa, penanganan isu kekerasan/pelecehan, serta pelayanan pengaduan masalah kemahasiswaan.",
    anggota: [
      {
        nama: "Carlita Maharani",
        jabatan: "Kepala Divisi Perlindungan Mahasiswa",
        foto: "/images/adkesma/Kesejahteraan Mahasiswa/Carlita Maharani -Kepala Divisi Perlindungan Mahasiswa.png",
        instagram: "",
      },
      {
        nama: "Feby Patmala",
        jabatan: "Staf Ahli Divisi Perlindungan Mahasiswa",
        foto: "/images/adkesma/Perlindungan Mahasiswa/Feby Patmala-Staf Ahli Divisi Perlindungan Mahasiswa.png",
        instagram: "",
      },
      {
        nama: "Muhammad Al-Hafidz AR",
        jabatan: "Staf Ahli Divisi Perlindungan Mahasiswa",
        foto: "/images/adkesma/Perlindungan Mahasiswa/Muhammad Al-Hafidz AR-Staf Ahli Divisi Perlindungan Mahasiswa.png",
        instagram: "",
      },
      {
        nama: "Daffa Alianso",
        jabatan: "Staf Muda Perlindungan Mahasiswa",
        foto: "/images/adkesma/Perlindungan Mahasiswa/Daffa Alianso-Staf Muda Perlindungan Mahasiswa.png",
        instagram: "",
      },
      {
        nama: "Muhammad Kivlan Ali",
        jabatan: "Staf Muda Perlindungan Mahasiswa",
        foto: "/images/adkesma/Perlindungan Mahasiswa/Muhammad Kivlan Ali-Staf Muda Perlindungan Mahasiswa.png",
        instagram: "",
      },
      {
        nama: "Pelisa Ramadhani",
        jabatan: "Staf Muda Perlindungan Mahasiswa",
        foto: "/images/adkesma/Perlindungan Mahasiswa/Pelisa Ramadhani-Staf Muda Perlindungan Mahasiswa.png",
        instagram: "",
      },
    ],
  },
];

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
              {member.instagram.startsWith("@") ? member.instagram : `@${member.instagram}`}
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

const DivisiSection = memo(({ divisi }: { divisi: Divisi }) => {
  const sliderRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeftState, setScrollLeftState] = useState(0);

  useEffect(() => {
    if (divisi.anggota.length === 0) return;

    const interval = setInterval(() => {
      if (!isHovered && !isDragging && sliderRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = sliderRef.current;
        const scrollAmount = 300;

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

  const scrollLeftBtn = () => {
    if (sliderRef.current) {
      const { scrollLeft, scrollWidth } = sliderRef.current;
      if (scrollLeft <= 10) {
        sliderRef.current.scrollTo({ left: scrollWidth, behavior: "smooth" });
      } else {
        sliderRef.current.scrollBy({ left: -300, behavior: "smooth" });
      }
    }
  };

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

export default function Adkesma() {
  return (
    <main className="relative min-h-screen overflow-x-clip bg-[url('/images/bgweb.jpeg')] bg-cover bg-fixed bg-center bg-no-repeat pt-[72px] text-slate-900 scroll-smooth">
      <div className="min-h-screen bg-white/65">
        <Navbar activePage="adkesma" />

        {/* HERO SECTION */}
        <section className="relative flex min-h-[calc(100vh-72px)] w-full items-center justify-center overflow-hidden px-4 py-16 sm:px-6 lg:px-8">
          <div className="absolute inset-0 z-0 overflow-hidden">
            <img
              src="/images/adkesma/fulladkesma.png"
              alt="Departemen ADKESMA BEM Polsri"
              className="h-full w-full object-cover object-center scale-105 transition-transform duration-1000"
              loading="eager"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-white/80 via-white/70 to-white/90 backdrop-blur-[2px]" />
            <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-36 bg-gradient-to-t from-white via-white/80 to-transparent" />
          </div>

          <div className="relative z-20 mx-auto flex max-w-4xl flex-col items-center justify-center text-center animate-fadeIn">
            <div className="mb-4 sm:mb-6">
              <img
                src="/images/adkesma/Logo Adkesma.png"
                alt="Logo Adkesma BEM Polsri"
                className="h-28 w-auto object-contain filter drop-shadow-md sm:h-36 lg:h-44"
                loading="eager"
              />
            </div>

            <p className="text-xs font-black uppercase tracking-[0.35em] text-slate-600 sm:text-sm md:text-base">
              DEPARTEMEN
            </p>

            <h1 className="mt-2 font-serif text-3xl font-black uppercase leading-[1.12] tracking-tight text-amber-500 drop-shadow-sm sm:text-5xl md:text-6xl lg:text-7xl">
              ADVOKASI DAN KESEJAHTERAAN MAHASISWA
            </h1>

            <p className="mt-5 max-w-2xl px-2 text-xs font-medium leading-relaxed text-slate-700 sm:px-4 sm:text-base lg:text-lg lg:leading-normal">
              Departemen Advokasi dan Kesejahteraan Mahasiswa (ADKESMA) berperan aktif dalam memperjuangkan hak-hak mahasiswa, memberikan pelayanan advokasi, serta menghimpun bantuan kesejahteraan kampus.
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
            {pimpinanAdkesma.map((pimpinan, index) => (
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
                        {pimpinan.instagram.startsWith("@") ? pimpinan.instagram : `@${pimpinan.instagram}`}
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

        {/* STRUKTURAL DEPARTEMEN ADKESMA */}
        <section className="mx-auto max-w-7xl px-5 py-12 pb-28 lg:px-8 lg:py-20">
          <div className="text-center">
            <h2 className="mt-2 font-serif text-3xl font-black uppercase tracking-tight text-amber-500 sm:text-4xl lg:text-5xl">
              STRUKTURAL DEPARTEMEN ADKESMA
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
