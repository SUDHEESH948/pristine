import { Routes, Route } from "react-router-dom";
import "./App.css";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import WhatsAppButton from "./components/WhatsAppButton";
import ScrollToTop from "./components/ScrollToTop";

import Home from "./pages/Home";
import About from "./pages/About";
import Services from "./pages/Services";
import Projects from "./pages/Projects";
import Contact from "./pages/Contact";
import Pricing from "./pages/Pricing";
function App() {
  return (
    <>
      {/* ================= COMMON NAVBAR ================= */}
      <Navbar />

      {/* ================= SCROLL TO TOP ================= */}
      <ScrollToTop />

      {/* ================= PAGE ROUTES ================= */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/pricing" element={<Pricing />} />
      </Routes>

      {/* ================= COMMON FOOTER ================= */}
      <Footer />

      {/* ================= WHATSAPP BUTTON ================= */}
      <WhatsAppButton />
    </>
  );
}

export default App;