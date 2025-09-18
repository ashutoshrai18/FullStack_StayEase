//package com.example.springapp.model;
//import jakarta.persistence.*;
//import lombok.*;
//
//@Entity
//@Data @NoArgsConstructor @AllArgsConstructor @Builder
//public class Room {
//    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
//    private Long roomId;
//
//    @ManyToOne(optional = false)
//    @JoinColumn(name = "hotel_id")
//    private Hotel hotel;
//
//    private String roomType; // Single, Double, Suite
//    private Double pricePerNight;
//    private String availabilityStatus; // AVAILABLE / UNAVAILABLE
//    private Integer capacity;
//}

//
//package com.example.springapp.model;
//
//import jakarta.persistence.*;
//import lombok.*;
//import java.util.List;
//
//@Entity
//@Data @NoArgsConstructor @AllArgsConstructor @Builder
//public class Room {
//    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
//    private Long roomId;
//
//    private String roomNumber;
//    private String type;
//
//    @OneToMany(mappedBy = "room")
//    private List<Booking> bookings;
//}


package com.example.springapp.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Data @NoArgsConstructor @AllArgsConstructor @Builder
public class Room {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long roomId;

    private String roomNumber;
    private String type;

    @ManyToOne
    @JoinColumn(name = "hotel_id")
    private Hotel hotel;
}