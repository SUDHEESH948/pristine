import React, { useMemo, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { SOLAR_PRODUCTS_API } from "../api/api";

import {
  Search,
  SlidersHorizontal,
  ChevronDown,
  X,
  Zap,
  BatteryCharging,
  Sun,
  ShieldCheck,
  Wrench,
  ArrowRight,
  CheckCircle2,
  Filter,
  Layers,
  Cpu,
  Boxes,
} from "lucide-react";

// =========================================================
// BRAND CONFIG & CONSTANTS
// =========================================================

const PRIMARY = "#0284c7";
const DISPLAY_FONT =
  "'Archivo Expanded', 'Plus Jakarta Sans', system-ui, sans-serif";

const money = (value) => `₹${Number(value || 0).toLocaleString("en-IN")}`;

// =========================================================
// BACKEND DATA NORMALIZATION
// =========================================================

const getCategoryMetadata = (systemType) => {
  const name = String(systemType || "Solar Systems").trim();
  const value = name.toLowerCase();

  return {
    title: name,
    short: name,
    description: `${name} systems and pricing from our current catalog.`,
    icon: value.includes("hybrid")
      ? BatteryCharging
      : value.includes("micro")
        ? Zap
        : value.includes("commercial") ||
          value.includes("industrial") ||
          value.includes("c&i")
          ? Boxes
          : Sun,
  };
};

const normalizeBackendPricing = (products = []) => {
  const pricing = {};

  if (!Array.isArray(products)) {
    return pricing;
  }

  products.forEach((product) => {
    const category = String(product.systemType || "").trim();
    if (!category || !Array.isArray(product.structures)) return;

    if (!pricing[category]) pricing[category] = [];

    product.structures.forEach((structure, index) => {
      const max = Number(
        structure.maxSellingPrice ?? structure.maxPrice ?? structure.msp ?? 0
      );
      const price = Number(
        structure.offerPrice ?? structure.price ?? structure.offer ?? 0
      );

      pricing[category].push({
        id: product._id || `${product.productName}-${index}`,
        product: product.productName || "Solar System",
        systemType: category,
        modules: Number(product.moduleCount || 0),
        moduleWattage: Number(product.moduleWattage || 0),
        dc: Number(product.dcCapacity || 0),
        inverter: Number(product.inverterCapacity || 0),
        inverter2: Number(product.inverterCapacity2 || 0),
        battery: product.batteryCapacity == null
          ? null
          : Number(product.batteryCapacity),
        phase: Number(product.phase || 0),
        structure: structure.type || structure.structure || "Without Structure",
        max,
        offer: Math.max(0, max - price),
        price,
        subsidy: Number(structure.subsidy || 0),
        gstRate: Number(product.gstRate || 0),
        currency: product.currency || "INR",
        status: product.status !== false,
      });
    });
  });

  return pricing;
};

// =========================================================
// MAIN COMPONENT
// =========================================================

export default function Pricing() {
  const navigate = useNavigate();

  const [category, setCategory] = useState("");
  const [search, setSearch] = useState("");
  const [structure, setStructure] = useState("All");
  const [phase, setPhase] = useState("All");
  const [selectedItem, setSelectedItem] = useState(null);
  const [pricingData, setPricingData] = useState({});

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [monthlyBill, setMonthlyBill] = useState(5000);

  // Compute tabs dynamically based on items populated by the backend
  const categoryTabs = useMemo(() => {
    const categoryIds = Object.keys(pricingData).filter(
      (catId) => (pricingData[catId] || []).length > 0
    );

    return categoryIds.map((id) => ({
      id,
      ...getCategoryMetadata(id),
    }));
  }, [pricingData]);

  // Ensure active category is valid when tabs change
  useEffect(() => {
    if (
      categoryTabs.length > 0 &&
      !categoryTabs.some((item) => item.id === category)
    ) {
      setCategory(categoryTabs[0].id);
    }
  }, [categoryTabs, category]);

  // Load backend catalog
  useEffect(() => {
    let cancelled = false;

    const loadPricing = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(SOLAR_PRODUCTS_API);

        if (!response.ok) {
          throw new Error(`Server returned HTTP ${response.status}`);
        }

        const data = await response.json();

        if (!data.success) {
          throw new Error(data.message || "Failed to load solar products");
        }

        const backendPricing = normalizeBackendPricing(data.products);

        if (!cancelled) {
          setPricingData(backendPricing);
        }
      } catch (err) {
        console.error("Pricing fetch error:", err);
        if (!cancelled) {
          setError(err.message || "Unable to load solar pricing.");
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    loadPricing();

    return () => {
      cancelled = true;
    };
  }, []);

  const currentData = pricingData[category] || [];

  // Solar sizing calculator
  const solarEstimate = useMemo(() => {
    const electricityRate = 7.5;
    const monthlyUnits = monthlyBill / electricityRate;
    const generationPerKw = 110;
    const calculatedSize = monthlyUnits / generationPerKw;

    const matchingSystem = Object.values(pricingData)
      .flat()
      .filter((item) => Number.isFinite(Number(item.dc)))
      .sort(
        (left, right) =>
          Math.abs(Number(left.dc) - calculatedSize) -
          Math.abs(Number(right.dc) - calculatedSize)
      )[0];

    const systemSize = matchingSystem
      ? Number(matchingSystem.dc)
      : calculatedSize;
    const estimatedCost = matchingSystem?.price || 0;
    const subsidy = matchingSystem?.subsidy || 0;

    const monthlySavings = Math.min(
      Math.round(monthlyUnits * electricityRate),
      monthlyBill
    );

    const netInvestment = Math.max(estimatedCost - subsidy, 0);

    return {
      systemSize: systemSize.toFixed(2),
      subsidy,
      monthlySavings,
      estimatedCost,
      netInvestment,
    };
  }, [monthlyBill, pricingData]);

  // Filters
  const structures = useMemo(() => {
    const values = currentData.map((item) => item.structure).filter(Boolean);
    return ["All", ...Array.from(new Set(values))];
  }, [currentData]);

  const phases = useMemo(() => {
    const values = currentData.map((item) => item.phase).filter(Boolean);
    return ["All", ...Array.from(new Set(values.map(String)))];
  }, [currentData]);

  const filteredData = useMemo(() => {
    return currentData.filter((item) => {
      const query = search.toLowerCase().trim();

      const matchesSearch =
        !query ||
        String(item.modules).toLowerCase().includes(query) ||
        String(item.moduleWattage).toLowerCase().includes(query) ||
        String(item.dc).toLowerCase().includes(query) ||
        String(item.inverter).toLowerCase().includes(query) ||
        item.product?.toLowerCase().includes(query) ||
        item.structure?.toLowerCase().includes(query);

      const matchesStructure =
        structure === "All" || item.structure === structure;

      const matchesPhase =
        phase === "All" || String(item.phase) === phase;

      return matchesSearch && matchesStructure && matchesPhase;
    });
  }, [currentData, search, structure, phase]);

  const handleCategoryChange = (id) => {
    setCategory(id);
    setSearch("");
    setStructure("All");
    setPhase("All");
  };

  const activeCategoryMeta = getCategoryMetadata(category);
  const isHybridCategory = category.toLowerCase().includes("hybrid");

  const scrollToCatalog = () => {
    const element = document.getElementById("catalog");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    document.body.style.overflow = selectedItem ? "hidden" : "unset";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [selectedItem]);

  return (
    <main className="min-h-screen bg-[#EAF4FC] font-['Plus_Jakarta_Sans',system-ui,sans-serif] text-slate-900 antialiased selection:bg-sky-100 selection:text-sky-900">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Archivo+Expanded:wght@600;700;800&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');
        .font-display { font-family: ${DISPLAY_FONT}; }
        .scrollbar-none::-webkit-scrollbar { display: none; }
        .scrollbar-none { -ms-overflow-style: none; scrollbar-width: none; }
        input[type="range"]::-webkit-slider-thumb {
          appearance: none;
          width: 18px;
          height: 18px;
          border-radius: 9999px;
          background: ${PRIMARY};
          border: 3px solid white;
          box-shadow: 0 2px 8px rgba(0,0,0,0.25);
          cursor: pointer;
        }
        input[type="range"]::-moz-range-thumb {
          width: 18px;
          height: 18px;
          border-radius: 9999px;
          background: ${PRIMARY};
          border: 3px solid white;
          box-shadow: 0 2px 8px rgba(0,0,0,0.25);
          cursor: pointer;
        }
      `}</style>

      {/* HERO SECTION */}
      <section className="relative flex min-h-[720px] flex-col justify-between overflow-hidden bg-gradient-to-b from-[#050f1a] via-[#0B253A] to-[#0d2a40] px-6 pt-28 pb-12 sm:px-8 lg:px-12 lg:pt-32 lg:pb-16">
        <div className="pointer-events-none absolute -right-24 -top-24 h-[480px] w-[480px] rounded-full bg-sky-500/10 blur-[130px]" />
        <div className="pointer-events-none absolute -bottom-40 left-1/3 h-[420px] w-[420px] rounded-full bg-sky-500/10 blur-[140px]" />
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_70%_60%_at_50%_0%,#000_65%,transparent_100%)]" />

        <div className="relative mx-auto flex w-full max-w-7xl flex-1 items-center">
          <div className="grid w-full items-center gap-12 lg:grid-cols-[1fr_430px] lg:gap-16">
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, ease: "easeOut" }}
              className="max-w-2xl"
            >
              <motion.span
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="font-display inline-flex items-center rounded-full border border-sky-400/25 bg-sky-400/10 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.08em] text-sky-300 backdrop-blur-md"
              >
                Kerala rooftop solar · FY 2026–27
              </motion.span>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.2 }}
                className="font-display mt-6 text-3xl font-bold uppercase leading-[1.15] tracking-[0.01em] text-white sm:text-4xl lg:text-5xl"
              >
                Every watt
                <br />
                has a price
                <br />
                and a plan
              </motion.h1>

              <p className="mt-6 max-w-lg text-base leading-relaxed text-slate-300 sm:text-lg">
                Compare residential, micro-inverter, hybrid battery, and commercial
                solar systems with structured pricing and subsidy schedules.
              </p>

              <div className="mt-9 flex flex-wrap items-center gap-4">
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.96 }}
                  onClick={scrollToCatalog}
                  className="font-display rounded-full bg-[#0284c7] px-7 py-3.5 text-xs font-bold uppercase tracking-[0.08em] text-white shadow-lg shadow-sky-900/40 transition hover:bg-[#0369a1]"
                >
                  Browse the catalog
                </motion.button>

                <div className="flex items-center gap-2 text-sm text-slate-400">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                  DBT subsidy included where eligible
                </div>
              </div>
            </motion.div>

            {/* SOLAR CALCULATOR */}
            <motion.div
              initial={{ opacity: 0, x: 35, y: 15 }}
              animate={{ opacity: 1, x: 0, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
              className="relative mx-auto w-full max-w-[430px] lg:ml-auto"
            >
              <div className="pointer-events-none absolute -inset-8 rounded-[3rem] bg-sky-500/15 blur-3xl" />
              <div className="relative overflow-hidden rounded-[28px] border border-white/15 bg-white/[0.075] p-5 shadow-2xl shadow-black/40 backdrop-blur-2xl sm:p-6">
                <div className="relative flex items-start justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-emerald-400" />
                      <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-sky-300">
                        Live estimate
                      </span>
                    </div>

                    <h3 className="mt-2 text-xl font-bold tracking-tight text-white">
                      Solar Calculator
                    </h3>
                    <p className="mt-1 text-xs text-slate-400">
                      Estimate your rooftop solar requirement
                    </p>
                  </div>

                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-sky-400/20 bg-sky-400/10 text-sky-300">
                    <Sun size={21} />
                  </div>
                </div>

                <div className="relative mt-7">
                  <div className="flex items-end justify-between">
                    <div>
                      <p className="text-[11px] font-medium text-slate-400">
                        Monthly electricity bill
                      </p>
                      <div className="mt-1 flex items-baseline gap-1">
                        <span className="text-3xl font-black text-white">
                          {money(monthlyBill)}
                        </span>
                        <span className="text-[10px] text-slate-500">/ month</span>
                      </div>
                    </div>
                    <span className="rounded-full border border-sky-400/20 bg-sky-400/10 px-2.5 py-1 text-[9px] font-bold uppercase tracking-wider text-sky-300">
                      Adjust
                    </span>
                  </div>

                  <div className="mt-5">
                    <input
                      type="range"
                      min="1000"
                      max="30000"
                      step="500"
                      value={monthlyBill}
                      onChange={(e) => setMonthlyBill(Number(e.target.value))}
                      className="h-1.5 w-full cursor-pointer appearance-none rounded-full bg-white/10"
                    />
                    <div className="mt-2 flex justify-between text-[9px] font-medium text-slate-500">
                      <span>₹1,000</span>
                      <span>₹30,000</span>
                    </div>
                  </div>
                </div>

                <motion.div
                  key={solarEstimate.systemSize}
                  initial={{ opacity: 0.5, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="mt-6 rounded-2xl border border-sky-400/15 bg-gradient-to-br from-sky-400/10 to-white/[0.03] p-4"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-[9px] font-bold uppercase tracking-[0.14em] text-sky-300">
                        Recommended system
                      </p>
                      <div className="mt-1 flex items-baseline gap-1.5">
                        <span className="text-3xl font-black text-white">
                          {solarEstimate.systemSize}
                        </span>
                        <span className="text-sm font-semibold text-slate-400">
                          kWp
                        </span>
                      </div>
                    </div>
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-sky-400/10 text-sky-300">
                      <Zap size={22} />
                    </div>
                  </div>
                  <div className="mt-3 h-px bg-white/10" />
                  <p className="mt-3 text-[10px] leading-relaxed text-slate-400">
                    Based on estimated consumption and standard panel sizing.
                  </p>
                </motion.div>

                <div className="mt-3 grid grid-cols-2 gap-3">
                  <div className="rounded-2xl border border-white/10 bg-black/15 p-4">
                    <p className="text-[9px] font-bold uppercase tracking-wider text-slate-500">
                      Est. subsidy
                    </p>
                    <p className="mt-2 text-lg font-black text-white">
                      {money(solarEstimate.subsidy)}
                    </p>
                    <div className="mt-1 flex items-center gap-1.5">
                      <CheckCircle2 size={11} className="text-emerald-400" />
                      <span className="text-[9px] text-emerald-300">Where eligible</span>
                    </div>
                  </div>

                  <div className="rounded-2xl border border-white/10 bg-black/15 p-4">
                    <p className="text-[9px] font-bold uppercase tracking-wider text-slate-500">
                      Monthly savings
                    </p>
                    <p className="mt-2 text-lg font-black text-white">
                      {money(solarEstimate.monthlySavings)}
                    </p>
                    <p className="mt-1 text-[9px] text-emerald-300">Estimated offset</p>
                  </div>
                </div>

                <div className="mt-3 flex items-center justify-between rounded-2xl border border-emerald-400/10 bg-emerald-400/[0.045] p-4">
                  <div>
                    <p className="text-[9px] font-bold uppercase tracking-wider text-slate-500">
                      Estimated net investment
                    </p>
                    <p className="mt-1 text-xl font-black text-white">
                      {money(solarEstimate.netInvestment)}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-[9px] text-slate-500">System cost</p>
                    <p className="mt-1 text-xs font-bold text-slate-300">
                      {money(solarEstimate.estimatedCost)}
                    </p>
                  </div>
                </div>

                <button
                  onClick={scrollToCatalog}
                  className="mt-5 flex w-full items-center justify-center gap-2 rounded-full bg-[#0284c7] py-3.5 text-[10px] font-bold uppercase tracking-[0.12em] text-white shadow-lg shadow-sky-900/40 transition hover:bg-[#0369a1]"
                >
                  Explore matching systems
                  <ArrowRight size={14} />
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CATEGORY TABS */}
      <section
        id="catalog"
        className="sticky top-0 z-40 border-b border-slate-200/80 bg-white/90 shadow-sm backdrop-blur-xl"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="scrollbar-none flex space-x-2 overflow-x-auto py-3.5">
            {categoryTabs.map((item) => {
              const Icon = item.icon;
              const active = category === item.id;
              const count = (pricingData[item.id] || []).length;

              return (
                <button
                  key={item.id}
                  onClick={() => handleCategoryChange(item.id)}
                  className={`font-display group relative flex min-w-max items-center gap-2.5 rounded-xl px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.05em] transition-all duration-200 ${active
                    ? "bg-[#0B253A] text-white shadow-md"
                    : "text-slate-600 hover:bg-slate-100/80 hover:text-slate-900"
                    }`}
                >
                  <Icon
                    size={16}
                    className={
                      active
                        ? "text-sky-400"
                        : "text-slate-400 group-hover:text-sky-600"
                    }
                  />
                  <span>{item.title}</span>

                  {count > 0 && (
                    <span
                      className={`rounded-full px-1.5 py-0.5 text-[8px] ${active
                        ? "bg-white/10 text-sky-300"
                        : "bg-slate-100 text-slate-400"
                        }`}
                    >
                      {count}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* CATALOG CONTENT */}
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={category}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25 }}
          >
            <div className="mb-10 flex flex-col justify-between gap-6 md:flex-row md:items-end">
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-sky-600">
                  {activeCategoryMeta?.short}
                </span>
                <h2 className="font-display mt-1 text-2xl font-bold uppercase text-slate-900 sm:text-3xl">
                  {activeCategoryMeta?.title} Catalog
                </h2>
                <p className="mt-1 max-w-xl text-sm text-slate-500">
                  {activeCategoryMeta?.description}
                </p>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-white px-4 py-2.5 shadow-sm">
                <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                  Available Systems
                </p>
                <p className="text-lg font-bold text-slate-800">
                  {filteredData.length}
                  <span className="ml-1 text-xs font-normal text-slate-400">
                    models listed
                  </span>
                </p>
              </div>
            </div>

            {loading && (
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                {[1, 2, 3].map((item) => (
                  <div
                    key={item}
                    className="h-[390px] animate-pulse rounded-[28px] bg-white shadow-sm"
                  />
                ))}
              </div>
            )}

            {!loading && error && (
              <div className="rounded-2xl border border-red-200 bg-red-50 p-10 text-center">
                <h3 className="font-bold text-red-700">Unable to load pricing</h3>
                <p className="mt-2 text-sm text-red-500">{error}</p>
                <button
                  onClick={() => window.location.reload()}
                  className="mt-5 rounded-full bg-red-600 px-6 py-2.5 text-xs font-bold text-white"
                >
                  Retry
                </button>
              </div>
            )}

            {!loading && !error && (
              <>
                <div className="mb-8 rounded-2xl border border-slate-200/90 bg-white p-3 shadow-sm">
                  <div className="flex flex-col gap-3 sm:flex-row">
                    <div className="relative flex-1">
                      <Search
                        size={16}
                        className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                      />
                      <input
                        type="text"
                        placeholder="Search by kW, module count, or structure..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full rounded-xl border border-slate-200/80 bg-slate-50/70 py-2.5 pl-10 pr-4 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-sky-400 focus:bg-white focus:ring-2 focus:ring-sky-100"
                      />
                    </div>

                    <div className="relative min-w-[210px]">
                      <SlidersHorizontal
                        size={15}
                        className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                      />
                      <select
                        value={structure}
                        onChange={(e) => setStructure(e.target.value)}
                        className="w-full appearance-none rounded-xl border border-slate-200/80 bg-slate-50/70 py-2.5 pl-9 pr-9 text-xs font-semibold text-slate-700 outline-none transition focus:border-sky-400"
                      >
                        {structures.map((item) => (
                          <option key={item} value={item}>
                            {item === "All" ? "Structure: All Types" : item}
                          </option>
                        ))}
                      </select>
                      <ChevronDown
                        size={14}
                        className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
                      />
                    </div>

                    {phases.length > 2 && (
                      <div className="relative min-w-[150px]">
                        <Filter
                          size={15}
                          className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                        />
                        <select
                          value={phase}
                          onChange={(e) => setPhase(e.target.value)}
                          className="w-full appearance-none rounded-xl border border-slate-200/80 bg-slate-50/70 py-2.5 pl-9 pr-9 text-xs font-semibold text-slate-700 outline-none transition focus:border-sky-400"
                        >
                          {phases.map((item) => (
                            <option key={item} value={item}>
                              {item === "All" ? "Phase: All" : `${item} Phase`}
                            </option>
                          ))}
                        </select>
                        <ChevronDown
                          size={14}
                          className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
                        />
                      </div>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {filteredData.map((item, index) => (
                    <motion.article
                      key={`${item.id}-${item.structure}-${index}`}
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.06, duration: 0.35 }}
                      whileHover={{ y: -8 }}
                      className="group flex flex-col justify-between overflow-hidden rounded-[28px] border border-slate-200/90 bg-white shadow-sm transition-all duration-300 hover:border-sky-300 hover:shadow-2xl hover:shadow-sky-100"
                    >
                      <div>
                        <div className="relative overflow-hidden border-b border-slate-100 bg-[#0B253A] p-5 text-white">
                          <div className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-sky-500/20 blur-3xl" />
                          <div className="relative flex items-start justify-between gap-3">
                            <div>
                              <div className="flex flex-wrap items-center gap-2">
                                <span className="inline-flex items-center rounded-md bg-sky-400/10 px-2 py-0.5 text-[11px] font-bold text-sky-300 ring-1 ring-sky-400/20">
                                  {item.modules} Panels
                                </span>
                                <span className="inline-flex items-center rounded-md bg-white/10 px-2 py-0.5 text-[11px] font-semibold text-slate-300">
                                  {item.phase ? `${item.phase} Phase` : "3 Phase"}
                                </span>
                              </div>
                              <h3 className="mt-2.5 text-lg font-bold tracking-tight text-white">
                                {item.product}
                              </h3>
                            </div>

                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-sky-400/10 text-sky-400 ring-1 ring-sky-400/20">
                              {isHybridCategory ? (
                                <BatteryCharging size={20} />
                              ) : (
                                <Sun size={20} />
                              )}
                            </div>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-px bg-slate-100 text-xs">
                          <SpecItem
                            icon={<Cpu />}
                            label="DC Capacity"
                            value={`${item.dc} kWp`}
                          />
                          <SpecItem
                            icon={<Zap />}
                            label="Inverter"
                            value={
                              item.inverter2
                                ? `${item.inverter} / ${item.inverter2} kW`
                                : `${item.inverter} kW`
                            }
                          />
                          <SpecItem
                            icon={<Sun />}
                            label="Module"
                            value={
                              item.moduleWattage
                                ? `${item.moduleWattage} W`
                                : "—"
                            }
                          />
                          <SpecItem
                            icon={<Layers />}
                            label="Phase"
                            value={item.phase ? `${item.phase} Phase` : "—"}
                          />

                          <div className="col-span-2 flex items-start gap-2.5 bg-white p-3.5">
                            <Layers
                              size={15}
                              className="mt-0.5 shrink-0 text-sky-500"
                            />
                            <div className="min-w-0">
                              <p className="text-[10px] font-semibold uppercase text-slate-400">
                                Mounting Structure
                              </p>
                              <p className="truncate font-bold text-slate-800">
                                {item.structure}
                              </p>
                            </div>
                          </div>

                          {item.battery !== null && isHybridCategory && (
                            <div className="col-span-2 flex items-start gap-2.5 bg-sky-50 p-3.5">
                              <Boxes
                                size={15}
                                className="mt-0.5 shrink-0 text-sky-600"
                              />
                              <div>
                                <p className="text-[10px] font-semibold uppercase text-sky-600">
                                  Storage Battery
                                </p>
                                <p className="font-bold text-sky-950">
                                  {item.battery} kWh Lithium Bank
                                </p>
                              </div>
                            </div>
                          )}
                        </div>

                        <div className="p-4">
                          <div className="flex items-center justify-between text-xs text-slate-400">
                            <span>List Price (MRP)</span>
                            <span className="font-mono line-through">
                              {money(item.max)}
                            </span>
                          </div>

                          <div className="mt-2 flex items-baseline justify-between gap-3">
                            <div>
                              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                                Offer Price
                              </span>
                              <p className="text-2xl font-black tracking-tight text-slate-900">
                                {money(item.price)}
                              </p>
                            </div>

                            {item.offer > 0 && (
                              <span className="rounded-md bg-emerald-50 px-2 py-1 text-[11px] font-bold text-emerald-700">
                                Save {money(item.offer)}
                              </span>
                            )}
                          </div>

                          {item.subsidy > 0 && (
                            <div className="mt-3 flex items-center justify-between rounded-xl bg-emerald-50/70 px-3 py-2 text-xs font-semibold text-emerald-800">
                              <span>Central Govt Subsidy</span>
                              <span className="font-bold text-emerald-700">
                                {money(item.subsidy)}
                              </span>
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="border-t border-slate-100 bg-slate-50/70 p-4">
                        <button
                          onClick={() => setSelectedItem(item)}
                          className="flex w-full items-center justify-center gap-1.5 rounded-full bg-[#0284c7] py-3 text-xs font-bold uppercase tracking-wider text-white shadow-lg shadow-sky-200 transition hover:bg-[#0369a1] active:scale-95"
                        >
                          View Full Specifications
                          <ArrowRight size={14} />
                        </button>
                      </div>
                    </motion.article>
                  ))}
                </div>

                {filteredData.length === 0 && (
                  <div className="rounded-2xl border border-slate-200 bg-white p-16 text-center shadow-sm">
                    <Search className="mx-auto mb-3 text-slate-300" size={36} />
                    <h3 className="text-base font-bold text-slate-700">
                      No solar configurations found
                    </h3>
                    <p className="mt-1 text-xs text-slate-400">
                      Try adjusting your search terms or structure filters.
                    </p>
                  </div>
                )}
              </>
            )}
          </motion.div>
        </AnimatePresence>
      </section>

      {/* DETAIL MODAL */}
      <AnimatePresence>
        {selectedItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto bg-slate-950/75 p-4 pt-20 pb-20 backdrop-blur-sm"
            onClick={() => setSelectedItem(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.2 }}
              onClick={(e) => e.stopPropagation()}
              className="relative my-auto max-h-[85vh] w-full max-w-xl overflow-y-auto rounded-3xl bg-white shadow-2xl"
            >
              <div className="sticky top-0 z-10 flex items-start justify-between overflow-hidden border-b border-slate-800 bg-[#0B253A] p-6 text-white">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-sky-400">
                    System Specification Sheet
                  </span>
                  <h3 className="font-display mt-1 text-lg font-bold uppercase">
                    {selectedItem.product}
                  </h3>
                  <p className="mt-0.5 text-xs text-slate-300">
                    {selectedItem.modules} Modules · {selectedItem.dc} kWp
                  </p>
                </div>

                <button
                  onClick={() => setSelectedItem(null)}
                  className="rounded-full bg-white/10 p-1.5 text-slate-300 hover:bg-white/20 hover:text-white"
                  aria-label="Close modal"
                >
                  <X size={18} />
                </button>
              </div>

              <div className="grid grid-cols-2 gap-px bg-slate-100 text-xs">
                <ModalItem
                  label="Module Count"
                  value={`${selectedItem.modules} Panels`}
                />
                <ModalItem
                  label="Module Wattage"
                  value={
                    selectedItem.moduleWattage
                      ? `${selectedItem.moduleWattage} W`
                      : "—"
                  }
                />
                <ModalItem
                  label="DC Array Size"
                  value={`${selectedItem.dc} kWp`}
                />
                <ModalItem
                  label="Inverter Rating"
                  value={
                    selectedItem.inverter2
                      ? `${selectedItem.inverter} / ${selectedItem.inverter2} kW`
                      : `${selectedItem.inverter} kW`
                  }
                />
                <ModalItem
                  label="Grid Phase"
                  value={selectedItem.phase ? `${selectedItem.phase} Phase` : "—"}
                />
                {selectedItem.battery !== null && (
                  <ModalItem
                    label="Battery Storage"
                    value={`${selectedItem.battery} kWh`}
                  />
                )}
                <ModalItem
                  label="Mounting Structure"
                  value={selectedItem.structure}
                  colSpan={selectedItem.battery !== null ? 1 : 2}
                />
                <ModalItem
                  label="GST Rate"
                  value={`${selectedItem.gstRate}%`}
                />
              </div>

              <div className="p-6">
                <div className="rounded-2xl border border-slate-200/80 bg-slate-50 p-5">
                  <div className="flex items-center justify-between text-xs text-slate-500">
                    <span>Base MRP</span>
                    <span className="font-mono text-slate-400 line-through">
                      {money(selectedItem.max)}
                    </span>
                  </div>

                  {selectedItem.offer > 0 && (
                    <div className="mt-2 flex items-center justify-between text-xs font-semibold text-emerald-600">
                      <span>Special Offer</span>
                      <span className="font-mono">
                        -{money(selectedItem.offer)}
                      </span>
                    </div>
                  )}

                  <div className="mt-4 border-t border-slate-200 pt-3">
                    <div className="flex items-end justify-between">
                      <div>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                          Offer Price
                        </span>
                        <p className="text-2xl font-black text-slate-900">
                          {money(selectedItem.price)}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {selectedItem.subsidy > 0 && (
                  <div className="mt-4 rounded-2xl border border-emerald-200 bg-emerald-50/50 p-4">
                    <span className="text-[10px] font-bold uppercase text-emerald-700">
                      Estimated Central DBT Subsidy
                    </span>
                    <p className="mt-0.5 text-xl font-extrabold text-emerald-800">
                      {money(selectedItem.subsidy)}
                    </p>
                    <p className="mt-1 text-[11px] text-emerald-700/80">
                      Subsidy eligibility and final amount are subject to applicable
                      government guidelines.
                    </p>
                  </div>
                )}

                {selectedItem.subsidy > 0 && (
                  <div className="mt-4 rounded-2xl border border-sky-200 bg-sky-50 p-4">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-sky-700">
                        Approx. Cost After Subsidy
                      </span>
                      <span className="text-lg font-black text-sky-900">
                        {money(
                          Math.max(
                            selectedItem.price - selectedItem.subsidy,
                            0
                          )
                        )}
                      </span>
                    </div>
                  </div>
                )}

                <div className="mt-6">
                  <button
                    onClick={() => {
                      const itemToForward = selectedItem;
                      setSelectedItem(null);
                      navigate("/contact", {
                        state: { selectedConfiguration: itemToForward },
                      });
                    }}
                    className="group flex w-full items-center justify-center gap-2 rounded-full bg-[#0284c7] py-3.5 text-xs font-bold uppercase tracking-wider text-white shadow-lg shadow-sky-200 transition hover:bg-[#0369a1] active:scale-95"
                  >
                    Proceed with this Configuration
                    <ArrowRight
                      size={14}
                      className="transition-transform group-hover:translate-x-1"
                    />
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}

// =========================================================
// SUBCOMPONENTS
// =========================================================

function SpecItem({ icon, label, value }) {
  return (
    <div className="flex items-start gap-2.5 bg-white p-3.5">
      {React.cloneElement(icon, {
        size: 15,
        className: "mt-0.5 shrink-0 text-sky-500",
      })}
      <div className="min-w-0">
        <p className="text-[10px] font-semibold uppercase text-slate-400">
          {label}
        </p>
        <p className="truncate font-bold text-slate-800">{value}</p>
      </div>
    </div>
  );
}

function ModalItem({ label, value, colSpan = 1 }) {
  return (
    <div
      className={`bg-white p-4 ${colSpan === 2 ? "col-span-2" : "col-span-1"
        }`}
    >
      <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">
        {label}
      </p>
      <p className="mt-1 font-semibold text-slate-800">{value}</p>
    </div>
  );
}