import React from 'react';
import { Star, Quote } from 'lucide-react';

const ReviewCard = ({ review }) => {
    return (
        <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden group hover:shadow-xl transition-all duration-300 flex flex-col">
            <div className="h-40 overflow-hidden relative">
                <img
                    src={review.image}
                    alt={review.destination}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md p-2 rounded-full shadow-lg">
                    <Quote className="h-4 w-4 text-primary" />
                </div>
            </div>

            <div className="p-8 pb-6 flex-grow">
                <div className="flex items-center space-x-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                        <Star
                            key={i}
                            className={`h-4 w-4 ${i < review.rating ? 'text-amber-500 fill-amber-500' : 'text-slate-200'
                                }`}
                        />
                    ))}
                </div>

                <p className="text-slate-600 italic mb-6 leading-relaxed font-medium">
                    "{review.comment}"
                </p>

                <div className="flex items-center justify-between border-t border-slate-50 pt-6">
                    <div>
                        <h4 className="font-bold text-secondary text-base">{review.username}</h4>
                        <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider mt-1">
                            Reviewed: <span className="text-primary">{review.destination}</span>
                        </p>
                    </div>
                    <div className="h-10 w-10 bg-slate-50 flex items-center justify-center rounded-full text-primary font-bold border border-slate-100">
                        {review.username[0]}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ReviewCard;
