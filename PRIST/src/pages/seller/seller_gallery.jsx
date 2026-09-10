
import React, {
  useEffect,
  useState,
  useRef,
  useMemo,
  useCallback,
} from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import {
  Upload,
  Image as ImageIcon,
  Video,
  Trash2,
  Edit,
  X,
  Plus,
  Eye,
  EyeOff,
  Loader2,
  CheckCircle2,
  AlertCircle,
  Search,
  Play,
  Maximize2,
  Film,
  FolderOpen,
  FileText,
} from "lucide-react";

const API_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5000";

/* ============================================================
   AUTH
============================================================ */

const getAuthHeaders = () => {
  const token =
    localStorage.getItem("token") ||
    localStorage.getItem("authToken") ||
    localStorage.getItem("accessToken") ||
    sessionStorage.getItem("token") ||
    sessionStorage.getItem("authToken") ||
    sessionStorage.getItem("accessToken");

  return token
    ? {
        Authorization: `Bearer ${token}`,
      }
    : {};
};

/* ============================================================
   CONSTANTS
============================================================ */

const IMAGE_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
];

const VIDEO_TYPES = [
  "video/mp4",
  "video/webm",
  "video/quicktime",
];

const MAX_IMAGE_SIZE = 10 * 1024 * 1024; // 10MB
const MAX_VIDEO_SIZE = 100 * 1024 * 1024; // 100MB

const EMPTY_FORM = {
  title: "",
  category: "",
  specs: "",
  media: null,
  mediaType: "",
  active: true,
};

/* ============================================================
   ANIMATIONS
============================================================ */

const pageVariants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.5,
      staggerChildren: 0.07,
    },
  },
};

const itemVariants = {
  hidden: {
    opacity: 0,
    y: 18,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: "easeOut",
    },
  },
};

const cardVariants = {
  hidden: {
    opacity: 0,
    y: 25,
    scale: 0.97,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.4,
      ease: "easeOut",
    },
  },
};

const modalVariants = {
  hidden: {
    opacity: 0,
    scale: 0.94,
    y: 20,
  },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 260,
      damping: 24,
    },
  },
  exit: {
    opacity: 0,
    scale: 0.95,
    y: 15,
    transition: {
      duration: 0.2,
    },
  },
};

/* ============================================================
   TOAST
============================================================ */

function Toast({ toast, onDone }) {
  useEffect(() => {
    if (!toast) return;

    const timer = setTimeout(() => {
      onDone();
    }, 3200);

    return () => clearTimeout(timer);
  }, [toast, onDone]);

  return (
    <div className="pointer-events-none fixed inset-x-0 top-5 z-[200] flex justify-center px-4">
      <AnimatePresence>
        {toast && (
          <motion.div
            key={toast.id}
            initial={{
              opacity: 0,
              y: -25,
              scale: 0.92,
            }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
            }}
            exit={{
              opacity: 0,
              y: -15,
              scale: 0.95,
            }}
            transition={{
              type: "spring",
              stiffness: 350,
              damping: 25,
            }}
            className={`pointer-events-auto flex items-center gap-3 rounded-xl border px-5 py-3 shadow-2xl backdrop-blur-md ${
              toast.type === "error"
                ? "border-red-300/40 bg-red-600/95 text-white"
                : "border-emerald-300/40 bg-emerald-600/95 text-white"
            }`}
          >
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white/20">
              {toast.type === "error" ? (
                <AlertCircle size={15} />
              ) : (
                <CheckCircle2 size={15} />
              )}
            </span>

            <span className="text-xs font-semibold sm:text-sm">
              {toast.message}
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ============================================================
   MAIN COMPONENT
============================================================ */

const SellerGallery = () => {
  const [gallery, setGallery] = useState([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);

  /* DELETE STATE */
  const [deleting, setDeleting] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);

  const [editing, setEditing] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const [preview, setPreview] = useState(null);
  const [activeMediaModal, setActiveMediaModal] =
    useState(null);

  const [toast, setToast] = useState(null);

  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");

  const fileInputRef = useRef(null);

  const [form, setForm] = useState({
    ...EMPTY_FORM,
  });

  /* ==========================================================
     TOAST
  ========================================================== */

  const showNotification = useCallback(
    (type, message) => {
      setToast({
        id: Date.now(),
        type,
        message,
      });
    },
    []
  );

  /* ==========================================================
     FETCH GALLERY
  ========================================================== */

  const fetchGallery = useCallback(async () => {
    try {
      setLoading(true);

      const response = await axios.get(
        `${API_URL}/api/gallery`,
        {
          headers: getAuthHeaders(),
        }
      );

      if (response.data?.success) {
        setGallery(response.data.data || []);
      } else {
        setGallery([]);
      }
    } catch (error) {
      console.error("Gallery fetch error:", error);

      showNotification(
        "error",
        error.response?.data?.message ||
          "Failed to load gallery"
      );
    } finally {
      setLoading(false);
    }
  }, [showNotification]);

  useEffect(() => {
    fetchGallery();
  }, [fetchGallery]);

  /* ==========================================================
     CLEANUP PREVIEW URL
  ========================================================== */

  useEffect(() => {
    return () => {
      if (preview?.isBlob && preview?.url) {
        URL.revokeObjectURL(preview.url);
      }
    };
  }, [preview]);

  /* ==========================================================
     DELETE MODAL ESCAPE KEY
  ========================================================== */

  useEffect(() => {
    if (!deleteTarget) return;

    const handleKeyDown = (event) => {
      if (
        event.key === "Escape" &&
        !deleting
      ) {
        setDeleteTarget(null);
      }
    };

    document.addEventListener(
      "keydown",
      handleKeyDown
    );

    return () => {
      document.removeEventListener(
        "keydown",
        handleKeyDown
      );
    };
  }, [deleteTarget, deleting]);

  /* ==========================================================
     RESET FORM
  ========================================================== */

  const resetForm = useCallback(() => {
    if (preview?.isBlob && preview?.url) {
      URL.revokeObjectURL(preview.url);
    }

    setForm({
      ...EMPTY_FORM,
    });

    setPreview(null);
    setEditing(null);
    setShowModal(false);

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  }, [preview]);

  /* ==========================================================
     OPEN ADD MODAL
  ========================================================== */

  const openAddModal = () => {
    if (preview?.isBlob && preview?.url) {
      URL.revokeObjectURL(preview.url);
    }

    setEditing(null);

    setForm({
      ...EMPTY_FORM,
    });

    setPreview(null);
    setShowModal(true);

    setTimeout(() => {
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }, 50);
  };

  /* ==========================================================
     HANDLE FORM CHANGE
  ========================================================== */

  const handleChange = (e) => {
    const {
      name,
      value,
      checked,
      type,
    } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]:
        type === "checkbox"
          ? checked
          : value,
    }));
  };

  /* ==========================================================
     FILE VALIDATION
  ========================================================== */

  const validateFile = (file) => {
    if (!file) return false;

    const isImage = IMAGE_TYPES.includes(
      file.type
    );

    const isVideo = VIDEO_TYPES.includes(
      file.type
    );

    if (!isImage && !isVideo) {
      showNotification(
        "error",
        "Only JPG, PNG, WEBP, MP4, WEBM or MOV files are allowed."
      );

      return false;
    }

    if (
      isImage &&
      file.size > MAX_IMAGE_SIZE
    ) {
      showNotification(
        "error",
        "Image size must be less than 10MB."
      );

      return false;
    }

    if (
      isVideo &&
      file.size > MAX_VIDEO_SIZE
    ) {
      showNotification(
        "error",
        "Video size must be less than 100MB."
      );

      return false;
    }

    return true;
  };

  /* ==========================================================
     HANDLE MEDIA
  ========================================================== */

  const handleMediaChange = (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    if (!validateFile(file)) {
      e.target.value = "";
      return;
    }

    if (preview?.isBlob && preview?.url) {
      URL.revokeObjectURL(preview.url);
    }

    const isVideo =
      file.type.startsWith("video/");

    const mediaType = isVideo
      ? "video"
      : "image";

    setForm((prev) => ({
      ...prev,
      media: file,
      mediaType,
      ...(isVideo
        ? {
            title: "",
            category: "",
            specs: "",
          }
        : {}),
    }));

    setPreview({
      url: URL.createObjectURL(file),
      type: mediaType,
      isBlob: true,
    });
  };

  /* ==========================================================
     EDIT
  ========================================================== */

  const handleEdit = (item) => {
    setEditing(item);

    const mediaType =
      item.type === "video"
        ? "video"
        : "image";

    setForm({
      title:
        mediaType === "image"
          ? item.title || ""
          : "",
      category:
        mediaType === "image"
          ? item.category || ""
          : "",
      specs:
        mediaType === "image"
          ? item.specs || ""
          : "",
      media: null,
      mediaType,
      active: item.active ?? true,
    });

    setPreview({
      url: item.mediaUrl,
      type: mediaType,
      isBlob: false,
    });

    setShowModal(true);
  };

  /* ==========================================================
     SUBMIT
  ========================================================== */

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (uploading) return;

    const mediaType =
      form.mediaType ||
      preview?.type ||
      editing?.type ||
      "";

    const isVideo =
      mediaType === "video";

    const isImage =
      mediaType === "image";

    /* IMAGE VALIDATION */

    if (isImage) {
      if (!form.title.trim()) {
        showNotification(
          "error",
          "Please enter an image title."
        );

        return;
      }

      if (!form.category.trim()) {
        showNotification(
          "error",
          "Please enter an image category."
        );

        return;
      }

      if (!form.specs.trim()) {
        showNotification(
          "error",
          "Please enter image specifications."
        );

        return;
      }
    }

    /* ADD MEDIA REQUIRED */

    if (!editing && !form.media) {
      showNotification(
        "error",
        "Please select an image or video."
      );

      return;
    }

    /* AUTH */

    const token = getAuthHeaders();

    if (!token.Authorization) {
      showNotification(
        "error",
        "Authentication required. Please login again."
      );

      setTimeout(() => {
        window.location.href = "/login";
      }, 1200);

      return;
    }

    try {
      setUploading(true);

      const formData = new FormData();

      formData.append(
        "title",
        isImage
          ? form.title.trim()
          : ""
      );

      formData.append(
        "category",
        isImage
          ? form.category.trim()
          : ""
      );

      formData.append(
        "specs",
        isImage
          ? form.specs.trim()
          : ""
      );

      formData.append(
        "active",
        String(form.active)
      );

      if (form.media) {
        formData.append(
          "media",
          form.media
        );
      }

      const config = {
        headers: {
          ...token,
          "Content-Type":
            "multipart/form-data",
        },
      };

      let response;

      if (editing) {
        response = await axios.put(
          `${API_URL}/api/gallery/${editing._id}`,
          formData,
          config
        );
      } else {
        response = await axios.post(
          `${API_URL}/api/gallery`,
          formData,
          config
        );
      }

      if (response.data?.success) {
        showNotification(
          "success",
          editing
            ? "Gallery item updated successfully!"
            : isVideo
            ? "Video uploaded successfully!"
            : "Image uploaded successfully!"
        );

        resetForm();

        await fetchGallery();
      } else {
        throw new Error(
          response.data?.message ||
            "Operation failed."
        );
      }
    } catch (error) {
      console.error(
        "Gallery submit error:",
        error
      );

      if (
        error.response?.status === 401
      ) {
        showNotification(
          "error",
          "Session expired. Please login again."
        );

        setTimeout(() => {
          window.location.href = "/login";
        }, 1200);

        return;
      }

      showNotification(
        "error",
        error.response?.data?.message ||
          "Something went wrong while saving."
      );
    } finally {
      setUploading(false);
    }
  };

  /* ==========================================================
     OPEN DELETE CONFIRMATION
  ========================================================== */

  const handleDelete = (item) => {
    /*
      Remove focus from the clicked delete button.
      This prevents the browser tooltip/focus state
      from visually remaining behind the modal.
    */

    if (
      document.activeElement instanceof
      HTMLElement
    ) {
      document.activeElement.blur();
    }

    setDeleteTarget(item);
  };

  /* ==========================================================
     CONFIRM DELETE
  ========================================================== */

  const confirmDelete = async () => {
    if (
      !deleteTarget?._id ||
      deleting
    ) {
      return;
    }

    const id = deleteTarget._id;

    try {
      setDeleting(id);

      const response = await axios.delete(
        `${API_URL}/api/gallery/${id}`,
        {
          headers: getAuthHeaders(),
        }
      );

      if (response.data?.success) {
        setGallery((prev) =>
          prev.filter(
            (item) => item._id !== id
          )
        );

        showNotification(
          "success",
          "Gallery item deleted successfully."
        );

        setDeleteTarget(null);
      } else {
        throw new Error(
          response.data?.message ||
            "Failed to delete gallery item."
        );
      }
    } catch (error) {
      console.error(
        "Delete error:",
        error
      );

      if (
        error.response?.status === 401
      ) {
        showNotification(
          "error",
          "Session expired. Please login again."
        );

        setDeleteTarget(null);

        setTimeout(() => {
          window.location.href = "/login";
        }, 1200);

        return;
      }

      showNotification(
        "error",
        error.response?.data?.message ||
          "Failed to delete gallery item."
      );
    } finally {
      setDeleting(null);
    }
  };

  /* ==========================================================
     CANCEL DELETE
  ========================================================== */

  const cancelDelete = () => {
    if (deleting) return;

    setDeleteTarget(null);
  };

  /* ==========================================================
     TOGGLE STATUS
  ========================================================== */

  const handleToggle = async (id) => {
    try {
      const response = await axios.patch(
        `${API_URL}/api/gallery/${id}/toggle`,
        {},
        {
          headers: getAuthHeaders(),
        }
      );

      if (response.data?.success) {
        setGallery((prev) =>
          prev.map((item) =>
            item._id === id
              ? response.data.data
              : item
          )
        );

        showNotification(
          "success",
          response.data.data?.active
            ? "Gallery item is now visible."
            : "Gallery item is now hidden."
        );
      }
    } catch (error) {
      console.error(
        "Toggle error:",
        error
      );

      showNotification(
        "error",
        error.response?.data?.message ||
          "Failed to update status."
      );
    }
  };

  /* ==========================================================
     FILTER
  ========================================================== */

  const filteredGallery = useMemo(() => {
    const search =
      searchTerm
        .trim()
        .toLowerCase();

    return gallery.filter((item) => {
      const searchableText = [
        item.title,
        item.category,
        item.specs,
        item.description,
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      const matchesSearch =
        !search ||
        searchableText.includes(search);

      if (!matchesSearch) {
        return false;
      }

      if (
        filterType === "image"
      ) {
        return item.type === "image";
      }

      if (
        filterType === "video"
      ) {
        return item.type === "video";
      }

      if (
        filterType === "active"
      ) {
        return item.active === true;
      }

      if (
        filterType === "hidden"
      ) {
        return item.active === false;
      }

      return true;
    });
  }, [
    gallery,
    searchTerm,
    filterType,
  ]);

  /* ==========================================================
     LOADING
  ========================================================== */

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#A5C8E4]">
        <motion.div
          initial={{
            opacity: 0,
            scale: 0.7,
          }}
          animate={{
            opacity: 1,
            scale: 1,
          }}
          transition={{
            duration: 0.4,
          }}
          className="flex flex-col items-center gap-3"
        >
          <Loader2
            size={40}
            className="animate-spin text-[#1b4369]"
          />

          <p className="text-sm font-medium text-[#1b4369]">
            Loading gallery...
          </p>
        </motion.div>
      </div>
    );
  }

  /* ==========================================================
     UI
  ========================================================== */

  return (
    <div className="min-h-screen bg-[#A5C8E4] px-4 py-5 font-sans text-gray-900 sm:px-6 md:px-8 md:py-8">
      <Toast
        toast={toast}
        onDone={() => setToast(null)}
      />

      <motion.div
        variants={pageVariants}
        initial="hidden"
        animate="visible"
        className="mx-auto max-w-7xl space-y-6"
      >
        {/* ====================================================
            HEADER
        ==================================================== */}

        <motion.div
          variants={itemVariants}
          className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"
        >
          <div>
            <div className="flex flex-wrap items-center gap-3">
              <h1 className="text-2xl font-extrabold tracking-tight text-gray-900 md:text-3xl">
                Seller Gallery
              </h1>

              <motion.span
                key={gallery.length}
                initial={{
                  scale: 0.7,
                  opacity: 0,
                }}
                animate={{
                  scale: 1,
                  opacity: 1,
                }}
                className="rounded-full bg-white/70 px-3 py-1 text-xs font-bold text-[#1b4369] shadow-sm"
              >
                {gallery.length} items
              </motion.span>
            </div>

            <p className="mt-1 text-xs text-gray-600 sm:text-sm">
              Upload and manage your business
              images and videos.
            </p>
          </div>

          <motion.button
            type="button"
            onClick={openAddModal}
            whileHover={{
              scale: 1.03,
              y: -2,
            }}
            whileTap={{
              scale: 0.97,
            }}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#1b4369] px-5 py-2.5 text-sm font-bold text-white shadow-lg transition hover:bg-[#153452]"
          >
            <Plus size={18} />
            Add Gallery
          </motion.button>
        </motion.div>

        {/* ====================================================
            SEARCH + FILTER
        ==================================================== */}

        <motion.div
          variants={itemVariants}
          className="flex flex-col gap-4 rounded-2xl border border-white/70 bg-white/90 p-4 shadow-lg backdrop-blur-xl md:flex-row md:items-center md:justify-between"
        >
          <div className="relative w-full max-w-md">
            <Search
              size={18}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400"
            />

            <input
              type="text"
              value={searchTerm}
              onChange={(e) =>
                setSearchTerm(
                  e.target.value
                )
              }
              placeholder="Search title, category or specs..."
              className="h-10 w-full rounded-xl border border-gray-200 bg-white pl-10 pr-10 text-xs text-gray-800 outline-none transition focus:border-[#1b4369] focus:ring-2 focus:ring-[#1b4369]/15 sm:text-sm"
            />

            {searchTerm && (
              <button
                type="button"
                onClick={() =>
                  setSearchTerm("")
                }
                aria-label="Clear search"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 transition hover:text-gray-700"
              >
                <X size={16} />
              </button>
            )}
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
            {[
              ["all", "All"],
              ["image", "Images"],
              ["video", "Videos"],
              ["active", "Active"],
              ["hidden", "Hidden"],
            ].map(
              ([id, label]) => (
                <motion.button
                  key={id}
                  type="button"
                  whileTap={{
                    scale: 0.94,
                  }}
                  onClick={() =>
                    setFilterType(id)
                  }
                  className={`whitespace-nowrap rounded-lg px-3.5 py-1.5 text-xs font-bold transition ${
                    filterType === id
                      ? "bg-[#1b4369] text-white shadow-md"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  {label}
                </motion.button>
              )
            )}
          </div>
        </motion.div>

        {/* ====================================================
            GALLERY GRID
        ==================================================== */}

        {filteredGallery.length === 0 ? (
          <motion.div
            variants={itemVariants}
            className="mx-auto my-12 max-w-md rounded-2xl border border-white/70 bg-white p-12 text-center shadow-xl"
          >
            <motion.div
              animate={{
                y: [0, -5, 0],
              }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full border border-gray-100 bg-gray-50"
            >
              <ImageIcon
                size={28}
                className="text-gray-400"
              />
            </motion.div>

            <h2 className="text-base font-bold text-gray-800">
              {gallery.length === 0
                ? "No gallery items yet"
                : "No matching items found"}
            </h2>

            <p className="mt-1 text-xs leading-relaxed text-gray-500 sm:text-sm">
              {gallery.length === 0
                ? "Upload your first image or video to showcase your business."
                : "Try changing your search or filter."}
            </p>

            {gallery.length === 0 && (
              <motion.button
                type="button"
                whileHover={{
                  x: 3,
                }}
                onClick={openAddModal}
                className="mt-5 inline-flex items-center gap-1.5 text-xs font-bold text-[#1b4369]"
              >
                <Plus size={15} />
                Add Media Now
              </motion.button>
            )}
          </motion.div>
        ) : (
          <motion.div
            variants={pageVariants}
            className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
          >
            {filteredGallery.map(
              (item) => (
                <motion.div
                  key={item._id}
                  variants={cardVariants}
                  layout
                  whileHover={{
                    y: -6,
                  }}
                  className="group flex flex-col justify-between overflow-hidden rounded-2xl border border-gray-200/80 bg-white shadow-sm transition-shadow hover:shadow-2xl"
                >
                  <div>
                    {/* MEDIA */}

                    <motion.div
                      onClick={() =>
                        setActiveMediaModal(
                          item
                        )
                      }
                      whileHover={{
                        scale: 1.01,
                      }}
                      className="relative flex aspect-video cursor-pointer items-center justify-center overflow-hidden bg-slate-100"
                    >
                      {item.type ===
                      "video" ? (
                        <>
                          <video
                            src={
                              item.mediaUrl
                            }
                            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                            preload="metadata"
                          />

                          <div className="absolute inset-0 flex items-center justify-center bg-black/20 transition group-hover:bg-black/40">
                            <motion.div
                              whileHover={{
                                scale: 1.15,
                              }}
                              className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-[#1b4369] shadow-2xl"
                            >
                              <Play
                                size={19}
                                className="ml-0.5 fill-current"
                              />
                            </motion.div>
                          </div>
                        </>
                      ) : (
                        <div className="relative flex h-full w-full items-center justify-center bg-gray-50 p-2">
                          <img
                            src={
                              item.mediaUrl
                            }
                            alt={
                              item.title ||
                              "Gallery image"
                            }
                            className="h-full w-full object-contain transition-transform duration-500 group-hover:scale-105"
                          />

                          <div className="absolute inset-0 flex items-center justify-center bg-black/0 opacity-0 transition group-hover:bg-black/15 group-hover:opacity-100">
                            <div className="rounded-full bg-white/95 p-2.5 text-gray-700 shadow-xl">
                              <Maximize2
                                size={17}
                              />
                            </div>
                          </div>
                        </div>
                      )}

                      {/* TYPE */}

                      <div className="absolute left-2.5 top-2.5 flex items-center gap-1 rounded-md bg-black/65 px-2 py-1 text-[10px] font-bold text-white shadow-lg backdrop-blur-md">
                        {item.type ===
                        "video" ? (
                          <>
                            <Video
                              size={12}
                            />
                            Video
                          </>
                        ) : (
                          <>
                            <ImageIcon
                              size={12}
                            />
                            Image
                          </>
                        )}
                      </div>

                      {/* STATUS */}

                      <div className="absolute right-2.5 top-2.5">
                        <span
                          className={`rounded-full border px-2.5 py-1 text-[10px] font-bold shadow ${
                            item.active
                              ? "border-emerald-200 bg-emerald-50 text-emerald-700"
                              : "border-gray-200 bg-gray-100 text-gray-600"
                          }`}
                        >
                          {item.active
                            ? "Active"
                            : "Hidden"}
                        </span>
                      </div>
                    </motion.div>

                    {/* INFORMATION */}

                    <div className="p-4">
                      {item.type ===
                      "video" ? (
                        <div>
                          <div className="mb-2 flex items-center gap-2">
                            <Film
                              size={15}
                              className="text-[#1b4369]"
                            />

                            <span className="text-xs font-bold text-[#1b4369]">
                              Business Video
                            </span>
                          </div>

                          <p className="text-xs text-gray-500">
                            Video media
                          </p>
                        </div>
                      ) : (
                        <>
                          <h3
                            className="truncate text-sm font-extrabold text-gray-900"
                            title={
                              item.title
                            }
                          >
                            {item.title ||
                              "Untitled Image"}
                          </h3>

                          {item.category && (
                            <div className="mt-2 flex items-center gap-1.5">
                              <FolderOpen
                                size={13}
                                className="shrink-0 text-[#1b4369]"
                              />

                              <span className="rounded-md bg-blue-50 px-2 py-0.5 text-[10px] font-bold text-[#1b4369]">
                                {
                                  item.category
                                }
                              </span>
                            </div>
                          )}

                          <div className="mt-2 flex gap-1.5">
                            <FileText
                              size={13}
                              className="mt-0.5 shrink-0 text-gray-400"
                            />

                            <p className="line-clamp-2 text-[11px] leading-relaxed text-gray-500">
                              {item.specs ||
                                "No specifications provided."}
                            </p>
                          </div>
                        </>
                      )}
                    </div>
                  </div>

                  {/* CONTROLS */}

                  <div className="flex items-center gap-2 border-t border-gray-100 bg-gray-50/70 p-3">
                    {/* EDIT */}

                    <motion.button
                      type="button"
                      whileTap={{
                        scale: 0.94,
                      }}
                      onClick={() =>
                        handleEdit(item)
                      }
                      aria-label={`Edit ${
                        item.title ||
                        "gallery item"
                      }`}
                      className="flex flex-1 items-center justify-center gap-1.5 rounded-lg border border-gray-200 bg-white py-2 text-xs font-bold text-gray-700 shadow-sm transition hover:bg-gray-50"
                    >
                      <Edit size={13} />
                      Edit
                    </motion.button>

                    {/* TOGGLE */}

                    <motion.button
                      type="button"
                      whileTap={{
                        scale: 0.9,
                      }}
                      onClick={() =>
                        handleToggle(
                          item._id
                        )
                      }
                      aria-label={
                        item.active
                          ? "Hide item"
                          : "Show item"
                      }
                      className="rounded-lg border border-gray-200 bg-white p-2 text-gray-600 shadow-sm transition hover:bg-gray-50"
                    >
                      {item.active ? (
                        <EyeOff
                          size={14}
                        />
                      ) : (
                        <Eye
                          size={14}
                        />
                      )}
                    </motion.button>

                    {/* DELETE */}

                    <motion.button
                      type="button"
                      whileTap={{
                        scale: 0.9,
                      }}
                      onClick={() =>
                        handleDelete(item)
                      }
                      disabled={
                        deleting ===
                        item._id
                      }
                      aria-label={`Delete ${
                        item.type ===
                        "video"
                          ? "business video"
                          : item.title ||
                            "gallery image"
                      }`}
                      className="rounded-lg border border-rose-200 bg-white p-2 text-rose-600 shadow-sm transition hover:border-rose-300 hover:bg-rose-50 hover:text-rose-700 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      {deleting ===
                      item._id ? (
                        <Loader2
                          size={14}
                          className="animate-spin"
                        />
                      ) : (
                        <Trash2
                          size={14}
                        />
                      )}
                    </motion.button>
                  </div>
                </motion.div>
              )
            )}
          </motion.div>
        )}
      </motion.div>

      {/* ======================================================
          MEDIA LIGHTBOX
      ====================================================== */}

      <AnimatePresence>
        {activeMediaModal && (
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
            className="fixed inset-0 z-[80] flex items-center justify-center bg-black/85 p-4 backdrop-blur-md"
            onClick={() =>
              setActiveMediaModal(null)
            }
          >
            <motion.div
              initial={{
                opacity: 0,
                scale: 0.9,
                y: 20,
              }}
              animate={{
                opacity: 1,
                scale: 1,
                y: 0,
              }}
              exit={{
                opacity: 0,
                scale: 0.94,
              }}
              transition={{
                type: "spring",
                stiffness: 240,
                damping: 25,
              }}
              onClick={(e) =>
                e.stopPropagation()
              }
              className="relative flex w-full max-w-4xl flex-col overflow-hidden rounded-2xl bg-black shadow-2xl"
            >
              <button
                type="button"
                onClick={() =>
                  setActiveMediaModal(
                    null
                  )
                }
                aria-label="Close media preview"
                className="absolute right-4 top-4 z-10 rounded-full bg-black/60 p-2 text-white transition hover:bg-black"
              >
                <X size={20} />
              </button>

              <div className="flex max-h-[75vh] min-h-[250px] items-center justify-center bg-black">
                {activeMediaModal.type ===
                "video" ? (
                  <video
                    src={
                      activeMediaModal.mediaUrl
                    }
                    controls
                    autoPlay
                    className="max-h-[75vh] w-full object-contain"
                  />
                ) : (
                  <img
                    src={
                      activeMediaModal.mediaUrl
                    }
                    alt={
                      activeMediaModal.title ||
                      "Gallery"
                    }
                    className="max-h-[75vh] w-full object-contain"
                  />
                )}
              </div>

              {activeMediaModal.type ===
                "image" && (
                <div className="bg-slate-900 p-5 text-white">
                  <h3 className="text-base font-extrabold">
                    {
                      activeMediaModal.title
                    }
                  </h3>

                  {activeMediaModal.category && (
                    <p className="mt-1 text-xs font-semibold text-sky-300">
                      {
                        activeMediaModal.category
                      }
                    </p>
                  )}

                  {activeMediaModal.specs && (
                    <p className="mt-2 text-xs leading-relaxed text-gray-300">
                      {
                        activeMediaModal.specs
                      }
                    </p>
                  )}
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ======================================================
          DELETE CONFIRMATION MODAL
      ====================================================== */}

      <AnimatePresence>
        {deleteTarget && (
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
            transition={{
              duration: 0.2,
            }}
            className="fixed inset-0 z-[110] flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
            onClick={cancelDelete}
          >
            <motion.div
              initial={{
                opacity: 0,
                scale: 0.92,
                y: 20,
              }}
              animate={{
                opacity: 1,
                scale: 1,
                y: 0,
              }}
              exit={{
                opacity: 0,
                scale: 0.94,
                y: 15,
              }}
              transition={{
                type: "spring",
                stiffness: 280,
                damping: 24,
              }}
              role="dialog"
              aria-modal="true"
              aria-labelledby="delete-modal-title"
              aria-describedby="delete-modal-description"
              onClick={(e) =>
                e.stopPropagation()
              }
              className="w-full max-w-md overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-2xl"
            >
              {/* MODAL HEADER */}

              <div className="flex items-start gap-4 p-5 sm:p-6">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-rose-100 text-rose-600">
                  <Trash2 size={22} />
                </div>

                <div className="min-w-0 flex-1">
                  <h2
                    id="delete-modal-title"
                    className="text-base font-extrabold text-gray-900 sm:text-lg"
                  >
                    Delete gallery item?
                  </h2>

                  <p
                    id="delete-modal-description"
                    className="mt-1.5 text-xs leading-relaxed text-gray-500 sm:text-sm"
                  >
                    Are you sure you want
                    to permanently delete
                    this gallery item? This
                    action cannot be undone.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={cancelDelete}
                  disabled={Boolean(
                    deleting
                  )}
                  aria-label="Close delete confirmation"
                  className="rounded-lg p-1.5 text-gray-400 transition hover:bg-gray-100 hover:text-gray-700 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <X size={18} />
                </button>
              </div>

              {/* ITEM PREVIEW */}

              <div className="mx-5 overflow-hidden rounded-xl border border-gray-200 bg-gray-50 sm:mx-6">
                <div className="flex items-center gap-3 p-3">
                  <div className="h-14 w-20 shrink-0 overflow-hidden rounded-lg bg-gray-200">
                    {deleteTarget.type ===
                    "video" ? (
                      <div className="relative flex h-full w-full items-center justify-center bg-slate-900">
                        <video
                          src={
                            deleteTarget.mediaUrl
                          }
                          className="h-full w-full object-cover opacity-70"
                          preload="metadata"
                        />

                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="flex h-7 w-7 items-center justify-center rounded-full bg-white/90 text-[#1b4369]">
                            <Play
                              size={12}
                              className="ml-0.5 fill-current"
                            />
                          </div>
                        </div>
                      </div>
                    ) : (
                      <img
                        src={
                          deleteTarget.mediaUrl
                        }
                        alt=""
                        className="h-full w-full object-cover"
                      />
                    )}
                  </div>

                  <div className="min-w-0 flex-1">
                    <p className="truncate text-xs font-bold text-gray-800">
                      {deleteTarget.type ===
                      "video"
                        ? "Business Video"
                        : deleteTarget.title ||
                          "Untitled Image"}
                    </p>

                    <div className="mt-1 flex items-center gap-1.5">
                      {deleteTarget.type ===
                      "video" ? (
                        <>
                          <Video
                            size={11}
                            className="text-[#1b4369]"
                          />

                          <span className="text-[10px] font-semibold text-gray-500">
                            Video
                          </span>
                        </>
                      ) : (
                        <>
                          <ImageIcon
                            size={11}
                            className="text-[#1b4369]"
                          />

                          <span className="text-[10px] font-semibold text-gray-500">
                            Image
                          </span>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* WARNING */}

              <div className="mx-5 mt-4 rounded-xl border border-rose-100 bg-rose-50 px-3.5 py-3 sm:mx-6">
                <div className="flex items-start gap-2.5">
                  <AlertCircle
                    size={16}
                    className="mt-0.5 shrink-0 text-rose-600"
                  />

                  <p className="text-[11px] font-medium leading-relaxed text-rose-700 sm:text-xs">
                    The media will be
                    removed from your
                    gallery permanently.
                    You will not be able to
                    recover it from this
                    page.
                  </p>
                </div>
              </div>

              {/* ACTIONS */}

              <div className="flex gap-3 border-t border-gray-100 bg-gray-50/70 p-4 sm:p-5">
                <motion.button
                  type="button"
                  whileTap={{
                    scale: 0.97,
                  }}
                  onClick={cancelDelete}
                  disabled={Boolean(
                    deleting
                  )}
                  className="h-10 flex-1 rounded-lg border border-gray-300 bg-white text-xs font-bold text-gray-700 shadow-sm transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  Cancel
                </motion.button>

                <motion.button
                  type="button"
                  whileTap={{
                    scale: 0.97,
                  }}
                  onClick={
                    confirmDelete
                  }
                  disabled={Boolean(
                    deleting
                  )}
                  className="flex h-10 flex-1 items-center justify-center gap-2 rounded-lg bg-rose-600 text-xs font-bold text-white shadow-lg shadow-rose-600/20 transition hover:bg-rose-700 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {deleting ? (
                    <>
                      <Loader2
                        size={15}
                        className="animate-spin"
                      />
                      Deleting...
                    </>
                  ) : (
                    <>
                      <Trash2 size={15} />
                      Delete permanently
                    </>
                  )}
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ======================================================
          ADD / EDIT MODAL
      ====================================================== */}

      <AnimatePresence>
        {showModal && (
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
            className="fixed inset-0 z-[70] flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
            onClick={resetForm}
          >
            <motion.div
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              onClick={(e) =>
                e.stopPropagation()
              }
              className="flex max-h-[92vh] w-full max-w-xl flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-2xl"
            >
              {/* MODAL HEADER */}

              <div className="flex items-center justify-between border-b border-gray-100 px-5 py-4 sm:px-6">
                <div>
                  <h2 className="text-base font-extrabold text-gray-900">
                    {editing
                      ? "Edit Gallery Item"
                      : "Add Gallery"}
                  </h2>

                  <p className="mt-0.5 text-[11px] text-gray-500">
                    {editing
                      ? "Update your gallery media."
                      : "Upload an image or video."}
                  </p>
                </div>

                <motion.button
                  type="button"
                  whileTap={{
                    scale: 0.9,
                  }}
                  onClick={resetForm}
                  aria-label="Close gallery form"
                  className="rounded-lg p-2 text-gray-400 transition hover:bg-gray-100 hover:text-gray-700"
                >
                  <X size={18} />
                </motion.button>
              </div>

              {/* FORM */}

              <form
                onSubmit={handleSubmit}
                className="space-y-5 overflow-y-auto p-5 sm:p-6"
              >
                {/* MEDIA TYPE / FILE */}

                <div>
                  <label className="mb-2 block text-xs font-bold text-gray-700">
                    Image / Video{" "}
                    {!editing && (
                      <span className="text-red-500">
                        *
                      </span>
                    )}
                  </label>

                  {preview ? (
                    <motion.div
                      initial={{
                        opacity: 0,
                        scale: 0.97,
                      }}
                      animate={{
                        opacity: 1,
                        scale: 1,
                      }}
                      className="relative overflow-hidden rounded-xl border border-gray-200 bg-gray-50"
                    >
                      {preview.type ===
                      "video" ? (
                        <video
                          src={
                            preview.url
                          }
                          controls
                          className="max-h-64 w-full object-contain"
                        />
                      ) : (
                        <img
                          src={
                            preview.url
                          }
                          alt="Preview"
                          className="max-h-64 w-full object-contain"
                        />
                      )}

                      <button
                        type="button"
                        onClick={() => {
                          if (
                            preview?.isBlob &&
                            preview?.url
                          ) {
                            URL.revokeObjectURL(
                              preview.url
                            );
                          }

                          setPreview(
                            null
                          );

                          setForm(
                            (prev) => ({
                              ...prev,
                              media: null,
                              mediaType:
                                "",
                              title:
                                preview.type ===
                                "video"
                                  ? ""
                                  : prev.title,
                              category:
                                preview.type ===
                                "video"
                                  ? ""
                                  : prev.category,
                              specs:
                                preview.type ===
                                "video"
                                  ? ""
                                  : prev.specs,
                            })
                          );

                          if (
                            fileInputRef.current
                          ) {
                            fileInputRef.current.value =
                              "";
                          }
                        }}
                        aria-label="Remove selected media"
                        className="absolute right-2 top-2 rounded-full bg-black/65 p-1.5 text-white transition hover:bg-black"
                      >
                        <X size={15} />
                      </button>

                      <div className="absolute bottom-2 left-2 rounded-md bg-black/65 px-2 py-1 text-[10px] font-bold text-white backdrop-blur">
                        {preview.type ===
                        "video"
                          ? "VIDEO"
                          : "IMAGE"}
                      </div>
                    </motion.div>
                  ) : (
                    <motion.label
                      whileHover={{
                        scale: 1.005,
                        borderColor:
                          "#1b4369",
                      }}
                      className="flex min-h-36 cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-gray-300 bg-gray-50 p-6 text-center transition hover:bg-blue-50/40"
                    >
                      <motion.div
                        animate={{
                          y: [0, -4, 0],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }}
                        className="mb-2 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-[#1b4369]"
                      >
                        <Upload size={22} />
                      </motion.div>

                      <span className="text-xs font-bold text-gray-700">
                        Click to select image
                        or video
                      </span>

                      <span className="mt-1 text-[10px] text-gray-400">
                        JPG, PNG, WEBP, MP4,
                        WEBM, MOV
                      </span>

                      <span className="mt-1 text-[10px] text-gray-400">
                        Images up to 10MB •
                        Videos up to 100MB
                      </span>

                      <input
                        ref={
                          fileInputRef
                        }
                        type="file"
                        accept="image/jpeg,image/png,image/webp,video/mp4,video/webm,video/quicktime"
                        onChange={
                          handleMediaChange
                        }
                        className="hidden"
                      />
                    </motion.label>
                  )}
                </div>

                {/* IMAGE FIELDS */}

                {(form.mediaType ===
                  "image" ||
                  (!form.mediaType &&
                    preview?.type ===
                      "image")) && (
                  <motion.div
                    initial={{
                      opacity: 0,
                      height: 0,
                    }}
                    animate={{
                      opacity: 1,
                      height: "auto",
                    }}
                    className="space-y-4"
                  >
                    {/* TITLE */}

                    <div>
                      <label className="mb-1.5 block text-xs font-bold text-gray-700">
                        Image Title{" "}
                        <span className="text-red-500">
                          *
                        </span>
                      </label>

                      <input
                        type="text"
                        name="title"
                        value={
                          form.title
                        }
                        onChange={
                          handleChange
                        }
                        placeholder="e.g. 5kW Solar Panel Installation"
                        required
                        className="h-10 w-full rounded-lg border border-gray-300 px-3.5 text-xs text-gray-800 outline-none transition placeholder:text-gray-400 focus:border-[#1b4369] focus:ring-2 focus:ring-[#1b4369]/15"
                      />
                    </div>

                    {/* CATEGORY */}

                    <div>
                      <label className="mb-1.5 block text-xs font-bold text-gray-700">
                        Category{" "}
                        <span className="text-red-500">
                          *
                        </span>
                      </label>

                      <input
                        type="text"
                        name="category"
                        value={
                          form.category
                        }
                        onChange={
                          handleChange
                        }
                        placeholder="e.g. Solar Installation"
                        required
                        className="h-10 w-full rounded-lg border border-gray-300 px-3.5 text-xs text-gray-800 outline-none transition placeholder:text-gray-400 focus:border-[#1b4369] focus:ring-2 focus:ring-[#1b4369]/15"
                      />
                    </div>

                    {/* SPECS */}

                    <div>
                      <label className="mb-1.5 block text-xs font-bold text-gray-700">
                        Specs{" "}
                        <span className="text-red-500">
                          *
                        </span>
                      </label>

                      <textarea
                        name="specs"
                        value={
                          form.specs
                        }
                        onChange={
                          handleChange
                        }
                        rows={4}
                        placeholder="e.g. 540Wp modules • 5kW inverter • Rooftop installation • 30 year warranty"
                        required
                        className="w-full resize-none rounded-lg border border-gray-300 p-3 text-xs leading-relaxed text-gray-800 outline-none transition placeholder:text-gray-400 focus:border-[#1b4369] focus:ring-2 focus:ring-[#1b4369]/15"
                      />
                    </div>
                  </motion.div>
                )}

                {/* VIDEO INFORMATION */}

                {form.mediaType ===
                  "video" && (
                  <motion.div
                    initial={{
                      opacity: 0,
                      y: 10,
                    }}
                    animate={{
                      opacity: 1,
                      y: 0,
                    }}
                    className="flex items-start gap-3 rounded-xl border border-blue-100 bg-blue-50 p-4"
                  >
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#1b4369] text-white">
                      <Video size={17} />
                    </div>

                    <div>
                      <h3 className="text-xs font-bold text-[#1b4369]">
                        Video Upload
                      </h3>

                      <p className="mt-1 text-[11px] leading-relaxed text-gray-600">
                        Videos do not require a
                        title, category, or
                        specifications. Simply
                        select the video and
                        upload it.
                      </p>
                    </div>
                  </motion.div>
                )}

                {/* STATUS */}

                <label className="flex cursor-pointer items-center gap-2.5 rounded-lg border border-gray-200 bg-gray-50 px-3.5 py-2.5 transition hover:bg-gray-100">
                  <input
                    type="checkbox"
                    name="active"
                    checked={
                      form.active
                    }
                    onChange={
                      handleChange
                    }
                    className="h-4 w-4 rounded border-gray-300 accent-[#1b4369]"
                  />

                  <span className="text-xs font-semibold text-gray-700">
                    Show on website
                  </span>
                </label>

                {/* ACTIONS */}

                <div className="flex gap-3 border-t border-gray-100 pt-4">
                  <motion.button
                    type="button"
                    whileHover={{
                      scale: 1.01,
                    }}
                    whileTap={{
                      scale: 0.98,
                    }}
                    onClick={
                      resetForm
                    }
                    disabled={
                      uploading
                    }
                    className="h-10 flex-1 rounded-lg border border-gray-300 bg-white text-xs font-bold text-gray-700 transition hover:bg-gray-50 disabled:opacity-50"
                  >
                    Cancel
                  </motion.button>

                  <motion.button
                    type="submit"
                    whileHover={
                      !uploading
                        ? {
                            scale: 1.01,
                          }
                        : {}
                    }
                    whileTap={
                      !uploading
                        ? {
                            scale: 0.98,
                          }
                        : {}
                    }
                    disabled={
                      uploading
                    }
                    className="flex h-10 flex-1 items-center justify-center gap-2 rounded-lg bg-[#1b4369] text-xs font-bold text-white shadow-lg transition hover:bg-[#153452] disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {uploading ? (
                      <>
                        <Loader2
                          size={16}
                          className="animate-spin"
                        />
                        Saving...
                      </>
                    ) : editing ? (
                      <>
                        <Edit size={15} />
                        Update
                      </>
                    ) : (
                      <>
                        <Upload size={15} />
                        Upload
                      </>
                    )}
                  </motion.button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SellerGallery;

