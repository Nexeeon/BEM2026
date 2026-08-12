import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./home";
import Contact from "./Contact";
import Kajian from "./Kajian"; // ✅ TAMBAHKAN IMPORT INI

function App() {
  return (
    <Router>
      <Routes>
        {/* Halaman Utama (Landing Page) */}
        <Route path="/" element={<Home />} />

        {/* Halaman Contact Us Terpisah */}
        <Route path="/contact" element={<Contact />} />

        {/* ✅ TAMBAHKAN ROUTE UNTUK KAJIAN */}
        <Route path="/kajian" element={<Kajian />} />
      </Routes>
    </Router>
  );
}

export default App;