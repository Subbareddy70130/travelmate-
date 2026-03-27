import React, { useState, useEffect } from 'react';
import { Plus, Pencil, Trash2, Loader2, X, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { adminFlights } from '../services/adminApi';

const EMPTY = { airline: '', departureCity: '', arrivalCity: '', departureTime: '', arrivalTime: '', duration: '', price: '' };

const AdminFlights = () => {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [modal, setModal] = useState(false);
    const [form, setForm] = useState(EMPTY);
    const [editId, setEditId] = useState(null);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState('');

    const fetchAll = async () => {
        try { setLoading(true); const data = await adminFlights.getAll(); setItems(data); }
        catch { setError('Failed to load.'); } finally { setLoading(false); }
    };
    useEffect(() => { fetchAll(); }, []);
    const openAdd = () => { setForm(EMPTY); setEditId(null); setModal(true); };
    const openEdit = (item) => {
        const formatted = {
            ...item,
            departureTime: item.departureTime ? item.departureTime.substring(0, 16) : '',
            arrivalTime: item.arrivalTime ? item.arrivalTime.substring(0, 16) : ''
        };
        setForm(formatted); setEditId(item.id); setModal(true);
    };
    const closeModal = () => { setModal(false); setError(''); };
    const save = async (e) => {
        e.preventDefault(); setSaving(true); setError('');
        try {
            if (editId) await adminFlights.update(editId, form);
            else await adminFlights.create(form);
            await fetchAll(); closeModal();
        } catch { setError('Save failed.'); } finally { setSaving(false); }
    };
    const remove = async (id) => {
        if (!window.confirm('Delete this flight?')) return;
        try {
            await adminFlights.remove(id);
            setItems(items.filter(i => i.id !== id));
        } catch { alert('Delete failed.'); }
    };
    const f = (key) => (e) => setForm(p => ({ ...p, [key]: e.target.value }));

    return (
        <div className="bg-slate-50 min-h-screen p-8">
            <div className="max-w-7xl mx-auto">
                <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-4">
                        <Link to="/admin/dashboard" className="p-2 bg-white rounded-xl shadow-sm border border-slate-100 hover:bg-slate-50"><ArrowLeft className="h-5 w-5 text-slate-500" /></Link>
                        <div><h1 className="text-3xl font-black text-slate-800">Flights</h1><p className="text-slate-500 font-bold">{items.length} flights</p></div>
                    </div>
                    <button onClick={openAdd} className="bg-emerald-500 text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 hover:bg-emerald-600 transition-all shadow-lg shadow-emerald-100"><Plus className="h-5 w-5" /> Add Flight</button>
                </div>
                {loading ? <div className="flex justify-center py-20"><Loader2 className="h-10 w-10 text-emerald-500 animate-spin" /></div> : (
                    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
                        <table className="w-full">
                            <thead className="bg-slate-50"><tr>{['AIRLINE', 'FROM', 'TO', 'DURATION', 'PRICE', 'ACTIONS'].map(h => <th key={h} className="text-left p-4 text-sm font-black text-slate-500">{h}</th>)}</tr></thead>
                            <tbody>
                                {items.map(item => (
                                    <tr key={item.id} className="border-t border-slate-50 hover:bg-slate-50/50">
                                        <td className="p-4 font-bold text-slate-800">{item.airline}</td>
                                        <td className="p-4 text-slate-500">{item.departureCity}</td>
                                        <td className="p-4 text-slate-500">{item.arrivalCity}</td>
                                        <td className="p-4 text-slate-500">{item.duration}</td>
                                        <td className="p-4 text-slate-500">₹{item.price || '—'}</td>
                                        <td className="p-4"><div className="flex gap-2">
                                            <button onClick={() => openEdit(item)} className="p-2 bg-blue-50 text-blue-500 rounded-lg hover:bg-blue-100"><Pencil className="h-4 w-4" /></button>
                                            <button onClick={() => remove(item.id)} className="p-2 bg-rose-50 text-rose-500 rounded-lg hover:bg-rose-100"><Trash2 className="h-4 w-4" /></button>
                                        </div></td>
                                    </tr>
                                ))}
                                {items.length === 0 && <tr><td colSpan="6" className="text-center py-12 text-slate-400 font-bold">No flights yet.</td></tr>}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
            {modal && (
                <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-3xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
                        <div className="flex justify-between items-center p-6 border-b border-slate-100">
                            <h2 className="text-xl font-black text-slate-800">{editId ? 'Edit' : 'Add'} Flight</h2>
                            <button onClick={closeModal} className="p-2 hover:bg-slate-100 rounded-xl"><X className="h-5 w-5" /></button>
                        </div>
                        <form onSubmit={save} className="p-6 space-y-4">
                            {error && <div className="p-3 bg-rose-50 text-rose-500 rounded-xl text-sm font-bold">{error}</div>}
                            <div><label className="block text-sm font-bold text-slate-600 mb-1">Airline *</label><input required value={form.airline} onChange={f('airline')} className="w-full p-3 border border-slate-100 rounded-xl bg-slate-50 outline-none focus:ring-2 focus:ring-emerald-300" /></div>
                            <div className="grid grid-cols-2 gap-4">
                                <div><label className="block text-sm font-bold text-slate-600 mb-1">From (City) *</label><input required value={form.departureCity} onChange={f('departureCity')} className="w-full p-3 border border-slate-100 rounded-xl bg-slate-50 outline-none focus:ring-2 focus:ring-emerald-300" /></div>
                                <div><label className="block text-sm font-bold text-slate-600 mb-1">To (City) *</label><input required value={form.arrivalCity} onChange={f('arrivalCity')} className="w-full p-3 border border-slate-100 rounded-xl bg-slate-50 outline-none focus:ring-2 focus:ring-emerald-300" /></div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div><label className="block text-sm font-bold text-slate-600 mb-1">Departure Time</label><input type="datetime-local" value={form.departureTime} onChange={f('departureTime')} className="w-full p-3 border border-slate-100 rounded-xl bg-slate-50 outline-none focus:ring-2 focus:ring-emerald-300" /></div>
                                <div><label className="block text-sm font-bold text-slate-600 mb-1">Arrival Time</label><input type="datetime-local" value={form.arrivalTime} onChange={f('arrivalTime')} className="w-full p-3 border border-slate-100 rounded-xl bg-slate-50 outline-none focus:ring-2 focus:ring-emerald-300" /></div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div><label className="block text-sm font-bold text-slate-600 mb-1">Duration</label><input value={form.duration} onChange={f('duration')} placeholder="e.g. 2h 30m" className="w-full p-3 border border-slate-100 rounded-xl bg-slate-50 outline-none focus:ring-2 focus:ring-emerald-300" /></div>
                                <div><label className="block text-sm font-bold text-slate-600 mb-1">Price (₹)</label><input type="number" value={form.price} onChange={f('price')} className="w-full p-3 border border-slate-100 rounded-xl bg-slate-50 outline-none focus:ring-2 focus:ring-emerald-300" /></div>
                            </div>
                            <div className="flex gap-3 pt-2">
                                <button type="button" onClick={closeModal} className="flex-1 py-3 border border-slate-200 rounded-xl font-bold text-slate-500 hover:bg-slate-50">Cancel</button>
                                <button type="submit" disabled={saving} className="flex-1 py-3 bg-emerald-500 text-white rounded-xl font-bold hover:bg-emerald-600 flex items-center justify-center gap-2">
                                    {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : null}{saving ? 'Saving...' : 'Save Flight'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminFlights;
