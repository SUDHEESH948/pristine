import React, { useMemo, useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    SunMedium,
    Zap,
    ArrowUpRight,
    Plus,
    BatteryCharging,
    Search,
    Filter,
    ChevronDown,
    Package,
    Building2,
    X,
    Pencil,
    Trash2,
    Save,
    RefreshCw,
    AlertCircle,
    Loader2,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

// ============================================================
// API CONFIG
// ============================================================
const API_BASE_URL =
    import.meta.env.VITE_API_URL || "http://localhost:5000";

const SOLAR_PRODUCTS_API = `${API_BASE_URL}/api/solar-products`;
const PRODUCT_SYNC_CHANNEL = "solar_products_sync";
const PRODUCT_SYNC_STORAGE_KEY = "solar_product_last_added";

// ============================================================
// FORMAT INR
// ============================================================
const formatINR = (value) =>
    new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: "INR",
        maximumFractionDigits: 0,
    }).format(Number(value) || 0);

// ============================================================
// ANIMATION
// ============================================================
const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { duration: 0.5, staggerChildren: 0.06 },
    },
};

const itemVariants = {
    hidden: { opacity: 0, y: 18 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.4 },
    },
};

// ============================================================
// CATEGORY METADATA DEFAULTS (Lookup map for icons & labels)
// ============================================================
const CATEGORY_META_MAP = {
    String: {
        label: "String 580Wp",
        title: "MSP String 580Wp",
        icon: Zap,
        subtitle: "580Wp module pricing",
        badge: "Active",
    },
    Micro: {
        label: "Micro 560Wp",
        title: "MSP Micro Inverter 560Wp",
        icon: SunMedium,
        subtitle: "560Wp module pricing",
        badge: "Enphase",
    },
    Hybrid: {
        label: "Hybrid 600Wp",
        title: "nDCR MySine Hybrid 600Wp",
        icon: BatteryCharging,
        subtitle: "600Wp nDCR systems",
        badge: "Battery Ready",
    },
    "C&I": {
        label: "C&I Pricing",
        title: "Customer Price C&I",
        icon: Building2,
        subtitle: "Commercial pricing",
        badge: "Customizable",
    },
};

const getCategoryMetadata = (categoryName) => {
    return (
        CATEGORY_META_MAP[categoryName] || {
            label: `${categoryName} Systems`,
            title: `${categoryName} Pricing`,
            icon: Package,
            subtitle: `${categoryName} configuration pricing`,
            badge: "Active",
        }
    );
};

// ============================================================
// NORMALIZE CATEGORY
// ============================================================
const normalizeCategory = (systemType) => {
    const raw = String(systemType || "").trim();
    const value = raw.toLowerCase();

    if (value === "string" || value === "string inverter") return "String";
    if (value === "micro" || value === "micro inverter") return "Micro";
    if (value === "hybrid") return "Hybrid";
    if (value === "c&i" || value === "c & i" || value === "c and i") return "C&I";

    // Fallback: capitalized original string if not empty
    return raw ? raw.charAt(0).toUpperCase() + raw.slice(1) : "General";
};

// ============================================================
// GET STRUCTURE VALUE & PRICE
// ============================================================
const getStructureName = (structureItem) => {
    if (typeof structureItem === "string") return structureItem;
    if (structureItem && typeof structureItem === "object") {
        return (
            structureItem.structure ||
            structureItem.name ||
            structureItem.type ||
            "Without Structure"
        );
    }
    return "Without Structure";
};

const getStructurePrice = (structureItem, product, field) => {
    if (structureItem && typeof structureItem === "object") {
        if (field === "maxPrice") {
            return (
                structureItem.maxPrice ??
                structureItem.msp ??
                structureItem.maximumPrice ??
                structureItem.maxSellingPrice ??
                product.maxPrice ??
                0
            );
        }
        if (field === "offer") {
            return (
                structureItem.offer ??
                structureItem.offerPrice ??
                structureItem.sellingPrice ??
                product.offer ??
                0
            );
        }
        if (field === "subsidy") {
            return structureItem.subsidy ?? product.subsidy ?? 0;
        }
    }
    return product[field] ?? 0;
};

// ============================================================
// NORMALIZE BACKEND PRODUCTS
// ============================================================
const normalizeProducts = (products = []) => {
    const rows = [];

    products.forEach((product) => {
        const structures = Array.isArray(product.structures)
            ? product.structures
            : [];
        const category = normalizeCategory(product.systemType);

        if (structures.length > 0) {
            structures.forEach((structureItem, index) => {
                rows.push({
                    id: `${product._id}-${index}`,
                    backendId: product._id,
                    category,
                    systemType: product.systemType,
                    modules: product.moduleCount,
                    moduleWattage: product.moduleWattage,
                    product: product.productName,
                    dc: product.dcCapacity,
                    inverter: product.inverterCapacity2
                        ? `${product.inverterCapacity} / ${product.inverterCapacity2}`
                        : product.inverterCapacity,
                    inverterCapacity: product.inverterCapacity,
                    inverterCapacity2: product.inverterCapacity2,
                    battery: product.batteryCapacity,
                    phase: String(product.phase ?? ""),
                    structure: getStructureName(structureItem),
                    maxPrice: getStructurePrice(structureItem, product, "maxPrice"),
                    offer: getStructurePrice(structureItem, product, "offer"),
                    subsidy: getStructurePrice(structureItem, product, "subsidy"),
                    gstRate: product.gstRate,
                    currency: product.currency,
                    status: product.status,
                    structureIndex: index,
                    rawStructure: structureItem,
                    rawProduct: product,
                });
            });
            return;
        }

        rows.push({
            id: product._id,
            backendId: product._id,
            category,
            systemType: product.systemType,
            modules: product.moduleCount,
            moduleWattage: product.moduleWattage,
            product: product.productName,
            dc: product.dcCapacity,
            inverter: product.inverterCapacity2
                ? `${product.inverterCapacity} / ${product.inverterCapacity2}`
                : product.inverterCapacity,
            inverterCapacity: product.inverterCapacity,
            inverterCapacity2: product.inverterCapacity2,
            battery: product.batteryCapacity,
            phase: String(product.phase ?? ""),
            structure: "Without Structure",
            maxPrice: product.maxPrice ?? 0,
            offer: product.offer ?? 0,
            subsidy: product.subsidy ?? 0,
            gstRate: product.gstRate,
            currency: product.currency,
            status: product.status,
            structureIndex: 0,
            rawStructure: null,
            rawProduct: product,
        });
    });

    return rows;
};

// ============================================================
// MAIN COMPONENT
// ============================================================
export default function SolarSellerDashboard() {
    const navigate = useNavigate();

    const [activeCategory, setActiveCategory] = useState("String");
    const [search, setSearch] = useState("");
    const [structureFilter, setStructureFilter] = useState("All");
    const [showFilters, setShowFilters] = useState(false);
    const [allProducts, setAllProducts] = useState([]);
    const [editingProduct, setEditingProduct] = useState(null);
    const [deletingProduct, setDeletingProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [deleting, setDeleting] = useState(false);
    const [error, setError] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

    const [editForm, setEditForm] = useState({
        product: "",
        dc: "",
        inverter: "",
        inverterCapacity2: "",
        phase: "1",
        structure: "",
        maxPrice: "",
        offer: "",
        subsidy: "",
        battery: "",
        moduleCount: "",
        moduleWattage: "",
        gstRate: "8.9",
        status: true,
    });

    const structures = [
        "All",
        "Without Structure",
        "RCC Ballast",
        "Additional Work Above RCC",
        "Additional Work Above Sheet Roof",
        "Sheet Roof - Shortrail",
        "L-Angle Without Ballast",
        "Table Type Structure",
    ];

    // ==========================================================
    // BACKEND-CONNECTED DYNAMIC CATEGORY TABS
    // ==========================================================
    const categoryTabs = useMemo(() => {
        const uniqueCategories = Array.from(
            new Set(allProducts.map((p) => p.category).filter(Boolean))
        );

        const list =
            uniqueCategories.length > 0
                ? uniqueCategories
                : ["String", "Micro", "Hybrid", "C&I"];

        return list.map((catName) => {
            const meta = getCategoryMetadata(catName);
            return {
                name: catName,
                label: meta.label,
                title: meta.title,
                icon: meta.icon,
                subtitle: meta.subtitle,
                badge: meta.badge,
            };
        });
    }, [allProducts]);

    const getCategoryCount = (category) => {
        return allProducts.filter((product) => product.category === category).length;
    };

    // ==========================================================
    // DYNAMIC METRICS FROM ACTUAL TABS
    // ==========================================================
    const metrics = useMemo(() => {
        return categoryTabs.map((tab) => ({
            title: `${tab.name} Systems`,
            value: getCategoryCount(tab.name),
            subtitle: tab.subtitle,
            icon: tab.icon,
            change: tab.badge,
        }));
    }, [categoryTabs, allProducts]);

    const getCategoryTitle = () => {
        const current = categoryTabs.find((t) => t.name === activeCategory);
        return current ? current.title : `${activeCategory} Pricing`;
    };

    // ==========================================================
    // FETCH PRODUCTS
    // ==========================================================
    const fetchProducts = useCallback(async (silent = false) => {
        if (!silent) {
            setLoading(true);
            setError("");
        }

        try {
            const response = await fetch(SOLAR_PRODUCTS_API);
            const data = await response.json();

            if (!response.ok || !data.success) {
                throw new Error(data.message || "Failed to fetch solar products");
            }

            const products = Array.isArray(data.products) ? data.products : [];
            const normalized = normalizeProducts(products);
            setAllProducts(normalized);
        } catch (err) {
            console.error("Fetch Solar Products Error:", err);
            if (!silent) {
                setError(err.message || "Unable to connect to the server.");
            }
        } finally {
            if (!silent) {
                setLoading(false);
            }
        }
    }, []);

    useEffect(() => {
        fetchProducts();
    }, [fetchProducts]);

    useEffect(() => {
        const refreshSilently = () => fetchProducts(true);
        const handleStorage = (event) => {
            if (event.key === PRODUCT_SYNC_STORAGE_KEY) {
                refreshSilently();
            }
        };

        window.addEventListener("focus", refreshSilently);
        window.addEventListener("storage", handleStorage);

        const intervalId = window.setInterval(refreshSilently, 25000);
        const channel =
            typeof BroadcastChannel !== "undefined"
                ? new BroadcastChannel(PRODUCT_SYNC_CHANNEL)
                : null;

        if (channel) {
            channel.onmessage = refreshSilently;
        }

        return () => {
            window.removeEventListener("focus", refreshSilently);
            window.removeEventListener("storage", handleStorage);
            window.clearInterval(intervalId);
            channel?.close();
        };
    }, [fetchProducts]);

    // Sync active category if the current selection disappears
    useEffect(() => {
        if (
            categoryTabs.length > 0 &&
            !categoryTabs.some((tab) => tab.name === activeCategory)
        ) {
            setActiveCategory(categoryTabs[0].name);
        }
    }, [categoryTabs, activeCategory]);

    useEffect(() => {
        if (!successMessage) return;
        const timer = setTimeout(() => setSuccessMessage(""), 3000);
        return () => clearTimeout(timer);
    }, [successMessage]);

    // ==========================================================
    // FILTERED PRODUCTS
    // ==========================================================
    const currentProducts = useMemo(() => {
        return allProducts.filter((item) => item.category === activeCategory);
    }, [allProducts, activeCategory]);

    const filteredProducts = useMemo(() => {
        const searchValue = search.toLowerCase().trim();

        return currentProducts.filter((item) => {
            const matchesSearch =
                !searchValue ||
                item.product?.toLowerCase().includes(searchValue) ||
                item.structure?.toLowerCase().includes(searchValue);

            const matchesStructure =
                structureFilter === "All" ||
                item.structure?.toLowerCase().includes(structureFilter.toLowerCase());

            return matchesSearch && matchesStructure;
        });
    }, [currentProducts, search, structureFilter]);

    const handleCategoryChange = (category) => {
        setActiveCategory(category);
        setSearch("");
        setStructureFilter("All");
    };

    // ==========================================================
    // EDIT & DELETE HANDLERS
    // ==========================================================
    const handleEdit = (product) => {
        setError("");
        const rawProduct = product.rawProduct || {};
        const rawStructure = product.rawStructure;

        setEditingProduct(product);
        setEditForm({
            product: rawProduct.productName || product.product || "",
            dc: rawProduct.dcCapacity ?? product.dc ?? "",
            inverter: rawProduct.inverterCapacity ?? product.inverterCapacity ?? "",
            inverterCapacity2: rawProduct.inverterCapacity2 ?? "",
            phase: String(rawProduct.phase ?? product.phase ?? "1"),
            structure: product.structure === "Without Structure" ? "" : product.structure,
            maxPrice:
                rawStructure && typeof rawStructure === "object"
                    ? rawStructure.maxPrice ?? rawStructure.msp ?? ""
                    : "",
            offer:
                rawStructure && typeof rawStructure === "object"
                    ? rawStructure.offer ?? rawStructure.offerPrice ?? ""
                    : "",
            subsidy:
                rawStructure && typeof rawStructure === "object"
                    ? rawStructure.subsidy ?? ""
                    : "",
            battery: rawProduct.batteryCapacity ?? product.battery ?? "",
            moduleCount: rawProduct.moduleCount ?? product.modules ?? "",
            moduleWattage: rawProduct.moduleWattage ?? product.moduleWattage ?? "",
            gstRate: rawProduct.gstRate ?? "8.9",
            status: rawProduct.status ?? true,
        });
    };

    const handleEditChange = (field, value) => {
        setEditForm((prev) => ({ ...prev, [field]: value }));
    };

    const handleSaveEdit = async () => {
        if (!editingProduct) return;
        if (!editForm.product.trim()) {
            setError("Product title is required.");
            return;
        }

        try {
            setSaving(true);
            setError("");

            const backendProduct = editingProduct.rawProduct || {};
            const existingStructures = Array.isArray(backendProduct.structures)
                ? [...backendProduct.structures]
                : [];

            if (
                existingStructures.length > 0 &&
                editingProduct.structureIndex !== undefined
            ) {
                const index = editingProduct.structureIndex;
                const currentStructure = existingStructures[index];

                existingStructures[index] = {
                    ...(typeof currentStructure === "object" ? currentStructure : {}),
                    structure: editForm.structure,
                    maxPrice: editForm.maxPrice === "" ? 0 : Number(editForm.maxPrice),
                    offer: editForm.offer === "" ? 0 : Number(editForm.offer),
                    subsidy: editForm.subsidy === "" ? 0 : Number(editForm.subsidy),
                };
            }

            const updateBody = {
                productName: editForm.product.trim(),
                systemType: backendProduct.systemType || editingProduct.category,
                moduleCount: editForm.moduleCount === "" ? 0 : Number(editForm.moduleCount),
                moduleWattage: editForm.moduleWattage === "" ? 0 : Number(editForm.moduleWattage),
                dcCapacity: editForm.dc === "" ? 0 : Number(editForm.dc),
                inverterCapacity: editForm.inverter,
                inverterCapacity2: editForm.inverterCapacity2 || null,
                batteryCapacity: editForm.battery || null,
                phase: editForm.phase,
                structures: existingStructures,
                gstRate: editForm.gstRate === "" ? 8.9 : Number(editForm.gstRate),
                currency: backendProduct.currency || "INR",
                status: editForm.status,
            };

            const response = await fetch(`${SOLAR_PRODUCTS_API}/${editingProduct.backendId}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(updateBody),
            });

            const data = await response.json();
            if (!response.ok || !data.success) {
                throw new Error(data.message || "Failed to update product");
            }

            await fetchProducts();
            setEditingProduct(null);
            setSuccessMessage("Solar product updated successfully.");
        } catch (err) {
            console.error("Update Solar Product Error:", err);
            setError(err.message || "Failed to update solar product.");
        } finally {
            setSaving(false);
        }
    };

    const handleDelete = async () => {
        if (!deletingProduct) return;

        try {
            setDeleting(true);
            setError("");

            const response = await fetch(
                `${SOLAR_PRODUCTS_API}/${deletingProduct.backendId}`,
                { method: "DELETE" }
            );

            const data = await response.json();
            if (!response.ok || !data.success) {
                throw new Error(data.message || "Failed to delete product");
            }

            await fetchProducts();
            setDeletingProduct(null);
            setSuccessMessage("Solar product deleted successfully.");
        } catch (err) {
            console.error("Delete Solar Product Error:", err);
            setError(err.message || "Failed to delete solar product.");
        } finally {
            setDeleting(false);
        }
    };

    // ==========================================================
    // RENDER
    // ==========================================================
    return (
        <div
            className="min-h-screen w-full overflow-x-hidden bg-gradient-to-br from-[#dff3ff] via-[#eef9ff] to-[#c9eaff] p-2 text-slate-800 sm:p-4 lg:p-8"
            style={{ fontFamily: "'Open Sans', sans-serif" }}
        >
            {/* BACKGROUND DECORATION */}
            <div className="pointer-events-none fixed inset-0 overflow-hidden">
                <motion.div
                    className="absolute -left-32 -top-32 h-96 w-96 rounded-full bg-sky-300/30 blur-3xl"
                    animate={{ x: [0, 40, 0], y: [0, 30, 0] }}
                    transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                />
                <motion.div
                    className="absolute -bottom-40 -right-40 h-[32rem] w-[32rem] rounded-full bg-blue-400/20 blur-3xl"
                    animate={{ x: [0, -40, 0], y: [0, -30, 0] }}
                    transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
                />
            </div>

            <motion.main
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
                className="relative mx-auto w-full max-w-[1500px]"
            >
                {/* HEADER */}
                <motion.header
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="mb-5 rounded-3xl border border-white/80 bg-white/80 p-4 shadow-xl shadow-sky-900/5 backdrop-blur-xl sm:p-6 lg:p-8"
                >
                    <div className="flex flex-col gap-5 xl:flex-row xl:items-center xl:justify-between">
                        <motion.div variants={itemVariants}>
                            <span className="inline-flex items-center gap-2 rounded-full border border-sky-200 bg-sky-50 px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-sky-700 sm:text-xs">
                                <SunMedium size={14} />
                                Seller Dashboard
                            </span>
                            <h1 className="mt-3 text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl lg:text-4xl">
                                Solar Commercial Hub
                            </h1>
                            <p className="mt-1 max-w-3xl text-xs leading-relaxed text-slate-500 sm:text-sm">
                                Manage solar system pricing, structure configurations, and subsidies.
                            </p>
                        </motion.div>

                        <motion.div
                            variants={itemVariants}
                            className="flex w-full gap-2 sm:w-auto"
                        >
                            <button
                                type="button"
                                onClick={() => navigate("/solarprice")}
                                className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-sky-600 px-5 py-3 text-xs font-bold text-white shadow-lg shadow-sky-600/20 transition hover:bg-sky-700 active:scale-[0.98] sm:w-auto"
                            >
                                <Plus size={15} />
                                Add Product
                            </button>

                            <button
                                type="button"
                                onClick={fetchProducts}
                                disabled={loading}
                                title="Refresh products"
                                className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 shadow-sm transition hover:border-sky-300 hover:bg-sky-50 hover:text-sky-600 disabled:cursor-not-allowed disabled:opacity-50"
                            >
                                <RefreshCw
                                    size={15}
                                    className={loading ? "animate-spin" : ""}
                                />
                            </button>
                        </motion.div>
                    </div>
                </motion.header>

                {/* NOTIFICATIONS */}
                <AnimatePresence>
                    {successMessage && (
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="mb-5 rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-xs font-semibold text-emerald-700"
                        >
                            {successMessage}
                        </motion.div>
                    )}
                </AnimatePresence>

                <AnimatePresence>
                    {error && (
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="mb-5 flex items-start gap-3 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-xs font-semibold text-red-700"
                        >
                            <AlertCircle size={17} className="mt-0.5 shrink-0" />
                            <div className="flex-1">
                                <p>{error}</p>
                                <button
                                    type="button"
                                    onClick={fetchProducts}
                                    className="mt-2 font-bold underline"
                                >
                                    Try again
                                </button>
                            </div>
                            <button type="button" onClick={() => setError("")}>
                                <X size={15} />
                            </button>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* METRICS (DYNAMICALLY DERIVED FROM DATABASE CATEGORIES) */}
                <motion.section
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="mb-5 grid grid-cols-1 gap-3 min-[480px]:grid-cols-2 lg:grid-cols-4"
                >
                    {metrics.map((metric, index) => {
                        const Icon = metric.icon;
                        return (
                            <motion.div
                                key={index}
                                variants={itemVariants}
                                whileHover={{ y: -4 }}
                                className="rounded-2xl border border-white/90 bg-white/85 p-4 shadow-lg shadow-sky-900/5 backdrop-blur-xl sm:p-5"
                            >
                                <div className="flex items-start justify-between">
                                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 sm:text-xs">
                                        {metric.title}
                                    </span>
                                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-sky-50 text-sky-600">
                                        <Icon size={17} />
                                    </div>
                                </div>
                                <div className="mt-4 flex items-end justify-between gap-2">
                                    <span className="text-2xl font-extrabold text-slate-900">
                                        {metric.value}
                                    </span>
                                    <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-600">
                                        <ArrowUpRight size={13} />
                                        {metric.change}
                                    </span>
                                </div>
                                <p className="mt-1 text-[10px] text-slate-500 sm:text-xs">
                                    {metric.subtitle}
                                </p>
                            </motion.div>
                        );
                    })}
                </motion.section>

                {/* CATEGORY TABS SELECTOR */}
                <motion.section
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-5 rounded-2xl border border-white/90 bg-white/80 p-3 shadow-lg shadow-sky-900/5 backdrop-blur-xl"
                >
                    <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
                        <div className="flex gap-2 overflow-x-auto pb-1">
                            {categoryTabs.map((tab) => {
                                const Icon = tab.icon;
                                const count = getCategoryCount(tab.name);
                                const isActive = activeCategory === tab.name;

                                return (
                                    <button
                                        key={tab.name}
                                        type="button"
                                        onClick={() => handleCategoryChange(tab.name)}
                                        className={`flex shrink-0 items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-bold transition ${isActive
                                            ? "bg-sky-600 text-white shadow-md shadow-sky-600/20"
                                            : "bg-slate-50 text-slate-500 hover:bg-sky-50 hover:text-sky-700"
                                            }`}
                                    >
                                        <Icon size={15} />
                                        <span>{tab.label}</span>
                                        <span
                                            className={`rounded-full px-1.5 py-0.5 text-[9px] ${isActive
                                                ? "bg-white/20 text-white"
                                                : "bg-slate-200 text-slate-500"
                                                }`}
                                        >
                                            {count}
                                        </span>
                                    </button>
                                );
                            })}
                        </div>

                        <div className="shrink-0 text-xs text-slate-500">
                            <span className="font-bold text-slate-900">
                                {filteredProducts.length}
                            </span>{" "}
                            pricing records
                        </div>
                    </div>
                </motion.section>

                {/* TABLE CARD */}
                <motion.section
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.15 }}
                    className="min-w-0 rounded-3xl border border-white/90 bg-white/85 p-4 shadow-xl shadow-sky-900/5 backdrop-blur-xl sm:p-6"
                >
                    {/* TABLE BAR */}
                    <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                        <div>
                            <div className="flex items-center gap-2">
                                <Package size={18} className="text-sky-600" />
                                <h2 className="text-sm font-extrabold uppercase tracking-wider text-slate-900 sm:text-base">
                                    {getCategoryTitle()}
                                </h2>
                            </div>
                            <p className="mt-1 text-[11px] text-slate-500 sm:text-xs">
                                Prices include applicable GST.
                            </p>
                        </div>

                        <button
                            type="button"
                            onClick={() => setShowFilters((prev) => !prev)}
                            className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-bold text-slate-600 transition hover:border-sky-300 hover:text-sky-600"
                        >
                            <Filter size={14} />
                            Filters
                            <ChevronDown
                                size={14}
                                className={`transition ${showFilters ? "rotate-180" : ""}`}
                            />
                        </button>
                    </div>

                    {/* EXPANDABLE FILTER ROW */}
                    {showFilters && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            className="mb-5 rounded-2xl border border-slate-200 bg-slate-50 p-3"
                        >
                            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                                <div className="relative">
                                    <Search
                                        size={15}
                                        className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                                    />
                                    <input
                                        value={search}
                                        onChange={(e) => setSearch(e.target.value)}
                                        placeholder="Search product or structure..."
                                        className="w-full rounded-xl border border-slate-200 bg-white py-2.5 pl-9 pr-3 text-xs outline-none transition focus:border-sky-400 focus:ring-2 focus:ring-sky-100"
                                    />
                                </div>

                                <select
                                    value={structureFilter}
                                    onChange={(e) => setStructureFilter(e.target.value)}
                                    className="rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-xs font-medium outline-none focus:border-sky-400"
                                >
                                    {structures.map((s) => (
                                        <option key={s} value={s}>
                                            {s}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </motion.div>
                    )}

                    {!showFilters && (
                        <div className="mb-4 flex flex-col gap-3 sm:flex-row">
                            <div className="relative flex-1">
                                <Search
                                    size={15}
                                    className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                                />
                                <input
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    placeholder="Search pricing..."
                                    className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 pl-9 pr-3 text-xs outline-none transition focus:border-sky-400 focus:bg-white"
                                />
                            </div>
                        </div>
                    )}

                    {/* TABLE BODY / LOADING */}
                    {loading ? (
                        <div className="flex min-h-[300px] items-center justify-center">
                            <div className="text-center">
                                <Loader2 size={32} className="mx-auto animate-spin text-sky-600" />
                                <p className="mt-3 text-sm font-bold text-slate-600">
                                    Loading solar products...
                                </p>
                                <p className="mt-1 text-xs text-slate-400">
                                    Fetching pricing from server
                                </p>
                            </div>
                        </div>
                    ) : (
                        <>
                            <div className="-mx-4 overflow-x-auto px-4 sm:-mx-6 sm:px-6">
                                <table className="w-full min-w-[950px] border-collapse text-left">
                                    <thead>
                                        <tr className="border-b border-slate-200 text-[10px] uppercase tracking-wider text-slate-400">
                                            <th className="px-3 pb-3 font-bold">Product</th>
                                            <th className="px-3 pb-3 font-bold">DC Capacity</th>
                                            <th className="px-3 pb-3 font-bold">Inverter</th>
                                            <th className="px-3 pb-3 font-bold">Phase</th>
                                            <th className="px-3 pb-3 font-bold">Structure</th>
                                            <th className="px-3 pb-3 font-bold">MSP</th>
                                            <th className="px-3 pb-3 font-bold">Offer</th>
                                            {activeCategory !== "C&I" && activeCategory !== "Hybrid" && (
                                                <th className="px-3 pb-3 font-bold">Subsidy</th>
                                            )}
                                            <th className="px-3 pb-3 text-right font-bold">Actions</th>
                                        </tr>
                                    </thead>

                                    <tbody className="divide-y divide-slate-100">
                                        <AnimatePresence mode="popLayout">
                                            {filteredProducts.map((item, index) => (
                                                <motion.tr
                                                    key={item.id}
                                                    initial={{ opacity: 0 }}
                                                    animate={{ opacity: 1 }}
                                                    exit={{ opacity: 0, x: -20 }}
                                                    transition={{
                                                        delay: Math.min(index * 0.02, 0.3),
                                                    }}
                                                    className="group transition hover:bg-sky-50/60"
                                                >
                                                    <td className="px-3 py-4">
                                                        <div className="max-w-[220px]">
                                                            <p className="truncate text-xs font-bold text-slate-800">
                                                                {item.product}
                                                            </p>
                                                            {item.battery && (
                                                                <span className="mt-1 inline-flex rounded-md bg-purple-50 px-2 py-0.5 text-[9px] font-bold text-purple-600">
                                                                    Battery {item.battery}
                                                                </span>
                                                            )}
                                                        </div>
                                                    </td>
                                                    <td className="whitespace-nowrap px-3 py-4">
                                                        <span className="rounded-lg bg-slate-100 px-2 py-1 font-mono text-[10px] font-bold text-slate-700">
                                                            {item.dc} kW
                                                        </span>
                                                    </td>
                                                    <td className="whitespace-nowrap px-3 py-4 text-xs font-semibold text-slate-700">
                                                        {item.inverter}
                                                    </td>
                                                    <td className="px-3 py-4">
                                                        <span className="rounded-full bg-blue-50 px-2 py-1 text-[10px] font-bold text-blue-700">
                                                            {item.phase}-Phase
                                                        </span>
                                                    </td>
                                                    <td className="px-3 py-4">
                                                        <span className="inline-block max-w-[170px] text-[10px] font-medium leading-relaxed text-slate-600">
                                                            {item.structure}
                                                        </span>
                                                    </td>
                                                    <td className="whitespace-nowrap px-3 py-4">
                                                        <div className="text-[11px] font-bold text-slate-400 line-through">
                                                            {formatINR(item.maxPrice)}
                                                        </div>
                                                    </td>
                                                    <td className="whitespace-nowrap px-3 py-4">
                                                        <div className="text-xs font-extrabold text-sky-700">
                                                            {formatINR(item.offer)}
                                                        </div>
                                                    </td>
                                                    {activeCategory !== "C&I" && activeCategory !== "Hybrid" && (
                                                        <td className="whitespace-nowrap px-3 py-4">
                                                            <span className="text-[11px] font-bold text-emerald-600">
                                                                {formatINR(item.subsidy)}
                                                            </span>
                                                        </td>
                                                    )}
                                                    <td className="px-3 py-4">
                                                        <div className="flex items-center justify-end gap-2">
                                                            <button
                                                                type="button"
                                                                onClick={() => handleEdit(item)}
                                                                aria-label="Edit Price"
                                                                className="group/action relative flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-600 shadow-sm transition hover:border-sky-300 hover:bg-sky-50 hover:text-sky-600"
                                                            >
                                                                <Pencil size={14} />
                                                                <span className="pointer-events-none absolute bottom-full right-0 z-20 mb-2 whitespace-nowrap rounded-md bg-slate-900 px-2.5 py-1.5 text-[10px] font-semibold text-white opacity-0 shadow-lg transition-opacity group-hover/action:opacity-100">
                                                                    Edit Price
                                                                </span>
                                                            </button>

                                                            <button
                                                                type="button"
                                                                onClick={() => setDeletingProduct(item)}
                                                                aria-label="Delete Price"
                                                                className="group/action relative flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-600 shadow-sm transition hover:border-red-300 hover:bg-red-50 hover:text-red-600"
                                                            >
                                                                <Trash2 size={14} />
                                                                <span className="pointer-events-none absolute bottom-full right-0 z-20 mb-2 whitespace-nowrap rounded-md bg-slate-900 px-2.5 py-1.5 text-[10px] font-semibold text-white opacity-0 shadow-lg transition-opacity group-hover/action:opacity-100">
                                                                    Delete Price
                                                                </span>
                                                            </button>
                                                        </div>
                                                    </td>
                                                </motion.tr>
                                            ))}
                                        </AnimatePresence>
                                    </tbody>
                                </table>
                            </div>

                            {filteredProducts.length === 0 && (
                                <div className="py-16 text-center">
                                    <Search className="mx-auto mb-3 text-slate-300" size={30} />
                                    <p className="text-sm font-bold text-slate-600">
                                        No pricing records found
                                    </p>
                                    <p className="mt-1 text-xs text-slate-400">
                                        Try changing your search terms or clearing your filter.
                                    </p>
                                </div>
                            )}
                        </>
                    )}
                </motion.section>
            </motion.main>

            {/* EDIT MODAL */}
            <AnimatePresence>
                {editingProduct && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 p-4 backdrop-blur-sm"
                        onClick={() => !saving && setEditingProduct(null)}
                    >
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            onClick={(e) => e.stopPropagation()}
                            className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-3xl border border-white/80 bg-white p-5 shadow-2xl sm:p-7"
                        >
                            <div className="mb-6 flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-sky-50 text-sky-600">
                                        <Pencil size={17} />
                                    </div>
                                    <div>
                                        <h3 className="text-base font-extrabold text-slate-900">
                                            Edit System Pricing
                                        </h3>
                                        <p className="text-[11px] text-slate-400">
                                            Update system details for {editingProduct.category} category
                                        </p>
                                    </div>
                                </div>
                                <button
                                    type="button"
                                    disabled={saving}
                                    onClick={() => setEditingProduct(null)}
                                    className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-100 text-slate-500 transition hover:bg-slate-200 hover:text-slate-800 disabled:opacity-50"
                                >
                                    <X size={17} />
                                </button>
                            </div>

                            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                <div className="sm:col-span-2">
                                    <label className="mb-1.5 block text-[10px] font-bold uppercase tracking-wider text-slate-500">
                                        Product Title
                                    </label>
                                    <input
                                        value={editForm.product}
                                        onChange={(e) => handleEditChange("product", e.target.value)}
                                        className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-xs font-semibold outline-none transition focus:border-sky-400 focus:bg-white"
                                    />
                                </div>
                                <div>
                                    <label className="mb-1.5 block text-[10px] font-bold uppercase tracking-wider text-slate-500">
                                        Module Count
                                    </label>
                                    <input
                                        type="number"
                                        value={editForm.moduleCount}
                                        onChange={(e) => handleEditChange("moduleCount", e.target.value)}
                                        className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-xs font-semibold outline-none transition focus:border-sky-400 focus:bg-white"
                                    />
                                </div>
                                <div>
                                    <label className="mb-1.5 block text-[10px] font-bold uppercase tracking-wider text-slate-500">
                                        Module Wattage
                                    </label>
                                    <input
                                        type="number"
                                        value={editForm.moduleWattage}
                                        onChange={(e) => handleEditChange("moduleWattage", e.target.value)}
                                        className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-xs font-semibold outline-none transition focus:border-sky-400 focus:bg-white"
                                    />
                                </div>
                                <div>
                                    <label className="mb-1.5 block text-[10px] font-bold uppercase tracking-wider text-slate-500">
                                        DC Capacity (kW)
                                    </label>
                                    <input
                                        type="number"
                                        step="0.01"
                                        value={editForm.dc}
                                        onChange={(e) => handleEditChange("dc", e.target.value)}
                                        className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-xs font-semibold outline-none transition focus:border-sky-400 focus:bg-white"
                                    />
                                </div>
                                <div>
                                    <label className="mb-1.5 block text-[10px] font-bold uppercase tracking-wider text-slate-500">
                                        Inverter Capacity
                                    </label>
                                    <input
                                        value={editForm.inverter}
                                        onChange={(e) => handleEditChange("inverter", e.target.value)}
                                        className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-xs font-semibold outline-none transition focus:border-sky-400 focus:bg-white"
                                    />
                                </div>
                                <div>
                                    <label className="mb-1.5 block text-[10px] font-bold uppercase tracking-wider text-slate-500">
                                        Inverter Capacity 2
                                    </label>
                                    <input
                                        value={editForm.inverterCapacity2}
                                        onChange={(e) => handleEditChange("inverterCapacity2", e.target.value)}
                                        placeholder="Optional"
                                        className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-xs font-semibold outline-none transition focus:border-sky-400 focus:bg-white"
                                    />
                                </div>
                                <div>
                                    <label className="mb-1.5 block text-[10px] font-bold uppercase tracking-wider text-slate-500">
                                        Phase
                                    </label>
                                    <select
                                        value={editForm.phase}
                                        onChange={(e) => handleEditChange("phase", e.target.value)}
                                        className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-xs font-semibold outline-none focus:border-sky-400"
                                    >
                                        <option value="1">1-Phase</option>
                                        <option value="3">3-Phase</option>
                                    </select>
                                </div>
                                <div className="sm:col-span-2">
                                    <label className="mb-1.5 block text-[10px] font-bold uppercase tracking-wider text-slate-500">
                                        Structure
                                    </label>
                                    <select
                                        value={editForm.structure}
                                        onChange={(e) => handleEditChange("structure", e.target.value)}
                                        className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-xs font-semibold outline-none focus:border-sky-400"
                                    >
                                        <option value="">Without Structure</option>
                                        {structures
                                            .filter((item) => item !== "All" && item !== "Without Structure")
                                            .map((s) => (
                                                <option key={s} value={s}>
                                                    {s}
                                                </option>
                                            ))}
                                    </select>
                                </div>
                                <div>
                                    <label className="mb-1.5 block text-[10px] font-bold uppercase tracking-wider text-slate-500">
                                        MSP (₹)
                                    </label>
                                    <input
                                        type="number"
                                        value={editForm.maxPrice}
                                        onChange={(e) => handleEditChange("maxPrice", e.target.value)}
                                        className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-xs font-semibold outline-none focus:border-sky-400 focus:bg-white"
                                    />
                                </div>
                                <div>
                                    <label className="mb-1.5 block text-[10px] font-bold uppercase tracking-wider text-slate-500">
                                        Offer Price (₹)
                                    </label>
                                    <input
                                        type="number"
                                        value={editForm.offer}
                                        onChange={(e) => handleEditChange("offer", e.target.value)}
                                        className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-xs font-semibold outline-none focus:border-sky-400 focus:bg-white"
                                    />
                                </div>
                                {editingProduct.category !== "C&I" && editingProduct.category !== "Hybrid" && (
                                    <div className="sm:col-span-2">
                                        <label className="mb-1.5 block text-[10px] font-bold uppercase tracking-wider text-slate-500">
                                            Subsidy (₹)
                                        </label>
                                        <input
                                            type="number"
                                            value={editForm.subsidy}
                                            onChange={(e) => handleEditChange("subsidy", e.target.value)}
                                            className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-xs font-semibold outline-none focus:border-sky-400 focus:bg-white"
                                        />
                                    </div>
                                )}
                                {editingProduct.category === "Hybrid" && (
                                    <div className="sm:col-span-2">
                                        <label className="mb-1.5 block text-[10px] font-bold uppercase tracking-wider text-slate-500">
                                            Battery Capacity
                                        </label>
                                        <input
                                            value={editForm.battery}
                                            onChange={(e) => handleEditChange("battery", e.target.value)}
                                            placeholder="Example: 10 kWh"
                                            className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-xs font-semibold outline-none focus:border-sky-400 focus:bg-white"
                                        />
                                    </div>
                                )}
                                <div>
                                    <label className="mb-1.5 block text-[10px] font-bold uppercase tracking-wider text-slate-500">
                                        GST Rate (%)
                                    </label>
                                    <input
                                        type="number"
                                        step="0.1"
                                        value={editForm.gstRate}
                                        onChange={(e) => handleEditChange("gstRate", e.target.value)}
                                        className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-xs font-semibold outline-none focus:border-sky-400 focus:bg-white"
                                    />
                                </div>
                                <div>
                                    <label className="mb-1.5 block text-[10px] font-bold uppercase tracking-wider text-slate-500">
                                        Status
                                    </label>
                                    <select
                                        value={editForm.status ? "true" : "false"}
                                        onChange={(e) =>
                                            handleEditChange("status", e.target.value === "true")
                                        }
                                        className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-xs font-semibold outline-none focus:border-sky-400"
                                    >
                                        <option value="true">Active</option>
                                        <option value="false">Inactive</option>
                                    </select>
                                </div>
                            </div>

                            <div className="mt-6 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
                                <button
                                    type="button"
                                    disabled={saving}
                                    onClick={() => setEditingProduct(null)}
                                    className="rounded-xl border border-slate-200 bg-white px-5 py-3 text-xs font-bold text-slate-600 transition hover:bg-slate-50 disabled:opacity-50"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="button"
                                    disabled={saving}
                                    onClick={handleSaveEdit}
                                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-sky-600 px-5 py-3 text-xs font-bold text-white shadow-lg shadow-sky-600/20 transition hover:bg-sky-700 disabled:cursor-not-allowed disabled:opacity-60"
                                >
                                    {saving ? (
                                        <>
                                            <Loader2 size={14} className="animate-spin" />
                                            Saving...
                                        </>
                                    ) : (
                                        <>
                                            <Save size={14} />
                                            Save Changes
                                        </>
                                    )}
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* DELETE MODAL */}
            <AnimatePresence>
                {deletingProduct && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[60] flex items-center justify-center bg-slate-900/40 p-4 backdrop-blur-sm"
                        onClick={() => !deleting && setDeletingProduct(null)}
                    >
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            onClick={(e) => e.stopPropagation()}
                            className="w-full max-w-md rounded-3xl bg-white p-6 shadow-2xl"
                        >
                            <div className="flex items-start gap-4">
                                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-red-50 text-red-600">
                                    <Trash2 size={20} />
                                </div>
                                <div>
                                    <h3 className="text-base font-extrabold text-slate-900">
                                        Delete Product?
                                    </h3>
                                    <p className="mt-1 text-xs leading-relaxed text-slate-500">
                                        Are you sure you want to delete{" "}
                                        <span className="font-bold text-slate-700">
                                            {deletingProduct.product}
                                        </span>
                                        ? This will remove the complete product from the database.
                                    </p>
                                </div>
                            </div>

                            <div className="mt-6 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
                                <button
                                    type="button"
                                    disabled={deleting}
                                    onClick={() => setDeletingProduct(null)}
                                    className="rounded-xl border border-slate-200 bg-white px-5 py-3 text-xs font-bold text-slate-600 transition hover:bg-slate-50 disabled:opacity-50"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="button"
                                    disabled={deleting}
                                    onClick={handleDelete}
                                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-red-600 px-5 py-3 text-xs font-bold text-white shadow-lg shadow-red-600/20 transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-60"
                                >
                                    {deleting ? (
                                        <>
                                            <Loader2 size={14} className="animate-spin" />
                                            Deleting...
                                        </>
                                    ) : (
                                        <>
                                            <Trash2 size={14} />
                                            Delete
                                        </>
                                    )}
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}