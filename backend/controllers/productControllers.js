<<<<<<< HEAD
import product from"../models/product.js"

export const createProduct = async (req,res) =>{
    const product = await product.create({
        ...req.body,
        createdBy: req.user_id,
    })
=======
import Product from "../models/product.js";

export const createProduct = async (req, res) => {
    try {
        const { title, image, price, description, genre, stock } = req.body;

        // Validate required fields
        if (!title || !description) {
            return res.status(400).json({
                message: "Title and description are required fields",
            });
        }

        const newProduct = new Product({
            title: title.trim(),
            image: image || "",
            price: price || 0,
            description: description.trim(),
            genre: genre || "general",
            stock: stock || 1,
            isActive: true,
        });

        await newProduct.save();

        res.status(201).json({
            message: "Product created successfully",
            product: newProduct,
        });
    } catch (error) {
        console.error("Error creating product:", error);
        res.status(500).json({
            message: "Error creating product",
            error: error.message,
        });
    }
};

export const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find({ isActive: true }).sort({ createdAt: -1 });
        res.status(200).json({
            message: "Products retrieved successfully",
            count: products.length,
            products,
        });
    } catch (error) {
        console.error("Error fetching products:", error);
        res.status(500).json({
            message: "Error fetching products",
            error: error.message,
        });
    }
};

export const getSingleProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }
        res.status(200).json({ product });
    } catch (error) {
        console.error("Error fetching product:", error);
        res.status(500).json({ message: "Error fetching product", error: error.message });
    }
}

export const updateProduct = async (req, res) => {
    try {
        const { title, image, price, description, genre, stock } = req.body;
        const product = await Product.findById(req.params.id);

        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        product.title = title || product.title;
        product.image = image || product.image;
        product.price = price || product.price;
        product.description = description || product.description;
        product.genre = genre || product.genre;
        product.stock = stock || product.stock;

        await product.save();

        res.status(200).json({ message: "Product updated successfully", product });
    } catch (error) {
        console.error("Error updating product:", error);
        res.status(500).json({ message: "Error updating product", error: error.message });
    }
}

export const deleteProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        // Hard delete or soft delete? User asked to "delete", usually implies removal or hiding.
        // Given earlier code had "isActive", soft delete might be better, but user asked for "delete".
        // I will do a hard delete for simplicity unless "isActive" was strictly preferred. 
        // Actually, previous code used isActive. Let's stick to hard delete for "Admin features" usually implies full control. 
        // Or I can offer both. Let's do `deleteOne` for now to be "clean".

        await Product.deleteOne({ _id: req.params.id });
        res.status(200).json({ message: "Product deleted successfully" });
    } catch (error) {
        console.error("Error deleting product:", error);
        res.status(500).json({ message: "Error deleting product", error: error.message });
    }
>>>>>>> 699a03d (inital deployment)
}