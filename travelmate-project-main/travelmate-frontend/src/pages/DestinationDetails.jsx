import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Star, MapPin, Calendar, Utensils, Landmark, Navigation, Clock, Sun, Loader2 } from 'lucide-react';
import { getDestinationDetails, getPlacesByDestination, getHotelsByDestination, getRestaurantsByDestination, getTripsByDestination } from '../services/api';
import ImageWithFallback from '../components/ImageWithFallback';

const DestinationDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [destination, setDestination] = useState(null);
    const [places, setPlaces] = useState([]);
    const [hotels, setHotels] = useState([]);
    const [restaurants, setRestaurants] = useState([]);
    const [trips, setTrips] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        window.scrollTo(0, 0);
        const fetchData = async () => {
            try {
                const [destData, placesData, hotelsData, restaurantsData, tripsData] = await Promise.all([
                    getDestinationDetails(id),
                    getPlacesByDestination(id),
                    getHotelsByDestination(id),
                    getRestaurantsByDestination(id),
                    getTripsByDestination(id)
                ]);
                setDestination(destData);
                setPlaces(placesData);
                setHotels(hotelsData);
                setRestaurants(restaurantsData);
                setTrips(tripsData);
            } catch (err) {
                console.error('Error fetching destination data:', err);
                setError('Destination not found or network error.');
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [id]);

    if (loading) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50">
                <Loader2 className="h-16 w-16 text-primary animate-spin mb-6" />
                <h2 className="text-2xl font-bold text-secondary">Gathering Destination Details...</h2>
            </div>
        );
    }

    if (error || !destination) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50">
                <h2 className="text-3xl font-bold text-secondary mb-4">Destination Not Found</h2>
                <button
                    onClick={() => navigate('/')}
                    className="flex items-center space-x-2 text-primary hover:text-emerald-600 font-bold"
                >
                    <ArrowLeft className="h-5 w-5" />
                    <span>Back to Home</span>
                </button>
            </div>
        );
    }

    return (
        <div className="bg-slate-50 min-h-screen pb-20">
            {/* Hero Section */}
            <div className="relative h-[70vh] min-h-[500px]">
                <ImageWithFallback
                    src={destination.imageUrl}
                    alt={destination.name}
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent"></div>

                <button
                    onClick={() => navigate(-1)}
                    className="absolute top-8 left-8 bg-white/20 hover:bg-white/40 backdrop-blur-md p-3 rounded-2xl text-white transition-all z-10"
                >
                    <ArrowLeft className="h-6 w-6" />
                </button>

                <div className="absolute bottom-0 left-0 right-0 p-8 max-w-7xl mx-auto">
                    <div className="flex flex-col md:flex-row md:items-end justify-between space-y-6 md:space-y-0">
                        <div className="max-w-2xl">
                            <div className="flex items-center space-x-3 mb-4">
                                <span className="px-4 py-1.5 bg-primary text-white text-xs font-black uppercase tracking-widest rounded-full">
                                    {destination.category || "Top Rated"}
                                </span>
                                <div className="flex items-center space-x-1 bg-white/20 backdrop-blur-md px-3 py-1 rounded-lg">
                                    <Star className="h-4 w-4 text-amber-400 fill-amber-400" />
                                    <span className="font-bold text-white text-sm">{destination.rating || "4.5"}</span>
                                </div>
                            </div>
                            <h1 className="text-5xl md:text-7xl font-black text-white mb-4 leading-tight">{destination.name}</h1>
                            <div className="flex items-center space-x-6 text-slate-200">
                                <div className="flex items-center space-x-2">
                                    <Calendar className="h-5 w-5 text-primary" />
                                    <span className="font-bold">Best Time: {destination.bestTimeToVisit}</span>
                                </div>
                                <span className="hidden md:inline">|</span>
                                <span>{destination.reviews || "1.2k+"} reviews from travelers</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Content Section */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-20">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
                    {/* Left Column - Main Details */}
                    <div className="lg:col-span-2 space-y-16">
                        {/* Overview */}
                        <section>
                            <div className="flex items-center space-x-4 mb-8">
                                <div className="p-3 bg-emerald-100 text-primary rounded-2xl">
                                    <MapPin className="h-6 w-6" />
                                </div>
                                <h2 className="text-3xl font-black text-secondary uppercase tracking-tight">Overview</h2>
                            </div>
                            <div className="bg-white p-10 rounded-[3rem] shadow-sm border border-slate-100">
                                <p className="text-slate-600 text-xl leading-relaxed font-medium">
                                    {destination.description}
                                </p>
                            </div>
                        </section>

                        {/* Top Places */}
                        <section>
                            <div className="flex items-center space-x-4 mb-8">
                                <div className="p-3 bg-blue-100 text-blue-600 rounded-2xl">
                                    <Landmark className="h-6 w-6" />
                                </div>
                                <h2 className="text-3xl font-black text-secondary uppercase tracking-tight">Must Visit Places</h2>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {places.length > 0 ? places.map((place, idx) => (
                                    <div key={idx} className="group relative overflow-hidden bg-white p-6 rounded-[2rem] shadow-sm border border-slate-100 hover:shadow-xl hover:border-blue-100 transition-all">
                                        <div className="flex items-start space-x-4 relative z-10">
                                            <div className="bg-blue-50 p-3 text-blue-600 rounded-2xl group-hover:bg-blue-600 group-hover:text-white transition-colors">
                                                <Navigation className="h-5 w-5" />
                                            </div>
                                            <div>
                                                <h3 className="font-black text-secondary text-lg mb-1">{place.name}</h3>
                                                <p className="text-slate-400 text-sm font-bold">{place.description}</p>
                                            </div>
                                        </div>
                                    </div>
                                )) : (
                                    <div className="col-span-full py-10 text-center text-slate-400 font-bold italic">No specific places listed yet.</div>
                                )}
                            </div>
                        </section>

                        {/* Available Trips */}
                        <section>
                            <div className="flex items-center space-x-4 mb-8">
                                <div className="p-3 bg-indigo-100 text-indigo-600 rounded-2xl">
                                    <Navigation className="h-6 w-6" />
                                </div>
                                <h2 className="text-3xl font-black text-secondary uppercase tracking-tight">Available Trips</h2>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative">
                                {trips.length > 0 ? trips.map((trip) => (
                                    <div key={trip.id} className="bg-white rounded-[2rem] shadow-sm border border-slate-100 overflow-hidden group hover:shadow-xl hover:-translate-y-1 transition-all">
                                        <div className="h-48 relative overflow-hidden">
                                            <ImageWithFallback src={trip.imageUrl} alt={trip.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                                            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent"></div>
                                            <div className="absolute bottom-4 left-4 right-4 text-left">
                                                <h3 className="text-white font-black text-xl mb-1">{trip.title}</h3>
                                                <span className="text-slate-200 font-bold text-xs uppercase tracking-widest">{trip.duration}</span>
                                            </div>
                                        </div>
                                        <div className="p-6 flex justify-between items-center bg-white">
                                            <div className="flex items-center text-slate-500 text-sm font-bold">
                                                <Calendar className="h-4 w-4 mr-1 text-primary" /> {trip.bestSeason || 'Year-round'}
                                            </div>
                                            <button onClick={() => navigate(`/trip/${trip.id}`)} className="bg-indigo-50 text-indigo-600 hover:bg-indigo-600 hover:text-white px-4 py-2 rounded-xl font-bold transition-colors text-sm shadow-sm">
                                                View Itinerary →
                                            </button>
                                        </div>
                                    </div>
                                )) : (
                                    <div className="col-span-full py-10 text-center text-slate-400 font-bold italic bg-white rounded-[2rem] border border-slate-100">No packaged trips available yet.</div>
                                )}
                            </div>
                        </section>
                    </div>

                    {/* Right Column - Sidebar */}
                    <div className="space-y-12">
                        {/* Food Items */}
                        <div className="bg-white p-10 rounded-[3rem] shadow-sm border border-slate-100">
                            <div className="flex items-center space-x-3 mb-8">
                                <div className="p-2 bg-amber-100 text-amber-500 rounded-xl">
                                    <Utensils className="h-5 w-5" />
                                </div>
                                <h3 className="text-xl font-black text-secondary uppercase tracking-tight">Top Restaurants</h3>
                            </div>
                            <div className="space-y-4">
                                {restaurants.length > 0 ? restaurants.map((rest, idx) => (
                                    <div key={idx} className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100 group hover:bg-amber-50 hover:border-amber-100 transition-all font-bold text-secondary">
                                        <div className="flex flex-col">
                                            <span>{rest.name}</span>
                                            <span className="text-xs text-slate-400">{rest.cuisine}</span>
                                        </div>
                                        <div className="h-2 w-2 rounded-full bg-amber-400"></div>
                                    </div>
                                )) : (
                                    <div className="text-center text-slate-400 py-4 font-bold italic">No restaurants listed.</div>
                                )}
                            </div>
                        </div>

                        {/* Hotels */}
                        <div className="bg-white p-10 rounded-[3rem] shadow-sm border border-slate-100">
                            <div className="flex items-center space-x-3 mb-8">
                                <div className="p-2 bg-blue-100 text-blue-500 rounded-xl">
                                    <Star className="h-5 w-5" />
                                </div>
                                <h3 className="text-xl font-black text-secondary uppercase tracking-tight">Best Hotels</h3>
                            </div>
                            <div className="space-y-4">
                                {hotels.length > 0 ? hotels.map((hotel, idx) => (
                                    <div key={idx} className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100 group hover:bg-blue-50 hover:border-blue-100 transition-all font-bold text-secondary">
                                        <div className="flex flex-col">
                                            <span>{hotel.name}</span>
                                            <span className="text-xs text-slate-400">Rating: {hotel.rating}</span>
                                        </div>
                                        <div className="text-xs text-primary">{hotel.pricePerNight}</div>
                                    </div>
                                )) : (
                                    <div className="text-center text-slate-400 py-4 font-bold italic">No hotels listed.</div>
                                )}
                            </div>
                        </div>

                        {/* Travel Tips */}
                        <div className="bg-secondary p-10 rounded-[3rem] text-white overflow-hidden relative group">
                            <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 p-20 bg-white/5 rounded-full group-hover:scale-110 transition-transform duration-700"></div>
                            <h3 className="text-xl font-black mb-8 flex items-center relative z-10">
                                <Sun className="h-5 w-5 mr-3 text-amber-400" />
                                Travel Tips
                            </h3>
                            <div className="space-y-6 relative z-10">
                                <div>
                                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Climate</p>
                                    <p className="text-sm font-bold text-slate-200">The best climate is during {destination.bestTimeToVisit}. Pack accordingly.</p>
                                </div>
                                <div>
                                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Local Cash</p>
                                    <p className="text-sm font-bold text-slate-200">While cards are accepted in city centers, small vendors prefer cash.</p>
                                </div>
                                <button className="w-full mt-4 py-3 bg-white/10 hover:bg-white/20 rounded-xl font-bold text-sm transition-all border border-white/10">
                                    Download Travel Guide
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DestinationDetails;
