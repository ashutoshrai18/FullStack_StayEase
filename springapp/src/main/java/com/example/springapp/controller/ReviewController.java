package com.example.springapp.controller;

import com.example.springapp.service.ReviewService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/reviews")
public class ReviewController {

    @Autowired
    private ReviewService reviewService;

    @PostMapping
    public void addReview(@RequestParam Long id, @RequestParam String review) {
        reviewService.addReview(id, review);
    }

    @GetMapping("/{id}")
    public String getReview(@PathVariable Long id) {
        return reviewService.getReview(id);
    }
}