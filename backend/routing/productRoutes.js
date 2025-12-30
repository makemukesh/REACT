import express from "express";
import {
  createProduct,
  getAllProducts,
  getSingleProduct,
  updateProduct,
  deleteProduct,
  bulkCreateProducts
} from "../controllers/productControllers.js";
import { protect, adminOnly } from "../middlewares/authmiddlewares.js";

const router = express.Router();

// Public routes
router.get("/", getAllProducts);
router.get("/:id", getSingleProduct);

// Admin routes
router.post("/create-product", protect, adminOnly, createProduct);
router.post("/bulk-import", protect, adminOnly, bulkCreateProducts);
router.put("/:id", protect, adminOnly, updateProduct);
router.delete("/:id", protect, adminOnly, deleteProduct);

// Test endpoint to verify route is working
router.get("/test", (req, res) => {
  res.status(200).json({ message: "Product routes are working!" });
});

export default router;