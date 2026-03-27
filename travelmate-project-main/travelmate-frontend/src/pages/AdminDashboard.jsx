import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
    PieChart, Pie, Cell, LineChart, Line
} from 'recharts';
import {
    Users, MapPin, Hotel, Utensils, Plane, Train, Bus, Briefcase,
    TrendingUp, Calendar, Loader2, Image as ImageIcon,
    LayoutDashboard, Navigation, Globe
} from 'lucide-react';
import { getAdminStats } from '../services/adminApi';

const COLORS = ['#10b981', '#3b82f6', '#f59e0b', '#ef4444', '#8b5cf6'];

const StatCard = ({ icon: Icon, label, value, color }) => (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
        <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-black text-slate-400 uppercase tracking-widest">{label}</span>
            <div className={`p-2 rounded-xl ${color}`}><Icon className="h-5 w-5 text-white" /></div>
        </div>
        <p className="text-4xl font-black text-secondary">{value ?? <Loader2 className="h-8 w-8 text-slate-200 animate-spin" />}</p>
    </div>
);

const AdminNavCard = ({ to, icon: Icon, label, color, count }) => (
    <Link to={to} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md hover:-translate-y-0.5 transition-all group">
        <div className={`w-12 h-12 ${color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
            <Icon className="h-6 w-6 text-white" />
        </div>
        <h3 className="font-black text-slate-800 text-lg">{label}</h3>
        {count !== undefined && <p className="text-slate-400 text-sm font-bold mt-1">{count} records</p>}
        <div className="mt-3 text-primary text-sm font-black">Manage →</div>
    </Link>
);

const AdminDashboard = () => {
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);

    const monthlyData = [
        { month: 'Oct', bookings: 12 }, { month: 'Nov', bookings: 18 },
        { month: 'Dec', bookings: 24 }, { month: 'Jan', bookings: 8 },
        { month: 'Feb', bookings: 22 }, { month: 'Mar', bookings: 30 },
    ];

    useEffect(() => {
        getAdminStats()
            .then(data => setStats(data))
            .catch(() => setStats({}))
            .finally(() => setLoading(false));
    }, []);

    const transportData = stats ? [
        { name: 'Flights', value: stats.totalFlights || 0 },
        { name: 'Trains', value: stats.totalTrains || 0 },
        { name: 'Buses', value: stats.totalBuses || 0 },
    ] : [];

    return (
        <div className="bg-slate-50 min-h-screen py-12 px-6">
            <div className="max-w-7xl mx-auto space-y-10">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-4xl font-black text-secondary mb-1">Admin Dashboard</h1>
                        <p className="text-slate-500 font-bold">Manage all TravelMate data from one place.</p>
                    </div>
                    <div className="flex items-center gap-3">
                        <Link to="/admin/bookings" className="bg-white px-5 py-3 rounded-xl shadow-sm border border-slate-100 hover:bg-slate-50 transition-all font-bold text-secondary text-sm flex items-center gap-2">
                            <Briefcase className="h-4 w-4 text-primary" /> Bookings
                        </Link>
                        <Link to="/admin/media" className="bg-white px-5 py-3 rounded-xl shadow-sm border border-slate-100 hover:bg-slate-50 transition-all font-bold text-secondary text-sm flex items-center gap-2">
                            <ImageIcon className="h-4 w-4 text-indigo-500" /> Media
                        </Link>
                    </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <StatCard icon={Users} label="Users" value={stats?.totalUsers} color="bg-blue-500" />
                    <StatCard icon={MapPin} label="Destinations" value={stats?.totalDestinations} color="bg-emerald-500" />
                    <StatCard icon={Hotel} label="Hotels" value={stats?.totalHotels} color="bg-amber-500" />
                    <StatCard icon={Briefcase} label="Bookings" value={stats?.totalBookings} color="bg-rose-500" />
                    <StatCard icon={Utensils} label="Restaurants" value={stats?.totalRestaurants} color="bg-purple-500" />
                    <StatCard icon={Plane} label="Flights" value={stats?.totalFlights} color="bg-sky-500" />
                    <StatCard icon={Train} label="Trains" value={stats?.totalTrains} color="bg-orange-500" />
                    <StatCard icon={Bus} label="Buses" value={stats?.totalBuses} color="bg-teal-500" />
                </div>

                {/* Navigation Grid */}
                <div>
                    <h2 className="text-2xl font-black text-slate-700 mb-5">Manage Content</h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <AdminNavCard to="/admin/users" icon={Users} label="Users" color="bg-blue-500" count={stats?.totalUsers} />
                        <AdminNavCard to="/admin/destinations" icon={Globe} label="Destinations" color="bg-emerald-500" count={stats?.totalDestinations} />
                        <AdminNavCard to="/admin/hotels" icon={Hotel} label="Hotels" color="bg-amber-500" count={stats?.totalHotels} />
                        <AdminNavCard to="/admin/restaurants" icon={Utensils} label="Restaurants" color="bg-purple-500" count={stats?.totalRestaurants} />
                        <AdminNavCard to="/admin/trips" icon={Navigation} label="Trips" color="bg-rose-500" />
                        <AdminNavCard to="/admin/places" icon={MapPin} label="Places" color="bg-slate-500" />
                        <AdminNavCard to="/admin/flights" icon={Plane} label="Flights" color="bg-sky-500" count={stats?.totalFlights} />
                        <AdminNavCard to="/admin/trains" icon={Train} label="Trains" color="bg-orange-500" count={stats?.totalTrains} />
                        <AdminNavCard to="/admin/buses" icon={Bus} label="Buses" color="bg-teal-500" count={stats?.totalBuses} />
                    </div>
                </div>

                {/* Charts */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                        <h2 className="font-black text-slate-700 mb-5">Monthly Booking Trends</h2>
                        <ResponsiveContainer width="100%" height={220}>
                            <LineChart data={monthlyData}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                                <XAxis dataKey="month" tick={{ fontSize: 12, fontWeight: 700, fill: '#94a3b8' }} />
                                <YAxis tick={{ fontSize: 12, fontWeight: 700, fill: '#94a3b8' }} />
                                <Tooltip />
                                <Line type="monotone" dataKey="bookings" stroke="#10b981" strokeWidth={3} dot={{ fill: '#10b981', r: 5 }} />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                        <h2 className="font-black text-slate-700 mb-5">Transport Distribution</h2>
                        {transportData.every(d => d.value === 0) ? (
                            <div className="flex items-center justify-center h-48 text-slate-400 font-bold">Add transport data to see chart</div>
                        ) : (
                            <ResponsiveContainer width="100%" height={220}>
                                <PieChart>
                                    <Pie data={transportData} cx="50%" cy="50%" outerRadius={80} dataKey="value" label={({ name, value }) => `${name}: ${value}`}>
                                        {transportData.map((_, index) => <Cell key={index} fill={COLORS[index % COLORS.length]} />)}
                                    </Pie>
                                    <Tooltip />
                                </PieChart>
                            </ResponsiveContainer>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
