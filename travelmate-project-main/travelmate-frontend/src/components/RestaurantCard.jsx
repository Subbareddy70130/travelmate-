import React, { useState } from 'react';
import { Star, MapPin, X, Users, Calendar, Clock, Phone } from 'lucide-react';
import ImageWithFallback from './ImageWithFallback';

const RestaurantCard = ({ restaurant }) => {
    const [showModal, setShowModal] = useState(false);

    return (
        <>
            <div className="bg-white rounded-[2.5rem] shadow-xl overflow-hidden flex flex-col border border-slate-100 group h-full">
                <div className="h-56 overflow-hidden">
                    <ImageWithFallback src={restaurant.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt={restaurant.name} />
                </div>
                <div className="p-8 flex flex-col justify-between flex-grow">
                    <div>
                        <div className="flex justify-between items-start mb-4">
                            <span className="bg-emerald-50 text-primary text-xs font-bold px-3 py-1 rounded-full">{restaurant.cuisine}</span>
                            <div className="flex items-center text-amber-500 font-bold">
                                <Star className="h-4 w-4 fill-amber-500 mr-1" />
                                <span>{restaurant.rating}</span>
                            </div>
                        </div>
                        <h3 className="text-2xl font-bold text-secondary mb-2">{restaurant.name}</h3>
                        <div className="flex items-center text-slate-400 text-sm mb-6">
                            <MapPin className="h-4 w-4 mr-2" />
                            <span>{restaurant.location}</span>
                        </div>
                    </div>
                    <div className="flex items-center justify-between pt-6 border-t border-slate-50">
                        <span className="text-secondary font-bold text-lg">{restaurant.price}</span>
                        <button
                            onClick={() => setShowModal(true)}
                            className="bg-slate-900 text-white px-6 py-2.5 rounded-2xl font-bold hover:bg-primary transition-all"
                        >
                            Book Table
                        </button>
                    </div>
                </div>
            </div>

            {showModal && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
                    <div className="bg-white w-full max-w-lg rounded-[3rem] p-10 relative animate-in zoom-in duration-300 shadow-2xl">
                        <button
                            onClick={() => setShowModal(false)}
                            className="absolute top-8 right-8 text-slate-400 hover:text-slate-600"
                        >
                            <X className="h-6 w-6" />
                        </button>
                        <h2 className="text-3xl font-black text-secondary mb-2">Book a Table</h2>
                        <p className="text-slate-500 mb-8">Secure your dining experience at {restaurant.name}.</p>

                        <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); alert('Table Booked!'); setShowModal(false); }}>
                            <div className="space-y-4">
                                <input type="text" placeholder="Your Name" className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-primary outline-none" required />
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="relative">
                                        <Users className="absolute left-4 top-4 h-5 w-5 text-slate-400" />
                                        <input type="number" placeholder="Guests" className="w-full p-4 pl-12 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-primary outline-none" required />
                                    </div>
                                    <div className="relative">
                                        <Calendar className="absolute left-4 top-4 h-5 w-5 text-slate-400" />
                                        <input type="date" className="w-full p-4 pl-12 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-primary outline-none" required />
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="relative">
                                        <Clock className="absolute left-4 top-4 h-5 w-5 text-slate-400" />
                                        <input type="time" className="w-full p-4 pl-12 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-primary outline-none" required />
                                    </div>
                                    <div className="relative">
                                        <Phone className="absolute left-4 top-4 h-5 w-5 text-slate-400" />
                                        <input type="tel" placeholder="Phone" className="w-full p-4 pl-12 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-primary outline-none" required />
                                    </div>
                                </div>
                            </div>
                            <button type="submit" className="w-full bg-primary text-white py-4 rounded-2xl font-bold text-lg hover:bg-emerald-600 transition-all shadow-xl shadow-emerald-100">
                                Confirm Booking
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
};

export default RestaurantCard;
