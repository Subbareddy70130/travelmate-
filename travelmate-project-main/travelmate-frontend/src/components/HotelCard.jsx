import React, { useState } from 'react';
import { Star, MapPin, ArrowRight, Wifi, Wind, Coffee, Loader2, CheckCircle2 } from 'lucide-react';
import ImageWithFallback from './ImageWithFallback';
import { createBooking } from '../services/api';

const HotelCard = ({ hotel }) => {
    const [booking, setBooking] = useState(false);
    const [booked, setBooked] = useState(false);

    const handleBookClick = async () => {
        const user = JSON.parse(localStorage.getItem('user'));
        if (!user) {
            alert('Please login to book a hotel');
            window.location.href = '/login';
            return;
        }

        setBooking(true);
        try {
            const bookingData = {
                userId: user.id, // Fixed: use flat structure matching DTO
                bookingType: 'HOTEL',
                itemId: hotel.id,
                travelDate: new Date().toISOString(), // Default to today for now
                numberOfPeople: 2,
                totalPrice: hotel.price,
                status: 'CONFIRMED'
            };

            await createBooking(bookingData);
            setBooked(true);
            setTimeout(() => setBooked(false), 3000);
        } catch (err) {
            console.error('Booking failed:', err);
            alert('Booking failed. Please check your login status.');
        } finally {
            setBooking(false);
        }
    };

    return (
        <div className="bg-white rounded-[3rem] shadow-sm overflow-hidden border border-slate-100 group hover:shadow-2xl transition-all duration-500 flex flex-col h-full">
            <div className="h-64 overflow-hidden relative">
                <ImageWithFallback
                    src={hotel.image}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    alt={hotel.name}
                />
                <div className="absolute top-6 right-6 bg-white/90 backdrop-blur-md px-4 py-2 rounded-2xl flex items-center space-x-1 shadow-lg">
                    <Star className="h-4 w-4 text-amber-500 fill-amber-500" />
                    <span className="font-bold">{hotel.rating}</span>
                </div>
            </div>
            <div className="p-8 flex-grow flex flex-col justify-between">
                <div>
                    <div className="flex justify-between items-start mb-4">
                        <div>
                            <h3 className="text-2xl font-extrabold text-secondary mb-2">{hotel.name}</h3>
                            <div className="flex items-center text-slate-400">
                                <MapPin className="h-4 w-4 mr-2 text-primary" />
                                <span className="text-sm font-medium">{hotel.location}</span>
                            </div>
                        </div>
                        <div className="text-right">
                            <p className="text-2xl font-black text-primary">₹{hotel.price.toLocaleString()}</p>
                            <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">Per Night</p>
                        </div>
                    </div>

                    <div className="flex space-x-4 py-6 border-y border-slate-50 mb-6">
                        {hotel.amenities && hotel.amenities.map(amenity => (
                            <span key={amenity} className="text-xs font-bold text-slate-400 bg-slate-50 px-2 py-1 rounded-md">{amenity}</span>
                        ))}
                        {!hotel.amenities && (
                            <>
                                <Wifi className="h-5 w-5 text-slate-300" />
                                <Wind className="h-5 w-5 text-slate-300" />
                                <Coffee className="h-5 w-5 text-slate-300" />
                            </>
                        )}
                    </div>
                </div>

                <button
                    onClick={handleBookClick}
                    disabled={booking || booked}
                    className={`w-full font-bold py-4 rounded-3xl transition-all shadow-xl flex items-center justify-center space-x-2 ${booked
                        ? 'bg-emerald-500 text-white'
                        : 'bg-slate-900 text-white hover:bg-primary hover:shadow-emerald-100'
                        }`}
                >
                    {booking ? (
                        <Loader2 className="h-5 w-5 animate-spin" />
                    ) : booked ? (
                        <>
                            <CheckCircle2 className="h-5 w-5" />
                            <span>Booking Confirmed!</span>
                        </>
                    ) : (
                        <>
                            <span>Book This Hotel</span>
                            <ArrowRight className="h-4 w-4" />
                        </>
                    )}
                </button>
            </div>
        </div>
    );
};

export default HotelCard;
