import express from "express";
import Product from "../models/product.js";

const router = express.Router();

const createProduct = async (req, res) => {
  try {
    const { title, image, price, description, genre, stock } = req.body;

    // Validate required fields
    if (!title || !description) {
      return res.status(400).json({
        message: "Title and description are required fields"
      });
    }

    const newProduct = new Product({
      title: title.trim(),
      image: image || "",
      price: price || 0,
      description: description.trim(),
      genre: genre || "general",
      stock: stock || 1,
      isActive: true
    });

    await newProduct.save();

    res.status(201).json({
      message: "Product created successfully",
      product: newProduct
    });

  } catch (error) {
    console.error("Error creating product:", error);
    res.status(500).json({
      message: "Error creating product",
      error: error.message
    });
  }
};

const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find({ isActive: true }).sort({ createdAt: -1 });
    res.status(200).json({
      message: "Products retrieved successfully",
      count: products.length,
      products
    });
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({
      message: "Error fetching products",
      error: error.message
    });
  }
};

// Product routes
router.post("/create-product", createProduct);
router.get("/", getAllProducts);

// Test endpoint to verify route is working
router.get("/test", (req, res) => {
  res.status(200).json({ message: "Product routes are working!" });
});

export default router;