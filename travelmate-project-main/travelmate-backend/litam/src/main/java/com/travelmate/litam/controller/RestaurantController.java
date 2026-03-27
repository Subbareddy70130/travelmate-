package com.travelmate.litam.controller;

import com.travelmate.litam.entity.Restaurant;
import com.travelmate.litam.service.RestaurantService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/restaurants")

public class RestaurantController {

    @Autowired
    private RestaurantService restaurantService;

    @GetMapping
    public List<Restaurant> getAllRestaurants() {
        return restaurantService.getAllRestaurants();
    }

    @GetMapping("/{destinationId}")
    public List<Restaurant> getRestaurantsByDestination(@PathVariable Long destinationId) {
        return restaurantService.getRestaurantsByDestination(destinationId);
    }
}
