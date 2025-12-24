import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:3000" });

export const getAllCars = () => API.get("/api/cars");
export const getCarById = (id) => API.get(`/api/cars/${id}`);
export const createCar = (data) => API.post("/api/cars", data);
export const updateCar = (id, data) => API.put(`/api/cars/${id}`, data);
export const deleteCar = (id) => API.delete(`/api/cars/${id}`);


