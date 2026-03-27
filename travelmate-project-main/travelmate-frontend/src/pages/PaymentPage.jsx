import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { createBooking } from '../services/api';
import { CreditCard, Shield, Lock, CheckCircle2, Loader2, ArrowLeft } from 'lucide-react';

const PaymentPage = () => {
    const { state } = useLocation();
    const navigate = useNavigate();
    const bookingData = state?.bookingData;

    const [form, setForm] = useState({
        cardNumber: '',
        cardHolder: '',
        expiry: '',
        cvv: '',
    });
    const [processing, setProcessing] = useState(false);
    const [errors, setErrors] = useState({});

    const formatCardNumber = (val) => {
        const digits = val.replace(/\D/g, '').substring(0, 16);
        return digits.replace(/(\d{4})/g, '$1 ').trim();
    };

    const formatExpiry = (val) => {
        const digits = val.replace(/\D/g, '').substring(0, 4);
        if (digits.length >= 2) return digits.slice(0, 2) + '/' + digits.slice(2);
        return digits;
    };

    const validate = () => {
        const e = {};
        if (form.cardNumber.replace(/\s/g, '').length < 16) e.cardNumber = 'Enter a valid 16-digit card number';
        if (!form.cardHolder.trim()) e.cardHolder = 'Card holder name is required';
        if (!/^\d{2}\/\d{2}$/.test(form.expiry)) e.expiry = 'Enter expiry as MM/YY';
        if (form.cvv.length < 3) e.cvv = 'Enter valid CVV';
        setErrors(e);
        return Object.keys(e).length === 0;
    };

    const handlePay = async (e) => {
        e.preventDefault();
        if (!validate()) return;
        setProcessing(true);

        try {
            // Save booking to backend
            if (bookingData?.userId) {
                await createBooking(bookingData);
            }
            // Simulate payment processing delay
            await new Promise(res => setTimeout(res, 1500));
            navigate('/booking-success', {
                state: { bookingData, paymentLast4: form.cardNumber.slice(-4) }
            });
        } catch (err) {
            console.error('Booking error:', err);
            setErrors({ cardNumber: 'Booking failed. Please check your connection and login status.' });
        } finally {
            setProcessing(false);
        }
    };

    if (!bookingData) {
        return (
            <div className="min-h-screen bg-slate-50 flex items-center justify-center">
                <div className="text-center">
                    <p className="text-slate-500 font-bold text-lg mb-4">No booking data found.</p>
                    <button onClick={() => navigate(-1)} className="bg-emerald-500 text-white px-6 py-3 rounded-xl font-bold hover:bg-emerald-600">
                        Go Back
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-50 py-16 px-4">
            <div className="max-w-4xl mx-auto">
                <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-slate-500 font-bold mb-8 hover:text-slate-700 transition-colors">
                    <ArrowLeft className="h-4 w-4" /> Back
                </button>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Booking Summary */}
                    <div className="space-y-4">
                        <h2 className="text-2xl font-black text-slate-800">Order Summary</h2>
                        <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 space-y-4">
                            {bookingData.itemImage && (
                                <img src={bookingData.itemImage} alt="" className="w-full h-40 object-cover rounded-2xl" />
                            )}
                            <div>
                                <span className="text-xs font-black text-emerald-500 uppercase tracking-widest bg-emerald-50 px-3 py-1 rounded-full">{bookingData.bookingType}</span>
                                <h3 className="text-xl font-black text-slate-800 mt-2">{bookingData.itemName}</h3>
                            </div>
                            <div className="space-y-2 text-sm">
                                {bookingData.checkInDate && <div className="flex justify-between"><span className="text-slate-500 font-bold">Check-in</span><span className="font-black">{bookingData.checkInDate}</span></div>}
                                {bookingData.checkOutDate && <div className="flex justify-between"><span className="text-slate-500 font-bold">Check-out</span><span className="font-black">{bookingData.checkOutDate}</span></div>}
                                {bookingData.travelDate && !bookingData.checkInDate && <div className="flex justify-between"><span className="text-slate-500 font-bold">Travel Date</span><span className="font-black">{bookingData.travelDate}</span></div>}
                                <div className="flex justify-between"><span className="text-slate-500 font-bold">People</span><span className="font-black">{bookingData.numberOfPeople}</span></div>
                            </div>
                            <div className="border-t border-slate-100 pt-4">
                                <div className="flex justify-between items-center">
                                    <span className="font-black text-slate-800 text-lg">Total</span>
                                    <span className="font-black text-emerald-600 text-3xl">₹{bookingData.totalPrice?.toLocaleString()}</span>
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center gap-3 p-4 bg-emerald-50 rounded-2xl border border-emerald-100">
                            <Shield className="h-6 w-6 text-emerald-500 flex-shrink-0" />
                            <p className="text-sm font-bold text-emerald-700">256-bit SSL encrypted and secure payment</p>
                        </div>
                    </div>

                    {/* Payment Form */}
                    <div>
                        <h2 className="text-2xl font-black text-slate-800 mb-4">Payment Details</h2>
                        <form onSubmit={handlePay} className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 space-y-5">
                            <div>
                                <label className="block text-sm font-black text-slate-600 mb-2">Card Number</label>
                                <div className="relative">
                                    <input
                                        value={form.cardNumber}
                                        onChange={e => setForm(p => ({ ...p, cardNumber: formatCardNumber(e.target.value) }))}
                                        placeholder="1234 5678 9012 3456"
                                        className={`w-full p-4 pl-5 pr-14 border rounded-2xl bg-slate-50 outline-none font-mono text-lg tracking-widest focus:ring-2 focus:ring-emerald-300 ${errors.cardNumber ? 'border-rose-300' : 'border-slate-100'}`}
                                    />
                                    <CreditCard className="absolute right-4 top-4 h-6 w-6 text-slate-300" />
                                </div>
                                {errors.cardNumber && <p className="text-xs text-rose-500 font-bold mt-1">{errors.cardNumber}</p>}
                            </div>

                            <div>
                                <label className="block text-sm font-black text-slate-600 mb-2">Card Holder Name</label>
                                <input
                                    value={form.cardHolder}
                                    onChange={e => setForm(p => ({ ...p, cardHolder: e.target.value }))}
                                    placeholder="JOHN DOE"
                                    className={`w-full p-4 border rounded-2xl bg-slate-50 outline-none font-bold uppercase focus:ring-2 focus:ring-emerald-300 ${errors.cardHolder ? 'border-rose-300' : 'border-slate-100'}`}
                                />
                                {errors.cardHolder && <p className="text-xs text-rose-500 font-bold mt-1">{errors.cardHolder}</p>}
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-black text-slate-600 mb-2">Expiry Date</label>
                                    <input
                                        value={form.expiry}
                                        onChange={e => setForm(p => ({ ...p, expiry: formatExpiry(e.target.value) }))}
                                        placeholder="MM/YY"
                                        maxLength={5}
                                        className={`w-full p-4 border rounded-2xl bg-slate-50 outline-none font-mono focus:ring-2 focus:ring-emerald-300 ${errors.expiry ? 'border-rose-300' : 'border-slate-100'}`}
                                    />
                                    {errors.expiry && <p className="text-xs text-rose-500 font-bold mt-1">{errors.expiry}</p>}
                                </div>
                                <div>
                                    <label className="block text-sm font-black text-slate-600 mb-2">CVV</label>
                                    <div className="relative">
                                        <input
                                            type="password"
                                            value={form.cvv}
                                            onChange={e => setForm(p => ({ ...p, cvv: e.target.value.replace(/\D/g, '').substring(0, 4) }))}
                                            placeholder="•••"
                                            className={`w-full p-4 pr-12 border rounded-2xl bg-slate-50 outline-none font-mono focus:ring-2 focus:ring-emerald-300 ${errors.cvv ? 'border-rose-300' : 'border-slate-100'}`}
                                        />
                                        <Lock className="absolute right-4 top-4 h-5 w-5 text-slate-300" />
                                    </div>
                                    {errors.cvv && <p className="text-xs text-rose-500 font-bold mt-1">{errors.cvv}</p>}
                                </div>
                            </div>

                            {/* Test card hint */}
                            <div className="p-3 bg-blue-50 rounded-xl border border-blue-100">
                                <p className="text-xs text-blue-600 font-bold">💡 Test: use any 16-digit number, name, future expiry, and any 3-digit CVV</p>
                            </div>

                            <button
                                type="submit"
                                disabled={processing}
                                className="w-full py-5 bg-emerald-500 text-white rounded-2xl font-black text-lg hover:bg-emerald-600 transition-all shadow-xl shadow-emerald-100 flex items-center justify-center gap-3 disabled:opacity-70"
                            >
                                {processing ? <Loader2 className="h-6 w-6 animate-spin" /> : <Lock className="h-5 w-5" />}
                                {processing ? 'Processing Payment...' : `Pay ₹${bookingData.totalPrice?.toLocaleString()}`}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PaymentPage;
