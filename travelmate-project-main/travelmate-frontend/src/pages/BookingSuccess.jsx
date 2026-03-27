import React, { useEffect } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { CheckCircle2, Home, BookOpen, Download } from 'lucide-react';

const BookingSuccess = () => {
    const { state } = useLocation();
    const navigate = useNavigate();
    const { bookingData, paymentLast4 } = state || {};

    useEffect(() => {
        if (!bookingData) navigate('/');
    }, [bookingData, navigate]);

    const confirmationId = `TM${Date.now().toString().slice(-8).toUpperCase()}`;

    return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center py-16 px-4">
            <div className="max-w-lg w-full">
                {/* Success Animation */}
                <div className="text-center mb-8">
                    <div className="w-24 h-24 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6 animate-bounce">
                        <CheckCircle2 className="h-14 w-14 text-emerald-500" />
                    </div>
                    <h1 className="text-4xl font-black text-slate-800 mb-2">Booking Confirmed!</h1>
                    <p className="text-slate-500 font-bold text-lg">Your payment was successful and booking is confirmed.</p>
                </div>

                {/* Confirmation Card */}
                <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden mb-6">
                    {/* Top accent */}
                    <div className="h-2 bg-gradient-to-r from-emerald-400 to-teal-400" />
                    <div className="p-6 space-y-4">
                        <div className="flex justify-between items-start">
                            <div>
                                <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-1">Confirmation ID</p>
                                <p className="font-black text-2xl text-emerald-600 font-mono">{confirmationId}</p>
                            </div>
                            <span className="bg-emerald-100 text-emerald-700 font-black text-sm px-4 py-2 rounded-full">CONFIRMED</span>
                        </div>

                        <div className="border-t border-dashed border-slate-200 pt-4 space-y-3">
                            <div className="flex justify-between text-sm">
                                <span className="text-slate-500 font-bold">Booking Type</span>
                                <span className="font-black text-slate-800">{bookingData?.bookingType}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-slate-500 font-bold">Item</span>
                                <span className="font-black text-slate-800 text-right max-w-xs">{bookingData?.itemName}</span>
                            </div>
                            {bookingData?.checkInDate && (
                                <>
                                    <div className="flex justify-between text-sm"><span className="text-slate-500 font-bold">Check-in</span><span className="font-black">{bookingData.checkInDate}</span></div>
                                    <div className="flex justify-between text-sm"><span className="text-slate-500 font-bold">Check-out</span><span className="font-black">{bookingData.checkOutDate}</span></div>
                                </>
                            )}
                            {bookingData?.travelDate && !bookingData?.checkInDate && (
                                <div className="flex justify-between text-sm"><span className="text-slate-500 font-bold">Travel Date</span><span className="font-black">{bookingData.travelDate}</span></div>
                            )}
                            <div className="flex justify-between text-sm">
                                <span className="text-slate-500 font-bold">Guests</span>
                                <span className="font-black">{bookingData?.numberOfPeople}</span>
                            </div>
                            {paymentLast4 && (
                                <div className="flex justify-between text-sm">
                                    <span className="text-slate-500 font-bold">Paid via</span>
                                    <span className="font-black">•••• {paymentLast4}</span>
                                </div>
                            )}
                        </div>

                        <div className="border-t border-slate-100 pt-4">
                            <div className="flex justify-between items-center">
                                <span className="font-black text-slate-700 text-lg">Amount Paid</span>
                                <span className="font-black text-emerald-600 text-3xl">₹{bookingData?.totalPrice?.toLocaleString()}</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Actions */}
                <div className="grid grid-cols-2 gap-4">
                    <Link to="/" className="flex items-center justify-center gap-2 py-4 bg-white border border-slate-200 rounded-2xl font-bold text-slate-600 hover:bg-slate-50 transition-all">
                        <Home className="h-5 w-5" /> Home
                    </Link>
                    <Link to="/my-bookings" className="flex items-center justify-center gap-2 py-4 bg-emerald-500 text-white rounded-2xl font-bold hover:bg-emerald-600 transition-all shadow-lg shadow-emerald-100">
                        <BookOpen className="h-5 w-5" /> My Bookings
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default BookingSuccess;
