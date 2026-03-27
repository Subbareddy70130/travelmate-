import React, { useState, useEffect } from 'react';
import TripCard from '../components/TripCard';
import BookingModal from '../components/BookingModal';
import { getAllTrips } from '../services/api';
import { Loader2, Compass } from 'lucide-react';

const Trips = () => {
    const [tripsData, setTripsData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedTrip, setSelectedTrip] = useState(null);

    useEffect(() => {
        const fetchTrips = async () => {
            try {
                const data = await getAllTrips();
                setTripsData(data);
            } catch (err) {
                console.error('Error fetching trips:', err);
                setError(err.message || 'Failed to load trips.');
            } finally {
                setLoading(false);
            }
        };
        fetchTrips();
    }, []);

    return (
        <div className="bg-slate-50 min-h-screen pb-20">
            <div className="bg-secondary py-32 relative overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <img src="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=1600&auto=format&fit=crop" className="w-full h-full object-cover opacity-20" alt="Trips" />
                </div>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <h1 className="text-5xl md:text-7xl font-black text-white mb-6">Curated Trips</h1>
                    <p className="text-slate-400 text-xl max-w-2xl">
                        Thoughtfully planned itineraries that blend adventure, culture, and relaxation.
                    </p>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                {loading ? (
                    <div className="flex flex-col items-center justify-center py-20">
                        <Loader2 className="h-12 w-12 text-primary animate-spin mb-4" />
                        <p className="text-slate-500 font-bold">Loading trips...</p>
                    </div>
                ) : error ? (
                    <div className="text-center py-20 bg-red-50 rounded-[4rem] border border-red-100">
                        <p className="text-red-500 font-bold text-xl mb-6">{error}</p>
                        <button onClick={() => window.location.reload()} className="bg-primary text-white px-10 py-4 rounded-2xl font-bold hover:bg-emerald-600 transition-all shadow-lg shadow-emerald-100">Retry Loading</button>
                    </div>
                ) : (
                    <div className="space-y-12">
                        {tripsData.map(trip => (
                            <div key={trip.id} className="bg-white rounded-3xl overflow-hidden shadow-sm border border-slate-100 hover:shadow-lg transition-all">
                                <div className="flex flex-col md:flex-row">
                                    <div className="md:w-2/5">
                                        <img
                                            src={trip.imageUrl || "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=800&auto=format&fit=crop"}
                                            alt={trip.title}
                                            className="w-full h-64 md:h-full object-cover"
                                            onError={e => { e.target.src = "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=800&auto=format&fit=crop"; }}
                                        />
                                    </div>
                                    <div className="md:w-3/5 p-8 flex flex-col justify-between">
                                        <div>
                                            <div className="flex items-center gap-3 mb-3">
                                                <span className="bg-emerald-50 text-emerald-600 font-black text-xs px-3 py-1 rounded-full">{trip.duration || 'Multi-Day'}</span>
                                                {trip.bestSeason && <span className="bg-amber-50 text-amber-600 font-black text-xs px-3 py-1 rounded-full">Best: {trip.bestSeason}</span>}
                                            </div>
                                            <h3 className="text-2xl font-black text-slate-800 mb-3">{trip.title}</h3>
                                            <p className="text-slate-500 font-bold leading-relaxed line-clamp-3">{trip.description}</p>
                                        </div>
                                        <div className="flex items-center justify-between mt-6">
                                            <div>
                                                <p className="text-slate-400 text-sm font-bold">Starting from</p>
                                                <p className="text-3xl font-black text-emerald-600">₹15,000<span className="text-base text-slate-400">/person</span></p>
                                            </div>
                                            <div className="flex gap-3">
                                                <button
                                                    onClick={() => setSelectedTrip(trip)}
                                                    className="bg-emerald-500 text-white px-6 py-3 rounded-2xl font-black hover:bg-emerald-600 transition-all shadow-lg shadow-emerald-100 flex items-center gap-2"
                                                >
                                                    <Compass className="h-5 w-5" /> Book Trip
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                        {tripsData.length === 0 && (
                            <div className="text-center py-20 bg-white rounded-3xl border border-slate-100">
                                <p className="text-slate-400 font-bold text-lg">No trips available yet. Check back soon!</p>
                            </div>
                        )}
                    </div>
                )}
            </div>

            {/* Booking Modal */}
            {selectedTrip && (
                <BookingModal
                    type="TRIP"
                    item={selectedTrip}
                    pricePerUnit={15000}
                    onClose={() => setSelectedTrip(null)}
                />
            )}
        </div>
    );
};

export default Trips;
