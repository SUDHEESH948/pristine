
import React, { useState, useEffect } from "react";
import { Play, X, ArrowUpRight } from "lucide-react";
import solarVideo from "../assets/WhatsApp Video 2026-09-03 at 11.20.25 AM.mp4";

// ============================================================
// GALLERY DATA
// ============================================================

const galleryItems = [
    {
        id: 1,
        type: "video",
        title: "Solar Installation",
        category: "Installation",
        src: solarVideo,
    },
    {
        id: 2,
        type: "image",
        title: "Rooftop Solar System",
        category: "Projects",
        src: "https://images.unsplash.com/photo-1509391366360-2e959784a276",
    },
    {
        id: 3,
        type: "image",
        title: "Clean Energy",
        category: "Solar Energy",
        src: "https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9",
    },
    {
        id: 4,
        type: "image",
        title: "Residential Solar",
        category: "Residential",
        src: "https://images.unsplash.com/photo-1508514177221-188b1cf16e9d",
    },
    {
        id: 5,
        type: "image",
        title: "Solar Technology",
        category: "Technology",
        src: "https://images.unsplash.com/photo-1509390144018-eeaf65052242",
    },
];

// ============================================================
// CATEGORIES
// ============================================================

const categories = [
    "All",
    "Installation",
    "Projects",
    "Solar Energy",
    "Residential",
    "Technology",
    "Sustainability",
];

// ============================================================
// GALLERY COMPONENT
// ============================================================

const Gallery = () => {
    const [activeCategory, setActiveCategory] = useState("All");
    const [selectedItem, setSelectedItem] = useState(null);

    // ==========================================================
    // PREVENT BACKGROUND SCROLL WHEN MODAL IS OPEN
    // ==========================================================

    useEffect(() => {
        if (selectedItem) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }

        const handleKeyDown = (e) => {
            if (e.key === "Escape") {
                setSelectedItem(null);
            }
        };

        window.addEventListener("keydown", handleKeyDown);

        return () => {
            document.body.style.overflow = "unset";
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [selectedItem]);

    // ==========================================================
    // FILTER ITEMS
    // ==========================================================

    const filteredItems =
        activeCategory === "All"
            ? galleryItems
            : galleryItems.filter(
                (item) => item.category === activeCategory
            );

    return (
        <section
            id="gallery"
            className="relative overflow-hidden bg-[#f7f9fc] px-4 py-14 sm:px-6 sm:py-16 md:px-8 lg:px-12 lg:py-24 xl:px-16"
        >
            {/* =====================================================
          BACKGROUND GLOWS
      ===================================================== */}

            <div className="pointer-events-none absolute -left-20 top-10 h-56 w-56 rounded-full bg-[#2D6CA1]/10 blur-3xl sm:-left-32 sm:top-20 sm:h-80 sm:w-80" />

            <div className="pointer-events-none absolute -right-20 bottom-10 h-56 w-56 rounded-full bg-[#2D6CA1]/10 blur-3xl sm:-right-32 sm:bottom-20 sm:h-80 sm:w-80" />

            <div className="relative mx-auto max-w-7xl">

                {/* ===================================================
            HEADER
        =================================================== */}

                <div className="mb-10 flex flex-col justify-between gap-6 sm:mb-12 lg:flex-row lg:items-end">

                    <div className="max-w-2xl">

                        <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#2D6CA1] sm:mb-3 sm:text-sm">
                            Our Gallery
                        </p>

                        <h2 className="text-3xl font-bold leading-tight tracking-tight text-gray-950 sm:text-4xl md:text-5xl lg:text-6xl">
                            Powering a{" "}
                            <span className="text-[#2D6CA1]">
                                brighter future.
                            </span>
                        </h2>

                        <p className="mt-3 text-sm leading-relaxed text-gray-600 sm:mt-4 sm:text-base lg:text-lg">
                            Explore our solar installations, innovative solutions,
                            and projects helping homes and commercial spaces adopt
                            cleaner energy.
                        </p>

                    </div>

                    {/* =================================================
              COMMITMENT CARD
          ================================================= */}

                    <div className="w-full shrink-0 rounded-2xl border border-[#2D6CA1]/20 bg-white p-5 shadow-sm transition-transform hover:-translate-y-1 hover:shadow-md sm:w-auto sm:px-6">

                        <p className="text-xs font-medium text-gray-500">
                            Our Commitment
                        </p>

                        <p className="mt-1 text-base font-semibold text-[#2D6CA1] sm:text-lg">
                            Clean Energy. Better Tomorrow.
                        </p>

                    </div>
                </div>



                {/* ===================================================
            GALLERY GRID
        =================================================== */}

                <div className="grid grid-cols-1 auto-rows-[280px] gap-4 sm:grid-cols-2 sm:auto-rows-[300px] sm:gap-5 md:auto-rows-[320px] lg:grid-cols-3 lg:gap-6">

                    {filteredItems.map((item) => {

                        const isVideo = item.type === "video";

                        return (

                            <div
                                key={item.id}
                                onClick={() => setSelectedItem(item)}
                                role="button" 
                                tabIndex={0}
                                onKeyDown={(e) => {
                                    if (e.key === "Enter" || e.key === " ") {
                                        e.preventDefault();
                                        setSelectedItem(item);
                                    }
                                }}
                                className={`group relative flex h-full cursor-pointer flex-col justify-end overflow-hidden rounded-2xl bg-gray-200 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl sm:rounded-3xl ${isVideo
                                        ? "row-span-2"
                                        : ""
                                    }`}
                            >

                                {/* =================================================
                    MEDIA
                ================================================= */}

                                {isVideo ? (

                                    <video
                                        src={item.src}
                                        muted
                                        playsInline
                                        preload="metadata"
                                        className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-105"
                                    />

                                ) : (

                                    <img
                                        src={item.src}
                                        alt={item.title}
                                        loading="lazy"
                                        className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-105"
                                    />

                                )}

                                {/* =================================================
                    DARK GRADIENT
                ================================================= */}

                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent" />

                                {/* =================================================
                    PLAY BUTTON
                ================================================= */}

                                {isVideo && (

                                    <div className="absolute inset-0 flex items-center justify-center">

                                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#2D6CA1] text-white shadow-lg transition-all duration-200 group-hover:scale-110 group-hover:bg-white group-hover:text-[#2D6CA1] sm:h-14 sm:w-14">

                                            <Play
                                                className="translate-x-0.5 fill-current"
                                                size={22}
                                            />

                                        </div>

                                    </div>

                                )}

                                {/* =================================================
                    CARD INFORMATION
                ================================================= */}

                                <div className="relative z-10 p-4 text-white sm:p-5 md:p-6">

                                    <span className="text-[10px] font-semibold uppercase tracking-wider text-sky-200 sm:text-xs">
                                        {item.category}
                                    </span>

                                    <div className="mt-1 flex items-center justify-between gap-3">

                                        <h3 className="line-clamp-1 text-base font-semibold sm:text-lg">
                                            {item.title}
                                        </h3>

                                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white/90 text-[#2D6CA1] shadow transition-transform duration-300 group-hover:rotate-45 sm:h-9 sm:w-9">
                                            <ArrowUpRight size={16} />
                                        </div>

                                    </div>

                                </div>

                            </div>

                        );

                    })}

                </div>

                {/* ===================================================
            EMPTY STATE
        =================================================== */}

                {filteredItems.length === 0 && (

                    <div className="rounded-3xl bg-white py-16 text-center shadow-sm">

                        <p className="text-base font-medium text-gray-700 sm:text-lg">
                            No gallery items found.
                        </p>

                        <button
                            type="button"
                            onClick={() => setActiveCategory("All")}
                            className="mt-4 rounded-full bg-[#2D6CA1] px-5 py-2.5 text-xs font-medium text-white transition hover:bg-[#24577f] sm:text-sm"
                        >
                            View All
                        </button>

                    </div>

                )}

            </div>

            {/* =====================================================
          LIGHTBOX / FULLSCREEN MODAL
      ===================================================== */}

            {selectedItem && (

                <div
                    className="fixed inset-0 z-[100000] flex items-center justify-center bg-black/95 px-4 pb-6 pt-20 backdrop-blur-md sm:px-6 sm:pb-8 sm:pt-16"
                    onClick={() => setSelectedItem(null)}
                    role="dialog"
                    aria-modal="true"
                >

                    {/* =================================================
              CLOSE BUTTON
          ================================================= */}

                    <button
                        type="button"
                        onClick={() => setSelectedItem(null)}
                        className="fixed right-4 top-4 z-[100001] flex h-10 w-10 items-center justify-center rounded-full bg-white/20 text-white shadow-xl backdrop-blur-md transition-all duration-200 hover:bg-white hover:text-gray-900 sm:right-6 sm:top-6 sm:h-12 sm:w-12"
                        aria-label="Close modal"
                    >
                        <X size={22} />
                    </button>

                    {/* =================================================
              MEDIA PLAYER
          ================================================= */}

                    <div
                        className={`relative flex items-center justify-center overflow-hidden rounded-2xl shadow-2xl ${selectedItem.type === "video"
                                ? "aspect-[9/16] max-h-[82vh] w-auto max-w-[88vw]"
                                : "max-h-[82vh] max-w-[92vw]"
                            }`}
                        onClick={(e) => e.stopPropagation()}
                    >

                        {selectedItem.type === "video" ? (

                            <video
                                src={selectedItem.src}
                                controls
                                autoPlay
                                playsInline
                                className="h-full w-auto max-h-[82vh] max-w-[88vw] rounded-2xl object-contain shadow-2xl"
                            />

                        ) : (

                            <img
                                src={selectedItem.src}
                                alt={selectedItem.title}
                                className="max-h-[82vh] w-auto max-w-[92vw] rounded-2xl object-contain shadow-2xl"
                            />

                        )}

                    </div>

                </div>

            )}

        </section>
    );
};

export default Gallery;

