
import { motion } from "framer-motion";
import { ArrowUpRight, MapPin, Zap } from "lucide-react";

import image1 from "../assets/image1.png";
import image2 from "../assets/image2.png";

const PROJECTS = [
  {
    image: image1,
    category: "Residential",
    title: "Premium Rooftop Solar",
    location: "Kerala",
    capacity: "5 kW",
    description:
      "High-efficiency rooftop installation designed to reduce household electricity consumption.",
  },
  {
    image: image2,
    category: "Commercial",
    title: "Commercial Rooftop System",
    location: "Kerala",
    capacity: "25 kW",
    description:
      "Scalable rooftop solar system engineered for consistent commercial energy generation.",
  },
  {
    image: image2,
    category: "Industrial",
    title: "Industrial Solar Plant",
    location: "Kerala",
    capacity: "250 kW",
    description:
      "Large-scale solar infrastructure designed to reduce industrial energy costs.",
  },
  {
    image: image2,
    category: "Commercial",
    title: "Smart Energy Project",
    location: "Kerala",
    capacity: "100 kW",
    description:
      "Grid-connected solar system with intelligent monitoring and performance tracking.",
  },
];

export default function Projects() {
  return (
    <section
      id="projects"
      className="
        relative
        min-h-screen
        overflow-hidden
        bg-[#e6f7ff]
        pt-36
        pb-20
        font-['Plus_Jakarta_Sans',sans-serif]
        sm:pt-40
        sm:pb-24
      "
    >
      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">

        {/* ================= HEADER ================= */}
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">

          <div className="max-w-2xl">

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
              Our Projects
            </span>

            <h2
              className="
                mt-4
                text-3xl
                font-bold
                tracking-tight
                text-slate-900
                sm:text-4xl
                lg:text-5xl
              "
            >
              Powering Kerala,
              <span className="text-sky-500">
                {" "}One Rooftop at a Time.
              </span>
            </h2>

            <p className="mt-4 text-sm leading-relaxed text-slate-500 sm:text-base">
              Explore a selection of solar installations delivered by our
              engineering and installation team.
            </p>
          </div>

          <a
            href="#contact"
            className="
              inline-flex
              w-fit
              items-center
              gap-2
              rounded-full
              border
              border-sky-300
              bg-white
              px-5
              py-3
              text-xs
              font-bold
              text-sky-700
              transition
              hover:-translate-y-0.5
              hover:bg-sky-50
              hover:shadow-md
            "
          >
            Start Your Project
            <ArrowUpRight size={15} />
          </a>
        </div>

        {/* ================= PROJECT GRID ================= */}
        <div className="mt-12 grid gap-7 md:grid-cols-2">

          {PROJECTS.map((project, index) => (
            <motion.article
              key={project.title}
              initial={{
                opacity: 0,
                y: 30,
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
                delay: index * 0.1,
              }}
              whileHover={{
                y: -6,
              }}
              className="
                group
                overflow-hidden
                rounded-3xl
                border
                border-sky-100
                bg-white
                shadow-sm
                transition
                hover:shadow-xl
              "
            >

              {/* ================= IMAGE ================= */}
              <div className="relative h-72 overflow-hidden">

                <img
                  src={project.image}
                  alt={project.title}
                  className="
                    h-full
                    w-full
                    object-cover
                    transition-transform
                    duration-700
                    group-hover:scale-105
                  "
                />

                <div
                  className="
                    absolute
                    inset-0
                    bg-gradient-to-t
                    from-slate-950/70
                    via-transparent
                    to-transparent
                  "
                />

                {/* Category */}
                <span
                  className="
                    absolute
                    left-5
                    top-5
                    rounded-full
                    border
                    border-white/20
                    bg-black/40
                    px-3
                    py-1.5
                    text-[10px]
                    font-bold
                    uppercase
                    tracking-wider
                    text-white
                    backdrop-blur-md
                  "
                >
                  {project.category}
                </span>

                {/* Capacity */}
                <div
                  className="
                    absolute
                    bottom-5
                    right-5
                    flex
                    items-center
                    gap-1.5
                    rounded-full
                    bg-sky-500
                    px-3
                    py-1.5
                    text-xs
                    font-bold
                    text-white
                    shadow-lg
                  "
                >
                  <Zap size={13} />
                  {project.capacity}
                </div>
              </div>

              {/* ================= CONTENT ================= */}
              <div className="p-6">

                <h3 className="text-xl font-bold text-slate-900">
                  {project.title}
                </h3>

                <div
                  className="
                    mt-2
                    flex
                    items-center
                    gap-1.5
                    text-xs
                    font-semibold
                    text-sky-600
                  "
                >
                  <MapPin size={14} />
                  {project.location}
                </div>

                <p className="mt-4 text-sm leading-relaxed text-slate-500">
                  {project.description}
                </p>

                <div
                  className="
                    mt-5
                    flex
                    items-center
                    justify-between
                    border-t
                    border-slate-100
                    pt-4
                  "
                >
                  <span className="text-xs font-semibold text-slate-400">
                    Completed Project
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
                      transition
                      group-hover:bg-sky-500
                      group-hover:text-white
                    "
                  >
                    <ArrowUpRight size={17} />
                  </div>
                </div>

              </div>
            </motion.article>
          ))}

        </div>

        {/* ================= BOTTOM CTA ================= */}
        <div className="mt-12 text-center">

          <p className="text-sm text-slate-500">
            Planning a solar project for your home or business?
          </p>

          <a
            href="#contact"
            className="
              mt-4
              inline-flex
              items-center
              gap-2
              rounded-full
              bg-slate-900
              px-7
              py-3
              text-xs
              font-bold
              text-white
              transition
              hover:-translate-y-0.5
              hover:bg-sky-600
            "
          >
            Talk to Our Solar Experts
            <ArrowUpRight size={15} />
          </a>

        </div>

      </div>
    </section>
  );
}
