import axios from "axios";
import API_BASE_URL from './config.js';

const API = axios.create({ baseURL: API_BASE_URL });

export const getAllCars = () => API.get("/api/admin/cars");
export const getCarById = (id) => API.get(`/api/admin/cars/${id}`);
export const createCar = (data) => API.post("/api/admin/cars", data);
export const updateCar = (id, data) => API.put(`/api/admin/cars/${id}`, data);
export const deleteCar = (id) => API.delete(`/api/admin/cars/${id}`);
