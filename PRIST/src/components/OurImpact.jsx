import { useEffect, useRef, useState } from "react";

const stats = [
    { value: 500, suffix: "+", label: "INSTALLATIONS" },
    { value: 15, suffix: "+", label: "YEARS EXPERIENCE" },
    { value: 25, suffix: " MW+", label: "SOLAR CAPACITY" },
    { value: 24, suffix: "/7", label: "SUPPORT" },
];

/**
 * Uses the same premium fonts as the Hero:
 * Cormorant Garamond (display) + Manrope (body).
 * Add this once to index.html <head> if not already present:
 *
 * <link
 *   href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@500;600;700&family=Manrope:wght@400;500;600;700&display=swap"
 *   rel="stylesheet"
 * />
 */

function Counter({ end, duration = 1500, isVisible }) {
    const [count, setCount] = useState(0);

    useEffect(() => {
        if (!isVisible) return;

        let startTime = null;
        let animationFrame;

        const animate = (timestamp) => {
            if (!startTime) startTime = timestamp;
            const progress = Math.min((timestamp - startTime) / duration, 1);

            // Ease-out cubic formula for smooth deceleration
            const easeOut = 1 - Math.pow(1 - progress, 3);
            setCount(Math.floor(easeOut * end));

            if (progress < 1) {
                animationFrame = requestAnimationFrame(animate);
            } else {
                setCount(end);
            }
        };

        animationFrame = requestAnimationFrame(animate);

        return () => cancelAnimationFrame(animationFrame);
    }, [end, duration, isVisible]);

    return <>{count}</>;
}

function OurImpact() {
    const [isVisible, setIsVisible] = useState(false);
    const sectionRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.disconnect(); // Animate only once
                }
            },
            { threshold: 0.2 }
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => observer.disconnect();
    }, []);

    return (
        <section
            id="impact"
            ref={sectionRef}
            className="relative overflow-hidden bg-slate-50 py-28 font-['Manrope']"
        >
            {/* Soft ambient accent glow, purely decorative */}
            <div className="pointer-events-none absolute -top-24 left-1/2 h-72 w-[36rem] -translate-x-1/2 rounded-full bg-[#0099cc]/10 blur-3xl" />

            <div className="relative mx-auto max-w-7xl px-6">

                {/* Heading */}
                <div
                    className={`
                        transition-all duration-700 ease-out
                        ${isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"}
                    `}
                >
                    <div className="flex items-center gap-3">
                        <span className="h-px w-8 bg-[#0099cc]" />
                        <p className="font-mono text-xs font-semibold tracking-[0.25em] text-[#0099cc] uppercase">
                            Our Impact
                        </p>
                    </div>

                    <h2 className="mt-4 font-['Cormorant_Garamond'] text-5xl font-semibold tracking-tight text-slate-900 sm:text-6xl">
                        Making Solar Count
                    </h2>
                </div>

                {/* Stats Grid */}
                <div className="mt-14 grid grid-cols-2 gap-5 lg:grid-cols-4">
                    {stats.map(({ value, suffix, label }, index) => (
                        <div
                            key={label}
                            style={{ transitionDelay: isVisible ? `${index * 120}ms` : "0ms" }}
                            className={`
                                group
                                relative
                                overflow-hidden
                                rounded-2xl
                                border
                                border-slate-200
                                bg-white
                                p-8
                                text-center
                                shadow-sm
                                transition-all
                                duration-700
                                ease-out
                                hover:-translate-y-1
                                hover:border-[#0099cc]/30
                                hover:shadow-lg
                                hover:shadow-[#0099cc]/10
                                ${isVisible
                                    ? "translate-y-0 opacity-100"
                                    : "translate-y-8 opacity-0"
                                }
                            `}
                        >
                            {/* Top accent line that draws in on hover */}
                            <span
                                className="
                                    absolute
                                    left-0
                                    top-0
                                    h-[3px]
                                    w-0
                                    bg-[#0099cc]
                                    transition-all
                                    duration-500
                                    ease-out
                                    group-hover:w-full
                                "
                            />

                            <div className="font-['Cormorant_Garamond'] text-5xl font-semibold tracking-tight text-[#0099cc] sm:text-6xl">
                                <Counter end={value} isVisible={isVisible} />
                                <span>{suffix}</span>
                            </div>

                            <p className="mt-3 font-mono text-xs uppercase tracking-wider text-slate-500">
                                {label}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default OurImpact;