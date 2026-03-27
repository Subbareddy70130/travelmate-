package com.travelmate.litam.controller;

import com.travelmate.litam.entity.Itinerary;
import com.travelmate.litam.repository.ItineraryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/trips")
public class ItineraryController {

    @Autowired
    private ItineraryRepository itineraryRepository;

    @GetMapping("/{tripId}/itinerary")
    public List<Itinerary> getTripItinerary(@PathVariable Long tripId) {
        return itineraryRepository.findByTripIdOrderByDayNumberAscTimeOfDayAsc(tripId);
    }
}
