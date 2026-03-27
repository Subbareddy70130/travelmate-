package com.travelmate.litam.repository;

import com.travelmate.litam.entity.Trip;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface TripRepository extends JpaRepository<Trip, Long> {
    List<Trip> findByDestinationId(Long destinationId);

    List<Trip> findByTitle(String title);
}
