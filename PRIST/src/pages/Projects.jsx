import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowUpRight,
  MapPin,
  Zap,
  X,
  MessageSquare,
  Send,
  AlertCircle,
} from "lucide-react";

import image1 from "../assets/image1.png";
import image2 from "../assets/image2.png";

// =========================================================
// PROJECT DATA
// =========================================================

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

const TARGET_EMAIL = "pristinehorizon97@gmail.com";
const WHATSAPP_RECIPIENT = "7012694985";

// =========================================================
// PROJECTS COMPONENT
// =========================================================

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState(null);

  const [formData, setFormData] = useState({
    fullName: "",
    whatsapp: "",
    email: "",
    location: "",
    siteType: "RESIDENTIAL",
    requiredKw: "",
  });

  const [errors, setErrors] = useState({});

  // =======================================================
  // VALIDATION FUNCTION
  // =======================================================

  const validateForm = () => {
    const newErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full name is required";
    }

    const phoneDigits = formData.whatsapp.replace(/\D/g, "");
    if (!formData.whatsapp.trim()) {
      newErrors.whatsapp = "WhatsApp number is required";
    } else if (phoneDigits.length < 10) {
      newErrors.whatsapp = "Enter a valid 10-digit mobile number";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = "Email address is required";
    } else if (!emailRegex.test(formData.email.trim())) {
      newErrors.email = "Enter a valid email address";
    }

    if (!formData.location.trim()) {
      newErrors.location = "Location is required";
    }

    if (!formData.requiredKw.trim()) {
      newErrors.requiredKw = "Required kW is required";
    } else if (isNaN(Number(formData.requiredKw)) || Number(formData.requiredKw) <= 0) {
      newErrors.requiredKw = "Enter a valid positive number";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // =======================================================
  // OPEN MODAL
  // =======================================================

  const handleOpenModal = (project) => {
    setSelectedProject(project);
    setErrors({});

    setFormData({
      fullName: "",
      whatsapp: "",
      email: "",
      location: project.location || "Kerala",
      siteType: project.category.toUpperCase(),
      requiredKw: project.capacity.replace(/[^0-9.]/g, ""),
    });

    document.body.style.overflow = "hidden";
  };

  // =======================================================
  // CLOSE MODAL
  // =======================================================

  const handleCloseModal = () => {
    setSelectedProject(null);
    setErrors({});
    document.body.style.overflow = "";
  };

  // =======================================================
  // INPUT CHANGE
  // =======================================================

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  // =======================================================
  // SEND EMAIL ENQUIRY
  // =======================================================

  const handleSendEmail = (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    const subject = `Project Enquiry: ${selectedProject?.title}`;

    const body = `
PROJECT ENQUIRY DETAILS
----------------------
Project: ${selectedProject?.title}
Capacity: ${selectedProject?.capacity}

Full Name: ${formData.fullName.trim()}
WhatsApp Number: ${formData.whatsapp.trim()}
Email: ${formData.email.trim()}
Location: ${formData.location.trim()}
Site Type: ${formData.siteType}
Required kW: ${formData.requiredKw.trim()}
    `.trim();

    const mailto = `mailto:${TARGET_EMAIL}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;

    window.location.href = mailto;
  };

  // =======================================================
  // DIRECT WHATSAPP ENQUIRY
  // =======================================================

  const handleDirectWhatsApp = () => {
    if (!validateForm()) return;

    const message = `*NEW PROJECT ENQUIRY*

*Project:* ${selectedProject?.title}
*System Size:* ${formData.requiredKw.trim()} kW

*Client Details:*
• *Name:* ${formData.fullName.trim()}
• *WhatsApp:* ${formData.whatsapp.trim()}
• *Email:* ${formData.email.trim()}
• *Location:* ${formData.location.trim()}
• *Site Type:* ${formData.siteType}

I would like to enquire about this installation. Please share quotation and setup details.`;

    window.open(
      `https://wa.me/${WHATSAPP_RECIPIENT}?text=${encodeURIComponent(message)}`,
      "_blank"
    );
  };

  return (
    <section
      id="projects"
      className="
        relative
        min-h-screen
        overflow-hidden
        bg-[#e6f7ff]
        pt-28
        pb-16
        font-['Inter',sans-serif]
        sm:pt-36
        sm:pb-20
        lg:pt-40
        lg:pb-24
      "
    >
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* HEADER */}
        <div
          className="
            flex
            flex-col
            gap-6
            md:flex-row
            md:items-end
            md:justify-between
          "
        >
          <div className="max-w-2xl">
            <span
              className="
                inline-flex
                rounded-full
                bg-sky-100
                px-3.5
                py-1.5
                text-[10px]
                font-bold
                uppercase
                tracking-[0.16em]
                text-sky-700
                sm:px-4
                sm:text-xs
              "
            >
              Our Projects
            </span>

            <h2
              className="
                mt-4
                max-w-xl
                text-[2rem]
                font-extrabold
                leading-[1.12]
                tracking-[-0.04em]
                text-slate-900
                sm:text-4xl
                lg:text-5xl
                lg:leading-[1.08]
              "
            >
              Powering Kerala,
              <span className="block text-sky-500 sm:inline">
                {" "}
                One Rooftop at a Time.
              </span>
            </h2>

            <p
              className="
                mt-4
                max-w-xl
                text-[13px]
                leading-6
                text-slate-500
                sm:text-base
                sm:leading-relaxed
              "
            >
              Explore a selection of solar installations delivered by our
              engineering and installation team.
            </p>
          </div>

          <a
            href="/contact"
            className="
              inline-flex
              w-full
              items-center
              justify-center
              gap-2
              rounded-full
              border
              border-sky-300
              bg-white
              px-5
              py-3.5
              text-xs
              font-bold
              tracking-wide
              text-sky-700
              transition
              hover:-translate-y-0.5
              hover:bg-sky-50
              hover:shadow-md
              sm:w-fit
            "
          >
            Enquire Now
            <ArrowUpRight size={15} />
          </a>
        </div>

        {/* PROJECT GRID */}
        <div
          className="
            mt-10
            grid
            grid-cols-1
            gap-5
            sm:mt-12
            sm:gap-7
            md:grid-cols-2
          "
        >
          {PROJECTS.map((project, index) => (
            <motion.article
              key={project.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -6 }}
              className="
                group
                flex
                flex-col
                overflow-hidden
                rounded-[1.5rem]
                border
                border-sky-100
                bg-white
                shadow-sm
                transition
                hover:shadow-xl
                sm:rounded-3xl
              "
            >
              {/* IMAGE */}
              <div
                className="
                  relative
                  h-56
                  overflow-hidden
                  sm:h-72
                "
              >
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

                {/* CATEGORY */}
                <span
                  className="
                    absolute
                    left-4
                    top-4
                    rounded-full
                    border
                    border-white/20
                    bg-black/40
                    px-2.5
                    py-1.5
                    text-[9px]
                    font-bold
                    uppercase
                    tracking-[0.14em]
                    text-white
                    backdrop-blur-md
                    sm:left-5
                    sm:top-5
                    sm:px-3
                    sm:text-[10px]
                  "
                >
                  {project.category}
                </span>

                {/* CAPACITY */}
                <div
                  className="
                    absolute
                    bottom-4
                    right-4
                    flex
                    items-center
                    gap-1.5
                    rounded-full
                    bg-sky-500
                    px-2.5
                    py-1.5
                    text-[10px]
                    font-bold
                    text-white
                    shadow-lg
                    sm:bottom-5
                    sm:right-5
                    sm:px-3
                    sm:text-xs
                  "
                >
                  <Zap size={12} />
                  {project.capacity}
                </div>
              </div>

              {/* CONTENT */}
              <div
                className="
                  flex
                  flex-1
                  flex-col
                  justify-between
                  p-5
                  sm:p-6
                "
              >
                <div>
                  <h3
                    className="
                      text-lg
                      font-extrabold
                      tracking-tight
                      text-slate-900
                      sm:text-xl
                    "
                  >
                    {project.title}
                  </h3>

                  <div
                    className="
                      mt-2
                      flex
                      items-center
                      gap-1.5
                      text-[11px]
                      font-semibold
                      text-sky-600
                      sm:text-xs
                    "
                  >
                    <MapPin size={14} />
                    {project.location}
                  </div>

                  <p
                    className="
                      mt-3
                      text-[13px]
                      leading-6
                      text-slate-500
                      sm:mt-4
                      sm:text-sm
                      sm:leading-relaxed
                    "
                  >
                    {project.description}
                  </p>
                </div>

                {/* ACTION */}
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
                  <button
                    type="button"
                    onClick={() => handleOpenModal(project)}
                    className="
                      text-[11px]
                      font-bold
                      uppercase
                      tracking-wider
                      text-sky-600
                      transition-colors
                      hover:text-sky-700
                      sm:text-xs
                    "
                  >
                    Enquire on Project
                  </button>

                  <button
                    type="button"
                    onClick={() => handleOpenModal(project)}
                    aria-label={`Enquire about ${project.title}`}
                    className="
                      flex
                      h-10
                      w-10
                      shrink-0
                      items-center
                      justify-center
                      rounded-full
                      bg-sky-50
                      text-sky-600
                      transition-all
                      duration-300
                      hover:rotate-45
                      hover:bg-sky-500
                      hover:text-white
                      active:scale-95
                    "
                  >
                    <ArrowUpRight size={17} />
                  </button>
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        {/* BOTTOM CTA */}
        <div className="mt-10 text-center sm:mt-12">
          <p
            className="
              px-4
              text-[13px]
              leading-5
              text-slate-500
              sm:text-sm
            "
          >
            Planning a solar project for your home or business?
          </p>

          <a
            href="/contact"
            className="
              mt-4
              inline-flex
              w-full
              items-center
              justify-center
              gap-2
              rounded-full
              bg-slate-900
              px-7
              py-3.5
              text-xs
              font-bold
              uppercase
              tracking-wide
              text-white
              transition
              hover:-translate-y-0.5
              hover:bg-sky-600
              sm:w-fit
            "
          >
            Enquire with Solar Experts
            <ArrowUpRight size={15} />
          </a>
        </div>
      </div>

      {/* PROJECT ENQUIRY MODAL */}
      <AnimatePresence>
        {selectedProject && (
          <div
            className="
              fixed
              inset-0
              z-50
              flex
              items-center
              justify-center
              overflow-y-auto
              p-3
              sm:p-5
            "
          >
            {/* BACKDROP */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleCloseModal}
              className="
                fixed
                inset-0
                bg-slate-950/65
                backdrop-blur-sm
              "
            />

            {/* MODAL */}
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 20 }}
              transition={{ duration: 0.2 }}
              onClick={(e) => e.stopPropagation()}
              className="
                relative
                z-10
                my-auto
                flex
                max-h-[94vh]
                w-full
                max-w-md
                flex-col
                overflow-y-auto
                rounded-[1.5rem]
                bg-white
                p-5
                shadow-2xl
                sm:rounded-[2rem]
                sm:p-8
              "
            >
              {/* CLOSE */}
              <button
                type="button"
                onClick={handleCloseModal}
                aria-label="Close enquiry modal"
                className="
                  absolute
                  right-4
                  top-4
                  z-20
                  flex
                  h-9
                  w-9
                  items-center
                  justify-center
                  rounded-full
                  text-slate-400
                  transition
                  hover:bg-slate-100
                  hover:text-slate-700
                  active:scale-95
                  sm:right-6
                  sm:top-6
                "
              >
                <X size={19} />
              </button>

              {/* HEADER */}
              <div className="pr-10">
                <h3
                  className="
                    text-xl
                    font-black
                    uppercase
                    tracking-[0.12em]
                    text-slate-900
                    sm:text-2xl
                  "
                >
                  Project Enquiry
                </h3>

                <p
                  className="
                    mt-1.5
                    max-w-[90%]
                    text-[9px]
                    font-extrabold
                    uppercase
                    leading-4
                    tracking-[0.12em]
                    text-amber-600
                    sm:text-xs
                  "
                >
                  Target: {selectedProject.title} ({selectedProject.capacity} System)
                </p>
              </div>

              {/* FORM */}
              <form
                onSubmit={handleSendEmail}
                noValidate
                className="
                  mt-5
                  space-y-3.5
                  sm:mt-6
                  sm:space-y-4
                "
              >
                {/* FULL NAME */}
                <div>
                  <label
                    className="
                      block
                      text-[9px]
                      font-extrabold
                      uppercase
                      tracking-[0.14em]
                      text-slate-400
                    "
                  >
                    Full Name
                  </label>

                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    autoComplete="name"
                    placeholder="YOUR FULL NAME"
                    className={`
                      mt-1.5
                      w-full
                      rounded-xl
                      border
                      bg-slate-50
                      px-3.5
                      py-3
                      text-sm
                      font-medium
                      text-slate-900
                      outline-none
                      transition
                      placeholder:text-[10px]
                      placeholder:font-bold
                      placeholder:text-slate-300
                      focus:bg-white
                      focus:ring-2
                      ${
                        errors.fullName
                          ? "border-rose-300 focus:border-rose-400 focus:ring-rose-500/20"
                          : "border-transparent focus:border-sky-200 focus:ring-sky-500/30"
                      }
                    `}
                  />
                  {errors.fullName && (
                    <p className="mt-1 flex items-center gap-1 text-[11px] font-medium text-rose-500">
                      <AlertCircle size={12} />
                      {errors.fullName}
                    </p>
                  )}
                </div>

                {/* WHATSAPP */}
                <div>
                  <label
                    className="
                      block
                      text-[9px]
                      font-extrabold
                      uppercase
                      tracking-[0.14em]
                      text-slate-400
                    "
                  >
                    WhatsApp Number
                  </label>

                  <input
                    type="tel"
                    name="whatsapp"
                    inputMode="tel"
                    autoComplete="tel"
                    placeholder="10 DIGITS (E.G. 9876543210)"
                    value={formData.whatsapp}
                    onChange={handleInputChange}
                    className={`
                      mt-1.5
                      w-full
                      rounded-xl
                      border
                      bg-slate-50
                      px-3.5
                      py-3
                      text-sm
                      font-medium
                      text-slate-900
                      outline-none
                      transition
                      placeholder:text-[10px]
                      placeholder:font-bold
                      placeholder:tracking-wider
                      placeholder:text-slate-300
                      focus:bg-white
                      focus:ring-2
                      ${
                        errors.whatsapp
                          ? "border-rose-300 focus:border-rose-400 focus:ring-rose-500/20"
                          : "border-transparent focus:border-sky-200 focus:ring-sky-500/30"
                      }
                    `}
                  />
                  {errors.whatsapp && (
                    <p className="mt-1 flex items-center gap-1 text-[11px] font-medium text-rose-500">
                      <AlertCircle size={12} />
                      {errors.whatsapp}
                    </p>
                  )}
                </div>

                {/* EMAIL */}
                <div>
                  <label
                    className="
                      block
                      text-[9px]
                      font-extrabold
                      uppercase
                      tracking-[0.14em]
                      text-slate-400
                    "
                  >
                    Email Address
                  </label>

                  <input
                    type="email"
                    name="email"
                    inputMode="email"
                    autoComplete="email"
                    placeholder="YOU@EXAMPLE.COM"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={`
                      mt-1.5
                      w-full
                      rounded-xl
                      border
                      bg-slate-50
                      px-3.5
                      py-3
                      text-sm
                      font-medium
                      text-slate-900
                      outline-none
                      transition
                      placeholder:text-[10px]
                      placeholder:font-bold
                      placeholder:tracking-wider
                      placeholder:text-slate-300
                      focus:bg-white
                      focus:ring-2
                      ${
                        errors.email
                          ? "border-rose-300 focus:border-rose-400 focus:ring-rose-500/20"
                          : "border-transparent focus:border-sky-200 focus:ring-sky-500/30"
                      }
                    `}
                  />
                  {errors.email && (
                    <p className="mt-1 flex items-center gap-1 text-[11px] font-medium text-rose-500">
                      <AlertCircle size={12} />
                      {errors.email}
                    </p>
                  )}
                </div>

                {/* LOCATION */}
                <div>
                  <label
                    className="
                      block
                      text-[9px]
                      font-extrabold
                      uppercase
                      tracking-[0.14em]
                      text-slate-400
                    "
                  >
                    Location / City
                  </label>

                  <input
                    type="text"
                    name="location"
                    autoComplete="address-level2"
                    placeholder="CITY / DISTRICT"
                    value={formData.location}
                    onChange={handleInputChange}
                    className={`
                      mt-1.5
                      w-full
                      rounded-xl
                      border
                      bg-slate-50
                      px-3.5
                      py-3
                      text-sm
                      font-medium
                      text-slate-900
                      outline-none
                      transition
                      placeholder:text-[10px]
                      placeholder:font-bold
                      placeholder:text-slate-300
                      focus:bg-white
                      focus:ring-2
                      ${
                        errors.location
                          ? "border-rose-300 focus:border-rose-400 focus:ring-rose-500/20"
                          : "border-transparent focus:border-sky-200 focus:ring-sky-500/30"
                      }
                    `}
                  />
                  {errors.location && (
                    <p className="mt-1 flex items-center gap-1 text-[11px] font-medium text-rose-500">
                      <AlertCircle size={12} />
                      {errors.location}
                    </p>
                  )}
                </div>

                {/* SITE TYPE + KW */}
                <div className="grid grid-cols-1 gap-3 min-[380px]:grid-cols-2">
                  <div>
                    <label
                      className="
                        block
                        text-[9px]
                        font-extrabold
                        uppercase
                        tracking-[0.14em]
                        text-slate-400
                      "
                    >
                      Site Type
                    </label>

                    <select
                      name="siteType"
                      value={formData.siteType}
                      onChange={handleInputChange}
                      className="
                        mt-1.5
                        w-full
                        rounded-xl
                        border
                        border-transparent
                        bg-slate-50
                        px-3
                        py-3
                        text-xs
                        font-bold
                        text-slate-900
                        outline-none
                        transition
                        focus:border-sky-200
                        focus:bg-white
                        focus:ring-2
                        focus:ring-sky-500/30
                      "
                    >
                      <option value="RESIDENTIAL">RESIDENTIAL</option>
                      <option value="COMMERCIAL">COMMERCIAL</option>
                      <option value="INDUSTRIAL">INDUSTRIAL</option>
                    </select>
                  </div>

                  <div>
                    <label
                      className="
                        block
                        text-[9px]
                        font-extrabold
                        uppercase
                        tracking-[0.14em]
                        text-slate-400
                      "
                    >
                      Required kW
                    </label>

                    <input
                      type="text"
                      name="requiredKw"
                      inputMode="decimal"
                      placeholder="E.G. 5"
                      value={formData.requiredKw}
                      onChange={handleInputChange}
                      className={`
                        mt-1.5
                        w-full
                        rounded-xl
                        border
                        bg-slate-50
                        px-3.5
                        py-3
                        text-sm
                        font-medium
                        text-slate-900
                        outline-none
                        transition
                        placeholder:text-[10px]
                        placeholder:font-bold
                        placeholder:text-slate-300
                        focus:bg-white
                        focus:ring-2
                        ${
                          errors.requiredKw
                            ? "border-rose-300 focus:border-rose-400 focus:ring-rose-500/20"
                            : "border-transparent focus:border-sky-200 focus:ring-sky-500/30"
                        }
                      `}
                    />
                    {errors.requiredKw && (
                      <p className="mt-1 flex items-center gap-1 text-[11px] font-medium text-rose-500">
                        <AlertCircle size={12} />
                        {errors.requiredKw}
                      </p>
                    )}
                  </div>
                </div>

                {/* BUTTONS */}
                <div
                  className="
                    grid
                    grid-cols-1
                    gap-2.5
                    pt-2
                    min-[380px]:grid-cols-2
                    sm:gap-3
                  "
                >
                  <button
                    type="submit"
                    className="
                      inline-flex
                      min-h-[48px]
                      items-center
                      justify-center
                      gap-2
                      rounded-2xl
                      bg-slate-800
                      px-4
                      py-3
                      text-[10px]
                      font-bold
                      uppercase
                      tracking-[0.08em]
                      text-white
                      transition
                      hover:bg-slate-900
                      active:scale-[0.98]
                    "
                  >
                    <Send size={14} />
                    Enquire via Email
                  </button>

                  <button
                    type="button"
                    onClick={handleDirectWhatsApp}
                    className="
                      inline-flex
                      min-h-[48px]
                      items-center
                      justify-center
                      gap-2
                      rounded-2xl
                      bg-emerald-500
                      px-4
                      py-3
                      text-[10px]
                      font-bold
                      uppercase
                      tracking-[0.08em]
                      text-white
                      transition
                      hover:bg-emerald-600
                      active:scale-[0.98]
                    "
                  >
                    <MessageSquare size={14} />
                    Enquire on WhatsApp
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}