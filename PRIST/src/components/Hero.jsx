
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";

import heroVideo from "../assets/Add_this_vido_to_house_to_solo.mp4";

// =========================================================
// HERO TEXT SLIDES
// =========================================================

const TEXT_SLIDES = [
  {
    badge: "Tier-1 Installation",
    title: "Power Your Future with Clean Solar",
    description:
      "High-efficiency rooftop solar systems engineered for homes, businesses, and industries across Kerala.",
  },
  {
    badge: "25-Year Reliability",
    title: "Smart Solar Solutions for Modern Energy",
    description:
      "Lock in predictable power costs, gain energy independence, and achieve zero carbon emissions.",
  },
  {
    badge: "Clean Energy",
    title: "Make the Switch to Solar Energy",
    description:
      "Reliable and sustainable solar power solutions designed to reduce energy costs and build a cleaner future.",
  },
];

// =========================================================
// HERO COMPONENT
// =========================================================

export default function Hero() {
  const [currentText, setCurrentText] = useState(0);

  // =======================================================
  // AUTOMATIC TEXT SLIDER
  // =======================================================

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentText((prev) => (prev + 1) % TEXT_SLIDES.length);
    }, 6500);

    return () => clearInterval(timer);
  }, []);

  const slide = TEXT_SLIDES[currentText];

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
      {/* ===================================================
          MAIN HERO WRAPPER
      =================================================== */}

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
        {/* =================================================
            HERO CARD
        ================================================= */}

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
          {/* =================================================
              BACKGROUND VIDEO
          ================================================= */}

          <video
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            className="
              absolute
              inset-0
              h-full
              w-full
              object-cover
            "
          >
            <source src={heroVideo} type="video/mp4" />

            Your browser does not support the video tag.
          </video>

          {/* =================================================
              LIGHT OVERLAY
          ================================================= */}

          <div
            className="
              absolute
              inset-0
              bg-[#041122]/10
            "
          />

          {/* =================================================
              LIGHT BOTTOM GRADIENT
          ================================================= */}

          <div
            className="
              absolute
              inset-0
              bg-gradient-to-t
              from-[#041122]/40
              via-[#04182e]/10
              to-transparent
            "
          />

          {/* =================================================
              LIGHT LEFT GRADIENT
          ================================================= */}

          <div
            className="
              absolute
              inset-0
              bg-gradient-to-r
              from-[#041122]/40
              via-[#04182e]/10
              to-transparent
            "
          />

          {/* =================================================
              CONTENT
          ================================================= */}

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
              py-10
              text-center

              sm:min-h-[calc(100vh-125px)]
              sm:px-8
              sm:py-12

              md:min-h-[calc(100vh-130px)]
              md:items-start
              md:justify-center
              md:px-12
              md:py-14
              md:text-left

              lg:min-h-[calc(100vh-135px)]
              lg:px-16
              lg:py-16

              xl:min-h-[calc(100vh-145px)]
              xl:px-20
              xl:py-16

              2xl:px-24
              2xl:py-20
            "
          >
            {/* =================================================
                TEXT CONTENT
            ================================================= */}

            <div
              className="
                w-full
                max-w-xl

                sm:max-w-xl

                md:max-w-2xl

                lg:max-w-2xl

                xl:max-w-3xl
              "
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentText}
                  initial={{
                    opacity: 0,
                    y: 15,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  exit={{
                    opacity: 0,
                    y: -15,
                  }}
                  transition={{
                    duration: 0.5,
                    ease: "easeInOut",
                  }}
                >
                  {/* =================================================
                      BADGE
                  ================================================= */}

                  <div
                    className="
                      mb-3
                      inline-flex
                      items-center
                      gap-2
                      rounded-full
                      border
                      border-sky-400/30
                      bg-sky-950/25
                      px-3
                      py-1
                      text-[9px]
                      font-semibold
                      uppercase
                      tracking-wider
                      text-sky-200
                      backdrop-blur-sm

                      sm:mb-3
                      sm:px-3.5
                      sm:py-1.5
                      sm:text-[10px]
                    "
                  >
                    <span
                      className="
                        h-1.5
                        w-1.5
                        animate-pulse
                        rounded-full
                        bg-sky-400
                      "
                    />

                    {slide.badge}
                  </div>

                  {/* =================================================
                      TITLE
                  ================================================= */}

                  <h1
                    className="
                      mx-auto
                      max-w-full
                      text-2xl
                      font-bold
                      leading-[1.1]
                      tracking-tight
                      text-white

                      sm:max-w-[90%]
                      sm:text-3xl

                      md:mx-0
                      md:max-w-[90%]
                      md:text-4xl

                      lg:text-5xl

                      xl:text-6xl
                    "
                  >
                    {slide.title}
                  </h1>

                  {/* =================================================
                      DESCRIPTION
                  ================================================= */}

                  <p
                    className="
                      mx-auto
                      mt-3
                      max-w-md
                      text-xs
                      leading-relaxed
                      text-white/90

                      sm:mt-3
                      sm:text-sm

                      md:mx-0
                      md:max-w-lg

                      lg:text-base

                      xl:max-w-xl
                      xl:text-lg
                    "
                  >
                    {slide.description}
                  </p>
                </motion.div>
              </AnimatePresence>

              {/* =================================================
                  CTA BUTTONS
              ================================================= */}

              <div
                className="
                  mt-5
                  flex
                  w-full
                  flex-col
                  items-center
                  gap-2.5

                  sm:mt-6
                  sm:flex-row
                  sm:justify-center

                  md:justify-start

                  md:gap-3
                "
              >
                {/* BOOK FREE SURVEY */}

                <Link
                  to="/contact"
                  className="
                    w-full
                    max-w-[230px]
                    rounded-full
                    bg-sky-500
                    px-5
                    py-3
                    text-center
                    text-[11px]
                    font-bold
                    tracking-wider
                    text-white
                    shadow-lg
                    shadow-sky-500/25
                    transition-all
                    duration-300

                    hover:-translate-y-1
                    hover:bg-sky-400

                    sm:w-auto
                    sm:max-w-none
                    sm:px-6

                    xl:px-7
                    xl:py-3.5
                  "
                >
                  BOOK FREE SURVEY
                </Link>

                {/* EXPLORE SOLUTIONS */}

                <Link
                  to="/services"
                  className="
                    w-full
                    max-w-[230px]
                    rounded-full
                    border
                    border-white/25
                    bg-white/10
                    px-5
                    py-3
                    text-center
                    text-[11px]
                    font-bold
                    tracking-wider
                    text-white
                    backdrop-blur-sm
                    transition-all
                    duration-300

                    hover:-translate-y-1
                    hover:bg-white/20

                    sm:w-auto
                    sm:max-w-none
                    sm:px-6

                    xl:px-7
                    xl:py-3.5
                  "
                >
                  EXPLORE SOLUTIONS
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
