package com.travelmate.litam.repository;

import com.travelmate.litam.entity.Itinerary;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ItineraryRepository extends JpaRepository<Itinerary, Long> {
    List<Itinerary> findByTripIdOrderByDayNumberAscTimeOfDayAsc(Long tripId);
}
