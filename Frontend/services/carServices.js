import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:3000'
});

// Fetch all cars
export const getAllCars = () => API.get('/api/cars');

// Fetch a single car by ID
export const getCarById = (id) => API.get(`/api/cars/${id}`);

// Add a new car (for admin use)
export const addCar = (data) => API.post('/api/cars', data);

// Update a car (for admin use)
export const updateCar = (id, data) => API.put(`/api/cars/${id}`, data);

// Delete a car (for admin use)
export const deleteCar = (id) => API.delete(`/api/cars/${id}`);

