package com.travelmate.litam.controller;

import com.travelmate.litam.entity.Train;
import com.travelmate.litam.repository.TrainRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin/trains")

public class AdminTrainController {

    @Autowired
    private TrainRepository trainRepository;

    @GetMapping
    public List<Train> getAll() {
        return trainRepository.findAll();
    }

    @PostMapping
    public Train create(@RequestBody Train train) {
        return trainRepository.save(train);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Train> update(@PathVariable Long id, @RequestBody Train updated) {
        return trainRepository.findById(id).map(t -> {
            t.setTrainName(updated.getTrainName());
            t.setDepartureStation(updated.getDepartureStation());
            t.setArrivalStation(updated.getArrivalStation());
            t.setTravelTime(updated.getTravelTime());
            t.setPrice(updated.getPrice());
            return ResponseEntity.ok(trainRepository.save(t));
        }).orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        trainRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
