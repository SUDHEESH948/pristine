import { useEffect, useRef, useState } from "react";
import {
  X,
  ShieldCheck,
  Award,
  Volume2,
  VolumeX,
  Loader2,
} from "lucide-react";

// =====================================================
// DUMMY IMAGE IMPORT
// KEEPING EXISTING DUMMY DATA
// =====================================================
import hssImage from "../assets/images/hss.png";

// =====================================================
// DUMMY VIDEO IMPORTS
// KEEPING EXISTING DUMMY DATA
// =====================================================
import video1 from "../assets/WhatsApp Video 2026-09-03 at 4.21.44 PM.mp4";
import video2 from "../assets/WhatsApp Video 2026-09-03 at 11.20.25 AM.mp4";
import video3 from "../assets/WhatsApp Video 2026-09-03 at 4.21.43 PM.mp4";

// =====================================================
// API BASE URL
// =====================================================
const API_BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5000";

// =====================================================
// EXISTING DUMMY IMAGE DATA
// DO NOT REMOVE
// =====================================================
const dummyImageItems = [
  {
    id: "dummy-2",
    title: "25 kW Commercial Shed Installation",
    category: "Commercial Solar • Kerala",
    specs: "Tata Power High-Yield Inverters",
    src: "https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9",
  },
  {
    id: "dummy-3",
    title: "Pitched-Tile Home Solar Setup",
    category: "Custom Engineering • Kerala",
    specs: "Anodized Heavy Monsoon Mounting",
    src: "https://images.unsplash.com/photo-1508514177221-188b1cf16e9d",
  },
  {
    id: "dummy-4",
    title: "10 kW Hybrid Battery Storage Array",
    category: "Zero Grid Outage • Malappuram",
    specs: "Tier-1 Tata Technology & Diagnostics",
    src: "https://images.unsplash.com/photo-1509390144018-eeaf65052242",
  },
  {
    id: "dummy-5",
    title: "Pitched-Tile Residential Solar System",
    category: "PM Surya Ghar • Cherukavu, Malappuram",
    specs: "Elevated Structural Array + Tata Power Panels",
    src: hssImage,
  },
];

// =====================================================
// EXISTING DUMMY VIDEO DATA
// DO NOT REMOVE
// =====================================================
const dummyVideos = [
  {
    id: "dummy-video-1",
    src: video1,
    caption: "Tata Solar Rooftop Drone Inspection - Kerala",
  },
  {
    id: "dummy-video-2",
    src: video2,
    caption: "KSEB Grid Synchronization & Net-Metering",
  },
  {
    id: "dummy-video-3",
    src: video3,
    caption: "Customer Handover & 30-Year Warranty Registration",
  },
];

// =====================================================
// GALLERY COMPONENT
// =====================================================
const Gallery = () => {
  // ===================================================
  // STATE
  // ===================================================
  const [selectedItem, setSelectedItem] = useState(null);

  const [currentVideo, setCurrentVideo] = useState(0);

  const [isMuted, setIsMuted] = useState(true);

  const [backendImages, setBackendImages] = useState([]);

  const [backendVideos, setBackendVideos] = useState([]);

  const [isGalleryLoading, setIsGalleryLoading] = useState(true);

  const [galleryError, setGalleryError] = useState("");

  const videoRef = useRef(null);

  // ===================================================
  // FETCH BACKEND GALLERY
  // ===================================================
  useEffect(() => {
    const fetchGallery = async () => {
      try {
        setIsGalleryLoading(true);
        setGalleryError("");

        const response = await fetch(
          `${API_BASE_URL}/api/gallery/public`
        );

        if (!response.ok) {
          throw new Error(
            `Gallery API failed with status ${response.status}`
          );
        }

        const result = await response.json();

        const galleryData = Array.isArray(result?.data)
          ? result.data
          : [];

        // ===============================================
        // BACKEND IMAGES
        // ===============================================
        const apiImages = galleryData
          .filter(
            (item) =>
              item.type === "image" &&
              item.active !== false &&
              item.mediaUrl
          )
          .map((item) => ({
            id: `api-image-${item._id || item.id}`,
            backendId: item._id || item.id,
            title: item.title || "Solar Installation",
            category:
              item.category || "Solar Installation • Kerala",
            specs: item.specs || "",
            description: item.description || "",
            src: item.mediaUrl,
            type: "image",
            isBackend: true,
          }));

        // ===============================================
        // BACKEND VIDEOS
        // ===============================================
        const apiVideos = galleryData
          .filter(
            (item) =>
              item.type === "video" &&
              item.active !== false &&
              item.mediaUrl
          )
          .map((item) => ({
            id: `api-video-${item._id || item.id}`,
            backendId: item._id || item.id,
            src: item.mediaUrl,
            caption:
              item.title ||
              item.description ||
              "Pristine Solar Installation",
            description: item.description || "",
            category: item.category || "",
            specs: item.specs || "",
            type: "video",
            isBackend: true,
          }));

        setBackendImages(apiImages);
        setBackendVideos(apiVideos);
      } catch (error) {
        console.error("Gallery API Error:", error);

        setGalleryError(
          "Unable to load latest gallery items. Showing available gallery content."
        );

        // ===============================================
        // IMPORTANT:
        // DUMMY DATA STILL WORKS IF BACKEND FAILS
        // ===============================================
        setBackendImages([]);
        setBackendVideos([]);
      } finally {
        setIsGalleryLoading(false);
      }
    };

    fetchGallery();
  }, []);

  // ===================================================
  // COMBINE DUMMY + BACKEND IMAGES
  // DUMMY DATA IS NOT REMOVED
  // ===================================================
  const imageItems = [...dummyImageItems, ...backendImages];

  // ===================================================
  // COMBINE DUMMY + BACKEND VIDEOS
  // DUMMY DATA IS NOT REMOVED
  // ===================================================
  const videos = [...dummyVideos, ...backendVideos];

  // ===================================================
  // LIGHTBOX SCROLL LOCK & ESCAPE
  // ===================================================
  useEffect(() => {
    document.body.style.overflow = selectedItem ? "hidden" : "";

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

  // ===================================================
  // VIDEO AUTOPLAY HANDLER
  // ===================================================
  useEffect(() => {
    const videoElement = videoRef.current;

    if (!videoElement || !videos.length) return;

    videoElement.muted = isMuted;

    const playPromise = videoElement.play();

    if (playPromise !== undefined) {
      playPromise.catch(() => {
        if (!isMuted) {
          setIsMuted(true);
          videoElement.muted = true;

          videoElement.play().catch(() => {});
        }
      });
    }
  }, [currentVideo, isMuted, videos.length]);

  // ===================================================
  // VIDEO ENDED
  // ===================================================
  const handleVideoEnded = () => {
    setCurrentVideo((prev) => (prev + 1) % videos.length);
  };

  // ===================================================
  // TOGGLE MUTE
  // ===================================================
  const toggleMute = () => {
    setIsMuted((prev) => !prev);
  };

  // ===================================================
  // CONTINUOUS IMAGE ITEMS
  // ===================================================
  const continuousItems = [...imageItems, ...imageItems];

  // ===================================================
  // RENDER
  // ===================================================
  return (
    <section
      id="gallery"
      className="relative overflow-hidden bg-[#f8fbfe] px-4 py-14 sm:px-6 sm:py-18 md:px-8 lg:px-12 lg:py-24 xl:px-16"
    >
      {/* =================================================
          KEYFRAMES
      ================================================= */}
      <style>{`
        @keyframes continuousScroll {
          0% {
            transform: translateX(0);
          }

          100% {
            transform: translateX(-50%);
          }
        }

        .continuous-scroll-track {
          display: flex;
          width: max-content;
          animation: continuousScroll 32s linear infinite;
        }

        .continuous-scroll-track:hover {
          animation-play-state: paused;
        }
      `}</style>

      {/* =================================================
          BACKGROUND GLOWS
      ================================================= */}
      <div className="pointer-events-none absolute -left-20 top-10 h-72 w-72 rounded-full bg-[#004B87]/10 blur-3xl sm:-left-32 sm:top-20 sm:h-96 sm:w-96" />

      <div className="pointer-events-none absolute -right-20 bottom-10 h-72 w-72 rounded-full bg-[#004B87]/10 blur-3xl sm:-right-32 sm:bottom-20 sm:h-96 sm:w-96" />

      <div className="relative mx-auto max-w-7xl">

        {/* =================================================
            HEADER
        ================================================= */}
        <div className="mb-10 flex flex-col justify-between gap-6 sm:mb-12 lg:flex-row lg:items-end">
          <div className="max-w-2xl">

            <div className="mb-2 inline-flex items-center gap-1.5 rounded-full border border-sky-200 bg-sky-50 px-3 py-1 text-xs font-bold uppercase tracking-wider text-[#004B87]">
              <ShieldCheck size={14} />

              Authorised Tata Power Solar Installations
            </div>

            <h2 className="text-3xl font-black leading-tight tracking-tight text-slate-900 sm:text-4xl md:text-5xl">
              Solar in action across{" "}
              <span className="text-[#004B87]">
                Kerala rooftops.
              </span>
            </h2>

            <p className="mt-3 text-sm leading-relaxed text-slate-600 sm:text-base">
              Verified turnkey installations deployed by Pristine Horizon
              using genuine Tata Power Solar modules, grid-tied inverters,
              and official PM Surya Ghar subsidy clearances.
            </p>

            {/* API STATUS */}
            <div className="mt-3 flex items-center gap-2 text-xs text-slate-400">
              {isGalleryLoading ? (
                <>
                  <Loader2
                    size={13}
                    className="animate-spin"
                  />
                  Loading latest gallery...
                </>
              ) : (
                <>
                  <span className="h-2 w-2 rounded-full bg-emerald-500" />
                  Gallery connected
                  {backendImages.length + backendVideos.length > 0
                    ? ` • ${backendImages.length + backendVideos.length} backend item${
                        backendImages.length + backendVideos.length === 1
                          ? ""
                          : "s"
                      }`
                    : ""}
                </>
              )}
            </div>

            {galleryError && (
              <p className="mt-2 text-xs text-amber-600">
                {galleryError}
              </p>
            )}
          </div>

          <div className="w-full shrink-0 rounded-2xl border border-sky-100 bg-white p-5 shadow-sm sm:w-auto sm:px-6">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-400">
              <Award
                size={15}
                className="text-[#004B87]"
              />

              Dealership Guarantee
            </div>

            <p className="mt-1 text-base font-bold text-[#004B87] sm:text-lg">
              100% Tata Genuine Hardware & 30-Yr Warranty
            </p>
          </div>
        </div>

        {/* =================================================
            VIDEO REEL PLAYER
        ================================================= */}
        <div className="mb-14 flex flex-col items-center justify-center">

          <div className="relative aspect-[9/16] w-full max-w-[420px] max-h-[700px] overflow-hidden rounded-3xl border border-slate-800 bg-black shadow-2xl shadow-slate-950/40">

            {videos.length > 0 && (
              <video
                ref={videoRef}
                key={videos[currentVideo].src}
                src={videos[currentVideo].src}
                autoPlay
                playsInline
                muted={isMuted}
                controls={false}
                preload="metadata"
                onEnded={handleVideoEnded}
                className="h-full w-full rounded-3xl object-cover"
              />
            )}

            {/* TOP LIVE BADGE */}
            <div className="pointer-events-none absolute left-4 top-4 z-20 flex items-center gap-2 rounded-full border border-white/20 bg-black/50 px-3 py-1 backdrop-blur-md">
              <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" />

              <span className="text-[10px] font-bold uppercase tracking-wider text-white">
                Live Site Reel • Kerala
              </span>
            </div>

            {/* BACKEND VIDEO BADGE */}
            {videos[currentVideo]?.isBackend && (
              <div className="pointer-events-none absolute left-4 top-12 z-20">
                <span className="rounded-full border border-emerald-300/30 bg-emerald-500/80 px-2.5 py-1 text-[9px] font-bold uppercase tracking-wider text-white backdrop-blur-md">
                  Latest Upload
                </span>
              </div>
            )}

            {/* MUTE BUTTON */}
            <button
              type="button"
              onClick={toggleMute}
              className="absolute right-4 top-4 z-20 flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-black/50 text-white backdrop-blur-md transition-all hover:bg-black/75"
              aria-label={
                isMuted
                  ? "Unmute video"
                  : "Mute video"
              }
            >
              {isMuted ? (
                <VolumeX size={16} />
              ) : (
                <Volume2 size={16} />
              )}
            </button>

            {/* GRADIENT */}
            <div className="pointer-events-none absolute inset-0 rounded-3xl bg-gradient-to-t from-black/70 via-transparent to-black/20" />

            {/* VIDEO CAPTION */}
            <div className="pointer-events-none absolute bottom-5 left-0 right-0 z-20 flex flex-col items-center px-4 text-center">

              <p className="mb-3 text-xs font-semibold text-white drop-shadow-md">
                {videos[currentVideo]?.caption}
              </p>

              {/* VIDEO NAVIGATION */}
              <div className="pointer-events-auto flex max-w-[90%] flex-wrap items-center justify-center gap-2">

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
            IMAGE SECTION
        ================================================= */}
        <div className="relative">

          <div className="mb-6">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#004B87]">
              Proven Track Record
            </p>

            <h3 className="mt-1 text-xl font-bold text-slate-900 sm:text-2xl">
              Recent Commissioned Sites
            </h3>
          </div>

          {/* IMAGE MARQUEE */}
          <div className="relative w-full overflow-hidden">

            <div className="continuous-scroll-track gap-4 py-2 sm:gap-6">

              {continuousItems.map((item, idx) => (
                <div
                  key={`${item.id}-${idx}`}
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
                  className="group relative h-[280px] w-[300px] shrink-0 cursor-pointer overflow-hidden rounded-2xl border border-sky-100 bg-slate-900 shadow-md transition-all duration-300 hover:-translate-y-1 hover:border-[#004B87]/40 hover:shadow-xl sm:h-[340px] sm:w-[380px] sm:rounded-3xl md:w-[420px]"
                >
                  {/* IMAGE */}
                  <img
                    src={item.src}
                    alt={item.title}
                    loading="lazy"
                    className="absolute inset-0 h-full w-full object-cover transition duration-700 ease-out group-hover:scale-105"
                    onError={(e) => {
                      e.currentTarget.style.display =
                        "none";
                    }}
                  />

                  {/* BACKEND BADGE */}
                  {item.isBackend && (
                    <div className="absolute right-4 top-4 z-10">
                      <span className="rounded-full border border-emerald-300/30 bg-emerald-500/80 px-2.5 py-1 text-[9px] font-bold uppercase tracking-wider text-white backdrop-blur-md">
                        Latest Upload
                      </span>
                    </div>
                  )}

                  {/* DEFAULT BADGE */}
                  {!item.isBackend && (
                    <div className="absolute left-4 top-4 z-10">
                      <span className="rounded-full border border-white/20 bg-black/60 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-sky-200 backdrop-blur-md">
                        Tata Certified Array
                      </span>
                    </div>
                  )}

                  {/* GRADIENT */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />

                  {/* CONTENT */}
                  <div className="absolute bottom-0 left-0 right-0 z-10 p-5 text-white sm:p-6">

                    <span className="text-[10px] font-bold uppercase tracking-wider text-sky-300 sm:text-xs">
                      {item.category}
                    </span>

                    <h4 className="mt-1 text-base font-bold sm:text-lg">
                      {item.title}
                    </h4>

                    {item.specs && (
                      <p className="mt-1 text-xs text-slate-300 sm:text-sm">
                        {item.specs}
                      </p>
                    )}
                  </div>
                </div>
              ))}

            </div>
          </div>
        </div>
      </div>

      {/* =================================================
          IMAGE LIGHTBOX
      ================================================= */}
      {selectedItem && (
        <div
          className="fixed inset-0 z-[99999] flex items-center justify-center bg-black/90 p-4 backdrop-blur-md sm:p-6 md:p-8"
          onClick={() => setSelectedItem(null)}
          role="dialog"
          aria-modal="true"
        >
          {/* CLOSE */}
          <button
            type="button"
            onClick={() => setSelectedItem(null)}
            className="fixed right-4 top-4 z-[100000] flex h-11 w-11 items-center justify-center rounded-full bg-white/20 text-white shadow-xl backdrop-blur-md transition-all duration-200 hover:bg-white hover:text-gray-900 sm:right-6 sm:top-6 sm:h-12 sm:w-12"
            aria-label="Close modal"
          >
            <X size={24} />
          </button>

          <div
            className="relative flex h-full max-h-[85vh] w-auto max-w-[95vw] flex-col items-center justify-center overflow-hidden rounded-2xl bg-black shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* IMAGE */}
            <img
              src={selectedItem.src}
              alt={selectedItem.title}
              className="h-full w-auto max-h-[75vh] max-w-full rounded-2xl object-contain"
            />

            {/* DETAILS */}
            <div className="w-full bg-slate-900/95 p-3 text-center text-white">

              <p className="text-sm font-bold">
                {selectedItem.title}
              </p>

              <p className="text-xs text-sky-400">
                {selectedItem.specs
                  ? `${selectedItem.specs} • `
                  : ""}
                {selectedItem.category}
              </p>

              {selectedItem.description && (
                <p className="mt-1 text-xs text-slate-300">
                  {selectedItem.description}
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Gallery;