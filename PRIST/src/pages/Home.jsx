import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Benefit from "../components/OurImpact";
import Aboute from "../components/WhyPristine";
import Value from "../components/Values";
import ContactFooter from "../components/Footer";

function Home() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#071a36] text-white">

      {/* Navigation */}
      <Navbar />

      {/* Hero Banner */}
      <Hero />

      {/* Other Sections */}
      <section className="premium-section">
        <Benefit />
      </section>

      <section className="premium-section">
        <Aboute />
      </section>

      <section className="premium-section">
        <Value />
      </section>

      <section className="premium-section">
        <ContactFooter />
      </section>

    </main>
  );
}

export default Home;