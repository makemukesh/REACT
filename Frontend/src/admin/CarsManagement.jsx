import React, { useEffect, useState } from 'react';
import { getAllProducts, deleteProduct } from '../../services/productServices';
import { Link } from 'react-router-dom';
import AdminHeader from './AdminHeader';
const CarsManagement = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const response = await getAllProducts();
            setProducts(response.data.products || []);
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

    return (
        <div className="admin-page-container">
            <AdminHeader />
            <div className="admin-content">
                <div className="content-header">
                    <h1>Cars Management</h1>
                    <Link to="/admin/add" className="btn-add-new">+ Add New Car</Link>
                </div>

                {loading ? <p>Loading...</p> : (
                    <div className="table-responsive">
                        <table className="admin-table">
                            <thead>
                                <tr>
                                    <th>Image</th>
                                    <th>Title</th>
                                    <th>Price</th>
                                    <th>Stock</th>
                                    <th>Genre</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {products.map(product => (
                                    <tr key={product._id}>
                                        <td>
                                            <img src={product.image} alt={product.title} className="table-img" />
                                        </td>
                                        <td>{product.title}</td>
                                        <td>${product.price.toLocaleString()}</td>
                                        <td>{product.stock}</td>
                                        <td>{product.genre}</td>
                                        <td>
                                            <div className="action-buttons-group">
                                                <Link to={`/admin/edit/${product._id}`} className="btn-edit-action">Edit</Link>
                                                <button onClick={() => handleDelete(product._id)} className="btn-delete-action">Delete</button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CarsManagement;
