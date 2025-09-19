package com.opentransport.backend.controller;

import com.opentransport.backend.model.Trip;
import com.opentransport.backend.repository.TripRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.List;

@RestController
@RequestMapping("/api/trips")
public class TripController {

    @Autowired
    private TripRepository tripRepository;

    @GetMapping("/user/{userId}")
    public List<Trip> getUserTrips(@PathVariable Integer userId) {
        return tripRepository.findByUserId(userId);
    }
}