import "./App.css";
import Heroe from "./components/header";
import Benefit from "./components/OurImpact";
import Aboute from "./components/WhyPristine";
import Value from "./components/Values";
import Services from "./components/Services";
import Testimonials from "./components/Testimonials";
import ContactFooter from "./components/Footer";
function App() {
  return (
    <div className="min-h-screen overflow-hidden bg-[#071a36] text-white">
      <div className="premium-section"><Heroe /></div>
      <div className="premium-section"><Benefit /></div>
      <div className="premium-section"><Aboute /></div>
      <div className="premium-section"><Value /></div>
      <div className="premium-section"><Services /></div>
      <div className="premium-section"><Testimonials /></div>
      <div className="premium-section"><ContactFooter /></div>
    </div>
  );
}

export default App;