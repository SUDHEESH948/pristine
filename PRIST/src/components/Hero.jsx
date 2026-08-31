import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

import image1 from "../assets/image1.png";
import image2 from "../assets/image2.png";

// =========================================================
// HERO SLIDES
// =========================================================

const SLIDES = [
  {
    image: image1,
    badge: "Tier-1 Installation",
    title: "Power Your Future with Clean Solar",
    subtitle:
      "High-efficiency rooftop solar systems engineered for homes, businesses, and industries across Kerala.",
  },
  {
    image: image2,
    badge: "25-Year Reliability",
    title: "Smart Solar Solutions for Modern Energy",
    subtitle:
      "Lock in predictable power costs, gain energy independence, and achieve zero carbon emissions.",
  },
];

// =========================================================
// HERO COMPONENT
// =========================================================

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);

  // =========================================================
  // AUTO SLIDER
  // =========================================================

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % SLIDES.length);
    }, 6500);

    return () => clearInterval(timer);
  }, []);

  // =========================================================
  // NEXT SLIDE
  // =========================================================

  const handleNext = () => {
    setCurrentSlide((prev) => (prev + 1) % SLIDES.length);
  };

  // =========================================================
  // PREVIOUS SLIDE
  // =========================================================

  const handlePrev = () => {
    setCurrentSlide(
      (prev) => (prev - 1 + SLIDES.length) % SLIDES.length
    );
  };

  return (
    <section
      className="
        relative
        min-h-screen
        w-full
        overflow-hidden
        bg-[#041122]
        font-['Plus_Jakarta_Sans',sans-serif]
        text-white
      "
    >
      {/* =====================================================
          MAIN HERO WRAPPER
      ===================================================== */}

      <div
        className="
          mx-auto
          w-full
          max-w-[1900px]
          px-3
          pt-20
          pb-3

          sm:px-5
          sm:pt-24
          sm:pb-5

          lg:px-8
          lg:pt-28
          lg:pb-8

          xl:px-10
          xl:pt-28
        "
      >
        {/* =====================================================
            HERO CARD
        ===================================================== */}

        <div
          className="
            relative
            w-full
            overflow-hidden
            rounded-2xl
            border
            border-sky-400/20
            shadow-2xl
            shadow-sky-950/50

            min-h-[calc(100vh-100px)]

            sm:min-h-[calc(100vh-115px)]
            sm:rounded-3xl

            md:min-h-[calc(100vh-120px)]

            lg:min-h-[calc(100vh-135px)]

            xl:min-h-[calc(100vh-145px)]
          "
        >
          {/* ===================================================
              BACKGROUND IMAGE
          =================================================== */}

          <AnimatePresence initial={false}>
            <motion.img
              key={currentSlide}
              src={SLIDES[currentSlide].image}
              alt="Solar energy project"
              initial={{
                opacity: 0,
                scale: 1.06,
              }}
              animate={{
                opacity: 1,
                scale: 1,
              }}
              exit={{
                opacity: 0,
              }}
              transition={{
                duration: 0.9,
                ease: "easeInOut",
              }}
              className="
                absolute
                inset-0
                h-full
                w-full
                object-cover
              "
            />
          </AnimatePresence>

          {/* ===================================================
              DARK VERTICAL OVERLAY
          =================================================== */}

          <div
            className="
              absolute
              inset-0
              bg-gradient-to-t
              from-[#041122]
              via-[#04182e]/60
              to-[#04182e]/20
            "
          />

          {/* ===================================================
              DARK HORIZONTAL OVERLAY
          =================================================== */}

          <div
            className="
              absolute
              inset-0
              bg-gradient-to-r
              from-[#041122]/90
              via-[#04182e]/40
              to-transparent
            "
          />

          {/* ===================================================
              CONTENT
          =================================================== */}

          <div
            className="
              relative
              z-10
              flex
              min-h-[calc(100vh-100px)]
              flex-col
              justify-between

              p-6

              sm:min-h-[calc(100vh-115px)]
              sm:p-10

              md:min-h-[calc(100vh-120px)]
              md:p-12

              lg:min-h-[calc(100vh-135px)]
              lg:p-16

              xl:min-h-[calc(100vh-145px)]
              xl:p-20

              2xl:p-24
            "
          >
            {/* =================================================
                TEXT CONTENT
            ================================================= */}

            <div
              className="
                w-full
                max-w-2xl

                xl:max-w-3xl

                2xl:max-w-4xl
              "
            >
              {/* =================================================
                  BADGE
              ================================================= */}

              <motion.div
                key={`badge-${currentSlide}`}
                initial={{
                  opacity: 0,
                  y: 10,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  duration: 0.4,
                }}
                className="
                  mb-4
                  inline-flex
                  items-center
                  gap-2
                  rounded-full
                  border
                  border-sky-400/30
                  bg-sky-950/70
                  px-3
                  py-1.5
                  text-[10px]
                  font-semibold
                  uppercase
                  tracking-wider
                  text-sky-200
                  backdrop-blur-md

                  sm:px-4
                  sm:py-1
                  sm:text-[11px]
                "
              >
                <span
                  className="
                    h-1.5
                    w-1.5
                    animate-pulse
                    rounded-full
                    bg-sky-400

                    sm:h-2
                    sm:w-2
                  "
                />

                {SLIDES[currentSlide].badge}
              </motion.div>

              {/* =================================================
                  TITLE
              ================================================= */}

              <motion.h1
                key={`title-${currentSlide}`}
                initial={{
                  opacity: 0,
                  y: 20,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  duration: 0.5,
                  delay: 0.1,
                }}
                className="
                  max-w-[95%]
                  text-3xl
                  font-bold
                  leading-[1.08]
                  tracking-tight
                  text-white

                  sm:text-4xl

                  md:text-5xl

                  lg:text-6xl

                  xl:text-7xl

                  2xl:text-8xl
                "
              >
                {SLIDES[currentSlide].title}
              </motion.h1>

              {/* =================================================
                  DESCRIPTION
              ================================================= */}

              <motion.p
                key={`desc-${currentSlide}`}
                initial={{
                  opacity: 0,
                  y: 20,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  duration: 0.5,
                  delay: 0.2,
                }}
                className="
                  mt-4
                  max-w-xl
                  text-sm
                  leading-relaxed
                  text-sky-100/90

                  sm:text-base

                  lg:text-lg

                  xl:max-w-2xl
                  xl:text-xl
                "
              >
                {SLIDES[currentSlide].subtitle}
              </motion.p>

              {/* =================================================
                  CTA BUTTONS
              ================================================= */}

              <motion.div
                key={`cta-${currentSlide}`}
                initial={{
                  opacity: 0,
                  y: 20,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  duration: 0.5,
                  delay: 0.3,
                }}
                className="
                  mt-6
                  flex
                  flex-col
                  items-stretch
                  gap-3

                  sm:mt-7
                  sm:flex-row
                  sm:items-center
                  sm:gap-4
                "
              >
                {/* BOOK FREE SURVEY */}

                <Link
                  to="/contact"
                  className="
                    rounded-full
                    bg-sky-500
                    px-6
                    py-3
                    text-center
                    text-xs
                    font-bold
                    tracking-wider
                    text-white
                    shadow-lg
                    shadow-sky-500/30
                    transition
                    duration-300
                    hover:-translate-y-0.5
                    hover:bg-sky-400

                    sm:px-7
                    sm:py-3.5

                    xl:px-8
                    xl:py-4
                  "
                >
                  BOOK FREE SURVEY
                </Link>

                {/* EXPLORE SOLUTIONS */}

                <Link
                  to="/services"
                  className="
                    rounded-full
                    border
                    border-white/25
                    bg-white/10
                    px-6
                    py-3
                    text-center
                    text-xs
                    font-bold
                    tracking-wider
                    text-white
                    backdrop-blur-md
                    transition
                    duration-300
                    hover:-translate-y-0.5
                    hover:bg-white/20

                    sm:px-7
                    sm:py-3.5

                    xl:px-8
                    xl:py-4
                  "
                >
                  EXPLORE SOLUTIONS
                </Link>
              </motion.div>
            </div>

            {/* =================================================
                SLIDER CONTROLS
            ================================================= */}

            <div
              className="
                flex
                items-end
                justify-between
                pt-8
              "
            >
              <div className="flex items-center gap-3">
                {/* =================================================
                    PREVIOUS BUTTON
                ================================================= */}

                <button
                  type="button"
                  onClick={handlePrev}
                  aria-label="Previous Slide"
                  className="
                    flex
                    h-10
                    w-10
                    items-center
                    justify-center
                    rounded-full
                    border
                    border-white/15
                    bg-black/40
                    text-white
                    backdrop-blur-md
                    transition
                    duration-300
                    hover:border-sky-500
                    hover:bg-sky-500

                    xl:h-12
                    xl:w-12
                  "
                >
                  <ChevronLeft size={18} />
                </button>

                {/* =================================================
                    NEXT BUTTON
                ================================================= */}

                <button
                  type="button"
                  onClick={handleNext}
                  aria-label="Next Slide"
                  className="
                    flex
                    h-10
                    w-10
                    items-center
                    justify-center
                    rounded-full
                    bg-white
                    text-slate-900
                    transition
                    duration-300
                    hover:bg-sky-400
                    hover:text-white

                    xl:h-12
                    xl:w-12
                  "
                >
                  <ChevronRight size={18} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}