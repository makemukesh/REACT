import axios from 'axios';

const API = axios.create({
    baseURL: 'http://localhost:10000/users'
});

// Add interceptor to include token in all requests
API.interceptors.request.use((req) => {
    const token = localStorage.getItem('token');
    if (token) {
        req.headers.Authorization = token;
    }
    return req;
});

export const registerUser = (data) => API.post('/register', data);
export const verifyUser = (data) => API.post('/verify-otp', data);
export const loginUser = (data) => API.post('/login', data);

export const updateProfile = (data) => API.put('/profile', data);
export const changePassword = (data) => API.put('/change-password', data);
export const forgotPassword = (data) => API.post('/forgot-password', data);
export const resetPassword = (data) => API.post('/reset-password', data);

export default API;
