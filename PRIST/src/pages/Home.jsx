import Hero from "../components/Hero";
import Benefit from "../components/OurImpact";
import Aboute from "../components/WhyPristine";
import Value from "../components/Values";
import Gallery from "../components/gallery";
import Location from "../components/Location";
function Home() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#071a36] text-white">
      {/* Hero Banner */}
      <Hero />

      {/* Other Sections */}
      <section className="premium-section">
        <Benefit />
      </section>
      <section className="premium-section">
        <Gallery />
      </section>

      <section className="premium-section">
        <Aboute />
      </section>

      <section className="premium-section">
        <Value />
      </section>
      <section className="premium-section">
        <Location />
      </section>
    </main>
  );
}

export default Home;