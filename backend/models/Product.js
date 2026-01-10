import mongoose from "mongoose";

// Simplified product schema aligned with controller inputs
const productSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true, maxlength: 150 },
    image: { type: String, default: "" },
    price: { type: Number, default: 0 },
    description: { type: String, required: true, maxlength: 500 },
    genre: { type: String, default: "general" },
    brand: {
      type: String,
      required: true,
      enum: ['BMW', 'Mercedes', 'Audi', 'Bentley', 'Porsche', 'Ferrari', 'Lamborghini', 'Rolls Royce']
    },
    stock: { type: Number, default: 1 },
    isActive: { type: Boolean, default: true },
    // New Car Specs
    manufacturingYear: { type: Number },
    transmission: { type: String },
    fuelType: { type: String },
    groundClearance: { type: String },
    bootSpace: { type: String },
    torque: { type: String },
    power: { type: String },
    engineCapacity: { type: String },
    kilometersDone: { type: String },
    exteriorColor: { type: String },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Product", productSchema);