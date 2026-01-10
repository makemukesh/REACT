import Product from "../models/product.js";

// Treat "cars" as products for now to keep the API responsive
export const getAllCars = async (req, res) => {
  try {
    const cars = await Product.find({});
    res.status(200).json(cars);
  } catch (error) {
    res.status(500).json({ message: "Error fetching cars", error: error.message });
  }
};

export const getCarById = async (req, res) => {
  try {
    const car = await Product.findById(req.params.id);
    if (!car) return res.status(404).json({ message: "Car not found" });
    res.status(200).json(car);
  } catch (error) {
    res.status(500).json({ message: "Error fetching car", error: error.message });
  }
};

export const createCar = async (req, res) => {
  try {
    const car = await Product.create(req.body);
    res.status(201).json({ message: "Car created successfully", car });
  } catch (error) {
    res.status(500).json({ message: "Error creating car", error: error.message });
  }
};

export const updateCar = async (req, res) => {
  try {
    const car = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!car) return res.status(404).json({ message: "Car not found" });
    res.status(200).json({ message: "Car updated successfully", car });
  } catch (error) {
    res.status(500).json({ message: "Error updating car", error: error.message });
  }
};

export const deleteCar = async (req, res) => {
  try {
    const car = await Product.findByIdAndDelete(req.params.id);
    if (!car) return res.status(404).json({ message: "Car not found" });
    res.status(200).json({ message: "Car deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting car", error: error.message });
  }
};


