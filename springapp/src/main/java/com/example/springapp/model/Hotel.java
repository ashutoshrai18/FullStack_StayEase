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
package com.example.springapp.model;

import jakarta.persistence.*;
import lombok.*;
import java.util.List;

@Entity
@Data @NoArgsConstructor @AllArgsConstructor @Builder
public class Hotel {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long hotelId;

    private String name;
    private String address;

    @OneToMany(mappedBy = "hotel")
    private List<Room> rooms;

    @OneToMany(mappedBy = "hotel")
    private List<Review> reviews;
}