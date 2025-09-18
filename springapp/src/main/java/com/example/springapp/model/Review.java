//package com.example.springapp.model;
//
//
//import jakarta.persistence.*;
//import lombok.*;
//import java.time.LocalDateTime;
//
//@Entity
//@Data @NoArgsConstructor @AllArgsConstructor @Builder
//public class Review {
//    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
//    private Long reviewId;
//
//    @ManyToOne(optional = false)
//    @JoinColumn(name = "user_id")
//    private User user;
//
//    @ManyToOne(optional = false)
//    @JoinColumn(name = "hotel_id")
//    private Hotel hotel;
//
//    private Integer rating; // 1-5
//
//    @Column(length = 2000)
//    private String comment;
//
//    private LocalDateTime reviewDate;
//}

package com.example.springapp.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Data @NoArgsConstructor @AllArgsConstructor @Builder
public class Review {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long reviewId;

    private String comment;
    private Integer rating;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne
    @JoinColumn(name = "hotel_id")
    private Hotel hotel;
}