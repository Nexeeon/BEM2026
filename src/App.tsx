import { useState } from 'react';
import {
  ArrowRight,
  BookOpen,
  CalendarDays,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  CircleCheck,
  Compass,
  Instagram,
  Lightbulb,
  Mail,
  Megaphone,
  Menu,
  MessageCircle,
  Scale,
  Sparkles,
  Target,
  Users,
  X,
  Youtube,
} from 'lucide-react';

type DropdownName = 'academic' | 'echo' | null;

const missions = [
  { icon: Compass, number: '01', text: 'Mewadahi dan memperjuangkan aspirasi mahasiswa secara terbuka, responsif, dan bertanggung jawab melalui mekanisme penyerapan aspirasi yang aktif, dialogis, dan berkelanjutan.' },
  { icon: Lightbulb, number: '02', text: 'Mendorong peningkatan kualitas pembelajaran organisasi dan kepemimpinan mahasiswa melalui program pengembangan soft skill, manajerial, dan profesionalisme yang terarah.' },
  { icon: Scale, number: '03', text: 'Mengembangkan budaya kajian dan advokasi yang konstruktif dan solutif sebagai landasan pengambilan sikap BEM terhadap isu-isu yang ada.' },
  { icon: Users, number: '04', text: 'Memperkuat sinergi dan kolaborasi internal maupun eksternal melalui kerja sama antar lembaga mahasiswa serta partisipasi aktif dalam kegiatan yang berdampak positif.' },
  { icon: Megaphone, number: '05', text: 'Meningkatkan kualitas dan kuantitas informasi yang disajikan kepada mahasiswa dan masyarakat melalui berbagai media.' },
];

const events = [
  { day: '12', month: 'MAR', title: 'Pilmapres Polsri 2026', type: 'Kompetisi', color: 'bg-amber-400' },
  { day: '18', month: 'MAR', title: 'Polsri Cup Vol. 4', type: 'Olahraga', color: 'bg-orange-500' },
  { day: '26', month: 'MAR', title: 'PPK ORMAWA', type: 'Kemahasiswaan', color: 'bg-slate-800' },
  { day: '04', month: 'APR', title: 'Program Mahasiswa Wirausaha', type: 'Pengembangan', color: 'bg-yellow-500' },
];

function App() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<DropdownName>(null);
  const [selectedMonth, setSelectedMonth] = useState('Maret 2026');

  const toggleDropdown = (name: Exclude<DropdownName, null>) => {
    setOpenDropdown(openDropdown === name ? null : name);
  };

  return (
    <main className="min-h-screen bg-[url('/images/bgweb.jpeg')] bg-cover bg-fixed bg-center bg-no-repeat text-slate-900">
      <div className="min-h-screen bg-white/65">
        <header className="sticky top-0 z-50 border-b border-amber-100 bg-white/90 shadow-sm backdrop-blur-md">
          <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-3.5 lg:px-8">
            <a href="#home" className="flex items-center gap-3" onClick={() => setMobileOpen(false)}>
              <img src="/images/logo.png" alt="Logo Kabinet Kilau Gemilang" className="h-12 w-12 object-contain" />
              <div className="leading-tight">
                <p className="font-bold tracking-tight text-slate-800">Kabinet Kilau Gemilang</p>
                <p className="mt-0.5 text-[11px] font-medium uppercase tracking-[0.12em] text-slate-500">BEM Politeknik Negeri Sriwijaya</p>
              </div>
            </a>

            <button aria-label="Buka menu" className="rounded-lg p-2 text-slate-700 lg:hidden" onClick={() => setMobileOpen(!mobileOpen)}>
              {mobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

            <nav className={`${mobileOpen ? 'absolute left-0 right-0 top-full flex' : 'hidden'} flex-col gap-1 border-b border-amber-100 bg-white/95 px-5 py-4 shadow-md lg:static lg:flex lg:flex-row lg:items-center lg:gap-1 lg:border-0 lg:bg-transparent lg:p-0 lg:shadow-none`}>
              <a href="#home" className="nav-link active" onClick={() => setMobileOpen(false)}>Home</a>
              <a href="#visi" className="nav-link" onClick={() => setMobileOpen(false)}>About</a>
              <div className="relative">
                <button className="nav-link flex w-full items-center justify-between gap-1" onClick={() => toggleDropdown('academic')}>Academic Information <ChevronDown size={14} className={openDropdown === 'academic' ? 'rotate-180 transition-transform' : 'transition-transform'} /></button>
                {openDropdown === 'academic' && <Dropdown items={['Academic Calendar', 'Scholarship Info', 'Organisasi Mahasiswa', 'Mahasiswa Berdampak']} />}
              </div>
              <div className="relative">
                <button className="nav-link flex w-full items-center justify-between gap-1" onClick={() => toggleDropdown('echo')}>Campus Echo <ChevronDown size={14} className={openDropdown === 'echo' ? 'rotate-180 transition-transform' : 'transition-transform'} /></button>
                {openDropdown === 'echo' && <Dropdown items={['Kajian', 'Bisik Kampus', 'Polsrifess']} />}
              </div>
              <a href="#footer" className="nav-link" onClick={() => setMobileOpen(false)}>Contact Us</a>
            </nav>
          </div>
        </header>

        <section id="home" className="relative mx-auto grid max-w-7xl items-center gap-12 px-5 pb-24 pt-20 lg:grid-cols-[1.04fr_.96fr] lg:px-8 lg:pb-32 lg:pt-28">
          <div className="relative z-10">
            <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-amber-200 bg-white/80 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-amber-700 shadow-sm backdrop-blur-sm"><span className="h-2 w-2 rounded-full bg-amber-500 shadow-[0_0_0_4px_rgba(234,179,8,.16)]" /> Kabinet Kilau Gemilang · 2026</div>
            <h1 className="max-w-3xl text-5xl font-black uppercase leading-[.95] tracking-[-0.05em] text-amber-600 sm:text-6xl lg:text-8xl">BEM<br /><span className="text-slate-900">Politeknik</span><br />Negeri Sriwijaya</h1>
            <p className="mt-7 max-w-xl text-lg font-semibold leading-8 text-slate-700">Kabinet Kilau Gemilang — <span className="text-amber-700">Kilaukan Karsa, Gemilangkan Karya.</span></p>
            <p className="mt-4 max-w-lg text-sm leading-7 text-slate-600">BEM Polsri adalah organisasi mahasiswa yang menjalankan fungsi eksekutif di lingkungan Politeknik Negeri Sriwijaya. Kami berkomitmen menjadi wadah yang aktif, responsif, dan konstruktif.</p>
            <div className="mt-9 flex flex-wrap gap-3">
              <a href="#visi" className="group inline-flex items-center gap-2 rounded-full bg-amber-500 px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-amber-500/20 transition hover:-translate-y-0.5 hover:bg-amber-600">Visi & Misi <ArrowRight size={17} className="transition group-hover:translate-x-1" /></a>
            </div>
          </div>
          <div className="relative flex min-h-[420px] items-center justify-center lg:min-h-[570px]">
            <div className="absolute h-[290px] w-[290px] rounded-full bg-amber-200/40 blur-3xl sm:h-[420px] sm:w-[420px]" />
            <div className="relative flex h-[350px] w-[350px] items-center justify-center rounded-full border border-white/80 bg-white/35 p-10 shadow-2xl shadow-amber-900/10 backdrop-blur-sm sm:h-[490px] sm:w-[490px] sm:p-16">
              <div className="absolute inset-5 rounded-full border border-amber-300/50 sm:inset-8" />
              <img src="/images/logo.png" alt="Lentera Sriwijaya" className="relative z-10 w-full object-contain drop-shadow-2xl" />
              <div className="absolute bottom-6 right-0 z-20 rounded-2xl bg-slate-900 px-4 py-3 text-white shadow-xl sm:bottom-14 sm:right-1"><p className="text-[10px] font-bold uppercase tracking-widest text-amber-300">Semangat berkarya</p><p className="mt-1 text-sm font-semibold">Untuk Polsri berdampak.</p></div>
            </div>
          </div>
        </section>

        <section id="visi" className="bg-white/85 px-5 py-20 backdrop-blur-md lg:px-8 lg:py-28">
          <div className="mx-auto max-w-7xl">
            <SectionIntro eyebrow="Arah Gerak Kami" title="Visi & Misi BEM Polsri 2026 — Kabinet Kilau Gemilang" text="Menjadi penerang bagi seluruh mahasiswa untuk bertumbuh, berkolaborasi, dan menciptakan perubahan yang berarti." />
            <div className="mt-14 grid gap-5 lg:grid-cols-[.8fr_1.2fr]">
              <div className="relative overflow-hidden rounded-3xl border border-amber-300/40 bg-gradient-to-br from-amber-50 via-white to-amber-50 p-8 shadow-xl backdrop-blur-md lg:p-10">
                <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full border-[25px] border-amber-500/20" />
                <div className="relative">
                  <div className="mb-8 flex items-center justify-between">
                    <span className="rounded-full bg-amber-400 px-3 py-1.5 text-[10px] font-black uppercase tracking-widest text-slate-900">Visi 2026</span>
                    <Target className="text-amber-500" size={30} />
                  </div>
                  <h3 className="text-2xl font-bold leading-snug text-slate-900">Menjadikan BEM Polsri sebagai lembaga <span className="text-amber-700">berdampak positif</span> bagi mahasiswa dan institusi.</h3>
                  <p className="mt-7 text-sm leading-7 text-slate-600">Menjadikan Badan Eksekutif Mahasiswa Politeknik Negeri Sriwijaya sebagai lembaga yang berdampak positif bagi Mahasiswa/i dan Institusi Politeknik Negeri Sriwijaya.</p>
                  <div className="mt-9 flex items-center gap-3 text-xs font-bold text-amber-700"><CircleCheck size={17} /> Bersama, kita bisa lebih berdampak.</div>
                </div>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                {missions.map((mission) => (
                  <article key={mission.number} className="group rounded-3xl border border-slate-200 bg-white p-6 transition duration-300 hover:-translate-y-1 hover:border-amber-300 hover:shadow-xl hover:shadow-amber-900/5">
                    <div className="flex items-start justify-between">
                      <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-amber-50 text-amber-600 transition group-hover:bg-amber-500 group-hover:text-white"><mission.icon size={21} /></div>
                      <span className="text-3xl font-black text-slate-100">{mission.number}</span>
                    </div>
                    <p className="mt-5 text-xs leading-6 text-slate-500">{mission.text}</p>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="agenda" className="mx-auto max-w-7xl px-5 py-20 lg:px-8 lg:py-28">
          <SectionIntro eyebrow="Catat Tanggalnya" title="Kalender Kegiatan & Akademik" text="Ikuti berbagai agenda penting dan kegiatan seru yang hadir untuk seluruh keluarga besar Politeknik Negeri Sriwijaya." />
          <div className="mt-12 grid gap-6 lg:grid-cols-[.78fr_1.22fr]">
            <div className="rounded-3xl bg-white/90 p-6 shadow-lg shadow-slate-900/5 backdrop-blur-md sm:p-8">
              <div className="flex items-center justify-between">
                <button aria-label="Bulan sebelumnya" onClick={() => setSelectedMonth('Februari 2026')} className="rounded-full p-2 text-slate-500 transition hover:bg-amber-50 hover:text-amber-600"><ChevronLeft size={19} /></button>
                <div className="text-center"><p className="text-xs font-bold uppercase tracking-widest text-amber-600">Kalender Akademik</p><h3 className="mt-1 text-xl font-black text-slate-900">{selectedMonth}</h3></div>
                <button aria-label="Bulan berikutnya" onClick={() => setSelectedMonth('April 2026')} className="rounded-full p-2 text-slate-500 transition hover:bg-amber-50 hover:text-amber-600"><ChevronRight size={19} /></button>
              </div>
              <div className="mt-8 grid grid-cols-7 gap-2 text-center text-[11px] font-bold text-slate-400">
                {['MIN', 'SEN', 'SEL', 'RAB', 'KAM', 'JUM', 'SAB'].map((day) => <span key={day}>{day}</span>)}
                {Array.from({ length: 31 }, (_, index) => (
                  <span key={index} className={`flex aspect-square items-center justify-center rounded-lg text-sm ${index + 1 === 12 ? 'bg-amber-500 font-black text-white shadow-md shadow-amber-500/30' : [18, 26].includes(index + 1) ? 'bg-amber-50 font-bold text-amber-700' : 'text-slate-600 hover:bg-slate-50'}`}>{index + 1}</span>
                ))}
              </div>
              <div className="mt-7 flex flex-wrap gap-4 border-t border-slate-100 pt-5 text-[11px] font-semibold text-slate-500">
                <span className="flex items-center gap-2"><i className="h-2.5 w-2.5 rounded-full bg-amber-500" /> Agenda BEM</span>
                <span className="flex items-center gap-2"><i className="h-2.5 w-2.5 rounded-full bg-amber-100" /> Akademik</span>
              </div>
            </div>
            <div className="rounded-3xl bg-slate-900 p-6 text-white shadow-lg shadow-slate-900/10 sm:p-8">
              <div className="flex items-center justify-between">
                <div><p className="text-xs font-bold uppercase tracking-widest text-amber-400">Agenda Terdekat</p><h3 className="mt-1 text-2xl font-bold">Jangan sampai terlewat.</h3></div>
                <CalendarDays className="text-amber-400" size={30} />
              </div>
              <div className="mt-7 space-y-3">
                {events.map((event) => (
                  <div key={event.title} className="group flex items-center gap-4 rounded-2xl border border-white/10 bg-white/5 p-3 transition hover:bg-white/10">
                    <div className={`flex h-14 w-14 shrink-0 flex-col items-center justify-center rounded-xl text-slate-900 ${event.color}`}><strong className="text-xl leading-none">{event.day}</strong><span className="mt-1 text-[9px] font-black tracking-widest">{event.month}</span></div>
                    <div className="min-w-0 flex-1"><h4 className="truncate text-sm font-bold text-white">{event.title}</h4><p className="mt-1 text-xs text-slate-400">{event.type} <span className="mx-1 text-slate-600">•</span> Polsri</p></div>
                    <ArrowRight size={16} className="mr-2 text-slate-500 transition group-hover:translate-x-1 group-hover:text-amber-400" />
                  </div>
                ))}
              </div>
              <button className="mt-6 flex items-center gap-2 text-xs font-bold text-amber-400 transition hover:text-amber-300">Lihat seluruh agenda <ArrowRight size={14} /></button>
            </div>
          </div>
        </section>

        <footer id="footer" className="bg-slate-950 px-5 pb-8 pt-16 text-white lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr] md:gap-8">
              <div>
                <div className="flex items-center gap-3">
                  <img src="/images/logo.png" alt="Logo BEM Polsri" className="h-14 w-14 object-contain" />
                  <div><h2 className="font-bold">Kabinet Kilau Gemilang</h2><p className="mt-1 text-xs text-slate-400">BEM Politeknik Negeri Sriwijaya</p></div>
                </div>
                <p className="mt-6 max-w-xs text-sm leading-7 text-slate-400">Kilaukan Karsa, Gemilangkan Karya — untuk Politeknik Negeri Sriwijaya yang lebih harmonis dan berdampak.</p>
              </div>
              <div>
                <h3 className="text-xs font-black uppercase tracking-widest text-amber-400">Navigasi</h3>
                <div className="mt-5 grid gap-3 text-sm text-slate-400">
                  <a href="#visi" className="transition hover:text-white">Tentang Kami</a>
                  <a href="#agenda" className="transition hover:text-white">Agenda Kegiatan</a>
                  <a href="#footer" className="transition hover:text-white">Kontak</a>
                </div>
              </div>
              <div>
                <h3 className="text-xs font-black uppercase tracking-widest text-amber-400">Mari Terhubung</h3>
                <p className="mt-5 flex items-start gap-2 text-sm leading-6 text-slate-400"><Mail size={16} className="mt-1 shrink-0 text-amber-400" /> bem@polsri.ac.id</p>
                <p className="mt-3 text-sm leading-6 text-slate-400">Jl. Srijaya Negara, Bukit Besar,<br />Palembang, Sumatera Selatan</p>
                <div className="mt-5 flex gap-2">
                  <a href="#footer" aria-label="Instagram" className="social"><Instagram size={16} /></a>
                  <a href="#footer" aria-label="X Twitter" className="social font-bold">𝕏</a>
                  <a href="#footer" aria-label="YouTube" className="social"><Youtube size={17} /></a>
                </div>
              </div>
            </div>
            <div className="mt-14 flex flex-col justify-between gap-3 border-t border-white/10 pt-6 text-xs text-slate-500 sm:flex-row">
              <p>© 2026 BEM Politeknik Negeri Sriwijaya. All rights reserved.</p>
              <p className="flex items-center gap-1">Dibuat dengan semangat <span className="text-amber-400">•</span> untuk Polsri</p>
            </div>
          </div>
        </footer>
      </div>
    </main>
  );
}

function Dropdown({ items }: { items: string[] }) {
  return <div className="static mt-1 w-full rounded-xl border border-amber-100 bg-white p-2 shadow-xl lg:absolute lg:left-0 lg:top-full lg:mt-2 lg:w-56">{items.map((item) => <a href="#agenda" key={item} className="block rounded-lg px-3 py-2.5 text-xs font-semibold text-slate-600 transition hover:bg-amber-50 hover:text-amber-700">{item}</a>)}</div>;
}

function SectionIntro({ eyebrow, title, text }: { eyebrow: string; title: string; text: string }) {
  return <div className="max-w-2xl"><p className="text-xs font-black uppercase tracking-[0.2em] text-amber-600">{eyebrow}</p><h2 className="mt-3 text-3xl font-black tracking-tight text-slate-900 sm:text-4xl">{title}</h2><p className="mt-4 max-w-xl text-sm leading-7 text-slate-500">{text}</p></div>;
}

export default App;
