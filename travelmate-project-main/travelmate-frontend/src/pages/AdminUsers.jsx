import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Users, Mail, Phone, Calendar, Loader2, Search, Trash2, UserCircle } from 'lucide-react';
import { adminUsers } from '../services/adminApi';

const AdminUsers = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const data = await adminUsers.getAll();
            setUsers(data);
        } catch (err) {
            console.error('Failed to load users:', err);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this user?')) return;
        try {
            await adminUsers.remove(id);
            setUsers(prev => prev.filter(u => u.id !== id));
        } catch (err) {
            alert('Failed to delete user');
        }
    };

    const filtered = users.filter(u =>
        `${u.firstName} ${u.lastName} ${u.username} ${u.email}`
            .toLowerCase().includes(search.toLowerCase())
    );

    if (loading) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50">
                <Loader2 className="h-16 w-16 text-blue-500 animate-spin mb-6" />
                <h2 className="text-2xl font-bold text-secondary">Loading Users...</h2>
            </div>
        );
    }

    return (
        <div className="bg-slate-50 min-h-screen py-12 px-6">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-4">
                        <Link to="/admin/dashboard" className="bg-white p-3 rounded-xl shadow-sm border border-slate-100 hover:bg-slate-50 transition-all">
                            <ArrowLeft className="h-5 w-5 text-slate-600" />
                        </Link>
                        <div>
                            <h1 className="text-3xl font-black text-secondary">Registered Users</h1>
                            <p className="text-slate-500 font-bold text-sm">{users.length} total users</p>
                        </div>
                    </div>
                </div>

                {/* Search */}
                <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-4 mb-6">
                    <div className="flex items-center gap-3">
                        <Search className="h-5 w-5 text-slate-400" />
                        <input
                            value={search}
                            onChange={e => setSearch(e.target.value)}
                            placeholder="Search by name, username, or email..."
                            className="flex-1 bg-transparent outline-none text-slate-700 font-bold placeholder-slate-400"
                        />
                    </div>
                </div>

                {/* Users Table */}
                <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="bg-slate-50 border-b border-slate-100">
                                    <th className="text-left px-6 py-4 text-xs font-black text-slate-400 uppercase tracking-widest">#</th>
                                    <th className="text-left px-6 py-4 text-xs font-black text-slate-400 uppercase tracking-widest">User</th>
                                    <th className="text-left px-6 py-4 text-xs font-black text-slate-400 uppercase tracking-widest">Username</th>
                                    <th className="text-left px-6 py-4 text-xs font-black text-slate-400 uppercase tracking-widest">Email</th>
                                    <th className="text-left px-6 py-4 text-xs font-black text-slate-400 uppercase tracking-widest">Phone</th>
                                    <th className="text-left px-6 py-4 text-xs font-black text-slate-400 uppercase tracking-widest">Joined</th>
                                    <th className="text-left px-6 py-4 text-xs font-black text-slate-400 uppercase tracking-widest">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filtered.length > 0 ? filtered.map((user, idx) => (
                                    <tr key={user.id} className="border-b border-slate-50 hover:bg-sky-50/30 transition-colors">
                                        <td className="px-6 py-4 text-sm text-slate-400 font-bold">{idx + 1}</td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center text-white font-black text-sm shadow-md">
                                                    {user.firstName?.[0]}{user.lastName?.[0]}
                                                </div>
                                                <div>
                                                    <p className="font-black text-slate-800">{user.firstName} {user.lastName}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="bg-slate-100 text-slate-600 text-xs font-bold px-3 py-1 rounded-full">@{user.username}</span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-2 text-sm text-slate-600 font-bold">
                                                <Mail className="h-3.5 w-3.5 text-blue-400" />
                                                {user.email}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-2 text-sm text-slate-600 font-bold">
                                                <Phone className="h-3.5 w-3.5 text-emerald-400" />
                                                {user.phoneNumber}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-2 text-xs text-slate-400 font-bold">
                                                <Calendar className="h-3.5 w-3.5" />
                                                {user.createdAt ? new Date(user.createdAt).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }) : '—'}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <button onClick={() => handleDelete(user.id)}
                                                className="p-2 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all" title="Delete user">
                                                <Trash2 className="h-4 w-4" />
                                            </button>
                                        </td>
                                    </tr>
                                )) : (
                                    <tr>
                                        <td colSpan="7" className="text-center py-16 text-slate-400 font-bold italic">
                                            {search ? 'No users match your search.' : 'No registered users yet.'}
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminUsers;
