
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
          pt-28
          pb-3

          sm:px-5
          sm:pt-28
          sm:pb-5

          md:px-6
          md:pt-28

          lg:px-8
          lg:pt-28
          lg:pb-8

          xl:px-10
          xl:pt-28
        "
      >
        {/* ===================================================
            HERO CARD
        =================================================== */}

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

            min-h-[calc(100vh-120px)]

            sm:min-h-[calc(100vh-125px)]
            sm:rounded-3xl

            md:min-h-[calc(100vh-130px)]

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
                scale: 1.08,
              }}
              animate={{
                opacity: 1,
                scale: 1,
              }}
              exit={{
                opacity: 0,
                scale: 1.02,
              }}
              transition={{
                duration: 1,
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
              MOBILE OVERLAY
          =================================================== */}

          <div
            className="
              absolute
              inset-0
              bg-[#041122]/45

              sm:bg-transparent
            "
          />

          {/* ===================================================
              VERTICAL OVERLAY
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
              HORIZONTAL OVERLAY
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
              min-h-[calc(100vh-120px)]
              flex-col
              items-center
              justify-center

              px-5
              py-14
              text-center

              sm:min-h-[calc(100vh-125px)]
              sm:px-8
              sm:py-16

              md:min-h-[calc(100vh-130px)]
              md:items-start
              md:justify-between
              md:px-12
              md:py-16
              md:text-left

              lg:min-h-[calc(100vh-135px)]
              lg:px-16
              lg:py-20

              xl:min-h-[calc(100vh-145px)]
              xl:px-20
              xl:py-20

              2xl:px-24
              2xl:py-24
            "
          >
            {/* =================================================
                TEXT CONTENT
            ================================================= */}

            <div
              className="
                w-full
                max-w-2xl

                sm:max-w-xl

                md:max-w-2xl

                lg:max-w-3xl

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
                  y: 25,
                  scale: 0.9,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                  scale: 1,
                }}
                transition={{
                  duration: 0.6,
                  ease: "easeOut",
                }}
                className="
                  mb-5
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
                  sm:py-2
                  sm:text-[11px]

                  md:mb-4
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
                  y: 35,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  duration: 0.7,
                  delay: 0.12,
                  ease: "easeOut",
                }}
                className="
                  mx-auto
                  max-w-full
                  text-3xl
                  font-bold
                  leading-[1.08]
                  tracking-tight
                  text-white

                  sm:max-w-[90%]
                  sm:text-4xl

                  md:mx-0
                  md:max-w-[95%]
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
                  y: 30,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  duration: 0.7,
                  delay: 0.25,
                  ease: "easeOut",
                }}
                className="
                  mx-auto
                  mt-5
                  max-w-lg
                  text-sm
                  leading-relaxed
                  text-sky-100/90

                  sm:mt-5
                  sm:text-base

                  md:mx-0
                  md:max-w-xl

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
                  y: 30,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  duration: 0.7,
                  delay: 0.4,
                  ease: "easeOut",
                }}
                className="
                  mt-7
                  flex
                  w-full
                  flex-col
                  items-center
                  gap-3

                  sm:mt-8
                  sm:flex-row
                  sm:justify-center

                  md:justify-start

                  md:gap-4
                "
              >
                {/* BOOK FREE SURVEY */}

                <Link
                  to="/contact"
                  className="
                    w-full
                    max-w-[260px]
                    rounded-full
                    bg-sky-500
                    px-6
                    py-3.5
                    text-center
                    text-xs
                    font-bold
                    tracking-wider
                    text-white
                    shadow-lg
                    shadow-sky-500/30
                    transition-all
                    duration-300

                    hover:-translate-y-1
                    hover:bg-sky-400
                    hover:shadow-sky-400/40

                    sm:w-auto
                    sm:max-w-none
                    sm:px-7

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
                    w-full
                    max-w-[260px]
                    rounded-full
                    border
                    border-white/25
                    bg-white/10
                    px-6
                    py-3.5
                    text-center
                    text-xs
                    font-bold
                    tracking-wider
                    text-white
                    backdrop-blur-md
                    transition-all
                    duration-300

                    hover:-translate-y-1
                    hover:bg-white/20

                    sm:w-auto
                    sm:max-w-none
                    sm:px-7

                    xl:px-8
                    xl:py-4
                  "
                >
                  EXPLORE SOLUTIONS
                </Link>
              </motion.div>
            </div>
          </div>

          {/* ===================================================
              MOBILE / TABLET SLIDER ARROWS
              HIDDEN ON LARGE SCREENS
          =================================================== */}

          {/* PREVIOUS */}
          <button
            type="button"
            onClick={handlePrev}
            aria-label="Previous Slide"
            className="
              absolute
              left-3
              top-1/2
              z-30
              flex
              h-10
              w-10
              -translate-y-1/2
              items-center
              justify-center
              rounded-full
              border
              border-white/20
              bg-black/40
              text-white
              shadow-lg
              backdrop-blur-md
              transition-all
              duration-300

              hover:scale-105
              hover:border-sky-400
              hover:bg-sky-500

              sm:left-5
              sm:h-11
              sm:w-11

              md:left-6

              lg:hidden
            "
          >
            <ChevronLeft size={18} />
          </button>

          {/* NEXT */}
          <button
            type="button"
            onClick={handleNext}
            aria-label="Next Slide"
            className="
              absolute
              right-3
              top-1/2
              z-30
              flex
              h-10
              w-10
              -translate-y-1/2
              items-center
              justify-center
              rounded-full
              bg-white
              text-slate-900
              shadow-lg
              transition-all
              duration-300

              hover:scale-105
              hover:bg-sky-400
              hover:text-white

              sm:right-5
              sm:h-11
              sm:w-11

              md:right-6

              lg:hidden
            "
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
    </section>
  );
}

