
import { motion } from "framer-motion";
import {
  Home,
  Building2,
  Factory,
  BatteryCharging,
  Wrench,
  Activity,
  ArrowUpRight,
} from "lucide-react";

const SERVICES = [
  {
    icon: Home,
    number: "01",
    title: "Residential Solar",
    description:
      "Complete rooftop solar systems designed to reduce household electricity costs and provide reliable clean power.",
    features: [
      "Rooftop Assessment",
      "Custom System Design",
      "Installation",
      "Grid Connection",
    ],
  },
  {
    icon: Building2,
    number: "02",
    title: "Commercial Solar",
    description:
      "Scalable solar solutions for offices, shops, apartments, schools, and commercial buildings.",
    features: [
      "Energy Analysis",
      "Commercial Design",
      "Professional Installation",
      "Performance Monitoring",
    ],
  },
  {
    icon: Factory,
    number: "03",
    title: "Industrial Solar",
    description:
      "High-capacity solar infrastructure engineered to reduce industrial energy expenses and improve energy independence.",
    features: [
      "Large-Scale Design",
      "Load Analysis",
      "Grid Synchronization",
      "Performance Optimization",
    ],
  },
  {
    icon: BatteryCharging,
    number: "04",
    title: "Battery Storage",
    description:
      "Smart energy storage systems that help maintain power availability and improve solar energy utilization.",
    features: [
      "Battery Assessment",
      "Storage Design",
      "Backup Integration",
      "Energy Management",
    ],
  },
  {
    icon: Wrench,
    number: "05",
    title: "Solar Maintenance",
    description:
      "Professional preventive and corrective maintenance to keep your solar installation operating efficiently.",
    features: [
      "System Inspection",
      "Panel Cleaning",
      "Fault Detection",
      "Preventive Maintenance",
    ],
  },
  {
    icon: Activity,
    number: "06",
    title: "Remote Monitoring",
    description:
      "Real-time system monitoring that helps identify performance issues and maintain optimal energy generation.",
    features: [
      "Live Monitoring",
      "Performance Reports",
      "Fault Alerts",
      "Technical Support",
    ],
  },
];

export default function Services() {
  return (
    <section
      id="services"
      className="
        relative
        min-h-screen
        overflow-hidden
        bg-[#cce6ff]
        pt-36
        pb-20
        font-['Plus_Jakarta_Sans',sans-serif]
        sm:pt-40
        sm:pb-24
        lg:pt-44
      "
    >
      {/* ================= BACKGROUND DECORATION ================= */}

      <div
        className="
          pointer-events-none
          absolute
          -left-40
          top-20
          h-96
          w-96
          rounded-full
          bg-sky-300/30
          blur-3xl
        "
      />

      <div
        className="
          pointer-events-none
          absolute
          -right-40
          bottom-20
          h-96
          w-96
          rounded-full
          bg-blue-300/20
          blur-3xl
        "
      />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">

        {/* ================= HEADER ================= */}

        <motion.div
          initial={{
            opacity: 0,
            y: 20,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
          }}
          transition={{
            duration: 0.6,
          }}
          className="mx-auto max-w-2xl text-center"
        >
          {/* Badge */}

          <span
            className="
              inline-flex
              rounded-full
              border
              border-sky-200
              bg-white/70
              px-4
              py-1.5
              text-xs
              font-bold
              uppercase
              tracking-wider
              text-sky-700
              shadow-sm
              backdrop-blur-sm
            "
          >
            Our Services
          </span>

          {/* Heading */}

          <h2
            className="
              mt-4
              text-3xl
              font-bold
              tracking-tight
              text-[#071933]
              sm:text-4xl
              lg:text-5xl
            "
          >
            Complete{" "}
            <span className="text-sky-600">
              Solar Solutions
            </span>
          </h2>

          {/* Description */}

          <p
            className="
              mt-4
              text-sm
              leading-relaxed
              text-slate-600
              sm:text-base
            "
          >
            From your first solar consultation to long-term monitoring and
            maintenance, Pristine Energy provides complete end-to-end solar
            solutions.
          </p>
        </motion.div>

        {/* ================= SERVICES GRID ================= */}

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">

          {SERVICES.map((service, index) => {
            const Icon = service.icon;

            return (
              <motion.div
                key={service.title}
                initial={{
                  opacity: 0,
                  y: 25,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                }}
                viewport={{
                  once: true,
                  amount: 0.15,
                }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.08,
                }}
                whileHover={{
                  y: -7,
                }}
                className="
                  group
                  relative
                  overflow-hidden
                  rounded-3xl
                  border
                  border-sky-100
                  bg-white
                  p-6
                  shadow-[0_10px_35px_rgba(7,25,51,0.08)]
                  transition-all
                  duration-300
                  hover:border-sky-300
                  hover:shadow-[0_18px_45px_rgba(2,132,199,0.16)]
                "
              >

                {/* Number */}

                <div
                  className="
                    absolute
                    right-5
                    top-5
                    text-4xl
                    font-black
                    text-sky-100
                    transition
                    duration-300
                    group-hover:text-sky-200
                  "
                >
                  {service.number}
                </div>

                {/* Icon */}

                <div
                  className="
                    relative
                    flex
                    h-14
                    w-14
                    items-center
                    justify-center
                    rounded-2xl
                    bg-sky-50
                    text-sky-600
                    transition-all
                    duration-300
                    group-hover:bg-sky-500
                    group-hover:text-white
                    group-hover:shadow-lg
                    group-hover:shadow-sky-500/25
                  "
                >
                  <Icon size={25} />
                </div>

                {/* Title */}

                <h3
                  className="
                    relative
                    mt-6
                    text-xl
                    font-bold
                    text-[#071933]
                  "
                >
                  {service.title}
                </h3>

                {/* Description */}

                <p
                  className="
                    mt-3
                    text-sm
                    leading-relaxed
                    text-slate-500
                  "
                >
                  {service.description}
                </p>

                {/* Features */}

                <div className="mt-5 space-y-2">

                  {service.features.map((feature) => (
                    <div
                      key={feature}
                      className="
                        flex
                        items-center
                        gap-2
                        text-xs
                        font-medium
                        text-slate-600
                      "
                    >
                      <span
                        className="
                          h-1.5
                          w-1.5
                          shrink-0
                          rounded-full
                          bg-sky-500
                        "
                      />

                      {feature}
                    </div>
                  ))}

                </div>

                {/* Bottom */}

                <div
                  className="
                    mt-6
                    flex
                    items-center
                    justify-between
                    border-t
                    border-slate-100
                    pt-4
                  "
                >
                  <span
                    className="
                      text-xs
                      font-semibold
                      text-slate-400
                    "
                  >
                    Learn More
                  </span>

                  <div
                    className="
                      flex
                      h-9
                      w-9
                      items-center
                      justify-center
                      rounded-full
                      bg-sky-50
                      text-sky-600
                      transition-all
                      duration-300
                      group-hover:bg-sky-500
                      group-hover:text-white
                    "
                  >
                    <ArrowUpRight size={16} />
                  </div>
                </div>

              </motion.div>
            );
          })}

        </div>

        {/* ================= CTA ================= */}

        <motion.div
          initial={{
            opacity: 0,
            y: 20,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
          }}
          transition={{
            duration: 0.5,
            delay: 0.2,
          }}
          className="mt-14 text-center"
        >
          <a
            href="#contact"
            className="
              inline-flex
              items-center
              gap-2
              rounded-full
              bg-[#071933]
              px-7
              py-3.5
              text-xs
              font-bold
              text-white
              shadow-lg
              shadow-slate-900/20
              transition-all
              duration-300
              hover:-translate-y-0.5
              hover:bg-sky-600
              hover:shadow-xl
            "
          >
            Get a Free Solar Consultation
            <ArrowUpRight size={16} />
          </a>
        </motion.div>

      </div>
    </section>
  );
}

