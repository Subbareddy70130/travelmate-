import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Sun, SunDim, Moon, DollarSign, Calendar, ArrowRight } from 'lucide-react';
import ImageWithFallback from './ImageWithFallback';
import { createBooking } from '../services/api';

const TripCard = ({ trip }) => {
    const navigate = useNavigate();
    return (
        <div className="bg-white rounded-[3rem] shadow-sm border border-slate-100 overflow-hidden flex flex-col md:flex-row p-4 hover:shadow-2xl transition-all duration-500">
            <div className="md:w-80 h-64 md:h-auto rounded-[2.5rem] overflow-hidden shrink-0">
                <ImageWithFallback src={trip.image} className="w-full h-full object-cover" alt={trip.title} />
            </div>
            <div className="p-8 flex-grow flex flex-col">
                <div className="flex justify-between items-start mb-6">
                    <div>
                        <span className="bg-blue-50 text-blue-500 text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest mb-2 inline-block">
                            {trip.duration}
                        </span>
                        <h3 className="text-3xl font-black text-secondary">{trip.title}</h3>
                        <div className="flex items-center text-slate-400 text-sm mt-1 font-medium">
                            <Calendar className="h-4 w-4 mr-2" />
                            <span>Best Season: <span className="text-primary font-bold">{trip.bestSeason}</span></span>
                        </div>
                    </div>
                    <div className="text-right">
                        <div className="flex items-center text-secondary font-black text-3xl">
                            <DollarSign className="h-6 w-6 text-primary" />
                            <span>{trip.estimatedCost}</span>
                        </div>
                        <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest">Est. Cost</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 py-6 border-y border-slate-50">
                    <div className="flex items-start space-x-3">
                        <div className="bg-amber-50 p-2 rounded-xl shrink-0"><Sun className="h-4 w-4 text-amber-500" /></div>
                        <div>
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Morning</p>
                            <p className="text-xs font-bold text-secondary leading-tight">{trip.itinerary?.morning || "Travel and check-in"}</p>
                        </div>
                    </div>
                    <div className="flex items-start space-x-3">
                        <div className="bg-blue-50 p-2 rounded-xl shrink-0"><SunDim className="h-4 w-4 text-blue-500" /></div>
                        <div>
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Afternoon</p>
                            <p className="text-xs font-bold text-secondary leading-tight">{trip.itinerary?.afternoon || "Local exploration"}</p>
                        </div>
                    </div>
                    <div className="flex items-start space-x-3">
                        <div className="bg-indigo-50 p-2 rounded-xl shrink-0"><Moon className="h-4 w-4 text-indigo-500" /></div>
                        <div>
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Evening</p>
                            <p className="text-xs font-bold text-secondary leading-tight">{trip.itinerary?.evening || "Dinner and relaxation"}</p>
                        </div>
                    </div>
                </div>

                <div className="mt-auto flex justify-between items-center space-x-4">
                    <button
                        onClick={() => navigate(`/trip/${trip.id}`)}
                        className="bg-slate-50 hover:bg-slate-100 text-secondary font-bold px-6 py-3 rounded-2xl transition-all flex items-center space-x-2 border border-slate-100 group"
                    >
                        <span>Details</span>
                        <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </button>
                    <button
                        onClick={async () => {
                            const user = JSON.parse(localStorage.getItem('user'));
                            if (!user) {
                                alert('Please login to book a trip');
                                window.location.href = '/login';
                                return;
                            }
                            try {
                                const bookingData = {
                                    userId: user.id, // Fixed: use flat structure matching DTO
                                    bookingType: 'TRIP',
                                    itemId: trip.id,
                                    travelDate: new Date().toISOString(),
                                    numberOfPeople: 1,
                                    totalPrice: parseFloat(trip.estimatedCost.replace(/[^0-9.]/g, '')),
                                    status: 'CONFIRMED'
                                };
                                await createBooking(bookingData);
                                alert('Trip booking confirmed!');
                            } catch (err) {
                                console.error('Booking failed:', err);
                                alert('Booking failed. Please check your login status.');
                            }
                        }}
                        className="bg-primary hover:bg-emerald-600 text-white font-bold px-8 py-3 rounded-2xl transition-all shadow-lg shadow-emerald-100 flex-grow text-center"
                    >
                        Book Trip
                    </button>
                </div>
            </div>
        </div>
    );
};

export default TripCard;
