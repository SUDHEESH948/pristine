import { motion } from "framer-motion";
import { ShieldCheck, Cpu, Wrench, Headphones, Award } from "lucide-react";
import { useScrollAnimation } from "../hooks/useScrollAnimation";

const TATA_NAVY = "#004B87";

const REASONS = [
  {
    number: "01",
    icon: ShieldCheck,
    title: "Genuine Tata Power Hardware",
    text: "100% authentic Tata Monocrystalline PERC & TopCon solar modules equipped with direct OEM 25-to-30 year performance warranties.",
  },
  {
    number: "02",
    icon: Cpu,
    title: "Kerala Coastal Climate Design",
    text: "Heavy-duty anodized aluminium structures engineered to resist Kerala's intense monsoon rains, coastal saline air, and high winds.",
  },
  {
    number: "03",
    icon: Wrench,
    title: "End-to-End KSEB & Subsidies",
    text: "Complete management of PM Surya Ghar Muft Bijli Yojana paperwork, KSEB Soura net-metering, and grid synchronization.",
  },
  {
    number: "04",
    icon: Headphones,
    title: "Dedicated Local Dealership Care",
    text: "Certified engineers providing fast onsite support across Kozhikode and Northern Kerala with real-time digital generation tracking.",
  },
];

/* =========================================================
   ANIMATION VARIANTS
========================================================= */

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.15,
    },
  },
};

const cardVariants = {
  hidden: {
    opacity: 0,
    x: -80,
    scale: 0.95,
  },
  visible: (index) => ({
    opacity: 1,
    x: 0,
    scale: 1,
    transition: {
      duration: 0.6,
      delay: 0.25 + index * 0.2,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
};

export default function WhyPristine() {
  const { ref, controls } = useScrollAnimation();

  return (
    <section
      id="why-us"
      ref={ref}
      className="relative overflow-hidden bg-white py-20 font-['Manrope'] lg:py-28"
    >
      {/* =====================================================
          BACKGROUND GRID & AMBIENT ACCENTS
      ===================================================== */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(0,75,135,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,75,135,0.03)_1px,transparent_1px)] bg-[size:60px_60px]"
      />

      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 left-1/4 h-72 w-[36rem] rounded-full bg-[#004B87]/5 blur-3xl"
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.4, 0.7, 0.4],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
        {/* ===================================================
            HEADER
        =================================================== */}
        <motion.div
          className="max-w-3xl"
          initial="hidden"
          animate={controls}
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.1, delayChildren: 0.1 },
            },
          }}
        >
          {/* BADGE */}
          <motion.div
            className="inline-flex items-center gap-2 rounded-full border border-sky-200 bg-sky-50 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-[#004B87]"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
          >
            <Award size={14} className="text-[#004B87]" />
            Authorised Tata Power Solar Dealer
          </motion.div>

          {/* HEADING */}
          <motion.h2
            className="mt-4 font-['Plus_Jakarta_Sans',sans-serif] text-3xl font-black tracking-tight text-slate-900 sm:text-4xl lg:text-5xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Why Choose Pristine Horizon for{" "}
            <span className="text-[#004B87]">Tata Solar?</span>
          </motion.h2>

          {/* DESCRIPTION */}
          <motion.p
            className="mt-4 text-base leading-relaxed text-slate-600"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            We merge India&apos;s most recognized green energy brand with swift local
            execution. Receive genuine Tier-1 factory warranties, expedited KSEB net-metering,
            and maximum PM Surya Ghar solar subsidies.
          </motion.p>
        </motion.div>

        {/* ===================================================
            CARDS AREA
        =================================================== */}
        <div className="relative mt-12 lg:mt-16">
          {/* PROGRESS CONNECTOR BAR (DESKTOP) */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute left-0 right-0 top-6 hidden h-[2px] overflow-hidden rounded-full bg-slate-100 lg:block"
          >
            <motion.div
              className="absolute left-0 top-0 h-full w-full origin-left bg-[#004B87]"
              initial={{ scaleX: 0 }}
              animate={controls}
              variants={{
                hidden: { scaleX: 0 },
                visible: {
                  scaleX: 1,
                  transition: {
                    duration: 2.5,
                    delay: 0.5,
                    ease: "linear",
                  },
                },
              }}
            />
          </div>

          {/* CARDS GRID */}
          <motion.div
            className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5"
            variants={containerVariants}
            initial="hidden"
            animate={controls}
          >
            {REASONS.map((item, index) => {
              const Icon = item.icon;

              return (
                <motion.div
                  key={item.number}
                  custom={index}
                  variants={cardVariants}
                  className="group relative flex min-h-[300px] flex-col justify-between overflow-hidden rounded-2xl border border-slate-200/80 bg-white p-7 shadow-sm transition-all duration-300 sm:p-8"
                  whileHover={{
                    y: -8,
                    borderColor: "rgba(0, 75, 135, 0.4)",
                    boxShadow: "0 20px 40px rgba(0, 75, 135, 0.12)",
                  }}
                  whileTap={{ scale: 0.98 }}
                >
                  {/* TOP ACCENT LINE */}
                  <motion.div
                    aria-hidden="true"
                    className="absolute left-0 top-0 h-[3px] bg-[#004B87]"
                    initial={{ width: "0%" }}
                    animate={controls}
                    variants={{
                      hidden: { width: "0%" },
                      visible: {
                        width: "100%",
                        transition: {
                          duration: 0.6,
                          delay: 0.6 + index * 0.4,
                          ease: "easeInOut",
                        },
                      },
                    }}
                  />

                  {/* LEFT HOVER BORDER */}
                  <div className="absolute left-0 top-0 h-full w-1 origin-top bg-gradient-to-b from-[#004B87] to-sky-500 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                  {/* CARD CONTENT */}
                  <div className="relative z-10">
                    <div className="flex items-center justify-between">
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-sky-50 text-[#004B87] transition-all duration-300 group-hover:bg-[#004B87] group-hover:text-white group-hover:shadow-md group-hover:shadow-[#004B87]/30">
                        <Icon size={22} />
                      </div>

                      <span className="text-3xl font-black text-slate-200 transition-colors duration-300 group-hover:text-[#004B87]/30">
                        {item.number}
                      </span>
                    </div>

                    <h3 className="mt-6 text-lg font-bold text-slate-900 transition-colors duration-300 group-hover:text-[#004B87]">
                      {item.title}
                    </h3>

                    <p className="mt-2.5 text-xs leading-relaxed text-slate-600 sm:text-sm">
                      {item.text}
                    </p>
                  </div>

                  {/* BOTTOM HOVER INDICATOR */}
                  <div className="mt-6 h-1 w-8 rounded-full bg-slate-200 transition-all duration-300 group-hover:w-16 group-hover:bg-[#004B87]" />
                </motion.div>
              );
            })}
          </motion.div>
        </div>

        {/* ===================================================
            MOBILE PROGRESS TRACK
        =================================================== */}
        <div
          aria-hidden="true"
          className="mt-8 flex items-center justify-center gap-2 lg:hidden"
        >
          {REASONS.map((item, index) => (
            <div
              key={item.number}
              className="h-1 flex-1 overflow-hidden rounded-full bg-slate-200"
            >
              <motion.div
                className="h-full origin-left bg-[#004B87]"
                initial={{ scaleX: 0 }}
                animate={controls}
                variants={{
                  hidden: { scaleX: 0 },
                  visible: {
                    scaleX: 1,
                    transition: {
                      duration: 0.5,
                      delay: 0.5 + index * 0.3,
                      ease: "easeInOut",
                    },
                  },
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}