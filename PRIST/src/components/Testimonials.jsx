import { Star, Quote } from "lucide-react";
import { useEffect, useState } from "react";

const testimonials = [
    {
        name: "Sarah Mitchell",
        role: "Homeowner",
        location: "Austin, TX",
        quote:
            "Pristine Energy transformed our home with a beautiful rooftop solar system. Our electric bill dropped from $280 to under $30.",
    },
    {
        name: "James Rodriguez",
        role: "Business Owner",
        location: "Phoenix, AZ",
        quote:
            "We installed a 120kW commercial system for our warehouse. The ROI has been phenomenal and Pristine Energy handled everything flawlessly.",
    },
    {
        name: "Emily Chen",
        role: "Homeowner",
        location: "Denver, CO",
        quote:
            "From the free consultation to the final inspection, the entire process was seamless. Highly recommend Pristine Energy!",
    },
    {
        name: "Michael Thompson",
        role: "Property Developer",
        location: "San Diego, CA",
        quote:
            "Their attention to detail, quality materials, and after-sales support are unmatched in the industry.",
    },
    {
        name: "Lisa Anderson",
        role: "Homeowner",
        location: "Dallas, TX",
        quote:
            "The battery storage integration was a game-changer. Pristine Energy truly delivers premium solar solutions.",
    },
    {
        name: "David Kumar",
        role: "Restaurant Owner",
        location: "Las Vegas, NV",
        quote:
            "Our restaurant now runs on clean solar energy. The installation was quick and the savings are real.",
    },
];

/**
 * Matches the premium type/color/shape system used across the site:
 * Cormorant Garamond (display) + Manrope (body), #0099cc accent,
 * asymmetric card corners. Add once to index.html <head> if not already present:
 *
 * <link
 *   href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@500;600;700&family=Manrope:wght@400;500;600;700&display=swap"
 *   rel="stylesheet"
 * />
 */

export default function Testimonials() {
    const [activeIndex, setActiveIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setActiveIndex((prev) => (prev + 1) % testimonials.length);
        }, 2500);

        return () => clearInterval(interval);
    }, []);

    const testimonial = testimonials[activeIndex];

    const initials = testimonial.name
        .split(" ")
        .map((part) => part[0])
        .join("");

    return (
        <section
            id="testimonials"
            className="relative overflow-hidden bg-[#fbfaf4] py-16 font-['Manrope']"
        >
            {/* Ambient accent glow */}
            <div className="pointer-events-none absolute left-1/2 top-0 h-72 w-[36rem] -translate-x-1/2 rounded-full bg-[#0099cc]/8 blur-3xl" />

            <div className="relative mx-auto max-w-7xl px-5">

                {/* HEADER */}
                <div className="mx-auto max-w-2xl text-center">

                    <span
                        className="
              inline-flex
              items-center
              gap-2
              rounded-full
              border
              border-[#0099cc]/20
              bg-[#0099cc]/5
              px-3
              py-1.5
              font-mono
              text-xs
              font-semibold
              uppercase
              tracking-[0.2em]
              text-[#0099cc]
            "
                    >
                        <span className="h-1.5 w-1.5 rounded-full bg-[#0099cc]" />
                        Client Testimonials
                    </span>

                    <h2
                        className="
              mt-4
              font-['Cormorant_Garamond']
              text-3xl
              font-semibold
              tracking-tight
              text-slate-900
              md:text-4xl
            "
                    >
                        What Our Customers Say
                    </h2>

                    <p className="mt-3 text-sm leading-6 tracking-wide text-slate-500">
                        Over 1,500 satisfied customers have made the switch to
                        clean solar energy with Pristine Energy.
                    </p>

                </div>

                {/* SMALL SINGLE CARD */}
                <div className="mt-10 flex justify-center">

                    <article
                        key={activeIndex}
                        className="
              relative
              w-full
              max-w-2xl
              overflow-hidden
              rounded-tl-[2rem]
              rounded-br-[2rem]
              rounded-tr-lg
              rounded-bl-lg
              border
              border-slate-100
              bg-white
              p-6
              shadow-[0_8px_25px_rgba(15,23,42,0.07)]
              animate-testimonial
            "
                    >

                        {/* Accent corner wash */}
                        <div className="pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full bg-[#0099cc]/6 blur-2xl" />

                        {/* TOP */}
                        <div className="relative flex items-center justify-between">

                            <div className="flex gap-0.5">
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <Star
                                        key={star}
                                        size={14}
                                        fill="currentColor"
                                        className="text-[#0099cc]"
                                    />
                                ))}
                            </div>

                            <div
                                className="
                  flex
                  h-9
                  w-9
                  items-center
                  justify-center
                  rounded-tl-lg
                  rounded-br-lg
                  rounded-tr-sm
                  rounded-bl-sm
                  bg-[#0099cc]/8
                  text-[#0099cc]
                "
                            >
                                <Quote size={17} fill="currentColor" />
                            </div>

                        </div>

                        {/* QUOTE */}
                        <p
                            className="
                relative
                mt-5
                min-h-[90px]
                font-['Cormorant_Garamond']
                text-lg
                font-medium
                leading-7
                tracking-wide
                text-slate-700
              "
                        >
                            "{testimonial.quote}"
                        </p>

                        <div className="my-5 h-px bg-slate-100" />

                        {/* USER */}
                        <div className="relative flex items-center gap-3">

                            <div
                                className="
                  flex
                  h-10
                  w-10
                  shrink-0
                  items-center
                  justify-center
                  rounded-tl-lg
                  rounded-br-lg
                  rounded-tr-sm
                  rounded-bl-sm
                  bg-[#0099cc]
                  font-['Cormorant_Garamond']
                  text-sm
                  font-bold
                  text-white
                "
                            >
                                {initials}
                            </div>

                            <div>
                                <h3 className="text-sm font-bold text-slate-900">
                                    {testimonial.name}
                                </h3>

                                <p className="text-xs tracking-wide text-slate-500">
                                    {testimonial.role} · {testimonial.location}
                                </p>
                            </div>

                        </div>

                    </article>

                </div>

                {/* PROGRESS DOTS */}
                <div className="mt-6 flex justify-center gap-1.5">

                    {testimonials.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => setActiveIndex(index)}
                            aria-label={`Show testimonial ${index + 1}`}
                            className={`
                h-1.5
                rounded-full
                transition-all
                duration-300
                ${activeIndex === index
                                    ? "w-6 bg-[#0099cc]"
                                    : "w-1.5 bg-slate-300 hover:bg-slate-400"
                                }
              `}
                        />
                    ))}

                </div>

            </div>

        </section>
    );
}