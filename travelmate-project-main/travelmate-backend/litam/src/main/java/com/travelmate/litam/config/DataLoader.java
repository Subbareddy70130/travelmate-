package com.travelmate.litam.config;

import com.travelmate.litam.entity.*;
import com.travelmate.litam.repository.*;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.time.LocalDateTime;
import java.util.List;

@Configuration
public class DataLoader {

        @Bean
        CommandLineRunner initDatabase(
                        UserRepository userRepository,
                        DestinationRepository destinationRepository,
                        PlaceRepository placeRepository,
                        HotelRepository hotelRepository,
                        RestaurantRepository restaurantRepository,
                        FlightRepository flightRepository,
                        TrainRepository trainRepository,
                        BusRepository busRepository,
                        TripRepository tripRepository,
                        ItineraryRepository itineraryRepository,
                        PasswordEncoder passwordEncoder) {
                return args -> {
                        // Seeding Users
                        if (userRepository.findByUsername("admin").isEmpty()) {
                                User admin = new User();
                                admin.setUsername("admin");
                                admin.setPassword(passwordEncoder.encode("admin123"));
                                admin.setFirstName("Admin");
                                admin.setLastName("User");
                                admin.setEmail("admin@travelmate.com");
                                admin.setPhoneNumber("1234567890");
                                admin.setCreatedAt(LocalDateTime.now());
                                userRepository.save(admin);
                                System.out.println("Admin user created.");
                        }

                        if (userRepository.findByUsername("testuser").isEmpty()) {
                                User testUser = new User();
                                testUser.setUsername("testuser");
                                testUser.setPassword(passwordEncoder.encode("password123"));
                                testUser.setFirstName("Test");
                                testUser.setLastName("User");
                                testUser.setEmail("testuser@example.com");
                                testUser.setPhoneNumber("0987654321");
                                testUser.setCreatedAt(LocalDateTime.now());
                                userRepository.save(testUser);
                        }

                        // Seeding Destinations, Trips, and Itineraries
                        Destination bali = destinationRepository.findByName("Bali")
                                        .orElseGet(() -> destinationRepository.save(new Destination(null, "Bali",
                                                        "Indonesia", "Island of the Gods", "Apr-Oct",
                                                        "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800&auto=format&fit=crop",
                                                        4.8, "Tropical")));
                        Destination india = destinationRepository.findByName("India")
                                        .orElseGet(() -> destinationRepository.save(new Destination(null, "India",
                                                        "India", "The majestic subcontinent", "Oct-Mar",
                                                        "https://images.unsplash.com/photo-1524492412937-b28074a5d7c3?w=800",
                                                        4.8, "Cultural")));
                        Destination bangkok = destinationRepository.findByName("Bangkok")
                                        .orElseGet(() -> destinationRepository.save(new Destination(null, "Bangkok",
                                                        "Thailand", "City of Angels", "Nov-Feb",
                                                        "https://images.unsplash.com/photo-1508009603885-50cf7c579365?w=800",
                                                        4.7, "Urban")));
                        Destination rome = destinationRepository.findByName("Rome")
                                        .orElseGet(() -> destinationRepository.save(new Destination(null, "Rome",
                                                        "Italy", "The Eternal City", "Sep-Nov",
                                                        "https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=800",
                                                        4.9, "Historical")));

                        // Seed Trips
                        Trip baliTrip = tripRepository.findByTitle("Bali Explorer").stream().findFirst()
                                        .orElseGet(() -> tripRepository.save(new Trip(null, bali.getId(),
                                                        "Bali Explorer", "7 Days", "Comprehensive tour of Bali",
                                                        "Summer",
                                                        "https://images.unsplash.com/photo-1554481923-a6918bd997bc?w=800")));
                        Trip indiaTrip = tripRepository.findByTitle("Golden Triangle Tour").stream().findFirst()
                                        .orElseGet(() -> tripRepository.save(new Trip(null, india.getId(),
                                                        "Golden Triangle Tour", "8 Days",
                                                        "Experience the heart of India", "Winter",
                                                        "https://images.unsplash.com/photo-1524492412937-b28074a5d7c3?w=800")));
                        Trip bangkokTrip = tripRepository.findByTitle("Bangkok City Lights").stream().findFirst()
                                        .orElseGet(() -> tripRepository.save(new Trip(null, bangkok.getId(),
                                                        "Bangkok City Lights", "5 Days", "Vibrant streets and temples",
                                                        "Winter",
                                                        "https://images.unsplash.com/photo-1508009603885-50cf7c579365?w=800")));
                        Trip romeTrip = tripRepository.findByTitle("Italian Renaissance").stream().findFirst()
                                        .orElseGet(() -> tripRepository.save(new Trip(null, rome.getId(),
                                                        "Italian Renaissance", "7 Days", "Rome, Florence, and Venice",
                                                        "Spring",
                                                        "https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=800")));

                        // Seed Itineraries if empty for the trip
                        if (itineraryRepository.findByTripIdOrderByDayNumberAscTimeOfDayAsc(baliTrip.getId())
                                        .isEmpty()) {
                                itineraryRepository.save(new Itinerary(null, baliTrip.getId(), 1,
                                                Itinerary.TimeOfDay.MORNING, "Mount Batur Sunrise Trekking",
                                                "Hike for spectacular sunrise",
                                                "https://images.unsplash.com/photo-1517054457784-06536093557d?w=800",
                                                "KINTAMANI, BALI"));
                                itineraryRepository.save(new Itinerary(null, baliTrip.getId(), 1,
                                                Itinerary.TimeOfDay.EVENING, "Ubud Cultural Day Tour",
                                                "Explore the cultural heart",
                                                "https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?w=800",
                                                "UBUD"));
                        }

                        if (itineraryRepository.findByTripIdOrderByDayNumberAscTimeOfDayAsc(indiaTrip.getId())
                                        .isEmpty()) {
                                itineraryRepository.save(new Itinerary(null, indiaTrip.getId(), 1,
                                                Itinerary.TimeOfDay.MORNING, "Arrival in New Delhi",
                                                "Welcome to the capital",
                                                "https://images.unsplash.com/photo-1587474260584-13657452dcd0?w=800",
                                                "DELHI"));
                                itineraryRepository.save(new Itinerary(null, indiaTrip.getId(), 2,
                                                Itinerary.TimeOfDay.MORNING, "Taj Mahal at Sunrise",
                                                "Visit the ivory-white marble mausoleum",
                                                "https://images.unsplash.com/photo-1564507592209-482a9d80327f?w=800",
                                                "AGRA"));
                        }

                        if (itineraryRepository.findByTripIdOrderByDayNumberAscTimeOfDayAsc(bangkokTrip.getId())
                                        .isEmpty()) {
                                itineraryRepository.save(new Itinerary(null, bangkokTrip.getId(), 1,
                                                Itinerary.TimeOfDay.MORNING, "Grand Palace Tour",
                                                "Visit the most sacred site",
                                                "https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?w=800",
                                                "GRAND PALACE"));
                        }

                        if (itineraryRepository.findByTripIdOrderByDayNumberAscTimeOfDayAsc(romeTrip.getId())
                                        .isEmpty()) {
                                itineraryRepository.save(new Itinerary(null, romeTrip.getId(), 1,
                                                Itinerary.TimeOfDay.MORNING, "Colosseum & Forum", "Step back in time",
                                                "https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=800",
                                                "ROME"));
                        }

                        System.out.println("Destinations, Trips and Itineraries checked and seeded.");
                };
        }
}
