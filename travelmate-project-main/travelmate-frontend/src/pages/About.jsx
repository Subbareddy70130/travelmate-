import React from 'react';
import { Shield, Globe, Award, Users } from 'lucide-react';

const About = () => {
    return (
        <div className="bg-white min-h-screen">
            {/* Hero Section */}
            <div className="bg-slate-900 py-32 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-full opacity-20">
                    <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary rounded-full blur-[120px]"></div>
                    <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-emerald-500 rounded-full blur-[120px]"></div>
                </div>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
                    <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-8 tracking-tight">
                        Our mission is to <br />
                        <span className="text-primary underline decoration-primary/30 underline-offset-8">inspire the world</span> to travel.
                    </h1>
                    <p className="text-slate-400 text-xl max-w-3xl mx-auto leading-relaxed">
                        TravelMate is built for explorers. We believe that travel makes the world a better place, and we're here to make your journey extraordinary.
                    </p>
                </div>
            </div>

            {/* Stats Section */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
                    <div className="text-center">
                        <h3 className="text-5xl font-extrabold text-secondary mb-2">10M+</h3>
                        <p className="text-slate-500 font-bold uppercase tracking-widest text-xs">Happy Travelers</p>
                    </div>
                    <div className="text-center">
                        <h3 className="text-5xl font-extrabold text-primary mb-2">150+</h3>
                        <p className="text-slate-500 font-bold uppercase tracking-widest text-xs">Countries Covered</p>
                    </div>
                    <div className="text-center">
                        <h3 className="text-5xl font-extrabold text-secondary mb-2">500+</h3>
                        <p className="text-slate-500 font-bold uppercase tracking-widest text-xs">Airlines Partners</p>
                    </div>
                    <div className="text-center">
                        <h3 className="text-5xl font-extrabold text-primary mb-2">24/7</h3>
                        <p className="text-slate-500 font-bold uppercase tracking-widest text-xs">Expert Support</p>
                    </div>
                </div>
            </div>

            {/* Why Choose Us */}
            <div className="bg-slate-50 py-32">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-20">
                        <h2 className="text-4xl font-extrabold text-secondary mb-4">Why Choose TravelMate?</h2>
                        <p className="text-slate-500 text-lg">We go the extra mile to ensure your peace of mind.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                        <div className="bg-white p-10 rounded-[3rem] shadow-sm border border-slate-100 flex items-start space-x-6">
                            <div className="bg-emerald-50 p-4 rounded-3xl shrink-0">
                                <Shield className="h-8 w-8 text-primary" />
                            </div>
                            <div>
                                <h4 className="text-xl font-bold text-secondary mb-2">Safe & Reliable</h4>
                                <p className="text-slate-500 leading-relaxed">Every booking on TravelMate is protected by our global security standards and verified partners.</p>
                            </div>
                        </div>
                        <div className="bg-white p-10 rounded-[3rem] shadow-sm border border-slate-100 flex items-start space-x-6">
                            <div className="bg-blue-50 p-4 rounded-3xl shrink-0">
                                <Globe className="h-8 w-8 text-blue-500" />
                            </div>
                            <div>
                                <h4 className="text-xl font-bold text-secondary mb-2">Global Reach</h4>
                                <p className="text-slate-500 leading-relaxed">Access to thousands of hotels, flights, and unique experiences across 7 continents at your fingertips.</p>
                            </div>
                        </div>
                        <div className="bg-white p-10 rounded-[3rem] shadow-sm border border-slate-100 flex items-start space-x-6">
                            <div className="bg-amber-50 p-4 rounded-3xl shrink-0">
                                <Award className="h-8 w-8 text-amber-500" />
                            </div>
                            <div>
                                <h4 className="text-xl font-bold text-secondary mb-2">Best Price Guarantee</h4>
                                <p className="text-slate-500 leading-relaxed">If you find a better price elsewhere, we'll match it. No questions asked. Travel smart, save more.</p>
                            </div>
                        </div>
                        <div className="bg-white p-10 rounded-[3rem] shadow-sm border border-slate-100 flex items-start space-x-6">
                            <div className="bg-purple-50 p-4 rounded-3xl shrink-0">
                                <Users className="h-8 w-8 text-purple-500" />
                            </div>
                            <div>
                                <h4 className="text-xl font-bold text-secondary mb-2">Expert Guides</h4>
                                <p className="text-slate-500 leading-relaxed">Our curated destination guides are written by locals who know the best hidden gems and secret spots.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default About;
