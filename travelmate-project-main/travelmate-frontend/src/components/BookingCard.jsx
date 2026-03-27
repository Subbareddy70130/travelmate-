import React from 'react';
import { IndianRupee, Clock, ArrowRight } from 'lucide-react';
import ImageWithFallback from './ImageWithFallback';
import { createBooking } from '../services/api';

const BookingCard = ({ item }) => {
    return (
        <div className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-slate-100 group flex flex-col md:flex-row">
            {/* Image Section */}
            <div className="md:w-1/3 h-48 md:h-auto overflow-hidden">
                <ImageWithFallback
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
            </div>

            <div className="p-6 md:w-2/3 flex flex-col justify-between">
                <div>
                    <div className="flex justify-between items-start mb-4">
                        <div>
                            <span className="inline-block px-3 py-1 bg-emerald-50 text-primary text-xs font-bold rounded-full mb-2">
                                {item.type}
                            </span>
                            <h3 className="text-xl font-bold text-secondary">{item.name}</h3>
                            <p className="text-slate-400 text-sm font-medium">{item.number}</p>
                        </div>
                        <div className="text-right">
                            <div className="flex items-center text-primary font-bold text-2xl">
                                <IndianRupee className="h-5 w-5" />
                                <span>{item.price.toLocaleString()}</span>
                            </div>
                            <p className="text-slate-400 text-xs mt-1">per person</p>
                        </div>
                    </div>

                    <div className="flex justify-between items-center py-6 border-y border-slate-50 my-2">
                        <div className="flex flex-col">
                            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Departure</p>
                            <p className="text-sm font-semibold text-secondary">{item.departure}</p>
                        </div>
                        <div className="flex flex-col items-center px-4">
                            <div className="w-12 h-[1px] bg-slate-200 relative">
                                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-slate-200"></div>
                            </div>
                            <div className="flex items-center mt-1 text-slate-400 whitespace-nowrap">
                                <Clock className="h-3 w-3 mr-1" />
                                <span className="text-[10px] font-bold uppercase">{item.duration}</span>
                            </div>
                        </div>
                        <div className="flex flex-col text-right">
                            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Arrival</p>
                            <p className="text-sm font-semibold text-secondary">{item.arrival}</p>
                        </div>
                    </div>
                </div>

                <button
                    onClick={async () => {
                        const user = JSON.parse(localStorage.getItem('user'));
                        if (!user) {
                            alert(`Please login to book this ${item.type}`);
                            window.location.href = '/login';
                            return;
                        }
                        try {
                            const bookingData = {
                                userId: user.id, // Fixed: use flat structure matching DTO
                                bookingType: item.type.toUpperCase(), // FLIGHT, TRAIN, BUS
                                itemId: item.id || 1, // Fallback if no ID
                                travelDate: new Date().toISOString(),
                                numberOfPeople: 1,
                                totalPrice: item.price,
                                status: 'CONFIRMED'
                            };
                            await createBooking(bookingData);
                            alert(`${item.type} booking confirmed!`);
                        } catch (err) {
                            console.error('Booking failed:', err);
                            alert('Booking failed. Please check your login status.');
                        }
                    }}
                    className="w-full mt-4 bg-slate-50 hover:bg-primary hover:text-white text-secondary font-bold py-3 rounded-xl transition-all flex items-center justify-center space-x-2 border border-slate-100 hover:border-primary group-hover:bg-primary group-hover:text-white"
                >
                    <span>Book {item.type} Now</span>
                    <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </button>
            </div>
        </div>
    );
};

export default BookingCard;
