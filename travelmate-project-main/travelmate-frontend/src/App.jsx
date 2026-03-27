import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Discover from './pages/Discover';
import TravelBookings from './pages/TravelBookings';
import Hotels from './pages/Hotels';
import Restaurants from './pages/Restaurants';
import Trips from './pages/Trips';
import About from './pages/About';
import Contact from './pages/Contact';
import Login from './pages/Login';
import Signup from './pages/Signup';
import DestinationDetails from './pages/DestinationDetails';
import DestinationResults from './pages/DestinationResults';
import TripDetails from './pages/TripDetails';
import MyBookings from './pages/MyBookings';
import PaymentPage from './pages/PaymentPage';
import BookingSuccess from './pages/BookingSuccess';

// Admin Pages
import AdminDashboard from './pages/AdminDashboard';
import AdminBookings from './pages/AdminBookings';
import AdminMedia from './pages/AdminMedia';
import AdminDestinations from './pages/AdminDestinations';
import AdminHotels from './pages/AdminHotels';
import AdminRestaurants from './pages/AdminRestaurants';
import AdminFlights from './pages/AdminFlights';
import AdminTrains from './pages/AdminTrains';
import AdminBuses from './pages/AdminBuses';
import AdminTrips from './pages/AdminTrips';
import AdminPlaces from './pages/AdminPlaces';
import AdminItineraries from './pages/AdminItineraries';
import AdminUsers from './pages/AdminUsers';

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/discover" element={<Discover />} />
            <Route path="/destination/:id" element={<DestinationDetails />} />
            <Route path="/search-results" element={<DestinationResults />} />
            <Route path="/trip/:id" element={<TripDetails />} />
            <Route path="/travel-bookings" element={<TravelBookings />} />
            <Route path="/flights" element={<TravelBookings />} />
            <Route path="/trains" element={<TravelBookings />} />
            <Route path="/buses" element={<TravelBookings />} />
            <Route path="/hotels" element={<Hotels />} />
            <Route path="/restaurants" element={<Restaurants />} />
            <Route path="/trips" element={<Trips />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/my-bookings" element={<MyBookings />} />
            <Route path="/payment" element={<PaymentPage />} />
            <Route path="/booking-success" element={<BookingSuccess />} />

            {/* Admin Routes */}
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/admin/bookings" element={<AdminBookings />} />
            <Route path="/admin/media" element={<AdminMedia />} />
            <Route path="/admin/destinations" element={<AdminDestinations />} />
            <Route path="/admin/hotels" element={<AdminHotels />} />
            <Route path="/admin/restaurants" element={<AdminRestaurants />} />
            <Route path="/admin/flights" element={<AdminFlights />} />
            <Route path="/admin/trains" element={<AdminTrains />} />
            <Route path="/admin/buses" element={<AdminBuses />} />
            <Route path="/admin/trips" element={<AdminTrips />} />
            <Route path="/admin/places" element={<AdminPlaces />} />
            <Route path="/admin/itineraries" element={<AdminItineraries />} />
            <Route path="/admin/users" element={<AdminUsers />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
