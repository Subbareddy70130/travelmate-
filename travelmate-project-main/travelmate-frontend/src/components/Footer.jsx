import React from 'react';
import { Plane, Facebook, Twitter, Instagram, Linkedin, Mail } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-secondary text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Logo and Description */}
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center space-x-2 mb-6">
              <Plane className="h-8 w-8 text-primary" />
              <span className="text-2xl font-bold tracking-tight">TravelMate</span>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed">
              Your ultimate travel companion. Book flights, hotels, and discover amazing destinations around the world.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-bold mb-6">Explore</h4>
            <ul className="space-y-4 text-slate-400 text-sm">
              <li><a href="/" className="hover:text-primary transition-colors">Home</a></li>
              <li><a href="/flights" className="hover:text-primary transition-colors">Flights</a></li>
              <li><a href="/hotels" className="hover:text-primary transition-colors">Hotels</a></li>
              <li><a href="/restaurants" className="hover:text-primary transition-colors">Restaurants</a></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-lg font-bold mb-6">Support</h4>
            <ul className="space-y-4 text-slate-400 text-sm">
              <li><a href="/about" className="hover:text-primary transition-colors">About Us</a></li>
              <li><a href="/contact" className="hover:text-primary transition-colors">Contact Us</a></li>
              <li><a href="/privacy" className="hover:text-primary transition-colors">Privacy Policy</a></li>
              <li><a href="/terms" className="hover:text-primary transition-colors">Terms of Service</a></li>
            </ul>
          </div>

          {/* Contact & Social */}
          <div>
            <h4 className="text-lg font-bold mb-6">Connect</h4>
            <div className="flex space-x-4 mb-6">
              <a href="#" className="p-2 bg-slate-800 rounded-full hover:bg-primary transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="p-2 bg-slate-800 rounded-full hover:bg-primary transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="p-2 bg-slate-800 rounded-full hover:bg-primary transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
            </div>
            <p className="text-slate-400 text-sm flex items-center space-x-2">
              <Mail className="h-4 w-4" />
              <span>support@travelmate.com</span>
            </p>
          </div>
        </div>
        
        <div className="border-t border-slate-800 pt-8 text-center text-slate-500 text-xs">
          <p>© {new Date().getFullYear()} TravelMate. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
