import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser, registerUser } from '../../services/authServices';

const LoginModal = ({ isOpen, onClose }) => {
    const navigate = useNavigate();
    const [isLogin, setIsLogin] = useState(true);

    const [loginData, setLoginData] = useState({
        email: "",
        password: ""
    });

    const [registerData, setRegisterData] = useState({
        name: "",
        email: "",
        password: ""
    });

    const handleLoginChange = (e) => {
        setLoginData({
            ...loginData,
            [e.target.name]: e.target.value
        });
    };

    const handleRegisterChange = (e) => {
        setRegisterData({
            ...registerData,
            [e.target.name]: e.target.value
        });
    };

    const handleLoginSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await loginUser(loginData);
            alert("Login successful!");
            if (response.data.token) {
                localStorage.setItem('token', response.data.token);
                // Store user info if needed
                localStorage.setItem('user', JSON.stringify(response.data.user));
            }
            onClose();

            navigate('/');
            window.location.reload(); // Ensure header state updates immediately
        } catch (error) {
            alert(error.response?.data?.message || "Login failed. Please try again.");
        }
    };

    const handleRegisterSubmit = async (e) => {
        e.preventDefault();
        try {
            await registerUser(registerData);
            alert("OTP sent to your email");
            onClose();
            navigate('/verify-otp', { state: { email: registerData.email } });
        } catch (error) {
            alert(error.response?.data?.message || "Registration failed. Please try again.");
        }
    };

    if (!isOpen) return null;

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <button className="modal-close" onClick={onClose}>×</button>

                <div className="auth-tabs">
                    <button
                        className={`tab-btn ${isLogin ? 'active' : ''}`}
                        onClick={() => setIsLogin(true)}
                    >
                        Login
                    </button>
                    <button
                        className={`tab-btn ${!isLogin ? 'active' : ''}`}
                        onClick={() => setIsLogin(false)}
                    >
                        Register
                    </button>
                </div>

                {isLogin ? (
                    <div className="auth-form">
                        <h2>Login</h2>
                        <form onSubmit={handleLoginSubmit}>
                            <input
                                type="email"
                                name="email"
                                placeholder="Email"
                                value={loginData.email}
                                onChange={handleLoginChange}
                                required
                            />
                            <input
                                type="password"
                                name="password"
                                placeholder="Password"
                                value={loginData.password}
                                onChange={handleLoginChange}
                                required
                            />
                            <button type="submit">Login</button>
                        </form>
                    </div>
                ) : (
                    <div className="auth-form">
                        <h2>Register</h2>
                        <form onSubmit={handleRegisterSubmit}>
                            <input
                                type="text"
                                name="name"
                                placeholder="Name"
                                value={registerData.name}
                                onChange={handleRegisterChange}
                                required
                            />
                            <input
                                type="email"
                                name="email"
                                placeholder="Email"
                                value={registerData.email}
                                onChange={handleRegisterChange}
                                required
                            />
                            <input
                                type="password"
                                name="password"
                                placeholder="Password"
                                value={registerData.password}
                                onChange={handleRegisterChange}
                                required
                            />
                            <button type="submit">Register</button>
                        </form>
                    </div>
                )}
            </div>
        </div>
    );
};

export default LoginModal;

