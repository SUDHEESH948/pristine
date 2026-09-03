
const mongoose = require("mongoose");
const SolarProduct = require("../models/SolarProduct");

// ==========================================
// CREATE SOLAR PRODUCT
// POST /api/solar-products
// ==========================================
const createSolarProduct = async (req, res) => {
  try {
    const {
      productName,
      systemType,
      moduleCount,
      moduleWattage,
      dcCapacity,
      inverterCapacity,
      inverterCapacity2,
      batteryCapacity,
      phase,
      structures,
      gstRate,
      currency,
      status,
    } = req.body;

    if (
      !productName ||
      !systemType ||
      moduleCount === undefined ||
      moduleWattage === undefined ||
      dcCapacity === undefined ||
      inverterCapacity === undefined ||
      phase === undefined ||
      !Array.isArray(structures) ||
      structures.length === 0
    ) {
      return res.status(400).json({
        success: false,
        message: "Please provide all required fields",
      });
    }

    const numericPhase = Number.parseInt(
      String(phase).trim(),
      10
    );

    if (![1, 3].includes(numericPhase)) {
      return res.status(400).json({
        success: false,
        message: "Phase must be 1 or 3",
      });
    }

    const normalizedStructures = structures.map((structure) => {
      const type = structure.type || structure.structure;

      return {
        type,
        maxSellingPrice: Number(
          structure.maxSellingPrice ??
          structure.maxPrice ??
          structure.msp
        ),
        specialOffer: Number(
          structure.specialOffer ??
          structure.specialOfferPrice ??
          0
        ),
        offerPrice: Number(
          structure.offerPrice ??
          structure.offer
        ),
        subsidy: Number(structure.subsidy ?? 0),
      };
    });

    if (
      normalizedStructures.some(
        (structure) =>
          !structure.type ||
          !Number.isFinite(structure.maxSellingPrice) ||
          !Number.isFinite(structure.offerPrice)
      )
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Each structure requires a type, max selling price, and offer price",
      });
    }

    const product = await SolarProduct.create({
      productName,
      systemType,
      moduleCount,
      moduleWattage,
      dcCapacity,
      inverterCapacity,
      inverterCapacity2: inverterCapacity2 ?? null,
      batteryCapacity: batteryCapacity ?? null,
      phase: numericPhase,
      structures: normalizedStructures,
      gstRate: gstRate ?? 8.9,
      currency: currency ?? "INR",
      status: status ?? true,
    });

    return res.status(201).json({
      success: true,
      message: "Solar product created successfully",
      product,
    });
  } catch (error) {
    console.error("Create Solar Product Error:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ==========================================
// GET ALL SOLAR PRODUCTS
// GET /api/solar-products
// ==========================================
const getSolarProducts = async (req, res) => {
  try {
    const products = await SolarProduct.find()
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: products.length,
      products,
    });
  } catch (error) {
    console.error("Get Solar Products Error:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ==========================================
// GET SINGLE SOLAR PRODUCT
// GET /api/solar-products/:id
// ==========================================
const getSolarProductById = async (req, res) => {
  try {
    const { id } = req.params;

    // Prevent Mongoose CastError for invalid IDs such as "123"
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid solar product ID",
      });
    }

    const product = await SolarProduct.findById(id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Solar product not found",
      });
    }

    return res.status(200).json({
      success: true,
      product,
    });
  } catch (error) {
    console.error("Get Solar Product Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to get solar product",
    });
  }
};

// ==========================================
// UPDATE SOLAR PRODUCT
// PUT /api/solar-products/:id
// ==========================================
const updateSolarProduct = async (req, res) => {
  try {
    const { id } = req.params;

    // Validate MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid solar product ID",
      });
    }

    const product = await SolarProduct.findByIdAndUpdate(
      id,
      req.body,
      {
        returnDocument: "after",
        runValidators: true,
      }
    );

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Solar product not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Solar product updated successfully",
      product,
    });
  } catch (error) {
    console.error("Update Solar Product Error:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ==========================================
// DELETE SOLAR PRODUCT
// DELETE /api/solar-products/:id
// ==========================================
const deleteSolarProduct = async (req, res) => {
  try {
    const { id } = req.params;

    // Validate MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid solar product ID",
      });
    }

    const product = await SolarProduct.findByIdAndDelete(id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Solar product not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Solar product deleted successfully",
    });
  } catch (error) {
    console.error("Delete Solar Product Error:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  createSolarProduct,
  getSolarProducts,
  getSolarProductById,
  updateSolarProduct,
  deleteSolarProduct,
};

