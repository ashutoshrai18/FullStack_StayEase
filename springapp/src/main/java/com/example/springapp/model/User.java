//package com.example.springapp.model;
//import jakarta.persistence.*;
//import lombok.*;
//
//@Entity
//@Data @NoArgsConstructor @AllArgsConstructor @Builder
//@Table(name = "users")
//public class User {
//    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
//    private Long userId;
//
//
//    private String name;
//
//
//    @Column(unique = true, nullable = false)
//    private String email;
//
//
//    private String phoneNumber;
//
//
//    private String password;
//
//
//    private String role; // ADMIN / CUSTOMER
//}


package com.example.springapp.model;

import jakarta.persistence.*;
import lombok.*;
import java.util.List;

@Entity
@Data @NoArgsConstructor @AllArgsConstructor @Builder
public class User {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long userId;

    private String name;

    @Column(unique = true, nullable = false)
    private String email;

    private String phoneNumber;

    private String password;

    @OneToMany(mappedBy = "user")
    private List<Booking> bookings;


    @OneToMany(mappedBy = "user")
    private List<Review> reviews;

    @OneToMany(mappedBy = "user")
    private List<Payment> payments;
}