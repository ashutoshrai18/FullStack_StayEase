
package com.example.springapp.service;

import com.example.springapp.model.Payment;
import com.example.springapp.repository.PaymentRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.NoSuchElementException;

@Service
public class PaymentService {
    private final PaymentRepository repo;

    public PaymentService(PaymentRepository repo) {
        this.repo = repo;
    }

    public Payment createPayment(Payment payment) {
        return repo.save(payment);
    }

    public Payment getPaymentById(Long id) {
        return repo.findById(id)
            .orElseThrow(() -> new NoSuchElementException("Payment not found"));
    }

    public List<Payment> getAllPayments() {
        return repo.findAll();
    }
}