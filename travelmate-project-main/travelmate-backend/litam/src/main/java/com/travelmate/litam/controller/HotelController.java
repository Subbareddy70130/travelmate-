package com.travelmate.litam.controller;

import com.travelmate.litam.entity.Hotel;
import com.travelmate.litam.service.HotelService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/hotels")

public class HotelController {

    @Autowired
    private HotelService hotelService;

    @GetMapping
    public List<Hotel> getAllHotels() {
        return hotelService.getAllHotels();
    }

    @GetMapping("/{destinationId}")
    public List<Hotel> getHotelsByDestination(@PathVariable Long destinationId) {
        return hotelService.getHotelsByDestination(destinationId);
    }
}
