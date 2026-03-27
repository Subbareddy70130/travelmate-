package com.travelmate.litam.repository;

import com.travelmate.litam.entity.Booking;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import java.util.List;

public interface BookingRepository extends JpaRepository<Booking, Long> {
    // Spring Data JPA property path: user.id
    List<Booking> findByUser_Id(Long userId);

    // Alias so existing service code still compiles
    default List<Booking> findByUserId(Long userId) {
        return findByUser_Id(userId);
    }
}
