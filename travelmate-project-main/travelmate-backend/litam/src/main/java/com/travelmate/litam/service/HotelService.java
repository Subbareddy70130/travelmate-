package com.travelmate.litam.service;

import com.travelmate.litam.entity.Hotel;
import com.travelmate.litam.repository.HotelRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class HotelService {

    @Autowired
    private HotelRepository hotelRepository;

    public List<Hotel> getAllHotels() {
        return hotelRepository.findAll();
    }

    public List<Hotel> getHotelsByDestination(Long destinationId) {
        return hotelRepository.findByDestinationId(destinationId);
    }
}
