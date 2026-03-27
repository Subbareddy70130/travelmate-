package com.travelmate.litam.service;

import com.travelmate.litam.dto.BookingRequestDTO;
import com.travelmate.litam.entity.Booking;
import com.travelmate.litam.entity.User;
import com.travelmate.litam.repository.BookingRepository;
import com.travelmate.litam.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class BookingService {

    @Autowired
    private BookingRepository bookingRepository;

    @Autowired
    private UserRepository userRepository;

    /**
     * Create a booking from a flat DTO (used by all frontend booking forms).
     * Resolves userId → User entity before saving.
     */
    public Booking createBookingFromRequest(BookingRequestDTO dto) {
        User user = userRepository.findById(dto.getUserId())
                .orElseThrow(() -> new RuntimeException("User not found: " + dto.getUserId()));

        Booking booking = new Booking();
        booking.setUser(user);
        booking.setBookingType(dto.getBookingType());
        booking.setItemId(dto.getItemId() != null ? dto.getItemId() : 0L);
        booking.setNumberOfPeople(dto.getNumberOfPeople() != null ? dto.getNumberOfPeople() : 1);
        booking.setTotalPrice(dto.getTotalPrice() != null ? dto.getTotalPrice() : 0.0);
        booking.setStatus(Booking.BookingStatus.CONFIRMED);

        // Use travelDate or checkInDate depending on type
        LocalDateTime travelDt;
        if (dto.getCheckInDate() != null) {
            travelDt = dto.getCheckInDate().atStartOfDay();
        } else if (dto.getTravelDate() != null) {
            travelDt = dto.getTravelDate().atStartOfDay();
        } else {
            travelDt = LocalDateTime.now().plusDays(1);
        }
        booking.setTravelDate(travelDt);

        return bookingRepository.save(booking);
    }

    public Booking createBooking(Booking booking) {
        return bookingRepository.save(booking);
    }

    public List<Booking> getAllBookings() {
        return bookingRepository.findAll();
    }

    public List<Booking> getBookingsByUserId(Long userId) {
        return bookingRepository.findByUserId(userId);
    }

    public Optional<Booking> getBookingById(Long id) {
        return bookingRepository.findById(id);
    }

    public Booking updateBookingStatus(Long id, Booking.BookingStatus status) {
        Booking booking = bookingRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Booking not found"));
        booking.setStatus(status);
        return bookingRepository.save(booking);
    }

    public void deleteBooking(Long id) {
        bookingRepository.deleteById(id);
    }
}
