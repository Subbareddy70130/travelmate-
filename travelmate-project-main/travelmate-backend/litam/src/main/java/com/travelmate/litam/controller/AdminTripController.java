package com.travelmate.litam.controller;

import com.travelmate.litam.entity.Trip;
import com.travelmate.litam.repository.TripRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin/trips")

public class AdminTripController {

    @Autowired
    private TripRepository tripRepository;

    @GetMapping
    public List<Trip> getAll() {
        return tripRepository.findAll();
    }

    @PostMapping
    public Trip create(@RequestBody Trip trip) {
        return tripRepository.save(trip);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Trip> update(@PathVariable Long id, @RequestBody Trip updated) {
        return tripRepository.findById(id).map(t -> {
            t.setDestinationId(updated.getDestinationId());
            t.setTitle(updated.getTitle());
            t.setDuration(updated.getDuration());
            t.setDescription(updated.getDescription());
            t.setBestSeason(updated.getBestSeason());
            t.setImageUrl(updated.getImageUrl());
            return ResponseEntity.ok(tripRepository.save(t));
        }).orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        tripRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
