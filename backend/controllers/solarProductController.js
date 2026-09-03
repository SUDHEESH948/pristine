const mongoose = require("mongoose");
const SolarProduct = require("../models/SolarProduct");

// ============================================================
// CREATE SOLAR PRODUCT
// ============================================================

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

    const numericPhase = Number.parseInt(String(phase).trim(), 10);

    if (![1, 3].includes(numericPhase)) {
      return res.status(400).json({
        success: false,
        message: "Phase must be 1 or 3",
      });
    }

    const normalizedStructures = structures.map((structure) => ({
      type: structure.type || structure.structure,

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
    }));

    const invalidStructure = normalizedStructures.some(
      (structure) =>
        !structure.type ||
        !Number.isFinite(structure.maxSellingPrice) ||
        !Number.isFinite(structure.offerPrice)
    );

    if (invalidStructure) {
      return res.status(400).json({
        success: false,
        message:
          "Each structure requires type, maxSellingPrice and offerPrice",
      });
    }

    const product = await SolarProduct.create({
      productName,
      systemType,
      moduleCount: Number(moduleCount),
      moduleWattage: Number(moduleWattage),
      dcCapacity: Number(dcCapacity),
      inverterCapacity: Number(inverterCapacity),
      inverterCapacity2:
        inverterCapacity2 !== undefined &&
        inverterCapacity2 !== null
          ? Number(inverterCapacity2)
          : null,

      batteryCapacity:
        batteryCapacity !== undefined &&
        batteryCapacity !== null
          ? Number(batteryCapacity)
          : null,

      phase: numericPhase,
      structures: normalizedStructures,
      gstRate:
        gstRate !== undefined ? Number(gstRate) : 5,
      currency: currency || "INR",
      status: status !== undefined ? Boolean(status) : true,
    });

    return res.status(201).json({
      success: true,
      message: "Solar product created successfully",
      product,
    });
  } catch (error) {
    console.error("CREATE SOLAR PRODUCT ERROR:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ============================================================
// GET ALL SOLAR PRODUCTS
// ============================================================

const getSolarProducts = async (req, res) => {
  try {
    console.log("GET /api/solar-products");

    console.log(
      "MongoDB readyState:",
      mongoose.connection.readyState
    );

    if (mongoose.connection.readyState !== 1) {
      return res.status(503).json({
        success: false,
        message: "MongoDB is not connected",
      });
    }

    const products = await SolarProduct.find({
      status: true,
    })
      .sort({ createdAt: -1 })
      .lean();

    console.log(
      `Solar products found: ${products.length}`
    );

    return res.status(200).json({
      success: true,
      count: products.length,
      products,
    });
  } catch (error) {
    console.error("GET SOLAR PRODUCTS ERROR:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ============================================================
// GET SINGLE PRODUCT
// ============================================================

const getSolarProductById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid solar product ID",
      });
    }

    const product = await SolarProduct.findById(id).lean();

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
    console.error("GET SOLAR PRODUCT ERROR:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ============================================================
// UPDATE
// ============================================================

const updateSolarProduct = async (req, res) => {
  try {
    const { id } = req.params;

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
        new: true,
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
    console.error("UPDATE SOLAR PRODUCT ERROR:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ============================================================
// DELETE
// ============================================================

const deleteSolarProduct = async (req, res) => {
  try {
    const { id } = req.params;

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
    console.error("DELETE SOLAR PRODUCT ERROR:", error);

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