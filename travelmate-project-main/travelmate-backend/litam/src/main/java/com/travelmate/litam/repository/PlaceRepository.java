package com.travelmate.litam.repository;

import com.travelmate.litam.entity.Place;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface PlaceRepository extends JpaRepository<Place, Long> {
    List<Place> findByDestinationId(Long destinationId);
}
