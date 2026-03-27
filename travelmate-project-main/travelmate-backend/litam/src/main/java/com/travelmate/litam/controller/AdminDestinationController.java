package com.travelmate.litam.controller;

import com.travelmate.litam.entity.Destination;
import com.travelmate.litam.repository.DestinationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin/destinations")

public class AdminDestinationController {

    @Autowired
    private DestinationRepository destinationRepository;

    @GetMapping
    public List<Destination> getAll() {
        return destinationRepository.findAll();
    }

    @PostMapping
    public Destination create(@RequestBody Destination destination) {
        return destinationRepository.save(destination);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Destination> update(@PathVariable Long id, @RequestBody Destination updated) {
        return destinationRepository.findById(id).map(dest -> {
            dest.setName(updated.getName());
            dest.setCountry(updated.getCountry());
            dest.setDescription(updated.getDescription());
            dest.setBestTimeToVisit(updated.getBestTimeToVisit());
            dest.setImageUrl(updated.getImageUrl());
            dest.setRating(updated.getRating());
            dest.setCategory(updated.getCategory());
            return ResponseEntity.ok(destinationRepository.save(dest));
        }).orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        destinationRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
