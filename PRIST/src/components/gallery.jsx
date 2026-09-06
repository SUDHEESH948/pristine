import React, { useEffect, useRef, useState } from "react";
import { X, ArrowUpRight, ChevronLeft, ChevronRight, ShieldCheck, Award } from "lucide-react";

// ============================================================
// VIDEO IMPORTS
// ============================================================

import video1 from "../assets/WhatsApp Video 2026-09-03 at 4.21.44 PM.mp4";
import video2 from "../assets/WhatsApp Video 2026-09-03 at 11.20.25 AM.mp4";
import video3 from "../assets/WhatsApp Video 2026-09-03 at 4.21.43 PM.mp4";

// ============================================================
// TATA POWER SOLAR PROJECT SHOWCASE DATA
// ============================================================

const imageItems = [
  {
    id: 1,
    title: "5 kW On-Grid Residential Rooftop",
    category: "PM Surya Ghar • Kozhikode",
    specs: "Tata Mono PERC Modules + KSEB Net Meter",
    src: "https://images.unsplash.com/photo-1509391366360-2e959784a276",
  },
  {
    id: 2,
    title: "25 kW Commercial Shed Installation",
    category: "Commercial Solar • Kerala",
    specs: "Tata Power High-Yield Inverters",
    src: "https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9",
  },
  {
    id: 3,
    title: "Pitched-Tile Home Solar Setup",
    category: "Custom Engineering • Kerala",
    specs: "Anodized Heavy Monsoon Mounting",
    src: "https://images.unsplash.com/photo-1508514177221-188b1cf16e9d",
  },
  {
    id: 4,
    title: "10 kW Hybrid Battery Storage Array",
    category: "Zero Grid Outage • Malappuram",
    specs: "Tier-1 Tata Technology & Diagnostics",
    src: "https://images.unsplash.com/photo-1509390144018-eeaf65052242",
  },
];

// ============================================================
// VIDEO DATA
// ============================================================

const videos = [
  { id: 1, src: video1, caption: "Tata Solar Rooftop Drone Inspection - Kerala" },
  { id: 2, src: video2, caption: "KSEB Grid Synchronization & Net-Metering" },
  { id: 3, src: video3, caption: "Customer Handover & 30-Year Warranty Registration" },
];

const TATA_NAVY = "#004B87";

// ============================================================
// GALLERY COMPONENT
// ============================================================

const Gallery = () => {
  const [selectedItem, setSelectedItem] = useState(null);
  const [currentVideo, setCurrentVideo] = useState(0);
  const scrollContainerRef = useRef(null);

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

  const handleVideoEnded = () => {
    setCurrentVideo((prev) => (prev + 1) % videos.length);
  };

  const scrollGallery = (direction) => {
    if (scrollContainerRef.current) {
      const scrollAmount = direction === "left" ? -400 : 400;
      scrollContainerRef.current.scrollBy({
        left: scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <section
      id="gallery"
      className="relative overflow-hidden bg-[#f8fbfe] px-4 py-14 sm:px-6 sm:py-18 md:px-8 lg:px-12 lg:py-24 xl:px-16"
    >
      {/* BACKGROUND GLOWS */}
      <div className="pointer-events-none absolute -left-20 top-10 h-72 w-72 rounded-full bg-[#004B87]/10 blur-3xl sm:-left-32 sm:top-20 sm:h-96 sm:w-96" />
      <div className="pointer-events-none absolute -right-20 bottom-10 h-72 w-72 rounded-full bg-[#004B87]/10 blur-3xl sm:-right-32 sm:bottom-20 sm:h-96 sm:w-96" />

      <div className="relative mx-auto max-w-7xl">
        {/* =================================================
            SECTION HEADER
        ================================================== */}
        <div className="mb-10 flex flex-col justify-between gap-6 sm:mb-12 lg:flex-row lg:items-end">
          <div className="max-w-2xl">
            <div className="mb-2 inline-flex items-center gap-1.5 rounded-full border border-sky-200 bg-sky-50 px-3 py-1 text-xs font-bold uppercase tracking-wider text-[#004B87]">
              <ShieldCheck size={14} />
              Authorised Tata Power Solar Installations
            </div>

            <h2 className="text-3xl font-black leading-tight tracking-tight text-slate-900 sm:text-4xl md:text-5xl">
              Solar in action across{" "}
              <span className="text-[#004B87]">Kerala rooftops.</span>
            </h2>

            <p className="mt-3 text-sm leading-relaxed text-slate-600 sm:text-base">
              Verified turnkey installations deployed by Pristine Horizon using genuine Tata Power
              Solar modules, grid-tied inverters, and official PM Surya Ghar subsidy clearances.
            </p>
          </div>

          <div className="w-full shrink-0 rounded-2xl border border-sky-100 bg-white p-5 shadow-sm sm:w-auto sm:px-6">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-400">
              <Award size={15} className="text-[#004B87]" />
              Dealership Guarantee
            </div>
            <p className="mt-1 text-base font-bold text-[#004B87] sm:text-lg">
              100% Tata Genuine Hardware & 30-Yr Warranty
            </p>
          </div>
        </div>

        {/* =================================================
            FEATURED VIDEO SLIDER (VERTICAL REEL STYLE)
        ================================================== */}
        <div className="mb-14 flex flex-col items-center justify-center">
          <div className="relative aspect-[9/16] w-full max-w-[420px] max-h-[700px] overflow-hidden rounded-3xl border border-slate-800 bg-black shadow-2xl shadow-slate-950/40">
            <div key={currentVideo} className="absolute inset-0">
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

            {/* Video top branding watermark */}
            <div className="pointer-events-none absolute left-4 top-4 z-20 flex items-center gap-2 rounded-full border border-white/20 bg-black/50 px-3 py-1 backdrop-blur-md">
              <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" />
              <span className="text-[10px] font-bold uppercase tracking-wider text-white">
                Live Site Reel • Kerala
              </span>
            </div>

            {/* Video Gradient Overlay */}
            <div className="pointer-events-none absolute inset-0 rounded-3xl bg-gradient-to-t from-black/60 via-transparent to-black/20" />

            {/* Video caption & indicators */}
            <div className="pointer-events-none absolute bottom-5 left-0 right-0 z-20 flex flex-col items-center px-4 text-center">
              <p className="mb-3 text-xs font-semibold text-white drop-shadow-md">
                {videos[currentVideo].caption}
              </p>

              <div className="pointer-events-auto flex items-center gap-2">
                {videos.map((video, index) => (
                  <button
                    key={video.id}
                    type="button"
                    onClick={() => setCurrentVideo(index)}
                    aria-label={`Play site video ${index + 1}`}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      currentVideo === index
                        ? "w-8 bg-sky-400"
                        : "w-2 bg-white/50 hover:bg-white/90"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* =================================================
            PROJECTS CAROUSEL
        ================================================== */}
        <div className="relative">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#004B87]">
                Proven Track Record
              </p>
              <h3 className="mt-1 text-xl font-bold text-slate-900 sm:text-2xl">
                Recent Commissioned Sites
              </h3>
            </div>

            {/* SCROLL BUTTONS */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => scrollGallery("left")}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 shadow-sm transition-all hover:border-[#004B87] hover:text-[#004B87] active:scale-95"
                aria-label="Scroll left"
              >
                <ChevronLeft size={18} />
              </button>

              <button
                type="button"
                onClick={() => scrollGallery("right")}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 shadow-sm transition-all hover:border-[#004B87] hover:text-[#004B87] active:scale-95"
                aria-label="Scroll right"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>

          {/* HORIZONTAL CARDS TRACK */}
          <div
            ref={scrollContainerRef}
            className="flex gap-4 overflow-x-auto pb-4 scroll-smooth scrollbar-none sm:gap-6"
          >
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
                className="group relative h-[280px] min-w-[300px] cursor-pointer overflow-hidden rounded-2xl border border-sky-100 bg-slate-900 shadow-md transition-all duration-300 hover:-translate-y-1 hover:border-[#004B87]/40 hover:shadow-xl sm:h-[340px] sm:min-w-[380px] sm:rounded-3xl md:min-w-[420px]"
              >
                <img
                  src={item.src}
                  alt={item.title}
                  loading="lazy"
                  className="absolute inset-0 h-full w-full object-cover transition duration-700 ease-out group-hover:scale-105"
                />

                {/* Top Tata Badge Tag */}
                <div className="absolute left-4 top-4 z-10">
                  <span className="rounded-full border border-white/20 bg-black/60 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-sky-200 backdrop-blur-md">
                    Tata Certified Array
                  </span>
                </div>

                {/* OVERLAYS */}
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />

                {/* CARD METADATA */}
                <div className="absolute bottom-0 left-0 right-0 z-10 p-5 text-white sm:p-6">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-sky-300 sm:text-xs">
                    {item.category}
                  </span>

                  <h4 className="mt-1 text-base font-bold sm:text-lg">
                    {item.title}
                  </h4>

                  <p className="mt-1 text-xs text-slate-300 sm:text-sm">
                    {item.specs}
                  </p>

                  <div className="mt-3 flex items-center justify-between border-t border-white/15 pt-2.5">
                    <span className="text-[11px] font-medium text-slate-300">
                      Click to view site proof
                    </span>

                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white/90 text-[#004B87] shadow transition-transform duration-300 group-hover:rotate-45 sm:h-9 sm:w-9">
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

          {/* LIGHTBOX CONTAINER */}
          <div
            className="relative flex h-full max-h-[85vh] w-auto max-w-[95vw] flex-col items-center justify-center overflow-hidden rounded-2xl bg-black shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={selectedItem.src}
              alt={selectedItem.title}
              className="h-full w-auto max-h-[75vh] max-w-full rounded-2xl object-contain"
            />
            <div className="w-full bg-slate-900/95 p-3 text-center text-white">
              <p className="text-sm font-bold">{selectedItem.title}</p>
              <p className="text-xs text-sky-400">{selectedItem.specs} • {selectedItem.category}</p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Gallery;