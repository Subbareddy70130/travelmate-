package com.travelmate.litam.controller;

import com.travelmate.litam.entity.Restaurant;
import com.travelmate.litam.repository.RestaurantRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin/restaurants")

public class AdminRestaurantController {

    @Autowired
    private RestaurantRepository restaurantRepository;

    @GetMapping
    public List<Restaurant> getAll() {
        return restaurantRepository.findAll();
    }

    @PostMapping
    public Restaurant create(@RequestBody Restaurant restaurant) {
        return restaurantRepository.save(restaurant);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Restaurant> update(@PathVariable Long id, @RequestBody Restaurant updated) {
        return restaurantRepository.findById(id).map(r -> {
            r.setDestinationId(updated.getDestinationId());
            r.setName(updated.getName());
            r.setLocation(updated.getLocation());
            r.setCuisine(updated.getCuisine());
            r.setRating(updated.getRating());
            r.setImageUrl(updated.getImageUrl());
            return ResponseEntity.ok(restaurantRepository.save(r));
        }).orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        restaurantRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
