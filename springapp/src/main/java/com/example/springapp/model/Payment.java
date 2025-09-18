//package com.example.springapp.model;
//
//import jakarta.persistence.*;
//import lombok.*;
//import java.time.LocalDateTime;
//
//@Entity
//@Data @NoArgsConstructor @AllArgsConstructor @Builder
//public class Payment {
//    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
//    private Long paymentId;
//
//    @OneToOne(optional = false)
//    @JoinColumn(name = "booking_id", unique = true)
//    private Booking booking;
//
//    private Double amount;
//    private LocalDateTime paymentDate;
//    private String paymentMethod; // UPI, CARD, CASH
//    private String status; // PAID, FAILED, PENDING
//}


package com.example.springapp.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Data @NoArgsConstructor @AllArgsConstructor @Builder
public class Payment {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long paymentId;

    private Double amount;
    private String status;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne
    @JoinColumn(name = "booking_id")
    private Booking booking;
}