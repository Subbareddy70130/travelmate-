package com.travelmate.litam.controller;

import com.travelmate.litam.entity.Place;
import com.travelmate.litam.service.PlaceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/places")

public class PlaceController {

    @Autowired
    private PlaceService placeService;

    @GetMapping("/{destinationId}")
    public List<Place> getPlacesByDestination(@PathVariable Long destinationId) {
        return placeService.getPlacesByDestination(destinationId);
    }
}
