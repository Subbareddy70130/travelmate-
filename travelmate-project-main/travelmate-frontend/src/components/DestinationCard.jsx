import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Star, MapPin, ArrowRight } from 'lucide-react';
import ImageWithFallback from './ImageWithFallback';

const DestinationCard = ({ destination }) => {
    const navigate = useNavigate();

    return (
        <div
            onClick={() => navigate(`/destination/${destination.id}`)}
            className="bg-white rounded-3xl shadow-sm hover:shadow-2xl transition-all duration-500 overflow-hidden border border-slate-100 group cursor-pointer h-full flex flex-col"
        >
            <div className="relative h-64 overflow-hidden">
                <ImageWithFallback
                    src={destination.imageUrl}
                    alt={destination.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-2xl flex items-center space-x-1 shadow-lg">
                    <Star className="h-4 w-4 text-amber-500 fill-amber-500" />
                    <span className="text-sm font-bold text-slate-800">{destination.rating}</span>
                </div>
                <div className="absolute bottom-4 left-4">
                    <span className="bg-primary/90 backdrop-blur-md text-white px-4 py-1.5 rounded-full text-xs font-bold shadow-lg">
                        {destination.category}
                    </span>
                </div>
            </div>

            <div className="p-6 flex-grow flex flex-col">
                <div className="flex items-start justify-between mb-3">
                    <h3 className="text-xl font-bold text-secondary group-hover:text-primary transition-colors">
                        {destination.name}
                    </h3>
                </div>




                <div className="flex items-center justify-between pt-6 border-t border-slate-50 mt-auto">
                    <button className="bg-slate-900 text-white p-3 rounded-2xl hover:bg-primary transition-all shadow-lg hover:shadow-emerald-200 group-hover:translate-y-[-4px]">
                        <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DestinationCard;
