const mongoose = require("mongoose");

const gallerySchema = new mongoose.Schema(
    {
        // =====================================================
        // IMAGE INFORMATION
        // Required only for images
        // =====================================================

        title: {
            type: String,
            trim: true,
            default: "",
        },

        description: {
            type: String,
            trim: true,
            default: "",
        },

        category: {
            type: String,
            trim: true,
            default: "",
        },

        specs: {
            type: String,
            trim: true,
            default: "",
        },

        // =====================================================
        // MEDIA TYPE
        // =====================================================

        type: {
            type: String,
            enum: ["image", "video"],
            required: true,
        },

        // =====================================================
        // CLOUDINARY
        // =====================================================

        mediaUrl: {
            type: String,
            required: true,
        },

        publicId: {
            type: String,
            required: true,
        },

        // =====================================================
        // STATUS
        // =====================================================

        active: {
            type: Boolean,
            default: true,
        },
    },
    {
        timestamps: true,
    }
);
module.exports = mongoose.model("Gallery", gallerySchema);