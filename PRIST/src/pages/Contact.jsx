
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Phone,
  Mail,
  MapPin,
  ArrowUpRight,
  MessageCircle,
  User,
  Home,
  Zap,
  Sun,
  Building2,
  BatteryCharging,
} from "lucide-react";

import whatsappIcon from "../assets/whatsappicon.png";

// =========================================================
// RESIDENTIAL STRING INVERTER SYSTEMS
// =========================================================

const RESIDENTIAL_STRING = [
  {
    capacity: "2.32 kW",
    dcCapacity: "2.32 kWp",
    inverter: "2 kW",
    modules: 4,
    structure: "Without Structure",
    price: "₹1,71,500",
    subsidy: "₹60,000",
  },
  {
    capacity: "2.32 kW",
    dcCapacity: "2.32 kWp",
    inverter: "2 kW",
    modules: 4,
    structure: "RCC Ballast",
    price: "₹1,80,000",
    subsidy: "₹60,000",
  },
  {
    capacity: "2.32 kW",
    dcCapacity: "2.32 kWp",
    inverter: "2 kW",
    modules: 4,
    structure: "Sheet Roof - Short Rail",
    price: "₹1,74,500",
    subsidy: "₹60,000",
  },
  {
    capacity: "2.32 kW",
    dcCapacity: "2.32 kWp",
    inverter: "2 kW",
    modules: 4,
    structure: "L-Angle Without Ballast",
    price: "₹1,77,000",
    subsidy: "₹60,000",
  },
  {
    capacity: "2.32 kW",
    dcCapacity: "2.32 kWp",
    inverter: "2 kW",
    modules: 4,
    structure: "Additional Work Above RCC",
    price: "₹1,88,500",
    subsidy: "₹60,000",
  },
  {
    capacity: "2.32 kW",
    dcCapacity: "2.32 kWp",
    inverter: "2 kW",
    modules: 4,
    structure: "Additional Work Above Sheet Roof",
    price: "₹1,98,000",
    subsidy: "₹60,000",
  },

  {
    capacity: "2.90 kW",
    dcCapacity: "2.90 kWp",
    inverter: "3 kW",
    modules: 5,
    structure: "Without Structure",
    price: "₹1,96,500",
    subsidy: "₹76,200",
  },

  {
    capacity: "3.48 kW",
    dcCapacity: "3.48 kWp",
    inverter: "3 kW",
    modules: 6,
    structure: "Without Structure",
    price: "₹2,15,000",
    subsidy: "₹78,000",
  },

  {
    capacity: "4.64 kW",
    dcCapacity: "4.64 kWp",
    inverter: "4 kW",
    modules: 8,
    structure: "Without Structure",
    price: "₹2,67,000",
    subsidy: "₹78,000",
  },

  {
    capacity: "5.22 kW",
    dcCapacity: "5.22 kWp",
    inverter: "5 kW",
    modules: 9,
    structure: "Without Structure",
    price: "₹2,99,000",
    subsidy: "₹78,000",
  },

  {
    capacity: "6.38 kW",
    dcCapacity: "6.38 kWp",
    inverter: "6 kW",
    modules: 11,
    structure: "Without Structure",
    price: "₹3,76,000",
    subsidy: "₹78,000",
  },

  {
    capacity: "8.70 kW",
    dcCapacity: "8.70 kWp",
    inverter: "8 kW",
    modules: 15,
    structure: "Without Structure",
    price: "₹4,80,000",
    subsidy: "₹78,000",
  },

  {
    capacity: "9.86 kW",
    dcCapacity: "9.86 kWp",
    inverter: "10 kW",
    modules: 17,
    structure: "Without Structure",
    price: "₹5,40,000",
    subsidy: "₹78,000",
  },
];

// =========================================================
// RESIDENTIAL MICRO INVERTER SYSTEMS
// =========================================================

const RESIDENTIAL_MICRO = [
  {
    capacity: "2.24 kW",
    dcCapacity: "2.24 kWp",
    inverter: "Enphase",
    phase: "1 Phase",
    modules: 4,
    structure: "Without Structure",
    price: "₹2,50,000",
    subsidy: "₹57,600",
  },
  {
    capacity: "3.36 kW",
    dcCapacity: "3.36 kWp",
    inverter: "Enphase",
    phase: "1 Phase",
    modules: 6,
    structure: "Without Structure",
    price: "₹3,20,000",
    subsidy: "₹75,840",
  },
  {
    capacity: "5.04 kW",
    dcCapacity: "5.04 kWp",
    inverter: "Enphase",
    phase: "1 Phase",
    modules: 9,
    structure: "Without Structure",
    price: "₹4,76,000",
    subsidy: "₹78,000",
  },
  {
    capacity: "5.04 kW",
    dcCapacity: "5.04 kWp",
    inverter: "Enphase",
    phase: "3 Phase",
    modules: 9,
    structure: "Without Structure",
    price: "₹4,87,000",
    subsidy: "₹78,000",
  },
  {
    capacity: "7.84 kW",
    dcCapacity: "7.84 kWp",
    inverter: "Enphase",
    phase: "3 Phase",
    modules: 14,
    structure: "Without Structure",
    price: "₹6,83,000",
    subsidy: "₹78,000",
  },
  {
    capacity: "10.08 kW",
    dcCapacity: "10.08 kWp",
    inverter: "Enphase",
    phase: "3 Phase",
    modules: 18,
    structure: "Without Structure",
    price: "₹8,23,000",
    subsidy: "₹78,000",
  },
];

// =========================================================
// COMPONENT
// =========================================================

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    location: "",
    requirement: "",
    inverterType: "",
    capacity: "",
    structure: "",
    phase: "",
    additionalDetails: "",
    message: "",
  });

  const [error, setError] = useState("");

  // =========================================================
  // HANDLE INPUT
  // =========================================================

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => {
      let updated = {
        ...prev,
        [name]: value,
      };

      // Reset residential fields when requirement changes
      if (name === "requirement") {
        updated = {
          ...updated,
          inverterType: "",
          capacity: "",
          structure: "",
          phase: "",
        };
      }

      // Reset dependent fields when inverter type changes
      if (name === "inverterType") {
        updated = {
          ...updated,
          capacity: "",
          structure: "",
          phase: "",
        };
      }

      return updated;
    });

    setError("");
  };

  // =========================================================
  // GET SELECTED SYSTEM
  // =========================================================

  const getSelectedSystem = () => {
    if (formData.requirement !== "Residential Solar") {
      return null;
    }

    const systems =
      formData.inverterType === "String Inverter"
        ? RESIDENTIAL_STRING
        : formData.inverterType === "Micro Inverter"
        ? RESIDENTIAL_MICRO
        : [];

    return (
      systems.find(
        (item) =>
          item.capacity === formData.capacity &&
          item.structure === formData.structure &&
          (formData.inverterType === "String Inverter" ||
            item.phase === formData.phase)
      ) || null
    );
  };

  // =========================================================
  // AVAILABLE CAPACITIES
  // =========================================================

  const availableSystems =
    formData.inverterType === "String Inverter"
      ? RESIDENTIAL_STRING
      : formData.inverterType === "Micro Inverter"
      ? RESIDENTIAL_MICRO
      : [];

  const capacities = [
    ...new Set(availableSystems.map((item) => item.capacity)),
  ];

  const structureOptions = [
    ...new Set(
      availableSystems
        .filter((item) => item.capacity === formData.capacity)
        .map((item) => item.structure)
    ),
  ];

  const phaseOptions = [
    ...new Set(
      availableSystems
        .filter((item) => item.capacity === formData.capacity)
        .map((item) => item.phase)
        .filter(Boolean)
    ),
  ];

  const selectedSystem = getSelectedSystem();

  // =========================================================
  // WHATSAPP SUBMIT
  // =========================================================

  const handleWhatsApp = (e) => {
    e.preventDefault();

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

    if (formData.requirement === "Residential Solar") {
      if (!formData.inverterType) {
        setError("Please select your inverter type.");
        return;
      }

      if (!formData.capacity) {
        setError("Please select your residential capacity.");
        return;
      }

      if (formData.inverterType === "Micro Inverter" && !formData.phase) {
        setError("Please select the phase.");
        return;
      }

      if (!formData.structure) {
        setError("Please select the structure type.");
        return;
      }
    }

    const whatsappNumber = "7012694985";

    const residentialDetails =
      formData.requirement === "Residential Solar"
        ? `
*Residential Solar Details*
Inverter Type: ${formData.inverterType}
Capacity: ${formData.capacity}
Structure: ${formData.structure}
${formData.phase ? `Phase: ${formData.phase}` : ""}
${
  selectedSystem
    ? `Modules: ${selectedSystem.modules}
Offer Price: ${selectedSystem.price}
Applicable Subsidy: ${selectedSystem.subsidy}`
    : ""
}
`
        : "";

    const whatsappMessage = `
Hello Pristine Energy,

I would like to enquire about a solar solution.

*Customer Details*
Name: ${formData.name}
Phone: ${formData.phone}
Email: ${formData.email || "Not provided"}
Location: ${formData.location}

*Solar Requirement*
Requirement: ${formData.requirement}

${residentialDetails}

*Additional Details*
${formData.additionalDetails || "Not provided"}

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

  // =========================================================
  // INPUT CLASS
  // =========================================================

  const inputClass = `
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
  `;

  const selectClass = `
    w-full
    appearance-none
    rounded-xl
    border
    border-slate-200
    bg-slate-50
    py-3
    px-4
    text-sm
    text-slate-700
    outline-none
    transition
    focus:border-sky-400
    focus:bg-white
    focus:ring-4
    focus:ring-sky-100
  `;

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
      {/* =====================================================
          BACKGROUND GLOW
      ====================================================== */}

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

        {/* =====================================================
            HEADER
        ====================================================== */}

        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
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
            Tell us about your solar requirements. Fill out the form
            and continue directly to WhatsApp.
          </p>
        </motion.div>

        {/* =====================================================
            MAIN CONTENT
        ====================================================== */}

        <div className="mt-14 grid gap-7 lg:grid-cols-5">

          {/* ===================================================
              FORM
          ==================================================== */}

          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
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

            {/* FORM HEADER */}

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

              {/* =================================================
                  NAME + PHONE
              ================================================== */}

              <div className="grid gap-5 sm:grid-cols-2">

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
                      className={inputClass}
                    />
                  </div>
                </div>

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
                      className={inputClass}
                    />
                  </div>
                </div>

              </div>

              {/* =================================================
                  EMAIL + LOCATION
              ================================================== */}

              <div className="grid gap-5 sm:grid-cols-2">

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
                      className={inputClass}
                    />
                  </div>
                </div>

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
                      className={inputClass}
                    />
                  </div>
                </div>

              </div>

              {/* =================================================
                  REQUIREMENT
              ================================================== */}

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
                      z-10
                      -translate-y-1/2
                      text-slate-400
                    "
                  />

                  <select
                    name="requirement"
                    value={formData.requirement}
                    onChange={handleChange}
                    className={`${selectClass} pl-11`}
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

              {/* =================================================
                  RESIDENTIAL DETAILS
              ================================================== */}

              <AnimatePresence mode="wait">

                {formData.requirement === "Residential Solar" && (

                  <motion.div
                    initial={{
                      opacity: 0,
                      height: 0,
                      y: -15,
                    }}
                    animate={{
                      opacity: 1,
                      height: "auto",
                      y: 0,
                    }}
                    exit={{
                      opacity: 0,
                      height: 0,
                      y: -15,
                    }}
                    transition={{
                      duration: 0.4,
                    }}
                    className="overflow-hidden"
                  >

                    <div
                      className="
                        space-y-5
                        rounded-2xl
                        border
                        border-sky-100
                        bg-sky-50/60
                        p-5
                      "
                    >

                      <div className="flex items-center gap-3">
                        <div
                          className="
                            flex
                            h-10
                            w-10
                            items-center
                            justify-center
                            rounded-xl
                            bg-sky-500
                            text-white
                          "
                        >
                          <Home size={18} />
                        </div>

                        <div>
                          <h3 className="text-sm font-black text-slate-900">
                            Residential System Details
                          </h3>

                          <p className="text-xs text-slate-500">
                            Select your preferred solar configuration
                          </p>
                        </div>
                      </div>

                      {/* INVERTER TYPE */}

                      <div>
                        <label className="mb-2 block text-xs font-bold text-slate-700">
                          Inverter Type *
                        </label>

                        <select
                          name="inverterType"
                          value={formData.inverterType}
                          onChange={handleChange}
                          className={selectClass}
                        >
                          <option value="">
                            Select inverter type
                          </option>

                          <option value="String Inverter">
                            String Inverter
                          </option>

                          <option value="Micro Inverter">
                            Micro Inverter - Enphase
                          </option>
                        </select>
                      </div>

                      {/* CAPACITY */}

                      {formData.inverterType && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="grid gap-5 sm:grid-cols-2"
                        >

                          <div>
                            <label className="mb-2 block text-xs font-bold text-slate-700">
                              Solar Capacity *
                            </label>

                            <select
                              name="capacity"
                              value={formData.capacity}
                              onChange={handleChange}
                              className={selectClass}
                            >
                              <option value="">
                                Select capacity
                              </option>

                              {capacities.map((capacity) => (
                                <option
                                  key={capacity}
                                  value={capacity}
                                >
                                  {capacity}
                                </option>
                              ))}
                            </select>
                          </div>

                          {/* PHASE */}

                          {formData.inverterType === "Micro Inverter" &&
                            formData.capacity && (
                              <div>
                                <label className="mb-2 block text-xs font-bold text-slate-700">
                                  Phase *
                                </label>

                                <select
                                  name="phase"
                                  value={formData.phase}
                                  onChange={handleChange}
                                  className={selectClass}
                                >
                                  <option value="">
                                    Select phase
                                  </option>

                                  {phaseOptions.map((phase) => (
                                    <option
                                      key={phase}
                                      value={phase}
                                    >
                                      {phase}
                                    </option>
                                  ))}
                                </select>
                              </div>
                            )}

                        </motion.div>
                      )}

                      {/* STRUCTURE */}

                      {formData.capacity && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                        >
                          <label className="mb-2 block text-xs font-bold text-slate-700">
                            Structure Type *
                          </label>

                          <select
                            name="structure"
                            value={formData.structure}
                            onChange={handleChange}
                            className={selectClass}
                          >
                            <option value="">
                              Select structure type
                            </option>

                            {structureOptions.map((structure) => (
                              <option
                                key={structure}
                                value={structure}
                              >
                                {structure}
                              </option>
                            ))}
                          </select>
                        </motion.div>
                      )}

                      {/* SELECTED SYSTEM SUMMARY */}

                      {selectedSystem && (
                        <motion.div
                          initial={{
                            opacity: 0,
                            scale: 0.97,
                          }}
                          animate={{
                            opacity: 1,
                            scale: 1,
                          }}
                          className="
                            rounded-2xl
                            border
                            border-sky-200
                            bg-white
                            p-5
                            shadow-sm
                          "
                        >

                          <div className="mb-4 flex items-center gap-2">
                            <Sun
                              size={18}
                              className="text-sky-500"
                            />

                            <h4 className="text-sm font-black text-slate-900">
                              Selected System
                            </h4>
                          </div>

                          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">

                            <div>
                              <p className="text-[10px] font-bold uppercase text-slate-400">
                                Capacity
                              </p>

                              <p className="mt-1 text-sm font-black text-slate-900">
                                {selectedSystem.capacity}
                              </p>
                            </div>

                            <div>
                              <p className="text-[10px] font-bold uppercase text-slate-400">
                                Modules
                              </p>

                              <p className="mt-1 text-sm font-black text-slate-900">
                                {selectedSystem.modules}
                              </p>
                            </div>

                            <div>
                              <p className="text-[10px] font-bold uppercase text-slate-400">
                                Offer Price
                              </p>

                              <p className="mt-1 text-sm font-black text-sky-600">
                                {selectedSystem.price}
                              </p>
                            </div>

                            <div>
                              <p className="text-[10px] font-bold uppercase text-slate-400">
                                Subsidy
                              </p>

                              <p className="mt-1 text-sm font-black text-green-600">
                                {selectedSystem.subsidy}
                              </p>
                            </div>

                          </div>

                        </motion.div>
                      )}

                    </div>

                  </motion.div>
                )}

              </AnimatePresence>

              {/* =================================================
                  ADDITIONAL DETAILS
              ================================================== */}

              <div>

                <label className="mb-2 block text-xs font-bold text-slate-700">
                  Additional Details
                </label>

                <textarea
                  name="additionalDetails"
                  value={formData.additionalDetails}
                  onChange={handleChange}
                  rows="4"
                  placeholder="Example: RCC roof / Sheet roof, monthly electricity bill, preferred installation date, roof area, existing solar system, special requirements..."
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

              {/* =================================================
                  MESSAGE
              ================================================== */}

              <div>

                <label className="mb-2 block text-xs font-bold text-slate-700">
                  Additional Message
                </label>

                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows="3"
                  placeholder="Tell us anything else you'd like our solar team to know..."
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

              {/* =================================================
                  ERROR
              ================================================== */}

              <AnimatePresence>

                {error && (
                  <motion.div
                    initial={{
                      opacity: 0,
                      y: -8,
                    }}
                    animate={{
                      opacity: 1,
                      y: 0,
                    }}
                    exit={{
                      opacity: 0,
                      y: -8,
                    }}
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
                  </motion.div>
                )}

              </AnimatePresence>

              {/* =================================================
                  WHATSAPP BUTTON
              ================================================== */}

              <motion.button
                type="submit"
                whileHover={{
                  y: -3,
                }}
                whileTap={{
                  scale: 0.98,
                }}
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
                  hover:bg-[#20bd5a]
                  hover:shadow-xl
                "
              >

                <motion.div
                  animate={{
                    scale: [1, 1.08, 1],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
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
                </motion.div>

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

              </motion.button>

              <p className="text-center text-[11px] text-slate-400">
                Your selected solar system and enquiry details will
                be added automatically to the WhatsApp message.
              </p>

            </form>
          </motion.div>

          {/* =====================================================
              RIGHT SIDE
          ====================================================== */}

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
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

            <motion.div
              animate={{
                scale: [1, 1.1, 1],
                opacity: [0.15, 0.25, 0.15],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
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
                Whether you're looking to power your home, business,
                or industrial facility, our team can help you choose
                a suitable solar system.
              </p>

              {/* BENEFITS */}

              <div className="mt-8 space-y-5">

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
                      Residential Solar
                    </p>

                    <p className="text-xs text-slate-500">
                      String and Enphase micro inverter systems.
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
                    <BatteryCharging size={18} />
                  </div>

                  <div>
                    <p className="text-sm font-bold text-white">
                      Complete Solar Guidance
                    </p>

                    <p className="text-xs text-slate-500">
                      We help you select capacity and structure.
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

              {/* DIRECT CONTACT */}

              <div className="mt-9 border-t border-white/10 pt-7">

                <p
                  className="
                    text-xs
                    font-semibold
                    uppercase
                    tracking-wider
                    text-slate-500
                  "
                >
                  Direct Contact
                </p>

                <motion.a
                  whileHover={{ x: 4 }}
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
                  <Phone
                    size={17}
                    className="text-sky-400"
                  />

                  +91 90000 00000
                </motion.a>

                <motion.a
                  whileHover={{ x: 4 }}
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
                  <Mail
                    size={17}
                    className="text-sky-400"
                  />

                  hello@pristineenergys.in
                </motion.a>

              </div>

            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
