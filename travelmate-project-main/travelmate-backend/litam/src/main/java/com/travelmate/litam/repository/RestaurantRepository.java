package com.travelmate.litam.repository;

import com.travelmate.litam.entity.Restaurant;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface RestaurantRepository extends JpaRepository<Restaurant, Long> {
    List<Restaurant> findByDestinationId(Long destinationId);
}
