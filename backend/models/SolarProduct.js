const mongoose = require("mongoose");

const structureSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      enum: [
        "Without Structure",
        "RCC Ballast",
        "Sheetroof - Shortrail",
        "L- Angle Without Ballast",
        "Additional Work Above RCC",
        "Additional Work Above Sheet Roof",
        "Table Type Structure"
      ],
      required: true
    },

    maxSellingPrice: {
      type: Number,
      required: true
    },

    specialOffer: {
      type: Number,
      default: 0
    },

    offerPrice: {
      type: Number,
      required: true
    },

    subsidy: {
      type: Number,
      default: 0
    }
  },
  { _id: false }
);

const solarProductSchema = new mongoose.Schema(
  {
    productName: {
      type: String,
      required: true,
      trim: true
    },

    systemType: {
      type: String,
      
      required: true
    },

    moduleCount: {
      type: Number,
      required: true
    },

    moduleWattage: {
      type: Number,
      required: true
    },

    dcCapacity: {
      type: Number,
      required: true
    },

    inverterCapacity: {
      type: Number,
      required: true
    },

    inverterCapacity2: {
      type: Number,
      default: null
    },

    batteryCapacity: {
      type: Number,
      default: null
    },

    phase: {
      type: Number,
      enum: [1, 3],
      required: true
    },

    structures: {
      type: [structureSchema],
      required: true
    },

    gstRate: {
      type: Number,
      default: 8.9
    },

    currency: {
      type: String,
      default: "INR"
    },

    status: {
      type: Boolean,
      default: true
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("SolarProduct", solarProductSchema);