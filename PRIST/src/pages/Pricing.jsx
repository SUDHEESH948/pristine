import React, { useMemo, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Search,
    SlidersHorizontal,
    ChevronDown,
    X,
    Zap,
    BatteryCharging,
    Building2,
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
// BRAND COLORS
// =========================================================

const PRIMARY = "#0284c7";
const DARK = "#0B253A";
const SUNLIGHT = "#F5B84A";

const DISPLAY_FONT =
    "'Archivo Expanded', 'Plus Jakarta Sans', system-ui, sans-serif";

// =========================================================
// HERO WORD ANIMATION
// =========================================================

const wordVariants = {
    hidden: {},
    visible: {
        transition: {
            staggerChildren: 0.09,
            delayChildren: 0.5,
        },
    },
};

const wordItem = {
    hidden: {
        opacity: 0,
        y: 24,
    },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.55,
            ease: "easeOut",
        },
    },
};

// =========================================================
// PRICING DATA
// =========================================================

const STRING_PRICING = [
    {
        modules: 17,
        product: "SPG System 9.86 kW",
        dc: 9.86,
        inverter: 10,
        phase: 3,
        structure: "Without Structure",
        max: 575319,
        offer: 35319,
        price: 540000,
        subsidy: 78000,
    },
    {
        modules: 17,
        product: "SPG System 9.86 kW",
        dc: 9.86,
        inverter: 10,
        phase: 3,
        structure: "Additional Work Above RCC",
        max: 619319,
        offer: 35319,
        price: 584000,
        subsidy: 78000,
    },
    {
        modules: 17,
        product: "SPG System 9.86 kW",
        dc: 9.86,
        inverter: 10,
        phase: 3,
        structure: "Additional Work Above Sheet Roof",
        max: 635319,
        offer: 35319,
        price: 600000,
        subsidy: 78000,
    },
    {
        modules: 17,
        product: "SPG System 9.86 kW",
        dc: 9.86,
        inverter: 10,
        phase: 3,
        structure: "RCC Ballast",
        max: 611819,
        offer: 35319,
        price: 576500,
        subsidy: 78000,
    },
    {
        modules: 17,
        product: "SPG System 9.86 kW",
        dc: 9.86,
        inverter: 10,
        phase: 3,
        structure: "Sheetroof - Shortrail",
        max: 583319,
        offer: 35319,
        price: 548000,
        subsidy: 78000,
    },
    {
        modules: 17,
        product: "SPG System 9.86 kW",
        dc: 9.86,
        inverter: 10,
        phase: 3,
        structure: "L- Angle Without Ballast",
        max: 600319,
        offer: 35319,
        price: 565000,
        subsidy: 78000,
    },
];

const MICRO_BASE = [
    {
        modules: 4,
        dc: 2.24,
        phase: 1,
        base: 250000,
        max: 258000,
        subsidy: 57600,
    },
    {
        modules: 6,
        dc: 3.36,
        phase: 1,
        base: 320000,
        max: 330000,
        subsidy: 75840,
    },
    {
        modules: 9,
        dc: 5.04,
        phase: 1,
        base: 476000,
        max: 491000,
        subsidy: 78000,
    },
    {
        modules: 9,
        dc: 5.04,
        phase: 3,
        base: 487000,
        max: 502000,
        subsidy: 78000,
    },
    {
        modules: 14,
        dc: 7.84,
        phase: 3,
        base: 683000,
        max: 703000,
        subsidy: 78000,
    },
    {
        modules: 18,
        dc: 10.08,
        phase: 3,
        base: 823000,
        max: 843000,
        subsidy: 78000,
    },
];

const MICRO_STRUCTURES = [
    {
        name: "Without Structure",
        extra: 0,
    },
    {
        name: "RCC Ballast",
        extra: 9000,
    },
    {
        name: "Sheetroof - Shortrail",
        extra: 3000,
    },
    {
        name: "L- Angle Without Ballast",
        extra: 6000,
    },
    {
        name: "Additional Work Above RCC",
        extra: 17500,
    },
    {
        name: "Additional Work Above Sheet Roof",
        extra: 27500,
    },
];

const MICRO_PRICING = MICRO_BASE.flatMap((item) =>
    MICRO_STRUCTURES.map((structure) => {
        const price = item.base + structure.extra;
        const max = item.max + structure.extra;

        const offer =
            item.modules <= 6
                ? item.modules === 4
                    ? 8000
                    : 10000
                : item.modules <= 9
                    ? 15000
                    : 20000;

        return {
            modules: item.modules,
            product: `SPG System ${item.dc.toFixed(2)} kW`,
            dc: item.dc,
            inverter: item.dc,
            phase: item.phase,
            structure: structure.name,
            max,
            offer,
            price,
            subsidy: item.subsidy,
        };
    })
);

const HYBRID_PRICING = [
    {
        modules: 34,
        product: "20.40 kWp Hybrid Solar System",
        dc: 20.4,
        inverter: 20,
        battery: 40,
        phase: 3,
        structure: "Without Structure",
        max: 2195455,
        offer: 120000,
        price: 2075455,
    },
    {
        modules: 34,
        product: "20.40 kWp Hybrid Solar System",
        dc: 20.4,
        inverter: 20,
        battery: 40,
        phase: 3,
        structure: "RCC Ballast",
        max: 2265283,
        offer: 120000,
        price: 2145283,
    },
    {
        modules: 34,
        product: "20.40 kWp Hybrid Solar System",
        dc: 20.4,
        inverter: 20,
        battery: 40,
        phase: 3,
        structure: "Sheetroof - Shortrail",
        max: 2215706,
        offer: 120000,
        price: 2095706,
    },
    {
        modules: 34,
        product: "20.40 kWp Hybrid Solar System",
        dc: 20.4,
        inverter: 20,
        battery: 40,
        phase: 3,
        structure: "L- Angle Without Ballast",
        max: 2195526,
        offer: 120000,
        price: 2075526,
    },
];

const CNI_PRICING = [
    [
        334,
        "SPG-160kW/200.4 kWp",
        200.4,
        "80-80-3",
        "RCC BALLAST",
        7321190,
        7136565,
    ],
    [
        334,
        "SPG-160kW/200.4 kWp",
        200.4,
        "80-80-3",
        "SHEET ROOF - SHORTRAIL",
        6732200,
        6564132,
    ],
    [
        334,
        "SPG-160kW/200.4 kWp",
        200.4,
        "80-80-3",
        "WITHOUT STRUCTURE",
        6644753,
        6476685,
    ],
].map((row) => ({
    modules: row[0],
    product: row[1],
    dc: row[2],
    inverter: row[3],
    structure: row[4],
    max: row[5],
    offer: Number(row[5]) - Number(row[6]),
    price: row[6],
}));

// =========================================================
// HELPERS
// =========================================================

const money = (value) =>
    `₹${Number(value || 0).toLocaleString("en-IN")}`;

const allCategories = {
    string: STRING_PRICING,
    micro: MICRO_PRICING,
    hybrid: HYBRID_PRICING,
    cni: CNI_PRICING,
};

// =========================================================
// CATEGORIES
// =========================================================

const CATEGORIES = [
    {
        id: "string",
        title: "Residential String",
        short: "Residential",
        description:
            "High-efficiency DCR systems with central string inverters",
        icon: Sun,
    },
    {
        id: "micro",
        title: "Micro Inverter",
        short: "Micro-Inverter",
        description:
            "Premium Enphase module-level power electronics",
        icon: Zap,
    },
    {
        id: "hybrid",
        title: "Hybrid + Battery",
        short: "Hybrid ESS",
        description:
            "Grid-interactive solar paired with scalable storage systems",
        icon: BatteryCharging,
    },
    {
        id: "cni",
        title: "Commercial & Industrial",
        short: "C&I Utility",
        description:
            "High-capacity commercial installations and rooftop solutions",
        icon: Building2,
    },
];

// =========================================================
// MAIN COMPONENT
// =========================================================

export default function Pricing() {
    const [category, setCategory] = useState("string");
    const [search, setSearch] = useState("");
    const [structure, setStructure] = useState("All");
    const [phase, setPhase] = useState("All");
    const [selectedItem, setSelectedItem] = useState(null);

    // =========================================================
    // SOLAR CALCULATOR STATE
    // =========================================================

    const [monthlyBill, setMonthlyBill] = useState(5000);

    // =========================================================
    // SOLAR CALCULATOR
    // =========================================================

    const solarEstimate = useMemo(() => {
        const electricityRate = 7.5;

        // Estimated monthly electricity units
        const monthlyUnits =
            monthlyBill / electricityRate;

        // Approximate monthly generation per kWp
        const generationPerKw = 110;

        // Required solar capacity
        const calculatedSize =
            monthlyUnits / generationPerKw;

        // Available residential system sizes
        const systemSizes = [
            2.24,
            3.36,
            5.04,
            7.84,
            10.08,
        ];

        // Select next available system size
        const systemSize =
            systemSizes.find(
                (size) => size >= calculatedSize
            ) ||
            systemSizes[
                systemSizes.length - 1
            ];

        // Find matching micro-inverter system
        const matchingSystem =
            MICRO_PRICING.find(
                (item) =>
                    Number(item.dc) ===
                    Number(systemSize) &&
                    item.structure ===
                    "Without Structure"
            );

        // Estimated system cost
        const estimatedCost =
            matchingSystem?.price ||
            Math.round(
                systemSize * 65000
            );

        // Estimated subsidy
        let subsidy = 0;

        if (systemSize <= 2.24) {
            subsidy = 57600;
        } else if (systemSize <= 3.36) {
            subsidy = 75840;
        } else {
            subsidy = 78000;
        }

        // Monthly savings
        const monthlySavings = Math.min(
            Math.round(
                monthlyUnits *
                    electricityRate
            ),
            monthlyBill
        );

        // Net investment
        const netInvestment = Math.max(
            estimatedCost - subsidy,
            0
        );

        return {
            systemSize:
                systemSize.toFixed(2),
            subsidy,
            monthlySavings,
            estimatedCost,
            netInvestment,
        };
    }, [monthlyBill]);

    // =========================================================
    // PREVENT BACKGROUND SCROLL WHEN MODAL OPEN
    // =========================================================

    useEffect(() => {
        if (selectedItem) {
            document.body.style.overflow =
                "hidden";
        } else {
            document.body.style.overflow =
                "unset";
        }

        return () => {
            document.body.style.overflow =
                "unset";
        };
    }, [selectedItem]);

    // =========================================================
    // CURRENT CATEGORY DATA
    // =========================================================

    const currentData =
        allCategories[category] || [];

    // =========================================================
    // STRUCTURE FILTER
    // =========================================================

    const structures = useMemo(() => {
        const values = currentData.map(
            (item) => item.structure
        );

        return [
            "All",
            ...Array.from(
                new Set(values)
            ),
        ];
    }, [currentData]);

    // =========================================================
    // PHASE FILTER
    // =========================================================

    const phases = useMemo(() => {
        const values = currentData
            .map((item) => item.phase)
            .filter(Boolean);

        return [
            "All",
            ...Array.from(
                new Set(
                    values.map(String)
                )
            ),
        ];
    }, [currentData]);

    // =========================================================
    // FILTERED DATA
    // =========================================================

    const filteredData = useMemo(() => {
        return currentData.filter((item) => {
            const query =
                search.toLowerCase().trim();

            const matchesSearch =
                !query ||
                String(item.modules).includes(
                    query
                ) ||
                String(item.dc).includes(
                    query
                ) ||
                item.product
                    ?.toLowerCase()
                    .includes(query) ||
                item.structure
                    ?.toLowerCase()
                    .includes(query);

            const matchesStructure =
                structure === "All" ||
                item.structure === structure;

            const matchesPhase =
                phase === "All" ||
                String(item.phase) ===
                    phase;

            return (
                matchesSearch &&
                matchesStructure &&
                matchesPhase
            );
        });
    }, [
        currentData,
        search,
        structure,
        phase,
    ]);

    // =========================================================
    // CATEGORY CHANGE
    // =========================================================

    const handleCategoryChange = (id) => {
        setCategory(id);
        setSearch("");
        setStructure("All");
        setPhase("All");
    };

    // =========================================================
    // ACTIVE CATEGORY
    // =========================================================

    const activeCategoryMeta =
        CATEGORIES.find(
            (x) => x.id === category
        );

    // =========================================================
    // SCROLL TO CATALOG
    // =========================================================

    const scrollToCatalog = () => {
        const el =
            document.getElementById(
                "catalog"
            );

        if (el) {
            el.scrollIntoView({
                behavior: "smooth",
            });
        }
    };

    // =========================================================
    // RENDER
    // =========================================================

    return (
        <main
            className="
                min-h-screen
                bg-[#EAF4FC]
                font-['Plus_Jakarta_Sans',system-ui,sans-serif]
                text-slate-900
                antialiased
                selection:bg-sky-100
                selection:text-sky-900
            "
        >
            {/* =====================================================
                FONTS
            ====================================================== */}

            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Archivo+Expanded:wght@600;700;800&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');

                .font-display {
                    font-family: ${DISPLAY_FONT};
                }

                .scrollbar-none::-webkit-scrollbar {
                    display: none;
                }

                .scrollbar-none {
                    -ms-overflow-style: none;
                    scrollbar-width: none;
                }

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

            {/* =====================================================
                HERO SECTION
            ====================================================== */}

            <section
                className="
                    relative
                    flex
                    min-h-screen
                    min-h-[720px]
                    flex-col
                    justify-between
                    overflow-hidden
                    bg-gradient-to-b
                    from-[#050f1a]
                    via-[#0B253A]
                    to-[#0d2a40]
                    px-6
                    pt-28
                    pb-12
                    sm:px-8
                    lg:px-12
                    lg:pt-32
                    lg:pb-16
                "
            >
                {/* Background Glow */}

                <div
                    className="
                        pointer-events-none
                        absolute
                        -right-24
                        -top-24
                        h-[480px]
                        w-[480px]
                        rounded-full
                        bg-sky-500/10
                        blur-[130px]
                    "
                />

                <div
                    className="
                        pointer-events-none
                        absolute
                        -bottom-40
                        left-1/3
                        h-[420px]
                        w-[420px]
                        rounded-full
                        bg-sky-500/10
                        blur-[140px]
                    "
                />

                {/* Grid */}

                <div
                    className="
                        pointer-events-none
                        absolute
                        inset-0
                        bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)]
                        bg-[size:4rem_4rem]
                        [mask-image:radial-gradient(ellipse_70%_60%_at_50%_0%,#000_65%,transparent_100%)]
                    "
                />

                <div
                    className="
                        relative
                        mx-auto
                        flex
                        w-full
                        max-w-7xl
                        flex-1
                        items-center
                    "
                >
                    <div
                        className="
                            grid
                            w-full
                            items-center
                            gap-12
                            lg:grid-cols-[1fr_430px]
                            lg:gap-16
                        "
                    >
                        {/* =================================================
                            LEFT HERO
                        ================================================== */}

                        <motion.div
                            initial={{
                                opacity: 0,
                                y: 18,
                            }}
                            animate={{
                                opacity: 1,
                                y: 0,
                            }}
                            transition={{
                                duration: 0.65,
                                ease: "easeOut",
                            }}
                            className="max-w-2xl"
                        >
                            <motion.span
                                initial={{
                                    opacity: 0,
                                    y: 10,
                                }}
                                animate={{
                                    opacity: 1,
                                    y: 0,
                                }}
                                transition={{
                                    duration: 0.5,
                                    delay: 0.1,
                                }}
                                className="
                                    font-display
                                    inline-flex
                                    items-center
                                    rounded-full
                                    border
                                    border-sky-400/25
                                    bg-sky-400/10
                                    px-4
                                    py-1.5
                                    text-[11px]
                                    font-semibold
                                    uppercase
                                    tracking-[0.08em]
                                    text-sky-300
                                    backdrop-blur-md
                                "
                            >
                                Kerala rooftop solar ·
                                FY 2026–27
                            </motion.span>

                            <motion.h1
                                variants={wordVariants}
                                initial="hidden"
                                animate="visible"
                                className="
                                    font-display
                                    mt-6
                                    text-3xl
                                    font-bold
                                    uppercase
                                    leading-[1.15]
                                    tracking-[0.01em]
                                    text-white
                                    sm:text-4xl
                                    lg:text-5xl
                                "
                            >
                                {[
                                    "Every",
                                    "watt",
                                    "has",
                                    "a",
                                    "price",
                                    "and",
                                    "a",
                                    "plan",
                                ].map(
                                    (
                                        word,
                                        i
                                    ) => (
                                        <React.Fragment
                                            key={
                                                i
                                            }
                                        >
                                            <motion.span
                                                variants={
                                                    wordItem
                                                }
                                                className="inline-block"
                                            >
                                                {
                                                    word
                                                }
                                            </motion.span>{" "}
                                            {i ===
                                                2 && (
                                                <br />
                                            )}
                                        </React.Fragment>
                                    )
                                )}
                            </motion.h1>

                            <p
                                className="
                                    mt-6
                                    max-w-lg
                                    text-base
                                    font-normal
                                    leading-relaxed
                                    text-slate-300
                                    sm:text-lg
                                "
                            >
                                Compare residential,
                                micro-inverter,
                                hybrid battery,
                                and commercial solar
                                systems, with structured
                                pricing and subsidy
                                schedules laid out
                                plainly, panel by panel.
                            </p>

                            <div className="mt-9 flex flex-wrap items-center gap-4">
                                <motion.button
                                    whileHover={{
                                        scale: 1.03,
                                    }}
                                    whileTap={{
                                        scale: 0.96,
                                    }}
                                    onClick={
                                        scrollToCatalog
                                    }
                                    className="
                                        font-display
                                        rounded-full
                                        bg-[#0284c7]
                                        px-7
                                        py-3.5
                                        text-xs
                                        font-bold
                                        uppercase
                                        tracking-[0.08em]
                                        text-white
                                        shadow-lg
                                        shadow-sky-900/40
                                        transition
                                        hover:bg-[#0369a1]
                                    "
                                >
                                    Browse the catalog
                                </motion.button>

                                <div className="flex items-center gap-2 text-sm text-slate-400">
                                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                                    DBT subsidy included
                                    where eligible
                                </div>
                            </div>
                        </motion.div>

                        {/* =================================================
                            SOLAR CALCULATOR
                        ================================================== */}

                        <motion.div
                            initial={{
                                opacity: 0,
                                x: 35,
                                y: 15,
                            }}
                            animate={{
                                opacity: 1,
                                x: 0,
                                y: 0,
                            }}
                            transition={{
                                duration: 0.7,
                                delay: 0.2,
                                ease: "easeOut",
                            }}
                            className="
                                relative
                                mx-auto
                                w-full
                                max-w-[430px]
                                lg:ml-auto
                            "
                        >
                            {/* Outer Glow */}

                            <div
                                className="
                                    pointer-events-none
                                    absolute
                                    -inset-8
                                    rounded-[3rem]
                                    bg-sky-500/15
                                    blur-3xl
                                "
                            />

                            {/* Card */}

                            <div
                                className="
                                    relative
                                    overflow-hidden
                                    rounded-[28px]
                                    border
                                    border-white/15
                                    bg-white/[0.075]
                                    p-5
                                    shadow-2xl
                                    shadow-black/40
                                    backdrop-blur-2xl
                                    sm:p-6
                                "
                            >
                                {/* Shine */}

                                <div
                                    className="
                                        pointer-events-none
                                        absolute
                                        inset-x-0
                                        top-0
                                        h-px
                                        bg-gradient-to-r
                                        from-transparent
                                        via-white/50
                                        to-transparent
                                    "
                                />

                                {/* Decorative Circle */}

                                <div
                                    className="
                                        pointer-events-none
                                        absolute
                                        -right-20
                                        -top-20
                                        h-48
                                        w-48
                                        rounded-full
                                        bg-sky-400/10
                                        blur-3xl
                                    "
                                />

                                {/* Header */}

                                <div className="relative flex items-start justify-between gap-4">
                                    <div>
                                        <div className="flex items-center gap-2">
                                            <span
                                                className="
                                                    h-2
                                                    w-2
                                                    rounded-full
                                                    bg-emerald-400
                                                    shadow-lg
                                                    shadow-emerald-400/40
                                                "
                                            />

                                            <span
                                                className="
                                                    text-[10px]
                                                    font-bold
                                                    uppercase
                                                    tracking-[0.15em]
                                                    text-sky-300
                                                "
                                            >
                                                Live estimate
                                            </span>
                                        </div>

                                        <h3
                                            className="
                                                mt-2
                                                text-xl
                                                font-bold
                                                tracking-tight
                                                text-white
                                            "
                                        >
                                            Solar Calculator
                                        </h3>

                                        <p className="mt-1 text-xs text-slate-400">
                                            Estimate your
                                            rooftop solar
                                            requirement
                                        </p>
                                    </div>

                                    <div
                                        className="
                                            flex
                                            h-11
                                            w-11
                                            shrink-0
                                            items-center
                                            justify-center
                                            rounded-2xl
                                            border
                                            border-sky-400/20
                                            bg-sky-400/10
                                            text-sky-300
                                        "
                                    >
                                        <Sun
                                            size={21}
                                        />
                                    </div>
                                </div>

                                {/* Bill Slider */}

                                <div className="relative mt-7">
                                    <div className="flex items-end justify-between">
                                        <div>
                                            <p className="text-[11px] font-medium text-slate-400">
                                                Monthly electricity
                                                bill
                                            </p>

                                            <div className="mt-1 flex items-baseline gap-1">
                                                <span className="text-3xl font-black text-white">
                                                    {money(
                                                        monthlyBill
                                                    )}
                                                </span>

                                                <span className="text-[10px] text-slate-500">
                                                    / month
                                                </span>
                                            </div>
                                        </div>

                                        <span
                                            className="
                                                rounded-full
                                                border
                                                border-sky-400/20
                                                bg-sky-400/10
                                                px-2.5
                                                py-1
                                                text-[9px]
                                                font-bold
                                                uppercase
                                                tracking-wider
                                                text-sky-300
                                            "
                                        >
                                            Adjust
                                        </span>
                                    </div>

                                    {/* Range */}

                                    <div className="mt-5">
                                        <input
                                            type="range"
                                            min="1000"
                                            max="30000"
                                            step="500"
                                            value={
                                                monthlyBill
                                            }
                                            onChange={(
                                                e
                                            ) =>
                                                setMonthlyBill(
                                                    Number(
                                                        e
                                                            .target
                                                            .value
                                                    )
                                                )
                                            }
                                            className="
                                                h-1.5
                                                w-full
                                                cursor-pointer
                                                appearance-none
                                                rounded-full
                                                bg-white/10
                                            "
                                        />

                                        <div className="mt-2 flex justify-between text-[9px] font-medium text-slate-500">
                                            <span>
                                                ₹1,000
                                            </span>
                                            <span>
                                                ₹30,000
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                {/* Main Result */}

                                <motion.div
                                    key={
                                        solarEstimate.systemSize
                                    }
                                    initial={{
                                        opacity: 0.5,
                                        scale: 0.98,
                                    }}
                                    animate={{
                                        opacity: 1,
                                        scale: 1,
                                    }}
                                    className="
                                        mt-6
                                        rounded-2xl
                                        border
                                        border-sky-400/15
                                        bg-gradient-to-br
                                        from-sky-400/10
                                        to-white/[0.03]
                                        p-4
                                    "
                                >
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p
                                                className="
                                                    text-[9px]
                                                    font-bold
                                                    uppercase
                                                    tracking-[0.14em]
                                                    text-sky-300
                                                "
                                            >
                                                Recommended system
                                            </p>

                                            <div className="mt-1 flex items-baseline gap-1.5">
                                                <span className="text-3xl font-black text-white">
                                                    {
                                                        solarEstimate.systemSize
                                                    }
                                                </span>

                                                <span className="text-sm font-semibold text-slate-400">
                                                    kWp
                                                </span>
                                            </div>
                                        </div>

                                        <div
                                            className="
                                                flex
                                                h-12
                                                w-12
                                                items-center
                                                justify-center
                                                rounded-2xl
                                                bg-sky-400/10
                                                text-sky-300
                                            "
                                        >
                                            <Zap
                                                size={
                                                    22
                                                }
                                            />
                                        </div>
                                    </div>

                                    <div className="mt-3 h-px bg-white/10" />

                                    <p className="mt-3 text-[10px] leading-relaxed text-slate-400">
                                        Based on your
                                        estimated monthly
                                        electricity
                                        consumption and
                                        available
                                        residential
                                        system sizes.
                                    </p>
                                </motion.div>

                                {/* Stats */}

                                <div className="mt-3 grid grid-cols-2 gap-3">
                                    {/* Subsidy */}

                                    <motion.div
                                        key={`subsidy-${solarEstimate.subsidy}`}
                                        initial={{
                                            opacity: 0.5,
                                        }}
                                        animate={{
                                            opacity: 1,
                                        }}
                                        className="
                                            rounded-2xl
                                            border
                                            border-white/10
                                            bg-black/15
                                            p-4
                                        "
                                    >
                                        <p className="text-[9px] font-bold uppercase tracking-wider text-slate-500">
                                            Est. subsidy
                                        </p>

                                        <p className="mt-2 text-lg font-black text-white">
                                            {money(
                                                solarEstimate.subsidy
                                            )}
                                        </p>

                                        <div className="mt-1 flex items-center gap-1.5">
                                            <CheckCircle2
                                                size={
                                                    11
                                                }
                                                className="text-emerald-400"
                                            />

                                            <span className="text-[9px] text-emerald-300">
                                                Where eligible
                                            </span>
                                        </div>
                                    </motion.div>

                                    {/* Savings */}

                                    <motion.div
                                        key={`saving-${solarEstimate.monthlySavings}`}
                                        initial={{
                                            opacity: 0.5,
                                        }}
                                        animate={{
                                            opacity: 1,
                                        }}
                                        className="
                                            rounded-2xl
                                            border
                                            border-white/10
                                            bg-black/15
                                            p-4
                                        "
                                    >
                                        <p className="text-[9px] font-bold uppercase tracking-wider text-slate-500">
                                            Monthly savings
                                        </p>

                                        <p className="mt-2 text-lg font-black text-white">
                                            {money(
                                                solarEstimate.monthlySavings
                                            )}
                                        </p>

                                        <p className="mt-1 text-[9px] text-emerald-300">
                                            Estimated offset
                                        </p>
                                    </motion.div>
                                </div>

                                {/* Net Investment */}

                                <div
                                    className="
                                        mt-3
                                        flex
                                        items-center
                                        justify-between
                                        rounded-2xl
                                        border
                                        border-emerald-400/10
                                        bg-emerald-400/[0.045]
                                        p-4
                                    "
                                >
                                    <div>
                                        <p className="text-[9px] font-bold uppercase tracking-wider text-slate-500">
                                            Estimated net investment
                                        </p>

                                        <p className="mt-1 text-xl font-black text-white">
                                            {money(
                                                solarEstimate.netInvestment
                                            )}
                                        </p>
                                    </div>

                                    <div className="text-right">
                                        <p className="text-[9px] text-slate-500">
                                            System cost
                                        </p>

                                        <p className="mt-1 text-xs font-bold text-slate-300">
                                            {money(
                                                solarEstimate.estimatedCost
                                            )}
                                        </p>
                                    </div>
                                </div>

                                {/* CTA */}

                                <motion.button
                                    whileHover={{
                                        scale: 1.02,
                                    }}
                                    whileTap={{
                                        scale: 0.97,
                                    }}
                                    onClick={
                                        scrollToCatalog
                                    }
                                    className="
                                        mt-5
                                        flex
                                        w-full
                                        items-center
                                        justify-center
                                        gap-2
                                        rounded-full
                                        bg-[#0284c7]
                                        py-3.5
                                        text-[10px]
                                        font-bold
                                        uppercase
                                        tracking-[0.12em]
                                        text-white
                                        shadow-lg
                                        shadow-sky-900/40
                                        transition
                                        hover:bg-[#0369a1]
                                    "
                                >
                                    Explore matching systems
                                    <ArrowRight
                                        size={14}
                                    />
                                </motion.button>

                                {/* Disclaimer */}

                                <p className="mt-3 text-center text-[8px] leading-relaxed text-slate-500">
                                    Indicative estimate
                                    only. Final system
                                    size, pricing,
                                    subsidy and savings
                                    depend on actual
                                    consumption, site
                                    conditions and
                                    applicable government
                                    guidelines.
                                </p>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* =====================================================
                CATEGORY TABS
            ====================================================== */}

            <section
                id="catalog"
                className="
                    sticky
                    top-0
                    z-40
                    border-b
                    border-slate-200/80
                    bg-white/90
                    shadow-sm
                    backdrop-blur-xl
                "
            >
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="scrollbar-none flex space-x-2 overflow-x-auto py-3.5">
                        {CATEGORIES.map(
                            (item) => {
                                const Icon =
                                    item.icon;

                                const active =
                                    category ===
                                    item.id;

                                return (
                                    <button
                                        key={
                                            item.id
                                        }
                                        onClick={() =>
                                            handleCategoryChange(
                                                item.id
                                            )
                                        }
                                        className={`
                                            font-display
                                            group
                                            relative
                                            flex
                                            min-w-max
                                            items-center
                                            gap-2.5
                                            rounded-xl
                                            px-5
                                            py-2.5
                                            text-xs
                                            font-semibold
                                            uppercase
                                            tracking-[0.05em]
                                            transition-all
                                            duration-200
                                            ${
                                                active
                                                    ? "bg-[#0B253A] text-white shadow-md shadow-slate-900/10"
                                                    : "text-slate-600 hover:bg-slate-100/80 hover:text-slate-900"
                                            }
                                        `}
                                    >
                                        <motion.div
                                            animate={
                                                active
                                                    ? {
                                                          rotate: [
                                                              0,
                                                              -8,
                                                              8,
                                                              0,
                                                          ],
                                                      }
                                                    : {
                                                          rotate: 0,
                                                      }
                                            }
                                            transition={{
                                                duration: 0.5,
                                            }}
                                        >
                                            <Icon
                                                size={
                                                    16
                                                }
                                                className={`
                                                    transition-colors
                                                    ${
                                                        active
                                                            ? "text-sky-400"
                                                            : "text-slate-400 group-hover:text-sky-600"
                                                    }
                                                `}
                                            />
                                        </motion.div>

                                        <span>
                                            {
                                                item.title
                                            }
                                        </span>

                                        {active && (
                                            <motion.div
                                                layoutId="tabPill"
                                                className="
                                                    absolute
                                                    inset-0
                                                    -z-10
                                                    rounded-xl
                                                    bg-[#0B253A]
                                                "
                                                transition={{
                                                    type: "spring",
                                                    stiffness: 380,
                                                    damping: 30,
                                                }}
                                            />
                                        )}
                                    </button>
                                );
                            }
                        )}
                    </div>
                </div>
            </section>

            {/* =====================================================
                CATALOG
            ====================================================== */}

            <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
                <AnimatePresence
                    mode="wait"
                >
                    <motion.div
                        key={category}
                        initial={{
                            opacity: 0,
                            y: 12,
                        }}
                        animate={{
                            opacity: 1,
                            y: 0,
                        }}
                        exit={{
                            opacity: 0,
                            y: -12,
                        }}
                        transition={{
                            duration: 0.25,
                        }}
                    >
                        {/* Header */}

                        <div className="mb-10 flex flex-col justify-between gap-6 md:flex-row md:items-end">
                            <motion.div
                                key={`heading-${category}`}
                                initial={{
                                    opacity: 0,
                                    x: -14,
                                }}
                                animate={{
                                    opacity: 1,
                                    x: 0,
                                }}
                                transition={{
                                    duration: 0.35,
                                    ease: "easeOut",
                                }}
                            >
                                <span className="text-xs font-bold uppercase tracking-widest text-sky-600">
                                    {
                                        activeCategoryMeta?.short
                                    }
                                </span>

                                <h2 className="font-display mt-1 text-2xl font-bold uppercase tracking-[0.01em] text-slate-900 sm:text-3xl">
                                    {
                                        activeCategoryMeta?.title
                                    }{" "}
                                    Catalog
                                </h2>

                                <p className="mt-1 max-w-xl text-sm text-slate-500">
                                    {
                                        activeCategoryMeta?.description
                                    }
                                </p>
                            </motion.div>

                            <div className="rounded-2xl border border-slate-200 bg-white px-4 py-2.5 shadow-sm">
                                <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                                    Available Systems
                                </p>

                                <p className="text-lg font-bold text-slate-800">
                                    {
                                        filteredData.length
                                    }

                                    <span className="ml-1 text-xs font-normal text-slate-400">
                                        models listed
                                    </span>
                                </p>
                            </div>
                        </div>

                        {/* Filter Bar */}

                        <div className="mb-8 rounded-2xl border border-slate-200/90 bg-white p-3 shadow-sm">
                            <div className="flex flex-col gap-3 sm:flex-row">
                                {/* Search */}

                                <div className="relative flex-1">
                                    <Search
                                        size={16}
                                        className="
                                            absolute
                                            left-3.5
                                            top-1/2
                                            -translate-y-1/2
                                            text-slate-400
                                        "
                                    />

                                    <input
                                        type="text"
                                        placeholder="Search by kW, module count, or structure..."
                                        value={
                                            search
                                        }
                                        onChange={(
                                            e
                                        ) =>
                                            setSearch(
                                                e
                                                    .target
                                                    .value
                                            )
                                        }
                                        className="
                                            w-full
                                            rounded-xl
                                            border
                                            border-slate-200/80
                                            bg-slate-50/70
                                            py-2.5
                                            pl-10
                                            pr-4
                                            text-sm
                                            text-slate-800
                                            outline-none
                                            transition
                                            placeholder:text-slate-400
                                            focus:border-sky-400
                                            focus:bg-white
                                            focus:ring-2
                                            focus:ring-sky-100
                                        "
                                    />
                                </div>

                                {/* Structure */}

                                <div className="relative min-w-[210px]">
                                    <SlidersHorizontal
                                        size={15}
                                        className="
                                            absolute
                                            left-3.5
                                            top-1/2
                                            -translate-y-1/2
                                            text-slate-400
                                        "
                                    />

                                    <select
                                        value={
                                            structure
                                        }
                                        onChange={(
                                            e
                                        ) =>
                                            setStructure(
                                                e
                                                    .target
                                                    .value
                                            )
                                        }
                                        className="
                                            w-full
                                            appearance-none
                                            rounded-xl
                                            border
                                            border-slate-200/80
                                            bg-slate-50/70
                                            py-2.5
                                            pl-9
                                            pr-9
                                            text-xs
                                            font-semibold
                                            text-slate-700
                                            outline-none
                                            transition
                                            focus:border-sky-400
                                            focus:bg-white
                                            focus:ring-2
                                            focus:ring-sky-100
                                        "
                                    >
                                        {structures.map(
                                            (
                                                item
                                            ) => (
                                                <option
                                                    key={
                                                        item
                                                    }
                                                    value={
                                                        item
                                                    }
                                                >
                                                    {item ===
                                                    "All"
                                                        ? "Structure: All Types"
                                                        : item}
                                                </option>
                                            )
                                        )}
                                    </select>

                                    <ChevronDown
                                        size={14}
                                        className="
                                            pointer-events-none
                                            absolute
                                            right-3
                                            top-1/2
                                            -translate-y-1/2
                                            text-slate-400
                                        "
                                    />
                                </div>

                                {/* Phase */}

                                {phases.length >
                                    2 && (
                                    <div className="relative min-w-[150px]">
                                        <Filter
                                            size={
                                                15
                                            }
                                            className="
                                                absolute
                                                left-3.5
                                                top-1/2
                                                -translate-y-1/2
                                                text-slate-400
                                            "
                                        />

                                        <select
                                            value={
                                                phase
                                            }
                                            onChange={(
                                                e
                                            ) =>
                                                setPhase(
                                                    e
                                                        .target
                                                        .value
                                                )
                                            }
                                            className="
                                                w-full
                                                appearance-none
                                                rounded-xl
                                                border
                                                border-slate-200/80
                                                bg-slate-50/70
                                                py-2.5
                                                pl-9
                                                pr-9
                                                text-xs
                                                font-semibold
                                                text-slate-700
                                                outline-none
                                                transition
                                                focus:border-sky-400
                                                focus:bg-white
                                                focus:ring-2
                                                focus:ring-sky-100
                                            "
                                        >
                                            {phases.map(
                                                (
                                                    item
                                                ) => (
                                                    <option
                                                        key={
                                                            item
                                                        }
                                                        value={
                                                            item
                                                        }
                                                    >
                                                        {item ===
                                                        "All"
                                                            ? "Phase: All"
                                                            : `${item} Phase`}
                                                    </option>
                                                )
                                            )}
                                        </select>

                                        <ChevronDown
                                            size={
                                                14
                                            }
                                            className="
                                                pointer-events-none
                                                absolute
                                                right-3
                                                top-1/2
                                                -translate-y-1/2
                                                text-slate-400
                                            "
                                        />
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* =================================================
                            CARD GRID
                        ================================================== */}

                        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                            {filteredData.map(
                                (
                                    item,
                                    index
                                ) => (
                                    <motion.article
                                        key={`${item.modules}-${item.structure}-${index}`}
                                        initial={{
                                            opacity: 0,
                                            y: 30,
                                        }}
                                        animate={{
                                            opacity: 1,
                                            y: 0,
                                        }}
                                        transition={{
                                            delay:
                                                index *
                                                0.08,
                                            duration: 0.35,
                                        }}
                                        whileHover={{
                                            y: -8,
                                        }}
                                        className="
                                            group
                                            flex
                                            flex-col
                                            justify-between
                                            overflow-hidden
                                            rounded-[28px]
                                            border
                                            border-slate-200/90
                                            bg-white
                                            shadow-sm
                                            transition-all
                                            duration-300
                                            hover:border-sky-300
                                            hover:shadow-2xl
                                            hover:shadow-sky-100
                                        "
                                    >
                                        <div>
                                            {/* Card Header */}

                                            <div className="relative overflow-hidden border-b border-slate-100 bg-[#0B253A] p-5 text-white">
                                                <div
                                                    className="
                                                        pointer-events-none
                                                        absolute
                                                        -right-10
                                                        -top-10
                                                        h-32
                                                        w-32
                                                        rounded-full
                                                        bg-sky-500/20
                                                        blur-3xl
                                                        transition-all
                                                        duration-500
                                                        group-hover:bg-sky-400/30
                                                    "
                                                />

                                                <div className="relative flex items-start justify-between gap-3">
                                                    <div>
                                                        <div className="flex items-center gap-2">
                                                            <span className="inline-flex items-center rounded-md bg-sky-400/10 px-2 py-0.5 text-[11px] font-bold text-sky-300 ring-1 ring-sky-400/20">
                                                                {
                                                                    item.modules
                                                                }{" "}
                                                                Panels
                                                            </span>

                                                            <span className="inline-flex items-center rounded-md bg-white/10 px-2 py-0.5 text-[11px] font-semibold text-slate-300">
                                                                {item.phase
                                                                    ? `${item.phase} Phase`
                                                                    : "3 Phase"}
                                                            </span>
                                                        </div>

                                                        <h3 className="mt-2.5 text-lg font-bold tracking-tight text-white">
                                                            {
                                                                item.product
                                                            }
                                                        </h3>
                                                    </div>

                                                    <motion.div
                                                        animate={{
                                                            y: [
                                                                0,
                                                                -3,
                                                                0,
                                                            ],
                                                        }}
                                                        transition={{
                                                            duration: 3,
                                                            repeat: Infinity,
                                                            ease: "easeInOut",
                                                        }}
                                                        className="
                                                            flex
                                                            h-10
                                                            w-10
                                                            shrink-0
                                                            items-center
                                                            justify-center
                                                            rounded-xl
                                                            bg-sky-400/10
                                                            text-sky-400
                                                            ring-1
                                                            ring-sky-400/20
                                                        "
                                                    >
                                                        {category ===
                                                        "hybrid" ? (
                                                            <BatteryCharging
                                                                size={
                                                                    20
                                                                }
                                                            />
                                                        ) : category ===
                                                          "micro" ? (
                                                            <Zap
                                                                size={
                                                                    20
                                                                }
                                                            />
                                                        ) : (
                                                            <Sun
                                                                size={
                                                                    20
                                                                }
                                                            />
                                                        )}
                                                    </motion.div>
                                                </div>
                                            </div>

                                            {/* Specifications */}

                                            <div className="grid grid-cols-2 gap-px bg-slate-100 text-xs">
                                                <SpecItem
                                                    icon={
                                                        <Cpu />
                                                    }
                                                    label="DC Capacity"
                                                    value={`${item.dc} kWp`}
                                                />

                                                <SpecItem
                                                    icon={
                                                        <Zap />
                                                    }
                                                    label="Inverter"
                                                    value={`${item.inverter} kW`}
                                                />

                                                <div className="col-span-2 flex items-start gap-2.5 bg-white p-3.5">
                                                    <Layers
                                                        size={
                                                            15
                                                        }
                                                        className="mt-0.5 shrink-0 text-sky-500"
                                                    />

                                                    <div className="min-w-0">
                                                        <p className="text-[10px] font-semibold uppercase text-slate-400">
                                                            Mounting
                                                            Structure
                                                        </p>

                                                        <p className="truncate font-bold text-slate-800">
                                                            {
                                                                item.structure
                                                            }
                                                        </p>
                                                    </div>
                                                </div>

                                                {category ===
                                                    "hybrid" &&
                                                    item.battery && (
                                                        <div className="col-span-2 flex items-start gap-2.5 bg-sky-50 p-3.5">
                                                            <Boxes
                                                                size={
                                                                    15
                                                                }
                                                                className="mt-0.5 shrink-0 text-sky-600"
                                                            />

                                                            <div>
                                                                <p className="text-[10px] font-semibold uppercase text-sky-600">
                                                                    Storage
                                                                    Battery
                                                                </p>

                                                                <p className="font-bold text-sky-950">
                                                                    {
                                                                        item.battery
                                                                    }{" "}
                                                                    kWh
                                                                    Lithium
                                                                    Bank
                                                                </p>
                                                            </div>
                                                        </div>
                                                    )}
                                            </div>

                                            {/* Pricing */}

                                            <div className="p-4">
                                                <div className="flex items-center justify-between text-xs text-slate-400">
                                                    <span>
                                                        List
                                                        Price
                                                        (MRP)
                                                    </span>

                                                    <span className="font-mono line-through">
                                                        {money(
                                                            item.max
                                                        )}
                                                    </span>
                                                </div>

                                                <div className="mt-2 flex items-baseline justify-between">
                                                    <div>
                                                        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                                                            Offer
                                                            Price
                                                        </span>

                                                        <p className="text-2xl font-black tracking-tight text-slate-900">
                                                            {money(
                                                                item.price
                                                            )}
                                                        </p>
                                                    </div>

                                                    {item.offer >
                                                        0 && (
                                                        <span className="rounded-md bg-emerald-50 px-2 py-1 text-[11px] font-bold text-emerald-700">
                                                            Save{" "}
                                                            {money(
                                                                item.offer
                                                            )}
                                                        </span>
                                                    )}
                                                </div>

                                                {item.subsidy && (
                                                    <div className="mt-3 flex items-center justify-between rounded-xl bg-emerald-50/70 px-3 py-2 text-xs font-semibold text-emerald-800">
                                                        <span>
                                                            Central
                                                            Govt
                                                            Subsidy
                                                        </span>

                                                        <span className="font-bold text-emerald-700">
                                                            {money(
                                                                item.subsidy
                                                            )}
                                                        </span>
                                                    </div>
                                                )}
                                            </div>
                                        </div>

                                        {/* Card CTA */}

                                        <div className="border-t border-slate-100 bg-slate-50/70 p-4">
                                            <button
                                                onClick={() =>
                                                    setSelectedItem(
                                                        item
                                                    )
                                                }
                                                className="
                                                    group/button
                                                    relative
                                                    flex
                                                    w-full
                                                    items-center
                                                    justify-center
                                                    gap-1.5
                                                    overflow-hidden
                                                    rounded-full
                                                    bg-[#0284c7]
                                                    py-3
                                                    text-xs
                                                    font-bold
                                                    uppercase
                                                    tracking-wider
                                                    text-white
                                                    shadow-lg
                                                    shadow-sky-200
                                                    transition-all
                                                    duration-300
                                                    hover:bg-[#0369a1]
                                                    hover:shadow-xl
                                                    hover:shadow-sky-200
                                                    active:scale-95
                                                "
                                            >
                                                <span>
                                                    View Full
                                                    Specifications
                                                </span>

                                                <ArrowRight
                                                    size={
                                                        14
                                                    }
                                                    className="
                                                        transition-transform
                                                        duration-300
                                                        group-hover/button:translate-x-1
                                                    "
                                                />

                                                <span className="pointer-events-none absolute inset-y-0 -left-10 w-10 -skew-x-12 bg-white/20 transition-transform duration-700 group-hover/button:translate-x-[500px]" />
                                            </button>
                                        </div>
                                    </motion.article>
                                )
                            )}
                        </div>

                        {/* Empty State */}

                        {filteredData.length ===
                            0 && (
                            <div className="rounded-2xl border border-slate-200 bg-white p-16 text-center shadow-sm">
                                <Search
                                    className="mx-auto mb-3 text-slate-300"
                                    size={36}
                                />

                                <h3 className="text-base font-bold text-slate-700">
                                    No solar
                                    configurations
                                    found
                                </h3>

                                <p className="mt-1 text-xs text-slate-400">
                                    Try adjusting
                                    your search
                                    terms or
                                    structure
                                    filters.
                                </p>
                            </div>
                        )}
                    </motion.div>
                </AnimatePresence>
            </section>

            {/* =====================================================
                ASSURANCE
            ====================================================== */}

            <section className="border-t border-slate-200/80 bg-white px-6 py-16 lg:px-12">
                <div className="mx-auto max-w-7xl">
                    <motion.div
                        className="mb-10 max-w-2xl"
                        initial={{
                            opacity: 0,
                            y: 20,
                        }}
                        whileInView={{
                            opacity: 1,
                            y: 0,
                        }}
                        viewport={{
                            once: true,
                            amount: 0.4,
                        }}
                        transition={{
                            duration: 0.5,
                            ease: "easeOut",
                        }}
                    >
                        <span className="text-xs font-bold uppercase tracking-widest text-sky-600">
                            Assurance &
                            Standards
                        </span>

                        <h2 className="font-display mt-1 text-2xl font-bold uppercase tracking-[0.01em] text-slate-900 sm:text-3xl">
                            Engineered for
                            30-Year Performance
                        </h2>

                        <p className="mt-2 text-sm text-slate-500">
                            Every system includes
                            comprehensive compliance
                            testing, tier-1 warranty
                            protection, and
                            standardized installation
                            norms.
                        </p>
                    </motion.div>

                    <motion.div
                        className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{
                            once: true,
                            amount: 0.3,
                        }}
                        variants={{
                            hidden: {},
                            visible: {
                                transition: {
                                    staggerChildren: 0.1,
                                },
                            },
                        }}
                    >
                        <motion.div
                            variants={{
                                hidden: {
                                    opacity: 0,
                                    y: 24,
                                },
                                visible: {
                                    opacity: 1,
                                    y: 0,
                                    transition: {
                                        duration: 0.45,
                                        ease: "easeOut",
                                    },
                                },
                            }}
                        >
                            <InfoCard
                                icon={
                                    <ShieldCheck className="text-sky-500" />
                                }
                                title="Tier-1 Solar Modules"
                                text="12-year manufacturer product warranty with a 30-year linear power performance guarantee."
                            />
                        </motion.div>

                        <motion.div
                            variants={{
                                hidden: {
                                    opacity: 0,
                                    y: 24,
                                },
                                visible: {
                                    opacity: 1,
                                    y: 0,
                                    transition: {
                                        duration: 0.45,
                                        ease: "easeOut",
                                    },
                                },
                            }}
                        >
                            <InfoCard
                                icon={
                                    <Zap className="text-sky-500" />
                                }
                                title="Grid Synchronized"
                                text="High-efficiency certified inverters compliant with international grid code standards."
                            />
                        </motion.div>

                        <motion.div
                            variants={{
                                hidden: {
                                    opacity: 0,
                                    y: 24,
                                },
                                visible: {
                                    opacity: 1,
                                    y: 0,
                                    transition: {
                                        duration: 0.45,
                                        ease: "easeOut",
                                    },
                                },
                            }}
                        >
                            <InfoCard
                                icon={
                                    <Wrench className="text-sky-500" />
                                }
                                title="5-Year Comprehensive O&M"
                                text="Two scheduled preventive maintenance and performance inspection visits per year."
                            />
                        </motion.div>

                        <motion.div
                            variants={{
                                hidden: {
                                    opacity: 0,
                                    y: 24,
                                },
                                visible: {
                                    opacity: 1,
                                    y: 0,
                                    transition: {
                                        duration: 0.45,
                                        ease: "easeOut",
                                    },
                                },
                            }}
                        >
                            <InfoCard
                                icon={
                                    <CheckCircle2 className="text-sky-500" />
                                }
                                title="Statutory Clearance"
                                text="Assistance with KSEB/CEIG approval procedures and net-metering grid connection."
                            />
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            {/* =====================================================
                DETAIL MODAL
            ====================================================== */}

            <AnimatePresence>
                {selectedItem && (
                    <motion.div
                        initial={{
                            opacity: 0,
                        }}
                        animate={{
                            opacity: 1,
                        }}
                        exit={{
                            opacity: 0,
                        }}
                        className="
                            fixed
                            inset-0
                            z-[100]
                            flex
                            items-center
                            justify-center
                            overflow-y-auto
                            bg-slate-950/75
                            p-4
                            pt-20
                            pb-20
                            backdrop-blur-sm
                            sm:pt-24
                        "
                        onClick={() =>
                            setSelectedItem(
                                null
                            )
                        }
                    >
                        <motion.div
                            initial={{
                                opacity: 0,
                                scale: 0.95,
                                y: 20,
                            }}
                            animate={{
                                opacity: 1,
                                scale: 1,
                                y: 0,
                            }}
                            exit={{
                                opacity: 0,
                                scale: 0.95,
                                y: 20,
                            }}
                            transition={{
                                duration: 0.2,
                                ease: "easeOut",
                            }}
                            onClick={(e) =>
                                e.stopPropagation()
                            }
                            className="
                                relative
                                my-auto
                                max-h-[85vh]
                                w-full
                                max-w-xl
                                overflow-y-auto
                                rounded-3xl
                                bg-white
                                shadow-2xl
                                ring-1
                                ring-slate-900/10
                            "
                        >
                            {/* Modal Header */}

                            <div
                                className="
                                    sticky
                                    top-0
                                    z-10
                                    flex
                                    items-start
                                    justify-between
                                    overflow-hidden
                                    border-b
                                    border-slate-800
                                    bg-[#0B253A]
                                    p-6
                                    text-white
                                "
                            >
                                <div
                                    className="
                                        pointer-events-none
                                        absolute
                                        -right-10
                                        -top-10
                                        h-40
                                        w-40
                                        rounded-full
                                        bg-sky-500/20
                                        blur-3xl
                                    "
                                />

                                <div className="relative">
                                    <span
                                        className="
                                            text-[10px]
                                            font-bold
                                            uppercase
                                            tracking-widest
                                            text-sky-400
                                        "
                                    >
                                        System
                                        Specification
                                        Sheet
                                    </span>

                                    <h3
                                        className="
                                            font-display
                                            mt-1
                                            text-lg
                                            font-bold
                                            uppercase
                                            tracking-[0.01em]
                                        "
                                    >
                                        {
                                            selectedItem.product
                                        }
                                    </h3>

                                    <p className="mt-0.5 text-xs text-slate-300">
                                        {
                                            selectedItem.modules
                                        }{" "}
                                        Tier-1 Modules
                                        ·{" "}
                                        {
                                            selectedItem.dc
                                        }{" "}
                                        kWp Output
                                    </p>
                                </div>

                                <button
                                    onClick={() =>
                                        setSelectedItem(
                                            null
                                        )
                                    }
                                    className="
                                        relative
                                        rounded-full
                                        bg-white/10
                                        p-1.5
                                        text-slate-300
                                        transition
                                        hover:bg-sky-400/20
                                        hover:text-white
                                    "
                                    aria-label="Close modal"
                                >
                                    <X
                                        size={
                                            18
                                        }
                                    />
                                </button>
                            </div>

                            {/* Modal Specs */}

                            <div className="grid grid-cols-2 gap-px bg-slate-100 text-xs">
                                <ModalItem
                                    label="DC Array Size"
                                    value={`${selectedItem.dc} kWp`}
                                />

                                <ModalItem
                                    label="Inverter Rating"
                                    value={`${selectedItem.inverter} kW`}
                                />

                                <ModalItem
                                    label="Grid Phase"
                                    value={
                                        selectedItem.phase
                                            ? `${selectedItem.phase} Phase`
                                            : "3 Phase"
                                    }
                                />

                                {selectedItem.battery && (
                                    <ModalItem
                                        label="Battery Storage"
                                        value={`${selectedItem.battery} kWh`}
                                    />
                                )}

                                <ModalItem
                                    label="Mounting Structure"
                                    value={
                                        selectedItem.structure
                                    }
                                    colSpan={
                                        selectedItem.battery
                                            ? 1
                                            : 2
                                    }
                                />
                            </div>

                            {/* Modal Pricing */}

                            <div className="p-6">
                                <div className="rounded-2xl border border-slate-200/80 bg-slate-50 p-5">
                                    <div className="flex items-center justify-between text-xs text-slate-500">
                                        <span>
                                            Base MRP
                                            (Standard
                                            BOM)
                                        </span>

                                        <span className="font-mono text-slate-400 line-through">
                                            {money(
                                                selectedItem.max
                                            )}
                                        </span>
                                    </div>

                                    {selectedItem.offer >
                                        0 && (
                                        <div className="mt-2 flex items-center justify-between text-xs font-semibold text-emerald-600">
                                            <span>
                                                Promotional
                                                Concession
                                            </span>

                                            <span className="font-mono">
                                                -
                                                {money(
                                                    selectedItem.offer
                                                )}
                                            </span>
                                        </div>
                                    )}

                                    <div className="mt-4 border-t border-slate-200 pt-3">
                                        <div className="flex items-end justify-between">
                                            <div>
                                                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                                                    Net
                                                    Payable
                                                </span>

                                                <p className="text-2xl font-black text-slate-900">
                                                    {money(
                                                        selectedItem.price
                                                    )}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Subsidy */}

                                {selectedItem.subsidy && (
                                    <div className="mt-4 rounded-2xl border border-emerald-200 bg-emerald-50/50 p-4">
                                        <span className="text-[10px] font-bold uppercase text-emerald-700">
                                            Estimated
                                            Central DBT
                                            Subsidy
                                        </span>

                                        <p className="mt-0.5 text-xl font-extrabold text-emerald-800">
                                            {money(
                                                selectedItem.subsidy
                                            )}
                                        </p>

                                        <p className="mt-1 text-[11px] text-emerald-700/80">
                                            Credited
                                            directly to
                                            applicant bank
                                            account
                                            post-metering
                                            commissioning.
                                        </p>
                                    </div>
                                )}

                                {/* Proceed */}

                                <div className="mt-6">
                                    <button
                                        onClick={() => {
                                            setSelectedItem(
                                                null
                                            );
                                            window.location.hash =
                                                "contact";
                                        }}
                                        className="
                                            group
                                            flex
                                            w-full
                                            items-center
                                            justify-center
                                            gap-2
                                            rounded-full
                                            bg-[#0284c7]
                                            py-3.5
                                            text-xs
                                            font-bold
                                            uppercase
                                            tracking-wider
                                            text-white
                                            shadow-lg
                                            shadow-sky-200
                                            transition
                                            hover:bg-[#0369a1]
                                            hover:shadow-xl
                                            active:scale-95
                                        "
                                    >
                                        <span>
                                            Proceed with
                                            this
                                            Configuration
                                        </span>

                                        <ArrowRight
                                            size={
                                                14
                                            }
                                            className="
                                                transition-transform
                                                duration-300
                                                group-hover:translate-x-1
                                            "
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
// SPEC ITEM
// =========================================================

function SpecItem({
    icon,
    label,
    value,
}) {
    return (
        <div className="flex items-start gap-2.5 bg-white p-3.5">
            {React.cloneElement(icon, {
                size: 15,
                className:
                    "mt-0.5 shrink-0 text-sky-500",
            })}

            <div>
                <p className="text-[10px] font-semibold uppercase text-slate-400">
                    {label}
                </p>

                <p className="font-bold text-slate-800">
                    {value}
                </p>
            </div>
        </div>
    );
}

// =========================================================
// INFO CARD
// =========================================================

function InfoCard({
    icon,
    title,
    text,
}) {
    return (
        <div
            className="
                rounded-2xl
                border
                border-slate-200/80
                bg-slate-50/50
                p-6
                transition-all
                hover:-translate-y-1
                hover:border-sky-300
                hover:bg-white
                hover:shadow-xl
                hover:shadow-sky-100
            "
        >
            <div className="mb-4 inline-flex rounded-xl bg-white p-3 shadow-sm ring-1 ring-slate-200/80">
                {React.cloneElement(icon, {
                    size: 20,
                })}
            </div>

            <h3 className="text-sm font-bold text-slate-900">
                {title}
            </h3>

            <p className="mt-2 text-xs leading-relaxed text-slate-500">
                {text}
            </p>
        </div>
    );
}

// =========================================================
// MODAL ITEM
// =========================================================

function ModalItem({
    label,
    value,
    colSpan = 1,
}) {
    return (
        <div
            className={`
                bg-white
                p-4
                ${
                    colSpan === 2
                        ? "col-span-2"
                        : "col-span-1"
                }
            `}
        >
            <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                {label}
            </p>

            <p className="mt-1 font-semibold text-slate-800">
                {value}
            </p>
        </div>
    );
}