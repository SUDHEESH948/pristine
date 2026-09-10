
const Gallery = require("../models/Gallery");
const cloudinary = require("../utils/cloudinary");

// =====================================================
// CLOUDINARY BUFFER UPLOAD
// =====================================================

const uploadToCloudinary = (buffer, resourceType) => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        folder: "pristine/gallery",
        resource_type: resourceType,
      },
      (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      }
    );

    stream.end(buffer);
  });
};

// =====================================================
// DELETE CLOUDINARY FILE
// =====================================================

const deleteFromCloudinary = async (publicId, type) => {
  if (!publicId) return;

  try {
    await cloudinary.uploader.destroy(publicId, {
      resource_type: type === "video" ? "video" : "image",
    });
  } catch (error) {
    console.error(
      "Cloudinary delete error:",
      error.message
    );
  }
};

// =====================================================
// NORMALIZE SPECS
// =====================================================

const normalizeSpecs = (specs) => {
  if (specs === undefined || specs === null) {
    return "";
  }

  // If specs is already an object/array
  if (typeof specs === "object") {
    return specs;
  }

  // If sent as JSON string
  if (typeof specs === "string") {
    const trimmed = specs.trim();

    if (!trimmed) {
      return "";
    }

    try {
      return JSON.parse(trimmed);
    } catch {
      return trimmed;
    }
  }

  return String(specs);
};

// =====================================================
// GET ALL GALLERY ITEMS
// GET /api/gallery
// =====================================================

const getGallery = async (req, res) => {
  try {
    const gallery = await Gallery.find({})
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: gallery.length,
      data: gallery,
    });
  } catch (error) {
    console.error("Get gallery error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch gallery",
      error: error.message,
    });
  }
};

// =====================================================
// GET ACTIVE GALLERY
// GET /api/gallery/public
// =====================================================

const getPublicGallery = async (req, res) => {
  try {
    const gallery = await Gallery.find({
      active: true,
    }).sort({
      createdAt: -1,
    });

    return res.status(200).json({
      success: true,
      count: gallery.length,
      data: gallery,
    });
  } catch (error) {
    console.error(
      "Get public gallery error:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Failed to fetch public gallery",
      error: error.message,
    });
  }
};

// =====================================================
// CREATE GALLERY ITEM
// POST /api/gallery
//
// IMAGE:
//   title      required
//   category   required
//   specs      required
//
// VIDEO:
//   title      optional
//   category   optional
//   specs      optional
// =====================================================

const createGallery = async (req, res) => {
  try {
    const {
      title,
      category,
      specs,
      description,
      active,
    } = req.body;

    // ---------------------------------------------
    // FILE CHECK
    // ---------------------------------------------

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Please select an image or video.",
      });
    }

    // ---------------------------------------------
    // DETECT MEDIA TYPE
    // ---------------------------------------------

    const isVideo = req.file.mimetype.startsWith("video/");
    const mediaType = isVideo ? "video" : "image";
    const resourceType = isVideo ? "video" : "image";

    // ---------------------------------------------
    // IMAGE VALIDATION
    // ---------------------------------------------

    if (!isVideo) {
      if (!title || !String(title).trim()) {
        return res.status(400).json({
          success: false,
          message: "Title is required for images.",
        });
      }

      if (!category || !String(category).trim()) {
        return res.status(400).json({
          success: false,
          message: "Category is required for images.",
        });
      }

      if (
        specs === undefined ||
        specs === null ||
        String(specs).trim() === ""
      ) {
        return res.status(400).json({
          success: false,
          message: "Specs are required for images.",
        });
      }
    }

    // ---------------------------------------------
    // UPLOAD TO CLOUDINARY
    // ---------------------------------------------

    const uploadResult = await uploadToCloudinary(
      req.file.buffer,
      resourceType
    );

    // ---------------------------------------------
    // CREATE GALLERY DOCUMENT
    // ---------------------------------------------

    const galleryData = {
      type: mediaType,

      mediaUrl: uploadResult.secure_url,

      publicId: uploadResult.public_id,

      active:
        active === undefined
          ? true
          : active === "true" ||
            active === true,
    };

    // ---------------------------------------------
    // IMAGE DATA
    // ---------------------------------------------

    if (!isVideo) {
      galleryData.title = String(title).trim();

      galleryData.category =
        String(category).trim();

      galleryData.specs = normalizeSpecs(specs);

      // Keep description if supplied.
      galleryData.description =
        description !== undefined
          ? String(description).trim()
          : "";
    }

    // ---------------------------------------------
    // VIDEO DATA
    // ---------------------------------------------

    if (isVideo) {
      galleryData.title =
        title !== undefined
          ? String(title).trim()
          : "";

      galleryData.category =
        category !== undefined
          ? String(category).trim()
          : "";

      galleryData.specs =
        specs !== undefined
          ? normalizeSpecs(specs)
          : "";

      galleryData.description =
        description !== undefined
          ? String(description).trim()
          : "";
    }

    const gallery = await Gallery.create(
      galleryData
    );

    return res.status(201).json({
      success: true,
      message: isVideo
        ? "Video uploaded successfully."
        : "Image uploaded successfully.",
      data: gallery,
    });
  } catch (error) {
    console.error(
      "Create gallery error:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Failed to upload gallery item.",
      error: error.message,
    });
  }
};

// =====================================================
// UPDATE GALLERY ITEM
// PUT /api/gallery/:id
//
// For existing image:
//   title/category/specs can be updated.
//
// For video:
//   metadata is optional.
//
// Media can also be replaced.
// =====================================================

const updateGallery = async (req, res) => {
  try {
    const { id } = req.params;

    const gallery = await Gallery.findById(id);

    if (!gallery) {
      return res.status(404).json({
        success: false,
        message: "Gallery item not found.",
      });
    }

    const {
      title,
      category,
      specs,
      description,
      active,
    } = req.body;

    // ---------------------------------------------
    // CURRENT MEDIA TYPE
    // ---------------------------------------------

    let finalType = gallery.type;

    // ---------------------------------------------
    // CHECK NEW FILE
    // ---------------------------------------------

    if (req.file) {
      finalType = req.file.mimetype.startsWith(
        "video/"
      )
        ? "video"
        : "image";
    }

    // ---------------------------------------------
    // VALIDATE IMAGE DATA
    // ---------------------------------------------

    if (finalType === "image") {
      const finalTitle =
        title !== undefined
          ? String(title).trim()
          : String(gallery.title || "").trim();

      const finalCategory =
        category !== undefined
          ? String(category).trim()
          : String(gallery.category || "").trim();

      let finalSpecs;

      if (specs !== undefined) {
        finalSpecs = normalizeSpecs(specs);
      } else {
        finalSpecs = gallery.specs;
      }

      if (!finalTitle) {
        return res.status(400).json({
          success: false,
          message: "Title is required for images.",
        });
      }

      if (!finalCategory) {
        return res.status(400).json({
          success: false,
          message:
            "Category is required for images.",
        });
      }

      if (
        finalSpecs === undefined ||
        finalSpecs === null ||
        (typeof finalSpecs === "string" &&
          !finalSpecs.trim())
      ) {
        return res.status(400).json({
          success: false,
          message: "Specs are required for images.",
        });
      }

      gallery.title = finalTitle;

      gallery.category = finalCategory;

      gallery.specs = finalSpecs;
    }

    // ---------------------------------------------
    // VIDEO DATA
    // ---------------------------------------------

    if (finalType === "video") {
      if (title !== undefined) {
        gallery.title =
          String(title).trim();
      }

      if (category !== undefined) {
        gallery.category =
          String(category).trim();
      }

      if (specs !== undefined) {
        gallery.specs =
          normalizeSpecs(specs);
      }

      if (description !== undefined) {
        gallery.description =
          String(description).trim();
      }
    }

    // ---------------------------------------------
    // DESCRIPTION
    // ---------------------------------------------

    if (description !== undefined) {
      gallery.description =
        String(description).trim();
    }

    // ---------------------------------------------
    // ACTIVE STATUS
    // ---------------------------------------------

    if (active !== undefined) {
      gallery.active =
        active === "true" ||
        active === true;
    }

    // ---------------------------------------------
    // REPLACE MEDIA
    // ---------------------------------------------

    if (req.file) {
      // IMPORTANT:
      // Save the old type BEFORE changing gallery.type.
      const oldPublicId =
        gallery.publicId;

      const oldType =
        gallery.type;

      const newIsVideo =
        req.file.mimetype.startsWith(
          "video/"
        );

      const newType = newIsVideo
        ? "video"
        : "image";

      const newResourceType =
        newIsVideo
          ? "video"
          : "image";

      // Upload new file
      const uploadResult =
        await uploadToCloudinary(
          req.file.buffer,
          newResourceType
        );

      // Update document
      gallery.type = newType;

      gallery.mediaUrl =
        uploadResult.secure_url;

      gallery.publicId =
        uploadResult.public_id;

      // Delete OLD file using OLD type
      await deleteFromCloudinary(
        oldPublicId,
        oldType
      );
    }

    // ---------------------------------------------
    // SAVE
    // ---------------------------------------------

    await gallery.save();

    return res.status(200).json({
      success: true,
      message:
        "Gallery item updated successfully.",
      data: gallery,
    });
  } catch (error) {
    console.error(
      "Update gallery error:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        "Failed to update gallery item.",
      error: error.message,
    });
  }
};

// =====================================================
// DELETE GALLERY ITEM
// DELETE /api/gallery/:id
// =====================================================

const deleteGallery = async (req, res) => {
  try {
    const { id } = req.params;

    const gallery =
      await Gallery.findById(id);

    if (!gallery) {
      return res.status(404).json({
        success: false,
        message: "Gallery item not found.",
      });
    }

    // ---------------------------------------------
    // DELETE CLOUDINARY MEDIA
    // ---------------------------------------------

    await deleteFromCloudinary(
      gallery.publicId,
      gallery.type
    );

    // ---------------------------------------------
    // DELETE DATABASE RECORD
    // ---------------------------------------------

    await Gallery.findByIdAndDelete(id);

    return res.status(200).json({
      success: true,
      message:
        "Gallery item deleted successfully.",
    });
  } catch (error) {
    console.error(
      "Delete gallery error:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        "Failed to delete gallery item.",
      error: error.message,
    });
  }
};

// =====================================================
// TOGGLE ACTIVE STATUS
// PATCH /api/gallery/:id/toggle
// =====================================================

const toggleGallery = async (req, res) => {
  try {
    const { id } = req.params;

    const gallery =
      await Gallery.findById(id);

    if (!gallery) {
      return res.status(404).json({
        success: false,
        message: "Gallery item not found.",
      });
    }

    gallery.active =
      !gallery.active;

    await gallery.save();

    return res.status(200).json({
      success: true,
      message:
        gallery.active
          ? "Gallery item is now active."
          : "Gallery item is now hidden.",
      data: gallery,
    });
  } catch (error) {
    console.error(
      "Toggle gallery error:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        "Failed to update gallery status.",
      error: error.message,
    });
  }
};

// =====================================================
// DELETE ALL GALLERY ITEMS
// DELETE /api/gallery
// OPTIONAL
// =====================================================

const deleteAllGallery = async (req, res) => {
  try {
    const gallery =
      await Gallery.find({});

    // Delete all Cloudinary files
    for (const item of gallery) {
      await deleteFromCloudinary(
        item.publicId,
        item.type
      );
    }

    const result =
      await Gallery.deleteMany({});

    return res.status(200).json({
      success: true,
      message:
        "All gallery items deleted successfully.",
      deletedCount:
        result.deletedCount,
    });
  } catch (error) {
    console.error(
      "Delete all gallery error:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        "Failed to delete gallery items.",
      error: error.message,
    });
  }
};

// =====================================================
// EXPORTS
// =====================================================

module.exports = {
  getGallery,
  getPublicGallery,
  createGallery,
  updateGallery,
  deleteGallery,
  deleteAllGallery,
  toggleGallery,
};
