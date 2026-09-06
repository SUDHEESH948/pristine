import { useEffect, useRef, useState } from "react";
import {
  Target,
  Award,
  Leaf,
  ShieldCheck,
  Check,
  ArrowRight,
  Zap,
} from "lucide-react";

import qualityImage from "../assets/quality-team.png";

const VALUES = [
  {
    icon: Target,
    title: "Our Vision",
    badge: "Kerala Solar Hub",
    description:
      "To transform every rooftop across our 4 Kerala districts into a lifelong, clean-energy powerhouse powered by Tata Power Solar.",
  },
  {
    icon: ShieldCheck,
    title: "Tata Dealership Mission",
    badge: "Official 30-Yr Warranty",
    description:
      "To deliver authentic Tata modules, factory-backed 30-year performance warranties, and dedicated local Kerala service support.",
  },
  {
    icon: Leaf,
    title: "Govt Subsidies & Impact",
    badge: "PM Surya Ghar & KSEB",
    description:
      "Ensuring zero hassle for homeowners with 100% end-to-end KSEB Soura paperwork, net-metering approvals, and direct subsidy credit.",
  },
];

const QUALITY_POINTS = [
  "Tata Certified Technicians",
  "Genuine Tata Power Modules",
  "KSEB Grid Synchronization",
  "PM Surya Ghar Subsidy Clearance",
  "30-Yr Performance Warranty",
  "Real-Time Smart Telemetry",
];

const TATA_NAVY = "#004B87";

export default function Values() {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const currentSection = sectionRef.current;

    if (!currentSection) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.15,
      }
    );

    observer.observe(currentSection);

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative overflow-hidden bg-[#f0f9ff] py-20 font-['Plus_Jakarta_Sans',sans-serif] text-slate-900 lg:py-28"
    >
      {/* =========================================================
          BACKGROUND AMBIENT EFFECT
      ========================================================== */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-0 h-80 w-[42rem] -translate-x-1/2 rounded-full bg-sky-200/40 blur-3xl"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-20 -left-20 h-72 w-72 rounded-full bg-[#004B87]/10 blur-3xl"
      />

      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
        {/* =========================================================
            SECTION HEADER
        ========================================================== */}
        <div
          className={`mx-auto mb-14 max-w-2xl text-center transition-all duration-700 ease-out sm:mb-16 ${
            isVisible
              ? "translate-y-0 opacity-100"
              : "translate-y-8 opacity-0"
          }`}
        >
          {/* Badge */}
          <span className="inline-flex items-center gap-2 rounded-full border border-sky-200 bg-white px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-[#004B87] shadow-sm">
            <ShieldCheck size={14} className="text-[#004B87]" />
            Authorised Channel Partner • Tata Power Solar
          </span>

          {/* Heading */}
          <h2 className="mt-4 text-3xl font-black tracking-tight text-slate-900 sm:text-4xl lg:text-[42px]">
            Built on Trust.
            <br className="hidden sm:block" /> Powered by Tata Reliability.
          </h2>

          {/* Description */}
          <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-slate-600 sm:text-base">
            As an authorised dealer in Kerala, our mission combines India&apos;s
            foremost solar engineering with turnkey local execution, rigorous KSEB
            compliance, and lifetime support.
          </p>
        </div>

        {/* =========================================================
            CORE VALUES (TATA DEALER PILLARS)
        ========================================================== */}
        <div className="grid gap-6 md:grid-cols-3">
          {VALUES.map((value, index) => {
            const Icon = value.icon;

            return (
              <div
                key={value.title}
                style={{
                  transitionDelay: isVisible
                    ? `${index * 120}ms`
                    : "0ms",
                }}
                className={`group relative flex min-h-[320px] flex-col justify-between overflow-hidden rounded-3xl border border-sky-100 bg-white p-7 shadow-sm transition-all duration-700 ease-out hover:-translate-y-2 hover:border-[#004B87]/30 hover:shadow-xl hover:shadow-sky-900/10 ${
                  isVisible
                    ? "translate-y-0 opacity-100"
                    : "translate-y-10 opacity-0"
                }`}
              >
                {/* Card Glow */}
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute -right-12 -top-12 h-32 w-32 rounded-full bg-sky-100/50 blur-2xl transition-all duration-500 group-hover:bg-[#004B87]/10"
                />

                <div className="relative">
                  {/* Icon + Badge */}
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-sky-50 text-[#004B87] transition-all duration-300 group-hover:bg-[#004B87] group-hover:text-white group-hover:shadow-lg group-hover:shadow-[#004B87]/25">
                      <Icon size={24} strokeWidth={2} />
                    </div>

                    <span className="rounded-full border border-sky-100 bg-sky-50 px-3 py-1 text-[10px] font-bold uppercase tracking-wide text-[#004B87]">
                      {value.badge}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="mt-7 text-xl font-bold text-slate-900 transition-colors duration-300 group-hover:text-[#004B87]">
                    {value.title}
                  </h3>

                  {/* Description */}
                  <p className="mt-3 text-sm leading-6 text-slate-600">
                    {value.description}
                  </p>
                </div>

                {/* Card Footer */}
                <div className="relative mt-7 flex items-center justify-between border-t border-slate-100 pt-4">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                    Tata Dealer Standard 0{index + 1}
                  </span>

                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-sky-50 text-[#004B87] transition-all duration-300 group-hover:bg-[#004B87] group-hover:text-white">
                    <ArrowRight size={14} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* =========================================================
            QUALITY & SAFETY BANNER (ENGINEERING ASSURANCE)
        ========================================================== */}
        <div
          className={`relative mt-16 min-h-[480px] overflow-hidden rounded-3xl border border-sky-400/20 shadow-xl shadow-sky-950/20 transition-all duration-700 sm:mt-20 lg:min-h-[520px] ${
            isVisible
              ? "translate-y-0 opacity-100"
              : "translate-y-10 opacity-0"
          }`}
        >
          {/* Background Image */}
          <img
            src={qualityImage}
            alt="Tata Power Solar certified engineering and safety team"
            className="absolute inset-0 h-full w-full object-cover"
          />

          {/* Dark Overlay with Tata Blue Accents */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#020b17] via-[#020b17]/90 to-[#004B87]/50" />

          {/* Bottom Fade */}
          <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#020b17] to-transparent" />

          {/* Banner Content */}
          <div className="relative z-10 flex min-h-[480px] items-center lg:min-h-[520px]">
            <div className="max-w-2xl p-8 sm:p-12 lg:p-16">
              {/* Trust Badges */}
              <div className="flex flex-wrap items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#004B87] text-white shadow-lg shadow-[#004B87]/40">
                  <Award size={21} />
                </div>

                <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/20 bg-white/10 text-sky-300 backdrop-blur-md">
                  <Zap size={21} />
                </div>

                <span className="rounded-full border border-sky-400/30 bg-sky-950/50 px-3.5 py-1.5 text-[10px] font-bold uppercase tracking-wider text-sky-200 backdrop-blur-md">
                  Tata Power Solar Certified Protocols
                </span>
              </div>

              {/* Headline */}
              <h2 className="mt-6 text-3xl font-black leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl">
                Authentic Tata Engineering.
                <br />
                <span className="bg-gradient-to-r from-sky-400 via-sky-200 to-cyan-300 bg-clip-text text-transparent">
                  Unmatched Long-Term Output.
                </span>
              </h2>

              {/* Description */}
              <p className="mt-5 max-w-xl text-sm leading-7 text-slate-300 sm:text-base">
                Every rooftop array installed by Pristine Horizon features 100% genuine
                Tata Power Solar modules and inverters. Our certified engineers
                adhere strictly to MNRE and KSEB Soura standards, guaranteeing safety
                against Kerala&apos;s heavy coastal monsoon conditions.
              </p>

              {/* Trust Points Badges */}
              <div className="mt-8 flex flex-wrap gap-2.5">
                {QUALITY_POINTS.map((point) => (
                  <div
                    key={point}
                    className="flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3.5 py-2 text-xs font-semibold tracking-wide text-white backdrop-blur-md transition hover:border-sky-400/50 hover:bg-white/20"
                  >
                    <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-[#004B87] text-white">
                      <Check size={10} strokeWidth={3} />
                    </span>
                    {point}
                  </div>
                ))}
              </div>

              {/* Small Trust Footer */}
              <div className="mt-8 flex items-center gap-3 text-xs font-semibold tracking-wide text-sky-200">
                <div className="h-px w-8 bg-sky-400" />
                <span>
                  Authorised Channel Partner • Kozhikode &amp; Northern Kerala
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}