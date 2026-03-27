package com.travelmate.litam.repository;

import com.travelmate.litam.entity.Train;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TrainRepository extends JpaRepository<Train, Long> {
}
