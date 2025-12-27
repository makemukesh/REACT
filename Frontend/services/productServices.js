import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:3000" });

// Add a request interceptor to include the token in headers
API.interceptors.request.use((req) => {
    if (localStorage.getItem("token")) {
        req.headers.Authorization = localStorage.getItem("token");
    }
    return req;
});

export const getAllProducts = () => API.get("/api/admin/products");
export const getProductById = (id) => API.get(`/api/admin/products/${id}`);
export const createProduct = (data) => API.post("/api/admin/products/create-product", data);
export const updateProduct = (id, data) => API.put(`/api/admin/products/${id}`, data);
export const deleteProduct = (id) => API.delete(`/api/admin/products/${id}`);
