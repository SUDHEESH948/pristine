
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

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

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);

  // AUTO SLIDER

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide(
        (prev) => (prev + 1) % SLIDES.length
      );
    }, 6500);

    return () => clearInterval(timer);
  }, []);

  // NEXT

  const handleNext = () => {
    setCurrentSlide(
      (prev) => (prev + 1) % SLIDES.length
    );
  };

  // PREVIOUS

  const handlePrev = () => {
    setCurrentSlide(
      (prev) =>
        (prev - 1 + SLIDES.length) % SLIDES.length
    );
  };

  return (
    <section
      className="
        relative
        h-screen
        min-h-[650px]
        w-full
        overflow-hidden
        bg-[#041122]
        font-['Plus_Jakarta_Sans',sans-serif]
        text-white
      "
    >
      <div
        className="
          mx-auto
          flex
          h-full
          w-full
          max-w-[1900px]
          items-center
          px-3
          pt-24
          pb-4
          sm:px-5
          sm:pt-28
          lg:px-8
          lg:pt-28
          xl:px-10
        "
      >
        <div
          className="
            relative
            h-[calc(100vh-120px)]
            min-h-[520px]
            max-h-[850px]
            w-full
            overflow-hidden
            rounded-3xl
            border
            border-sky-400/20
            shadow-2xl
            shadow-sky-950/50
            sm:h-[calc(100vh-130px)]
            lg:h-[calc(100vh-140px)]
            xl:h-[calc(100vh-150px)]
          "
        >
          {/* BACKGROUND IMAGE */}

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

          {/* OVERLAY */}

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

          {/* CONTENT */}

          <div
            className="
              relative
              z-10
              flex
              h-full
              flex-col
              justify-between
              p-7
              sm:p-12
              lg:p-16
              xl:p-20
              2xl:p-24
            "
          >
            <div
              className="
                max-w-2xl
                xl:max-w-3xl
                2xl:max-w-4xl
              "
            >
              {/* BADGE */}

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
                  px-4
                  py-1
                  text-[11px]
                  font-semibold
                  uppercase
                  tracking-wider
                  text-sky-200
                  backdrop-blur-md
                "
              >
                <span
                  className="
                    h-2
                    w-2
                    animate-pulse
                    rounded-full
                    bg-sky-400
                  "
                />

                {SLIDES[currentSlide].badge}
              </motion.div>

              {/* TITLE */}

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
                  text-4xl
                  font-bold
                  leading-[1.1]
                  tracking-tight
                  text-white
                  sm:text-5xl
                  lg:text-6xl
                  xl:text-7xl
                  2xl:text-8xl
                "
              >
                {SLIDES[currentSlide].title}
              </motion.h1>

              {/* DESCRIPTION */}

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

              {/* BUTTONS */}

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
                  mt-7
                  flex
                  flex-wrap
                  items-center
                  gap-4
                "
              >
                <Link
                  to="/contact"
                  className="
                    rounded-full
                    bg-sky-500
                    px-7
                    py-3.5
                    text-xs
                    font-bold
                    tracking-wider
                    text-white
                    shadow-lg
                    shadow-sky-500/30
                    transition
                    hover:-translate-y-0.5
                    hover:bg-sky-400
                    xl:px-8
                    xl:py-4
                  "
                >
                  BOOK FREE SURVEY
                </Link>

                <Link
                  to="/services"
                  className="
                    rounded-full
                    border
                    border-white/25
                    bg-white/10
                    px-7
                    py-3.5
                    text-xs
                    font-bold
                    tracking-wider
                    text-white
                    backdrop-blur-md
                    transition
                    hover:-translate-y-0.5
                    hover:bg-white/20
                    xl:px-8
                    xl:py-4
                  "
                >
                  EXPLORE SOLUTIONS
                </Link>
              </motion.div>
            </div>

            {/* CONTROLS */}

            <div className="flex items-end justify-between pt-6">
              <div className="flex items-center gap-3">
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
                    hover:border-sky-500
                    hover:bg-sky-500
                    xl:h-12
                    xl:w-12
                  "
                >
                  <ChevronLeft size={18} />
                </button>

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

