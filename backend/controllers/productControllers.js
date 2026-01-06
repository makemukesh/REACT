import Product from "../models/Product.js";

export const createProduct = async (req, res) => {
    try {
        const {
            title, image, price, description, genre, brand, stock,
            manufacturingYear, transmission, fuelType, groundClearance,
            bootSpace, torque, power, engineCapacity,
            kilometersDone, exteriorColor
        } = req.body;

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
            brand: brand,
            stock: stock || 1,
            isActive: true,
            manufacturingYear,
            transmission,
            fuelType,
            groundClearance,
            bootSpace,
            torque,
            power,
            engineCapacity,
            kilometersDone,
            exteriorColor
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

export const bulkCreateProducts = async (req, res) => {
    try {
        const products = req.body; // Expecting an array

        if (!Array.isArray(products)) {
            return res.status(400).json({ message: "Data must be an array of products" });
        }

        const validBrands = ['BMW', 'Mercedes', 'Audi', 'Bentley', 'Porsche', 'Ferrari', 'Lamborghini', 'Rolls Royce'];

        const formattedProducts = products.map(item => {
            const title = item.title || item.name || "Untitled Car";

            // Extract brand if missing
            let brand = item.brand;
            if (!brand) {
                const foundBrand = validBrands.find(b => title.toLowerCase().includes(b.toLowerCase()));
                brand = foundBrand || "BMW"; // Default to BMW if not found
            }

            return {
                title: title.trim(),
                image: item.image || item.img || item.url || "",
                price: Number(item.price || item.cost || 0),
                description: item.description || item.desc || "No description provided",
                genre: item.genre || item.category || item.type || "general",
                brand: brand,
                stock: Number(item.stock || item.qty || 1),
                isActive: true,
                manufacturingYear: item.manufacturingYear || item.year,
                transmission: item.transmission,
                fuelType: item.fuelType,
                groundClearance: item.groundClearance,
                bootSpace: item.bootSpace,
                torque: item.torque,
                power: item.power,
                engineCapacity: item.engineCapacity,
                kilometersDone: item.kilometersDone,
                exteriorColor: item.exteriorColor
            };
        });

        const result = await Product.insertMany(formattedProducts);

        res.status(201).json({
            message: `${result.length} products imported successfully`,
            products: result
        });
    } catch (error) {
        console.error("Error bulk creating products:", error);
        res.status(500).json({ message: "Error importing products", error: error.message });
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
        const {
            title, image, price, description, genre, brand, stock,
            manufacturingYear, transmission, fuelType, groundClearance,
            bootSpace, torque, power, engineCapacity,
            kilometersDone, exteriorColor
        } = req.body;
        const product = await Product.findById(req.params.id);

        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        product.title = title || product.title;
        product.image = image || product.image;
        product.price = price || product.price;
        product.description = description || product.description;
        product.genre = genre || product.genre;
        product.brand = brand || product.brand;
        product.stock = stock || product.stock;

        product.manufacturingYear = manufacturingYear !== undefined ? manufacturingYear : product.manufacturingYear;
        product.transmission = transmission || product.transmission;
        product.fuelType = fuelType || product.fuelType;
        product.groundClearance = groundClearance || product.groundClearance;
        product.bootSpace = bootSpace || product.bootSpace;
        product.torque = torque || product.torque;
        product.power = power || product.power;
        product.engineCapacity = engineCapacity || product.engineCapacity;
        product.kilometersDone = kilometersDone || product.kilometersDone;
        product.exteriorColor = exteriorColor || product.exteriorColor;

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
}