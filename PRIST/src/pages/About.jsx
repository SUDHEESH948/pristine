import { motion } from "framer-motion";
import {
  Sun,
  ShieldCheck,
  Target,
  Leaf,
  ArrowRight,
  Award,
  Zap,
  CheckCircle2,
  Wrench,
  Sparkles,
  PhoneCall,
  Clock,
  Settings,
} from "lucide-react";

export default function About() {
  const milestoneStats = [
    { value: "2,00,000+", label: "Rooftop Installations Across India" },
    { value: "75,000+", label: "Installations Across Kerala" },
    { value: "20,000+", label: "PM Surya Ghar Scheme Projects" },
    { value: "30+ Years", label: "EPC Industry Experience" },
  ];

  const tataPowerBenefits = [
    {
      icon: <Zap size={20} className="text-sky-600" />,
      title: "Maximum Energy Savings",
      desc: "Optimized generation efficiency to drastically cut down electricity bills.",
    },
    {
      icon: <ShieldCheck size={20} className="text-sky-600" />,
      title: "Single-Point Warranty",
      desc: "All system components backed by dedicated Tata Power service.",
    },
    {
      icon: <Settings size={20} className="text-sky-600" />,
      title: "Customized Site Design",
      desc: "Tailor-made solar layouts designed specifically for your roof conditions.",
    },
    {
      icon: <Clock size={20} className="text-sky-600" />,
      title: "Up to 30-Year Performance",
      desc: "High-grade solar modules built with decades-long generation commitment.",
    },
    {
      icon: <Wrench size={20} className="text-sky-600" />,
      title: "Lifetime Service & Network",
      desc: "Quick turnaround times and reliable uptime across all districts in Kerala.",
    },
    {
      icon: <CheckCircle2 size={20} className="text-sky-600" />,
      title: "Complete Turnkey Solution",
      desc: "End-to-end execution: feasibility, approvals, installation, and maintenance.",
    },
  ];

  return (
    <section
      id="about"
      className="relative overflow-hidden bg-white pt-36 pb-20 font-['Plus_Jakarta_Sans',sans-serif] sm:pt-40 sm:pb-24 lg:pt-44"
    >
      {/* Background */}
      <div className="pointer-events-none absolute -right-40 top-20 h-96 w-96 rounded-full bg-sky-100 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        {/* Header */}
        <div className="grid items-center gap-14 lg:grid-cols-2">
          {/* LEFT */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-flex rounded-full bg-sky-100 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-sky-700">
              About Pristine Horizon
            </span>

            <h2 className="mt-5 text-3xl font-bold leading-tight tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
              Engineering a
              <span className="text-sky-500"> Cleaner Energy Future</span>.
            </h2>

            <p className="mt-6 text-sm leading-7 text-slate-500 sm:text-base">
              Tata Power Solar Systems Ltd. — Since 1989, India’s oldest solar
              manufacturer and No.1 Rooftop Solar Company. Part of the 155-year-old
              Tata Group. 4.9 GW integrated cell & module manufacturing capacity
              in Bengaluru & Tirunelveli, 100% Made in India, BIS-certified,
              MNRE-approved TOPCon Bifacial technology. First Indian company to
              ship 1 GW modules globally, powering 30M+ lives. Now offering
              India’s highest 30 Years Performance Warranty with life-long power
              generation capability.
            </p>

            <a
              href="/services"
              className="mt-7 inline-flex items-center gap-2 rounded-full bg-sky-500 px-6 py-3 text-xs font-bold text-white shadow-lg shadow-sky-500/20 transition hover:-translate-y-0.5 hover:bg-sky-400"
            >
              Explore Our Solutions
              <ArrowRight size={16} />
            </a>
          </motion.div>

          {/* RIGHT */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-2 gap-4"
          >
            {/* Mission */}
            <div className="rounded-3xl border border-sky-100 bg-[#e6f7ff] p-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-sky-500 text-white">
                <Target size={22} />
              </div>
              <h3 className="mt-5 text-lg font-bold text-slate-900">Our Mission</h3>
              <p className="mt-2 text-xs leading-relaxed text-slate-500">
                To deliver life-long electricity with 30 Years Tata Warranty and
                life-long local support.
              </p>
            </div>

            {/* Technology */}
            <div className="rounded-3xl border border-sky-100 bg-[#071933] p-6 text-white">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-sky-500">
                <Sun size={22} />
              </div>
              <h3 className="mt-5 text-lg font-bold">Smart Technology</h3>
              <p className="mt-2 text-xs leading-relaxed text-slate-300">
                High-efficiency solar technology combined with intelligent
                monitoring and energy management.
              </p>
            </div>

            {/* Quality */}
            <div className="rounded-3xl border border-sky-100 bg-white p-6 shadow-sm">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-sky-100 text-sky-600">
                <ShieldCheck size={22} />
              </div>
              <h3 className="mt-5 text-lg font-bold text-slate-900">Proven Quality</h3>
              <p className="mt-2 text-xs leading-relaxed text-slate-500">
                Carefully selected components and engineering practices built for
                long-term reliability.
              </p>
            </div>

            {/* Sustainability */}
            <div className="rounded-3xl border border-sky-100 bg-white p-6 shadow-sm">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-600">
                <Leaf size={22} />
              </div>
              <h3 className="mt-5 text-lg font-bold text-slate-900">
                Sustainable Future
              </h3>
              <p className="mt-2 text-xs leading-relaxed text-slate-500">
                Helping Kerala transition toward cleaner and more sustainable energy
                generation.
              </p>
            </div>
          </motion.div>
        </div>

        {/* Existing Quick Stats */}
        <div className="mt-16 grid grid-cols-2 gap-4 border-t border-slate-100 pt-10 sm:grid-cols-4">
          <div className="text-center">
            <div className="text-3xl font-black text-sky-500">100+</div>
            <p className="mt-1 text-xs font-semibold text-slate-500">Installations</p>
          </div>
          <div className="text-center">
            <div className="text-3xl font-black text-sky-500">25MW+</div>
            <p className="mt-1 text-xs font-semibold text-slate-500">Capacity Deployed</p>
          </div>
          <div className="text-center">
            <div className="text-3xl font-black text-sky-500">1+</div>
            <p className="mt-1 text-xs font-semibold text-slate-500">Years Experience</p>
          </div>
          <div className="text-center">
            <div className="text-3xl font-black text-sky-500">24/7</div>
            <p className="mt-1 text-xs font-semibold text-slate-500">Support</p>
          </div>
        </div>

        {/* ============================================================ */}
        {/* NEW SECTION: TATA POWER PARTNERSHIP & MILESTONE SPOTLIGHT     */}
        {/* ============================================================ */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-24 rounded-3xl border border-sky-100 bg-slate-50/70 p-8 sm:p-12 lg:p-14"
        >
          {/* Milestone Banner */}
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-2xl">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-100 px-3.5 py-1 text-xs font-bold text-amber-800">
                <Award size={15} /> National Milestone Achievement
              </span>
              <h3 className="mt-3 text-2xl font-bold text-slate-900 sm:text-3xl">
                Partnered with India's No. 1 Solar Rooftop Company
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">
                In association with <strong>Pristine Horizon (Team TPS Kerala)</strong>,
                we bring Tata Power's integrated manufacturing, high reliability, and
                exclusive TPS promotional offers directly to your premises.
              </p>
            </div>

            {/* Direct CTA pill */}
            <div className="flex flex-col items-start gap-2 rounded-2xl border border-sky-200 bg-white p-5 shadow-sm sm:flex-row sm:items-center sm:gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-sky-500 text-white">
                <PhoneCall size={20} />
              </div>
              <div>
                <p className="text-xs font-medium text-slate-500">TPS Kerala Helpline</p>
                <a
                  href="tel:7012694985"
                  className="text-base font-bold text-sky-600 hover:underline"
                >
                  +91 70126 94985
                </a>
              </div>
            </div>
          </div>

          {/* Key Milestone Figures */}
          <div className="mt-10 grid grid-cols-2 gap-4 lg:grid-cols-4">
            {milestoneStats.map((item, idx) => (
              <div
                key={idx}
                className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm"
              >
                <p className="text-2xl font-black tracking-tight text-sky-600 sm:text-3xl">
                  {item.value}
                </p>
                <p className="mt-1 text-xs font-medium text-slate-500">
                  {item.label}
                </p>
              </div>
            ))}
          </div>

          {/* Benefits Grid */}
          <div className="mt-12">
            <h4 className="text-sm font-bold uppercase tracking-wider text-slate-400">
              Key Benefits of Choosing Tata Power
            </h4>

            <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {tataPowerBenefits.map((benefit, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-3.5 rounded-2xl border border-slate-100 bg-white p-5 shadow-sm transition hover:border-sky-200 hover:shadow-md"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-sky-50">
                    {benefit.icon}
                  </div>
                  <div>
                    <h5 className="text-sm font-bold text-slate-900">
                      {benefit.title}
                    </h5>
                    <p className="mt-1 text-xs leading-relaxed text-slate-500">
                      {benefit.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>


        </motion.div>
      </div>
    </section>
  );
}