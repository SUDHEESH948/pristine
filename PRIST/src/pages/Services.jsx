import { motion } from "framer-motion";
import {
  Home,
  Building2,
  Factory,
  BatteryCharging,
  Wrench,
  Activity,
  ArrowUpRight,
  CheckCircle2,
} from "lucide-react";
import image2 from "../assets/image2.png";
import project1 from "../assets/project1.png";
const SERVICES = [
  {
    icon: Home,
    number: "01",
    title: "Residential Solar",
    image: image2,
    description:
      "Complete rooftop solar systems designed to reduce household electricity costs and provide reliable clean power.",
    features: [
      "Rooftop Assessment",
      "Custom System Design",
      "Full Installation",
      "Grid Connection Support",
    ],
  },
  {
    icon: Building2,
    number: "02",
    title: "Commercial Solar",
    image:
      "https://images.unsplash.com/photo-1613665813446-82a78c468a1d?auto=format&fit=crop&w=800&q=80",
    description:
      "Scalable solar solutions tailored for corporate offices, retail spaces, apartments, and institutional campuses.",
    features: [
      "Load & Energy Analysis",
      "Commercial System Design",
      "Turnkey Installation",
      "Performance Monitoring",
    ],
  },
  {
    icon: Factory,
    number: "03",
    title: "Industrial Solar",
    image:
      "https://images.unsplash.com/photo-1497440001374-f26997328c1b?auto=format&fit=crop&w=800&q=80",
    description:
      "High-capacity solar infrastructure engineered to slash high operating expenses and boost energy resilience.",
    features: [
      "Megawatt-Scale Engineering",
      "Load Profiling",
      "Grid Synchronization",
      "Performance Optimization",
    ],
  },
  {
    icon: BatteryCharging,
    number: "04",
    title: "Battery Storage",
    image: project1,
      
    description:
      "Smart energy storage integrations that safeguard continuous operations and optimize solar self-consumption.",
    features: [
      "Storage Capacity Sizing",
      "Hybrid Inverter Integration",
      "Automated Backup Transfer",
      "Peak-Shaving Control",
    ],
  },
  {
    icon: Wrench,
    number: "05",
    title: "Solar Maintenance",
    image:
      "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=800&q=80",
    description:
      "Preventive inspection routines, thermal audits, and corrective maintenance to keep systems at peak yield.",
    features: [
      "Comprehensive Inspections",
      "Automated Panel Cleaning",
      "Inverter Diagnostics",
      "Preventive Servicing",
    ],
  },
  {
    icon: Activity,
    number: "06",
    title: "Remote Monitoring",
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80",
    description:
      "Continuous IoT-powered performance tracking with intelligent anomaly detection and yield analytics.",
    features: [
      "24/7 Cloud Telemetry",
      "Automated Fault Alerts",
      "Yield & Revenue Analytics",
      "Dedicated Technical SLA",
    ],
  },
];

export default function Services() {
  return (
    <section
      id="services"
      className="relative overflow-hidden bg-gradient-to-b from-[#f0f7ff] via-[#e5f1fc] to-[#f4f9ff] py-24 font-['Plus_Jakarta_Sans',sans-serif] sm:py-32"
    >
      {/* ================= BACKGROUND GLOW ORBS ================= */}

      <div
        className="pointer-events-none absolute -left-40 top-1/4 h-[500px] w-[500px] rounded-full bg-sky-200/40 blur-[120px]"
        aria-hidden="true"
      />

      <div
        className="pointer-events-none absolute -right-40 bottom-1/4 h-[500px] w-[500px] rounded-full bg-blue-200/30 blur-[130px]"
        aria-hidden="true"
      />

      {/* ================= MAIN CONTAINER ================= */}

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        {/* ================= SECTION HEADER ================= */}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-3xl text-center"
        >
          {/* Label */}

          <span className="inline-flex select-none items-center gap-2 rounded-full border border-sky-200/80 bg-white/80 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-sky-700 shadow-sm backdrop-blur-md">
            Our Core Services
          </span>

          {/* Heading */}

          <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
            Complete{" "}
            <span className="text-sky-600">Solar Engineering</span> & Solutions
          </h2>

          {/* Description */}

          <p className="mt-4 text-sm leading-relaxed text-slate-600 sm:text-base md:text-lg">
            From initial site feasibility audits to long-term monitoring and
            maintenance, we engineer robust, high-efficiency solar
            infrastructures.
          </p>
        </motion.div>

        {/* ================= SERVICES GRID ================= */}

        <div className="mt-16 grid grid-cols-1 items-stretch gap-8 md:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((service, index) => {
            const Icon = service.icon;

            return (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.08,
                }}
                whileHover={{ y: -6 }}
                className="group flex h-full min-h-[500px] flex-col overflow-hidden rounded-3xl border border-white/80 bg-white shadow-[0_10px_30px_rgba(7,25,51,0.04)] backdrop-blur-sm transition-all duration-300 hover:border-sky-200 hover:shadow-[0_20px_40px_rgba(2,132,199,0.12)]"
              >
                {/* ================= IMAGE ================= */}

                <div className="relative h-48 w-full shrink-0 overflow-hidden bg-slate-100">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />

                  {/* Image Overlay */}

                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

                  {/* Service Number */}

                  <span className="absolute right-4 top-4 select-none rounded-lg bg-black/40 px-2.5 py-1 text-xs font-bold tracking-widest text-white backdrop-blur-md">
                    {service.number}
                  </span>

                  {/* Service Icon */}

                  <div className="absolute bottom-4 left-4 flex h-12 w-12 items-center justify-center rounded-xl bg-white text-sky-600 shadow-md transition-all duration-300 group-hover:bg-sky-600 group-hover:text-white group-hover:shadow-sky-500/25">
                    <Icon className="h-6 w-6" strokeWidth={2} />
                  </div>
                </div>

                {/* ================= CARD CONTENT ================= */}

                <div className="flex flex-1 flex-col p-6">
                  {/* Title */}

                  <h3 className="text-xl font-bold tracking-tight text-slate-900 transition-colors duration-300 group-hover:text-sky-600">
                    {service.title}
                  </h3>

                  {/* Description */}

                  <p className="mt-2.5 min-h-[72px] text-sm leading-relaxed text-slate-600">
                    {service.description}
                  </p>

                  {/* Features */}

                  <ul className="mt-5 space-y-2 border-t border-slate-100 pt-4">
                    {service.features.map((feature) => (
                      <li
                        key={feature}
                        className="flex items-center gap-2.5 text-xs font-medium text-slate-700"
                      >
                        <CheckCircle2 className="h-4 w-4 shrink-0 text-sky-500 transition-colors duration-300 group-hover:text-sky-600" />

                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* ================= BOTTOM CTA ================= */}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{
            duration: 0.5,
            delay: 0.2,
          }}
          className="mt-16 text-center"
        >
          <a
            href="/contact"
            className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-8 py-4 text-xs font-bold uppercase tracking-wider text-white shadow-xl shadow-slate-900/15 transition-all duration-300 hover:-translate-y-0.5 hover:bg-sky-600 hover:shadow-sky-600/25 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2"
          >
            Get a Free Solar Consultation

            <ArrowUpRight className="h-4 w-4" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}