package com.travelmate.litam.dto;

import com.travelmate.litam.entity.*;
import lombok.Data;
import java.util.List;

public class SearchResponse {
    private Destination destination;
    private List<Place> places;
    private List<Hotel> hotels;
    private List<Restaurant> restaurants;
    private List<Trip> trips;

    public SearchResponse() {
    }

    public SearchResponse(Destination destination, List<Place> places, List<Hotel> hotels, List<Restaurant> restaurants,
            List<Trip> trips) {
        this.destination = destination;
        this.places = places;
        this.hotels = hotels;
        this.restaurants = restaurants;
        this.trips = trips;
    }

    public Destination getDestination() {
        return destination;
    }

    public void setDestination(Destination destination) {
        this.destination = destination;
    }

    public List<Place> getPlaces() {
        return places;
    }

    public void setPlaces(List<Place> places) {
        this.places = places;
    }

    public List<Hotel> getHotels() {
        return hotels;
    }

    public void setHotels(List<Hotel> hotels) {
        this.hotels = hotels;
    }

    public List<Restaurant> getRestaurants() {
        return restaurants;
    }

    public void setRestaurants(List<Restaurant> restaurants) {
        this.restaurants = restaurants;
    }

    public List<Trip> getTrips() {
        return trips;
    }

    public void setTrips(List<Trip> trips) {
        this.trips = trips;
    }
}
