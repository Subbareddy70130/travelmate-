import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ArrowLeft, Search, MapPin, Calendar, CheckCircle, Loader2 } from 'lucide-react';
import { searchDestinations } from '../services/api';
import DestinationCard from '../components/DestinationCard';

const DestinationResults = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const queryParams = new URLSearchParams(location.search);

    const searchDest = queryParams.get('dest');
    const searchDates = queryParams.get('dates');
    const searchType = queryParams.get('type');

    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        window.scrollTo(0, 0);
        const fetchResults = async () => {
            setLoading(true);
            try {
                // if dest query param exists, search by city
                const data = await searchDestinations(searchDest || '');
                setResults(data);
            } catch (err) {
                console.error('Search error:', err);
                setError('Failed to fetch search results.');
            } finally {
                setLoading(false);
            }
        };
        fetchResults();
    }, [searchDest]);

    // Matched results
    const matchedDestinations = results;

    return (
        <div className="bg-slate-50 min-h-screen pb-20">
            <div className="bg-secondary pt-32 pb-20 relative overflow-hidden">
                <div className="absolute inset-0 z-0 opacity-10">
                    <img src="https://images.unsplash.com/photo-1436491865332-7a61a109c0f2?w=1600&auto=format&fit=crop" className="w-full h-full object-cover" alt="Search BG" />
                </div>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
                    <h1 className="text-4xl md:text-6xl font-black text-white mb-6">Search Results</h1>
                    <div className="flex flex-wrap justify-center gap-4 text-slate-300 text-lg">
                        {searchDest && (
                            <div className="flex items-center bg-white/10 px-4 py-2 rounded-xl backdrop-blur-sm">
                                <MapPin className="h-5 w-5 mr-2 text-primary" />
                                <span className="font-bold text-white">{searchDest}</span>
                            </div>
                        )}
                        {searchDates && (
                            <div className="flex items-center bg-white/10 px-4 py-2 rounded-xl backdrop-blur-sm">
                                <Calendar className="h-5 w-5 mr-2 text-primary" />
                                <span className="font-bold text-white">{searchDates}</span>
                            </div>
                        )}
                        {searchType && (
                            <div className="flex items-center bg-white/10 px-4 py-2 rounded-xl backdrop-blur-sm">
                                <CheckCircle className="h-5 w-5 mr-2 text-primary" />
                                <span className="font-bold text-white">{searchType}</span>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-20">
                <button
                    onClick={() => navigate('/')}
                    className="flex items-center space-x-2 bg-white px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all text-secondary font-bold mb-12 border border-slate-100"
                >
                    <ArrowLeft className="h-5 w-5" />
                    <span>Back to Search</span>
                </button>

                {loading ? (
                    <div className="flex flex-col items-center justify-center py-24 bg-white rounded-[3rem] shadow-sm border border-slate-100">
                        <Loader2 className="h-16 w-16 text-primary animate-spin mb-6" />
                        <h2 className="text-2xl font-black text-secondary">Searching for your dream destination...</h2>
                    </div>
                ) : error ? (
                    <div className="text-center py-24 bg-red-50 rounded-[3rem] border border-red-100">
                        <p className="text-red-500 font-bold">{error}</p>
                    </div>
                ) : (matchedDestinations && matchedDestinations.length > 0) ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {matchedDestinations.map((dest) => (
                            <DestinationCard key={dest.id} destination={dest} />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-24 bg-white rounded-[3rem] shadow-sm border border-slate-100">
                        <Search className="h-16 w-16 text-slate-300 mx-auto mb-6" />
                        <h2 className="text-2xl font-black text-secondary mb-2">No exact matches found</h2>
                        <p className="text-slate-500">We couldn't find exactly what you were looking for. Try adjusting your search criteria.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default DestinationResults;
