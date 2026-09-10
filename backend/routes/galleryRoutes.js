const express = require("express");

const router = express.Router();

const upload = require("../middleware/uploadGallery");

const {
  getGallery,
  getPublicGallery,
  createGallery,
  updateGallery,
  deleteGallery,
  toggleGallery,
} = require("../controllers/galleryController");


// GET all
router.get("/", getGallery);


// GET active/public
router.get("/public", getPublicGallery);


// CREATE
router.post(
  "/",
  upload.single("media"),
  createGallery
);


// UPDATE
router.put(
  "/:id",
  upload.single("media"),
  updateGallery
);


// DELETE
router.delete(
  "/:id",
  deleteGallery
);


// TOGGLE
router.patch(
  "/:id/toggle",
  toggleGallery
);


module.exports = router;