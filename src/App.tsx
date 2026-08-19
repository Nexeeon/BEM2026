import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./home";
import About from "./about"; // <-- Import file about.tsx / about.jsx
import Contact from "./Contact";
import Kajian from "./Kajian";
import BisikKampus from "./BisikKampus";
import AcademicCalendar from "./AcademicCalendar"; 

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

        {/* Academic Calendar */}
        <Route path="/calendar" element={<AcademicCalendar />} />
        <Route path="/academic-calendar" element={<AcademicCalendar />} />
      </Routes>
    </Router>
  );
}

export default App;