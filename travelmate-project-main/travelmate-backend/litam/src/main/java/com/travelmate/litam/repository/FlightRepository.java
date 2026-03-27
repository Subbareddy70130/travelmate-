package com.travelmate.litam.repository;

import com.travelmate.litam.entity.Flight;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface FlightRepository extends JpaRepository<Flight, Long> {
    List<Flight> findByDepartureCityIgnoreCaseAndArrivalCityIgnoreCase(String from, String to);

    List<Flight> findByDepartureCityIgnoreCase(String from);
}
