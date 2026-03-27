import React, { useState, useEffect } from 'react';
import DestinationCard from '../components/DestinationCard';
import { getDestinations } from '../services/api';
import { Sparkles, Utensils, Landmark, Loader2 } from 'lucide-react';

const Discover = () => {
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
                setError(err.message || 'Failed to load destinations.');
            } finally {
                setLoading(false);
            }
        };
        fetchDestinations();
    }, []);
    return (
        <div className="bg-white min-h-screen">
            <div className="bg-secondary py-32 relative overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <img
                        src="https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=1600&auto=format&fit=crop"
                        className="w-full h-full object-cover opacity-20"
                        alt="Discover Hero"
                    />
                </div>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
                    <h1 className="text-5xl md:text-7xl font-black text-white mb-6">Discover the World</h1>
                    <p className="text-slate-400 text-xl max-w-2xl mx-auto leading-relaxed">
                        Uncover hidden gems, taste authentic flavors, and explore legendary landmarks across the globe.
                    </p>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
                {loading ? (
                    <div className="flex flex-col items-center justify-center py-40">
                        <Loader2 className="h-16 w-16 text-primary animate-spin mb-6" />
                        <h3 className="text-2xl font-bold text-secondary">Discovering Destinations...</h3>
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
                    <div className="flex flex-col space-y-32">
                        {destList.map((dest, index) => (
                            <div key={dest.id} className={`flex flex-col lg:flex-row gap-16 items-center ${index % 2 !== 0 ? 'lg:flex-row-reverse' : ''}`}>
                                <div className="lg:w-1/2">
                                    <div className="relative group">
                                        <div className="absolute -inset-4 bg-emerald-50 rounded-[4rem] -z-10 group-hover:bg-emerald-100 transition-colors"></div>
                                        <img src={dest.imageUrl} className="w-full h-[500px] object-cover rounded-[3rem] shadow-2xl" alt={dest.name} />
                                        <div className="absolute bottom-8 left-8 bg-white/95 backdrop-blur-md px-6 py-3 rounded-2xl shadow-xl">
                                            <span className="text-primary font-black text-xl">{dest.name}</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="lg:w-1/2">
                                    <h2 className="text-4xl font-black text-secondary mb-6">{dest.name}</h2>
                                    <p className="text-slate-500 text-lg mb-10 leading-relaxed">{dest.description}</p>

                                    <div className="space-y-8">
                                        <div className="flex items-start space-x-6">
                                            <div className="bg-amber-50 p-4 rounded-2xl shrink-0"><Utensils className="h-6 w-6 text-amber-500" /></div>
                                            <div>
                                                <h4 className="font-bold text-secondary text-lg mb-1">Country</h4>
                                                <p className="text-slate-500">{dest.country}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-start space-x-6">
                                            <div className="bg-blue-50 p-4 rounded-2xl shrink-0"><Landmark className="h-6 w-6 text-blue-500" /></div>
                                            <div>
                                                <h4 className="font-bold text-secondary text-lg mb-1">Best Time to Visit</h4>
                                                <p className="text-slate-500">{dest.bestTimeToVisit}</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="mt-12 group flex items-center space-x-4">
                                        <button
                                            onClick={() => window.location.href = `/destination/${dest.id}`}
                                            className="bg-primary hover:bg-emerald-600 text-white font-bold px-10 py-4 rounded-2xl transition-all shadow-xl shadow-emerald-100"
                                        >
                                            Explore Now
                                        </button>
                                        <div className="h-[2px] w-20 bg-slate-100 group-hover:w-32 transition-all"></div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Discover;
