import { useEffect, useRef, useState } from "react";
import {
  Target,
  Eye,
  Leaf,
  Award,
  ShieldCheck,
} from "lucide-react";

import qualityImage from "../assets/quality-team.png";

const values = [
  {
    icon: Target,
    title: "Our Vision",
    description:
      "To be the leading solar energy provider, making clean power accessible to every home and business.",
  },
  {
    icon: Eye,
    title: "Our Mission",
    description:
      "To deliver reliable, high-quality solar solutions that empower customers and protect the environment.",
  },
  {
    icon: Leaf,
    title: "Sustainability",
    description:
      "We are committed to renewable energy adoption and reducing global carbon emissions.",
  },
];

/**
 * Matches the premium type system used across Hero / OurImpact / WhyPristine:
 * Cormorant Garamond (display) + Manrope (body).
 * Add once to index.html <head> if not already present:
 *
 * <link
 *   href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@500;600;700&family=Manrope:wght@400;500;600;700&display=swap"
 *   rel="stylesheet"
 * />
 */

export default function Values() {
  const sectionRef = useRef(null);
  const bannerRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [bannerVisible, setBannerVisible] = useState(false);

  useEffect(() => {
    const cardsObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          cardsObserver.disconnect();
        }
      },
      { threshold: 0.15 }
    );

    const bannerObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setBannerVisible(true);
          bannerObserver.disconnect();
        }
      },
      { threshold: 0.15 }
    );

    if (sectionRef.current) cardsObserver.observe(sectionRef.current);
    if (bannerRef.current) bannerObserver.observe(bannerRef.current);

    return () => {
      cardsObserver.disconnect();
      bannerObserver.disconnect();
    };
  }, []);

  return (
    <section className="relative overflow-hidden bg-slate-50 py-20 font-['Manrope'] lg:py-28">

      {/* Background Grid */}
      <div
        className="
          pointer-events-none
          absolute inset-0
          opacity-50
          bg-[linear-gradient(rgba(94, 198, 25, 0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(51,128,0,0.06)_1px,transparent_1px)]
          bg-[size:60px_60px]
        "
      />

      {/* Ambient accent glow */}
      <div className="pointer-events-none absolute -top-20 right-1/4 h-72 w-[36rem] rounded-full bg-[#0099cc]/8 blur-3xl" />

      <div ref={sectionRef} className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">

        {/* SECTION HEADER */}
        <div
          className={`
            mx-auto mb-14 max-w-3xl text-center
            transition-all duration-1000 ease-out
            ${isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"}
          `}
        >

          <span
            className="
              inline-flex
              items-center
              gap-2
              rounded-full
              border
              border-[#0099cc]/20
              bg-[#0099cc]/5
              px-4
              py-2
              font-mono
              text-xs
              font-semibold
              uppercase
              tracking-[0.2em]
              text-[#0099cc]
            "
          >
            <span className="h-1.5 w-1.5 rounded-full bg-[#0099cc]" />
            What Drives Us
          </span>

          <h2 className="mt-5 font-['Cormorant_Garamond'] text-4xl font-semibold tracking-tight text-slate-900 md:text-5xl">
            Built on Purpose.
            <span className="text-[#0099cc]"> Driven by Impact.</span>
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-base font-light leading-7 tracking-wide text-slate-500 md:text-lg">
            Our values guide every project we build, every customer we serve,
            and every step we take toward a cleaner energy future.
          </p>

        </div>

        {/* CORE VALUES */}
        <div className="grid gap-6 md:grid-cols-3">

          {values.map((value, index) => {
            const Icon = value.icon;

            return (
              <div
                key={value.title}
                style={{ transitionDelay: isVisible ? `${index * 130}ms` : "0ms" }}
                className={`
                  group
                  relative
                  overflow-hidden
                  rounded-tl-[2.5rem]
                  rounded-br-[2.5rem]
                  rounded-tr-lg
                  rounded-bl-lg
                  border
                  border-slate-100
                  bg-white
                  p-8
                  shadow-[0_10px_35px_rgba(15,23,42,0.06)]
                  transition-all
                  duration-700
                  ease-out
                  hover:-translate-y-3
                  hover:border-[#0099cc]/25
                  hover:shadow-[0_20px_45px_rgba(51,128,0,0.15)]
                  ${
                    isVisible
                      ? "translate-y-0 opacity-100"
                      : "translate-y-10 opacity-0"
                  }
                `}
              >

                {/* Number */}
                <span className="
                  absolute
                  right-7
                  top-6
                  font-['Cormorant_Garamond']
                  text-5xl
                  font-bold
                  text-slate-100
                  transition-colors
                  duration-500
                  group-hover:text-[#0099cc]/10
                ">
                  0{index + 1}
                </span>

                {/* Icon */}
                <div
                  className="
                    relative
                    flex
                    h-16
                    w-16
                    items-center
                    justify-center
                    rounded-tl-2xl
                    rounded-br-2xl
                    rounded-tr-md
                    rounded-bl-md
                    bg-[#0099cc]
                    text-white
                    shadow-lg
                    shadow-[#0099cc]/20
                    transition-all
                    duration-500
                    group-hover:rotate-3
                    group-hover:scale-110
                  "
                >
                  <Icon size={30} strokeWidth={1.8} />
                </div>

                {/* Title */}
                <h3 className="mt-7 font-['Cormorant_Garamond'] text-2xl font-semibold text-slate-900">
                  {value.title}
                </h3>

                {/* Description */}
                <p className="mt-4 text-sm leading-7 tracking-wide text-slate-500">
                  {value.description}
                </p>

                {/* Bottom Accent */}
                <div
                  className="
                    mt-7
                    h-1
                    w-10
                    rounded-full
                    bg-[#0099cc]
                    transition-all
                    duration-500
                    group-hover:w-20
                  "
                />

              </div>
            );
          })}

        </div>

        {/* QUALITY BANNER */}
        <div
          ref={bannerRef}
          className={`
            relative
            mt-14
            min-h-[440px]
            overflow-hidden
            rounded-tl-[3rem]
            rounded-br-[3rem]
            rounded-tr-2xl
            rounded-bl-2xl
            bg-[#062B52]
            shadow-2xl
            shadow-slate-900/20
            transition-all
            duration-1000
            ease-out
            ${bannerVisible ? "translate-y-0 opacity-100 scale-100" : "translate-y-10 opacity-0 scale-[0.98]"}
          `}
        >

          {/* Background Image */}
          <img
            src={qualityImage}
            alt="Solar installation quality and safety team"
            className="
              absolute
              inset-0
              h-full
              w-full
              object-cover
            "
          />

          {/* Dark Overlay */}
          <div
            className="
              absolute
              inset-0
              bg-gradient-to-r
              from-[#04182E]
              via-[#063D67]/95
              to-[#0B4F2A]/70
            "
          />

          {/* Extra Dark Overlay */}
          <div className="absolute inset-0 bg-[#04182E]/20" />

          {/* Soft green glow accent on the image side */}
          <div className="pointer-events-none absolute inset-y-0 right-0 w-1/2 bg-[radial-gradient(ellipse_at_right,rgba(51,128,0,0.18),transparent_60%)]" />

          {/* Content */}
          <div className="relative z-10 flex min-h-[440px] items-center">

            <div className="max-w-2xl px-7 py-14 md:px-12 lg:px-16">

              {/* Icon Row */}
              <div
                className={`
                  mb-7 flex items-center gap-4
                  transition-all duration-700 ease-out delay-150
                  ${bannerVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"}
                `}
              >

                {/* Award */}
                <div
                  className="
                    flex
                    h-14
                    w-14
                    items-center
                    justify-center
                    rounded-tl-xl
                    rounded-br-xl
                    rounded-tr-md
                    rounded-bl-md
                    bg-[#0099cc]
                    text-white
                    shadow-lg
                    shadow-[#0099cc]/25
                    transition-transform
                    duration-500
                    hover:rotate-6
                    hover:scale-110
                  "
                >
                  <Award size={27} />
                </div>

                {/* Shield */}
                <div
                  className="
                    flex
                    h-14
                    w-14
                    items-center
                    justify-center
                    rounded-tl-xl
                    rounded-br-xl
                    rounded-tr-md
                    rounded-bl-md
                    bg-white/10
                    text-white
                    shadow-lg
                    shadow-black/20
                    backdrop-blur-sm
                    transition-transform
                    duration-500
                    hover:rotate-6
                    hover:scale-110
                  "
                >
                  <ShieldCheck size={27} />
                </div>

              </div>

              {/* Heading */}
              <h2
                className={`
                  font-['Cormorant_Garamond']
                  text-4xl
                  font-semibold
                  leading-tight
                  text-white
                  transition-all duration-700 ease-out delay-200
                  md:text-5xl
                  ${bannerVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"}
                `}
              >
                Quality, Safety &
                <span className="text-[#79FF4D]">
                  {" "}Customer Satisfaction
                </span>
              </h2>

              {/* Description */}
              <p
                className={`
                  mt-6
                  max-w-xl
                  text-base
                  font-light
                  leading-7
                  tracking-wide
                  text-blue-100
                  transition-all duration-700 ease-out delay-300
                  md:text-lg
                  ${bannerVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"}
                `}
              >
                Every installation meets the highest industry standards.
                Our certified technicians follow rigorous safety protocols,
                ensuring your solar system performs flawlessly for decades.
              </p>

              {/* Quality Points */}
              <div
                className={`
                  mt-8 flex flex-wrap gap-3
                  transition-all duration-700 ease-out delay-[400ms]
                  ${bannerVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"}
                `}
              >

                {["Certified Technicians", "Premium Materials", "Safety First"].map((point) => (
                  <span
                    key={point}
                    className="
                      rounded-full
                      border
                      border-white/15
                      bg-white/10
                      px-4
                      py-2
                      text-sm
                      font-medium
                      tracking-wide
                      text-white
                      backdrop-blur-sm
                      transition-colors
                      duration-300
                      hover:border-[#79FF4D]/40
                      hover:bg-white/15
                    "
                  >
                    <span className="text-[#79FF4D]">✓</span> {point}
                  </span>
                ))}

              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}