
import { motion } from "framer-motion";
import {
  Sun,
  ShieldCheck,
  Target,
  Leaf,
  ArrowRight,
} from "lucide-react";

export default function About() {
  return (
    <section
      id="about"
     className="
  relative
  overflow-hidden
  bg-white
  pt-36
  pb-20
  font-['Plus_Jakarta_Sans',sans-serif]
  sm:pt-40
  sm:pb-24
  lg:pt-44
"
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
            <span
              className="
                inline-flex
                rounded-full
                bg-sky-100
                px-4
                py-1.5
                text-xs
                font-bold
                uppercase
                tracking-wider
                text-sky-700
              "
            >
              About Pristine Energy
            </span>

            <h2
              className="
                mt-5
                text-3xl
                font-bold
                leading-tight
                tracking-tight
                text-slate-900
                sm:text-4xl
                lg:text-5xl
              "
            >
              Engineering a
              <span className="text-sky-500">
                {" "}Cleaner Energy Future
              </span>
              .
            </h2>

            <p className="mt-6 text-sm leading-7 text-slate-500 sm:text-base">
              Pristine Energy delivers high-performance solar power systems
              designed for homes, businesses, and industries across Kerala.
              Our approach combines reliable technology, professional
              engineering, and long-term customer support.
            </p>

            <p className="mt-4 text-sm leading-7 text-slate-500 sm:text-base">
              From initial consultation and site assessment to installation,
              grid synchronization, monitoring, and maintenance, we provide
              an end-to-end solar experience.
            </p>

            <a
              href="#services"
              className="
                mt-7
                inline-flex
                items-center
                gap-2
                rounded-full
                bg-sky-500
                px-6
                py-3
                text-xs
                font-bold
                text-white
                shadow-lg
                shadow-sky-500/20
                transition
                hover:-translate-y-0.5
                hover:bg-sky-400
              "
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
            <div
              className="
                rounded-3xl
                border
                border-sky-100
                bg-[#e6f7ff]
                p-6
              "
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-sky-500 text-white">
                <Target size={22} />
              </div>

              <h3 className="mt-5 text-lg font-bold text-slate-900">
                Our Mission
              </h3>

              <p className="mt-2 text-xs leading-relaxed text-slate-500">
                Make clean, affordable, and dependable solar energy accessible
                to every customer.
              </p>
            </div>

            {/* Technology */}
            <div
              className="
                rounded-3xl
                border
                border-sky-100
                bg-[#071933]
                p-6
                text-white
              "
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-sky-500">
                <Sun size={22} />
              </div>

              <h3 className="mt-5 text-lg font-bold">
                Smart Technology
              </h3>

              <p className="mt-2 text-xs leading-relaxed text-slate-300">
                High-efficiency solar technology combined with intelligent
                monitoring and energy management.
              </p>
            </div>

            {/* Quality */}
            <div
              className="
                rounded-3xl
                border
                border-sky-100
                bg-white
                p-6
                shadow-sm
              "
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-sky-100 text-sky-600">
                <ShieldCheck size={22} />
              </div>

              <h3 className="mt-5 text-lg font-bold text-slate-900">
                Proven Quality
              </h3>

              <p className="mt-2 text-xs leading-relaxed text-slate-500">
                Carefully selected components and engineering practices built
                for long-term reliability.
              </p>
            </div>

            {/* Sustainability */}
            <div
              className="
                rounded-3xl
                border
                border-sky-100
                bg-white
                p-6
                shadow-sm
              "
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-600">
                <Leaf size={22} />
              </div>

              <h3 className="mt-5 text-lg font-bold text-slate-900">
                Sustainable Future
              </h3>

              <p className="mt-2 text-xs leading-relaxed text-slate-500">
                Helping Kerala transition toward cleaner and more sustainable
                energy generation.
              </p>
            </div>

          </motion.div>
        </div>

        {/* Bottom stats */}
        <div className="mt-16 grid grid-cols-2 gap-4 border-t border-slate-100 pt-10 sm:grid-cols-4">

          <div className="text-center">
            <div className="text-3xl font-black text-sky-500">
              500+
            </div>
            <p className="mt-1 text-xs font-semibold text-slate-500">
              Installations
            </p>
          </div>

          <div className="text-center">
            <div className="text-3xl font-black text-sky-500">
              25MW+
            </div>
            <p className="mt-1 text-xs font-semibold text-slate-500">
              Capacity Deployed
            </p>
          </div>

          <div className="text-center">
            <div className="text-3xl font-black text-sky-500">
              15+
            </div>
            <p className="mt-1 text-xs font-semibold text-slate-500">
              Years Experience
            </p>
          </div>

          <div className="text-center">
            <div className="text-3xl font-black text-sky-500">
              24/7
            </div>
            <p className="mt-1 text-xs font-semibold text-slate-500">
              Support
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}

