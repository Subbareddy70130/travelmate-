package com.travelmate.litam.controller;

import com.travelmate.litam.entity.Flight;
import com.travelmate.litam.repository.FlightRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin/flights")

public class AdminFlightController {

    @Autowired
    private FlightRepository flightRepository;

    @GetMapping
    public List<Flight> getAll() {
        return flightRepository.findAll();
    }

    @PostMapping
    public Flight create(@RequestBody Flight flight) {
        return flightRepository.save(flight);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Flight> update(@PathVariable Long id, @RequestBody Flight updated) {
        return flightRepository.findById(id).map(f -> {
            f.setAirline(updated.getAirline());
            f.setFlightNumber(updated.getFlightNumber());
            f.setDepartureCity(updated.getDepartureCity());
            f.setArrivalCity(updated.getArrivalCity());
            f.setDepartureTime(updated.getDepartureTime());
            f.setArrivalTime(updated.getArrivalTime());
            f.setDuration(updated.getDuration());
            f.setPrice(updated.getPrice());
            f.setCabinClass(updated.getCabinClass());
            return ResponseEntity.ok(flightRepository.save(f));
        }).orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        flightRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
