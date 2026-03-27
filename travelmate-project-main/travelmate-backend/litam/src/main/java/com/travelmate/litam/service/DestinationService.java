package com.travelmate.litam.service;

import com.travelmate.litam.entity.Destination;
import com.travelmate.litam.repository.DestinationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class DestinationService {

    @Autowired
    private DestinationRepository destinationRepository;

    public List<Destination> getAllDestinations() {
        return destinationRepository.findAll();
    }

    public Optional<Destination> getDestinationById(Long id) {
        return destinationRepository.findById(id);
    }

    public List<Destination> searchDestinations(String city) {
        return destinationRepository.findByNameContainingIgnoreCase(city);
    }
}
