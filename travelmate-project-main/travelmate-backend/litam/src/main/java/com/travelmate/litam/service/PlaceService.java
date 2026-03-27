package com.travelmate.litam.service;

import com.travelmate.litam.entity.Place;
import com.travelmate.litam.repository.PlaceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PlaceService {

    @Autowired
    private PlaceRepository placeRepository;

    public List<Place> getPlacesByDestination(Long destinationId) {
        return placeRepository.findByDestinationId(destinationId);
    }
}
