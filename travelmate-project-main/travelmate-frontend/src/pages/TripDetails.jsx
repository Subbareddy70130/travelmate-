import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Clock, MapPin, Calendar, Loader2, Sunrise, Sun, Moon } from 'lucide-react';
import { getTripDetails, getTripItinerary } from '../services/api';
import BookingModal from '../components/BookingModal';

const TripDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [trip, setTrip] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [bookingOpen, setBookingOpen] = useState(false);

    useEffect(() => {
        window.scrollTo(0, 0);
        const fetchTripDetails = async () => {
            try {
                const [tripData, itineraryData] = await Promise.all([
                    getTripDetails(id),
                    getTripItinerary(id)
                ]);
                setTrip({ ...tripData, itinerary: itineraryData });
            } catch (err) {
                console.error('Error fetching trip details:', err);
                setError('Trip details not found.');
            } finally {
                setLoading(false);
            }
        };
        fetchTripDetails();
    }, [id]);

    if (loading) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50">
                <Loader2 className="h-16 w-16 text-primary animate-spin mb-6" />
                <h2 className="text-2xl font-bold text-secondary">Loading Trip Itinerary...</h2>
            </div>
        );
    }

    if (!trip) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50">
                <h2 className="text-3xl font-bold text-secondary mb-4">Trip Not Found</h2>
                <button
                    onClick={() => navigate('/trips')}
                    className="flex items-center space-x-2 text-primary hover:text-emerald-600 font-bold"
                >
                    <ArrowLeft className="h-5 w-5" />
                    <span>Back to Trips</span>
                </button>
            </div>
        );
    }

    return (
        <div className="bg-slate-50 min-h-screen pb-20">
            {/* Hero Section */}
            <div className="relative h-[50vh] min-h-[400px]">
                <img
                    src={trip.imageUrl || "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=1600&auto=format&fit=crop"}
                    alt={trip.title}
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/50 to-transparent"></div>

                <button
                    onClick={() => navigate(-1)}
                    className="absolute top-8 left-8 bg-white/20 hover:bg-white/40 backdrop-blur-md p-3 rounded-2xl text-white transition-all z-10"
                >
                    <ArrowLeft className="h-6 w-6" />
                </button>

                <div className="absolute bottom-0 left-0 right-0 p-8 max-w-4xl mx-auto text-center">
                    <span className="inline-block px-4 py-1.5 bg-primary/90 backdrop-blur-md text-white font-bold rounded-full mb-4 text-xs tracking-widest uppercase">
                        {trip.duration || "Multi-Day Trip"}
                    </span>
                    <h1 className="text-4xl md:text-6xl font-black text-white mb-6">{trip.title}</h1>
                    <div className="flex justify-center items-center space-x-6 text-slate-200">
                        <div className="flex items-center">
                            <Calendar className="h-5 w-5 mr-2 text-primary" />
                            <span className="font-bold">{trip.bestSeason || "Year-round"}</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Content Section */}
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 space-y-12">
                {/* Overview */}
                <section className="bg-white p-8 md:p-12 rounded-[3rem] shadow-sm border border-slate-100 text-center">
                    <h2 className="text-2xl font-black text-secondary mb-4">Trip Overview</h2>
                    <p className="text-slate-600 text-lg leading-relaxed">
                        Explore the beauty of {trip.title} with our expertly crafted itinerary.
                        This trip offers a perfect balance of adventure, relaxation, and local culture.
                    </p>
                </section>

                {/* Day-by-Day Itinerary */}
                <section>
                    <h2 className="text-3xl font-black text-secondary mb-8 flex items-center">
                        <Clock className="h-8 w-8 text-indigo-500 mr-3" />
                        Detailed Itinerary
                    </h2>
                    <div className="relative border-l-4 border-indigo-100 ml-4 md:ml-8 space-y-12 pb-8">
                        {trip.itinerary && trip.itinerary.length > 0 ? (
                            Object.entries(trip.itinerary.reduce((acc, item) => {
                                if (!acc[item.dayNumber]) acc[item.dayNumber] = [];
                                acc[item.dayNumber].push(item);
                                return acc;
                            }, {})).map(([dayNumber, activities]) => (
                                <div key={dayNumber} className="relative pl-8 md:pl-12">
                                    {/* Day Marker */}
                                    <div className="absolute -left-10 md:-left-12 top-0 bg-indigo-500 text-white font-black w-20 md:w-24 py-2 rounded-full text-center shadow-lg border-4 border-slate-50 z-10">
                                        Day {dayNumber}
                                    </div>
                                    <div className="pt-16 md:pt-8 grid grid-cols-1 gap-6">
                                        {activities.map((act) => {
                                            const TimeIcon = act.timeOfDay === 'MORNING' ? Sunrise : act.timeOfDay === 'AFTERNOON' ? Sun : Moon;
                                            const timeColor = act.timeOfDay === 'MORNING' ? 'text-amber-500 bg-amber-50' : act.timeOfDay === 'AFTERNOON' ? 'text-orange-500 bg-orange-50' : 'text-indigo-500 bg-indigo-50';
                                            return (
                                                <div key={act.id} className="bg-white rounded-[2rem] shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border border-slate-100 overflow-hidden group flex flex-col md:flex-row">
                                                    {act.imageUrl && (
                                                        <div className="md:w-1/3 h-48 md:h-auto overflow-hidden relative shrink-0">
                                                            <img src={act.imageUrl} alt={act.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                                                            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                                                            <div className={`absolute top-4 left-4 flex items-center gap-2 px-3 py-1.5 rounded-full font-black text-xs uppercase tracking-widest shadow-md backdrop-blur-md ${timeColor}`}>
                                                                <TimeIcon className="h-4 w-4" /> {act.timeOfDay}
                                                            </div>
                                                        </div>
                                                    )}
                                                    <div className="p-6 md:p-8 flex-1">
                                                        {!act.imageUrl && (
                                                            <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full font-black text-xs uppercase tracking-widest mb-3 ${timeColor}`}>
                                                                <TimeIcon className="h-4 w-4" /> {act.timeOfDay}
                                                            </div>
                                                        )}
                                                        <h3 className="text-2xl font-black text-secondary mb-2">{act.title}</h3>
                                                        {act.locationName && (
                                                            <p className="flex items-center text-slate-500 font-bold text-sm mb-4">
                                                                <MapPin className="h-4 w-4 mr-1 text-primary" /> {act.locationName}
                                                            </p>
                                                        )}
                                                        <p className="text-slate-600 leading-relaxed">{act.description}</p>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="text-center ml-8 py-20 bg-white rounded-[2rem] border border-slate-100 font-bold text-slate-400 italic">
                                No itinerary available for this trip yet.
                            </div>
                        )}
                    </div>
                </section>

                <div className="text-center pt-8 pb-12">
                    <button
                        onClick={() => setBookingOpen(true)}
                        className="bg-secondary hover:bg-primary text-white font-bold py-4 px-12 rounded-2xl transition-all shadow-xl hover:shadow-emerald-200 text-xl"
                    >
                        Book this Trip
                    </button>
                </div>
            </div>

            {/* Booking Modal */}
            {bookingOpen && (
                <BookingModal
                    type="TRIP"
                    item={trip}
                    pricePerUnit={15000}
                    onClose={() => setBookingOpen(false)}
                />
            )}
        </div>
    );
};

export default TripDetails;
