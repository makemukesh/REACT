import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:10000" });

export const getAllCars = () => API.get("/api/admin/cars");
export const getCarById = (id) => API.get(`/api/admin/cars/${id}`);
export const createCar = (data) => API.post("/api/admin/cars", data);
export const updateCar = (id, data) => API.put(`/api/admin/cars/${id}`, data);
export const deleteCar = (id) => API.delete(`/api/admin/cars/${id}`);


