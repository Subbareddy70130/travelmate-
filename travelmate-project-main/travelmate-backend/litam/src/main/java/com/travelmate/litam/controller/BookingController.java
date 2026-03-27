package com.travelmate.litam.controller;

import com.travelmate.litam.dto.BookingRequestDTO;
import com.travelmate.litam.entity.Booking;
import com.travelmate.litam.service.BookingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/bookings")

public class BookingController {

    @Autowired
    private BookingService bookingService;

    /**
     * Universal booking endpoint — accepts BookingRequestDTO from any booking type.
     * BookingType must be set in the DTO: TRIP, HOTEL, RESTAURANT, FLIGHT, TRAIN,
     * BUS
     */
    @PostMapping
    public ResponseEntity<?> createBooking(@RequestBody BookingRequestDTO dto) {
        try {
            Booking booking = bookingService.createBookingFromRequest(dto);
            return ResponseEntity.ok(booking);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }

    // Type-specific endpoints — all delegate to the same DTO handler with a forced
    // type
    @PostMapping("/trip")
    public ResponseEntity<?> bookTrip(@RequestBody BookingRequestDTO dto) {
        dto.setBookingType("TRIP");
        return createBooking(dto);
    }

    @PostMapping("/hotel")
    public ResponseEntity<?> bookHotel(@RequestBody BookingRequestDTO dto) {
        dto.setBookingType("HOTEL");
        return createBooking(dto);
    }

    @PostMapping("/restaurant")
    public ResponseEntity<?> bookRestaurant(@RequestBody BookingRequestDTO dto) {
        dto.setBookingType("RESTAURANT");
        return createBooking(dto);
    }

    @PostMapping("/flight")
    public ResponseEntity<?> bookFlight(@RequestBody BookingRequestDTO dto) {
        dto.setBookingType("FLIGHT");
        return createBooking(dto);
    }

    @PostMapping("/train")
    public ResponseEntity<?> bookTrain(@RequestBody BookingRequestDTO dto) {
        dto.setBookingType("TRAIN");
        return createBooking(dto);
    }

    @PostMapping("/bus")
    public ResponseEntity<?> bookBus(@RequestBody BookingRequestDTO dto) {
        dto.setBookingType("BUS");
        return createBooking(dto);
    }

    // User booking history
    @GetMapping("/user/{userId}")
    public List<Booking> getBookingsByUser(@PathVariable Long userId) {
        return bookingService.getBookingsByUserId(userId);
    }
}
