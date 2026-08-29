
import { useState } from "react";
import { motion } from "framer-motion";
import {
  Phone,
  Mail,
  MapPin,
  ArrowUpRight,
  MessageCircle,
  User,
  Home,
  Zap,
} from "lucide-react";

import whatsappIcon from "../assets/whatsappicon.png";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    location: "",
    requirement: "",
    message: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setError("");
  };

  const handleWhatsApp = (e) => {
    e.preventDefault();

    // Basic validation
    if (
      !formData.name ||
      !formData.phone ||
      !formData.location ||
      !formData.requirement
    ) {
      setError(
        "Please fill in your name, phone number, location and solar requirement."
      );
      return;
    }

    // Your WhatsApp number
    const whatsappNumber = "919000000000";

    const whatsappMessage = `
Hello Pristine Energy,

I would like to enquire about a solar solution.

*Customer Details*
Name: ${formData.name}
Phone: ${formData.phone}
Email: ${formData.email || "Not provided"}
Location: ${formData.location}

*Solar Requirement*
${formData.requirement}

*Additional Message*
${formData.message || "No additional message"}

Please contact me regarding the suitable solar system and quotation.

Thank you.
    `.trim();

    const whatsappURL = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
      whatsappMessage
    )}`;

    window.open(whatsappURL, "_blank");
  };

  return (
    <section
      id="contact"
      className="
        relative
        min-h-screen
        overflow-hidden
        bg-[#cce6ff]
        px-6
        pt-36
        pb-20
        font-['Plus_Jakarta_Sans',sans-serif]
        sm:pt-40
        sm:pb-24
      "
    >
      {/* Background Glow */}

      <div
        className="
          pointer-events-none
          absolute
          -right-40
          top-20
          h-96
          w-96
          rounded-full
          bg-sky-300/40
          blur-3xl
        "
      />

      <div
        className="
          pointer-events-none
          absolute
          -left-40
          bottom-20
          h-96
          w-96
          rounded-full
          bg-white/50
          blur-3xl
        "
      />

      <div className="relative mx-auto max-w-7xl">

        {/* ================= HEADER ================= */}

        <motion.div
          initial={{
            opacity: 0,
            y: 25,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
          }}
          transition={{
            duration: 0.6,
          }}
          className="mx-auto max-w-3xl text-center"
        >
          <span
            className="
              inline-flex
              rounded-full
              border
              border-sky-300
              bg-white/70
              px-4
              py-1.5
              text-xs
              font-bold
              uppercase
              tracking-wider
              text-sky-700
              backdrop-blur
            "
          >
            Contact Pristine Energy
          </span>

          <h1
            className="
              mt-5
              text-4xl
              font-black
              tracking-tight
              text-slate-900
              sm:text-5xl
              lg:text-6xl
            "
          >
            Let's Build a
            <span className="text-sky-500">
              {" "}Cleaner Future.
            </span>
          </h1>

          <p
            className="
              mx-auto
              mt-5
              max-w-2xl
              text-sm
              leading-7
              text-slate-600
              sm:text-base
            "
          >
            Tell us about your solar requirements. Fill out the form and
            continue directly to WhatsApp.
          </p>
        </motion.div>

        {/* ================= MAIN CONTENT ================= */}

        <div className="mt-14 grid gap-7 lg:grid-cols-5">

          {/* ================= FORM ================= */}

          <motion.div
            initial={{
              opacity: 0,
              x: -30,
            }}
            whileInView={{
              opacity: 1,
              x: 0,
            }}
            viewport={{
              once: true,
            }}
            transition={{
              duration: 0.6,
            }}
            className="
              rounded-3xl
              border
              border-white/70
              bg-white/90
              p-7
              shadow-xl
              shadow-sky-900/5
              backdrop-blur
              lg:col-span-3
              sm:p-9
            "
          >

            {/* Form Header */}

            <div className="mb-7">
              <div className="flex items-center gap-3">

                <div
                  className="
                    flex
                    h-12
                    w-12
                    items-center
                    justify-center
                    rounded-2xl
                    bg-sky-500
                    text-white
                  "
                >
                  <MessageCircle size={22} />
                </div>

                <div>
                  <h2 className="text-xl font-bold text-slate-900">
                    Solar Enquiry
                  </h2>

                  <p className="text-xs text-slate-500">
                    Tell us what you need
                  </p>
                </div>

              </div>
            </div>

            <form
              onSubmit={handleWhatsApp}
              className="space-y-5"
            >

              {/* Name + Phone */}

              <div className="grid gap-5 sm:grid-cols-2">

                {/* Name */}

                <div>
                  <label className="mb-2 block text-xs font-bold text-slate-700">
                    Full Name *
                  </label>

                  <div className="relative">

                    <User
                      size={17}
                      className="
                        absolute
                        left-4
                        top-1/2
                        -translate-y-1/2
                        text-slate-400
                      "
                    />

                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Enter your name"
                      className="
                        w-full
                        rounded-xl
                        border
                        border-slate-200
                        bg-slate-50
                        py-3
                        pl-11
                        pr-4
                        text-sm
                        text-slate-800
                        outline-none
                        transition
                        placeholder:text-slate-400
                        focus:border-sky-400
                        focus:bg-white
                        focus:ring-4
                        focus:ring-sky-100
                      "
                    />

                  </div>
                </div>

                {/* Phone */}

                <div>
                  <label className="mb-2 block text-xs font-bold text-slate-700">
                    Phone Number *
                  </label>

                  <div className="relative">

                    <Phone
                      size={17}
                      className="
                        absolute
                        left-4
                        top-1/2
                        -translate-y-1/2
                        text-slate-400
                      "
                    />

                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+91 XXXXX XXXXX"
                      className="
                        w-full
                        rounded-xl
                        border
                        border-slate-200
                        bg-slate-50
                        py-3
                        pl-11
                        pr-4
                        text-sm
                        text-slate-800
                        outline-none
                        transition
                        placeholder:text-slate-400
                        focus:border-sky-400
                        focus:bg-white
                        focus:ring-4
                        focus:ring-sky-100
                      "
                    />

                  </div>
                </div>

              </div>

              {/* Email + Location */}

              <div className="grid gap-5 sm:grid-cols-2">

                {/* Email */}

                <div>
                  <label className="mb-2 block text-xs font-bold text-slate-700">
                    Email
                  </label>

                  <div className="relative">

                    <Mail
                      size={17}
                      className="
                        absolute
                        left-4
                        top-1/2
                        -translate-y-1/2
                        text-slate-400
                      "
                    />

                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="your@email.com"
                      className="
                        w-full
                        rounded-xl
                        border
                        border-slate-200
                        bg-slate-50
                        py-3
                        pl-11
                        pr-4
                        text-sm
                        text-slate-800
                        outline-none
                        transition
                        placeholder:text-slate-400
                        focus:border-sky-400
                        focus:bg-white
                        focus:ring-4
                        focus:ring-sky-100
                      "
                    />

                  </div>
                </div>

                {/* Location */}

                <div>
                  <label className="mb-2 block text-xs font-bold text-slate-700">
                    Location *
                  </label>

                  <div className="relative">

                    <MapPin
                      size={17}
                      className="
                        absolute
                        left-4
                        top-1/2
                        -translate-y-1/2
                        text-slate-400
                      "
                    />

                    <input
                      type="text"
                      name="location"
                      value={formData.location}
                      onChange={handleChange}
                      placeholder="City / District"
                      className="
                        w-full
                        rounded-xl
                        border
                        border-slate-200
                        bg-slate-50
                        py-3
                        pl-11
                        pr-4
                        text-sm
                        text-slate-800
                        outline-none
                        transition
                        placeholder:text-slate-400
                        focus:border-sky-400
                        focus:bg-white
                        focus:ring-4
                        focus:ring-sky-100
                      "
                    />

                  </div>
                </div>

              </div>

              {/* Solar Requirement */}

              <div>
                <label className="mb-2 block text-xs font-bold text-slate-700">
                  Solar Requirement *
                </label>

                <div className="relative">

                  <Zap
                    size={17}
                    className="
                      pointer-events-none
                      absolute
                      left-4
                      top-1/2
                      -translate-y-1/2
                      text-slate-400
                    "
                  />

                  <select
                    name="requirement"
                    value={formData.requirement}
                    onChange={handleChange}
                    className="
                      w-full
                      appearance-none
                      rounded-xl
                      border
                      border-slate-200
                      bg-slate-50
                      py-3
                      pl-11
                      pr-4
                      text-sm
                      text-slate-700
                      outline-none
                      transition
                      focus:border-sky-400
                      focus:bg-white
                      focus:ring-4
                      focus:ring-sky-100
                    "
                  >
                    <option value="">
                      Select your requirement
                    </option>

                    <option value="Residential Solar">
                      Residential Solar
                    </option>

                    <option value="Commercial Solar">
                      Commercial Solar
                    </option>

                    <option value="Industrial Solar">
                      Industrial Solar
                    </option>

                    <option value="Battery Storage">
                      Battery Storage
                    </option>

                    <option value="Solar Maintenance">
                      Solar Maintenance
                    </option>

                    <option value="Not Sure - Need Consultation">
                      Not Sure - Need Consultation
                    </option>
                  </select>

                </div>
              </div>

              {/* Message */}

              <div>
                <label className="mb-2 block text-xs font-bold text-slate-700">
                  Additional Message
                </label>

                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows="4"
                  placeholder="Tell us about your electricity usage, roof, required capacity, etc."
                  className="
                    w-full
                    resize-none
                    rounded-xl
                    border
                    border-slate-200
                    bg-slate-50
                    px-4
                    py-3
                    text-sm
                    text-slate-800
                    outline-none
                    transition
                    placeholder:text-slate-400
                    focus:border-sky-400
                    focus:bg-white
                    focus:ring-4
                    focus:ring-sky-100
                  "
                />
              </div>

              {/* Error */}

              {error && (
                <div
                  className="
                    rounded-xl
                    border
                    border-red-200
                    bg-red-50
                    px-4
                    py-3
                    text-xs
                    font-semibold
                    text-red-600
                  "
                >
                  {error}
                </div>
              )}

              {/* WhatsApp Button */}

              <button
                type="submit"
                className="
                  group
                  flex
                  w-full
                  items-center
                  justify-center
                  gap-3
                  rounded-2xl
                  bg-[#25D366]
                  px-6
                  py-4
                  text-sm
                  font-black
                  text-white
                  shadow-lg
                  shadow-green-500/20
                  transition
                  duration-300
                  hover:-translate-y-1
                  hover:bg-[#20bd5a]
                  hover:shadow-xl
                "
              >

                <div
                  className="
                    flex
                    h-9
                    w-9
                    items-center
                    justify-center
                    overflow-hidden
                    rounded-full
                    bg-white
                  "
                >
                  <img
                    src={whatsappIcon}
                    alt="WhatsApp"
                    className="
                      h-8
                      w-8
                      rounded-full
                      object-contain
                    "
                  />
                </div>

                <span>
                  Continue to WhatsApp
                </span>

                <ArrowUpRight
                  size={18}
                  className="
                    transition
                    group-hover:translate-x-1
                    group-hover:-translate-y-1
                  "
                />

              </button>

              <p className="text-center text-[11px] text-slate-400">
                Your enquiry details will be added automatically to the
                WhatsApp message.
              </p>

            </form>
          </motion.div>

          {/* ================= RIGHT SIDE ================= */}

          <motion.div
            initial={{
              opacity: 0,
              x: 30,
            }}
            whileInView={{
              opacity: 1,
              x: 0,
            }}
            viewport={{
              once: true,
            }}
            transition={{
              duration: 0.6,
            }}
            className="
              relative
              overflow-hidden
              rounded-3xl
              bg-[#071933]
              p-8
              text-white
              shadow-2xl
              shadow-slate-900/20
              lg:col-span-2
              sm:p-10
            "
          >

            {/* Glow */}

            <div
              className="
                pointer-events-none
                absolute
                -right-24
                -top-24
                h-72
                w-72
                rounded-full
                bg-sky-500/20
                blur-3xl
              "
            />

            <div className="relative">

              <span
                className="
                  inline-flex
                  rounded-full
                  border
                  border-sky-400/20
                  bg-sky-400/10
                  px-4
                  py-1.5
                  text-xs
                  font-bold
                  uppercase
                  tracking-wider
                  text-sky-300
                "
              >
                Why Contact Us?
              </span>

              <h2
                className="
                  mt-6
                  text-3xl
                  font-black
                  tracking-tight
                  sm:text-4xl
                "
              >
                Let's Find the Right
                <span className="text-sky-400">
                  {" "}Solar Solution.
                </span>
              </h2>

              <p className="mt-4 text-sm leading-7 text-slate-400">
                Whether you're looking to power your home, business, or
                industrial facility, our team can help you choose a suitable
                solar system.
              </p>

              {/* Benefits */}

              <div className="mt-8 space-y-4">

                <div className="flex items-center gap-3">

                  <div
                    className="
                      flex
                      h-10
                      w-10
                      items-center
                      justify-center
                      rounded-xl
                      bg-sky-500/10
                      text-sky-400
                    "
                  >
                    <Home size={18} />
                  </div>

                  <div>
                    <p className="text-sm font-bold text-white">
                      Home & Business Solutions
                    </p>

                    <p className="text-xs text-slate-500">
                      Systems designed around your energy needs.
                    </p>
                  </div>

                </div>

                <div className="flex items-center gap-3">

                  <div
                    className="
                      flex
                      h-10
                      w-10
                      items-center
                      justify-center
                      rounded-xl
                      bg-sky-500/10
                      text-sky-400
                    "
                  >
                    <Zap size={18} />
                  </div>

                  <div>
                    <p className="text-sm font-bold text-white">
                      Efficient Solar Systems
                    </p>

                    <p className="text-xs text-slate-500">
                      High-performance solar technology.
                    </p>
                  </div>

                </div>

                <div className="flex items-center gap-3">

                  <div
                    className="
                      flex
                      h-10
                      w-10
                      items-center
                      justify-center
                      rounded-xl
                      bg-sky-500/10
                      text-sky-400
                    "
                  >
                    <MessageCircle size={18} />
                  </div>

                  <div>
                    <p className="text-sm font-bold text-white">
                      Quick WhatsApp Support
                    </p>

                    <p className="text-xs text-slate-500">
                      Talk directly with our solar team.
                    </p>
                  </div>

                </div>

              </div>

              {/* Direct Contact */}

              <div className="mt-9 border-t border-white/10 pt-7">

                <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Direct Contact
                </p>

                <a
                  href="tel:+919000000000"
                  className="
                    mt-4
                    flex
                    items-center
                    gap-3
                    text-sm
                    font-bold
                    text-white
                    transition
                    hover:text-sky-400
                  "
                >
                  <Phone size={17} className="text-sky-400" />
                  +91 90000 00000
                </a>

                <a
                  href="mailto:hello@pristineenergys.in"
                  className="
                    mt-3
                    flex
                    items-center
                    gap-3
                    text-sm
                    font-bold
                    text-white
                    transition
                    hover:text-sky-400
                  "
                >
                  <Mail size={17} className="text-sky-400" />
                  hello@pristineenergys.in
                </a>

              </div>

            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
}

