
import { motion } from "framer-motion";
import { ShieldCheck, Cpu, Wrench, Headphones } from "lucide-react";
import { useScrollAnimation } from "../hooks/useScrollAnimation";

const REASONS = [
  {
    number: "01",
    icon: ShieldCheck,
    title: "Kerala Climate Engineering",
    text: "Custom solar installations engineered to withstand heavy monsoons, high humidity, and local roofing architectures.",
  },
  {
    number: "02",
    icon: Cpu,
    title: "Tier-1 Quality Components",
    text: "High-efficiency panels, smart micro/string inverters, and robust mounting structures with extended manufacturer warranties.",
  },
  {
    number: "03",
    icon: Wrench,
    title: "Seamless End-to-End Execution",
    text: "From initial site feasibility surveys and KSEB net-metering paperwork to certified grid synchronization.",
  },
  {
    number: "04",
    icon: Headphones,
    title: "Dedicated Lifetime Support",
    text: "Continuous generation monitoring, scheduled maintenance checks, and responsive on-call local support.",
  },
];

/* =========================================================
   HEADER ANIMATION
========================================================= */

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

/* =========================================================
   CARD ANIMATION
   LEFT → RIGHT
========================================================= */

const cardVariants = {
  hidden: {
    opacity: 0,
    x: -100,
    scale: 0.94,
  },

  visible: (index) => ({
    opacity: 1,
    x: 0,
    scale: 1,

    transition: {
      duration: 0.7,
      delay: 0.35 + index * 0.55,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
};

export default function WhyPristine() {
  const { ref, controls } = useScrollAnimation();

  return (
    <section
      id="about"
      ref={ref}
      className="
        relative
        overflow-hidden
        bg-white
        py-20
        font-['Manrope']
        lg:py-28
      "
    >
      {/* =====================================================
          BACKGROUND GRID
      ===================================================== */}

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          inset-0
          bg-[linear-gradient(rgba(0,128,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,128,255,0.03)_1px,transparent_1px)]
          bg-[size:60px_60px]
        "
      />

      {/* =====================================================
          BACKGROUND GLOW
      ===================================================== */}

      <motion.div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          -top-24
          left-1/4
          h-72
          w-[36rem]
          rounded-full
          bg-[#0080ff]/5
          blur-3xl
        "
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
          className="max-w-2xl"
          initial="hidden"
          animate={controls}
          variants={{
            hidden: {
              opacity: 0,
            },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.1,
                delayChildren: 0.1,
              },
            },
          }}
        >
          {/* BADGE */}

          <motion.div
            className="
              inline-flex
              items-center
              gap-2
              rounded-full
              border
              border-[#0080ff]/20
              bg-[#0080ff]/10
              px-4
              py-1.5
              text-xs
              font-bold
              uppercase
              tracking-wider
              text-[#0080ff]
            "
            initial={{
              opacity: 0,
              scale: 0.8,
            }}
            animate={{
              opacity: 1,
              scale: 1,
            }}
            transition={{
              duration: 0.5,
            }}
          >
            <motion.span
              className="
                h-1.5
                w-1.5
                rounded-full
                bg-[#0080ff]
              "
              animate={{
                scale: [1, 1.3, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
              }}
            />

            Why Pristine
          </motion.div>

          {/* HEADING */}

          <motion.h2
            className="
              mt-4
              font-['Cormorant_Garamond']
              text-4xl
              font-bold
              tracking-tight
              text-slate-900
              sm:text-5xl
            "
            initial={{
              opacity: 0,
              y: 20,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.6,
              delay: 0.1,
            }}
          >
            Built for{" "}
            <motion.span className="text-[#2D6CA1]">
              Better Energy
            </motion.span>
          </motion.h2>

          {/* DESCRIPTION */}

          <motion.p
            className="
              mt-4
              text-base
              leading-relaxed
              text-slate-600
            "
            initial={{
              opacity: 0,
              y: 20,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.6,
              delay: 0.2,
            }}
          >
            We blend regional installation expertise, Tier-1 solar
            components, and continuous maintenance to make your shift
            to clean power effortless.
          </motion.p>
        </motion.div>

        {/* ===================================================
            CARDS ANIMATION AREA
        =================================================== */}

        <div className="relative mt-12 lg:mt-14">

          {/* =================================================
              SINGLE TRACK
          ================================================= */}

          <div
            aria-hidden="true"
            className="
              pointer-events-none
              absolute
              left-0
              right-0
              top-6
              hidden
              h-[2px]
              overflow-hidden
              rounded-full
              bg-slate-200
              lg:block
            "
          >
            {/* WIPE PROGRESS */}

            <motion.div
              className="
                absolute
                left-0
                top-0
                h-full
                w-full
                origin-left
                bg-[#0080ff]
              "
              initial={{
                scaleX: 0,
              }}
              animate={controls}
              variants={{
                hidden: {
                  scaleX: 0,
                },
                visible: {
                  scaleX: 1,
                  transition: {
                    duration: 3.2,
                    delay: 0.8,
                    ease: "linear",
                  },
                },
              }}
            />
          </div>

          {/* =================================================
              CARDS GRID
          ================================================= */}

          <motion.div
            className="
              grid
              gap-6
              sm:grid-cols-2
              lg:grid-cols-4
              lg:gap-5
            "
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
                  style={{
                    "--order": index,
                  }}
                  className="
                    reason-card
                    group
                    relative
                    flex
                    min-h-[270px]
                    flex-col
                    justify-between
                    overflow-hidden
                    rounded-2xl
                    border
                    border-slate-200/80
                    bg-white
                    p-7
                    shadow-sm

                    sm:p-8
                  "
                  whileHover={{
                    y: -10,
                    borderColor: "rgba(0, 128, 255, 0.35)",
                    boxShadow:
                      "0 25px 50px rgba(0, 128, 255, 0.12)",
                  }}
                  whileTap={{
                    scale: 0.98,
                  }}
                >

                  {/* =================================================
                      SYNCHRONIZED CARD HIGHLIGHT
                  ================================================= */}

                  <motion.div
                    aria-hidden="true"
                    className="
                      pointer-events-none
                      absolute
                      inset-0
                      rounded-2xl
                      border-2
                      border-[#0080ff]/0
                    "
                    initial={{
                      opacity: 0,
                    }}
                    animate={controls}
                    variants={{
                      hidden: {
                        opacity: 0,
                      },

                      visible: {
                        opacity: [0, 0, 1, 0],

                        boxShadow: [
                          "0 0 0 rgba(0,128,255,0)",
                          "0 0 0 rgba(0,128,255,0)",
                          "0 0 35px rgba(0,128,255,0.35)",
                          "0 0 0 rgba(0,128,255,0)",
                        ],

                        transition: {
                          duration: 0.8,
                          delay: 1.35 + index * 0.8,
                          ease: "easeInOut",
                        },
                      },
                    }}
                  />

                  {/* =================================================
                      CARD TOP WIPE
                  ================================================= */}

                  <motion.div
                    aria-hidden="true"
                    className="
                      absolute
                      left-0
                      top-0
                      h-[2px]
                      bg-[#0080ff]
                    "
                    initial={{
                      width: "0%",
                    }}
                    animate={controls}
                    variants={{
                      hidden: {
                        width: "0%",
                      },

                      visible: {
                        width: "100%",

                        transition: {
                          duration: 0.7,
                          delay: 0.9 + index * 0.8,
                          ease: "easeInOut",
                        },
                      },
                    }}
                  />

                  {/* =================================================
                      LEFT HOVER ACCENT
                  ================================================= */}

                  <motion.div
                    aria-hidden="true"
                    className="
                      absolute
                      left-0
                      top-0
                      h-full
                      w-1
                      origin-top
                      bg-gradient-to-b
                      from-[#0080ff]
                      to-[#0066cc]
                    "
                    initial={{
                      scaleY: 0,
                    }}
                    whileHover={{
                      scaleY: 1,
                    }}
                    transition={{
                      duration: 0.3,
                    }}
                  />

                  {/* =================================================
                      CARD CONTENT
                  ================================================= */}

                  <div className="relative z-10">

                    {/* ICON + NUMBER */}

                    <div className="flex items-center justify-between">

                      <motion.div
                        className="
                          flex
                          h-12
                          w-12
                          items-center
                          justify-center
                          rounded-xl
                          bg-[#0080ff]/10
                          text-[#0080ff]
                        "
                        whileHover={{
                          backgroundColor:
                            "rgba(0,128,255,1)",
                          color: "white",
                          scale: 1.12,
                          rotate: 5,
                        }}
                      >
                        <Icon size={22} />
                      </motion.div>

                      <motion.span
                        className="
                          font-['Cormorant_Garamond']
                          text-3xl
                          font-bold
                          text-slate-200
                        "
                        whileHover={{
                          color:
                            "rgba(0,128,255,0.4)",
                          scale: 1.1,
                        }}
                      >
                        {item.number}
                      </motion.span>

                    </div>

                    {/* TITLE */}

                    <motion.h3
                      className="
                        mt-5
                        font-['Cormorant_Garamond']
                        text-2xl
                        font-bold
                        text-slate-900
                      "
                      whileHover={{
                        color: "#0080ff",
                      }}
                    >
                      {item.title}
                    </motion.h3>

                    {/* DESCRIPTION */}

                    <motion.p
                      className="
                        mt-2.5
                        text-sm
                        leading-relaxed
                        text-slate-600
                      "
                      initial={{
                        opacity: 0,
                      }}
                      animate={controls}
                      variants={{
                        hidden: {
                          opacity: 0,
                        },

                        visible: {
                          opacity: 1,
                          transition: {
                            delay: 0.75 + index * 0.55,
                            duration: 0.5,
                          },
                        },
                      }}
                    >
                      {item.text}
                    </motion.p>

                  </div>

                  {/* =================================================
                      BOTTOM BAR
                  ================================================= */}

                  <motion.div
                    aria-hidden="true"
                    className="
                      mt-8
                      h-1
                      rounded-full
                      bg-slate-200
                    "
                    initial={{
                      width: 32,
                    }}
                    whileHover={{
                      width: 64,
                      backgroundColor: "#0080ff",
                    }}
                    transition={{
                      duration: 0.3,
                    }}
                  />

                </motion.div>
              );
            })}
          </motion.div>
        </div>

        {/* ===================================================
            MOBILE / TABLET TRACK
        =================================================== */}

        <div
          aria-hidden="true"
          className="
            mt-8
            flex
            items-center
            justify-center
            gap-2
            lg:hidden
          "
        >
          {REASONS.map((item, index) => (
            <motion.div
              key={item.number}
              className="
                h-1
                flex-1
                overflow-hidden
                rounded-full
                bg-slate-200
              "
            >
              <motion.div
                className="
                  h-full
                  origin-left
                  bg-[#0080ff]
                "
                initial={{
                  scaleX: 0,
                }}
                animate={controls}
                variants={{
                  hidden: {
                    scaleX: 0,
                  },

                  visible: {
                    scaleX: 1,

                    transition: {
                      duration: 0.5,
                      delay: 0.8 + index * 0.55,
                      ease: "easeInOut",
                    },
                  },
                }}
              />
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}