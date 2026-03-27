import React, { useState, useEffect } from 'react';
import SearchBar from '../components/SearchBar';
import DestinationCard from '../components/DestinationCard';
import ReviewCard from '../components/ReviewCard';
import { getDestinations } from '../services/api';
import { reviews } from '../data/reviews';
import { Sparkles, TrendingUp, ShieldCheck, Loader2 } from 'lucide-react';

const Home = () => {
    const [destList, setDestList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchDestinations = async () => {
            try {
                const data = await getDestinations();
                setDestList(data);
            } catch (err) {
                console.error('Error fetching destinations:', err);
                setError('Failed to load destinations. Please try again later.');
            } finally {
                setLoading(false);
            }
        };
        fetchDestinations();
    }, []);
    return (
        <div className="bg-white">
            {/* Hero Section */}
            <div className="relative h-[80vh] min-h-[600px] flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <img
                        src="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=1600&auto=format&fit=crop"
                        className="w-full h-full object-cover brightness-[0.6]"
                        alt="Travel Hero"
                    />
                </div>

                <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
                    <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-6 drop-shadow-2xl">
                        Where your journey <span className="text-primary">begins.</span>
                    </h1>
                    <p className="text-xl text-slate-100 mb-12 max-w-2xl mx-auto font-medium drop-shadow-lg">
                        Plan your next adventure with TravelMate's curated destinations and seamless booking experience.
                    </p>
                </div>
            </div>

            {/* Search Bar Container */}
            <div className="px-4">
                <SearchBar />
            </div>

            {/* Features Section */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                    <div className="flex flex-col items-center text-center p-8 rounded-[2rem] bg-emerald-50 border border-emerald-100">
                        <div className="bg-white p-4 rounded-2xl shadow-sm mb-6">
                            <Sparkles className="h-8 w-8 text-primary" />
                        </div>
                        <h3 className="text-xl font-bold text-secondary mb-3">Best Prices</h3>
                        <p className="text-slate-500 text-sm">We find the most affordable flights and hotels for your budget.</p>
                    </div>
                    <div className="flex flex-col items-center text-center p-8 rounded-[2rem] bg-slate-50 border border-slate-100">
                        <div className="bg-white p-4 rounded-2xl shadow-sm mb-6">
                            <TrendingUp className="h-8 w-8 text-blue-500" />
                        </div>
                        <h3 className="text-xl font-bold text-secondary mb-3">Trending Spots</h3>
                        <p className="text-slate-500 text-sm">Discover locations that are currently trending among travelers.</p>
                    </div>
                    <div className="flex flex-col items-center text-center p-8 rounded-[2rem] bg-amber-50 border border-amber-100">
                        <div className="bg-white p-4 rounded-2xl shadow-sm mb-6">
                            <ShieldCheck className="h-8 w-8 text-amber-500" />
                        </div>
                        <h3 className="text-xl font-bold text-secondary mb-3">Safe & Secure</h3>
                        <p className="text-slate-500 text-sm">Your bookings and data are always protected with us.</p>
                    </div>
                </div>
            </div>

            {/* Popular Destinations */}
            <div className="bg-slate-50 py-24">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-end mb-12">
                        <div>
                            <h2 className="text-4xl font-extrabold text-secondary mb-4">Popular Destinations</h2>
                            <p className="text-slate-500 text-lg">Curated collections from around the globe.</p>
                        </div>
                    </div>

                    {loading ? (
                        <div className="col-span-full flex flex-col items-center justify-center py-20">
                            <Loader2 className="h-12 w-12 text-primary animate-spin mb-4" />
                            <p className="text-slate-500 font-bold">Loading destinations...</p>
                        </div>
                    ) : error ? (
                        <div className="text-center py-20 bg-red-50 rounded-[4rem] border border-red-100">
                            <p className="text-red-500 font-bold text-xl mb-6">{error}</p>
                            <button
                                onClick={() => window.location.reload()}
                                className="bg-primary text-white px-10 py-4 rounded-2xl font-bold hover:bg-emerald-600 transition-all shadow-lg shadow-emerald-100"
                            >
                                Retry Loading
                            </button>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                            {destList.map((dest) => (
                                <DestinationCard
                                    key={dest.id}
                                    destination={dest}
                                />
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* Reviews Section */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-extrabold text-secondary mb-4">What our travelers say</h2>
                    <p className="text-slate-500 text-lg">Real stories from the TravelMate community.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {reviews.map((review) => (
                        <ReviewCard key={review.id} review={review} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Home;
