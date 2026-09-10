
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

import Login from "./pages/seller/Login";
import Solarprice from "./pages/seller/Solarprice";
import Dashbord from "./pages/seller/dashbord";
import Gallery from "./pages/seller/seller_gallery";
// =========================================================
// PUBLIC WEBSITE LAYOUT
// =========================================================

function PublicLayout() {
  return (
    <>
      <Navbar />

      <ScrollToTop />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/pricing" element={<Pricing />} />
      </Routes>

      <Footer />

      <WhatsAppButton />
    </>
  );
}

// =========================================================
// SELLER LAYOUT
// =========================================================

function SellerLayout() {
  return (
    <>
      <ScrollToTop />

      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/solarprice" element={<Solarprice />} />
        <Route path="/Dashboard" element={<Dashbord />} />
        <Route path="/Gallery" element={< Gallery/>} />
      </Routes>
    </>
  );
}

// =========================================================
// MAIN APP
// =========================================================

function App() {
  return (
    <Routes>

      {/* =====================================================
          PUBLIC WEBSITE
      ===================================================== */}

      <Route
        path="/*"
        element={<PublicLayout />}
      />

      {/* =====================================================
          SELLER PAGES
      ===================================================== */}

      <Route
        path="/login"
        element={<Login />}
      />

      <Route
        path="/solarprice"
        element={<Solarprice />}
      />

      <Route
        path="/Dashboard"
        element={<Dashbord />}
      />

      <Route
        path="/Dashbord"
        element={<Login />}
      />
      <Route
        path="/seller_gallery"
        element={<Gallery/>}
      />


    </Routes>
  );
}

export default App;

