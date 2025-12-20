import axios from 'axios';

const API = axios.create(
    { baseURL: 'http://localhost:5000/fusioncars' }
)
export const registerUser = (data)=> API.post('/users/register', data);

export const verifyUser = (data)=> API.post('/users/verify-otp', data);

export const loginUser = (data)=> API.post('/users/login', data);