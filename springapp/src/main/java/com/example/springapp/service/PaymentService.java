package com.example.springapp.service;


import org.springframework.stereotype.Service;
import java.util.*;

@Service
public class PaymentService {
    private final Map<Long, String> payments = new HashMap<>();

    public void createPayment(Long id, String details) {
        payments.put(id, details);
    }

    public String getPayment(Long id) {
        return payments.get(id);
    }
}