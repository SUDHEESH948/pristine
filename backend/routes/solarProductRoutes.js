const express = require("express");

const {
  createSolarProduct,
  getSolarProducts,
  getSolarProductById,
  updateSolarProduct,
  deleteSolarProduct,
} = require("../controllers/solarProductController");

const router = express.Router();

// ============================================================
// GET ALL SOLAR PRODUCTS
// GET /api/solar-products
// ============================================================

router.get("/", getSolarProducts);

// ============================================================
// GET SINGLE SOLAR PRODUCT
// GET /api/solar-products/:id
// ============================================================

router.get("/:id", getSolarProductById);

// ============================================================
// CREATE SOLAR PRODUCT
// POST /api/solar-products
//
// Authentication removed
// Admin restriction removed
// ============================================================

router.post("/", createSolarProduct);

// ============================================================
// UPDATE SOLAR PRODUCT
// PUT /api/solar-products/:id
//
// Authentication removed
// Admin restriction removed
// ============================================================

router.put("/:id", updateSolarProduct);

// ============================================================
// DELETE SOLAR PRODUCT
// DELETE /api/solar-products/:id
//
// Authentication removed
// Admin restriction removed
// ============================================================

router.delete("/:id", deleteSolarProduct);

module.exports = router;