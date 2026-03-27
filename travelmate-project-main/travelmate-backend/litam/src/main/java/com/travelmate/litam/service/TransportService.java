package com.travelmate.litam.service;

import com.travelmate.litam.entity.Bus;
import com.travelmate.litam.entity.Flight;
import com.travelmate.litam.entity.Train;
import com.travelmate.litam.repository.BusRepository;
import com.travelmate.litam.repository.FlightRepository;
import com.travelmate.litam.repository.TrainRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TransportService {

    @Autowired
    private FlightRepository flightRepository;

    @Autowired
    private TrainRepository trainRepository;

    @Autowired
    private BusRepository busRepository;

    public List<Flight> getAllFlights() {
        return flightRepository.findAll();
    }

    public List<Flight> searchFlights(String from, String to) {
        if (from != null && !from.isBlank() && to != null && !to.isBlank()) {
            return flightRepository.findByDepartureCityIgnoreCaseAndArrivalCityIgnoreCase(from.trim(), to.trim());
        } else if (from != null && !from.isBlank()) {
            return flightRepository.findByDepartureCityIgnoreCase(from.trim());
        }
        return flightRepository.findAll();
    }

    public List<Train> getAllTrains() {
        return trainRepository.findAll();
    }

    public List<Bus> getAllBuses() {
        return busRepository.findAll();
    }
}
