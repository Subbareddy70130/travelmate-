package com.travelmate.litam.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

@Entity
@Table(name = "trip_itineraries")
public class TripItinerary {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long tripId;
    private Integer dayNumber;

    @Column(length = 1000)
    private String morningPlan;

    @Column(length = 1000)
    private String afternoonPlan;

    @Column(length = 1000)
    private String eveningPlan;

    public TripItinerary() {
    }

    public TripItinerary(Long id, Long tripId, Integer dayNumber, String morningPlan, String afternoonPlan,
            String eveningPlan) {
        this.id = id;
        this.tripId = tripId;
        this.dayNumber = dayNumber;
        this.morningPlan = morningPlan;
        this.afternoonPlan = afternoonPlan;
        this.eveningPlan = eveningPlan;
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

    public String getMorningPlan() {
        return morningPlan;
    }

    public void setMorningPlan(String morningPlan) {
        this.morningPlan = morningPlan;
    }

    public String getAfternoonPlan() {
        return afternoonPlan;
    }

    public void setAfternoonPlan(String afternoonPlan) {
        this.afternoonPlan = afternoonPlan;
    }

    public String getEveningPlan() {
        return eveningPlan;
    }

    public void setEveningPlan(String eveningPlan) {
        this.eveningPlan = eveningPlan;
    }
}
