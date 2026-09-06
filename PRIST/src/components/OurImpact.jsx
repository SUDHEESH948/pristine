import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Sun,
  ShieldCheck,
  Zap,
  Headphones,
  ArrowUpRight,
  ArrowRight,
  Award,
} from "lucide-react";

import { useScrollAnimation } from "../hooks/useScrollAnimation";

// ============================================================
// IMPACT IMAGES
// ============================================================

import impact1 from "../assets/image1.png";
import impact2 from "../assets/image2.png";

// ============================================================
// TATA POWER SOLAR AUTHORISED METRICS & DATA
// ============================================================

const IMPACT_CARDS = [
  {
    icon: Sun,
    image: impact1,
    value: 500,
    suffix: "+",
    title: "Tata Solar Installations",
    badge: "PM Surya Ghar Certified",
    description:
      "Rooftop solar arrays connected across Kerala homes with direct government subsidy credits.",
    tag: "Clean Energy",
  },
  {
    icon: ShieldCheck,
    image: impact2,
    value: 30,
    suffix: " Yrs",
    title: "Performance Warranty",
    badge: "Tata Genuine Guarantee",
    description:
      "Direct OEM warranty registration on genuine Tata monocrystalline PERC & TopCon solar modules.",
    tag: "Backed by Tata",
  },
  {
    icon: Zap,
    image: impact1,
    value: 25,
    suffix: " MW+",
    title: "Capacity Energized",
    badge: "KSEB Soura Approved",
    description:
      "High-output distributed rooftop power energized with seamless KSEB net-metering approvals.",
    tag: "Grid Synchronized",
  },
  {
    icon: Headphones,
    image: impact2,
    value: 24,
    suffix: "/7",
    title: "Tata Care & Diagnostics",
    badge: "Certified Engineers",
    description:
      "Local Kerala maintenance teams with real-time remote telemetry, inverter audits, and guaranteed SLAs.",
    tag: "Authorised Support",
  },
];

// ============================================================
// ANIMATED COUNTER
// ============================================================

function Counter({ end, duration = 2000, isVisible }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isVisible) return;

    let startTime = null;
    let animationFrame;

    const animate = (timestamp) => {
      if (!startTime) {
        startTime = timestamp;
      }

      const progress = Math.min((timestamp - startTime) / duration, 1);
      const easeOutCubic = 1 - Math.pow(1 - progress, 3);

      setCount(Math.floor(easeOutCubic * end));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      } else {
        setCount(end);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationFrame);
    };
  }, [end, duration, isVisible]);

  return <>{count}</>;
}

// ============================================================
// OUR IMPACT SECTION COMPONENT
// ============================================================

export default function OurImpact() {
  const [isVisible, setIsVisible] = useState(false);
  const { ref, controls } = useScrollAnimation();

  useEffect(() => {
    const currentRef = ref.current;
    if (!currentRef) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          controls.start("visible");
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(currentRef);

    return () => {
      observer.disconnect();
    };
  }, [controls, ref]);

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
    hidden: { opacity: 0, y: 25 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  return (
    <section
      id="impact"
      ref={ref}
      className="relative overflow-hidden bg-[#f0f9ff] py-16 font-['Plus_Jakarta_Sans',sans-serif] sm:py-20 md:py-24"
    >
      {/* AMBIENT BACKGROUND GLOW */}
      <div
        className="pointer-events-none absolute left-1/2 top-0 h-80 w-[42rem] -translate-x-1/2 rounded-full bg-sky-200/40 blur-3xl"
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* ====================================================
            SECTION HEADER (TATA CO-BRANDED)
        ===================================================== */}
        <div className="mx-auto max-w-2xl text-center">
          {/* BADGE */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
            transition={{ duration: 0.4 }}
            className="inline-flex items-center gap-2 rounded-full border border-sky-200 bg-white/80 px-4 py-1.5 text-[11px] font-bold tracking-wider text-[#004B87] shadow-sm backdrop-blur-sm sm:text-xs"
          >
            <Award size={14} className="text-[#004B87]" />
            AUTHORISED CHANNEL PARTNER TRACK RECORD
          </motion.div>

          {/* HEADING */}
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mt-3 text-2xl font-black tracking-tight text-slate-900 sm:text-3xl md:text-4xl"
          >
            Tata Power Solar Reliability at Kerala Scale
          </motion.h2>

          {/* DESCRIPTION */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mx-auto mt-3 max-w-xl text-xs leading-relaxed text-slate-600 sm:text-sm md:text-base"
          >
            Combining India&apos;s most trusted energy brand with Pristine Horizon&apos;s
            certified execution across Kerala. Official warranties, full PM Surya
            Ghar subsidy processing, and rapid KSEB grid synchronization.
          </motion.p>
        </div>

        {/* ====================================================
            IMPACT CARDS
        ===================================================== */}
        <motion.div
          className="mt-10 grid grid-cols-1 gap-5 sm:mt-12 sm:grid-cols-2 sm:gap-6 lg:mt-14 lg:grid-cols-4"
          variants={containerVariants}
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
        >
          {IMPACT_CARDS.map(
            ({
              icon: Icon,
              image,
              value,
              suffix,
              title,
              badge,
              description,
              tag,
            }) => (
              <motion.div
                key={title}
                variants={cardVariants}
                whileHover={{ y: -6 }}
                className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-sky-100/90 bg-white p-4 shadow-sm transition-all duration-300 hover:border-[#004B87]/30 hover:shadow-xl hover:shadow-[#004B87]/10 sm:p-5"
              >
                {/* IMAGE / METRIC HEADER */}
                <div className="relative mb-5 h-32 w-full overflow-hidden rounded-xl border border-sky-400/20 shadow-xl shadow-black/15 sm:h-36">
                  <img
                    src={image}
                    alt={title}
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                  />

                  {/* OVERLAYS */}
                  <div className="absolute inset-0 bg-[#004B87]/30" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#020b17]/85 via-[#020b17]/30 to-transparent" />

                  {/* OVERLAY CONTENT */}
                  <div className="relative z-10 flex h-full flex-col justify-between p-3 sm:p-4">
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/25 bg-black/40 text-sky-300 shadow-lg backdrop-blur-md transition duration-300 group-hover:border-sky-300 group-hover:bg-[#004B87] group-hover:text-white sm:h-10 sm:w-10">
                        <Icon size={18} />
                      </div>

                      <span className="rounded-full border border-white/20 bg-black/50 px-2.5 py-1 text-[9px] font-bold uppercase tracking-wider text-sky-100 backdrop-blur-md sm:text-[10px]">
                        {badge}
                      </span>
                    </div>

                    {/* METRIC COUNTER */}
                    <div>
                      <div className="text-2xl font-black tracking-tight text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)] sm:text-4xl">
                        <Counter end={value} isVisible={isVisible} />
                        <span className="ml-1 text-lg font-bold text-sky-300 drop-shadow sm:text-2xl">
                          {suffix}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* CARD CONTENT */}
                <div className="px-1">
                  <span className="text-[10px] font-black uppercase tracking-wider text-[#004B87] sm:text-[11px]">
                    {tag}
                  </span>

                  <h3 className="mt-1 text-sm font-bold text-slate-900 sm:text-base">
                    {title}
                  </h3>

                  <p className="mt-2 text-[11px] leading-relaxed text-slate-500 sm:text-xs">
                    {description}
                  </p>
                </div>

                {/* FOOTER */}
                <div className="mt-5 flex items-center justify-between border-t border-sky-50 px-1 pt-3">
                  <span className="text-[10px] font-semibold text-slate-400 transition group-hover:text-[#004B87] sm:text-xs">
                    Tata Authorised Standard
                  </span>

                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-sky-50 text-[#004B87] transition duration-300 group-hover:bg-[#004B87] group-hover:text-white">
                    <ArrowUpRight size={16} />
                  </div>
                </div>
              </motion.div>
            )
          )}
        </motion.div>

        {/* ====================================================
            VIEW ALL PROJECTS CTA
        ===================================================== */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-10 flex justify-center sm:mt-12"
        >
          <Link
            to="/projects"
            className="group inline-flex w-full max-w-xs items-center justify-center gap-2 rounded-full border border-sky-300 bg-white px-6 py-3 text-center text-xs font-bold tracking-wide text-[#004B87] shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#004B87] hover:bg-[#004B87] hover:text-white hover:shadow-lg hover:shadow-sky-900/15 sm:w-auto sm:max-w-none sm:px-7 sm:py-3.5"
          >
            <span>View Kerala Tata Solar Installations</span>
            <ArrowRight
              size={16}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}