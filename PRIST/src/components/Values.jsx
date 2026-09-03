
import { useEffect, useRef, useState } from "react";
import {
  Target,
  Eye,
  Leaf,
  Award,
  ShieldCheck,
  Check,
  ArrowRight,
} from "lucide-react";

import qualityImage from "../assets/quality-team.png";

const VALUES = [
  {
    icon: Target,
    title: "Our Vision",
    badge: "Future Ready",
    description:
      "To make every rooftop in our 4 districts a life-long power house.",
  },
  {
    icon: Eye,
    title: "Our Mission",
    badge: "Precision First",
    description:
      "To deliver life-long electricity with 30 Years Tata Warranty and life-long local support.",
  },
  {
    icon: Leaf,
    title: "Sustainability",
    badge: "Eco-Conscious",
    description:
      "We are committed to accelerating renewable power adoption and significantly lowering regional carbon emissions year after year.",
  },
];

const QUALITY_POINTS = [
  "Certified Technicians",
  "Tier-1 Quality Modules",
  "Strict Safety Protocols",
  "Smart Monitoring",
];

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
      className="relative overflow-hidden bg-[#e6f7ff] py-20 font-['Plus_Jakarta_Sans',sans-serif] text-slate-900 lg:py-28"
    >
      {/* =========================================================
          BACKGROUND AMBIENT EFFECT
      ========================================================== */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-0 h-80 w-[42rem] -translate-x-1/2 rounded-full bg-sky-300/25 blur-3xl"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-20 -left-20 h-72 w-72 rounded-full bg-cyan-200/20 blur-3xl"
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
          <span className="inline-flex items-center gap-2 rounded-full bg-sky-100 px-3.5 py-1.5 text-xs font-semibold text-sky-700 shadow-sm">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-sky-600" />
            WHAT DRIVES US
          </span>

          {/* Heading */}
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl lg:text-[42px]">
            Built on Purpose.
            <br className="hidden sm:block" /> Driven by Impact.
          </h2>

          {/* Description */}
          <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-slate-500 sm:text-base">
            Our core values shape every installation we build, every client
            partnership we foster, and our commitment to an independent clean
            energy grid.
          </p>
        </div>

        {/* =========================================================
            CORE VALUES
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
                className={`group relative flex min-h-[320px] flex-col justify-between overflow-hidden rounded-3xl border border-sky-100 bg-white p-7 shadow-sm transition-all duration-700 ease-out hover:-translate-y-2 hover:border-sky-200 hover:shadow-xl hover:shadow-sky-900/10 ${
                  isVisible
                    ? "translate-y-0 opacity-100"
                    : "translate-y-10 opacity-0"
                }`}
              >
                {/* Card Decorative Glow */}
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute -right-12 -top-12 h-32 w-32 rounded-full bg-sky-100/60 blur-2xl transition-all duration-500 group-hover:bg-sky-200/70"
                />

                <div className="relative">
                  {/* Icon + Badge */}
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-sky-50 text-sky-600 transition-all duration-300 group-hover:bg-sky-600 group-hover:text-white group-hover:shadow-lg group-hover:shadow-sky-600/20">
                      <Icon size={24} strokeWidth={2} />
                    </div>

                    <span className="rounded-full bg-sky-50 px-3 py-1.5 text-[10px] font-bold uppercase tracking-wide text-sky-700">
                      {value.badge}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="mt-7 text-xl font-bold text-slate-900 transition-colors duration-300 group-hover:text-sky-600">
                    {value.title}
                  </h3>

                  {/* Description */}
                  <p className="mt-3 text-sm leading-6 text-slate-500">
                    {value.description}
                  </p>
                </div>

                {/* Card Footer */}
                <div className="relative mt-7 flex items-center justify-between border-t border-sky-50 pt-4">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                    Core Principle 0{index + 1}
                  </span>

                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-sky-50 text-sky-600 transition-all duration-300 group-hover:bg-sky-600 group-hover:text-white">
                    <ArrowRight size={14} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* =========================================================
            QUALITY & SAFETY BANNER
        ========================================================== */}
        <div
          className={`relative mt-16 min-h-[480px] overflow-hidden rounded-3xl border border-sky-400/20 shadow-xl shadow-sky-950/10 transition-all duration-700 sm:mt-20 lg:min-h-[500px] ${
            isVisible
              ? "translate-y-0 opacity-100"
              : "translate-y-10 opacity-0"
          }`}
        >
          {/* Background Image */}
          <img
            src={qualityImage}
            alt="Solar installation engineering and safety team"
            className="absolute inset-0 h-full w-full object-cover"
          />

          {/* Main Dark Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#041122] via-[#041122]/95 to-[#07294D]/75" />

          {/* Additional Bottom Gradient */}
          <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#041122]/60 to-transparent" />

          {/* Banner Content */}
          <div className="relative z-10 flex min-h-[480px] items-center">
            <div className="max-w-2xl p-8 sm:p-12 lg:p-16">
              {/* =================================================
                  ICON BADGES
              ================================================== */}
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-sky-500 text-white shadow-lg shadow-sky-500/30">
                  <Award size={21} />
                </div>

                <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/15 bg-white/10 text-sky-300 backdrop-blur-md">
                  <ShieldCheck size={21} />
                </div>

                <span className="ml-1 rounded-full border border-sky-400/20 bg-sky-400/10 px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-sky-300">
                  Trusted Engineering
                </span>
              </div>

              {/* =================================================
                  HEADLINE
              ================================================== */}
              <h2 className="mt-7 text-3xl font-bold leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl">
                Quality, Safety &amp;
                <br />
                <span className="bg-gradient-to-r from-sky-400 via-sky-300 to-cyan-300 bg-clip-text text-transparent">
                  Long-Term Reliability
                </span>
              </h2>

              {/* Description */}
              <p className="mt-5 max-w-xl text-sm leading-7 text-slate-300 sm:text-base">
                Every solar array we install adheres to rigorous industry
                safety codes and standard compliance. Our certified technicians
                ensure seamless grid synchronization and enduring peak power
                output.
              </p>

              {/* =================================================
                  TRUST POINTS
              ================================================== */}
              <div className="mt-8 flex flex-wrap gap-2.5">
                {QUALITY_POINTS.map((point) => (
                  <div
                    key={point}
                    className="flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3.5 py-2 text-xs font-medium tracking-wide text-white backdrop-blur-md transition hover:border-sky-400/40 hover:bg-sky-400/10"
                  >
                    <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-sky-500 text-white">
                      <Check size={10} strokeWidth={3} />
                    </span>

                    {point}
                  </div>
                ))}
              </div>

              {/* =================================================
                  SMALL TRUST FOOTER
              ================================================== */}
              <div className="mt-8 flex items-center gap-3 text-xs text-slate-400">
                <div className="h-px w-8 bg-sky-500/60" />
                <span>
                  Engineered for Kerala • Built for the long term
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

