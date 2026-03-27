package com.travelmate.litam.repository;

import com.travelmate.litam.entity.TripItinerary;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface TripItineraryRepository extends JpaRepository<TripItinerary, Long> {
    List<TripItinerary> findByTripIdOrderByDayNumberAsc(Long tripId);
}
