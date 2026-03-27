package com.travelmate.litam.controller;

import com.travelmate.litam.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/admin/stats")

public class AdminStatsController {

    @Autowired
    private DestinationRepository destinationRepository;

    @Autowired
    private HotelRepository hotelRepository;

    @Autowired
    private RestaurantRepository restaurantRepository;

    @Autowired
    private TripRepository tripRepository;

    @Autowired
    private FlightRepository flightRepository;

    @Autowired
    private TrainRepository trainRepository;

    @Autowired
    private BusRepository busRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private BookingRepository bookingRepository;

    @GetMapping
    public Map<String, Object> getStats() {
        Map<String, Object> stats = new HashMap<>();
        stats.put("totalDestinations", destinationRepository.count());
        stats.put("totalHotels", hotelRepository.count());
        stats.put("totalRestaurants", restaurantRepository.count());
        stats.put("totalTrips", tripRepository.count());
        stats.put("totalFlights", flightRepository.count());
        stats.put("totalTrains", trainRepository.count());
        stats.put("totalBuses", busRepository.count());
        stats.put("totalUsers", userRepository.count());
        stats.put("totalBookings", bookingRepository.count());

        // For charts, we could add more detailed data here, e.g., bookings by type
        // This is a simplified version to get started.
        return stats;
    }
}
