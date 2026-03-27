package com.travelmate.litam.controller;

import com.travelmate.litam.entity.Trip;

import com.travelmate.litam.service.TripService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/trips")

public class TripController {

    @Autowired
    private TripService tripService;

    @GetMapping
    public List<Trip> getAllTrips() {
        return tripService.getAllTrips();
    }

    @GetMapping("/{destinationId}")
    public List<Trip> getTripsByDestination(@PathVariable Long destinationId) {
        return tripService.getTripsByDestination(destinationId);
    }

    @GetMapping("/details/{tripId}")
    public ResponseEntity<Trip> getTripDetails(@PathVariable Long tripId) {
        return tripService.getTripById(tripId)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
}
