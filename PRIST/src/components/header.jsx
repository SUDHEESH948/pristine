import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  TrendingDown,
  ShieldCheck,
  Zap,
  Menu,
  X,
  Award,
} from "lucide-react";

import logo from "../assets/image.png";
import image1 from "../assets/image1.png";
import image2 from "../assets/image2.png";

const NAV_LINKS = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Projects", href: "#projects" },
];

const STATS = [
  {
    icon: TrendingDown,
    value: "70%",
    title: "Lower Energy Bills",
    description:
      "Substantially cut grid consumption and reduce monthly overhead.",
  },
  {
    icon: ShieldCheck,
    value: "25yr",
    title: "Panel Warranty",
    description:
      "Tier-1 solar modules backed by an industry-leading guarantee.",
  },
  {
    icon: Zap,
    value: "100%",
    title: "Clean Energy",
    description:
      "Zero-emission rooftop generation tailored for homes and businesses.",
  },
  {
    icon: Award,
    value: "15+",
    title: "Years Experience",
    description:
      "Kerala's trusted solar engineering and installation experts.",
  },
];

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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
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
  // SLIDER CONTROLS
  // =========================================================

  const handleNext = () => {
    setCurrentSlide((prev) => (prev + 1) % SLIDES.length);
  };

  const handlePrev = () => {
    setCurrentSlide(
      (prev) => (prev - 1 + SLIDES.length) % SLIDES.length
    );
  };

  // =========================================================
  // SMOOTH NAVIGATION
  // =========================================================

  const handleNavClick = (event, href) => {
    event.preventDefault();

    setMobileMenuOpen(false);

    const target = document.querySelector(href);

    if (target) {
      const navbarOffset = 100;

      const targetPosition =
        target.getBoundingClientRect().top +
        window.scrollY -
        navbarOffset;

      window.scrollTo({
        top: targetPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <>
      {/* =====================================================
          FIXED NAVIGATION
      ====================================================== */}

      <motion.header
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{
          duration: 0.5,
          ease: "easeOut",
        }}
        className="
          fixed
          left-0
          right-0
          top-0
          z-[9999]
          flex
          w-full
          justify-center
          px-3
          pt-4
          sm:px-5
          sm:pt-5
          lg:px-8
          lg:pt-6
          xl:px-10
          pointer-events-none
        "
      >
        {/* SAME WIDTH AS HERO */}

        <div
          className="
            mx-auto
            w-full
            max-w-[1900px]
            pointer-events-auto
          "
        >
          {/* =================================================
              DESKTOP NAVIGATION
          ================================================== */}

          <div
            className="
              hidden
              w-full
              items-center
              justify-between
              rounded-full
              border
              border-slate-200/80
              bg-white/95
              px-6
              py-2.5
              shadow-[0_15px_45px_rgba(0,0,0,0.35)]
              backdrop-blur-xl
              lg:flex
              xl:px-8
              2xl:px-10
            "
          >
            {/* LOGO */}

            <a
              href="#home"
              onClick={(e) => handleNavClick(e, "#home")}
              className="
                flex
                shrink-0
                items-center
                gap-2.5
              "
            >
              <img
                src={logo}
                alt="Pristine Energy Logo"
                className="
                  h-7
                  w-auto
                  object-contain
                  xl:h-8
                "
              />

              <div className="flex flex-col leading-none">
                <span
                  className="
                    whitespace-nowrap
                    text-xs
                    font-black
                    tracking-tight
                    text-slate-900
                    xl:text-sm
                  "
                >
                  PRISTINE{" "}
                  <span className="font-extrabold text-[#0284c7]">
                    ENERGY
                  </span>
                </span>

                <span
                  className="
                    mt-0.5
                    text-[7px]
                    font-bold
                    tracking-[2px]
                    text-slate-400
                    xl:text-[8px]
                  "
                >
                  SOLAR SOLUTIONS
                </span>
              </div>
            </a>

            {/* NAVIGATION LINKS */}

            <nav
              className="
                flex
                items-center
                gap-7
                xl:gap-10
                2xl:gap-12
              "
            >
              {NAV_LINKS.map(({ label, href }) => (
                <a
                  key={label}
                  href={href}
                  onClick={(e) =>
                    handleNavClick(e, href)
                  }
                  className="
                    group
                    relative
                    whitespace-nowrap
                    text-[13px]
                    font-medium
                    text-slate-600
                    transition-all
                    duration-300
                    hover:text-[#0284c7]
                    xl:text-sm
                  "
                >
                  {label}

                  <span
                    className="
                      absolute
                      -bottom-1
                      left-1/2
                      h-[2px]
                      w-0
                      -translate-x-1/2
                      rounded-full
                      bg-[#0284c7]
                      transition-all
                      duration-300
                      group-hover:w-full
                    "
                  />
                </a>
              ))}
            </nav>

            {/* CONTACT */}

            <a
              href="#contact"
              onClick={(e) =>
                handleNavClick(e, "#contact")
              }
              className="
                inline-flex
                shrink-0
                items-center
                justify-center
                rounded-full
                bg-[#f43f5e]
                px-7
                py-2.5
                text-[13px]
                font-semibold
                text-white
                shadow-[0_4px_14px_rgba(244,63,94,0.45)]
                transition-all
                duration-200
                hover:-translate-y-0.5
                hover:bg-[#e11d48]
                hover:shadow-lg
                active:scale-95
                xl:px-8
                xl:py-3
              "
            >
              Contact
            </a>
          </div>

          {/* =================================================
              MOBILE NAVIGATION
          ================================================== */}

          <div
            className="
              flex
              w-full
              flex-col
              rounded-3xl
              border
              border-slate-200
              bg-white/95
              p-3
              shadow-[0_15px_45px_rgba(0,0,0,0.35)]
              backdrop-blur-xl
              lg:hidden
            "
          >
            {/* MOBILE HEADER */}

            <div
              className="
                flex
                items-center
                justify-between
                px-2
              "
            >
              <a
                href="#home"
                onClick={(e) =>
                  handleNavClick(e, "#home")
                }
                className="
                  flex
                  items-center
                  gap-2
                "
              >
                <img
                  src={logo}
                  alt="Pristine Energy Logo"
                  className="
                    h-7
                    w-auto
                    object-contain
                  "
                />

                <div className="flex flex-col leading-none">
                  <span
                    className="
                      text-xs
                      font-black
                      tracking-tight
                      text-slate-900
                    "
                  >
                    PRISTINE{" "}
                    <span className="text-[#0284c7]">
                      ENERGY
                    </span>
                  </span>

                  <span
                    className="
                      mt-0.5
                      text-[6px]
                      font-bold
                      tracking-[1.8px]
                      text-slate-400
                    "
                  >
                    SOLAR SOLUTIONS
                  </span>
                </div>
              </a>

              <button
                type="button"
                onClick={() =>
                  setMobileMenuOpen((prev) => !prev)
                }
                aria-label="Toggle navigation menu"
                className="
                  rounded-full
                  p-2
                  text-slate-700
                  transition
                  hover:bg-slate-100
                  active:scale-95
                "
              >
                {mobileMenuOpen ? (
                  <X size={21} />
                ) : (
                  <Menu size={21} />
                )}
              </button>
            </div>

            {/* MOBILE MENU */}

            <AnimatePresence>
              {mobileMenuOpen && (
                <motion.div
                  initial={{
                    opacity: 0,
                    height: 0,
                  }}
                  animate={{
                    opacity: 1,
                    height: "auto",
                  }}
                  exit={{
                    opacity: 0,
                    height: 0,
                  }}
                  transition={{
                    duration: 0.25,
                  }}
                  className="overflow-hidden"
                >
                  <ul
                    className="
                      mt-2
                      flex
                      flex-col
                      gap-1
                      border-t
                      border-slate-100
                      pt-3
                      text-center
                    "
                  >
                    {NAV_LINKS.map(
                      ({ label, href }) => (
                        <li key={label}>
                          <a
                            href={href}
                            onClick={(e) =>
                              handleNavClick(
                                e,
                                href
                              )
                            }
                            className="
                              block
                              rounded-xl
                              py-2.5
                              text-xs
                              font-semibold
                              text-slate-700
                              transition
                              hover:bg-sky-50
                              hover:text-[#0284c7]
                            "
                          >
                            {label}
                          </a>
                        </li>
                      )
                    )}

                    <li className="pb-1 pt-2">
                      <a
                        href="#contact"
                        onClick={(e) =>
                          handleNavClick(
                            e,
                            "#contact"
                          )
                        }
                        className="
                          block
                          rounded-full
                          bg-[#f43f5e]
                          py-3
                          text-xs
                          font-bold
                          text-white
                          shadow-md
                          shadow-rose-500/25
                        "
                      >
                        Contact
                      </a>
                    </li>
                  </ul>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </motion.header>

      {/* =====================================================
          HERO
          EXACT 100VH
      ====================================================== */}

      <section
        id="home"
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
        {/* =================================================
            SAME WIDTH CONTAINER
        ================================================== */}

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
          {/* =================================================
              HERO BANNER
              FITS INSIDE 100VH
          ================================================== */}

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
            {/* =================================================
                BACKGROUND SLIDE
            ================================================== */}

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

            {/* =================================================
                OVERLAYS
            ================================================== */}

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

            {/* =================================================
                HERO CONTENT
            ================================================== */}

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
              {/* TOP CONTENT */}

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

                {/* CTA BUTTONS */}

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
                  <a
                    href="#contact"
                    onClick={(e) =>
                      handleNavClick(
                        e,
                        "#contact"
                      )
                    }
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
                  </a>

                  <a
                    href="#services"
                    onClick={(e) =>
                      handleNavClick(
                        e,
                        "#services"
                      )
                    }
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
                  </a>
                </motion.div>
              </div>

              {/* =================================================
                  BOTTOM CONTROLS
              ================================================== */}

              <div
                className="
                  flex
                  items-end
                  justify-between
                  pt-6
                "
              >
                {/* SLIDER BUTTONS */}

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

                {/* SCROLL DOWN */}

                <button
                  type="button"
                  onClick={(e) =>
                    handleNavClick(e, "#values")
                  }
                  className="
                    hidden
                    items-center
                    gap-2
                    rounded-full
                    border
                    border-white/10
                    bg-white/10
                    px-4
                    py-2
                    text-xs
                    font-medium
                    text-sky-200
                    backdrop-blur-md
                    transition
                    hover:bg-white/20
                    sm:inline-flex
                  "
                >
                  <span>Scroll down</span>
                  <span>↓</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          VALUES SECTION
      ====================================================== */}

      <section
        id="values"
        className="
          mx-auto
          w-full
          max-w-7xl
          scroll-mt-28
          px-6
          py-14
          lg:px-8
          lg:py-20
        "
      >
        {/* SECTION TITLE */}

        <div
          className="
            mx-auto
            mb-12
            max-w-xl
            text-center
          "
        >
          <h2
            className="
              text-2xl
              font-bold
              tracking-tight
              text-white
              sm:text-3xl
            "
          >
            Top Values for Your Solar Journey
          </h2>

          <p
            className="
              mt-2
              text-xs
              text-slate-400
              sm:text-sm
            "
          >
            Engineered reliability, turnkey
            installations, and lasting savings for
            every rooftop.
          </p>
        </div>

        {/* STATS */}

        <div
          className="
            grid
            grid-cols-1
            gap-6
            sm:grid-cols-2
            lg:grid-cols-4
          "
        >
          {STATS.map(
            ({
              icon: Icon,
              value,
              title,
              description,
            }) => (
              <motion.div
                key={title}
                whileHover={{
                  y: -5,
                }}
                transition={{
                  duration: 0.25,
                }}
                className="
                  flex
                  flex-col
                  items-center
                  rounded-2xl
                  border
                  border-sky-500/10
                  bg-[#071933]/50
                  p-6
                  text-center
                  backdrop-blur-sm
                  transition
                  hover:border-sky-500/30
                  hover:bg-[#071933]/80
                "
              >
                <div
                  className="
                    mb-4
                    flex
                    h-14
                    w-14
                    items-center
                    justify-center
                    rounded-full
                    bg-sky-500/10
                    text-sky-400
                  "
                >
                  <Icon size={26} />
                </div>

                <div
                  className="
                    text-xl
                    font-bold
                    text-white
                  "
                >
                  {value}
                </div>

                <h3
                  className="
                    mt-1
                    text-sm
                    font-semibold
                    text-slate-200
                  "
                >
                  {title}
                </h3>

                <p
                  className="
                    mt-2
                    max-w-[210px]
                    text-xs
                    leading-relaxed
                    text-slate-400
                  "
                >
                  {description}
                </p>
              </motion.div>
            )
          )}
        </div>
      </section>
    </>
  );
}

