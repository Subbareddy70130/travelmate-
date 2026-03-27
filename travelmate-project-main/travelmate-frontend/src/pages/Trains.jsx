import React from 'react';
import TravelCard from '../components/TravelCard';
import { trains } from '../data/trains';
import { Train } from 'lucide-react';

const Trains = () => {
    return (
        <div className="bg-slate-50 min-h-screen">
            <div className="bg-secondary py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center space-x-4 mb-4">
                        <div className="bg-blue-500/20 p-3 rounded-2xl">
                            <Train className="h-8 w-8 text-blue-500" />
                        </div>
                        <h1 className="text-4xl font-extrabold text-white">Train Bookings</h1>
                    </div>
                    <p className="text-slate-400 text-lg max-w-2xl">
                        Experience the scenic routes across India with our easy train booking system.
                    </p>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 gap-6">
                    {trains.map((train) => (
                        <TravelCard key={train.id} item={train} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Trains;
