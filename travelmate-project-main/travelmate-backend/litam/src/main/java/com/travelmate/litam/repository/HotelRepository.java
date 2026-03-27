package com.travelmate.litam.repository;

import com.travelmate.litam.entity.Hotel;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface HotelRepository extends JpaRepository<Hotel, Long> {
    List<Hotel> findByDestinationId(Long destinationId);
}
