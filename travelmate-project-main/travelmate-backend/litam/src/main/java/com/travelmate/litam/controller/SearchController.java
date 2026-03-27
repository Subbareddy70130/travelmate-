package com.travelmate.litam.controller;

import com.travelmate.litam.dto.SearchResponse;
import com.travelmate.litam.service.SearchService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")

public class SearchController {

    @Autowired
    private SearchService searchService;

    @GetMapping("/search")
    public ResponseEntity<SearchResponse> search(@RequestParam String city,
            @RequestParam(required = false) String startDate,
            @RequestParam(required = false) String endDate) {
        SearchResponse response = searchService.search(city);
        if (response == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(response);
    }
}
