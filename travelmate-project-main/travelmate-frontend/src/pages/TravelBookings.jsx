import React, { useState, useEffect } from 'react';
import BookingModal from '../components/BookingModal';
import { getFlights, searchFlights, getTrains, getBuses } from '../services/api';
import { Plane, Train, BusFront, Loader2, Clock, ArrowRight, MapPin, ArrowUpDown, Calendar, Users, Search } from 'lucide-react';

/* ────── City Autocomplete Input ────── */
const CityInput = ({ value, onChange, placeholder, icon: Icon, cities }) => {
    const [open, setOpen] = useState(false);
    const ref = React.useRef(null);

    const filtered = cities.filter(c =>
        c.toLowerCase().includes(value.toLowerCase()) && c.toLowerCase() !== value.toLowerCase()
    );

    // Close on outside click
    useEffect(() => {
        const handler = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
        document.addEventListener('mousedown', handler);
        return () => document.removeEventListener('mousedown', handler);
    }, []);

    return (
        <div ref={ref} className="relative flex-1">
            <div className="flex items-center gap-3 border border-slate-200 rounded-2xl px-4 py-3 focus-within:border-blue-400 transition-colors bg-slate-50">
                <Icon className="h-5 w-5 text-slate-400 shrink-0" />
                <input
                    value={value}
                    onChange={e => { onChange(e.target.value); setOpen(true); }}
                    onFocus={() => setOpen(true)}
                    placeholder={placeholder}
                    autoComplete="off"
                    className="flex-1 bg-transparent outline-none text-slate-700 font-bold placeholder-slate-400 text-lg"
                />
            </div>
            {open && filtered.length > 0 && (
                <div className="absolute left-0 right-0 top-full mt-1 bg-white border border-slate-100 rounded-2xl shadow-2xl z-50 overflow-hidden">
                    {filtered.map(city => (
                        <button
                            key={city}
                            type="button"
                            onMouseDown={e => e.preventDefault()}
                            onClick={() => { onChange(city); setOpen(false); }}
                            className="w-full text-left px-5 py-3 flex items-center gap-3 hover:bg-sky-50 transition-colors font-bold text-slate-700 border-b border-slate-50 last:border-0"
                        >
                            <MapPin className="h-4 w-4 text-sky-400 shrink-0" />
                            {city}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
};

/* ────── Flight Search Box ────── */
const FlightSearchBox = ({ onSearch, cities = [] }) => {
    const today = new Date().toISOString().split('T')[0];
    const [from, setFrom] = useState('');
    const [to, setTo] = useState('');
    const [date, setDate] = useState(today);
    const [returnDate, setReturnDate] = useState('');
    const [showReturn, setShowReturn] = useState(false);
    const [travellers, setTravellers] = useState('1 Traveller, Economy');

    const swap = () => { const t = from; setFrom(to); setTo(t); };
    const handleSearch = () => onSearch(from, to);

    return (
        <div className="bg-white rounded-[2rem] shadow-2xl p-6 md:p-8 w-full max-w-3xl mx-auto mt-8">
            {/* From / To with swap */}
            <div className="relative flex flex-col gap-3">
                <CityInput value={from} onChange={setFrom} placeholder="From" icon={Plane} cities={cities} />
                {/* Swap button */}
                <button
                    onClick={swap}
                    className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-blue-500 hover:bg-blue-600 text-white rounded-full w-9 h-9 flex items-center justify-center shadow-lg transition-all"
                >
                    <ArrowUpDown className="h-4 w-4" />
                </button>
                <CityInput value={to} onChange={setTo} placeholder="To" icon={Plane} cities={cities} />
            </div>

            {/* Dates */}
            <div className="grid grid-cols-2 gap-3 mt-4">
                <div className="border border-blue-300 rounded-2xl px-4 py-3 relative">
                    <p className="text-[10px] font-black text-blue-500 uppercase tracking-widest mb-1">Depart Date</p>
                    <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-slate-400" />
                        <input type="date" value={date} min={today} onChange={e => setDate(e.target.value)}
                            className="bg-transparent outline-none text-slate-700 font-bold text-sm w-full" />
                    </div>
                </div>
                {showReturn ? (
                    <div className="border border-blue-300 rounded-2xl px-4 py-3">
                        <p className="text-[10px] font-black text-blue-500 uppercase tracking-widest mb-1">Return Date</p>
                        <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4 text-slate-400" />
                            <input type="date" value={returnDate} min={date} onChange={e => setReturnDate(e.target.value)}
                                className="bg-transparent outline-none text-slate-700 font-bold text-sm w-full" />
                        </div>
                    </div>
                ) : (
                    <button onClick={() => setShowReturn(true)}
                        className="border-2 border-dashed border-slate-200 rounded-2xl px-4 py-3 flex items-center gap-2 text-blue-500 font-bold text-sm hover:border-blue-300 transition-colors">
                        <Calendar className="h-4 w-4" /> Add Return Date
                    </button>
                )}
            </div>

            {/* Travellers + Search */}
            <div className="grid grid-cols-2 gap-3 mt-4">
                <div className="border border-blue-300 rounded-2xl px-4 py-3">
                    <p className="text-[10px] font-black text-blue-500 uppercase tracking-widest mb-1">Travellers & Cabin</p>
                    <div className="flex items-center gap-2">
                        <Users className="h-4 w-4 text-slate-400" />
                        <select value={travellers} onChange={e => setTravellers(e.target.value)}
                            className="bg-transparent outline-none text-slate-700 font-bold text-sm w-full">
                            <option>1 Traveller, Economy</option>
                            <option>1 Traveller, Business</option>
                            <option>2 Travellers, Economy</option>
                            <option>2 Travellers, Business</option>
                            <option>3 Travellers, Economy</option>
                            <option>4 Travellers, Economy</option>
                        </select>
                    </div>
                </div>
                <button onClick={handleSearch}
                    className="bg-gradient-to-r from-orange-400 to-orange-500 hover:from-orange-500 hover:to-orange-600 text-white rounded-2xl font-black text-lg flex items-center justify-center gap-2 shadow-lg shadow-orange-100 transition-all">
                    <Search className="h-5 w-5" /> Search
                </button>
            </div>
        </div>
    );
};

/* ────── Flight Card ────── */
const FlightCard = ({ item, onBook }) => (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
        <div className="flex items-start justify-between mb-5">
            <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-sky-50 rounded-xl flex items-center justify-center border border-sky-100">
                    <Plane className="h-6 w-6 text-sky-500" />
                </div>
                <div>
                    <p className="font-black text-slate-800 text-base">{item.airline}</p>
                    <p className="text-xs text-slate-400 font-bold tracking-widest">{item.flightNumber || `FL-${String(item.id).padStart(4, '0')}`}</p>
                </div>
            </div>
            <div className="text-right">
                <p className="text-2xl font-black text-sky-600">₹{Number(item.price || 4999).toLocaleString('en-IN')}</p>
                <p className="text-xs text-slate-400 font-bold">per person</p>
            </div>
        </div>

        {/* Route row */}
        <div className="flex items-center gap-3 mb-5">
            <div>
                <p className="font-black text-slate-800 text-xl">{item.departureCity}</p>
                <p className="text-sm text-slate-400 font-bold">
                    {item.departureTime ? new Date(item.departureTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '—'}
                </p>
            </div>
            <div className="flex-1 flex flex-col items-center gap-1">
                <div className="flex items-center gap-2 w-full">
                    <div className="h-px flex-1 bg-slate-200" />
                    <Plane className="h-4 w-4 text-sky-400" />
                    <div className="h-px flex-1 bg-slate-200" />
                </div>
                <p className="text-xs text-slate-400 font-bold">{item.duration || '—'}</p>
            </div>
            <div className="text-right">
                <p className="font-black text-slate-800 text-xl">{item.arrivalCity}</p>
                <p className="text-sm text-slate-400 font-bold">
                    {item.arrivalTime ? new Date(item.arrivalTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '—'}
                </p>
            </div>
        </div>

        {item.cabinClass && (
            <div className="mb-4">
                <span className="bg-sky-50 text-sky-600 text-xs font-black px-3 py-1 rounded-full tracking-widest border border-sky-100">{item.cabinClass}</span>
            </div>
        )}

        <button onClick={() => onBook(item)}
            className="w-full py-3 bg-sky-500 text-white rounded-xl font-black hover:bg-sky-600 transition-all flex items-center justify-center gap-2 shadow-md shadow-sky-100">
            Book Flight <ArrowRight className="h-4 w-4" />
        </button>
    </div>
);

/* ────── Train Card ────── */
const TrainCard = ({ item, onBook }) => (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
        <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-orange-50 rounded-xl flex items-center justify-center border border-orange-100">
                    <Train className="h-6 w-6 text-orange-500" />
                </div>
                <div>
                    <p className="font-black text-slate-800">{item.trainName}</p>
                    <p className="text-xs text-slate-400 font-bold tracking-widest">TR-{String(item.id).padStart(4, '0')}</p>
                </div>
            </div>
            <div className="text-right">
                <p className="text-2xl font-black text-orange-600">₹{Number(item.price || 1200).toLocaleString('en-IN')}</p>
                <p className="text-xs text-slate-400 font-bold">per person</p>
            </div>
        </div>
        <div className="flex items-center gap-3 mb-5">
            <div>
                <p className="font-black text-slate-800 text-lg">{item.departureStation}</p>
            </div>
            <div className="flex-1 flex flex-col items-center gap-1">
                <div className="flex items-center gap-2 w-full">
                    <div className="h-px flex-1 bg-slate-200" />
                    <Clock className="h-4 w-4 text-orange-400" />
                    <div className="h-px flex-1 bg-slate-200" />
                </div>
                <p className="text-xs text-slate-400 font-bold">{item.travelTime || '—'}</p>
            </div>
            <div className="text-right">
                <p className="font-black text-slate-800 text-lg">{item.arrivalStation}</p>
            </div>
        </div>
        <button onClick={() => onBook(item)}
            className="w-full py-3 bg-orange-500 text-white rounded-xl font-black hover:bg-orange-600 transition-all flex items-center justify-center gap-2 shadow-md shadow-orange-100">
            Book Train <ArrowRight className="h-4 w-4" />
        </button>
    </div>
);

/* ────── Bus Card ────── */
const BusCard = ({ item, onBook }) => (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
        <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-teal-50 rounded-xl flex items-center justify-center border border-teal-100">
                    <BusFront className="h-6 w-6 text-teal-500" />
                </div>
                <div>
                    <p className="font-black text-slate-800">{item.company}</p>
                    <p className="text-xs text-slate-400 font-bold tracking-widest">BS-{String(item.id).padStart(4, '0')}</p>
                </div>
            </div>
            <div className="text-right">
                <p className="text-2xl font-black text-teal-600">₹{Number(item.price || 800).toLocaleString('en-IN')}</p>
                <p className="text-xs text-slate-400 font-bold">per person</p>
            </div>
        </div>
        <div className="flex items-center gap-3 mb-5">
            <div>
                <MapPin className="h-4 w-4 text-teal-400 mb-1" />
                <p className="font-black text-slate-800 text-sm">{item.departure}</p>
            </div>
            <div className="flex-1 flex flex-col items-center gap-1">
                <div className="flex items-center gap-2 w-full">
                    <div className="h-px flex-1 bg-slate-200" />
                    <Clock className="h-4 w-4 text-teal-400" />
                    <div className="h-px flex-1 bg-slate-200" />
                </div>
                <p className="text-xs text-slate-400 font-bold">{item.duration || '—'}</p>
            </div>
            <div className="text-right">
                <MapPin className="h-4 w-4 text-teal-400 mb-1 ml-auto" />
                <p className="font-black text-slate-800 text-sm">{item.arrival}</p>
            </div>
        </div>
        <button onClick={() => onBook(item)}
            className="w-full py-3 bg-teal-500 text-white rounded-xl font-black hover:bg-teal-600 transition-all flex items-center justify-center gap-2 shadow-md shadow-teal-100">
            Book Bus <ArrowRight className="h-4 w-4" />
        </button>
    </div>
);

/* ────── Main Page ────── */
const TravelBookings = () => {
    const [activeTab, setActiveTab] = useState('flights');
    const [data, setData] = useState({ flights: [], trains: [], buses: [] });
    const [displayedFlights, setDisplayedFlights] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searching, setSearching] = useState(false);
    const [error, setError] = useState(null);
    const [selectedItem, setSelectedItem] = useState(null);
    const [searched, setSearched] = useState(false);

    useEffect(() => {
        Promise.all([getFlights(), getTrains(), getBuses()])
            .then(([flights, trains, buses]) => {
                setData({ flights, trains, buses });
                setDisplayedFlights(flights);
            })
            .catch(err => setError(err.message || 'Failed to load travel options.'))
            .finally(() => setLoading(false));
    }, []);

    const handleFlightSearch = async (from, to) => {
        setSearching(true); setSearched(true);
        try {
            const results = await searchFlights(from, to);
            setDisplayedFlights(results);
        } catch { setDisplayedFlights([]); }
        finally { setSearching(false); }
    };

    const tabs = [
        { id: 'flights', label: 'Flights', icon: Plane, color: 'text-sky-500' },
        { id: 'trains', label: 'Trains', icon: Train, color: 'text-orange-500' },
        { id: 'buses', label: 'Buses', icon: BusFront, color: 'text-teal-500' },
    ];

    const typeMap = { flights: 'FLIGHT', trains: 'TRAIN', buses: 'BUS' };

    // Unique cities extracted from flights data for autocomplete
    const flightCities = [...new Set([
        ...data.flights.map(f => f.departureCity),
        ...data.flights.map(f => f.arrivalCity),
    ].filter(Boolean))].sort();

    return (
        <div className="bg-slate-50 min-h-screen">
            {/* Hero */}
            <div className="bg-secondary py-20 relative overflow-hidden text-center">
                <div className="absolute inset-0">
                    <img src="https://images.unsplash.com/photo-1436491865332-7a61a109c0f2?w=1600&auto=format&fit=crop" alt="" className="w-full h-full object-cover opacity-10" />
                </div>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <h1 className="text-5xl font-black text-white mb-4">Travel Bookings</h1>
                    <p className="text-slate-400 text-xl max-w-2xl mx-auto">Book your next ride across the sky, tracks, or roads with ease.</p>

                    {/* Tab Switcher */}
                    <div className="flex justify-center mt-10">
                        <div className="bg-white/10 backdrop-blur-md p-2 rounded-[2rem] flex space-x-2">
                            {tabs.map(tab => (
                                <button key={tab.id} onClick={() => setActiveTab(tab.id)}
                                    className={`flex items-center space-x-3 px-8 py-3 rounded-[1.5rem] font-bold transition-all ${activeTab === tab.id ? 'bg-white text-secondary shadow-lg scale-105' : 'text-slate-300 hover:text-white hover:bg-white/5'}`}>
                                    <tab.icon className={`h-5 w-5 ${activeTab === tab.id ? tab.color : ''}`} />
                                    <span>{tab.label}</span>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Flight Search Box (only for flights tab) */}
                    {activeTab === 'flights' && (
                        <FlightSearchBox onSearch={handleFlightSearch} cities={flightCities} />
                    )}
                </div>
            </div>

            {/* Results */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                {loading ? (
                    <div className="flex flex-col items-center justify-center py-20">
                        <Loader2 className="h-12 w-12 text-primary animate-spin mb-4" />
                        <p className="text-slate-500 font-bold">Checking availability...</p>
                    </div>
                ) : error ? (
                    <div className="text-center py-20 bg-red-50 rounded-2xl border border-red-100">
                        <p className="text-red-500 font-bold mb-4">{error}</p>
                        <button onClick={() => window.location.reload()} className="bg-primary text-white px-8 py-3 rounded-xl font-bold hover:bg-emerald-600">Retry</button>
                    </div>
                ) : activeTab === 'flights' ? (
                    <>
                        {(searched || displayedFlights.length > 0) && (
                            <div className="mb-6 flex items-center justify-between">
                                <h2 className="text-2xl font-black text-slate-800">
                                    {searching ? 'Searching...' : `${displayedFlights.length} Flight${displayedFlights.length !== 1 ? 's' : ''} Found`}
                                </h2>
                                {searched && (
                                    <button onClick={() => { setDisplayedFlights(data.flights); setSearched(false); }}
                                        className="text-sm text-sky-500 font-bold hover:underline">
                                        Clear Search
                                    </button>
                                )}
                            </div>
                        )}
                        {searching ? (
                            <div className="flex flex-col items-center py-20">
                                <Loader2 className="h-10 w-10 text-sky-500 animate-spin mb-4" />
                                <p className="text-slate-500 font-bold">Searching flights...</p>
                            </div>
                        ) : displayedFlights.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {displayedFlights.map(f => <FlightCard key={f.id} item={f} onBook={setSelectedItem} />)}
                            </div>
                        ) : (
                            <div className="text-center py-20 bg-white rounded-2xl border border-slate-100">
                                <Plane className="h-12 w-12 text-slate-200 mx-auto mb-4" />
                                <p className="text-slate-400 font-bold">No flights found for that route.</p>
                                <p className="text-slate-400 text-sm mt-1">Try different cities or clear the search.</p>
                            </div>
                        )}
                    </>
                ) : activeTab === 'trains' ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {data.trains.length > 0 ? data.trains.map(t => <TrainCard key={t.id} item={t} onBook={setSelectedItem} />) : (
                            <div className="col-span-3 text-center py-20 bg-white rounded-2xl border border-slate-100">
                                <p className="text-slate-400 font-bold">No trains available. Add some from the admin panel!</p>
                            </div>
                        )}
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {data.buses.length > 0 ? data.buses.map(b => <BusCard key={b.id} item={b} onBook={setSelectedItem} />) : (
                            <div className="col-span-3 text-center py-20 bg-white rounded-2xl border border-slate-100">
                                <p className="text-slate-400 font-bold">No buses available. Add some from the admin panel!</p>
                            </div>
                        )}
                    </div>
                )}
            </div>

            {selectedItem && (
                <BookingModal
                    type={typeMap[activeTab]}
                    item={activeTab === 'trains' ? { ...selectedItem, name: selectedItem.trainName } : selectedItem}
                    pricePerUnit={selectedItem.price || (activeTab === 'flights' ? 4999 : activeTab === 'trains' ? 1200 : 800)}
                    onClose={() => setSelectedItem(null)}
                />
            )}
        </div>
    );
};

export default TravelBookings;
