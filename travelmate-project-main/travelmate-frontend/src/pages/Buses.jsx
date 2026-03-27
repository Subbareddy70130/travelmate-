import React from 'react';
import TravelCard from '../components/TravelCard';
import { buses } from '../data/buses';
import { BusFront } from 'lucide-react';

const Buses = () => {
    return (
        <div className="bg-slate-50 min-h-screen">
            <div className="bg-secondary py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center space-x-4 mb-4">
                        <div className="bg-amber-500/20 p-3 rounded-2xl">
                            <BusFront className="h-8 w-8 text-amber-500" />
                        </div>
                        <h1 className="text-4xl font-extrabold text-white">Bus Travel</h1>
                    </div>
                    <p className="text-slate-400 text-lg max-w-2xl">
                        Inter-city commutes made comfortable with Volvo and AC Seater options.
                    </p>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 gap-6">
                    {buses.map((bus) => (
                        <TravelCard key={bus.id} item={bus} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Buses;
