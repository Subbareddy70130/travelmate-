import React, { useState } from 'react';
import { Mail, Phone, MapPin, CheckCircle } from 'lucide-react';

const Contact = () => {
    const [submitted, setSubmitted] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        setSubmitted(true);
        setTimeout(() => setSubmitted(false), 5000);
        setFormData({ name: '', email: '', subject: '', message: '' });
    };

    return (
        <div className="bg-white min-h-screen">
            {/* Hero Section */}
            <div className="bg-secondary py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-6">Contact Us</h1>
                    <p className="text-slate-400 text-lg max-w-2xl mx-auto">
                        Have questions? We're here to help. Reach out to our team and we'll get back to you as soon as possible.
                    </p>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-20">
                    {/* Contact Information */}
                    <div>
                        <h2 className="text-3xl font-bold text-secondary mb-8">Get In Touch</h2>
                        <p className="text-slate-600 mb-12 text-lg">
                            Whether you're looking for support with a booking or want to partner with us, we've got you covered.
                        </p>

                        <div className="space-y-8">
                            <div className="flex items-start space-x-6">
                                <div className="bg-emerald-50 p-4 rounded-2xl">
                                    <Mail className="h-6 w-6 text-primary" />
                                </div>
                                <div>
                                    <h4 className="font-bold text-secondary text-lg">Email Us</h4>
                                    <p className="text-slate-500">support@travelmate.com</p>
                                </div>
                            </div>
                            <div className="flex items-start space-x-6">
                                <div className="bg-emerald-50 p-4 rounded-2xl">
                                    <Phone className="h-6 w-6 text-primary" />
                                </div>
                                <div>
                                    <h4 className="font-bold text-secondary text-lg">Call Us</h4>
                                    <p className="text-slate-500">+91 800 TRAVEL MATE</p>
                                </div>
                            </div>
                            <div className="flex items-start space-x-6">
                                <div className="bg-emerald-50 p-4 rounded-2xl">
                                    <MapPin className="h-6 w-6 text-primary" />
                                </div>
                                <div>
                                    <h4 className="font-bold text-secondary text-lg">Our Office</h4>
                                    <p className="text-slate-500">123 Travel Avenue, Sector 45, Gurgaon, HR 122003</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div className="bg-slate-50 p-10 rounded-[3rem] border border-slate-100">
                        {submitted ? (
                            <div className="h-full flex flex-col items-center justify-center text-center py-12 animate-in zoom-in duration-500">
                                <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mb-6">
                                    <CheckCircle className="h-10 w-10 text-primary" />
                                </div>
                                <h3 className="text-2xl font-black text-secondary mb-4">Message Sent!</h3>
                                <p className="text-slate-500 font-medium">Thank you for reaching out. Our team will get back to you within 24 hours.</p>
                                <button
                                    onClick={() => setSubmitted(false)}
                                    className="mt-8 text-primary font-bold hover:underline"
                                >
                                    Send another message
                                </button>
                            </div>
                        ) : (
                            <>
                                <h3 className="text-2xl font-bold text-secondary mb-8">Send a Message</h3>
                                <form className="space-y-6" onSubmit={handleSubmit}>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="flex flex-col space-y-2">
                                            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Full Name</label>
                                            <input
                                                type="text"
                                                value={formData.name}
                                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                                className="p-4 rounded-2xl border border-slate-200 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                                                placeholder="John Doe"
                                                required
                                            />
                                        </div>
                                        <div className="flex flex-col space-y-2">
                                            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Email Address</label>
                                            <input
                                                type="email"
                                                value={formData.email}
                                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                                className="p-4 rounded-2xl border border-slate-200 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                                                placeholder="john@example.com"
                                                required
                                            />
                                        </div>
                                    </div>
                                    <div className="flex flex-col space-y-2">
                                        <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Subject</label>
                                        <input
                                            type="text"
                                            value={formData.subject}
                                            onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                                            className="p-4 rounded-2xl border border-slate-200 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                                            placeholder="How can we help?"
                                            required
                                        />
                                    </div>
                                    <div className="flex flex-col space-y-2">
                                        <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Message</label>
                                        <textarea
                                            rows="4"
                                            value={formData.message}
                                            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                            className="p-4 rounded-2xl border border-slate-200 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                                            placeholder="Your message here..."
                                            required
                                        ></textarea>
                                    </div>
                                    <button type="submit" className="w-full bg-primary hover:bg-emerald-600 text-white font-bold py-4 rounded-2xl transition-all shadow-xl shadow-emerald-100">
                                        Send Message
                                    </button>
                                </form>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Contact;
