package com.travelmate.litam.controller;

import com.travelmate.litam.entity.Hotel;
import com.travelmate.litam.repository.HotelRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin/hotels")

public class AdminHotelController {

    @Autowired
    private HotelRepository hotelRepository;

    @GetMapping
    public List<Hotel> getAll() {
        return hotelRepository.findAll();
    }

    @PostMapping
    public Hotel create(@RequestBody Hotel hotel) {
        return hotelRepository.save(hotel);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Hotel> update(@PathVariable Long id, @RequestBody Hotel updated) {
        return hotelRepository.findById(id).map(hotel -> {
            hotel.setDestinationId(updated.getDestinationId());
            hotel.setName(updated.getName());
            hotel.setLocation(updated.getLocation());
            hotel.setRating(updated.getRating());
            hotel.setPricePerNight(updated.getPricePerNight());
            hotel.setImageUrl(updated.getImageUrl());
            return ResponseEntity.ok(hotelRepository.save(hotel));
        }).orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        hotelRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
