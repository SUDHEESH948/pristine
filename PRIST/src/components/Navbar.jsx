import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ShieldCheck } from "lucide-react";

import logo from "../assets/logo.png";

// NAVIGATION ROUTES
const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Projects", href: "/projects" },
  { label: "Pricing", href: "/pricing" },
];

const BRAND_SKY = "#0284c7";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  const menuVariants = {
    closed: {
      opacity: 0,
      height: 0,
      transition: { duration: 0.25, ease: [0.4, 0, 0.2, 1], when: "afterChildren" },
    },
    open: {
      opacity: 1,
      height: "auto",
      transition: { duration: 0.35, ease: [0.16, 1, 0.3, 1], staggerChildren: 0.05, delayChildren: 0.05 },
    },
  };

  const itemVariants = {
    closed: { opacity: 0, y: -8 },
    open: { opacity: 1, y: 0 },
  };

  return (
    <>
      <motion.header
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="fixed left-0 right-0 top-0 z-[9999] flex w-full justify-center px-3 pt-3 pointer-events-none sm:px-5 sm:pt-4 lg:px-8 lg:pt-4"
      >
        <div className="mx-auto w-full max-w-7xl pointer-events-auto">
          {/* =====================================================
              DESKTOP NAVIGATION
          ====================================================== */}
          <div className="hidden w-full items-center justify-between rounded-full border border-slate-200/80 bg-white/95 px-5 py-2.5 shadow-[0_12px_40px_rgba(0,0,0,0.08)] backdrop-blur-xl lg:flex xl:px-7">
            {/* BRAND & TATA PARTNER CO-BRANDING */}
            <div className="flex items-center gap-3">
              <Link to="/" className="flex shrink-0 items-center gap-2.5">
                <img
                  src={logo}
                  alt="Pristine Horizon Logo"
                  className="h-10 w-10 shrink-0 rounded-full object-cover"
                />
                <div className="flex flex-col leading-none">
                  <span className="whitespace-nowrap text-xs font-black tracking-tight text-slate-900 xl:text-sm">
                    PRISTINE{" "}
                    <span className="font-extrabold" style={{ color: BRAND_SKY }}>
                      HORIZON
                    </span>
                  </span>
                  <span className="mt-0.5 text-[7px] font-bold tracking-[2px] text-slate-400 xl:text-[8px]">
                    SOLAR SOLUTIONS
                  </span>
                </div>
              </Link>

              {/* Vertical divider */}
              <div className="h-7 w-[1px] bg-slate-200" />

              {/* Tata Power Solar Partner Badge (Enlarged) */}
              <div className="flex items-center gap-2 rounded-full border border-sky-100 bg-sky-50/80 px-3.5 py-1.5 text-slate-800">
                <ShieldCheck size={18} className="text-[#004B87] shrink-0" />
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-600">
                  Authorised Channel Partner |{" "}
                  <strong className="text-sm font-black tracking-tight text-[#004B87] xl:text-[15px]">
                    TATA POWER SOLAR
                  </strong>
                </span>
              </div>
            </div>

            {/* DESKTOP LINKS */}
            <nav className="flex items-center gap-5 xl:gap-7">
              {NAV_LINKS.map(({ label, href }) => {
                const isActive = location.pathname === href;
                return (
                  <Link
                    key={label}
                    to={href}
                    className={`group relative whitespace-nowrap text-[13px] font-semibold transition-all duration-200 xl:text-sm ${
                      isActive ? "text-[#004B87]" : "text-slate-600 hover:text-[#004B87]"
                    }`}
                  >
                    <span>{label}</span>
                    <span
                      className={`absolute -bottom-1 left-1/2 h-[2px] -translate-x-1/2 rounded-full bg-[#004B87] transition-all duration-300 ${
                        isActive ? "w-full" : "w-0 group-hover:w-full"
                      }`}
                    />
                  </Link>
                );
              })}
            </nav>

            {/* DESKTOP CTA */}
            <div className="flex items-center gap-3">
              <Link
                to="/contact"
                className="group inline-flex shrink-0 items-center justify-center rounded-full bg-[#004B87] px-5 py-2.5 text-[13px] font-semibold text-white shadow-[0_6px_18px_rgba(0,75,135,0.25)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#003865] hover:shadow-[0_8px_24px_rgba(0,75,135,0.35)] active:scale-95"
              >
                Book Site Survey
              </Link>
            </div>
          </div>

          {/* =====================================================
              MOBILE NAVIGATION BAR & DROPDOWN
          ====================================================== */}
          <div className="relative w-full rounded-2xl border border-slate-200/80 bg-white/95 p-2.5 shadow-[0_12px_40px_rgba(0,0,0,0.12)] backdrop-blur-xl lg:hidden">
            {/* MOBILE TOP BAR */}
            <div className="flex items-center justify-between px-1">
              <Link
                to="/"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-2"
              >
                <img
                  src={logo}
                  alt="Pristine Horizon Logo"
                  className="h-9 w-9 shrink-0 rounded-full object-cover"
                />
                <div className="flex flex-col leading-tight">
                  <span className="whitespace-nowrap text-xs font-black tracking-tight text-slate-900">
                    PRISTINE <span className="text-[#004B87]">HORIZON</span>
                  </span>
                  <span className="text-[11px] font-black tracking-tight text-[#004B87]">
                    TATA POWER SOLAR{" "}
                    <span className="text-[8px] font-medium text-slate-500">Partner</span>
                  </span>
                </div>
              </Link>

              {/* TOGGLE HAMBURGER BUTTON */}
              <button
                type="button"
                onClick={() => setMobileMenuOpen((prev) => !prev)}
                aria-label="Toggle navigation menu"
                aria-expanded={mobileMenuOpen}
                className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-100/80 text-slate-700 transition hover:bg-sky-50 hover:text-[#004B87] active:scale-90"
              >
                <AnimatePresence mode="wait" initial={false}>
                  {mobileMenuOpen ? (
                    <motion.span
                      key="close"
                      initial={{ rotate: -90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: 90, opacity: 0 }}
                      transition={{ duration: 0.15 }}
                    >
                      <X size={20} />
                    </motion.span>
                  ) : (
                    <motion.span
                      key="menu"
                      initial={{ rotate: 90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: -90, opacity: 0 }}
                      transition={{ duration: 0.15 }}
                    >
                      <Menu size={20} />
                    </motion.span>
                  )}
                </AnimatePresence>
              </button>
            </div>

            {/* EXPANDABLE DRAWER */}
            <AnimatePresence>
              {mobileMenuOpen && (
                <motion.div
                  key="mobile-drawer"
                  variants={menuVariants}
                  initial="closed"
                  animate="open"
                  exit="closed"
                  className="overflow-hidden"
                >
                  <ul className="mt-2 flex flex-col gap-1 border-t border-slate-100 pt-3 text-left">
                    {/* Accreditation Strip on Mobile (Enlarged TATA POWER SOLAR) */}
                    <motion.li variants={itemVariants} className="px-2 pb-1">
                      <div className="flex flex-col gap-0.5 rounded-xl bg-sky-50/90 p-2.5 text-[#004B87] border border-sky-100">
                        <div className="flex items-center gap-1.5">
                          <ShieldCheck size={15} className="shrink-0 text-[#004B87]" />
                          <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-500">
                            Authorised Channel Partner
                          </span>
                        </div>
                        <span className="text-base font-black tracking-tight text-[#004B87]">
                          TATA POWER SOLAR
                        </span>
                      </div>
                    </motion.li>

                    {NAV_LINKS.map(({ label, href }) => {
                      const isActive = location.pathname === href;
                      return (
                        <motion.li key={label} variants={itemVariants}>
                          <Link
                            to={href}
                            onClick={() => setMobileMenuOpen(false)}
                            className={`block rounded-xl px-4 py-2 text-sm font-semibold transition ${
                              isActive
                                ? "bg-slate-100 text-[#004B87]"
                                : "text-slate-700 hover:bg-slate-50 hover:text-[#004B87]"
                            }`}
                          >
                            {label}
                          </Link>
                        </motion.li>
                      );
                    })}

                    {/* CONTACT CTA BUTTON */}
                    <motion.li variants={itemVariants} className="pb-1 pt-1">
                      <Link
                        to="/contact"
                        onClick={() => setMobileMenuOpen(false)}
                        className="block w-full rounded-xl bg-[#004B87] py-3 text-center text-xs font-bold text-white shadow-md shadow-sky-900/20 transition hover:bg-[#003865] active:scale-[0.98]"
                      >
                        Book Free Site Survey
                      </Link>
                    </motion.li>
                  </ul>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </motion.header>

      {/* DIM BACKDROP FOR OUTSIDE-CLICK CLOSING */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setMobileMenuOpen(false)}
            className="fixed inset-0 z-[9998] bg-black/30 backdrop-blur-[2px] lg:hidden"
          />
        )}
      </AnimatePresence>
    </>
  );
}