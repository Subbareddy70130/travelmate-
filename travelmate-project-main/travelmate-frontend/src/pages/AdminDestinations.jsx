import React, { useState, useEffect } from 'react';
import { Plus, Pencil, Trash2, Loader2, X, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import ImageUploadField from '../components/ImageUploadField';
import { adminDestinations } from '../services/adminApi';

const EMPTY = { name: '', country: '', description: '', bestTimeToVisit: '', imageUrl: '', rating: '', category: '' };

const AdminDestinations = () => {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [modal, setModal] = useState(false);
    const [form, setForm] = useState(EMPTY);
    const [editId, setEditId] = useState(null);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState('');

    const fetchAll = async () => {
        try {
            setLoading(true);
            const data = await adminDestinations.getAll();
            setItems(data);
        } catch { setError('Failed to load data.'); }
        finally { setLoading(false); }
    };

    useEffect(() => { fetchAll(); }, []);

    const openAdd = () => { setForm(EMPTY); setEditId(null); setModal(true); };
    const openEdit = (item) => { setForm(item); setEditId(item.id); setModal(true); };
    const closeModal = () => { setModal(false); setError(''); };

    const save = async (e) => {
        e.preventDefault();
        setSaving(true);
        setError('');
        try {
            if (editId) {
                await adminDestinations.update(editId, form);
            } else {
                await adminDestinations.create(form);
            }
            await fetchAll();
            closeModal();
        } catch { setError('Save failed. Please try again.'); }
        finally { setSaving(false); }
    };

    const remove = async (id) => {
        if (!window.confirm('Delete this destination?')) return;
        try {
            await adminDestinations.remove(id);
            setItems(items.filter(i => i.id !== id));
        } catch (err) {
            console.error('Delete failed:', err);
            alert('Delete failed.');
        }
    };

    const f = (key) => (val) => setForm(p => ({ ...p, [key]: val?.target?.value !== undefined ? val.target.value : val }));

    return (
        <div className="bg-slate-50 min-h-screen p-8">
            <div className="max-w-7xl mx-auto">
                <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-4">
                        <Link to="/admin/dashboard" className="p-2 bg-white rounded-xl shadow-sm border border-slate-100 hover:bg-slate-50 transition-all">
                            <ArrowLeft className="h-5 w-5 text-slate-500" />
                        </Link>
                        <div>
                            <h1 className="text-3xl font-black text-slate-800">Destinations</h1>
                            <p className="text-slate-500 font-bold">{items.length} destinations in database</p>
                        </div>
                    </div>
                    <button onClick={openAdd} className="bg-emerald-500 text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 hover:bg-emerald-600 transition-all shadow-lg shadow-emerald-100">
                        <Plus className="h-5 w-5" /> Add Destination
                    </button>
                </div>

                {loading ? (
                    <div className="flex justify-center py-20"><Loader2 className="h-10 w-10 text-emerald-500 animate-spin" /></div>
                ) : (
                    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
                        <table className="w-full">
                            <thead className="bg-slate-50">
                                <tr>
                                    <th className="text-left p-4 text-sm font-black text-slate-500">IMAGE</th>
                                    <th className="text-left p-4 text-sm font-black text-slate-500">NAME</th>
                                    <th className="text-left p-4 text-sm font-black text-slate-500">COUNTRY</th>
                                    <th className="text-left p-4 text-sm font-black text-slate-500">CATEGORY</th>
                                    <th className="text-left p-4 text-sm font-black text-slate-500">RATING</th>
                                    <th className="text-left p-4 text-sm font-black text-slate-500">ACTIONS</th>
                                </tr>
                            </thead>
                            <tbody>
                                {items.map(item => (
                                    <tr key={item.id} className="border-t border-slate-50 hover:bg-slate-50/50">
                                        <td className="p-4">
                                            {item.imageUrl ? <img src={item.imageUrl} alt="" className="h-10 w-14 object-cover rounded-lg" /> : <div className="h-10 w-14 bg-slate-100 rounded-lg" />}
                                        </td>
                                        <td className="p-4 font-bold text-slate-800">{item.name}</td>
                                        <td className="p-4 text-slate-500">{item.country}</td>
                                        <td className="p-4 text-slate-500">{item.category || '—'}</td>
                                        <td className="p-4 text-slate-500">⭐ {item.rating || '—'}</td>
                                        <td className="p-4">
                                            <div className="flex gap-2">
                                                <button onClick={() => openEdit(item)} className="p-2 bg-blue-50 text-blue-500 rounded-lg hover:bg-blue-100 transition-all"><Pencil className="h-4 w-4" /></button>
                                                <button onClick={() => remove(item.id)} className="p-2 bg-rose-50 text-rose-500 rounded-lg hover:bg-rose-100 transition-all"><Trash2 className="h-4 w-4" /></button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                                {items.length === 0 && <tr><td colSpan="6" className="text-center py-12 text-slate-400 font-bold">No destinations yet. Add your first one!</td></tr>}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

            {modal && (
                <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-3xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
                        <div className="flex justify-between items-center p-6 border-b border-slate-100">
                            <h2 className="text-xl font-black text-slate-800">{editId ? 'Edit' : 'Add'} Destination</h2>
                            <button onClick={closeModal} className="p-2 hover:bg-slate-100 rounded-xl"><X className="h-5 w-5" /></button>
                        </div>
                        <form onSubmit={save} className="p-6 space-y-4">
                            {error && <div className="p-3 bg-rose-50 text-rose-500 rounded-xl text-sm font-bold">{error}</div>}
                            <ImageUploadField label="Destination Image" value={form.imageUrl} onChange={f('imageUrl')} />
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-bold text-slate-600 mb-1">Name *</label>
                                    <input required value={form.name} onChange={f('name')} className="w-full p-3 border border-slate-100 rounded-xl bg-slate-50 outline-none focus:ring-2 focus:ring-emerald-300" />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-slate-600 mb-1">Country *</label>
                                    <input required value={form.country} onChange={f('country')} className="w-full p-3 border border-slate-100 rounded-xl bg-slate-50 outline-none focus:ring-2 focus:ring-emerald-300" />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-slate-600 mb-1">Description</label>
                                <textarea rows={3} value={form.description} onChange={f('description')} className="w-full p-3 border border-slate-100 rounded-xl bg-slate-50 outline-none focus:ring-2 focus:ring-emerald-300 resize-none" />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-bold text-slate-600 mb-1">Best Time to Visit</label>
                                    <input value={form.bestTimeToVisit} onChange={f('bestTimeToVisit')} placeholder="e.g. Oct–Mar" className="w-full p-3 border border-slate-100 rounded-xl bg-slate-50 outline-none focus:ring-2 focus:ring-emerald-300" />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-slate-600 mb-1">Category</label>
                                    <input value={form.category} onChange={f('category')} placeholder="e.g. Beach, Mountain" className="w-full p-3 border border-slate-100 rounded-xl bg-slate-50 outline-none focus:ring-2 focus:ring-emerald-300" />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-slate-600 mb-1">Rating (0–5)</label>
                                <input type="number" step="0.1" min="0" max="5" value={form.rating} onChange={f('rating')} className="w-full p-3 border border-slate-100 rounded-xl bg-slate-50 outline-none focus:ring-2 focus:ring-emerald-300" />
                            </div>
                            <div className="flex gap-3 pt-2">
                                <button type="button" onClick={closeModal} className="flex-1 py-3 border border-slate-200 rounded-xl font-bold text-slate-500 hover:bg-slate-50 transition-all">Cancel</button>
                                <button type="submit" disabled={saving} className="flex-1 py-3 bg-emerald-500 text-white rounded-xl font-bold hover:bg-emerald-600 transition-all flex items-center justify-center gap-2">
                                    {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
                                    {saving ? 'Saving...' : 'Save Destination'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminDestinations;
