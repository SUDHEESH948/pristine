
import React, { useEffect, useRef, useState } from "react";
import { X, ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";

// ============================================================
// VIDEO IMPORTS
// ============================================================

import video1 from "../assets/WhatsApp Video 2026-09-03 at 4.21.44 PM.mp4";
import video2 from "../assets/WhatsApp Video 2026-09-03 at 11.20.25 AM.mp4";

// ============================================================
// GALLERY DATA
// ============================================================

const imageItems = [
    {
        id: 1,
        title: "Rooftop Solar System",
        category: "Projects",
        src: "https://images.unsplash.com/photo-1509391366360-2e959784a276",
    },
    {
        id: 2,
        title: "Clean Energy",
        category: "Solar Energy",
        src: "https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9",
    },
    {
        id: 3,
        title: "Residential Solar",
        category: "Residential",
        src: "https://images.unsplash.com/photo-1508514177221-188b1cf16e9d",
    },
    {
        id: 4,
        title: "Solar Technology",
        category: "Technology",
        src: "https://images.unsplash.com/photo-1509390144018-eeaf65052242",
    },
];

// ============================================================
// VIDEO DATA
// ============================================================

const videos = [
    {
        id: 1,
        src: video1,
    },
    {
        id: 2,
        src: video2,
    },
];

// ============================================================
// GALLERY COMPONENT
// ============================================================

const Gallery = () => {
    const [selectedItem, setSelectedItem] = useState(null);

    const [currentVideo, setCurrentVideo] = useState(0);

    const scrollContainerRef = useRef(null);

    // ============================================================
    // MODAL SCROLL LOCK + ESCAPE KEY
    // ============================================================

    useEffect(() => {
        if (selectedItem) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }

        const handleKeyDown = (e) => {
            if (e.key === "Escape") {
                setSelectedItem(null);
            }
        };

        window.addEventListener("keydown", handleKeyDown);

        return () => {
            document.body.style.overflow = "";
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [selectedItem]);

    // ============================================================
    // AUTOMATIC VIDEO SLIDER
    // Moves to the next video when current video finishes
    // ============================================================

    const handleVideoEnded = () => {
        setCurrentVideo((prev) => (prev + 1) % videos.length);
    };

    // ============================================================
    // HORIZONTAL IMAGE SCROLL
    // ============================================================

    const scrollGallery = (direction) => {
        if (scrollContainerRef.current) {
            const scrollAmount = direction === "left" ? -380 : 380;

            scrollContainerRef.current.scrollBy({
                left: scrollAmount,
                behavior: "smooth",
            });
        }
    };

    // ============================================================
    // RETURN
    // ============================================================

    return (
        <section
            id="gallery"
            className="relative overflow-hidden bg-[#f7f9fc] px-4 py-12 sm:px-6 sm:py-16 md:px-8 lg:px-12 lg:py-20 xl:px-16"
        >
            {/* =====================================================
                BACKGROUND GLOWS
            ====================================================== */}

            <div className="pointer-events-none absolute -left-20 top-10 h-56 w-56 rounded-full bg-[#2D6CA1]/10 blur-3xl sm:-left-32 sm:top-20 sm:h-80 sm:w-80" />

            <div className="pointer-events-none absolute -right-20 bottom-10 h-56 w-56 rounded-full bg-[#2D6CA1]/10 blur-3xl sm:-right-32 sm:bottom-20 sm:h-80 sm:w-80" />

            <div className="relative mx-auto max-w-7xl">

                {/* =================================================
                    HEADER
                ================================================== */}

                <div className="mb-8 flex flex-col justify-between gap-6 sm:mb-10 lg:flex-row lg:items-end">

                    <div className="max-w-2xl">

                        <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#2D6CA1] sm:text-sm">
                            Our Gallery
                        </p>

                        <h2 className="text-3xl font-bold leading-tight tracking-tight text-gray-950 sm:text-4xl md:text-5xl">
                            Powering a{" "}
                            <span className="text-[#2D6CA1]">
                                brighter future.
                            </span>
                        </h2>

                        <p className="mt-3 text-sm leading-relaxed text-gray-600 sm:text-base">
                            Explore our solar installations, innovative
                            solutions, and projects helping homes and
                            commercial spaces adopt cleaner energy.
                        </p>

                    </div>

                    <div className="w-full shrink-0 rounded-2xl border border-[#2D6CA1]/20 bg-white p-5 shadow-sm sm:w-auto sm:px-6">

                        <p className="text-xs font-medium text-gray-500">
                            Our Commitment
                        </p>

                        <p className="mt-1 text-base font-semibold text-[#2D6CA1] sm:text-lg">
                            Clean Energy. Better Tomorrow.
                        </p>

                    </div>

                </div>

                {/* =================================================
                    FEATURED VIDEO SLIDER
                ================================================== */}

                <div className="mb-12 flex justify-center">

                    <div className="relative w-full max-w-[420px] aspect-[9/16] max-h-[700px] overflow-hidden rounded-3xl bg-black shadow-2xl border border-gray-100">

                        {/* VIDEO */}

                        <div
                            key={currentVideo}
                            className="absolute inset-0 animate-video-slide"
                        >

                            <video
                                key={videos[currentVideo].src}
                                src={videos[currentVideo].src}
                                autoPlay
                                muted
                                playsInline
                                controls
                                onEnded={handleVideoEnded}
                                className="h-full w-full rounded-3xl object-cover"
                            />

                        </div>

                        {/* =================================================
                            VIDEO GRADIENT
                        ================================================== */}

                        <div className="pointer-events-none absolute inset-0 rounded-3xl bg-gradient-to-t from-black/20 via-transparent to-transparent" />

                        {/* =================================================
                            VIDEO INDICATORS
                        ================================================== */}

                        <div className="absolute bottom-5 left-1/2 z-20 flex -translate-x-1/2 items-center gap-2">

                            {videos.map((video, index) => (
                                <button
                                    key={video.id}
                                    type="button"
                                    onClick={() => setCurrentVideo(index)}
                                    aria-label={`Play video ${index + 1}`}
                                    className={`h-2 rounded-full transition-all duration-500 ${
                                        currentVideo === index
                                            ? "w-8 bg-white"
                                            : "w-2 bg-white/50 hover:bg-white/80"
                                    }`}
                                />
                            ))}

                        </div>

                    </div>

                </div>

                {/* =================================================
                    IMAGE CAROUSEL
                ================================================== */}

                <div className="relative">

                    {/* HEADER */}

                    <div className="mb-4 flex items-center justify-between">

                        <div>

                            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#2D6CA1]">
                                Our Projects
                            </p>

                            <h3 className="mt-1 text-xl font-bold text-gray-950 sm:text-2xl">
                                Solar in action
                            </h3>

                        </div>

                        {/* =================================================
                            SCROLL BUTTONS
                        ================================================== */}

                        <div className="flex items-center gap-2">

                            <button
                                type="button"
                                onClick={() => scrollGallery("left")}
                                className="flex h-9 w-9 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-700 shadow-sm transition-all hover:border-[#2D6CA1] hover:text-[#2D6CA1] active:scale-95"
                                aria-label="Scroll left"
                            >
                                <ChevronLeft size={18} />
                            </button>

                            <button
                                type="button"
                                onClick={() => scrollGallery("right")}
                                className="flex h-9 w-9 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-700 shadow-sm transition-all hover:border-[#2D6CA1] hover:text-[#2D6CA1] active:scale-95"
                                aria-label="Scroll right"
                            >
                                <ChevronRight size={18} />
                            </button>

                        </div>

                    </div>

                    {/* =================================================
                        HORIZONTAL SCROLL
                    ================================================== */}

                    <div
                        ref={scrollContainerRef}
                        className="flex gap-4 overflow-x-auto pb-4 scroll-smooth scrollbar-none sm:gap-5"
                    >

                        {imageItems.map((item) => (

                            <div
                                key={item.id}
                                onClick={() => setSelectedItem(item)}
                                role="button"
                                tabIndex={0}
                                onKeyDown={(e) => {
                                    if (
                                        e.key === "Enter" ||
                                        e.key === " "
                                    ) {
                                        e.preventDefault();
                                        setSelectedItem(item);
                                    }
                                }}
                                className="group relative h-[240px] min-w-[280px] cursor-pointer overflow-hidden rounded-2xl bg-gray-200 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl sm:h-[300px] sm:min-w-[360px] sm:rounded-3xl md:min-w-[420px]"
                            >

                                <img
                                    src={item.src}
                                    alt={item.title}
                                    loading="lazy"
                                    className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-105"
                                />

                                {/* OVERLAY */}

                                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                                {/* CONTENT */}

                                <div className="absolute bottom-0 left-0 right-0 z-10 p-4 text-white sm:p-5">

                                    <span className="text-[10px] font-semibold uppercase tracking-wider text-sky-200 sm:text-xs">
                                        {item.category}
                                    </span>

                                    <div className="mt-1 flex items-center justify-between gap-3">

                                        <h3 className="text-base font-semibold sm:text-lg">
                                            {item.title}
                                        </h3>

                                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white/90 text-[#2D6CA1] shadow transition-transform duration-300 group-hover:rotate-45 sm:h-9 sm:w-9">

                                            <ArrowUpRight size={16} />

                                        </div>

                                    </div>

                                </div>

                            </div>

                        ))}

                    </div>

                </div>

            </div>

            {/* =====================================================
                LIGHTBOX MODAL
            ====================================================== */}

            {selectedItem && (

                <div
                    className="fixed inset-0 z-[99999] flex items-center justify-center bg-black/90 p-4 backdrop-blur-md sm:p-6 md:p-8"
                    onClick={() => setSelectedItem(null)}
                    role="dialog"
                    aria-modal="true"
                >

                    {/* CLOSE BUTTON */}

                    <button
                        type="button"
                        onClick={() => setSelectedItem(null)}
                        className="fixed right-4 top-4 z-[100000] flex h-11 w-11 items-center justify-center rounded-full bg-white/20 text-white shadow-xl backdrop-blur-md transition-all duration-200 hover:bg-white hover:text-gray-900 sm:right-6 sm:top-6 sm:h-12 sm:w-12"
                        aria-label="Close modal"
                    >
                        <X size={24} />
                    </button>

                    {/* IMAGE */}

                    <div
                        className="relative flex h-full max-h-[82vh] w-auto max-w-[95vw] items-center justify-center overflow-hidden rounded-2xl bg-black shadow-2xl md:max-h-[85vh]"
                        onClick={(e) => e.stopPropagation()}
                    >

                        <img
                            src={selectedItem.src}
                            alt={selectedItem.title}
                            className="h-full w-auto max-h-[82vh] max-w-full rounded-2xl object-contain md:max-h-[85vh]"
                        />

                    </div>

                </div>

            )}

        </section>
    );
};

export default Gallery;
