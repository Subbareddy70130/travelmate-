import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api';

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true,
});

// Auth APIs
export const signupUser = async (data) => {
    const response = await api.post('/auth/signup', data);
    return response.data;
};

export const loginUser = async (data) => {
    const response = await api.post('/auth/login', data);
    return response.data;
};

// Destination APIs
export const getDestinations = async () => {
    const response = await api.get('/destinations');
    return response.data;
};

export const getDestinationDetails = async (id) => {
    const response = await api.get(`/destinations/${id}`);
    return response.data;
};

export const searchDestinations = async (city) => {
    const response = await api.get(`/destinations/search?city=${city}`);
    return response.data;
};

// Search (Comprehensive)
export const searchAll = async (city) => {
    const response = await api.get(`/search?city=${city}`);
    return response.data;
};

// Place APIs
export const getPlacesByDestination = async (destinationId) => {
    const response = await api.get(`/places/${destinationId}`);
    return response.data;
};

// Hotel APIs
export const getAllHotels = async () => {
    const response = await api.get('/hotels');
    return response.data;
};

export const getHotelsByDestination = async (destinationId) => {
    const response = await api.get(`/hotels/${destinationId}`);
    return response.data;
};

// Restaurant APIs
export const getAllRestaurants = async () => {
    const response = await api.get('/restaurants');
    return response.data;
};

export const getRestaurantsByDestination = async (destinationId) => {
    const response = await api.get(`/restaurants/${destinationId}`);
    return response.data;
};

// Transport APIs
export const getFlights = async () => {
    const response = await api.get('/flights');
    return response.data;
};

export const searchFlights = async (from, to) => {
    const params = new URLSearchParams();
    if (from) params.append('from', from);
    if (to) params.append('to', to);
    const response = await api.get(`/flights/search?${params.toString()}`);
    return response.data;
};

export const getTrains = async () => {
    const response = await api.get('/trains');
    return response.data;
};

export const getBuses = async () => {
    const response = await api.get('/buses');
    return response.data;
};

// Trip APIs
export const getAllTrips = async () => {
    const response = await api.get('/trips');
    return response.data;
};

export const getTripsByDestination = async (destinationId) => {
    const response = await api.get(`/trips/${destinationId}`);
    return response.data;
};

export const getTripDetails = async (tripId) => {
    const response = await api.get(`/trips/details/${tripId}`);
    return response.data;
};

export const getTripItinerary = async (tripId) => {
    const response = await api.get(`/trips/${tripId}/itinerary`);
    return response.data;
};

// Booking APIs
export const getUserBookings = async (userId) => {
    const response = await api.get(`/bookings/user/${userId}`);
    return response.data;
};

export const createBooking = async (bookingData) => {
    const response = await api.post('/bookings', bookingData);
    return response.data;
};

export default {
    signupUser,
    loginUser,
    getDestinations,
    getDestinationDetails,
    searchDestinations,
    searchAll,
    getPlacesByDestination,
    getAllHotels,
    getHotelsByDestination,
    getAllRestaurants,
    getRestaurantsByDestination,
    getFlights,
    getTrains,
    getBuses,
    getAllTrips,
    getTripsByDestination,
    getTripDetails,
    getTripItinerary,
    getUserBookings,
    createBooking,
};
