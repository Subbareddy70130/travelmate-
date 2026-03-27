package com.travelmate.litam.service;

import com.travelmate.litam.entity.Restaurant;
import com.travelmate.litam.repository.RestaurantRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RestaurantService {

    @Autowired
    private RestaurantRepository restaurantRepository;

    public List<Restaurant> getAllRestaurants() {
        return restaurantRepository.findAll();
    }

    public List<Restaurant> getRestaurantsByDestination(Long destinationId) {
        return restaurantRepository.findByDestinationId(destinationId);
    }
}
