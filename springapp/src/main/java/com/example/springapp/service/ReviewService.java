package com.example.springapp.service;

import org.springframework.stereotype.Service;
import java.util.*;

@Service
public class ReviewService {
    private final Map<Long, String> reviews = new HashMap<>();

    public void addReview(Long id, String review) {
        reviews.put(id, review);
    }

    public String getReview(Long id) {
        return reviews.get(id);
    }
}