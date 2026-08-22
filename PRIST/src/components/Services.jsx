import { useEffect, useRef, useState } from "react";
import {
  ArrowRight,
  Check,
  MapPin,
  Zap,
} from "lucide-react";

import residentialImg from "../assets/residential-solar.png";
import commercialImg from "../assets/commercial-solar.png";
import rooftopImg from "../assets/rooftop-solar.png";
import installationImg from "../assets/panel-installation.png";
import inverterImg from "../assets/inverter-installation.png";
import maintenanceImg from "../assets/maintenance.png";

import project1 from "../assets/project1.png";
import project2 from "../assets/project2.png";

const services = [
  {
    title: "Residential Solar",
    image: residentialImg,
    description:
      "Custom solar systems designed to reduce household energy costs and increase energy independence.",
    features: [
      "Home energy assessment",
      "Custom system design",
      "Battery storage options",
    ],
  },

  {
    title: "Commercial Solar",
    image: commercialImg,
    description:
      "High-performance solar solutions built for businesses, offices, and large commercial facilities.",
    features: [
      "Large-scale solar systems",
      "Energy cost analysis",
      "Commercial-grade equipment",
    ],
  },

  {
    title: "Rooftop Solar Systems",
    image: rooftopImg,
    description:
      "Smart rooftop installations engineered to maximize available space and solar generation.",
    features: [
      "Rooftop assessment",
      "Panel layout optimization",
      "Maximum energy generation",
    ],
  },

  {
    title: "Solar Panel Installation",
    image: installationImg,
    description:
      "Professional installation using premium tier-1 solar panels and industry-standard equipment.",
    features: [
      "Tier-1 solar panels",
      "Professional wiring",
      "Certified installation",
    ],
  },

  {
    title: "Solar Inverter Installation",
    image: inverterImg,
    description:
      "Reliable inverter systems that efficiently convert solar power into usable electricity.",
    features: [
      "High-efficiency inverters",
      "Safe electrical installation",
      "System monitoring",
    ],
  },

  {
    title: "Maintenance & Upgrades",
    image: maintenanceImg,
    description:
      "Keep your solar investment performing at its best with expert maintenance and upgrades.",
    features: [
      "System inspection",
      "Performance optimization",
      "Component upgrades",
    ],
  },
];


const projects = [
  {
    title: "Hillside Family Home",
    category: "Residential",
    location: "Austin, TX",
    capacity: "8.5 kW",
    image: project1,
  },

  {
    title: "Valley Commercial Center",
    category: "Commercial",
    location: "Phoenix, AZ",
    capacity: "120 kW",
    image: project2,
  },

  {
    title: "Lakeside Residence",
    category: "Rooftop",
    location: "Denver, CO",
    capacity: "9.2 kW",
    image: project1,
  },

  {
    title: "Industrial Warehouse",
    category: "Commercial",
    location: "San Diego, CA",
    capacity: "250 kW",
    image: project2,
  },

  {
    title: "Suburban Estate",
    category: "Residential",
    location: "Dallas, TX",
    capacity: "12 kW",
    image: project1,
  },

  {
    title: "Modern Villa Rooftop",
    category: "Rooftop",
    location: "Las Vegas, NV",
    capacity: "10 kW",
    image: project2,
  },
];

/**
 * Matches the premium type/color/shape system used across the site:
 * Cormorant Garamond (display) + Manrope (body), #0099cc / #79FF4D accent,
 * asymmetric card corners. Add once to index.html <head> if not already present:
 *
 * <link
 *   href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@500;600;700&family=Manrope:wght@400;500;600;700&display=swap"
 *   rel="stylesheet"
 * />
 */

// Small reusable hook: fades/slides an element in once it scrolls into view
function useReveal(threshold = 0.15) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold]);

  return [ref, visible];
}

export default function ServicesProjects() {
  const [activeFilter, setActiveFilter] = useState("All");

  const [servicesHeaderRef, servicesHeaderVisible] = useReveal();
  const [servicesGridRef, servicesGridVisible] = useReveal(0.05);
  const [bannerRef, bannerVisible] = useReveal();
  const [projectsHeaderRef, projectsHeaderVisible] = useReveal();
  const [projectsGridRef, projectsGridVisible] = useReveal(0.05);

  const filteredProjects =
    activeFilter === "All"
      ? projects
      : projects.filter(
        (project) => project.category === activeFilter
      );

  return (
    <section id="services" className="relative overflow-hidden bg-white py-20 font-['Manrope'] lg:py-28">

      {/* Background Grid */}
      <div
        className="
          pointer-events-none
          absolute inset-0
          opacity-40
          bg-[linear-gradient(rgba(51,128,0,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(51,128,0,0.06)_1px,transparent_1px)]
          bg-[size:60px_60px]
        "
      />

      {/* Ambient glow */}
      <div className="pointer-events-none absolute -top-24 left-1/3 h-72 w-[36rem] rounded-full bg-[#0099cc]/8 blur-3xl" />

      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">

        {/* =====================================================
            SERVICES
        ===================================================== */}

        <div
          ref={servicesHeaderRef}
          className={`
            mx-auto max-w-3xl text-center
            transition-all duration-1000 ease-out
            ${servicesHeaderVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"}
          `}
        >

          <span className="
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
          ">
            <span className="h-1.5 w-1.5 rounded-full bg-[#0099cc]" />
            Our Services
          </span>

          <h2 className="
            mt-5
            font-['Cormorant_Garamond']
            text-4xl
            font-semibold
            leading-tight
            tracking-tight
            text-slate-900
            md:text-5xl
          ">
            Complete Solar{" "}
            <span className="text-[#0099cc]">
              Energy Solutions
            </span>
          </h2>

          <p className="
            mx-auto
            mt-5
            max-w-2xl
            text-base
            font-light
            leading-7
            tracking-wide
            text-slate-500
            md:text-lg
          ">
            From residential rooftops to commercial solar farms,
            we provide end-to-end solar services tailored to your
            energy needs and budget.
          </p>

        </div>


        {/* SERVICE GRID */}
        <div ref={servicesGridRef} className="mt-14 grid gap-7 md:grid-cols-2 lg:grid-cols-3">

          {services.map((service, index) => (
            <div
              key={service.title}
              style={{ transitionDelay: servicesGridVisible ? `${(index % 3) * 120}ms` : "0ms" }}
              className={`
                group
                overflow-hidden
                rounded-tl-[2.5rem]
                rounded-br-[2.5rem]
                rounded-tr-lg
                rounded-bl-lg
                border
                border-slate-100
                bg-white
                shadow-[0_10px_35px_rgba(15,23,42,0.07)]
                transition-all
                duration-700
                ease-out
                hover:-translate-y-2
                hover:border-[#0099cc]/25
                hover:shadow-[0_25px_50px_rgba(51,128,0,0.15)]
                ${
                  servicesGridVisible
                    ? "translate-y-0 opacity-100"
                    : "translate-y-10 opacity-0"
                }
              `}
            >

              {/* Image */}
              <div className="relative h-56 overflow-hidden">

                <img
                  src={service.image}
                  alt={service.title}
                  className="
                    h-full
                    w-full
                    object-cover
                    transition-transform
                    duration-700
                    group-hover:scale-110
                  "
                />

                {/* Overlay */}
                <div className="
                  absolute
                  inset-0
                  bg-gradient-to-t
                  from-[#04182E]/80
                  via-transparent
                  to-transparent
                " />

                {/* Solar Icon */}
                <div className="
                  absolute
                  left-5
                  top-5
                  flex
                  h-11
                  w-11
                  items-center
                  justify-center
                  rounded-xl
                  bg-white/90
                  text-[#0099cc]
                  shadow-lg
                  backdrop-blur-sm
                  transition-transform
                  duration-500
                  group-hover:rotate-6
                ">
                  <Zap size={21} />
                </div>

              </div>


              {/* Card Content */}
              <div className="p-7">

                <h3 className="
                  font-['Cormorant_Garamond']
                  text-2xl
                  font-semibold
                  text-slate-900
                  transition-colors
                  duration-300
                  group-hover:text-[#0099cc]
                ">
                  {service.title}
                </h3>

                <p className="
                  mt-3
                  text-sm
                  leading-6
                  tracking-wide
                  text-slate-500
                ">
                  {service.description}
                </p>


                {/* Features */}
                <div className="mt-5 space-y-3">

                  {service.features.map((feature) => (
                    <div
                      key={feature}
                      className="flex items-center gap-3"
                    >
                      <div className="
                        flex
                        h-5
                        w-5
                        shrink-0
                        items-center
                        justify-center
                        rounded-full
                        bg-[#0099cc]/8
                        text-[#0099cc]
                      ">
                        <Check size={13} strokeWidth={3} />
                      </div>

                      <span className="
                        text-sm
                        font-medium
                        text-slate-600
                      ">
                        {feature}
                      </span>
                    </div>
                  ))}

                </div>


                {/* Link */}
                <button className="
                  mt-7
                  inline-flex
                  items-center
                  gap-2
                  text-sm
                  font-bold
                  tracking-wide
                  text-[#0099cc]
                  transition-all
                  duration-300
                  hover:gap-3
                  hover:text-[#286600]
                ">
                  Request Consultation
                  <ArrowRight size={17} />
                </button>

              </div>

            </div>
          ))}

        </div>


        {/* =====================================================
            CONSULTATION BANNER
        ===================================================== */}

        <div
          ref={bannerRef}
          className={`
            relative
            mt-14
            overflow-hidden
            rounded-tl-[3rem]
            rounded-br-[3rem]
            rounded-tr-2xl
            rounded-bl-2xl
            bg-gradient-to-r
            from-[#04182E]
            via-[#0A3D1F]
            to-[#0B4F2A]
            px-7
            py-10
            shadow-2xl
            shadow-slate-900/20
            transition-all
            duration-1000
            ease-out
            md:px-10
            lg:px-14
            lg:py-12
            ${bannerVisible ? "translate-y-0 opacity-100 scale-100" : "translate-y-10 opacity-0 scale-[0.98]"}
          `}
        >

          {/* Grid */}
          <div className="
            absolute
            inset-0
            opacity-10
            bg-[linear-gradient(rgba(255,255,255,0.3)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.3)_1px,transparent_1px)]
            bg-[size:45px_45px]
          " />

          {/* Soft glow */}
          <div className="pointer-events-none absolute -right-20 top-1/2 h-64 w-64 -translate-y-1/2 rounded-full bg-[#79FF4D]/15 blur-3xl" />

          <div className="
            relative
            z-10
            flex
            flex-col
            items-start
            justify-between
            gap-7
            lg:flex-row
            lg:items-center
          ">

            <div>
              <span className="
                font-mono
                text-xs
                font-bold
                uppercase
                tracking-[0.25em]
                text-[#79FF4D]
              ">
                Free Expert Advice
              </span>

              <h3 className="
                mt-3
                font-['Cormorant_Garamond']
                text-3xl
                font-semibold
                text-white
                md:text-4xl
              ">
                Not Sure Which System You Need?
              </h3>

              <p className="
                mt-3
                text-sm
                tracking-wide
                text-blue-100
                md:text-base
              ">
                Get a free personalized consultation with our
                solar experts.
              </p>
            </div>


            <button className="
              group
              inline-flex
              shrink-0
              items-center
              gap-3
              rounded-full
              bg-gradient-to-r
              from-[#79FF4D]
              to-[#5FD432]
              px-7
              py-4
              text-sm
              font-bold
              tracking-wide
              text-[#04182E]
              shadow-xl
              shadow-[#79FF4D]/20
              transition-all
              duration-300
              hover:-translate-y-1
              hover:shadow-2xl
              hover:shadow-[#79FF4D]/30
            ">
              BOOK FREE CONSULTATION
              <ArrowRight
                size={19}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </button>

          </div>
        </div>


        {/* =====================================================
            PROJECTS
        ===================================================== */}

        <div id="projects" className="mt-28">

          {/* Project Header */}
          <div
            ref={projectsHeaderRef}
            className={`
              flex
              flex-col
              gap-8
              transition-all duration-1000 ease-out
              lg:flex-row
              lg:items-end
              lg:justify-between
              ${projectsHeaderVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"}
            `}
          >

            <div className="max-w-2xl">

              <span className="
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
              ">
                <span className="h-1.5 w-1.5 rounded-full bg-[#0099cc]" />
                Completed Projects
              </span>

              <h2 className="
                mt-5
                font-['Cormorant_Garamond']
                text-4xl
                font-semibold
                tracking-tight
                text-slate-900
                md:text-5xl
              ">
                Our Solar{" "}
                <span className="text-[#0099cc]">
                  Installations
                </span>
              </h2>

              <p className="
                mt-5
                text-base
                font-light
                leading-7
                tracking-wide
                text-slate-500
                md:text-lg
              ">
                Explore some of our completed residential,
                commercial, and rooftop solar installations.
              </p>

            </div>


            {/* FILTERS */}
            <div className="
              flex
              flex-wrap
              gap-2
              rounded-full
              border
              border-slate-200
              bg-white
              p-1.5
              shadow-sm
            ">

              {["All", "Residential", "Commercial", "Rooftop"].map(
                (filter) => (
                  <button
                    key={filter}
                    onClick={() => setActiveFilter(filter)}
                    className={`
                      rounded-full
                      px-5
                      py-2.5
                      text-sm
                      font-semibold
                      tracking-wide
                      transition-all
                      duration-300
                      ${activeFilter === filter
                        ? "bg-[#0099cc] text-white shadow-md shadow-[#0099cc]/20"
                        : "text-slate-500 hover:bg-slate-100 hover:text-slate-900"
                      }
                    `}
                  >
                    {filter}
                  </button>
                )
              )}

            </div>

          </div>


          {/* PROJECT GRID */}
          <div
            ref={projectsGridRef}
            className="
              mt-12
              grid
              gap-7
              md:grid-cols-2
              lg:grid-cols-3
            "
          >

            {filteredProjects.map((project, index) => (
              <div
                key={project.title}
                style={{ transitionDelay: projectsGridVisible ? `${(index % 3) * 120}ms` : "0ms" }}
                className={`
                  group
                  overflow-hidden
                  rounded-tl-[2.5rem]
                  rounded-br-[2.5rem]
                  rounded-tr-lg
                  rounded-bl-lg
                  border
                  border-slate-100
                  bg-white
                  shadow-[0_10px_35px_rgba(15,23,42,0.07)]
                  transition-all
                  duration-700
                  ease-out
                  hover:-translate-y-2
                  hover:shadow-[0_25px_50px_rgba(15,23,42,0.12)]
                  ${
                    projectsGridVisible
                      ? "translate-y-0 opacity-100"
                      : "translate-y-10 opacity-0"
                  }
                `}
              >

                {/* Project Image */}
                <div className="
                  relative
                  h-64
                  overflow-hidden
                ">

                  <img
                    src={project.image}
                    alt={project.title}
                    className="
                      h-full
                      w-full
                      object-cover
                      transition-transform
                      duration-700
                      group-hover:scale-110
                    "
                  />

                  {/* Overlay */}
                  <div className="
                    absolute
                    inset-0
                    bg-gradient-to-t
                    from-[#04182E]/85
                    via-[#04182E]/10
                    to-transparent
                  " />


                  {/* Category */}
                  <div className={`
                    absolute
                    left-5
                    top-5
                    rounded-full
                    px-4
                    py-1.5
                    text-xs
                    font-bold
                    tracking-wide
                    text-white
                    backdrop-blur-md
                    ${project.category === "Commercial"
                      ? "bg-[#0B4F2A]"
                      : "bg-[#0099cc]"
                    }
                  `}>
                    {project.category}
                  </div>


                  {/* Capacity */}
                  <div className="
                    absolute
                    bottom-5
                    right-5
                    flex
                    items-center
                    gap-2
                    rounded-full
                    bg-white/90
                    px-3
                    py-1.5
                    text-xs
                    font-bold
                    text-slate-800
                    backdrop-blur-md
                  ">
                    <Zap
                      size={13}
                      className="text-[#0099cc]"
                    />
                    {project.capacity}
                  </div>

                </div>


                {/* Project Info */}
                <div className="p-6">

                  <h3 className="
                    font-['Cormorant_Garamond']
                    text-xl
                    font-semibold
                    text-slate-900
                    transition-colors
                    duration-300
                    group-hover:text-[#0099cc]
                  ">
                    {project.title}
                  </h3>

                  <div className="
                    mt-3
                    flex
                    items-center
                    gap-2
                    text-sm
                    text-slate-500
                  ">
                    <MapPin
                      size={16}
                      className="text-[#0099cc]"
                    />

                    {project.location}
                  </div>

                  <div className="
                    mt-5
                    flex
                    items-center
                    justify-between
                    border-t
                    border-slate-100
                    pt-4
                  ">
                    <span className="
                      text-xs
                      font-semibold
                      uppercase
                      tracking-wider
                      text-slate-400
                    ">
                      Installed Capacity
                    </span>

                    <span className="
                      font-['Cormorant_Garamond']
                      text-lg
                      font-bold
                      text-slate-900
                    ">
                      {project.capacity}
                    </span>
                  </div>

                </div>

              </div>
            ))}

          </div>

        </div>

      </div>
    </section>
  );
}