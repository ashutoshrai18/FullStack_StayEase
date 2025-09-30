package com.example.springapp.repository;

import com.example.springapp.model.Hotel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface HotelRepository extends JpaRepository<Hotel, Long> {
    List<Hotel> findByNameContainingIgnoreCaseOrAddressContainingIgnoreCase(String name, String address);
}
