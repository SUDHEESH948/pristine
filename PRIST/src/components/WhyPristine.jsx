import { useEffect, useRef, useState } from "react";
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

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

const cardVariants = {
  hidden: {
    opacity: 0,
    y: 30,
    scale: 0.95,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

export default function WhyPristine() {
  const { ref, controls } = useScrollAnimation();

  return (
    <section
      id="about"
      ref={ref}
      className="relative overflow-hidden bg-white py-20 font-['Manrope'] lg:py-28"
    >
      {/* Background Decor */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(0,128,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,128,255,0.03)_1px,transparent_1px)] bg-[size:60px_60px]"
      />
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 left-1/4 h-72 w-[36rem] rounded-full bg-[#0080ff]/5 blur-3xl"
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
        {/* ================= HEADER ================= */}
        <motion.div
          className="max-w-2xl"
          initial="hidden"
          animate={controls}
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.1,
                delayChildren: 0.1,
              },
            },
          }}
        >
          {/* Badge */}
          <motion.div
            className="inline-flex items-center gap-2 rounded-full border border-[#0080ff]/20 bg-[#0080ff]/10 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-[#0080ff]"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <motion.span
              className="h-1.5 w-1.5 rounded-full bg-[#0080ff]"
              animate={{ scale: [1, 1.3, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            Why Pristine
          </motion.div>

          {/* Heading */}
          <motion.h2
            className="mt-4 font-['Cormorant_Garamond'] text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Built for <motion.span className="text-[#0080ff]">Better Energy</motion.span>
          </motion.h2>

          <motion.p
            className="mt-4 text-base leading-relaxed text-slate-600"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            We blend regional installation expertise, Tier-1 solar components, and continuous maintenance to make your shift to clean power effortless.
          </motion.p>
        </motion.div>

        {/* ================= CARDS GRID ================= */}
        <motion.div
          className="mt-14 grid gap-6 sm:grid-cols-2 lg:gap-8"
          variants={containerVariants}
          initial="hidden"
          animate={controls}
        >
          {REASONS.map((item, index) => {
            const Icon = item.icon;

            return (
              <motion.div
                key={item.number}
                className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-slate-200/80 bg-white p-7 shadow-sm sm:p-8"
                variants={cardVariants}
                whileHover={{
                  y: -12,
                  borderColor: "rgba(0, 128, 255, 0.3)",
                  boxShadow: "0 25px 50px rgba(0, 128, 255, 0.1)",
                }}
                whileTap={{ scale: 0.98 }}
              >
                {/* Left Hover Accent Indicator */}
                <motion.div
                  aria-hidden="true"
                  className="absolute left-0 top-0 h-full w-1 bg-gradient-to-b from-[#0080ff] to-[#0066cc]"
                  initial={{ scaleY: 0, originY: 0 }}
                  whileHover={{ scaleY: 1 }}
                  transition={{ duration: 0.3 }}
                />

                <div>
                  {/* Card Header: Icon & Number */}
                  <div className="flex items-center justify-between">
                    <motion.div
                      className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#0080ff]/10 text-[#0080ff]"
                      whileHover={{
                        backgroundColor: "rgba(0, 128, 255, 1)",
                        color: "white",
                        scale: 1.15,
                        rotate: 5,
                      }}
                    >
                      <Icon size={22} />
                    </motion.div>

                    <motion.span
                      className="font-['Cormorant_Garamond'] text-3xl font-bold text-slate-200"
                      whileHover={{ color: "rgba(0, 128, 255, 0.4)", scale: 1.1 }}
                    >
                      {item.number}
                    </motion.span>
                  </div>

                  {/* Title & Description */}
                  <motion.h3
                    className="mt-6 font-['Cormorant_Garamond'] text-2xl font-bold text-slate-900"
                    whileHover={{ color: "#0080ff" }}
                  >
                    {item.title}
                  </motion.h3>

                  <motion.p
                    className="mt-3 text-sm leading-relaxed text-slate-600"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.2 + index * 0.05 }}
                  >
                    {item.text}
                  </motion.p>
                </div>

                {/* Bottom Expansion Bar */}
                <motion.div
                  aria-hidden="true"
                  className="mt-8 h-1 rounded-full bg-slate-200"
                  initial={{ width: 32 }}
                  whileHover={{ width: 64, backgroundColor: "#0080ff" }}
                  transition={{ duration: 0.3 }}
                />
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}