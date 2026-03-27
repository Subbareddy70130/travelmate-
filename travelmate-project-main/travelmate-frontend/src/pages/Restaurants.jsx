import React, { useState, useEffect, useRef } from 'react';
import BookingModal from '../components/BookingModal';
import { getAllRestaurants, getDestinations, getRestaurantsByDestination } from '../services/api';
import { Loader2, Star, MapPin, UtensilsCrossed, Clock, Search, X, ChevronDown } from 'lucide-react';

const Restaurants = () => {
    const [restaurants, setRestaurants] = useState([]);
    const [destinations, setDestinations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedRestaurant, setSelectedRestaurant] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [showDropdown, setShowDropdown] = useState(false);
    const [selectedCity, setSelectedCity] = useState(null);
    const dropdownRef = useRef(null);

    useEffect(() => {
        const loadInitialData = async () => {
            try {
                const [restaurantsData, destsData] = await Promise.all([
                    getAllRestaurants(),
                    getDestinations()
                ]);
                setRestaurants(restaurantsData);
                setDestinations(destsData);
            } catch (err) {
                console.error('Error fetching data:', err);
                setError('Failed to load restaurants.');
            } finally {
                setLoading(false);
            }
        };
        loadInitialData();
    }, []);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setShowDropdown(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleCitySelect = async (city) => {
        setLoading(true);
        setSelectedCity(city);
        setSearchQuery(city.name);
        setShowDropdown(false);
        try {
            const data = await getRestaurantsByDestination(city.id);
            setRestaurants(data);
        } catch (err) {
            setError('Failed to filter restaurants by city.');
        } finally {
            setLoading(false);
        }
    };

    const clearFilter = async () => {
        setLoading(true);
        setSelectedCity(null);
        setSearchQuery('');
        try {
            const data = await getAllRestaurants();
            setRestaurants(data);
        } catch (err) {
            setError('Failed to reset filters.');
        } finally {
            setLoading(false);
        }
    };

    const filteredDestinations = destinations.filter(d =>
        d.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const fallbackImages = [
        'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?w=800&auto=format&fit=crop',
    ];

    return (
        <div className="bg-slate-50 min-h-screen pb-20">
            <div className="bg-secondary py-32 relative overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <img src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1600&auto=format&fit=crop" className="w-full h-full object-cover opacity-20" alt="Restaurants" />
                </div>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
                    <h1 className="text-5xl md:text-7xl font-black text-white mb-6">Fine Dining</h1>
                    <p className="text-slate-300 text-xl max-w-2xl mx-auto leading-relaxed mb-10">
                        Discover authentic flavours and reserve your table at premium restaurants.
                    </p>

                    {/* Search Bar */}
                    <div className="max-w-xl mx-auto relative" ref={dropdownRef}>
                        <div className="bg-white p-2 rounded-2xl shadow-2xl flex items-center gap-2 border border-slate-100">
                            <div className="flex-grow flex items-center gap-3 px-4 py-2 border-r border-slate-100">
                                <Search className="h-5 w-5 text-slate-400" />
                                <input
                                    type="text"
                                    placeholder="Search by city..."
                                    className="bg-transparent border-none outline-none w-full font-bold text-slate-800 placeholder:text-slate-400"
                                    value={searchQuery}
                                    onChange={(e) => {
                                        setSearchQuery(e.target.value);
                                        setShowDropdown(true);
                                    }}
                                    onFocus={() => setShowDropdown(true)}
                                />
                            </div>
                            {selectedCity || searchQuery ? (
                                <button
                                    onClick={clearFilter}
                                    className="p-3 hover:bg-slate-50 rounded-xl transition-colors group"
                                >
                                    <X className="h-5 w-5 text-slate-400 group-hover:text-red-500" />
                                </button>
                            ) : (
                                <div className="p-3">
                                    <ChevronDown className="h-5 w-5 text-slate-400" />
                                </div>
                            )}
                        </div>

                        {/* City Dropdown */}
                        {showDropdown && filteredDestinations.length > 0 && (
                            <div className="absolute top-full left-0 right-0 mt-3 bg-white rounded-2xl shadow-2xl border border-slate-100 overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                                {filteredDestinations.map((city) => (
                                    <button
                                        key={city.id}
                                        onClick={() => handleCitySelect(city)}
                                        className="w-full text-left px-6 py-4 hover:bg-slate-50 transition-colors flex items-center gap-4 group"
                                    >
                                        <div className="h-10 w-10 rounded-xl overflow-hidden shadow-sm">
                                            <img src={city.imageUrl} alt={city.name} className="w-full h-full object-cover" />
                                        </div>
                                        <div>
                                            <p className="font-black text-slate-800 group-hover:text-primary transition-colors">{city.name}</p>
                                            <p className="text-slate-400 text-sm font-bold">{city.country}</p>
                                        </div>
                                    </button>
                                ))}
                            </div>
                        )}
                        {showDropdown && searchQuery && filteredDestinations.length === 0 && (
                            <div className="absolute top-full left-0 right-0 mt-3 bg-white rounded-2xl shadow-2xl border border-slate-100 p-6 text-center z-50">
                                <p className="text-slate-400 font-bold">No cities found matching "{searchQuery}"</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                {loading ? (
                    <div className="flex flex-col items-center justify-center py-20">
                        <Loader2 className="h-12 w-12 text-primary animate-spin mb-4" />
                        <p className="text-slate-500 font-bold">Loading restaurants...</p>
                    </div>
                ) : error ? (
                    <div className="text-center py-20 bg-red-50 rounded-3xl border border-red-100">
                        <p className="text-red-500 font-bold text-xl">{error}</p>
                    </div>
                ) : (
                    <>
                        {selectedCity && (
                            <div className="mb-10 flex items-center justify-between">
                                <h2 className="text-3xl font-black text-slate-800">
                                    Restaurants in <span className="text-purple-600">{selectedCity.name}</span>
                                </h2>
                                <button onClick={clearFilter} className="text-slate-400 font-bold hover:text-slate-600 transition-colors underline decoration-2 underline-offset-4">
                                    Show all restaurants
                                </button>
                            </div>
                        )}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {restaurants.map((r, idx) => (
                                <div key={r.id} className="bg-white rounded-3xl overflow-hidden shadow-sm border border-slate-100 hover:shadow-xl hover:-translate-y-1 transition-all group">
                                    <div className="relative overflow-hidden h-56">
                                        <img
                                            src={r.imageUrl || fallbackImages[idx % fallbackImages.length]}
                                            alt={r.name}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                            onError={e => { e.target.src = fallbackImages[idx % fallbackImages.length]; }}
                                        />
                                        <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full flex items-center gap-1.5">
                                            <Star className="h-4 w-4 text-amber-400 fill-amber-400" />
                                            <span className="font-black text-slate-800 text-sm">{r.rating || '4.3'}</span>
                                        </div>
                                        {r.cuisine && (
                                            <div className="absolute top-4 right-4 bg-purple-500 text-white px-3 py-1 rounded-full text-xs font-black">
                                                {r.cuisine}
                                            </div>
                                        )}
                                    </div>
                                    <div className="p-6">
                                        <h3 className="text-xl font-black text-slate-800 mb-2">{r.name}</h3>
                                        <div className="flex items-start gap-3 mb-4">
                                            <div className="flex items-center gap-1.5 text-slate-400">
                                                <MapPin className="h-4 w-4 flex-shrink-0" />
                                                <span className="font-bold text-sm">{r.location || 'India'}</span>
                                            </div>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <p className="text-slate-400 text-xs font-bold">Price per cover</p>
                                                <span className="text-xl font-black text-purple-600">₹800 – ₹2,000</span>
                                            </div>
                                            <button
                                                onClick={() => setSelectedRestaurant(r)}
                                                className="bg-purple-500 text-white px-5 py-2.5 rounded-xl font-black text-sm hover:bg-purple-600 transition-all shadow-lg shadow-purple-100 flex items-center gap-2"
                                            >
                                                <UtensilsCrossed className="h-4 w-4" /> Reserve Table
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        {restaurants.length === 0 && (
                            <div className="text-center py-20 bg-white rounded-3xl border border-slate-100">
                                <div className="bg-slate-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                                    <UtensilsCrossed className="h-10 w-10 text-slate-300" />
                                </div>
                                <p className="text-slate-800 font-black text-2xl mb-2">No restaurants found</p>
                                <p className="text-slate-400 font-bold max-w-xs mx-auto mb-8">
                                    We couldn't find any restaurants in this city. Try searching for another destination.
                                </p>
                                <button onClick={clearFilter} className="bg-slate-900 text-white px-8 py-3 rounded-2xl font-black hover:bg-primary transition-all">
                                    View all restaurants
                                </button>
                            </div>
                        )}
                    </>
                )}
            </div>

            {selectedRestaurant && (
                <BookingModal
                    type="RESTAURANT"
                    item={selectedRestaurant}
                    pricePerUnit={800}
                    onClose={() => setSelectedRestaurant(null)}
                />
            )}
        </div>
    );
};

export default Restaurants;
