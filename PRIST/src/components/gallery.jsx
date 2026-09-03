
import React, { useEffect, useRef, useState } from "react";
import { Play, X, ArrowUpRight } from "lucide-react";

import video1 from "../assets/WhatsApp Video 2026-09-03 at 4.21.43 PM.mp4";
import video2 from "../assets/WhatsApp Video 2026-09-03 at 4.21.44 PM.mp4";

// ============================================================
// GALLERY DATA
// ============================================================

const videoItems = [
    {
        id: 1,
        type: "video",
        title: "Solar Installation",
        category: "Installation",
        src: video1,
    },
    {
        id: 2,
        type: "video",
        title: "Solar Project",
        category: "Projects",
        src: video2,
    },
];

const imageItems = [
    {
        id: 3,
        type: "image",
        title: "Rooftop Solar System",
        category: "Projects",
        src: "https://images.unsplash.com/photo-1509391366360-2e959784a276",
    },
    {
        id: 4,
        type: "image",
        title: "Clean Energy",
        category: "Solar Energy",
        src: "https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9",
    },
    {
        id: 5,
        type: "image",
        title: "Residential Solar",
        category: "Residential",
        src: "https://images.unsplash.com/photo-1508514177221-188b1cf16e9d",
    },
    {
        id: 6,
        type: "image",
        title: "Solar Technology",
        category: "Technology",
        src: "https://images.unsplash.com/photo-1509390144018-eeaf65052242",
    },
];

// ============================================================
// GALLERY COMPONENT
// ============================================================

const Gallery = () => {
    const [activeVideo, setActiveVideo] = useState(0);
    const [selectedItem, setSelectedItem] = useState(null);

    const videoRef = useRef(null);

    // ==========================================================
    // AUTOMATICALLY MOVE TO NEXT VIDEO
    // ==========================================================

    const handleVideoEnded = () => {
        setActiveVideo((current) => {
            const next = (current + 1) % videoItems.length;
            return next;
        });
    };

    // ==========================================================
    // AUTOPLAY CURRENT VIDEO
    // ==========================================================

    useEffect(() => {
        if (videoRef.current) {
            videoRef.current.currentTime = 0;

            const playVideo = async () => {
                try {
                    await videoRef.current.play();
                } catch (error) {
                    console.log("Autoplay prevented by browser:", error);
                }
            };

            playVideo();
        }
    }, [activeVideo]);

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

    return (
        <section
            id="gallery"
            className="relative overflow-hidden bg-[#f7f9fc] px-4 py-12 sm:px-6 sm:py-16 md:px-8 lg:px-12 lg:py-20 xl:px-16"
        >
            {/* Background Glows */}
            <div className="pointer-events-none absolute -left-20 top-10 h-56 w-56 rounded-full bg-[#2D6CA1]/10 blur-3xl sm:-left-32 sm:top-20 sm:h-80 sm:w-80" />

            <div className="pointer-events-none absolute -right-20 bottom-10 h-56 w-56 rounded-full bg-[#2D6CA1]/10 blur-3xl sm:-right-32 sm:bottom-20 sm:h-80 sm:w-80" />

            <div className="relative mx-auto max-w-7xl">

                {/* ====================================================
            HEADER
        ==================================================== */}

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
                            Explore our solar installations, innovative solutions,
                            and projects helping homes and commercial spaces adopt
                            cleaner energy.
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

                {/* ====================================================
            VIDEO SECTION
        ==================================================== */}

                <div className="mb-8">
                    <div
                        onClick={() => setSelectedItem(videoItems[activeVideo])}
                        role="button"
                        tabIndex={0}
                        onKeyDown={(e) => {
                            if (e.key === "Enter" || e.key === " ") {
                                e.preventDefault();
                                setSelectedItem(videoItems[activeVideo]);
                            }
                        }}
                        className="group relative aspect-[16/9] max-h-[60vh] w-full cursor-pointer overflow-hidden rounded-3xl bg-black shadow-xl"
                    >
                        {/* Current Video */}

                        <video
                            ref={videoRef}
                            key={videoItems[activeVideo].id}
                            src={videoItems[activeVideo].src}
                            muted
                            autoPlay
                            playsInline
                            onEnded={handleVideoEnded}
                            className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.02]"
                        />

                        {/* Gradient */}

                        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                        {/* Play Icon */}

                        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#2D6CA1]/90 text-white shadow-2xl transition-all duration-300 group-hover:scale-110 group-hover:bg-white group-hover:text-[#2D6CA1] sm:h-20 sm:w-20">
                                <Play
                                    size={30}
                                    className="translate-x-0.5 fill-current"
                                />
                            </div>
                        </div>

                        {/* Video Information */}

                        <div className="absolute bottom-0 left-0 right-0 z-10 p-5 text-white sm:p-7 md:p-8">
                            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-sky-200">
                                {videoItems[activeVideo].category}
                            </span>

                            <div className="mt-2 flex items-center justify-between gap-4">
                                <h3 className="text-xl font-bold sm:text-2xl md:text-3xl">
                                    {videoItems[activeVideo].title}
                                </h3>

                                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white text-[#2D6CA1] shadow-lg sm:h-12 sm:w-12">
                                    <ArrowUpRight size={20} />
                                </div>
                            </div>

                            {/* Video Indicator */}

                            <div className="pointer-events-auto mt-4 flex gap-2">
                                {videoItems.map((video, index) => (
                                    <button
                                        key={video.id}
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            setActiveVideo(index);
                                        }}
                                        className={`h-1.5 rounded-full transition-all duration-300 ${index === activeVideo
                                                ? "w-10 bg-white"
                                                : "w-5 bg-white/40"
                                            }`}
                                        aria-label={`Play ${video.title}`}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* ====================================================
            HORIZONTAL IMAGE CAROUSEL
        ==================================================== */}

                <div className="relative">

                    {/* Heading */}

                    <div className="mb-4 flex items-center justify-between">
                        <div>
                            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#2D6CA1]">
                                Our Projects
                            </p>

                            <h3 className="mt-1 text-xl font-bold text-gray-950 sm:text-2xl">
                                Solar in action
                            </h3>
                        </div>

                        <span className="hidden text-xs text-gray-500 sm:block">
                            Scroll horizontally →
                        </span>
                    </div>

                    {/* Horizontal Scroll */}

                    <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-none sm:gap-5">
                        {imageItems.map((item) => (
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
                                className="group relative h-[220px] min-w-[280px] cursor-pointer overflow-hidden rounded-2xl bg-gray-200 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl sm:h-[260px] sm:min-w-[360px] sm:rounded-3xl md:min-w-[420px]"
                            >
                                {/* Image */}

                                <img
                                    src={item.src}
                                    alt={item.title}
                                    loading="lazy"
                                    className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-105"
                                />

                                {/* Overlay */}

                                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                                {/* Content */}

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

            {/* ======================================================
          LIGHTBOX
      ====================================================== */}

            {selectedItem && (
                <div
                    className="fixed inset-0 z-[10000] flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm"
                    onClick={() => setSelectedItem(null)}
                    role="dialog"
                    aria-modal="true"
                >
                    {/* Close */}

                    <button
                        type="button"
                        onClick={() => setSelectedItem(null)}
                        className="fixed right-4 top-4 z-[10010] flex h-10 w-10 items-center justify-center rounded-full bg-white/20 text-white shadow-xl backdrop-blur-md transition-all duration-200 hover:bg-white hover:text-gray-900 sm:right-6 sm:top-6 sm:h-12 sm:w-12"
                        aria-label="Close modal"
                    >
                        <X size={22} />
                    </button>

                    {/* Media */}

                    <div
                        className="relative inline-flex max-h-[85vh] max-w-[90vw] items-center justify-center overflow-hidden rounded-2xl bg-black"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {selectedItem.type === "video" ? (
                            <video
                                src={selectedItem.src}
                                controls
                                autoPlay
                                playsInline
                                className="block max-h-[85vh] max-w-[90vw] rounded-2xl object-contain shadow-2xl"
                            />
                        ) : (
                            <img
                                src={selectedItem.src}
                                alt={selectedItem.title}
                                className="block max-h-[85vh] max-w-[90vw] rounded-2xl object-contain shadow-2xl"
                            />
                        )}
                    </div>
                </div>
            )}
        </section>
    );
};

export default Gallery;
