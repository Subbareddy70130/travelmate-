package com.travelmate.litam.service;

import com.travelmate.litam.entity.Trip;
import com.travelmate.litam.entity.TripItinerary;
import com.travelmate.litam.repository.TripItineraryRepository;
import com.travelmate.litam.repository.TripRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class TripService {

    @Autowired
    private TripRepository tripRepository;

    @Autowired
    private TripItineraryRepository tripItineraryRepository;

    public List<Trip> getAllTrips() {
        return tripRepository.findAll();
    }

    public List<Trip> getTripsByDestination(Long destinationId) {
        return tripRepository.findByDestinationId(destinationId);
    }

    public Optional<Trip> getTripById(Long id) {
        return tripRepository.findById(id);
    }

    public List<TripItinerary> getItineraryByTripId(Long tripId) {
        return tripItineraryRepository.findByTripIdOrderByDayNumberAsc(tripId);
    }
}
