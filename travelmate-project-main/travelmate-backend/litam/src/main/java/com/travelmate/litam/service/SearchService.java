package com.travelmate.litam.service;

import com.travelmate.litam.dto.SearchResponse;
import com.travelmate.litam.entity.Destination;
import com.travelmate.litam.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SearchService {

    @Autowired
    private DestinationRepository destinationRepository;

    @Autowired
    private PlaceRepository placeRepository;

    @Autowired
    private HotelRepository hotelRepository;

    @Autowired
    private RestaurantRepository restaurantRepository;

    @Autowired
    private TripRepository tripRepository;

    private static final org.slf4j.Logger logger = org.slf4j.LoggerFactory.getLogger(SearchService.class);

    public SearchResponse search(String city) {
        String trimmedCity = (city != null) ? city.trim() : "";
        logger.info("Searching for city: {}", trimmedCity);

        List<Destination> destinations = destinationRepository.findByNameContainingIgnoreCase(trimmedCity);
        if (destinations.isEmpty()) {
            logger.warn("No destinations found for city: {}", trimmedCity);
            return null;
        }

        Destination destination = destinations.get(0);
        logger.info("Found destination: {} (ID: {})", destination.getName(), destination.getId());
        Long destId = destination.getId();

        SearchResponse response = new SearchResponse();
        response.setDestination(destination);
        response.setPlaces(placeRepository.findByDestinationId(destId));
        response.setHotels(hotelRepository.findByDestinationId(destId));
        response.setRestaurants(restaurantRepository.findByDestinationId(destId));
        response.setTrips(tripRepository.findByDestinationId(destId));

        return response;
    }
}
