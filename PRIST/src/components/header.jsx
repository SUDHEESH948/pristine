import { useEffect, useState } from "react";
import {
  Phone,
  ArrowRight,
  TrendingDown,
  ShieldCheck,
  Zap,
  Menu,
  X,
} from "lucide-react";

import logo from "../assets/logo.png";
import image1 from "../assets/image1.png";
import image2 from "../assets/image2.png";

/*
  Fonts:
  Add these to index.html <head>:

  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link
    href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@500;600;700&family=Manrope:wght@400;500;600;700&display=swap"
    rel="stylesheet"
  />
*/

export default function Hero() {
  const [open, setOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState(0);
  const [scrolled, setScrolled] = useState(false);

  const images = [image1, image2];

  const links = [
    ["Home", "#home"],
    ["About", "#about"],
    ["Services", "#services"],
    ["Projects", "#projects"],
    ["Contact", "#contact"],
  ];

  /* =========================================================
     AUTOMATIC IMAGE SLIDER
  ========================================================= */

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  /* =========================================================
     HEADER SCROLL STATE
  ========================================================= */

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <section
      id="home"
      className="
        relative
        h-screen
        min-h-screen
        overflow-hidden
        bg-[#04182E]
        text-white
        font-['Manrope']
      "
    >
      {/* =====================================================
          BACKGROUND IMAGE SLIDER
      ===================================================== */}

      <div className="absolute inset-0 overflow-hidden">
        {images.map((image, index) => (
          <img
            key={image}
            src={image}
            alt={`Solar installation ${index + 1}`}
            className={`
              absolute
              inset-0
              h-full
              w-full
              object-cover
              transition-all
              duration-[1800ms]
              ease-in-out
              ${
                currentImage === index
                  ? "scale-100 opacity-100"
                  : "scale-105 opacity-0"
              }
            `}
          />
        ))}

        {/* Main Dark Overlay */}
        <div
          className="
            absolute
            inset-0
            bg-gradient-to-br
            from-[#04182E]/95
            via-[#07294D]/82
            to-[#0B4F8A]/60
          "
        />

        {/* Bottom Gradient */}
        <div
          className="
            absolute
            inset-0
            bg-gradient-to-t
            from-[#04182E]/90
            via-transparent
            to-[#04182E]/50
          "
        />

        {/* Blue Premium Glow */}
        <div
          className="
            absolute
            inset-0
            bg-[radial-gradient(ellipse_at_top_left,rgba(0,128,255,0.14),transparent_55%)]
          "
        />

        {/* Grid */}
        <div
          className="
            absolute
            inset-0
            opacity-[0.06]
            bg-[linear-gradient(rgba(255,255,255,0.2)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.2)_1px,transparent_1px)]
            bg-[size:60px_60px]
          "
        />
      </div>

      {/* =====================================================
          CONTENT
      ===================================================== */}

      <div className="relative z-10 flex h-full flex-col">

        {/* ===================================================
            NAVBAR
        =================================================== */}

        <nav
          className={`
            sticky
            top-0
            z-20
            border-b
            transition-all
            duration-500
            ${
              scrolled
                ? `
                  border-white/10
                  bg-[#04182E]/80
                  py-4
                  shadow-[0_8px_30px_rgba(0,0,0,0.35)]
                  backdrop-blur-xl
                `
                : `
                  border-white/0
                  bg-transparent
                  py-7
                `
            }
          `}
        >
          <div
            className="
              mx-auto
              flex
              max-w-7xl
              items-center
              justify-between
              px-6
              lg:px-8
            "
          >

            {/* =================================================
                LOGO
            ================================================= */}

            <div className="flex items-center gap-3">
              <img
                src={logo}
                alt="Pristine Energy"
                className="
                  h-11
                  w-11
                  object-contain
                  drop-shadow-[0_0_12px_rgba(0,128,255,0.35)]
                "
              />

              <div>
                <h2
                  className="
                    font-['Cormorant_Garamond']
                    text-xl
                    font-semibold
                    leading-none
                    tracking-wide
                  "
                >
                  Pristine
                  <span className="text-[#0080ff]">
                    Energy
                  </span>
                </h2>

                <p
                  className="
                    mt-1
                    text-[9px]
                    font-medium
                    tracking-[3px]
                    text-[#0080ff]/80
                  "
                >
                  SOLAR&nbsp;SOLUTIONS
                </p>
              </div>
            </div>

            {/* =================================================
                DESKTOP MENU
            ================================================= */}

            <div className="hidden items-center gap-10 lg:flex">
              {links.map(([label, href]) => (
                <a
                  key={label}
                  href={href}
                  className="
                    relative
                    text-xs
                    font-medium
                    tracking-[1.5px]
                    text-gray-200
                    transition
                    duration-300
                    after:absolute
                    after:-bottom-1
                    after:left-0
                    after:h-px
                    after:w-0
                    after:bg-[#0080ff]
                    after:transition-all
                    after:duration-300
                    hover:text-[#0080ff]
                    hover:after:w-full
                  "
                >
                  {label.toUpperCase()}
                </a>
              ))}
            </div>

            {/* =================================================
                RIGHT SIDE
            ================================================= */}

            <div className="hidden items-center gap-6 lg:flex">

              <a
                href="tel:1234567890"
                className="
                  flex
                  items-center
                  gap-2
                  text-xs
                  font-medium
                  tracking-wide
                  text-gray-200
                  transition
                  hover:text-[#0080ff]
                "
              >
                <Phone size={16} />
                (123) 456-7890
              </a>

              <button
                className="
                  group
                  flex
                  items-center
                  gap-2
                  rounded-full
                  border
                  border-[#0080ff]/60
                  bg-gradient-to-r
                  from-[#0080ff]
                  to-[#0066cc]
                  px-5
                  py-2.5
                  text-xs
                  font-semibold
                  tracking-wide
                  text-white
                  shadow-lg
                  shadow-[#0080ff]/20
                  transition
                  duration-300
                  hover:scale-105
                  hover:shadow-[#0080ff]/40
                "
              >
                Free Quote

                <ArrowRight
                  size={16}
                  className="
                    transition-transform
                    duration-300
                    group-hover:translate-x-1
                  "
                />
              </button>
            </div>

            {/* =================================================
                MOBILE MENU BUTTON
            ================================================= */}

            <button
              onClick={() => setOpen(!open)}
              className="
                rounded-md
                border
                border-white/10
                bg-white/5
                p-2
                backdrop-blur-md
                lg:hidden
              "
              aria-label="Toggle menu"
            >
              {open ? (
                <X size={26} />
              ) : (
                <Menu size={26} />
              )}
            </button>
          </div>

          {/* =================================================
              MOBILE MENU
          ================================================= */}

          {open && (
            <div
              className="
                mx-6
                mt-4
                rounded-2xl
                border
                border-white/10
                bg-[#04182E]/95
                p-5
                backdrop-blur-xl
                lg:hidden
              "
            >
              {links.map(([label, href]) => (
                <a
                  key={label}
                  href={href}
                  onClick={() => setOpen(false)}
                  className="
                    block
                    border-b
                    border-white/10
                    py-3
                    text-xs
                    font-medium
                    tracking-[1.5px]
                    text-gray-200
                    last:border-0
                    hover:text-[#0080ff]
                  "
                >
                  {label.toUpperCase()}
                </a>
              ))}

              <button
                className="
                  mt-5
                  w-full
                  rounded-full
                  bg-gradient-to-r
                  from-[#0080ff]
                  to-[#0066cc]
                  py-3
                  text-xs
                  font-semibold
                  tracking-wide
                  text-white
                "
              >
                Free Quote
              </button>
            </div>
          )}
        </nav>

        {/* ===================================================
            HERO CONTENT
        =================================================== */}

        <div
          className="
            mx-auto
            flex
            w-full
            max-w-7xl
            flex-1
            items-center
            px-6
            lg:px-8
          "
        >
          <div className="max-w-3xl">

            {/* =================================================
                BADGE
            ================================================= */}

            <div
              className="
                mb-8
                inline-flex
                items-center
                gap-3
                rounded-full
                border
                border-[#0080ff]/30
                bg-black/30
                px-5
                py-2
                backdrop-blur-md
              "
            >
              <span
                className="
                  h-2
                  w-2
                  animate-pulse
                  rounded-full
                  bg-[#0080ff]
                "
              />

              <span
                className="
                  text-[11px]
                  font-medium
                  tracking-[2px]
                  text-gray-200
                "
              >
                PREMIUM SOLAR INSTALLATION SINCE 2010
              </span>
            </div>

            {/* =================================================
                HEADING
            ================================================= */}

            <h1
              className="
                font-['Cormorant_Garamond']
                text-4xl
                font-semibold
                leading-[1.1]
                tracking-wide
                md:text-6xl
              "
            >
              Power Your Future
              <br />

              <span
                className="
                  bg-gradient-to-r
                  from-[#0080ff]
                  via-[#66b3ff]
                  to-[#0080ff]
                  bg-clip-text
                  text-transparent
                "
              >
                with Clean Solar Energy
              </span>
            </h1>

            {/* =================================================
                DESCRIPTION
            ================================================= */}

            <p
              className="
                mt-6
                max-w-2xl
                text-sm
                font-light
                leading-relaxed
                tracking-wide
                text-gray-300
              "
            >
              Pristine Energy delivers premium solar installation
              for homes and businesses. Reduce your energy bills,
              increase your property value, and join the clean
              energy revolution.
            </p>

            {/* =================================================
                BUTTONS
            ================================================= */}

            <div className="mt-10 flex flex-wrap gap-5">

              {/* Quote Button */}
              <button
                className="
                  group
                  flex
                  items-center
                  gap-3
                  rounded-full
                  bg-gradient-to-r
                  from-[#0080ff]
                  to-[#0066cc]
                  px-7
                  py-3.5
                  text-xs
                  font-semibold
                  tracking-wide
                  text-white
                  shadow-xl
                  shadow-[#0080ff]/25
                  transition
                  duration-300
                  hover:scale-105
                  hover:shadow-[#0080ff]/40
                "
              >
                GET A FREE QUOTE

                <ArrowRight
                  size={18}
                  className="
                    transition-transform
                    duration-300
                    group-hover:translate-x-1
                  "
                />
              </button>

              {/* Services Button */}
              <a
                href="#services"
                className="
                  rounded-full
                  border
                  border-white/20
                  bg-white/5
                  px-7
                  py-3.5
                  text-xs
                  font-semibold
                  tracking-wide
                  backdrop-blur-md
                  transition
                  duration-300
                  hover:border-[#0080ff]/50
                  hover:bg-white/10
                  hover:text-[#0080ff]
                "
              >
                EXPLORE SERVICES
              </a>
            </div>

            {/* =================================================
                STATS
            ================================================= */}

            <div className="mt-16 flex flex-wrap gap-10">

              {/* Stat 1 */}
              <div className="flex items-center gap-3">
                <TrendingDown
                  className="text-[#0080ff]"
                  size={26}
                />

                <div>
                  <h3
                    className="
                      font-['Cormorant_Garamond']
                      text-2xl
                      font-semibold
                    "
                  >
                    70%
                  </h3>

                  <p
                    className="
                      text-[10px]
                      tracking-[1.5px]
                      text-gray-400
                    "
                  >
                    LOWER ENERGY BILLS
                  </p>
                </div>
              </div>

              {/* Stat 2 */}
              <div className="flex items-center gap-3">
                <ShieldCheck
                  className="text-[#0080ff]"
                  size={26}
                />

                <div>
                  <h3
                    className="
                      font-['Cormorant_Garamond']
                      text-2xl
                      font-semibold
                    "
                  >
                    25yr
                  </h3>

                  <p
                    className="
                      text-[10px]
                      tracking-[1.5px]
                      text-gray-400
                    "
                  >
                    PANEL WARRANTY
                  </p>
                </div>
              </div>

              {/* Stat 3 */}
              <div className="flex items-center gap-3">
                <Zap
                  className="text-[#0080ff]"
                  size={26}
                />

                <div>
                  <h3
                    className="
                      font-['Cormorant_Garamond']
                      text-2xl
                      font-semibold
                    "
                  >
                    100%
                  </h3>

                  <p
                    className="
                      text-[10px]
                      tracking-[1.5px]
                      text-gray-400
                    "
                  >
                    CLEAN ENERGY
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ===================================================
            SLIDER INDICATORS
        =================================================== */}

        <div
          className="
            absolute
            bottom-8
            left-1/2
            flex
            -translate-x-1/2
            gap-2
          "
        >
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentImage(index)}
              aria-label={`Show image ${index + 1}`}
              className={`
                h-2
                rounded-full
                transition-all
                duration-500
                ${
                  currentImage === index
                    ? "w-8 bg-[#0080ff]"
                    : "w-2 bg-white/40"
                }
              `}
            />
          ))}
        </div>

        {/* ===================================================
            FLOATING BADGE
        =================================================== */}

        <div
          className="
            absolute
            bottom-8
            right-8
            hidden
            items-center
            gap-2
            rounded-full
            border
            border-[#0080ff]/40
            bg-white
            px-4
            py-3
            text-[#04182E]
            shadow-xl
            sm:flex
          "
        >
          <Zap
            className="text-[#0080ff]"
            size={18}
          />

          <span
            className="
              text-xs
              font-semibold
              tracking-wide
            "
          >
            Clean Energy
          </span>
        </div>
      </div>
    </section>
  );
}