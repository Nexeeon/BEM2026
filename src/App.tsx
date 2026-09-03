import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./home";
import About from "./about";
import Contact from "./Contact";
import Kajian from "./Kajian";
import BisikKampus from "./BisikKampus";
import Polsrifess from "./Polsrifess";
import AcademicCalendar from "./AcademicCalendar";
import ScholarshipInfo from "./scholarship-info";
import MahasiswaBerdampak from "./mahasiswa_berdampak";
import OrganisasiMahasiswa from "./Organisasi_Mahasiswa";
import Medinfo from "./Medinfo";

function App() {
  return (
    <Router>
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
      </Routes>
    </Router>
  );
}

export default App;
