import React, { useState, useEffect } from 'react';
import { getUserBookings } from '../services/api';
import { Link } from 'react-router-dom';
import {
    Loader2, Hotel, Plane, Train, Bus, Utensils, Map, Calendar,
    CheckCircle2, XCircle, Clock, User, ArrowLeft
} from 'lucide-react';

const StatusBadge = ({ status }) => {
    const map = {
        CONFIRMED: { color: 'bg-emerald-100 text-emerald-700', icon: <CheckCircle2 className="h-3 w-3" /> },
        CANCELLED: { color: 'bg-rose-100 text-rose-700', icon: <XCircle className="h-3 w-3" /> },
        COMPLETED: { color: 'bg-blue-100 text-blue-700', icon: <CheckCircle2 className="h-3 w-3" /> },
    };
    const { color, icon } = map[status] || map.CONFIRMED;
    return (
        <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-black ${color}`}>
            {icon} {status}
        </span>
    );
};

const typeIcon = (type) => {
    const icons = { HOTEL: Hotel, FLIGHT: Plane, TRAIN: Train, BUS: Bus, RESTAURANT: Utensils, TRIP: Map };
    const Icon = icons[type] || Map;
    return <Icon className="h-5 w-5" />;
};

const typeColor = (type) => {
    const colors = { HOTEL: 'bg-amber-100 text-amber-600', FLIGHT: 'bg-sky-100 text-sky-600', TRAIN: 'bg-orange-100 text-orange-600', BUS: 'bg-teal-100 text-teal-600', RESTAURANT: 'bg-purple-100 text-purple-600', TRIP: 'bg-emerald-100 text-emerald-600' };
    return colors[type] || 'bg-slate-100 text-slate-600';
};

const MyBookings = () => {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [filter, setFilter] = useState('ALL');

    const user = JSON.parse(localStorage.getItem('user') || '{}');

    useEffect(() => {
        if (!user?.id) {
            setError('Please login to view your bookings.');
            setLoading(false);
            return;
        }
        getUserBookings(user.id)
            .then(data => {
                console.log('Bookings loaded:', data);
                setBookings(data);
            })
            .catch((err) => {
                console.error('Error fetching bookings:', err);
                setError('Could not load bookings. Please try again.');
            })
            .finally(() => setLoading(false));
    }, []);

    const types = ['ALL', 'TRIP', 'HOTEL', 'RESTAURANT', 'FLIGHT', 'TRAIN', 'BUS'];
    const filtered = filter === 'ALL' ? bookings : bookings.filter(b => b.bookingType === filter);

    return (
        <div className="bg-slate-50 min-h-screen">
            {/* Hero */}
            <div className="bg-secondary py-24 relative overflow-hidden">
                <div className="absolute inset-0">
                    <img src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1600&auto=format&fit=crop" className="w-full h-full object-cover opacity-10" alt="" />
                </div>
                <div className="max-w-6xl mx-auto px-4 relative z-10">
                    <div className="flex items-center gap-4 mb-4">
                        <Link to="/" className="p-2 bg-white/10 rounded-xl hover:bg-white/20 transition-all">
                            <ArrowLeft className="h-5 w-5 text-white" />
                        </Link>
                        <span className="text-slate-400 font-bold">My Account</span>
                    </div>
                    <h1 className="text-5xl font-black text-white mb-3">My Bookings</h1>
                    <p className="text-slate-400 font-bold text-lg">
                        Welcome back, {user.firstName || 'Traveller'}! You have {bookings.length} booking{bookings.length !== 1 ? 's' : ''}.
                    </p>
                </div>
            </div>

            <div className="max-w-6xl mx-auto px-4 py-12">
                {/* Filter Tabs */}
                <div className="flex gap-2 overflow-x-auto pb-2 mb-8">
                    {types.map(t => (
                        <button
                            key={t}
                            onClick={() => setFilter(t)}
                            className={`px-4 py-2 rounded-xl font-black text-sm whitespace-nowrap transition-all ${filter === t ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-100' : 'bg-white text-slate-500 border border-slate-100 hover:bg-slate-50'}`}
                        >
                            {t}
                        </button>
                    ))}
                </div>

                {loading ? (
                    <div className="flex flex-col items-center justify-center py-20">
                        <Loader2 className="h-12 w-12 text-emerald-500 animate-spin mb-4" />
                        <p className="text-slate-500 font-bold">Loading your bookings...</p>
                    </div>
                ) : error ? (
                    <div className="text-center py-20 bg-white rounded-3xl border border-slate-100">
                        <p className="text-rose-500 font-bold text-lg mb-4">{error}</p>
                        {!user?.id && (
                            <Link to="/login" className="bg-emerald-500 text-white px-8 py-3 rounded-2xl font-bold hover:bg-emerald-600 transition-all">
                                Login
                            </Link>
                        )}
                    </div>
                ) : filtered.length === 0 ? (
                    <div className="text-center py-20 bg-white rounded-3xl border border-slate-100">
                        <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Calendar className="h-10 w-10 text-slate-300" />
                        </div>
                        <h3 className="text-xl font-black text-slate-600 mb-2">No {filter !== 'ALL' ? filter.toLowerCase() : ''} bookings yet</h3>
                        <p className="text-slate-400 font-bold mb-6">Start exploring and make your first booking!</p>
                        <Link to="/discover" className="bg-emerald-500 text-white px-8 py-3 rounded-2xl font-bold hover:bg-emerald-600 transition-all">
                            Discover Destinations
                        </Link>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {filtered.map(b => (
                            <div key={b.id} className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100 hover:shadow-md transition-all">
                                <div className="flex items-start justify-between">
                                    <div className="flex items-start gap-4">
                                        <div className={`p-3 rounded-2xl ${typeColor(b.bookingType)}`}>
                                            {typeIcon(b.bookingType)}
                                        </div>
                                        <div>
                                            <div className="flex items-center gap-2 mb-1">
                                                <span className="font-black text-slate-800 text-lg">
                                                    {b.bookingType} #{b.id}
                                                </span>
                                                <StatusBadge status={b.status} />
                                            </div>
                                            <div className="flex items-center gap-4 text-sm text-slate-500">
                                                <span className="flex items-center gap-1 font-bold">
                                                    <Calendar className="h-4 w-4" />
                                                    {b.travelDate ? new Date(b.travelDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }) : 'N/A'}
                                                </span>
                                                <span className="flex items-center gap-1 font-bold">
                                                    <User className="h-4 w-4" /> {b.numberOfPeople} {b.numberOfPeople === 1 ? 'person' : 'people'}
                                                </span>
                                            </div>
                                            <p className="text-xs text-slate-400 font-bold mt-1">
                                                Booked on: {b.bookingDate ? new Date(b.bookingDate).toLocaleDateString('en-IN') : 'N/A'}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-2xl font-black text-emerald-600">₹{b.totalPrice?.toLocaleString()}</p>
                                        <p className="text-xs text-slate-400 font-bold">Total Paid</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default MyBookings;
