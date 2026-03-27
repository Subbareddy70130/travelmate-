import React, { useState, useEffect } from 'react';
import {
    Briefcase, Search, Calendar, Loader2,
    CheckCircle, XCircle, Trash2, Hotel, Plane, Train, Bus,
    Utensils, Map, ArrowLeft
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { adminBookings } from '../services/adminApi';

const AdminBookings = () => {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filterType, setFilterType] = useState('ALL');
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        fetchBookings();
    }, []);

    const fetchBookings = async () => {
        try {
            const data = await adminBookings.getAll();
            setBookings(data);
        } catch (err) {
            console.error('Error fetching bookings:', err);
        } finally {
            setLoading(false);
        }
    };

    const handleUpdateStatus = async (id, status) => {
        try {
            await adminBookings.updateStatus(id, status);
            fetchBookings();
        } catch (err) {
            alert('Failed to update status');
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this booking?')) {
            try {
                await adminBookings.remove(id);
                fetchBookings();
            } catch (err) {
                alert('Failed to delete booking');
            }
        }
    };

    const getStatusBadge = (status) => {
        const styles = {
            CONFIRMED: 'bg-emerald-50 text-emerald-600 border-emerald-100',
            CANCELLED: 'bg-rose-50 text-rose-600 border-rose-100',
            COMPLETED: 'bg-blue-50 text-blue-600 border-blue-100'
        };
        return (
            <span className={`px-4 py-1.5 rounded-full text-xs font-black border ${styles[status]}`}>
                {status}
            </span>
        );
    };

    const filteredBookings = bookings.filter(booking => {
        const matchesFilter = filterType === 'ALL' || booking.bookingType === filterType;
        const matchesSearch = booking.user?.firstName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            booking.bookingType.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesFilter && matchesSearch;
    });

    return (
        <div className="bg-slate-50 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <div className="mb-10 flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
                    <div className="flex items-center gap-4">
                        <Link to="/admin/dashboard" className="p-2 bg-white rounded-xl shadow-sm border border-slate-100 hover:bg-slate-50">
                            <ArrowLeft className="h-5 w-5 text-slate-500" />
                        </Link>
                        <div>
                            <h1 className="text-4xl font-black text-secondary mb-2">Booking Management</h1>
                            <p className="text-slate-500 font-bold">{bookings.length} total bookings</p>
                        </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
                        <div className="relative group flex-grow">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                            <input
                                type="text"
                                placeholder="Search by user or type..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="pl-12 pr-6 py-4 bg-white border border-slate-100 rounded-2xl shadow-sm outline-none w-full focus:ring-4 focus:ring-primary/5 transition-all text-secondary font-bold"
                            />
                        </div>
                        <div className="flex bg-white p-1 rounded-2xl shadow-sm border border-slate-100">
                            {['ALL', 'HOTEL', 'FLIGHT', 'TRAIN', 'BUS', 'TRIP', 'RESTAURANT'].map(type => (
                                <button
                                    key={type}
                                    onClick={() => setFilterType(type)}
                                    className={`px-4 py-3 rounded-xl text-xs font-black transition-all ${filterType === type ? 'bg-secondary text-white shadow-lg' : 'text-slate-400 hover:text-secondary'
                                        }`}
                                >
                                    {type}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {loading ? (
                    <div className="flex flex-col items-center justify-center py-40">
                        <Loader2 className="h-16 w-16 text-primary animate-spin mb-6" />
                        <p className="text-slate-500 font-bold">Loading Bookings...</p>
                    </div>
                ) : (
                    <div className="bg-white rounded-[2.5rem] shadow-sm border border-slate-100 overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="bg-slate-50">
                                        <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">User</th>
                                        <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Booking Type</th>
                                        <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Travel Date</th>
                                        <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Amount</th>
                                        <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Status</th>
                                        <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-50">
                                    {filteredBookings.length === 0 ? (
                                        <tr>
                                            <td colSpan="6" className="px-8 py-20 text-center text-slate-400 font-bold">No bookings found matching your criteria.</td>
                                        </tr>
                                    ) : (
                                        filteredBookings.map(booking => (
                                            <tr key={booking.id} className="hover:bg-slate-50/50 transition-colors group">
                                                <td className="px-8 py-6">
                                                    <div className="flex items-center space-x-3">
                                                        <div className="h-10 w-10 rounded-full bg-slate-100 flex items-center justify-center text-secondary font-black text-xs uppercase">
                                                            {booking.user?.firstName?.[0]}{booking.user?.lastName?.[0]}
                                                        </div>
                                                        <div>
                                                            <p className="text-sm font-black text-secondary">{booking.user?.firstName} {booking.user?.lastName}</p>
                                                            <p className="text-[10px] font-bold text-slate-400">{booking.user?.email}</p>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-8 py-6">
                                                    <div className="flex items-center space-x-2">
                                                        {booking.bookingType === 'HOTEL' && <Hotel className="h-4 w-4 text-amber-500" />}
                                                        {booking.bookingType === 'FLIGHT' && <Plane className="h-4 w-4 text-sky-500" />}
                                                        {booking.bookingType === 'TRAIN' && <Train className="h-4 w-4 text-orange-500" />}
                                                        {booking.bookingType === 'BUS' && <Bus className="h-4 w-4 text-violet-500" />}
                                                        {booking.bookingType === 'TRIP' && <Briefcase className="h-4 w-4 text-indigo-500" />}
                                                        <span className="text-sm font-bold text-secondary uppercase">{booking.bookingType}</span>
                                                    </div>
                                                </td>
                                                <td className="px-8 py-6">
                                                    <div className="flex items-center space-x-2">
                                                        <Calendar className="h-4 w-4 text-slate-400" />
                                                        <span className="text-sm font-bold text-slate-600">
                                                            {new Date(booking.travelDate).toLocaleDateString('en-US', {
                                                                month: 'short', day: 'numeric', year: 'numeric'
                                                            })}
                                                        </span>
                                                    </div>
                                                </td>
                                                <td className="px-8 py-6">
                                                    <span className="text-sm font-black text-primary">₹{booking.totalPrice.toLocaleString()}</span>
                                                </td>
                                                <td className="px-8 py-6">
                                                    {getStatusBadge(booking.status)}
                                                </td>
                                                <td className="px-8 py-6">
                                                    <div className="flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                        <button
                                                            onClick={() => handleUpdateStatus(booking.id, 'COMPLETED')}
                                                            className="p-2 hover:bg-emerald-50 text-emerald-600 rounded-lg transition-all"
                                                            title="Complete"
                                                        >
                                                            <CheckCircle className="h-4 w-4" />
                                                        </button>
                                                        <button
                                                            onClick={() => handleUpdateStatus(booking.id, 'CANCELLED')}
                                                            className="p-2 hover:bg-rose-50 text-rose-600 rounded-lg transition-all"
                                                            title="Cancel"
                                                        >
                                                            <XCircle className="h-4 w-4" />
                                                        </button>
                                                        <button
                                                            onClick={() => handleDelete(booking.id)}
                                                            className="p-2 hover:bg-slate-100 text-slate-400 hover:text-rose-600 rounded-lg transition-all"
                                                            title="Delete"
                                                        >
                                                            <Trash2 className="h-4 w-4" />
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdminBookings;
