import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { loginUser, registerUser } from '../../services/authServices';
import { FiMail, FiLock, FiUser, FiArrowRight } from 'react-icons/fi';

const Auth = () => {
    const navigate = useNavigate();
    const [isLogin, setIsLogin] = useState(true);
    const [loading, setLoading] = useState(false);

    React.useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            navigate('/');
        }
    }, [navigate]);

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
        setLoginData({ ...loginData, [e.target.name]: e.target.value });
    };

    const handleRegisterChange = (e) => {
        setRegisterData({ ...registerData, [e.target.name]: e.target.value });
    };

    const handleLoginSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await loginUser(loginData);
            if (response.data.token) {
                localStorage.setItem('token', response.data.token);
                localStorage.setItem('user', JSON.stringify(response.data.user));
            }
            navigate('/');
            window.location.reload();
        } catch (error) {
            alert(error.response?.data?.message || "Login failed. Please check your credentials.");
        } finally {
            setLoading(false);
        }
    };

    const handleRegisterSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await registerUser(registerData);
            navigate('/verify-otp', { state: { email: registerData.email } });
        } catch (error) {
            alert(error.response?.data?.message || "Registration failed. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-page-container">
            <div className="auth-card">
                <div className="auth-visual">
                    <div className="visual-content">
                        <h2>Welcome to <br /><span>AutoDrive</span></h2>
                        <p>Experience the future of luxury mobility. Join our exclusive community of automotive enthusiasts.</p>
                        <ul className="benefits-list">
                            <li>✨ Premium Inventory Access</li>
                            <li>💳 Seamless Secure Checkout</li>
                            <li>🛠️ Personalized Car Management</li>
                        </ul>
                    </div>
                    <div className="visual-overlay"></div>
                </div>

                <div className="auth-form-section">
                    <div className="form-header">
                        <h1>{isLogin ? 'Welcome Back!' : 'Create Account'}</h1>
                        <p>{isLogin ? 'Sign in to access your luxury fleet.' : 'Join us to start your automotive journey.'}</p>
                    </div>

                    <div className="auth-tabs-modern">
                        <button
                            className={`tab-btn ${isLogin ? 'active' : ''}`}
                            onClick={() => setIsLogin(true)}
                        >
                            Log In
                        </button>
                        <button
                            className={`tab-btn ${!isLogin ? 'active' : ''}`}
                            onClick={() => setIsLogin(false)}
                        >
                            Sign Up
                        </button>
                    </div>

                    {isLogin ? (
                        <form className="modern-form" onSubmit={handleLoginSubmit}>
                            <div className="input-field">
                                <FiMail className="input-icon" />
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="Email Address"
                                    value={loginData.email}
                                    onChange={handleLoginChange}
                                    required
                                />
                            </div>
                            <div className="input-field">
                                <FiLock className="input-icon" />
                                <input
                                    type="password"
                                    name="password"
                                    placeholder="Password"
                                    value={loginData.password}
                                    onChange={handleLoginChange}
                                    required
                                />
                            </div>
                            <div style={{ textAlign: 'right', marginBottom: '15px', marginTop: '-10px' }}>
                                <Link to="/forgot-password" style={{ fontSize: '0.85rem', color: 'var(--accent-color)', textDecoration: 'none', fontWeight: '700' }}>
                                    Forgot Password?
                                </Link>
                            </div>
                            <button type="submit" className="btn-auth-primary" disabled={loading}>
                                {loading ? 'Processing...' : 'Sign In'} <FiArrowRight />
                            </button>
                        </form>
                    ) : (
                        <form className="modern-form" onSubmit={handleRegisterSubmit}>
                            <div className="input-field">
                                <FiUser className="input-icon" />
                                <input
                                    type="text"
                                    name="name"
                                    placeholder="Full Name"
                                    value={registerData.name}
                                    onChange={handleRegisterChange}
                                    required
                                />
                            </div>
                            <div className="input-field">
                                <FiMail className="input-icon" />
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="Email Address"
                                    value={registerData.email}
                                    onChange={handleRegisterChange}
                                    required
                                />
                            </div>
                            <div className="input-field">
                                <FiLock className="input-icon" />
                                <input
                                    type="password"
                                    name="password"
                                    placeholder="Create Password"
                                    value={registerData.password}
                                    onChange={handleRegisterChange}
                                    required
                                />
                            </div>
                            <button type="submit" className="btn-auth-primary" disabled={loading}>
                                {loading ? 'Processing...' : 'Create Account'} <FiArrowRight />
                            </button>
                        </form>
                    )}

                    <div className="form-footer">
                        <p>
                            {isLogin
                                ? "Don't have an account? "
                                : "Already have an account? "}
                            <span onClick={() => setIsLogin(!isLogin)}>
                                {isLogin ? 'Sign up now' : 'Log in here'}
                            </span>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Auth;
