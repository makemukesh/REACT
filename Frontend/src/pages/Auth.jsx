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
        <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
            <div className="bg-white rounded-3xl shadow-2xl overflow-hidden max-w-4xl w-full grid grid-cols-1 lg:grid-cols-2">
                {/* Visual Side */}
                <div className="hidden lg:block relative bg-gradient-to-br from-slate-900 to-slate-700 p-12 text-white">
                    <div className="relative z-10">
                        <h2 className="text-3xl font-bold mb-2">
                            Welcome to <br /><span className="text-[#ff3d00]">AutoDrive</span>
                        </h2>
                        <p className="text-white/70 mb-8">
                            Experience the future of luxury mobility. Join our exclusive community of automotive enthusiasts.
                        </p>
                        <ul className="space-y-3 text-sm">
                            <li className="flex items-center gap-2">✨ Premium Inventory Access</li>
                            <li className="flex items-center gap-2">💳 Seamless Secure Checkout</li>
                            <li className="flex items-center gap-2">🛠️ Personalized Car Management</li>
                        </ul>
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                </div>

                {/* Form Side */}
                <div className="p-8 lg:p-12">
                    <div className="text-center mb-8">
                        <h1 className="text-2xl font-bold text-slate-800 mb-2">
                            {isLogin ? 'Welcome Back!' : 'Create Account'}
                        </h1>
                        <p className="text-gray-500 text-sm">
                            {isLogin ? 'Sign in to access your luxury fleet.' : 'Join us to start your automotive journey.'}
                        </p>
                    </div>

                    {/* Tabs */}
                    <div className="flex mb-8 bg-gray-100 rounded-xl p-1">
                        <button
                            className={`flex-1 py-3 rounded-lg font-semibold text-sm transition-all ${isLogin ? 'bg-white text-[#ff3d00] shadow-sm' : 'text-gray-500'
                                }`}
                            onClick={() => setIsLogin(true)}
                        >
                            Log In
                        </button>
                        <button
                            className={`flex-1 py-3 rounded-lg font-semibold text-sm transition-all ${!isLogin ? 'bg-white text-[#ff3d00] shadow-sm' : 'text-gray-500'
                                }`}
                            onClick={() => setIsLogin(false)}
                        >
                            Sign Up
                        </button>
                    </div>

                    {isLogin ? (
                        <form onSubmit={handleLoginSubmit} className="space-y-5">
                            <div className="relative">
                                <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="Email Address"
                                    value={loginData.email}
                                    onChange={handleLoginChange}
                                    required
                                    className="w-full pl-12 pr-4 py-4 border border-gray-200 rounded-xl focus:outline-none focus:border-[#ff3d00] transition-colors"
                                />
                            </div>
                            <div className="relative">
                                <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                                <input
                                    type="password"
                                    name="password"
                                    placeholder="Password"
                                    value={loginData.password}
                                    onChange={handleLoginChange}
                                    required
                                    className="w-full pl-12 pr-4 py-4 border border-gray-200 rounded-xl focus:outline-none focus:border-[#ff3d00] transition-colors"
                                />
                            </div>
                            <div className="text-right">
                                <Link to="/forgot-password" className="text-sm text-[#ff3d00] font-semibold hover:underline">
                                    Forgot Password?
                                </Link>
                            </div>
                            <button
                                type="submit"
                                className="w-full py-4 bg-[#ff3d00] text-white font-bold rounded-xl hover:bg-[#e63600] transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-70"
                                disabled={loading}
                            >
                                {loading ? 'Processing...' : 'Sign In'} <FiArrowRight />
                            </button>
                        </form>
                    ) : (
                        <form onSubmit={handleRegisterSubmit} className="space-y-5">
                            <div className="relative">
                                <FiUser className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                                <input
                                    type="text"
                                    name="name"
                                    placeholder="Full Name"
                                    value={registerData.name}
                                    onChange={handleRegisterChange}
                                    required
                                    className="w-full pl-12 pr-4 py-4 border border-gray-200 rounded-xl focus:outline-none focus:border-[#ff3d00] transition-colors"
                                />
                            </div>
                            <div className="relative">
                                <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="Email Address"
                                    value={registerData.email}
                                    onChange={handleRegisterChange}
                                    required
                                    className="w-full pl-12 pr-4 py-4 border border-gray-200 rounded-xl focus:outline-none focus:border-[#ff3d00] transition-colors"
                                />
                            </div>
                            <div className="relative">
                                <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                                <input
                                    type="password"
                                    name="password"
                                    placeholder="Create Password"
                                    value={registerData.password}
                                    onChange={handleRegisterChange}
                                    required
                                    className="w-full pl-12 pr-4 py-4 border border-gray-200 rounded-xl focus:outline-none focus:border-[#ff3d00] transition-colors"
                                />
                            </div>
                            <button
                                type="submit"
                                className="w-full py-4 bg-[#ff3d00] text-white font-bold rounded-xl hover:bg-[#e63600] transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-70"
                                disabled={loading}
                            >
                                {loading ? 'Processing...' : 'Create Account'} <FiArrowRight />
                            </button>
                        </form>
                    )}

                    <div className="text-center mt-6">
                        <p className="text-gray-500 text-sm">
                            {isLogin ? "Don't have an account? " : "Already have an account? "}
                            <span
                                onClick={() => setIsLogin(!isLogin)}
                                className="text-[#ff3d00] font-semibold cursor-pointer hover:underline"
                            >
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
