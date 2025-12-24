import mongoose from "mongoose";

// Simplified product schema aligned with controller inputs
const productSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true, maxlength: 150 },
    image: { type: String, default: "" },
    price: { type: Number, default: 0 },
    description: { type: String, required: true, maxlength: 500 },
    genre: { type: String, default: "general" },
    stock: { type: Number, default: 1 },
    isActive: { type: Boolean, default: true },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Product", productSchema);