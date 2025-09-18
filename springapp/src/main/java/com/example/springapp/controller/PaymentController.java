package com.example.springapp.controller;

import com.example.springapp.service.PaymentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/payments")
public class PaymentController {

    @Autowired
    private PaymentService paymentService;

    @PostMapping
    public void createPayment(@RequestParam Long id, @RequestParam String details) {
        paymentService.createPayment(id, details);
    }

    @GetMapping("/{id}")
    public String getPayment(@PathVariable Long id) {
        return paymentService.getPayment(id);
    }
}