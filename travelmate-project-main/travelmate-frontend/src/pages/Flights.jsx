import React from 'react';
import TravelCard from '../components/TravelCard';
import { flights } from '../data/flights';
import { Plane } from 'lucide-react';

const Flights = () => {
    return (
        <div className="bg-slate-50 min-h-screen">
            <div className="bg-secondary py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center space-x-4 mb-4">
                        <div className="bg-primary/20 p-3 rounded-2xl">
                            <Plane className="h-8 w-8 text-primary" />
                        </div>
                        <h1 className="text-4xl font-extrabold text-white">Search Flights</h1>
                    </div>
                    <p className="text-slate-400 text-lg max-w-2xl">
                        Compare prices from 500+ airlines and find the best deals for your next journey.
                    </p>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 gap-6">
                    {flights.map((flight) => (
                        <TravelCard key={flight.id} item={flight} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Flights;
