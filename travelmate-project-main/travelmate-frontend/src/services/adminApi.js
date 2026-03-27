import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api';

const adminApi = axios.create({
    baseURL: `${API_BASE_URL}/admin/`,
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true,
});

// Generic CRUD factory for admin resources
const createAdminResource = (resourcePath) => ({
    getAll: async () => {
        const response = await adminApi.get(resourcePath);
        return response.data;
    },
    getById: async (id) => {
        const response = await adminApi.get(`${resourcePath}/${id}`);
        return response.data;
    },
    create: async (data) => {
        const response = await adminApi.post(resourcePath, data);
        return response.data;
    },
    update: async (id, data) => {
        const response = await adminApi.put(`${resourcePath}/${id}`, data);
        return response.data;
    },
    remove: async (id) => {
        const response = await adminApi.delete(`${resourcePath}/${id}`);
        return response.data;
    },
});

export const adminDestinations = createAdminResource('destinations');
export const adminHotels = createAdminResource('hotels');
export const adminRestaurants = createAdminResource('restaurants');
export const adminTrips = createAdminResource('trips');
export const adminPlaces = createAdminResource('places');
export const adminFlights = createAdminResource('flights');
export const adminTrains = createAdminResource('trains');
export const adminBuses = createAdminResource('buses');
export const adminItineraries = createAdminResource('itineraries');
export const adminUsers = createAdminResource('users');

// Booking specific admin APIs
export const adminBookings = {
    ...createAdminResource('/bookings'),
    updateStatus: async (id, status) => {
        const response = await adminApi.put(`/bookings/${id}/status?status=${status}`);
        return response.data;
    },
};

// Dashboard Stats
export const getAdminStats = async () => {
    const response = await adminApi.get('/stats');
    return response.data;
};

// Media/Upload
export const uploadImage = async (formData) => {
    const response = await adminApi.post('/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
    });
    return response.data;
};

export default {
    adminDestinations,
    adminHotels,
    adminRestaurants,
    adminTrips,
    adminPlaces,
    adminFlights,
    adminTrains,
    adminBuses,
    adminItineraries,
    adminUsers,
    adminBookings,
    getAdminStats,
    uploadImage,
};
