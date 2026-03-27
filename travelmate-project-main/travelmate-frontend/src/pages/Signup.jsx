import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, Mail, Lock, Phone, ArrowRight, Eye, EyeOff, Loader2 } from 'lucide-react';
import { signupUser } from '../services/api';

const Signup = () => {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        username: '',
        phoneNumber: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (formData.password !== formData.confirmPassword) {
            setError('Passwords do not match');
            return;
        }
        setLoading(true);
        setError('');
        try {
            await signupUser({
                firstName: formData.firstName,
                lastName: formData.lastName,
                username: formData.username,
                phoneNumber: formData.phoneNumber,
                email: formData.email,
                password: formData.password
            });
            setSuccess(true);
            setTimeout(() => navigate('/login'), 2000);
        } catch (err) {
            console.error('Signup error:', err);
            setError(err.response?.data || 'An error occurred during signup.');
        } finally {
            setLoading(false);
        }
    };

    if (success) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-slate-50 py-20 px-4">
                <div className="w-full max-w-2xl text-center bg-white rounded-[4rem] p-16 shadow-2xl border border-slate-100">
                    <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-8">
                        <Loader2 className="h-10 w-10 text-primary" />
                    </div>
                    <h1 className="text-4xl font-black text-secondary mb-4">Account Created!</h1>
                    <p className="text-slate-500 text-lg">Your account has been successfully created. Redirecting to login...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-50 py-20 px-4">
            <div className="w-full max-w-3xl">
                <div className="bg-white rounded-[4rem] p-12 md:p-16 shadow-2xl border border-slate-100">
                    <h1 className="text-4xl font-black text-secondary mb-2">Create Account</h1>
                    <p className="text-slate-400 mb-12 font-medium">Join TravelMate and start planning your dream trips.</p>

                    {error && (
                        <div className="mb-6 p-4 bg-red-50 border border-red-100 text-red-500 rounded-2xl font-bold text-sm">
                            {error}
                        </div>
                    )}

                    <form className="space-y-6" onSubmit={handleSubmit}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="relative">
                                <User className="absolute left-6 top-5 h-6 w-6 text-slate-300" />
                                <input
                                    type="text"
                                    placeholder="First Name"
                                    value={formData.firstName}
                                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                                    className="w-full p-5 pl-16 bg-slate-50 border border-slate-100 rounded-3xl focus:ring-2 focus:ring-primary outline-none transition-all"
                                    required
                                />
                            </div>
                            <div className="relative">
                                <User className="absolute left-6 top-5 h-6 w-6 text-slate-300" />
                                <input
                                    type="text"
                                    placeholder="Last Name"
                                    value={formData.lastName}
                                    onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                                    className="w-full p-5 pl-16 bg-slate-50 border border-slate-100 rounded-3xl focus:ring-2 focus:ring-primary outline-none transition-all"
                                    required
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="relative">
                                <User className="absolute left-6 top-5 h-6 w-6 text-slate-300" />
                                <input
                                    type="text"
                                    placeholder="Username"
                                    value={formData.username}
                                    onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                                    className="w-full p-5 pl-16 bg-slate-50 border border-slate-100 rounded-3xl focus:ring-2 focus:ring-primary outline-none transition-all"
                                    required
                                />
                            </div>
                            <div className="relative">
                                <Phone className="absolute left-6 top-5 h-6 w-6 text-slate-300" />
                                <input
                                    type="tel"
                                    placeholder="Phone Number"
                                    value={formData.phoneNumber}
                                    onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                                    className="w-full p-5 pl-16 bg-slate-50 border border-slate-100 rounded-3xl focus:ring-2 focus:ring-primary outline-none transition-all"
                                    required
                                />
                            </div>
                        </div>

                        <div className="relative">
                            <Mail className="absolute left-6 top-5 h-6 w-6 text-slate-300" />
                            <input
                                type="email"
                                placeholder="Email Address"
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                className="w-full p-5 pl-16 bg-slate-50 border border-slate-100 rounded-3xl focus:ring-2 focus:ring-primary outline-none transition-all"
                                required
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="relative">
                                <Lock className="absolute left-6 top-5 h-6 w-6 text-slate-300" />
                                <input
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Password"
                                    value={formData.password}
                                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                    className="w-full p-5 pl-16 pr-14 bg-slate-50 border border-slate-100 rounded-3xl focus:ring-2 focus:ring-primary outline-none transition-all"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-5 top-5 text-slate-300 hover:text-slate-500 transition-colors"
                                >
                                    {showPassword ? <EyeOff className="h-6 w-6" /> : <Eye className="h-6 w-6" />}
                                </button>
                            </div>
                            <div className="relative">
                                <Lock className="absolute left-6 top-5 h-6 w-6 text-slate-300" />
                                <input
                                    type={showConfirmPassword ? "text" : "password"}
                                    placeholder="Confirm Password"
                                    value={formData.confirmPassword}
                                    onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                                    className="w-full p-5 pl-16 pr-14 bg-slate-50 border border-slate-100 rounded-3xl focus:ring-2 focus:ring-primary outline-none transition-all"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                    className="absolute right-5 top-5 text-slate-300 hover:text-slate-500 transition-colors"
                                >
                                    {showConfirmPassword ? <EyeOff className="h-6 w-6" /> : <Eye className="h-6 w-6" />}
                                </button>
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-primary text-white py-5 rounded-3xl font-black text-lg hover:bg-emerald-600 transition-all shadow-xl shadow-emerald-100 flex items-center justify-center space-x-3 group mt-4 disabled:opacity-70"
                        >
                            {loading ? (
                                <Loader2 className="h-6 w-6 animate-spin" />
                            ) : (
                                <>
                                    <span>Sign Up</span>
                                    <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                                </>
                            )}
                        </button>
                    </form>

                    <p className="mt-12 text-center text-slate-500 font-bold">
                        Already have an account? <Link to="/login" className="text-primary hover:underline ml-1">Sign In</Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Signup;
