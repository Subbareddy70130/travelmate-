import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, User, Lock, ArrowRight, Loader2 } from 'lucide-react';
import { loginUser } from '../services/api';

const Login = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        usernameOrEmail: '',
        password: ''
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    // Built-in admin fallback credentials (if backend fails or for dev)
    const ADMIN_USERNAME = 'admin';
    const ADMIN_PASSWORD = 'admin123';

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const data = await loginUser(formData);
            console.log('Login successful:', data);
            localStorage.setItem('user', JSON.stringify(data));

            // Redirect based on username or role
            if (data.username === 'admin' || data.role === 'ADMIN') {
                window.location.href = '/admin/dashboard';
            } else {
                window.location.href = '/';
            }
        } catch (err) {
            console.error('Login error:', err);
            const errorData = err.response?.data;
            const errorMessage = typeof errorData === 'string' ? errorData : errorData?.message || errorData?.error || 'Invalid username or password.';
            setError(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-50 py-20 px-4">
            <div className="w-full max-w-xl">
                <div className="bg-white rounded-[4rem] p-12 md:p-16 shadow-2xl border border-slate-100 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-bl-[4rem] -z-0 group-hover:scale-110 transition-transform"></div>

                    <div className="relative z-10">
                        <h1 className="text-4xl font-black text-secondary mb-2">Welcome Back</h1>
                        <p className="text-slate-400 mb-12 font-medium">Continue your journey with TravelMate.</p>

                        {error && (
                            <div className="mb-6 p-4 bg-red-50 border border-red-100 text-red-500 rounded-2xl font-bold text-sm">
                                {error}
                            </div>
                        )}

                        <form className="space-y-8" onSubmit={handleSubmit}>
                            <div className="space-y-6">
                                <div className="relative">
                                    <User className="absolute left-6 top-5 h-6 w-6 text-slate-300" />
                                    <input
                                        type="text"
                                        placeholder="Username or Email"
                                        value={formData.usernameOrEmail}
                                        onChange={(e) => setFormData({ ...formData, usernameOrEmail: e.target.value })}
                                        className="w-full p-5 pl-16 bg-slate-50 border border-slate-100 rounded-3xl focus:ring-2 focus:ring-primary outline-none font-medium transition-all"
                                        required
                                    />
                                </div>
                                <div className="relative">
                                    <Lock className="absolute left-6 top-5 h-6 w-6 text-slate-300" />
                                    <input
                                        type="password"
                                        placeholder="Password"
                                        value={formData.password}
                                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                        className="w-full p-5 pl-16 bg-slate-50 border border-slate-100 rounded-3xl focus:ring-2 focus:ring-primary outline-none font-medium transition-all"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="flex justify-between items-center text-sm font-bold">
                                <label className="flex items-center text-slate-500 cursor-pointer">
                                    <input type="checkbox" className="mr-2 h-4 w-4 accent-primary" />
                                    Remember me
                                </label>
                                <a href="#" className="text-primary hover:underline">Forgot Password?</a>
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-primary text-white py-5 rounded-3xl font-black text-lg hover:bg-emerald-600 transition-all shadow-xl shadow-emerald-100 flex items-center justify-center space-x-3 group disabled:opacity-70"
                            >
                                {loading ? (
                                    <Loader2 className="h-6 w-6 animate-spin" />
                                ) : (
                                    <>
                                        <span>Sign In</span>
                                        <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                                    </>
                                )}
                            </button>
                        </form>

                        <p className="mt-12 text-center text-slate-500 font-bold">
                            Don't have an account? <Link to="/signup" className="text-primary hover:underline ml-1">Create Account</Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
