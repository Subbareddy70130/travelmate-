import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { X, Calendar, Users, CreditCard, Hotel, Plane, Train, Bus, Utensils, Map, Loader2, CheckCircle2 } from 'lucide-react';

/**
 * Universal BookingModal
 * Props:
 *   type: 'TRIP' | 'HOTEL' | 'RESTAURANT' | 'FLIGHT' | 'TRAIN' | 'BUS'
 *   item: the entity object (trip, hotel, etc.)
 *   pricePerUnit: base price per person/night
 *   onClose: () => void
 */
const BookingModal = ({ type, item, pricePerUnit = 0, onClose }) => {
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem('user') || '{}');

    const isHotel = type === 'HOTEL';
    const isRestaurant = type === 'RESTAURANT';
    const isTransport = ['FLIGHT', 'TRAIN', 'BUS'].includes(type);

    const [form, setForm] = useState({
        travelDate: '',
        checkInDate: '',
        checkOutDate: '',
        numberOfPeople: 1,
        rooms: 1,
        bookingTime: '12:00',
        passengerName: user.firstName ? `${user.firstName} ${user.lastName || ''}`.trim() : '',
        passengerEmail: user.email || '',
        passengerPhone: '',
    });

    const [step, setStep] = useState(1); // 1 = details, 2 = confirm

    const nights = isHotel && form.checkInDate && form.checkOutDate
        ? Math.max(1, Math.ceil((new Date(form.checkOutDate) - new Date(form.checkInDate)) / (1000 * 60 * 60 * 24)))
        : 1;

    const totalPrice = isHotel
        ? pricePerUnit * nights * form.rooms
        : pricePerUnit * form.numberOfPeople;

    const handleChange = (key, val) => setForm(p => ({ ...p, [key]: val }));

    const handleNext = (e) => {
        e.preventDefault();
        setStep(2);
    };

    const handleProceedToPayment = () => {
        const bookingData = {
            userId: user.id,
            bookingType: type,
            itemId: item?.id || 1,
            travelDate: form.travelDate || form.checkInDate,
            checkInDate: form.checkInDate,
            checkOutDate: form.checkOutDate,
            numberOfPeople: form.numberOfPeople,
            rooms: form.rooms,
            totalPrice: totalPrice,
            bookingTime: form.bookingTime,
            passengerName: form.passengerName,
            passengerEmail: form.passengerEmail,
            passengerPhone: form.passengerPhone,
            itemName: item?.title || item?.name || item?.trainName || item?.airline || item?.company || 'Item',
            itemImage: item?.imageUrl || '',
        };
        navigate('/payment', { state: { bookingData } });
        onClose();
    };

    const typeIcons = { TRIP: Map, HOTEL: Hotel, RESTAURANT: Utensils, FLIGHT: Plane, TRAIN: Train, BUS: Bus };
    const TypeIcon = typeIcons[type] || Map;
    const typeColors = { TRIP: 'emerald', HOTEL: 'amber', RESTAURANT: 'purple', FLIGHT: 'sky', TRAIN: 'orange', BUS: 'teal' };
    const color = typeColors[type] || 'emerald';

    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-3xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
                {/* Header */}
                <div className={`bg-${color}-500 p-6 rounded-t-3xl flex justify-between items-start`}>
                    <div className="flex items-center gap-3">
                        <div className="p-3 bg-white/20 rounded-2xl">
                            <TypeIcon className="h-6 w-6 text-white" />
                        </div>
                        <div>
                            <p className="text-white/70 text-sm font-bold uppercase tracking-widest">{type} Booking</p>
                            <h2 className="text-white font-black text-xl truncate max-w-xs">
                                {item?.title || item?.name || item?.trainName || item?.airline || item?.company || 'Book Now'}
                            </h2>
                        </div>
                    </div>
                    <button onClick={onClose} className="p-2 bg-white/20 hover:bg-white/30 rounded-xl transition-all">
                        <X className="h-5 w-5 text-white" />
                    </button>
                </div>

                {/* Step 1: Details */}
                {step === 1 && (
                    <form onSubmit={handleNext} className="p-6 space-y-5">
                        {/* Item Info */}
                        <div className={`p-4 bg-${color}-50 rounded-2xl border border-${color}-100`}>
                            <div className="flex items-center justify-between">
                                <span className="text-slate-600 font-bold text-sm">Base Price</span>
                                <span className={`text-${color}-600 font-black text-lg`}>
                                    ₹{pricePerUnit?.toLocaleString() || 0}
                                    {isHotel ? '/night' : isRestaurant ? '/person' : '/person'}
                                </span>
                            </div>
                            {item?.description && <p className="text-slate-500 text-xs mt-2 line-clamp-2">{item.description}</p>}
                        </div>

                        {/* Hotel-specific fields */}
                        {isHotel && (
                            <>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-black text-slate-600 mb-2">Check-in Date *</label>
                                        <input required type="date" min={new Date().toISOString().split('T')[0]}
                                            value={form.checkInDate} onChange={e => handleChange('checkInDate', e.target.value)}
                                            className="w-full p-3 border border-slate-100 rounded-xl bg-slate-50 focus:ring-2 focus:ring-amber-300 outline-none" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-black text-slate-600 mb-2">Check-out Date *</label>
                                        <input required type="date" min={form.checkInDate || new Date().toISOString().split('T')[0]}
                                            value={form.checkOutDate} onChange={e => handleChange('checkOutDate', e.target.value)}
                                            className="w-full p-3 border border-slate-100 rounded-xl bg-slate-50 focus:ring-2 focus:ring-amber-300 outline-none" />
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-black text-slate-600 mb-2">Guests</label>
                                        <input type="number" min="1" max="20" value={form.numberOfPeople}
                                            onChange={e => handleChange('numberOfPeople', parseInt(e.target.value))}
                                            className="w-full p-3 border border-slate-100 rounded-xl bg-slate-50 focus:ring-2 focus:ring-amber-300 outline-none" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-black text-slate-600 mb-2">Rooms</label>
                                        <input type="number" min="1" max="10" value={form.rooms}
                                            onChange={e => handleChange('rooms', parseInt(e.target.value))}
                                            className="w-full p-3 border border-slate-100 rounded-xl bg-slate-50 focus:ring-2 focus:ring-amber-300 outline-none" />
                                    </div>
                                </div>
                            </>
                        )}

                        {/* Restaurant-specific fields */}
                        {isRestaurant && (
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-black text-slate-600 mb-2">Date *</label>
                                    <input required type="date" min={new Date().toISOString().split('T')[0]}
                                        value={form.travelDate} onChange={e => handleChange('travelDate', e.target.value)}
                                        className="w-full p-3 border border-slate-100 rounded-xl bg-slate-50 focus:ring-2 focus:ring-purple-300 outline-none" />
                                </div>
                                <div>
                                    <label className="block text-sm font-black text-slate-600 mb-2">Time *</label>
                                    <input required type="time" value={form.bookingTime} onChange={e => handleChange('bookingTime', e.target.value)}
                                        className="w-full p-3 border border-slate-100 rounded-xl bg-slate-50 focus:ring-2 focus:ring-purple-300 outline-none" />
                                </div>
                            </div>
                        )}

                        {/* Trip / Transport date */}
                        {!isHotel && !isRestaurant && (
                            <div>
                                <label className="block text-sm font-black text-slate-600 mb-2">Travel Date *</label>
                                <input required type="date" min={new Date().toISOString().split('T')[0]}
                                    value={form.travelDate} onChange={e => handleChange('travelDate', e.target.value)}
                                    className="w-full p-3 border border-slate-100 rounded-xl bg-slate-50 focus:ring-2 focus:ring-emerald-300 outline-none" />
                            </div>
                        )}

                        {/* People */}
                        {!isHotel && (
                            <div>
                                <label className="block text-sm font-black text-slate-600 mb-2">
                                    {isRestaurant ? 'Number of Guests' : 'Number of People'}
                                </label>
                                <input type="number" min="1" max="20" value={form.numberOfPeople}
                                    onChange={e => handleChange('numberOfPeople', parseInt(e.target.value))}
                                    className="w-full p-3 border border-slate-100 rounded-xl bg-slate-50 focus:ring-2 focus:ring-emerald-300 outline-none" />
                            </div>
                        )}

                        {/* Passenger contacts for transport */}
                        {isTransport && (
                            <div className="space-y-3">
                                <div>
                                    <label className="block text-sm font-black text-slate-600 mb-2">Passenger Name *</label>
                                    <input required value={form.passengerName} onChange={e => handleChange('passengerName', e.target.value)}
                                        className="w-full p-3 border border-slate-100 rounded-xl bg-slate-50 focus:ring-2 focus:ring-sky-300 outline-none" />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-black text-slate-600 mb-2">Email</label>
                                        <input type="email" value={form.passengerEmail} onChange={e => handleChange('passengerEmail', e.target.value)}
                                            className="w-full p-3 border border-slate-100 rounded-xl bg-slate-50 focus:ring-2 focus:ring-sky-300 outline-none" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-black text-slate-600 mb-2">Phone</label>
                                        <input type="tel" value={form.passengerPhone} onChange={e => handleChange('passengerPhone', e.target.value)}
                                            className="w-full p-3 border border-slate-100 rounded-xl bg-slate-50 focus:ring-2 focus:ring-sky-300 outline-none" />
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Total price */}
                        <div className="p-4 bg-slate-900 rounded-2xl flex justify-between items-center">
                            <span className="text-slate-400 font-bold">Total Amount</span>
                            <span className="text-white font-black text-2xl">₹{totalPrice?.toLocaleString()}</span>
                        </div>
                        {isHotel && form.checkInDate && form.checkOutDate && (
                            <p className="text-center text-slate-400 text-sm font-bold -mt-3">
                                {nights} night{nights > 1 ? 's' : ''} × {form.rooms} room{form.rooms > 1 ? 's' : ''} × ₹{pricePerUnit}/night
                            </p>
                        )}

                        <div className="flex gap-3">
                            <button type="button" onClick={onClose} className="flex-1 py-3 border border-slate-200 rounded-2xl font-bold text-slate-500 hover:bg-slate-50">
                                Cancel
                            </button>
                            <button type="submit" className={`flex-1 py-3 bg-${color}-500 text-white rounded-2xl font-black hover:bg-${color}-600 transition-all shadow-lg`}>
                                Continue to Payment →
                            </button>
                        </div>
                    </form>
                )}

                {/* Step 2: Confirm */}
                {step === 2 && (
                    <div className="p-6 space-y-5">
                        <div className="text-center">
                            <div className=" w-16 h-16 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-4">
                                <CheckCircle2 className="h-9 w-9 text-emerald-500" />
                            </div>
                            <h3 className="text-xl font-black text-slate-800 mb-2">Confirm Your Booking</h3>
                            <p className="text-slate-500 font-bold text-sm">Review your details before proceeding to payment</p>
                        </div>

                        <div className="bg-slate-50 rounded-2xl p-4 space-y-3">
                            <div className="flex justify-between text-sm"><span className="text-slate-500 font-bold">Type</span><span className="font-black text-slate-800">{type}</span></div>
                            <div className="flex justify-between text-sm"><span className="text-slate-500 font-bold">Item</span><span className="font-black text-slate-800">{item?.title || item?.name || item?.trainName || item?.airline || item?.company}</span></div>
                            {isHotel ? (
                                <>
                                    <div className="flex justify-between text-sm"><span className="text-slate-500 font-bold">Check-in</span><span className="font-black">{form.checkInDate}</span></div>
                                    <div className="flex justify-between text-sm"><span className="text-slate-500 font-bold">Check-out</span><span className="font-black">{form.checkOutDate}</span></div>
                                    <div className="flex justify-between text-sm"><span className="text-slate-500 font-bold">Rooms</span><span className="font-black">{form.rooms}</span></div>
                                </>
                            ) : (
                                <div className="flex justify-between text-sm"><span className="text-slate-500 font-bold">Date</span><span className="font-black">{form.travelDate}</span></div>
                            )}
                            <div className="flex justify-between text-sm"><span className="text-slate-500 font-bold">People</span><span className="font-black">{form.numberOfPeople}</span></div>
                            <div className="flex justify-between pt-2 border-t border-slate-200"><span className="font-black text-slate-700">Total</span><span className="font-black text-emerald-600 text-lg">₹{totalPrice?.toLocaleString()}</span></div>
                        </div>

                        <div className="flex gap-3">
                            <button onClick={() => setStep(1)} className="flex-1 py-3 border border-slate-200 rounded-2xl font-bold text-slate-500 hover:bg-slate-50">
                                ← Edit
                            </button>
                            <button onClick={handleProceedToPayment} className="flex-1 py-3 bg-emerald-500 text-white rounded-2xl font-black hover:bg-emerald-600 transition-all shadow-lg shadow-emerald-100 flex items-center justify-center gap-2">
                                <CreditCard className="h-5 w-5" /> Pay ₹{totalPrice?.toLocaleString()}
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default BookingModal;
