//package com.example.springapp.model;
//
//
//import jakarta.persistence.*;
//import lombok.*;
//
//@Entity
//@Data @NoArgsConstructor @AllArgsConstructor @Builder
//public class Hotel {
//    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
//    private Long hotelId;
//
//    private String name;
//    private String location;
//
//    @Column(length = 2000)
//    private String description;
//
//    private Double rating;
//    private String contactInfo;
//
//
//}
//package com.example.springapp.model;
//
//import jakarta.persistence.*;
//import lombok.*;
//import java.util.List;
//
//@Entity
//@Data @NoArgsConstructor @AllArgsConstructor @Builder
//public class Hotel {
//    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
//    private Long hotelId;
//
//    private String name;
//    private String address;
//
//    @OneToMany(mappedBy = "hotel")
//    private List<Room> rooms;
//
//    @OneToMany(mappedBy = "hotel")
//    private List<Review> reviews;
//}

package com.example.springapp.model;


import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;

@Entity
@Data
@Table(name = "hotel")
public class Hotel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long hotelId;

    private String name;
    private String address;

    @Column(length = 500)
    private String description;

    private Double rating;

    private Double pricePerNight;

    private String roomType;

    private String contactInfo;

    private String imageUrl;

    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    // Getters & setters
}
