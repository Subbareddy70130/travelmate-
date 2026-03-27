package com.travelmate.litam.controller;

import com.travelmate.litam.entity.Bus;
import com.travelmate.litam.repository.BusRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin/buses")

public class AdminBusController {

    @Autowired
    private BusRepository busRepository;

    @GetMapping
    public List<Bus> getAll() {
        return busRepository.findAll();
    }

    @PostMapping
    public Bus create(@RequestBody Bus bus) {
        return busRepository.save(bus);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Bus> update(@PathVariable Long id, @RequestBody Bus updated) {
        return busRepository.findById(id).map(b -> {
            b.setCompany(updated.getCompany());
            b.setDeparture(updated.getDeparture());
            b.setArrival(updated.getArrival());
            b.setDuration(updated.getDuration());
            b.setPrice(updated.getPrice());
            return ResponseEntity.ok(busRepository.save(b));
        }).orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        busRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
