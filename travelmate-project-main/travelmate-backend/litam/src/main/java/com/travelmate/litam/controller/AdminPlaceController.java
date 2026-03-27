package com.travelmate.litam.controller;

import com.travelmate.litam.entity.Place;
import com.travelmate.litam.repository.PlaceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin/places")

public class AdminPlaceController {

    @Autowired
    private PlaceRepository placeRepository;

    @GetMapping
    public List<Place> getAll() {
        return placeRepository.findAll();
    }

    @PostMapping
    public Place create(@RequestBody Place place) {
        return placeRepository.save(place);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Place> update(@PathVariable Long id, @RequestBody Place updated) {
        return placeRepository.findById(id).map(p -> {
            p.setDestinationId(updated.getDestinationId());
            p.setPlaceName(updated.getPlaceName());
            p.setDescription(updated.getDescription());
            p.setImageUrl(updated.getImageUrl());
            return ResponseEntity.ok(placeRepository.save(p));
        }).orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        placeRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
