import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./home";
import Contact from "./Contact";
import Kajian from "./Kajian";
import BisikKampus from "./BisikKampus";

function App() {
  return (
    <Router>
      <Routes>
        {/* Halaman Utama */}
        <Route path="/" element={<Home />} />

        {/* Halaman Contact Us */}
        <Route path="/contact" element={<Contact />} />

        {/* Campus Echo */}
        <Route path="/kajian" element={<Kajian />} />
        <Route path="/bisik-kampus" element={<BisikKampus />} />
      </Routes>
    </Router>
  );
}

export default App;