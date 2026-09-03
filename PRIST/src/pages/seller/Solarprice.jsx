import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";

// ============================================================
// CONSTANTS & HELPERS
// ============================================================

const API_BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5000";
const API_URL = `${API_BASE_URL}/api/solar-products`;
const PRODUCT_SYNC_CHANNEL = "solar_products_sync";
const PRODUCT_SYNC_STORAGE_KEY = "solar_product_last_added";

const getAuthToken = () => {
  return (
    localStorage.getItem("token") ||
    localStorage.getItem("authToken") ||
    localStorage.getItem("accessToken") ||
    sessionStorage.getItem("token") ||
    sessionStorage.getItem("authToken") ||
    sessionStorage.getItem("accessToken") ||
    null
  );
};

const STRUCTURE_TYPES = [
  "Without Structure",
  "RCC Ballast",
  "Sheetroof - Shortrail",
  "L- Angle Without Ballast",
  "Additional Work Above RCC",
  "Additional Work Above Sheet Roof",
  "Table Type Structure",
];

const INITIAL_STRUCTURE = {
  structure: "Without Structure",
  type: "Without Structure",
  maxSellingPrice: "",
  specialOffer: 0,
  offerPrice: "",
  subsidy: 0,
};

const EMPTY_FORM = {
  productName: "",
  systemType: "String Inverter",
  moduleCount: "",
  moduleWattage: "",
  dcCapacity: "",
  inverterCapacity: "",
  inverterCapacity2: "",
  batteryCapacity: "",
  phase: "1",
  gstRate: "8.9",
  currency: "INR",
  status: true,
  structures: [{ ...INITIAL_STRUCTURE }],
};

const REQUIRED_FIELDS = [
  "productName",
  "systemType",
  "moduleCount",
  "moduleWattage",
  "dcCapacity",
  "inverterCapacity",
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.5, staggerChildren: 0.08 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: "easeOut" },
  },
};

const structureVariants = {
  hidden: { opacity: 0, scale: 0.98, y: 12 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { type: "spring", damping: 22, stiffness: 200 },
  },
  exit: {
    opacity: 0,
    scale: 0.95,
    y: -8,
    transition: { duration: 0.2 },
  },
};

function AnimatedNumber({ value, prefix = "" }) {
  const numericValue = Number(value || 0);
  const [display, setDisplay] = useState(numericValue);

  useEffect(() => {
    const start = display;
    const end = numericValue;
    if (start === end) return;

    const duration = 350;
    const startTime = performance.now();
    let raf;

    const tick = (now) => {
      const t = Math.min(1, (now - startTime) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      setDisplay(Math.round(start + (end - start) * eased));
      if (t < 1) raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [numericValue]);

  return (
    <span>
      {prefix}
      {display.toLocaleString("en-IN")}
    </span>
  );
}

function Toast({ toast, onDone }) {
  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(onDone, 3200);
    return () => clearTimeout(timer);
  }, [toast, onDone]);

  return (
    <div className="pointer-events-none fixed inset-x-0 top-6 z-50 flex justify-center px-4">
      <AnimatePresence>
        {toast && (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, y: -24, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -16, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 350, damping: 25 }}
            className={`pointer-events-auto flex items-center gap-3 rounded-xl px-5 py-3 shadow-2xl backdrop-blur-md ${toast.type === "error"
                ? "border border-red-400/40 bg-red-600/90 text-white"
                : "border border-emerald-400/40 bg-emerald-600/90 text-white"
              }`}
          >
            <span className="flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-white/20 text-xs font-bold">
              {toast.type === "error" ? "!" : "✓"}
            </span>
            <span className="text-xs font-semibold sm:text-sm">{toast.message}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ============================================================
// FORM FIELDS
// ============================================================

function Input({
  label,
  name,
  type = "text",
  value,
  onChange,
  placeholder,
  required = false,
  step,
  min,
}) {
  return (
    <div className="flex flex-col space-y-1.5">
      <label className="text-xs font-medium text-white/90">{label}</label>
      <motion.input
        whileFocus={{ scale: 1.005 }}
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        step={step}
        min={min !== undefined ? min : type === "number" ? "0" : undefined}
        className="h-10 w-full rounded-lg border border-white/30 bg-white px-3.5 text-xs text-gray-800 shadow-sm placeholder:text-gray-400 focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-400/40"
      />
    </div>
  );
}

function Select({
  label,
  name,
  value,
  onChange,
  options,
  required = false,
}) {
  return (
    <div className="flex flex-col space-y-1.5">
      <label className="text-xs font-medium text-white/90">{label}</label>
      <motion.select
        whileFocus={{ scale: 1.005 }}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        className="h-10 w-full rounded-lg border border-white/30 bg-white px-3.5 text-xs text-gray-800 shadow-sm focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-400/40"
      >
        {options.map(([optionValue, text]) => (
          <option key={optionValue} value={optionValue}>
            {text}
          </option>
        ))}
      </motion.select>
    </div>
  );
}

// ============================================================
// MAIN COMPONENT
// ============================================================

export default function AddSolarProduct() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    ...EMPTY_FORM,
    structures: [{ ...INITIAL_STRUCTURE }],
  });
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(null);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleStructureChange = (index, e) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      const structures = [...prev.structures];
      const updatedStructure = { ...structures[index], [name]: value };

      // Keep both structure and type in sync for legacy & dashboard compatibility
      if (name === "structure" || name === "type") {
        updatedStructure.structure = value;
        updatedStructure.type = value;
      }

      structures[index] = updatedStructure;
      return { ...prev, structures };
    });
  };

  const addStructure = () => {
    setFormData((prev) => ({
      ...prev,
      structures: [...prev.structures, { ...INITIAL_STRUCTURE }],
    }));
  };

  const removeStructure = (index) => {
    if (formData.structures.length === 1) return;
    setFormData((prev) => ({
      ...prev,
      structures: prev.structures.filter((_, i) => i !== index),
    }));
  };

  const showToast = (type, message) => setToast({ id: Date.now(), type, message });

  const resetForm = () => {
    setFormData({
      ...EMPTY_FORM,
      structures: [{ ...INITIAL_STRUCTURE }],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;

    const token = getAuthToken();
    if (!token) {
      showToast("error", "Authentication required. Please login again.");
      setTimeout(() => (window.location.href = "/login"), 1200);
      return;
    }

    // Required fields check
    const missing = REQUIRED_FIELDS.filter(
      (field) => String(formData[field] ?? "").trim() === ""
    );
    if (missing.length > 0) {
      showToast("error", "Please fill all mandatory system specifications.");
      return;
    }

    // Hybrid battery check
    if (formData.systemType === "Hybrid" && !String(formData.batteryCapacity || "").trim()) {
      showToast("error", "Battery capacity is required for Hybrid systems.");
      return;
    }

    // Validate structure pricing
    const invalidStructure = formData.structures.some(
      (s) =>
        String(s.maxSellingPrice ?? "").trim() === "" ||
        String(s.offerPrice ?? "").trim() === ""
    );
    if (invalidStructure) {
      showToast("error", "Please enter Max Selling Price and Offer Price for every structure.");
      return;
    }

    // Synchronize both sets of property names for seamless dashboard & API support
    const payload = {
      productName: formData.productName.trim(),
      systemType: formData.systemType,
      moduleCount: Number(formData.moduleCount),
      moduleWattage: Number(formData.moduleWattage),
      dcCapacity: Number(formData.dcCapacity),
      inverterCapacity: Number(formData.inverterCapacity),
      inverterCapacity2: formData.inverterCapacity2 ? Number(formData.inverterCapacity2) : null,
      batteryCapacity: formData.batteryCapacity ? Number(formData.batteryCapacity) : null,
      phase: Number(formData.phase),
      structures: formData.structures.map((s) => ({
        structure: s.structure || s.type,
        type: s.type || s.structure,
        maxPrice: Number(s.maxSellingPrice),
        maxSellingPrice: Number(s.maxSellingPrice),
        msp: Number(s.maxSellingPrice),
        offer: Number(s.offerPrice),
        offerPrice: Number(s.offerPrice),
        specialOffer: s.specialOffer === "" ? 0 : Number(s.specialOffer),
        subsidy: s.subsidy === "" ? 0 : Number(s.subsidy),
      })),
      gstRate: formData.gstRate === "" ? 8.9 : Number(formData.gstRate),
      currency: formData.currency,
      status: Boolean(formData.status),
    };

    try {
      setLoading(true);
      const res = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json().catch(() => ({}));
      if (res.status === 401) {
        showToast("error", "Your session has expired. Please login again.");
        setTimeout(() => (window.location.href = "/login"), 1400);
        return;
      }
      if (!res.ok) throw new Error(data?.message || "Failed to create solar product.");

      showToast("success", "Solar product created successfully!");
      resetForm();
      if (typeof BroadcastChannel !== "undefined") {
        const channel = new BroadcastChannel(PRODUCT_SYNC_CHANNEL);
        channel.postMessage("PRODUCT_ADDED");
        channel.close();
      }
      localStorage.setItem(
        PRODUCT_SYNC_STORAGE_KEY,
        String(Date.now())
      );
      setTimeout(() => navigate("/dashboard"), 1500);
    } catch (err) {
      showToast("error", err.message || "Unable to connect to backend server.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative flex min-h-screen w-full items-center justify-center bg-[#549bf8] p-4 sm:p-6 lg:p-8 font-sans">
      <Toast toast={toast} onDone={() => setToast(null)} />

      <motion.div
        initial={{ opacity: 0, scale: 0.98, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="relative my-6 w-full max-w-5xl rounded-3xl border border-white/20 bg-gradient-to-br from-[#0d4ea6] via-[#1162cc] to-[#0a3578] p-6 text-white shadow-2xl sm:p-10"
      >
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="relative z-10 space-y-8"
        >
          {/* Header Section */}
          <motion.div variants={itemVariants} className="border-b border-white/15 pb-6">
            <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
              <motion.button
                type="button"
                onClick={() => navigate("/dashboard")}
                whileHover={{ x: -2 }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-1.5 rounded-lg border border-white/20 bg-white/10 px-3.5 py-2 text-xs font-semibold text-white shadow-sm backdrop-blur-md transition-colors hover:bg-white/20"
              >
                <span>←</span>
                <span>Back to Dashboard</span>
              </motion.button>

              <span className="rounded-full border border-sky-300/40 bg-sky-400/20 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-sky-200">
                Seller Panel
              </span>
            </div>

            <h1 className="text-2xl font-extrabold tracking-tight text-white sm:text-3xl">
              Add Solar Product
            </h1>
            <p className="mt-1 text-xs font-light text-white/80 sm:text-sm">
              Configure system specifications, tax policies, and structure pricing matrix.
            </p>
          </motion.div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Section 1: Product Information */}
            <motion.div
              variants={itemVariants}
              className="rounded-2xl border border-white/20 bg-white/10 p-5 shadow-lg backdrop-blur-xl sm:p-7"
            >
              <div className="mb-5">
                <h2 className="text-sm font-bold uppercase tracking-wider text-white">
                  Product Information
                </h2>
                <p className="text-xs text-sky-100/70">
                  Enter baseline product details and operational status.
                </p>
              </div>

              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                <div className="sm:col-span-2 lg:col-span-1">
                  <Input
                    label="Product Name *"
                    name="productName"
                    value={formData.productName}
                    onChange={handleChange}
                    placeholder="e.g. 5kW Solar System"
                    required
                  />
                </div>

                <Select
                  label="System Type *"
                  name="systemType"
                  value={formData.systemType}
                  onChange={handleChange}
                  options={[
                    ["String Inverter", "String Inverter"],
                    ["Micro Inverter", "Micro Inverter"],
                    ["Hybrid", "Hybrid"],
                    ["C&I", "C&I"],
                  ]}
                  required
                />

                <Select
                  label="Phase *"
                  name="phase"
                  value={formData.phase}
                  onChange={handleChange}
                  options={[
                    ["1", "1 Phase"],
                    ["3", "3 Phase"],
                  ]}
                  required
                />

                <Input
                  label="GST Rate (%)"
                  name="gstRate"
                  type="number"
                  step="0.1"
                  value={formData.gstRate}
                  onChange={handleChange}
                  placeholder="8.9"
                />

                <Select
                  label="Currency"
                  name="currency"
                  value={formData.currency}
                  onChange={handleChange}
                  options={[
                    ["INR", "INR - Indian Rupee"],
                    ["USD", "USD - US Dollar"],
                  ]}
                />

                <div className="flex flex-col space-y-1.5 justify-end">
                  <label className="text-xs font-medium text-transparent select-none hidden sm:block">
                    Status
                  </label>
                  <label className="flex h-10 cursor-pointer items-center gap-2.5 rounded-lg border border-white/20 bg-white/10 px-3.5 text-xs font-medium text-white transition hover:bg-white/15">
                    <input
                      type="checkbox"
                      name="status"
                      checked={formData.status}
                      onChange={handleChange}
                      className="h-4 w-4 rounded border-white/40 accent-[#0d4ea6]"
                    />
                    <span>Product Active</span>
                  </label>
                </div>
              </div>
            </motion.div>

            {/* Section 2: System Specifications */}
            <motion.div
              variants={itemVariants}
              className="rounded-2xl border border-white/20 bg-white/10 p-5 shadow-lg backdrop-blur-xl sm:p-7"
            >
              <div className="mb-5">
                <h2 className="text-sm font-bold uppercase tracking-wider text-white">
                  System Specifications
                </h2>
                <p className="text-xs text-sky-100/70">
                  Technical module, capacity, and inverter thresholds.
                </p>
              </div>

              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                <Input
                  label="Module Count *"
                  name="moduleCount"
                  type="number"
                  min="1"
                  value={formData.moduleCount}
                  onChange={handleChange}
                  placeholder="10"
                  required
                />

                <Input
                  label="Module Wattage (W) *"
                  name="moduleWattage"
                  type="number"
                  value={formData.moduleWattage}
                  onChange={handleChange}
                  placeholder="540"
                  required
                />

                <Input
                  label="DC Capacity (kW) *"
                  name="dcCapacity"
                  type="number"
                  step="0.01"
                  value={formData.dcCapacity}
                  onChange={handleChange}
                  placeholder="5.40"
                  required
                />

                <Input
                  label="Inverter Capacity (kW) *"
                  name="inverterCapacity"
                  type="number"
                  step="0.01"
                  value={formData.inverterCapacity}
                  onChange={handleChange}
                  placeholder="5.0"
                  required
                />

                <Input
                  label="Inverter Capacity 2 (kW)"
                  name="inverterCapacity2"
                  type="number"
                  step="0.01"
                  value={formData.inverterCapacity2}
                  onChange={handleChange}
                  placeholder="Optional"
                />

                {formData.systemType === "Hybrid" && (
                  <Input
                    label="Battery Capacity (kWh) *"
                    name="batteryCapacity"
                    type="number"
                    step="0.01"
                    value={formData.batteryCapacity}
                    onChange={handleChange}
                    placeholder="10.0"
                    required
                  />
                )}
              </div>
            </motion.div>

            {/* Section 3: Structure & Pricing */}
            <motion.div
              variants={itemVariants}
              className="rounded-2xl border border-white/20 bg-white/10 p-5 shadow-lg backdrop-blur-xl sm:p-7"
            >
              <div className="mb-5 flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
                <div>
                  <h2 className="text-sm font-bold uppercase tracking-wider text-white">
                    Structure & Pricing
                  </h2>
                  <p className="text-xs text-sky-100/70">
                    Mounting framework options with subsidy and net calculations.
                  </p>
                </div>

                <motion.button
                  type="button"
                  onClick={addStructure}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="inline-flex items-center justify-center gap-1.5 self-start rounded-lg border border-white/20 bg-[#0d2f60] px-3.5 py-2 text-xs font-semibold text-white shadow transition hover:bg-[#092247] sm:self-auto"
                >
                  <span className="text-sm leading-none">+</span>
                  <span>Add Structure</span>
                </motion.button>
              </div>

              <div className="space-y-4">
                <AnimatePresence mode="popLayout">
                  {formData.structures.map((structure, index) => {
                    const net =
                      Number(structure.offerPrice || 0) - Number(structure.subsidy || 0);

                    return (
                      <motion.div
                        key={index}
                        layout
                        variants={structureVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        className="relative rounded-xl border border-white/20 bg-black/20 p-4 sm:p-5 shadow-inner"
                      >
                        <div className="mb-4 flex items-center justify-between border-b border-white/10 pb-3">
                          <div className="flex items-center gap-2">
                            <span className="rounded bg-sky-400/20 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-sky-300">
                              Option #{index + 1}
                            </span>
                            <span className="text-xs font-medium text-white/90">
                              Mounting & Pricing Terms
                            </span>
                          </div>

                          {formData.structures.length > 1 && (
                            <button
                              type="button"
                              onClick={() => removeStructure(index)}
                              className="rounded border border-red-400/30 bg-red-500/20 px-2.5 py-1 text-[11px] font-semibold text-red-200 transition hover:bg-red-500/40"
                            >
                              Remove
                            </button>
                          )}
                        </div>

                        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                          <div className="sm:col-span-2 lg:col-span-3">
                            <Select
                              label="Structure Type *"
                              name="structure"
                              value={structure.structure || structure.type}
                              onChange={(e) => handleStructureChange(index, e)}
                              options={STRUCTURE_TYPES.map((t) => [t, t])}
                              required
                            />
                          </div>

                          <Input
                            label="Max Selling Price (₹) *"
                            name="maxSellingPrice"
                            type="number"
                            value={structure.maxSellingPrice}
                            onChange={(e) => handleStructureChange(index, e)}
                            placeholder="150000"
                            required
                          />

                          <Input
                            label="Special Offer (₹)"
                            name="specialOffer"
                            type="number"
                            value={structure.specialOffer}
                            onChange={(e) => handleStructureChange(index, e)}
                            placeholder="10000"
                          />

                          <Input
                            label="Offer Price (₹) *"
                            name="offerPrice"
                            type="number"
                            value={structure.offerPrice}
                            onChange={(e) => handleStructureChange(index, e)}
                            placeholder="140000"
                            required
                          />

                          <Input
                            label="Subsidy (₹)"
                            name="subsidy"
                            type="number"
                            value={structure.subsidy}
                            onChange={(e) => handleStructureChange(index, e)}
                            placeholder="78000"
                          />
                        </div>

                        {structure.offerPrice !== "" && (
                          <div className="mt-4 flex items-baseline justify-between rounded-lg border border-sky-400/30 bg-sky-950/40 px-4 py-2.5 text-xs">
                            <span className="font-medium text-sky-200">
                              Estimated Net Customer Price:
                            </span>
                            <span className="text-sm font-bold text-sky-300">
                              <AnimatedNumber
                                value={Math.max(net, 0)}
                                prefix="₹"
                              />
                            </span>
                          </div>
                        )}
                      </motion.div>
                    );
                  })}
                </AnimatePresence>
              </div>
            </motion.div>

            {/* Actions */}
            <motion.div
              variants={itemVariants}
              className="flex flex-col-reverse gap-3 pt-2 sm:flex-row sm:justify-end"
            >
              <button
                type="button"
                onClick={resetForm}
                disabled={loading}
                className="h-10 rounded-lg border border-white/20 bg-white/10 px-6 text-xs font-semibold text-white transition hover:bg-white/20 disabled:opacity-50"
              >
                Reset
              </button>

              <button
                type="submit"
                disabled={loading}
                className="inline-flex h-10 min-w-[170px] items-center justify-center rounded-lg border border-white/15 bg-[#0d2f60] px-8 text-xs font-bold text-white shadow-lg transition hover:bg-[#092247] disabled:opacity-60"
              >
                {loading ? "Saving..." : "Add Solar Product"}
              </button>
            </motion.div>
          </form>
        </motion.div>
      </motion.div>
    </div>
  );
}