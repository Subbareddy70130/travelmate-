package com.travelmate.litam.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "trip_itineraries")
public class Itinerary {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private Long tripId;

    @Column(nullable = false)
    private Integer dayNumber;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private TimeOfDay timeOfDay;

    @Column(nullable = false)
    private String title;

    @Column(length = 2000)
    private String description;

    private String imageUrl;

    private String locationName;

    public enum TimeOfDay {
        MORNING, AFTERNOON, EVENING
    }

    public Itinerary() {
    }

    public Itinerary(Long id, Long tripId, Integer dayNumber, TimeOfDay timeOfDay, String title, String description,
            String imageUrl, String locationName) {
        this.id = id;
        this.tripId = tripId;
        this.dayNumber = dayNumber;
        this.timeOfDay = timeOfDay;
        this.title = title;
        this.description = description;
        this.imageUrl = imageUrl;
        this.locationName = locationName;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getTripId() {
        return tripId;
    }

    public void setTripId(Long tripId) {
        this.tripId = tripId;
    }

    public Integer getDayNumber() {
        return dayNumber;
    }

    public void setDayNumber(Integer dayNumber) {
        this.dayNumber = dayNumber;
    }

    public TimeOfDay getTimeOfDay() {
        return timeOfDay;
    }

    public void setTimeOfDay(TimeOfDay timeOfDay) {
        this.timeOfDay = timeOfDay;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    public String getLocationName() {
        return locationName;
    }

    public void setLocationName(String locationName) {
        this.locationName = locationName;
    }
}
