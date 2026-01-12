import React, { useEffect, useState } from 'react';
import { getAllProducts, deleteProduct } from '../../services/productServices';
import { Link, useNavigate } from 'react-router-dom';
import AdminSidebar from './AdminSidebar';
import { FiPlus, FiEdit2, FiTrash2, FiEye } from 'react-icons/fi';

const CarsManagement = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const response = await getAllProducts();
            setProducts(response.data.products || response.data || []);
            setLoading(false);
        } catch (err) {
            console.error("Error fetching products:", err);
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this car?")) {
            try {
                await deleteProduct(id);
                setProducts(products.filter(p => p._id !== id));
            } catch (err) {
                alert("Failed to delete product");
            }
        }
    };

    const [adminUser, setAdminUser] = useState(null);
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            try {
                const decoded = JSON.parse(atob(token.split(".")[1]));
                setAdminUser(decoded);
            } catch (e) { }
        }
    }, []);

    const initials = (adminUser?.name || "Admin")
        .split(" ")
        .filter(Boolean)
        .map(n => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2) || "A";

    return (
        <div className="flex min-h-screen bg-gray-100">
            <AdminSidebar />
            <main className="flex-1 p-8">
                {/* Top Bar */}
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h1 className="text-2xl font-bold text-slate-800">Inventory Management</h1>
                        <p className="text-gray-500">Manage and monitor your vehicle stock</p>
                    </div>
                    <div className="flex items-center gap-4">
                        <Link
                            to="/admin/add"
                            className="flex items-center gap-2 px-5 py-3 bg-[#ff3d00] text-white font-medium rounded-xl hover:bg-[#e63600] transition-colors"
                        >
                            <FiPlus /> Add New Car
                        </Link>
                        <div
                            className="w-10 h-10 bg-[#ff3d00] rounded-full flex items-center justify-center text-white font-bold cursor-pointer"
                            onClick={() => navigate('/profile')}
                        >
                            {initials}
                        </div>
                    </div>
                </div>

                {/* Cars Table */}
                <div className="bg-white rounded-2xl p-6 shadow-sm">
                    {loading ? (
                        <div className="flex items-center justify-center py-12">
                            <div className="w-8 h-8 border-4 border-gray-200 border-t-[#ff3d00] rounded-full animate-spin"></div>
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    <tr className="text-left text-sm text-gray-500 border-b border-gray-100">
                                        <th className="pb-4 font-medium">Image</th>
                                        <th className="pb-4 font-medium">Car Name</th>
                                        <th className="pb-4 font-medium">Price</th>
                                        <th className="pb-4 font-medium">Stock</th>
                                        <th className="pb-4 font-medium">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {products.map(product => (
                                        <tr key={product._id} className="border-b border-gray-50 hover:bg-gray-50">
                                            <td className="py-4">
                                                <img
                                                    src={product.image || "https://images.unsplash.com/photo-1503376780353-7e6692767b70"}
                                                    alt={product.title}
                                                    onError={(e) => e.target.src = "https://images.unsplash.com/photo-1503376780353-7e6692767b70"}
                                                    className="w-20 h-14 object-cover rounded-lg"
                                                />
                                            </td>
                                            <td className="py-4">
                                                <p className="font-medium text-slate-800">{product.title}</p>
                                                <p className="text-sm text-gray-400">{product.genre}</p>
                                            </td>
                                            <td className="py-4 font-semibold text-slate-800">
                                                ${product.price ? product.price.toLocaleString() : "0"}
                                            </td>
                                            <td className="py-4">
                                                <span className={`px-3 py-1 text-xs font-medium rounded-full ${(product.stock || 0) > 0
                                                        ? 'bg-green-100 text-green-700'
                                                        : 'bg-red-100 text-red-700'
                                                    }`}>
                                                    {(product.stock || 0) > 0 ? `${product.stock} in stock` : 'Out of Stock'}
                                                </span>
                                            </td>
                                            <td className="py-4">
                                                <div className="flex items-center gap-2">
                                                    <Link
                                                        to={`/admin/edit/${product._id}`}
                                                        className="w-8 h-8 flex items-center justify-center bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors"
                                                    >
                                                        <FiEdit2 className="text-sm" />
                                                    </Link>
                                                    <Link
                                                        to={`/car/${product._id}`}
                                                        className="w-8 h-8 flex items-center justify-center bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-colors"
                                                    >
                                                        <FiEye className="text-sm" />
                                                    </Link>
                                                    <button
                                                        onClick={() => handleDelete(product._id)}
                                                        className="w-8 h-8 flex items-center justify-center bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors"
                                                    >
                                                        <FiTrash2 className="text-sm" />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            {products.length === 0 && (
                                <p className="text-center text-gray-500 py-8">No cars found in inventory.</p>
                            )}
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
};

export default CarsManagement;
