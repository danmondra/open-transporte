package com.opentransport.backend.repository;

import com.opentransport.backend.model.Trip;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface TripRepository extends JpaRepository<Trip, Integer> {
    List<Trip> findByUserId(Integer userId);
}