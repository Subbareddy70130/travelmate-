import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Calendar, MapPin, IndianRupee, Moon } from 'lucide-react';
import { getDestinations } from '../services/api';

const SearchBar = () => {
  const navigate = useNavigate();
  const [destList, setDestList] = useState([]);
  const [activeTab, setActiveTab] = useState('Flights');
  const [budget, setBudget] = useState(50000);
  const [destinationId, setDestinationId] = useState('');
  const getLocalDate = (offset = 0) => {
    const date = new Date();
    date.setDate(date.getDate() + offset);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const [checkIn, setCheckIn] = useState(getLocalDate(0));
  const [checkOut, setCheckOut] = useState(getLocalDate(1));
  const [nights, setNights] = useState(1);


  useEffect(() => {
    const fetchDests = async () => {
      try {
        const data = await getDestinations();
        setDestList(data);
      } catch (err) {
        console.error('Error fetching destinations for searchbar:', err);
      }
    };
    fetchDests();
  }, []);

  useEffect(() => {
    const start = new Date(checkIn);
    const end = new Date(checkOut);
    const diffTime = Math.abs(end - start);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    setNights(diffDays > 0 ? diffDays : 0);
  }, [checkIn, checkOut]);

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
  };

  const handleSearch = () => {
    if (destinationId) {
      navigate(`/destination/${destinationId}`);
    } else {
      navigate(`/search-results?dates=${checkIn}to${checkOut}&budget=${budget}&type=${activeTab}`);
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto bg-white rounded-[2.5rem] shadow-2xl p-8 md:p-10 -mt-20 relative z-20 border border-slate-100">


      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-end">
        {/* Destination */}
        <div className="md:col-span-9 flex flex-col space-y-3">
          <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1">Destination</label>
          <div className="relative group">
            <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-primary z-10 group-focus-within:scale-110 transition-transform" />
            <select
              value={destinationId}
              onChange={(e) => setDestinationId(e.target.value)}
              className="w-full pl-12 pr-6 py-4 bg-slate-50 border-2 border-transparent rounded-2xl focus:bg-white focus:border-primary/20 focus:ring-4 focus:ring-primary/5 transition-all outline-none text-secondary font-bold appearance-none cursor-pointer"
            >
              <option value="">Where are you going?</option>
              {destList.map((dest) => (
                <option key={dest.id} value={dest.id}>{dest.name}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Search Button */}
        <div className="md:col-span-3">
          <button
            onClick={handleSearch}
            className="w-full bg-primary hover:bg-emerald-600 text-white font-black py-5 px-8 rounded-2xl transition-all shadow-xl shadow-emerald-100 flex items-center justify-center space-x-3 group relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
            <Search className="h-6 w-6 relative z-10" />
            <span className="relative z-10 uppercase tracking-widest text-sm">Search</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
