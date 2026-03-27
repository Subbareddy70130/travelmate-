package com.travelmate.litam.repository;

import com.travelmate.litam.entity.Destination;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

import java.util.Optional;

public interface DestinationRepository extends JpaRepository<Destination, Long> {
    List<Destination> findByNameContainingIgnoreCase(String name);

    Optional<Destination> findByName(String name);
}
