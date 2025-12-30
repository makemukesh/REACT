import axios from 'axios';

const API_URL = 'http://localhost:10000/api/orders';

export const createOrder = async (orderData) => {
    const token = localStorage.getItem('token');
    return await axios.post(API_URL, orderData, {
        headers: {
            Authorization: token
        }
    });
};

export const getAllOrders = async () => {
    const token = localStorage.getItem('token');
    return await axios.get(API_URL, {
        headers: {
            Authorization: token
        }
    });
};

export const getUserOrders = async () => {
    const token = localStorage.getItem('token');
    return await axios.get(`${API_URL}/myorders`, {
        headers: {
            Authorization: token
        }
    });
};

export const updateOrder = async (id, status) => {
    const token = localStorage.getItem('token');
    return await axios.put(`${API_URL}/${id}`, { status }, {
        headers: {
            Authorization: token
        }
    });
};

export const deleteOrder = async (id) => {
    const token = localStorage.getItem('token');
    return await axios.delete(`${API_URL}/${id}`, {
        headers: {
            Authorization: token
        }
    });
};
