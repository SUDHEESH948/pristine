import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { Volume2, VolumeX } from "lucide-react";

import heroVideo from "../assets/Add_this_vido_to_house_to_solo.mp4";

// Local Tata Partner & Certifications assets
import tata1 from "../assets/images/tata1.png";
import tata2 from "../assets/images/tata2.png";
import tata3 from "../assets/images/tata3.png";
import tata4 from "../assets/images/tata4.png";
import tata5 from "../assets/images/tata5.png";
import tata6 from "../assets/images/tata6.png";

const REMOTE_BADGE =
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ_zsRBbJPSsR8hv2BAv26rOA4oVVMpWoJIMJ5uHBQj04kRQaeYPvgK9gYW&s=10";

// =========================================================
// MARQUEE IMAGES LIST
// =========================================================

const PARTNER_LOGOS = [
  { src: REMOTE_BADGE, alt: "Tata Power Solar Partner Seal" },
  { src: tata1, alt: "Tata Power Solar Authorized Dealer" },
  { src: tata2, alt: "PM Surya Ghar Muft Bijli Yojana" },
  { src: tata3, alt: "KSEB Soura Approved" },
  { src: tata4, alt: "MNRE Certified Modules" },
  { src: tata5, alt: "30-Year Performance Warranty" },
  { src: tata6, alt: "Tier-1 Cell Technology" },
];

// =========================================================
// HERO TEXT SLIDES
// =========================================================

const TEXT_SLIDES = [
  {
    badge: "Authorised Channel Partner • Tata Power Solar",
    title: "Power Your Future with Tata Solar Reliability",
    description:
      "High-efficiency rooftop systems backed by 30-year performance warranties. Engineered for homes and businesses across Kerala.",
  },
  {
    badge: "PM Surya Ghar & KSEB Soura Approved",
    title: "Lock In Maximum Subsidies & Zero Power Bills",
    description:
      "Complete end-to-end liaisoning, fast grid-meter synchronization, and subsidy processing for Kerala homeowners.",
  },
  {
    badge: "Genuine Tata Modules & Inverters",
    title: "Engineered for Kerala's Heavy Monsoons",
    description:
      "Corrosion-resistant anodized aluminium mounting structures and certified Tier-1 high-conversion solar cells.",
  },
];

// =========================================================
// HERO COMPONENT
// =========================================================

export default function Hero() {
  const [currentText, setCurrentText] = useState(0);
  const [isVideoMuted, setIsVideoMuted] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentText((prev) => (prev + 1) % TEXT_SLIDES.length);
    }, 6500);

    return () => clearInterval(timer);
  }, []);

  const slide = TEXT_SLIDES[currentText];

  return (
    <section className="relative w-full overflow-hidden bg-[#041122] font-['Plus_Jakarta_Sans',sans-serif] text-white">

      {/* ===================================================
          MAIN HERO VIDEO BANNER
      =================================================== */}

      <div className="mx-auto w-full max-w-[1900px] px-3 pb-4 pt-24 sm:px-5 sm:pt-28 md:px-6 lg:px-8 xl:px-10">
        <div className="relative min-h-[min(760px,calc(100svh-120px))] w-full overflow-hidden rounded-2xl border border-sky-400/20 shadow-2xl shadow-sky-950/50 sm:min-h-[min(780px,calc(100svh-125px))] sm:rounded-3xl md:min-h-[min(800px,calc(100svh-130px))] lg:min-h-[min(820px,calc(100svh-135px))] xl:min-h-[min(840px,calc(100svh-145px))]">

          {/* BACKGROUND VIDEO */}

          <video
            autoPlay
            muted={isVideoMuted}
            loop
            playsInline
            preload="auto"
            className="absolute inset-0 h-full w-full object-cover"
          >
            <source src={heroVideo} type="video/mp4" />
            Your browser does not support the video tag.
          </video>

          <button
            type="button"
            onClick={() => setIsVideoMuted((muted) => !muted)}
            aria-label={isVideoMuted ? "Turn video sound on" : "Mute video sound"}
            className="absolute right-4 top-4 z-20 flex h-11 w-11 items-center justify-center rounded-full border border-white/30 bg-black/40 text-white backdrop-blur-md transition hover:bg-black/60 focus:outline-none focus:ring-2 focus:ring-sky-300"
          >
            {isVideoMuted ? <VolumeX size={19} /> : <Volume2 size={19} />}
          </button>

          {/* GRADIENT OVERLAYS */}

          <div className="absolute inset-0 bg-[#041122]/30" />

          <div className="absolute inset-0 bg-gradient-to-t from-[#041122]/80 via-[#04182e]/30 to-transparent" />

          <div className="absolute inset-0 bg-gradient-to-r from-[#041122]/80 via-[#04182e]/20 to-transparent" />

          {/* BANNER CONTENT */}

          <div className="relative z-10 flex min-h-[min(760px,calc(100svh-120px))] flex-col items-center justify-center px-5 py-10 text-center sm:min-h-[min(780px,calc(100svh-125px))] sm:px-8 sm:py-12 md:min-h-[min(800px,calc(100svh-130px))] md:items-start md:justify-center md:px-12 md:py-14 md:text-left lg:min-h-[min(820px,calc(100svh-135px))] lg:px-16 lg:py-16 xl:min-h-[min(840px,calc(100svh-145px))] xl:px-20 xl:py-16 2xl:px-24 2xl:py-20">

            <div className="w-full max-w-xl sm:max-w-xl md:max-w-2xl lg:max-w-2xl xl:max-w-3xl">

              <AnimatePresence mode="wait">

                <motion.div
                  key={currentText}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{
                    duration: 0.5,
                    ease: "easeInOut",
                  }}
                >

                  {/* BADGE */}

                  <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-sky-400/40 bg-sky-950/60 px-3.5 py-1.5 text-[9px] font-bold uppercase tracking-wider text-sky-200 backdrop-blur-md sm:mb-4 sm:text-[10px]">

                    <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-sky-400" />

                    {slide.badge}

                  </div>

                  {/* TITLE */}

                  <h1 className="mx-auto max-w-full text-2xl font-bold leading-[1.1] tracking-tight text-white sm:max-w-[90%] sm:text-3xl md:mx-0 md:max-w-[90%] md:text-4xl lg:text-5xl xl:text-6xl">
                    {slide.title}
                  </h1>

                  {/* DESCRIPTION */}

                  <p className="mx-auto mt-3 max-w-md text-xs leading-relaxed text-slate-200 sm:mt-4 sm:text-sm md:mx-0 md:max-w-lg lg:text-base xl:max-w-xl xl:text-lg">
                    {slide.description}
                  </p>

                </motion.div>

              </AnimatePresence>

              {/* BUTTONS */}

              <div className="mt-6 flex w-full flex-col items-center gap-3 sm:flex-row sm:justify-center md:justify-start">

                <Link
                  to="/contact"
                  className="w-full max-w-[230px] rounded-full bg-[#004B87] px-6 py-3.5 text-center text-xs font-bold uppercase tracking-wider text-white shadow-lg shadow-sky-950/50 transition-all duration-300 hover:-translate-y-1 hover:bg-[#003865] sm:w-auto sm:max-w-none xl:px-8"
                >
                  Book Free Site Survey
                </Link>

                <Link
                  to="/services"
                  className="w-full max-w-[230px] rounded-full border border-white/30 bg-white/10 px-6 py-3.5 text-center text-xs font-bold uppercase tracking-wider text-white backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:bg-white/20 sm:w-auto sm:max-w-none xl:px-8"
                >
                  Explore Solutions
                </Link>

              </div>

            </div>

          </div>

        </div>
      </div>

      {/* ===================================================
          POSITION 1: FULL-BLEED TATA MARQUEE STRIP
      =================================================== */}

      <div className="w-full border-y border-slate-800 bg-[#020b17] py-8 sm:py-10">

        {/* SECTION TITLE */}

        <div className="mx-auto mb-5 flex items-center justify-center gap-3 px-4 text-center">

          <span className="h-[1px] w-12 bg-sky-500/40" />

          <p className="text-xs font-bold uppercase tracking-[2.5px] text-sky-400 sm:text-sm">
            Authorised Tata Power Solar Partner Network & Approvals
          </p>

          <span className="h-[1px] w-12 bg-sky-500/40" />

        </div>

        {/* MARQUEE WRAPPER */}

        <div
          className="relative flex w-full overflow-hidden"
          style={{
            maskImage:
              "linear-gradient(to right, transparent, black 7%, black 93%, transparent)",
            WebkitMaskImage:
              "linear-gradient(to right, transparent, black 7%, black 93%, transparent)",
          }}
        >

          {/* CONTINUOUS LOOP */}

          <motion.div
            className="flex shrink-0 items-center gap-6 py-3 pr-6 sm:gap-8 sm:pr-8 lg:gap-10"
            animate={{
              x: ["0%", "-50%"],
            }}
            transition={{
              repeat: Infinity,
              ease: "linear",
              duration: 25,
            }}
          >

            {/* DUPLICATED LOGOS FOR SEAMLESS LOOP */}

            {[...PARTNER_LOGOS, ...PARTNER_LOGOS].map((logo, idx) => (

              <div
                key={idx}
                className="group relative flex h-36 w-64 shrink-0 items-center justify-center overflow-hidden rounded-2xl border border-white/10 bg-slate-900 shadow-md transition-all duration-300 hover:border-sky-400/50 hover:shadow-lg hover:shadow-sky-500/10 sm:h-44 sm:w-72 lg:h-52 lg:w-80"
              >

                <img
                  src={logo.src}
                  alt={logo.alt}
                  className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                  loading="lazy"
                />

              </div>

            ))}

          </motion.div>

        </div>

      </div>

    </section>
  );
}