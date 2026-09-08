import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import Navbar from "./Navbar";
import {
  ArrowRight,
  ArrowUpRight,
  Mail,
  Instagram,
  Youtube,
  Search,
  ExternalLink,
  House,
  Trophy,
  UsersRound,
  RotateCcw,
  X,
  FileText,
  ScrollText,
  Download,
} from "lucide-react";

type DropdownName = "academic" | "echo" | null;

interface OrgItem {
  id: string;
  name: string;
  category: "HMJ" | "UKM" | "Komunitas" | "MPM" | "BEM";
  image: string;
  description?: string;
  cabinet?: string;
  alias?: string[];
}

interface DocItem {
  id: string;
  title: string;
  subtitle: string;
  desc: string;
  file: string;
}

// ============================================================
// DATA ORGANISASI MAHASISWA
// ============================================================
const mpmData: OrgItem[] = [
  {
    id: "mpm-1",
    name: "MPM",
    category: "MPM",
    image: "/images/Komunitas/mpm.webp",
    description:
      "Organisasi mahasiswa yang menjalankan fungsi legislasi, pengawasan, dan penegakan norma organisasi mahasiswa.",
    alias: [
      "MPM",
      "Majelis Permusyawaratan Mahasiswa",
      "Legislatif",
      "Musyawarah",
    ],
  },
];

const bemData: OrgItem[] = [
  {
    id: "bem-1",
    name: "BEM",
    cabinet: "KABINET KILAU GEMILANG",
    category: "BEM",
    image: "/images/logo.webp",
    description:
      "Kabinet Kilau Gemilang adalah manifestasi dari organisasi yang ditempa dengan kuat (Kilau) untuk melahirkan sejarah prestasi yang abadi (Gemilang).",
    alias: [
      "BEM",
      "Badan Eksekutif Mahasiswa",
      "Kabinet Kilau Gemilang",
      "Kilau Gemilang",
    ],
  },
];

const hmjData: OrgItem[] = [
  {
    id: "hmj-1",
    name: "Himpunan Mahasiswa Administrasi Bisnis",
    category: "HMJ",
    image: "/images/HMJ/AB.webp",
    description:
      "Himpunan ini adalah organisasi mahasiswa Jurusan Administrasi Bisnis. Kami fokus pada pengembangan soft skill dan wawasan bisnis mahasiswa melalui seminar, studi kasus, dan simulasi bisnis.",
    alias: [
      "HMJ AB",
      "AB",
      "Administrasi Bisnis",
      "Himpunan Mahasiswa Administrasi Bisnis",
      "Bisnis",
    ],
  },
  {
    id: "hmj-2",
    name: "Himpunan Mahasiswa Akuntansi",
    category: "HMJ",
    image: "/images/HMJ/akuntansi.webp",
    description:
      "Himpunan ini mewadahi mahasiswa Jurusan Akuntansi. Kami mengadakan pelatihan perpajakan, audit, dan kegiatan perlombaan.",
    alias: [
      "HMJ Akuntansi",
      "Akuntansi",
      "Audit",
      "Pajak",
      "Himpunan Mahasiswa Akuntansi",
    ],
  },
  {
    id: "hmj-3",
    name: "Himpunan Mahasiswa Bahasa dan Pariwisata",
    category: "HMJ",
    image: "/images/HMJ/bahasa dan pariwisata.png",
    description:
      "Himpunan ini adalah organisasi yang menampung kreativitas mahasiswa Jurusan Bahasa dan Pariwisata. Kami mengadakan pelatihan bahasa, kunjungan wisata, dan berbagai kegiatan lain untuk memperkenalkan budaya dan pariwisata.",
    alias: [
      "HMJ Bahasa dan Pariwisata",
      "Bahasa",
      "Pariwisata",
      "Himpunan Mahasiswa Bahasa dan Pariwisata",
      "Budaya",
    ],
  },
  {
    id: "hmj-4",
    name: "Himpunan Mahasiswa Teknik Elektro",
    category: "HMJ",
    image: "/images/HMJ/elektro.webp",
    description:
      "Tagline HMJ terbaik luar biasa, mengusung semangat keunggulan, inovasi, dan kerja sama untuk mencetak prestasi gemilang. HMJ Elektro adalah organisasi yang menampung kreativitas mahasiswa Jurusan Teknik Elektro.",
    alias: [
      "HMJ Teknik Elektro",
      "Elektro",
      "Teknik Elektro",
      "Himpunan Mahasiswa Teknik Elektro",
    ],
  },
  {
    id: "hmj-5",
    name: "Himpunan Mahasiswa Teknik Mesin",
    category: "HMJ",
    image: "/images/HMJ/mesin.webp",
    description:
      "HMJ Teknik Mesin menjadi wadah bagi mahasiswa Jurusan Teknik Mesin untuk berkontribusi dan berinovasi. Kegiatan kami meliputi workshop, kunjungan industri, dan kompetisi.",
    alias: [
      "HMJ Teknik Mesin",
      "Mesin",
      "Teknik Mesin",
      "Himpunan Mahasiswa Teknik Mesin",
    ],
  },
  {
    id: "hmj-6",
    name: "Himpunan Mahasiswa Manajemen Informatika",
    category: "HMJ",
    image: "/images/HMJ/mi.webp",
    description:
      "Himpunan yang mewadahi mahasiswa Jurusan Manajemen Informatika. Kami berfokus pada pengembangan soft skill dan hard skill di bidang IT dan manajemen proyek.",
    alias: [
      "HMJ MI",
      "MI",
      "Manajemen Informatika",
      "IT",
      "Himpunan Mahasiswa Manajemen Informatika",
    ],
  },
  {
    id: "hmj-7",
    name: "Himpunan Mahasiswa Rekayasa Teknologi dan Bisnis Pertanian",
    category: "HMJ",
    image: "/images/HMJ/RTBP.webp",
    description:
      "Himpunan ini adalah himpunan mahasiswa yang mewadahi mahasiswa Jurusan Rekayasa Teknologi dan Bisnis Pertanian. Kami fokus pada pengembangan soft skill dan wawasan bisnis mahasiswa melalui seminar, studi kasus, dan simulasi teknologi pertanian.",
    alias: [
      "HMJ RTBP",
      "RTBP",
      "Rekayasa Teknologi dan Bisnis Pertanian",
      "Pertanian",
      "Himpunan Mahasiswa Rekayasa Teknologi dan Bisnis Pertanian",
    ],
  },
  {
    id: "hmj-8",
    name: "Himpunan Mahasiswa Teknik Sipil",
    category: "HMJ",
    image: "/images/HMJ/sipil.webp",
    description:
      "Organisasi mahasiswa yang mewadahi mahasiswa Jurusan Teknik Sipil. Kami berfokus pada pengembangan soft skill dan hard skill melalui program-program yang relevan dengan dunia konstruksi dan infrastruktur.",
    alias: [
      "HMJ Teknik Sipil",
      "Sipil",
      "Teknik Sipil",
      "Konstruksi",
      "Himpunan Mahasiswa Teknik Sipil",
    ],
  },
  {
    id: "hmj-9",
    name: "Himpunan Mahasiswa Teknik Kimia",
    category: "HMJ",
    image: "/images/HMJ/Tekkim.webp",
    description:
      "HMJ Teknik Kimia berfokus pada pengembangan pengetahuan mahasiswa tentang industri kimia, penelitian, dan pengabdian masyarakat.",
    alias: [
      "HMJ Teknik Kimia",
      "Tekkim",
      "Kimia",
      "Teknik Kimia",
      "Himpunan Mahasiswa Teknik Kimia",
    ],
  },
  {
    id: "hmj-10",
    name: "Himpunan Mahasiswa Teknik Komputer",
    category: "HMJ",
    image: "/images/HMJ/tekom.webp",
    description:
      "Himpunan ini adalah organisasi yang mewadahi mahasiswa Jurusan Teknik Komputer. Kami mengadakan workshop coding, hackathon, dan berbagai kegiatan untuk meningkatkan kompetensi di bidang IT.",
    alias: [
      "HMJ Teknik Komputer",
      "Tekom",
      "Teknik Komputer",
      "Coding",
      "IT",
      "Himpunan Mahasiswa Teknik Komputer",
    ],
  },
];

const ukmData: OrgItem[] = [
  {
    id: "ukm-1",
    name: "UKM English Debating Society (EDS)",
    category: "UKM",
    image: "/images/UKM/eds.webp",
    description:
      "UKM EDS adalah wadah bagi mahasiswa yang ingin mengasah kemampuan berbahasa Inggris dan berdebat. UKM ini rutin mengadakan latihan debat dan berpartisipasi dalam kompetisi di tingkat regional maupun nasional.",
    alias: [
      "EDS",
      "English Debating Society",
      "Debat",
      "Inggris",
      "UKM English Debating Society (EDS)",
    ],
  },
  {
    id: "ukm-2",
    name: "UKM Himpala Bahtera Buana (HBB)",
    category: "UKM",
    image: "/images/UKM/himpala.webp",
    description:
      "UKM Himpala Bahtera Buana (HBB) adalah Unit Kegiatan Mahasiswa pecinta alam yang bergerak di bidang konservasi lingkungan, penjelajahan alam, dan kepecintaan alaman.",
    alias: ["HBB", "Himpala Bahtera Buana", "Pecinta Alam", "Himpala"],
  },
  {
    id: "ukm-3",
    name: "UKM Keluarga Tarbiyah Islamiah (KARISMA)",
    category: "UKM",
    image: "/images/UKM/karisma.webp",
    description:
      "UKM KARISMA adalah organisasi kerohanian yang berfokus pada pengembangan keilmuan dan praktik Islam. Kami mengadakan kajian rutin, bakti sosial, dan kegiatan dakwah lainnya.",
    alias: [
      "KARISMA",
      "Keluarga Tarbiyah Islamiah",
      "Islam",
      "Kerohanian",
      "UKM Keluarga Tarbiyah Islamiah (KARISMA)",
    ],
  },
  {
    id: "ukm-4",
    name: "UKM Mahasiswa Riset dan Sains (MARS)",
    category: "UKM",
    image: "/images/UKM/mars.webp",
    description:
      "UKM MARS adalah wadah bagi mahasiswa yang memiliki minat di bidang penelitian dan sains. UKM ini mengadakan workshop penulisan karya ilmiah, riset, dan presentasi ilmiah.",
    alias: [
      "MARS",
      "Mahasiswa Riset dan Sains",
      "Riset",
      "Sains",
      "KTI",
      "UKM Mahasiswa Riset dan Sains (MARS)",
    ],
  },
  {
    id: "ukm-5",
    name: "UKM Olahraga",
    category: "UKM",
    image: "/images/UKM/olahraga.webp",
    description:
      "UKM Olahraga mewadahi berbagai cabang olahraga seperti futsal, basket, voli, bulu tangkis, dan cabang olahraga lainnya. UKM ini rutin mengadakan latihan dan berpartisipasi dalam kompetisi antar kampus.",
    alias: [
      "Olahraga",
      "UKM Olahraga",
      "Futsal",
      "Basket",
      "Voli",
      "Bulu Tangkis",
      "Badminton",
    ],
  },
  {
    id: "ukm-6",
    name: "UKM Simphony",
    category: "UKM",
    image: "/images/UKM/simpony.webp",
    description:
      "UKM Simphony adalah organisasi seni yang berfokus pada pengembangan bakat di bidang musik dan paduan suara. UKM ini rutin mengadakan konser dan pertunjukan musik di berbagai acara kampus.",
    alias: ["Simphony", "UKM Simphony", "Musik", "Paduan Suara", "Seni"],
  },
  {
    id: "ukm-7",
    name: "UKM Warta Politeknik Sriwijaya (WPS)",
    category: "UKM",
    image: "/images/UKM/wps.webp",
    description:
      "UKM WPS adalah organisasi pers kampus yang bergerak di bidang jurnalistik. UKM ini menerbitkan berita seputar kehidupan kampus dan isu-isu terkini.",
    alias: [
      "WPS",
      "UKM Warta Politeknik Sriwijaya (WPS)",
      "Warta Politeknik Sriwijaya",
      "Jurnalistik",
      "Pers",
      "Berita",
    ],
  },
];

const komunitasData: OrgItem[] = [
  {
    id: "kom-1",
    name: "Komunitas Bujang Gadis Politeknik Negeri Sriwijaya (BGPOL)",
    category: "Komunitas",
    image: "/images/Komunitas/bgp.webp",
    description:
      "Komunitas BGPOL adalah Bujang Gadis Polsri yang mewakili Politeknik Negeri Sriwijaya dalam berbagai acara formal dan promosi. Kami berfokus pada pengembangan public speaking, etika, dan wawasan kebudayaan.",
    alias: [
      "BGPOL",
      "Bujang Gadis",
      "Komunitas Bujang Gadis Politeknik Negeri Sriwijaya (BGPOL)",
      "Public Speaking",
    ],
  },
  {
    id: "kom-2",
    name: "Majelis Permusyawaratan Mahasiswa (MPM)",
    category: "Komunitas",
    image: "/images/Komunitas/mpm.webp",
    description:
      "Membawa cahaya semangat untuk menciptakan terobosan demi kesejahteraan mahasiswa. Lembaga legislatif mahasiswa Politeknik Negeri Sriwijaya yang berfungsi sebagai wadah musyawarah dan penetapan kebijakan kemahasiswaan. MPM juga mengawasi kinerja BEM demi tercapainya keseimbangan organisasi.",
    alias: ["MPM", "Majelis Permusyawaratan Mahasiswa"],
  },
  {
    id: "kom-3",
    name: "Komunitas Pramuka",
    category: "Komunitas",
    image: "/images/Komunitas/pramuka.webp",
    description:
      "Komunitas Pramuka adalah wadah bagi mahasiswa yang ingin mengembangkan kedisiplinan, kepanduan, kepemimpinan, dan kecintaan pada alam.",
    alias: ["Pramuka", "Komunitas Pramuka", "Kepanduan", "Kedisiplinan"],
  },
  {
    id: "kom-4",
    name: "Komunitas Automation Robotic Club of Sriwijaya (ARCOS)",
    category: "Komunitas",
    image: "/images/Komunitas/robotik.webp",
    description:
      "ARCOS adalah komunitas yang berfokus pada bidang robotika dan otomatisasi. Komunitas ini berkolaborasi dalam proyek-proyek robotik dan berpartisipasi dalam kompetisi robotika.",
    alias: [
      "ARCOS",
      "Komunitas Automation Robotic Club of Sriwijaya (ARCOS)",
      "Robotik",
      "Robotika",
      "Otomatisasi",
      "Robot",
    ],
  },
  {
    id: "kom-5",
    name: "Komunitas Kewirausahaan Polsri",
    category: "Komunitas",
    image: "/images/Komunitas/wirausaha.webp",
    description:
      "Komunitas Kewirausahaan adalah wadah bagi mahasiswa yang memiliki minat dalam dunia bisnis dan kewirausahaan. Komunitas ini mengadakan workshop, seminar, dan mentoring untuk membantu mahasiswa memulai usaha.",
    alias: [
      "Entrepreneur",
      "Kewirausahaan",
      "Komunitas Kewirausahaan",
      "Bisnis",
      "Wirausaha",
    ],
  },
];

// ============================================================
// DATA PERATURAN DAN PEDOMAN ORMAWA POLSRI
// ============================================================
const dokumenOrmawa: DocItem[] = [
  {
    id: "doc-1",
    title: "PERDIR ORMAWA POLSRI",
    subtitle: "Peraturan Direktur",
    desc: "Peraturan Direktur (Perdir) Politeknik Negeri Sriwijaya seputar penyelenggaraan organisasi mahasiswa. Dokumen dapat diunduh dan dibaca kapan saja.",
    file: "/PDF/perdir.pdf",
  },
  {
    id: "doc-2",
    title: "PEDOMAN ORMAWA POLSRI 2026",
    subtitle: "Pedoman Pelaksanaan",
    desc: "Panduan resmi pelaksanaan kegiatan Ormawa di lingkungan Politeknik Negeri Sriwijaya. Tersedia dalam format PDF untuk dipelajari.",
    file: "/PDF/PEDOMAN%20PELAKSANAAN%20KEG%20ORMAWA-2026.pdf",
  },
];

export default function OrganisasiMahasiswa() {
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
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedOrg, setSelectedOrg] = useState<OrgItem | null>(null);

  // ============================================================
  // SCROLL DETECTION & LOCK BODY ON MODAL
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

  useEffect(() => {
    if (selectedOrg) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [selectedOrg]);

  // ============================================================
  // GABUNGAN SELURUH ORGANISASI MENJADI SATU ARRAY UNTUK SEARCH
  // ============================================================
  const allOrganizations: OrgItem[] = [
    ...mpmData,
    ...bemData,
    ...hmjData,
    ...ukmData,
    ...komunitasData,
  ];

  const searchLower = searchQuery.toLowerCase().trim();
  const searchResults = searchQuery.trim()
    ? allOrganizations.filter((item) => {
      const matchName = item.name.toLowerCase().includes(searchLower);
      const matchCategory = item.category.toLowerCase().includes(searchLower);
      const matchCabinet = item.cabinet
        ? item.cabinet.toLowerCase().includes(searchLower)
        : false;
      const matchDesc = item.description
        ? item.description.toLowerCase().includes(searchLower)
        : false;
      const matchAlias = item.alias
        ? item.alias.some((a) => a.toLowerCase().includes(searchLower))
        : false;

      return matchName || matchCategory || matchCabinet || matchDesc || matchAlias;
    })
    : allOrganizations;

  return (
    <main className="relative min-h-screen overflow-x-clip bg-[url('/images/bgweb.webp')] bg-cover bg-fixed bg-center bg-no-repeat pt-[72px] text-slate-900 scroll-smooth">
      <div className="min-h-screen bg-white/65">
        {/* ====================================================== */}
        {/* NAVBAR */}
        {/* ====================================================== */}
        <Navbar />

        {/* ======================================================== */}
        {/* HERO */}
        {/* ======================================================== */}
        {!searchQuery.trim() && (
          <motion.section
            id="organisasi-hero"
            ref={heroRef}
            style={{ opacity: heroOpacity, scale: heroScale, y: heroY }}
            aria-label="Hero Organisasi Mahasiswa"
            className="relative mx-auto flex w-full max-w-7xl items-center px-[clamp(1.25rem,4vw,3.5rem)] py-[clamp(2rem,5vh,5rem)]"
          >
            <div className="grid w-full items-center gap-[clamp(2rem,3.5vw,4rem)] lg:grid-cols-12">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.65, delay: 0.05, ease: "easeOut" }}
                className="relative z-10 flex flex-col items-start justify-center text-left lg:col-span-5"
              >
                <h1
                  className="font-serif font-semibold uppercase tracking-wide text-amber-500"
                  style={{
                    fontSize: "clamp(2.2rem, 4vw, 3.8rem)",
                    lineHeight: 1.05,
                  }}
                >
                  ORGANISASI MAHASISWA
                  <br />
                  <span className="text-amber-500">
                    POLITEKNIK NEGERI SRIWIJAYA
                  </span>
                </h1>

                <p
                  className="mt-[clamp(1rem,1.8vw,1.6rem)] max-w-xl font-medium leading-relaxed text-slate-700"
                  style={{ fontSize: "clamp(0.875rem, 1.1vw, 1.05rem)" }}
                >
                  Organisasi Mahasiswa Politeknik Negeri Sriwijaya merupakan
                  wadah mahasiswa untuk mengembangkan minat, bakat, kompetensi,
                  kepemimpinan, kreativitas, serta kontribusi nyata di
                  lingkungan kampus maupun masyarakat luas.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.75, delay: 0.15, ease: "easeOut" }}
                className="relative flex w-full items-end justify-center lg:col-span-7 lg:justify-end"
              >
                <div className="relative flex w-full items-end justify-center">
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.9, delay: 0.08, ease: "easeOut" }}
                    aria-hidden
                    className="pointer-events-none absolute"
                    style={{
                      inset: 0,
                      zIndex: 0,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <svg
                      viewBox="0 0 540 500"
                      xmlns="http://www.w3.org/2000/svg"
                      style={{
                        position: "absolute",
                        width: "clamp(300px, 48vw, 620px)",
                        height: "clamp(300px, 48vw, 620px)",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-46%, -50%)",
                      }}
                      preserveAspectRatio="xMidYMid meet"
                    >
                      <path
                        d="M280 25
                           C370 15, 470 65, 505 155
                           C540 245, 525 355, 470 425
                           C415 495, 305 515, 205 490
                           C105 465, 28 395, 18 295
                           C8 195, 55 90, 130 50
                           C180 24, 225 33, 280 25Z"
                        fill="hsl(213, 65%, 85%)"
                        opacity="0.52"
                      />
                    </svg>
                  </motion.div>

                  <div
                    aria-hidden
                    className="pointer-events-none absolute"
                    style={{
                      inset: 0,
                      zIndex: 1,
                      backgroundImage:
                        "radial-gradient(circle, rgba(25,75,150,0.1) 1.2px, transparent 1.2px)",
                      backgroundSize: "16px 16px",
                      maskImage:
                        "radial-gradient(ellipse 72% 68% at 52% 50%, black 30%, transparent 78%)",
                      WebkitMaskImage:
                        "radial-gradient(ellipse 72% 68% at 52% 50%, black 30%, transparent 78%)",
                    }}
                  />

                  <div
                    className="relative z-10 w-full"
                    style={{
                      maxWidth: "clamp(280px, 44vw, 680px)",
                      maskImage: "linear-gradient(to bottom, black 58%, transparent 100%)",
                      WebkitMaskImage: "linear-gradient(to bottom, black 58%, transparent 100%)",
                    }}
                  >
                    <img
                      src="/images/organisasi-hero.png"
                      alt="Organisasi Mahasiswa Politeknik Negeri Sriwijaya"
                      loading="eager"
                      draggable={false}
                      className="block h-auto w-full object-contain"
                    />
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.section>
        )}

        {/* ======================================================== */}
        {/* SECTION: JENIS-JENIS ORGANISASI MAHASISWA (SESUAI GAMBAR) */}
        {/* ======================================================== */}
        {!searchQuery.trim() && (
          <section className="px-5 py-12 lg:px-8 lg:py-16">
            <div className="mx-auto max-w-7xl">
              <div className="text-center">
                <h2 className="text-2xl font-black tracking-tight text-amber-500 sm:text-3xl lg:text-4xl">
                  JENIS-JENIS ORGANISASI MAHASISWA
                </h2>
                <p className="mx-auto mt-3 max-w-2xl text-xs leading-relaxed text-slate-600 sm:text-sm">
                  Organisasi Mahasiswa Politeknik Negeri Sriwijaya terdiri dari lima bentuk organisasi yang menjadi wadah mahasiswa untuk berorganisasi, mengembangkan potensi, serta berkontribusi di lingkungan kampus.
                </p>
              </div>

              <div className="mt-10 grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
                {/* Card MPM */}
                <article
                  onClick={() => setSelectedOrg(mpmData[0])}
                  className="group flex flex-col justify-between rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-200 ease-out hover:-translate-y-1 hover:border-amber-300 hover:shadow-xl hover:shadow-amber-900/5 cursor-pointer"
                >
                  <div>
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-50 text-amber-600 mb-4">
                      <img src={mpmData[0].image} alt="MPM" className="h-7 w-7 object-contain" />
                    </div>
                    <h3 className="text-base font-black tracking-tight text-slate-900">
                      MPM
                    </h3>
                    <p className="mt-1 text-[11px] font-bold uppercase tracking-wider text-amber-600">
                      MAJELIS PERMUSYAWARATAN MAHASISWA
                    </p>
                    <p className="mt-3 text-xs leading-relaxed text-slate-600">
                      Organisasi mahasiswa yang menjalankan fungsi legislasi, pengawasan, dan penegakan norma organisasi mahasiswa.
                    </p>
                  </div>
                  <div className="mt-6 border-t border-slate-100 pt-4">
                    <span className="inline-flex items-center gap-1 text-xs font-bold text-amber-600">
                      Lihat Organisasi <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
                    </span>
                  </div>
                </article>

                {/* Card BEM */}
                <article
                  onClick={() => setSelectedOrg(bemData[0])}
                  className="group flex flex-col justify-between rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-200 ease-out hover:-translate-y-1 hover:border-amber-300 hover:shadow-xl hover:shadow-amber-900/5 cursor-pointer"
                >
                  <div>
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-50 text-amber-600 mb-4">
                      <img src={bemData[0].image} alt="BEM" className="h-7 w-7 object-contain" />
                    </div>
                    <h3 className="text-base font-black tracking-tight text-slate-900">
                      BEM
                    </h3>
                    <p className="mt-1 text-[11px] font-bold uppercase tracking-wider text-amber-600">
                      BADAN EKSEKUTIF MAHASISWA
                    </p>
                    <p className="mt-2 text-[10px] font-extrabold uppercase tracking-tight text-slate-800">
                      KABINET KILAU GEMILANG
                    </p>
                    <p className="mt-3 text-xs leading-relaxed text-slate-600">
                      "Kabinet Kilau Gemilang adalah manifestasi dari organisasi yang ditempa dengan kuat (Kilau) untuk melahirkan sejarah prestasi yang abadi (Gemilang)."
                    </p>
                  </div>
                  <div className="mt-6 border-t border-slate-100 pt-4">
                    <span className="inline-flex items-center gap-1 text-xs font-bold text-amber-600">
                      Lihat Organisasi <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
                    </span>
                  </div>
                </article>

                {/* Card HMJ */}
                <article
                  onClick={() => setSearchQuery("HMJ")}
                  className="group flex flex-col justify-between rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-200 ease-out hover:-translate-y-1 hover:border-amber-300 hover:shadow-xl hover:shadow-amber-900/5 cursor-pointer"
                >
                  <div>
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-50 text-amber-600 mb-4">
                      <House size={20} />
                    </div>
                    <h3 className="text-base font-black tracking-tight text-slate-900">
                      HMJ
                    </h3>
                    <p className="mt-1 text-[11px] font-bold uppercase tracking-wider text-amber-600">
                      HIMPUNAN MAHASISWA JURUSAN
                    </p>
                    <p className="mt-3 text-xs leading-relaxed text-slate-600">
                      Wadah mahasiswa pada masing-masing jurusan untuk mengembangkan kompetensi akademik, profesional, dan solidaritas mahasiswa.
                    </p>
                  </div>
                  <div className="mt-6 border-t border-slate-100 pt-4">
                    <span className="inline-flex items-center gap-1 text-xs font-bold text-amber-600">
                      Lihat Organisasi <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
                    </span>
                  </div>
                </article>

                {/* Card UKM */}
                <article
                  onClick={() => setSearchQuery("UKM")}
                  className="group flex flex-col justify-between rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-200 ease-out hover:-translate-y-1 hover:border-amber-300 hover:shadow-xl hover:shadow-amber-900/5 cursor-pointer"
                >
                  <div>
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-50 text-amber-600 mb-4">
                      <Trophy size={20} />
                    </div>
                    <h3 className="text-base font-black tracking-tight text-slate-900">
                      UKM
                    </h3>
                    <p className="mt-1 text-[11px] font-bold uppercase tracking-wider text-amber-600">
                      UNIT KEGIATAN MAHASISWA
                    </p>
                    <p className="mt-3 text-xs leading-relaxed text-slate-600">
                      Wadah mahasiswa untuk mengembangkan minat, bakat, kreativitas, dan prestasi dalam berbagai bidang.
                    </p>
                  </div>
                  <div className="mt-6 border-t border-slate-100 pt-4">
                    <span className="inline-flex items-center gap-1 text-xs font-bold text-amber-600">
                      Lihat Organisasi <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
                    </span>
                  </div>
                </article>

                {/* Card Komunitas */}
                <article
                  onClick={() => setSearchQuery("Komunitas")}
                  className="group flex flex-col justify-between rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-200 ease-out hover:-translate-y-1 hover:border-amber-300 hover:shadow-xl hover:shadow-amber-900/5 cursor-pointer"
                >
                  <div>
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-50 text-amber-600 mb-4">
                      <UsersRound size={20} />
                    </div>
                    <h3 className="text-base font-black tracking-tight text-slate-900">
                      KOMUNITAS
                    </h3>
                    <p className="mt-1 text-[11px] font-bold uppercase tracking-wider text-amber-600">
                      KOMUNITAS KAMPUS
                    </p>
                    <p className="mt-3 text-xs leading-relaxed text-slate-600">
                      Ruang kolaborasi mahasiswa yang terbentuk berdasarkan minat, kreativitas, bakat, dan ketertarikan yang sama.
                    </p>
                  </div>
                  <div className="mt-6 border-t border-slate-100 pt-4">
                    <span className="inline-flex items-center gap-1 text-xs font-bold text-amber-600">
                      Lihat Organisasi <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
                    </span>
                  </div>
                </article>
              </div>
            </div>
          </section>
        )}

        {/* ======================================================== */}
        {/* SEARCH BAR */}
        {/* ======================================================== */}
        <section className="sticky top-[80px] z-40 px-5 py-3 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="flex flex-col gap-4 rounded-2xl border border-amber-300/40 bg-white/95 p-3.5 shadow-lg backdrop-blur-xl sm:flex-row sm:items-center sm:justify-between">
              <div className="flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  onClick={() => setSearchQuery("MPM")}
                  className="rounded-xl border border-amber-200 bg-amber-50/80 px-4 py-2 text-xs font-bold text-amber-600 transition-all duration-200 hover:bg-amber-500 hover:text-white active:scale-[0.98]"
                >
                  MPM
                </button>
                <button
                  type="button"
                  onClick={() => setSearchQuery("BEM")}
                  className="rounded-xl border border-amber-200 bg-amber-50/80 px-4 py-2 text-xs font-bold text-amber-600 transition-all duration-200 hover:bg-amber-500 hover:text-white active:scale-[0.98]"
                >
                  BEM
                </button>
                <button
                  type="button"
                  onClick={() => setSearchQuery("HMJ")}
                  className="rounded-xl border border-amber-200 bg-amber-50/80 px-4 py-2 text-xs font-bold text-amber-600 transition-all duration-200 hover:bg-amber-500 hover:text-white active:scale-[0.98]"
                >
                  HMJ (10)
                </button>
                <button
                  type="button"
                  onClick={() => setSearchQuery("UKM")}
                  className="rounded-xl border border-amber-200 bg-amber-50/80 px-4 py-2 text-xs font-bold text-amber-600 transition-all duration-200 hover:bg-amber-500 hover:text-white active:scale-[0.98]"
                >
                  UKM (7)
                </button>
                <button
                  type="button"
                  onClick={() => setSearchQuery("Komunitas")}
                  className="rounded-xl border border-amber-200 bg-amber-50/80 px-4 py-2 text-xs font-bold text-amber-600 transition-all duration-200 hover:bg-amber-500 hover:text-white active:scale-[0.98]"
                >
                  Komunitas (5)
                </button>
              </div>

              <div className="relative w-full sm:w-64">
                <Search
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                  size={16}
                />
                <input
                  type="text"
                  placeholder="Cari organisasi..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50/80 py-2 pl-9 pr-4 text-xs font-medium text-slate-800 outline-none transition-all placeholder:text-slate-400 focus:border-amber-400 focus:bg-white focus:ring-2 focus:ring-amber-400/30"
                />
              </div>
            </div>
          </div>
        </section>

        {/* ======================================================== */}
        {/* SATU GRID UNIVERSAL UNTUK SEMUA CARD (5 KOLOM DI DESKTOP) */}
        {/* ======================================================== */}
        <section className="px-5 py-10 lg:px-8 lg:py-14">
          <div className="mx-auto max-w-7xl">
            {searchResults.length > 0 ? (
              <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
                {searchResults.map((item) => (
                  <OrgCard key={item.id} item={item} onSelect={setSelectedOrg} />
                ))}
              </div>
            ) : (
              <div className="mx-auto max-w-md rounded-3xl border border-slate-200 bg-white/90 p-10 text-center shadow-lg backdrop-blur-md">
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-amber-50 text-amber-600">
                  <Search size={24} />
                </div>
                <h3 className="text-lg font-black tracking-tight text-slate-900">
                  Organisasi tidak ditemukan
                </h3>
                <p className="mt-2 text-xs leading-relaxed text-slate-600">
                  Tidak ada organisasi yang sesuai dengan pencarian "{searchQuery}".
                </p>
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="mt-6 inline-flex items-center gap-2 rounded-xl bg-amber-500 px-5 py-2.5 text-xs font-bold text-white shadow-md shadow-amber-500/20 transition-all hover:bg-amber-600 active:scale-95"
                >
                  <RotateCcw size={14} />
                  Reset Pencarian
                </button>
              </div>
            )}
          </div>
        </section>

        {/* ======================================================== */}
<<<<<<< HEAD
=======
        {/* SECTION: PERATURAN DAN PEDOMAN ORMAWA POLSRI */}
        {/* (Menggantikan section CTA "BERSAMA, BERKOLABORASI, DAN BERDAMPAK") */}
        {/* Gaya grid 2 kolom, sengaja dibuat beda dari web lama */}
        {/* (web lama: 2 card sejajar + tombol solid di tengah-bawah) */}
        {/* ======================================================== */}
        <section className="px-5 py-16 lg:px-8 lg:py-20">
          <div className="mx-auto max-w-5xl">
            <div className="text-center">
              <span className="inline-flex items-center gap-2 rounded-full bg-amber-50 px-4 py-1.5 text-[11px] font-bold uppercase tracking-widest text-amber-600">
                <ScrollText size={14} />
                Dasar Hukum
              </span>
              <h2 className="mt-4 text-2xl font-black tracking-tight text-amber-600 sm:text-3xl lg:text-4xl">
                PERATURAN DAN PEDOMAN ORMAWA POLSRI
              </h2>
              <p className="mx-auto mt-3 max-w-2xl text-xs leading-relaxed text-slate-600 sm:text-sm">
                Landasan resmi penyelenggaraan organisasi mahasiswa di
                Politeknik Negeri Sriwijaya, tersedia untuk diunduh dan
                dipelajari kapan saja.
              </p>
            </div>

            <div className="mt-10 grid gap-6 sm:grid-cols-2">
              {dokumenOrmawa.map((doc) => (
                <a
                  key={doc.id}
                  href={doc.file}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative flex flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white/90 p-7 shadow-sm backdrop-blur-md transition-all duration-200 ease-out hover:-translate-y-1 hover:border-amber-300 hover:shadow-xl hover:shadow-amber-900/5"
                >
                  <div
                    aria-hidden
                    className="pointer-events-none absolute -right-6 -top-6 h-28 w-28 rounded-full bg-amber-50 transition-transform duration-300 group-hover:scale-110"
                  />

                  <div className="relative flex h-14 w-14 items-center justify-center rounded-2xl bg-amber-500 text-white shadow-md shadow-amber-500/30">
                    <FileText size={26} />
                  </div>

                  <p className="relative mt-5 text-[11px] font-bold uppercase tracking-widest text-amber-600">
                    {doc.subtitle}
                  </p>
                  <h3 className="relative mt-1 text-lg font-black leading-snug tracking-tight text-slate-900 sm:text-xl">
                    {doc.title}
                  </h3>
                  <p className="relative mt-3 flex-1 text-xs leading-relaxed text-slate-600 sm:text-[13px]">
                    {doc.desc}
                  </p>

                  <div className="relative mt-6 flex items-center justify-between border-t border-slate-100 pt-4">
                    <span className="text-[11px] font-semibold uppercase tracking-wide text-slate-400">
                      Format PDF
                    </span>
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-300 bg-white px-4 py-2 text-[11px] font-bold text-amber-600 transition-all duration-200 group-hover:bg-amber-500 group-hover:text-white">
                      <Download size={13} />
                      Unduh
                    </span>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* ======================================================== */}
>>>>>>> 35d496b (Update halaman Organisasi Mahasiswa)
        {/* FOOTER */}
        {/* ======================================================== */}
        <footer className="bg-slate-950 px-5 pb-8 pt-16 text-white lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr] md:gap-8">
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
                    href="https://www.instagram.com/bempolsri_?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
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
                    className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-800 text-slate-300 outline-none transition-all duration-200 hover:bg-amber-500 hover:text-white active:scale-[0.95] focus-visible:ring-2 focus-visible:ring-amber-400/70"
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
              <p>© Departemen Media Informasi BEM Politeknik Negeri Sriwijaya. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </div>

      <OrgDetailModal item={selectedOrg} onClose={() => setSelectedOrg(null)} />
    </main>
  );
}

// ============================================================
// SUBKOMPONEN CARD ORGANISASI MAHASISWA
// ============================================================
function OrgCard({
  item,
  onSelect,
}: {
  item: OrgItem;
  onSelect: (item: OrgItem) => void;
}) {
  const [imgError, setImgError] = useState(false);
  const hasDetail = Boolean(item.description);

  return (
    <article
      onClick={() => hasDetail && onSelect(item)}
      className={`group flex flex-col justify-between rounded-3xl border border-slate-200 bg-white/90 p-6 backdrop-blur-sm transition-all duration-200 ease-out hover:-translate-y-1 hover:border-amber-300 hover:shadow-xl hover:shadow-amber-900/5 ${hasDetail ? "cursor-pointer" : ""
        }`}
    >
      <div>
        <div className="flex items-center justify-between">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-50 px-3 py-1 text-[10px] font-bold uppercase tracking-wide text-amber-600">
            {item.category}
          </span>
          <ExternalLink
            size={16}
            className="text-slate-300 transition-all duration-200 group-hover:text-amber-500"
          />
        </div>

        <div className="my-6 flex h-28 w-full items-center justify-center rounded-2xl bg-slate-50/70 p-3 transition-transform duration-200 group-hover:scale-105">
          {!imgError ? (
            <img
              src={item.image}
              alt={item.name}
              onError={() => setImgError(true)}
              className="max-h-full max-w-full object-contain drop-shadow-sm"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center rounded-xl bg-amber-100/70 font-black text-amber-600">
              {item.name.substring(0, 3).toUpperCase()}
            </div>
          )}
        </div>

        <h3 className="text-base font-black leading-snug text-slate-900 transition-colors duration-200 group-hover:text-amber-600">
          {item.name}
        </h3>
        {item.cabinet && (
          <p className="mt-0.5 text-xs font-bold uppercase tracking-wide text-amber-600">
            {item.cabinet}
          </p>
        )}

        {item.description && (
          <p className="mt-2 line-clamp-2 text-xs leading-relaxed text-slate-500">
            {item.description}
          </p>
        )}
      </div>

      <div className="mt-6 border-t border-slate-100 pt-4">
        {hasDetail ? (
          <span className="inline-flex items-center gap-1 text-xs font-bold text-amber-600">
            Lihat Detail
            <ArrowUpRight
              size={14}
              className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </span>
        ) : (
          <span className="inline-flex items-center gap-1 text-xs font-bold text-slate-400">
            BEM POLSRI
          </span>
        )}
      </div>
    </article>
  );
}

// ============================================================
// MODAL DETAIL ORGANISASI MAHASISWA
// ============================================================
function OrgDetailModal({
  item,
  onClose,
}: {
  item: OrgItem | null;
  onClose: () => void;
}) {
  const [imgError, setImgError] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  if (!item) return null;

  const isBem = item.category === "BEM" || item.id === "bem-1";

  return (
    <div
      className="fixed inset-0 z-[150] flex items-center justify-center p-4 sm:p-6 bg-slate-950/60 backdrop-blur-sm transition-opacity duration-200"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-lg overflow-hidden rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-2xl transition-all duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Tutup detail modal"
          className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-slate-100 text-slate-500 transition-all hover:bg-amber-100 hover:text-amber-600 focus:outline-none focus:ring-2 focus:ring-amber-400"
        >
          <X size={18} />
        </button>

        <div className="mx-auto mb-5 flex h-32 w-32 items-center justify-center rounded-2xl bg-amber-50/60 p-4 shadow-inner">
          {!imgError ? (
            <img
              src={isBem ? "/images/logo.webp" : item.image}
              alt={item.name}
              onError={() => setImgError(true)}
              className="max-h-full max-w-full object-contain drop-shadow-md"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center font-black text-amber-600 text-xl">
              {item.name.substring(0, 3).toUpperCase()}
            </div>
          )}
        </div>

        <div className="text-center">
          <span className="inline-block rounded-full bg-amber-100 px-3.5 py-1 text-xs font-extrabold uppercase tracking-wider text-amber-700">
            {item.category}
          </span>
        </div>

        <h3 className="mt-3 text-center text-xl font-black text-slate-900 sm:text-2xl">
          {isBem ? "BADAN EKSEKUTIF MAHASISWA" : item.name}
        </h3>

        {isBem && (
          <p className="mt-1 text-center text-sm font-extrabold uppercase tracking-wider text-amber-600">
            KABINET KILAU GEMILANG
          </p>
        )}

        <div className="mt-4 max-h-[55vh] overflow-y-auto pr-1">
          {isBem ? (
            <div className="rounded-2xl border border-amber-200/70 bg-amber-50/50 p-4 text-center">
              <p className="text-sm font-medium leading-relaxed text-slate-700 sm:text-base">
                "Kabinet Kilau Gemilang adalah manifestasi dari organisasi yang ditempa dengan kuat (Kilau) untuk melahirkan sejarah prestasi yang abadi (Gemilang)."
              </p>
            </div>
          ) : (
            <p className="text-sm font-normal leading-relaxed text-slate-700 sm:text-base text-justify">
              {item.description}
            </p>
          )}
        </div>

        <div className="mt-6 border-t border-slate-100 pt-4 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="rounded-xl bg-amber-500 px-6 py-2.5 text-xs font-bold text-white shadow-md shadow-amber-500/20 transition-all hover:bg-amber-600 active:scale-95"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
}