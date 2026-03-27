package com.travelmate.litam.controller;

import com.travelmate.litam.entity.Bus;
import com.travelmate.litam.entity.Flight;
import com.travelmate.litam.entity.Train;
import com.travelmate.litam.service.TransportService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")

public class TransportController {

    @Autowired
    private TransportService transportService;

    @GetMapping("/flights")
    public List<Flight> getAllFlights() {
        return transportService.getAllFlights();
    }

    @GetMapping("/flights/search")
    public List<Flight> searchFlights(
            @RequestParam(required = false) String from,
            @RequestParam(required = false) String to) {
        return transportService.searchFlights(from, to);
    }

    @GetMapping("/trains")
    public List<Train> getAllTrains() {
        return transportService.getAllTrains();
    }

    @GetMapping("/buses")
    public List<Bus> getAllBuses() {
        return transportService.getAllBuses();
    }
}
