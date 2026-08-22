import { useEffect, useRef, useState } from "react";

const reasons = [
    {
        number: "01",
        title: "Kerala Expertise",
        text: "Solar systems designed around Kerala's climate, rooftops and energy conditions.",
    },
    {
        number: "02",
        title: "Quality Components",
        text: "Reliable solar panels, inverters and balance-of-system equipment.",
    },
    {
        number: "03",
        title: "End-to-End Service",
        text: "Survey, design, installation and support handled by one team.",
    },
    {
        number: "04",
        title: "Long-Term Support",
        text: "Our relationship continues long after your solar system is installed.",
    },
];

/**
 * Matches the premium type system used in Hero / OurImpact:
 * Cormorant Garamond (display) + Manrope (body).
 * Add once to index.html <head> if not already present:
 *
 * <link
 *   href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@500;600;700&family=Manrope:wght@400;500;600;700&display=swap"
 *   rel="stylesheet"
 * />
 */

function WhyPristine() {
    const sectionRef = useRef(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.disconnect();
                }
            },
            { threshold: 0.15 }
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => observer.disconnect();
    }, []);

    return (
        <section
            id="about"
            ref={sectionRef}
            className="relative overflow-hidden bg-white py-24 font-['Manrope'] md:py-28"
        >
            {/* Background decoration */}
            <div
                className="
          pointer-events-none
          absolute
          inset-0
          opacity-60
          bg-[linear-gradient(rgba(51,128,0,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(51,128,0,0.04)_1px,transparent_1px)]
          bg-[size:60px_60px]
        "
            />

            {/* Soft ambient accent glow */}
            <div className="pointer-events-none absolute -top-24 left-1/4 h-72 w-[36rem] rounded-full bg-[#0099cc]/8 blur-3xl" />

            <div className="relative mx-auto max-w-7xl px-6">

                {/* HEADER */}
                <div
                    className={`
            max-w-2xl
            transition-all
            duration-1000
            ${isVisible
                            ? "translate-y-0 opacity-100"
                            : "translate-y-8 opacity-0"
                        }
          `}
                >
                    {/* Badge */}
                    <div className="mb-5 inline-flex items-center gap-3 rounded-full border border-[#0099cc]/20 bg-[#0099cc]/5 px-4 py-2">
                        <span className="h-px w-6 bg-[#0099cc]" />

                        <span className="font-mono text-xs font-bold uppercase tracking-[0.25em] text-[#0099cc]">
                            Why Pristine
                        </span>
                    </div>

                    {/* Heading */}
                    <h2 className="font-['Cormorant_Garamond'] text-5xl font-semibold leading-tight tracking-tight text-slate-900 md:text-6xl">
                        Built for{" "}
                        <span className="text-[#0099cc]">
                            Better Energy
                        </span>
                    </h2>

                    <p className="mt-5 max-w-xl text-base font-light leading-7 tracking-wide text-slate-500 md:text-lg">
                        We combine local expertise, premium components and dependable
                        service to make your transition to solar simple and reliable.
                    </p>
                </div>


                {/* CARDS */}
                <div className="mt-14 grid gap-6 md:grid-cols-2">

                    {reasons.map((item, index) => (
                        <div
                            key={item.number}
                            style={{
                                transitionDelay: `${index * 120}ms`,
                            }}
                            className={`
                group
                relative
                overflow-hidden
                rounded-tl-[2.5rem]
                rounded-br-[2.5rem]
                rounded-tr-lg
                rounded-bl-lg
                border
                border-slate-200
                bg-white
                p-8
                shadow-sm
                transition-all
                duration-700
                hover:-translate-y-2
                hover:border-[#0099cc]/25
                hover:shadow-xl
                hover:shadow-[#0099cc]/10
                ${isVisible
                                    ? "translate-y-0 opacity-100"
                                    : "translate-y-12 opacity-0"
                                }
              `}
                        >

                            {/* Animated side line */}
                            <div
                                className="
                  absolute
                  left-0
                  top-0
                  h-full
                  w-1
                  origin-top
                  scale-y-0
                  bg-[#0099cc]
                  transition-transform
                  duration-500
                  group-hover:scale-y-100
                "
                            />

                            {/* Number */}
                            <div
                                className="
                  flex
                  h-12
                  w-12
                  items-center
                  justify-center
                  rounded-tl-xl
                  rounded-br-xl
                  bg-[#0099cc]/8
                  font-mono
                  text-sm
                  font-bold
                  text-[#0099cc]
                  transition-all
                  duration-500
                  group-hover:rotate-6
                  group-hover:bg-[#0099cc]
                  group-hover:text-white
                "
                            >
                                {item.number}
                            </div>

                            {/* Content */}
                            <h3
                                className="
                  mt-6
                  font-['Cormorant_Garamond']
                  text-2xl
                  font-semibold
                  text-slate-900
                  transition-colors
                  duration-300
                  group-hover:text-[#0099cc]
                "
                            >
                                {item.title}
                            </h3>

                            <p
                                className="
                  mt-3
                  max-w-lg
                  leading-7
                  tracking-wide
                  text-slate-500
                "
                            >
                                {item.text}
                            </p>

                            {/* Bottom accent */}
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
                    ))}

                </div>

            </div>
        </section>
    );
}

export default WhyPristine;