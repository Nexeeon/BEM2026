import { lazy, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Lazy loading komponen halaman untuk mempercepat initial bundle load
const Home = lazy(() => import("./home"));
const About = lazy(() => import("./about"));
const Contact = lazy(() => import("./Contact"));
const Kajian = lazy(() => import("./Kajian"));
const BisikKampus = lazy(() => import("./BisikKampus"));
const Polsrifess = lazy(() => import("./Polsrifess"));
const AcademicCalendar = lazy(() => import("./AcademicCalendar"));
const ScholarshipInfo = lazy(() => import("./scholarship-info"));
const MahasiswaBerdampak = lazy(() => import("./mahasiswa_berdampak"));
const OrganisasiMahasiswa = lazy(() => import("./Organisasi_Mahasiswa"));
const Medinfo = lazy(() => import("./Medinfo"));
const Kastrat = lazy(() => import("./Kastrat"));
const Psdm = lazy(() => import("./Psdm"));
const Adkesma = lazy(() => import("./Adkesma"));
const Humas = lazy(() => import("./Humas"));

function PageFallback() {
  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-white/80 backdrop-blur-md">
      <div className="flex flex-col items-center gap-3">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-amber-200 border-t-amber-500" />
        <p className="text-xs font-semibold uppercase tracking-widest text-amber-600">
          Memuat Halaman...
        </p>
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Suspense fallback={<PageFallback />}>
        <Routes>
          {/* Halaman Utama */}
          <Route path="/" element={<Home />} />

          {/* Halaman About Us */}
          <Route path="/about" element={<About />} />

          {/* Halaman Contact Us */}
          <Route path="/contact" element={<Contact />} />

          {/* Campus Echo */}
          <Route path="/kajian" element={<Kajian />} />
          <Route path="/bisik-kampus" element={<BisikKampus />} />
          <Route path="/polsrifess" element={<Polsrifess />} />

          {/* Academic Information */}
          <Route path="/calendar" element={<AcademicCalendar />} />
          <Route path="/academic-calendar" element={<AcademicCalendar />} />
          <Route path="/scholarship-info" element={<ScholarshipInfo />} />
          <Route path="/organisasi-mahasiswa" element={<OrganisasiMahasiswa />} />
          <Route path="/mahasiswa-berdampak" element={<MahasiswaBerdampak />} />

          {/* Halaman Departemen */}
          <Route path="/medinfo" element={<Medinfo />} />
          <Route path="/kastrat" element={<Kastrat />} />
          <Route path="/departemen/kastrat" element={<Kastrat />} />
          <Route path="/psdm" element={<Psdm />} />
          <Route path="/departemen/psdm" element={<Psdm />} />
          <Route path="/adkesma" element={<Adkesma />} />
          <Route path="/departemen/adkesma" element={<Adkesma />} />
          <Route path="/humas" element={<Humas />} />
          <Route path="/departemen/humas" element={<Humas />} />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
