package com.example.springapp.repository;


import com.example.springapp.model.Room;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RoomRepository extends JpaRepository<Room, Long> {
    List<Room> findByHotel_AddressContainingIgnoreCaseAndTypeContainingIgnoreCaseAndCapacityGreaterThanEqual(
            String address, String type, int capacity
    );
}
