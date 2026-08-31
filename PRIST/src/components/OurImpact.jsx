
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Sun,
  ShieldCheck,
  Zap,
  Headphones,
  ArrowUpRight,
  ArrowRight,
} from "lucide-react";

import { useScrollAnimation } from "../hooks/useScrollAnimation";

// ============================================================
// IMPACT IMAGES
// ============================================================

import impact1 from "../assets/image1.png";
import impact2 from "../assets/image2.png";

// ============================================================
// IMPACT DATA
// ============================================================

const IMPACT_CARDS = [
  {
    icon: Sun,
    image: impact1,
    value: 500,
    suffix: "+",
    title: "Solar Installations",
    badge: "99.8% CSAT",
    description:
      "Turnkey residential & commercial rooftop systems engineered across Kerala.",
    tag: "Clean Energy",
  },
  {
    icon: ShieldCheck,
    image: impact2,
    value: 15,
    suffix: "+",
    title: "Years Experience",
    badge: "Tier-1 Certified",
    description:
      "Over a decade of trusted engineering, execution, and local compliance.",
    tag: "Proven Quality",
  },
  {
    icon: Zap,
    image: impact1,
    value: 25,
    suffix: " MW+",
    title: "Capacity Deployed",
    badge: "Grid Synchronized",
    description:
      "High-performance energy infrastructure slashing client utility costs.",
    tag: "Scalable Power",
  },
  {
    icon: Headphones,
    image: impact2,
    value: 24,
    suffix: "/7",
    title: "Support & Monitoring",
    badge: "Real-time Telemetry",
    description:
      "Round-the-clock remote array tracking and guaranteed maintenance SLAs.",
    tag: "Always Active",
  },
];

// ============================================================
// COUNTER
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

      const progress = Math.min(
        (timestamp - startTime) / duration,
        1
      );

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
// OUR IMPACT
// ============================================================

export default function OurImpact() {
  const [isVisible, setIsVisible] = useState(false);

  const { ref, controls } = useScrollAnimation();

  // ============================================================
  // INTERSECTION OBSERVER
  // ============================================================

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
      {
        threshold: 0.2,
      }
    );

    observer.observe(currentRef);

    return () => {
      observer.disconnect();
    };
  }, [controls, ref]);

  // ============================================================
  // ANIMATION VARIANTS
  // ============================================================

  const containerVariants = {
    hidden: {
      opacity: 0,
    },

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
      y: 25,
    },

    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  return (
    <section
      id="impact"
      ref={ref}
      className="
        relative
        overflow-hidden
        bg-[#e6f7ff]
        py-16
        font-['Plus_Jakarta_Sans',sans-serif]
        sm:py-20
        md:py-24
      "
    >
      {/* ======================================================
          AMBIENT BACKGROUND
      ======================================================= */}

      <div
        className="
          pointer-events-none
          absolute
          left-1/2
          top-0
          h-80
          w-[42rem]
          -translate-x-1/2
          rounded-full
          bg-sky-200/30
          blur-3xl
        "
        aria-hidden="true"
      />

      {/* ======================================================
          MAIN CONTAINER
      ======================================================= */}

      <div
        className="
          relative
          mx-auto
          max-w-7xl
          px-4
          sm:px-6
          lg:px-8
        "
      >

        {/* ====================================================
            SECTION HEADER
        ===================================================== */}

        <div className="mx-auto max-w-2xl text-center">

          {/* BADGE */}

          <motion.div
            initial={{
              opacity: 0,
              y: 10,
            }}
            animate={
              isVisible
                ? {
                    opacity: 1,
                    y: 0,
                  }
                : {
                    opacity: 0,
                    y: 10,
                  }
            }
            transition={{
              duration: 0.4,
            }}
            className="
              inline-flex
              items-center
              gap-2
              rounded-full
              bg-sky-100
              px-3.5
              py-1
              text-[10px]
              font-semibold
              tracking-wide
              text-sky-700
              sm:text-xs
            "
          >
            <span
              className="
                h-1.5
                w-1.5
                animate-pulse
                rounded-full
                bg-sky-600
              "
            />

            OUR TRACK RECORD
          </motion.div>

          {/* HEADING */}

          <motion.h2
            initial={{
              opacity: 0,
              y: 15,
            }}
            animate={
              isVisible
                ? {
                    opacity: 1,
                    y: 0,
                  }
                : {
                    opacity: 0,
                    y: 15,
                  }
            }
            transition={{
              duration: 0.5,
              delay: 0.1,
            }}
            className="
              mt-3
              text-2xl
              font-bold
              tracking-tight
              text-slate-900
              sm:text-3xl
              md:text-4xl
            "
          >
            Clean Energy at Proven Scale
          </motion.h2>

          {/* DESCRIPTION */}

          <motion.p
            initial={{
              opacity: 0,
              y: 15,
            }}
            animate={
              isVisible
                ? {
                    opacity: 1,
                    y: 0,
                  }
                : {
                    opacity: 0,
                    y: 15,
                  }
            }
            transition={{
              duration: 0.5,
              delay: 0.2,
            }}
            className="
              mx-auto
              mt-3
              max-w-xl
              text-xs
              leading-relaxed
              text-slate-500
              sm:text-sm
              md:text-base
            "
          >
            Powering sustainable growth across Kerala with high-efficiency
            installations and dependable lifetime support.
          </motion.p>
        </div>

        {/* ====================================================
            IMPACT CARDS
        ===================================================== */}

        <motion.div
          className="
            mt-10
            grid
            grid-cols-1
            gap-5
            sm:mt-12
            sm:grid-cols-2
            sm:gap-6
            lg:mt-14
            lg:grid-cols-4
          "
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
                whileHover={{
                  y: -6,
                }}
                className="
                  group
                  relative
                  flex
                  flex-col
                  justify-between
                  overflow-hidden
                  rounded-2xl
                  border
                  border-sky-100
                  bg-white
                  p-4
                  shadow-sm
                  transition-all
                  duration-300
                  hover:border-sky-200
                  hover:shadow-xl
                  hover:shadow-sky-900/5
                  sm:p-5
                "
              >

                {/* =================================================
                    IMAGE / METRIC HEADER
                ================================================== */}

                <div
                  className="
                    relative
                    mb-5
                    h-32
                    w-full
                    overflow-hidden
                    rounded-xl
                    border
                    border-sky-400/20
                    shadow-xl
                    shadow-black/20
                    sm:h-36
                  "
                >

                  {/* IMAGE */}

                  <img
                    src={image}
                    alt={title}
                    className="
                      absolute
                      inset-0
                      h-full
                      w-full
                      object-cover
                      transition-transform
                      duration-700
                      ease-out
                      group-hover:scale-110
                    "
                  />

                  {/* DARK OVERLAY */}

                  <div
                    className="
                      absolute
                      inset-0
                      bg-[#020817]/25
                    "
                  />

                  {/* CINEMATIC GRADIENT */}

                  <div
                    className="
                      absolute
                      inset-0
                      bg-gradient-to-br
                      from-[#041122]/35
                      via-[#071933]/15
                      to-black/70
                    "
                  />

                  {/* BOTTOM GRADIENT */}

                  <div
                    className="
                      absolute
                      inset-x-0
                      bottom-0
                      h-24
                      bg-gradient-to-t
                      from-black/75
                      to-transparent
                    "
                  />

                  {/* BLUE GLOW */}

                  <div
                    className="
                      pointer-events-none
                      absolute
                      -right-10
                      -top-10
                      h-32
                      w-32
                      rounded-full
                      bg-sky-400/20
                      blur-3xl
                    "
                  />

                  {/* IMAGE CONTENT */}

                  <div
                    className="
                      relative
                      z-10
                      flex
                      h-full
                      flex-col
                      justify-between
                      p-3
                      sm:p-4
                    "
                  >

                    {/* TOP */}

                    <div
                      className="
                        flex
                        items-center
                        justify-between
                        gap-2
                      "
                    >

                      {/* ICON */}

                      <div
                        className="
                          flex
                          h-9
                          w-9
                          shrink-0
                          items-center
                          justify-center
                          rounded-full
                          border
                          border-white/20
                          bg-black/30
                          text-sky-300
                          shadow-lg
                          backdrop-blur-md
                          transition
                          duration-300
                          group-hover:border-sky-300/50
                          group-hover:bg-sky-500/20
                          sm:h-10
                          sm:w-10
                        "
                      >
                        <Icon
                          size={18}
                          className="text-sky-300 sm:h-5 sm:w-5"
                        />
                      </div>

                      {/* BADGE */}

                      <span
                        className="
                          rounded-full
                          border
                          border-white/20
                          bg-black/45
                          px-2
                          py-1
                          text-[9px]
                          font-medium
                          text-sky-100
                          shadow-lg
                          backdrop-blur-md
                          sm:px-2.5
                          sm:text-[11px]
                        "
                      >
                        {badge}
                      </span>
                    </div>

                    {/* COUNTER */}

                    <div className="relative">

                      <div
                        className="
                          text-2xl
                          font-bold
                          tracking-tight
                          text-white
                          drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]
                          sm:text-4xl
                        "
                      >
                        <Counter
                          end={value}
                          isVisible={isVisible}
                        />

                        <span
                          className="
                            ml-1
                            text-lg
                            font-semibold
                            text-sky-200
                            drop-shadow-lg
                            sm:text-2xl
                          "
                        >
                          {suffix}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* =================================================
                    CARD CONTENT
                ================================================== */}

                <div className="px-1">

                  {/* TAG */}

                  <span
                    className="
                      text-[10px]
                      font-bold
                      uppercase
                      tracking-wider
                      text-sky-500
                      sm:text-[11px]
                    "
                  >
                    {tag}
                  </span>

                  {/* TITLE */}

                  <h3
                    className="
                      mt-1
                      text-sm
                      font-bold
                      text-slate-900
                      sm:text-base
                    "
                  >
                    {title}
                  </h3>

                  {/* DESCRIPTION */}

                  <p
                    className="
                      mt-2
                      text-[11px]
                      leading-relaxed
                      text-slate-500
                      sm:text-xs
                    "
                  >
                    {description}
                  </p>
                </div>

                {/* =================================================
                    FOOTER
                ================================================== */}

                <div
                  className="
                    mt-5
                    flex
                    items-center
                    justify-between
                    border-t
                    border-sky-50
                    px-1
                    pt-3
                  "
                >
                  <span
                    className="
                      text-[10px]
                      font-semibold
                      text-slate-400
                      transition
                      group-hover:text-sky-600
                      sm:text-xs
                    "
                  >
                    Verified Metric
                  </span>

                  <div
                    className="
                      flex
                      h-8
                      w-8
                      items-center
                      justify-center
                      rounded-full
                      bg-sky-50
                      text-sky-600
                      transition
                      duration-300
                      group-hover:bg-sky-600
                      group-hover:text-white
                    "
                  >
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
          initial={{
            opacity: 0,
            y: 15,
          }}
          animate={
            isVisible
              ? {
                  opacity: 1,
                  y: 0,
                }
              : {
                  opacity: 0,
                  y: 15,
                }
          }
          transition={{
            duration: 0.5,
            delay: 0.6,
          }}
          className="
            mt-10
            flex
            justify-center
            sm:mt-12
          "
        >
          <a
            href="/projects"
            className="
              group
              inline-flex
              w-full
              max-w-xs
              items-center
              justify-center
              gap-2
              rounded-full
              border
              border-sky-300
              bg-white
              px-6
              py-3
              text-center
              text-xs
              font-bold
              tracking-wide
              text-sky-700
              shadow-sm
              transition-all
              duration-300
              hover:-translate-y-1
              hover:border-sky-500
              hover:bg-sky-600
              hover:text-white
              hover:shadow-lg
              hover:shadow-sky-500/20
              sm:w-auto
              sm:max-w-none
              sm:px-7
              sm:py-3.5
            "
          >
            <span>
              View All Completed Projects
            </span>

            <ArrowRight
              size={16}
              className="
                transition-transform
                duration-300
                group-hover:translate-x-1
              "
            />
          </a>
        </motion.div>

      </div>
    </section>
  );
}

