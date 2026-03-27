package com.travelmate.litam.controller;

import com.travelmate.litam.entity.Itinerary;
import com.travelmate.litam.repository.ItineraryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin/itineraries")
public class AdminItineraryController {

    @Autowired
    private ItineraryRepository itineraryRepository;

    @GetMapping
    public List<Itinerary> getAll() {
        return itineraryRepository.findAll();
    }

    @GetMapping("/trip/{tripId}")
    public List<Itinerary> getByTrip(@PathVariable Long tripId) {
        return itineraryRepository.findByTripIdOrderByDayNumberAscTimeOfDayAsc(tripId);
    }

    @PostMapping
    public Itinerary create(@RequestBody Itinerary itinerary) {
        return itineraryRepository.save(itinerary);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Itinerary> update(@PathVariable Long id, @RequestBody Itinerary updated) {
        return itineraryRepository.findById(id).map(itinerary -> {
            itinerary.setTripId(updated.getTripId());
            itinerary.setDayNumber(updated.getDayNumber());
            itinerary.setTimeOfDay(updated.getTimeOfDay());
            itinerary.setTitle(updated.getTitle());
            itinerary.setDescription(updated.getDescription());
            itinerary.setImageUrl(updated.getImageUrl());
            itinerary.setLocationName(updated.getLocationName());
            return ResponseEntity.ok(itineraryRepository.save(itinerary));
        }).orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        itineraryRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
