
import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

import logo from "../assets/logo.png";

// =========================================================
// NAVIGATION ROUTES
// =========================================================

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Projects", href: "/projects" },
];

// =========================================================
// NAVBAR
// =========================================================

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
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
        pointer-events-none
        sm:px-5
        sm:pt-5
        lg:px-8
        lg:pt-6
        xl:px-10
      "
    >
      <div
        className="
          mx-auto
          w-full
          max-w-[1900px]
          pointer-events-auto
        "
      >

        {/* =====================================================
            DESKTOP NAVIGATION
        ====================================================== */}

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

          <Link
            to="/"
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
                h-10
                w-10
                shrink-0
                rounded-full
                object-cover
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
          </Link>

          {/* DESKTOP LINKS */}

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
              <Link
                key={label}
                to={href}
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
              </Link>
            ))}
          </nav>

          {/* CONTACT BUTTON */}

          <Link
            to="/contact"
            className="
              inline-flex
              shrink-0
              items-center
              justify-center
              rounded-full
              bg-[#0284c7]
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
          </Link>
        </div>

        {/* =====================================================
            MOBILE NAVIGATION
        ====================================================== */}

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

            {/* MOBILE LOGO */}

            <Link
              to="/"
              onClick={() => setMobileMenuOpen(false)}
              className="
                flex
                items-center
                gap-2.5
              "
            >
              <img
                src={logo}
                alt="Pristine Energy Logo"
                className="
                  h-10
                  w-10
                  shrink-0
                  rounded-full
                  object-cover
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
                    text-[6px]
                    font-bold
                    tracking-[1.8px]
                    text-slate-400
                  "
                >
                  SOLAR SOLUTIONS
                </span>
              </div>
            </Link>

            {/* MOBILE MENU BUTTON */}

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
                  {NAV_LINKS.map(({ label, href }) => (
                    <li key={label}>
                      <Link
                        to={href}
                        onClick={() =>
                          setMobileMenuOpen(false)
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
                      </Link>
                    </li>
                  ))}

                  {/* MOBILE CONTACT */}

                  <li className="pb-1 pt-2">
                    <Link
                      to="/contact"
                      onClick={() =>
                        setMobileMenuOpen(false)
                      }
                      className="
                        block
                        rounded-full
                        bg-[#0284c7]
                        py-3
                        text-xs
                        font-bold
                        text-white
                        shadow-md
                        shadow-rose-500/25
                      "
                    >
                      Contact
                    </Link>
                  </li>
                </ul>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.header>
  );
}
