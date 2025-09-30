package com.example.springapp.repository;


import com.example.springapp.model.Room;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RoomRepository extends JpaRepository<Room, Long> {
    List<Room> findByHotel_AddressContainingIgnoreCaseAndTypeContainingIgnoreCaseAndCapacityGreaterThanEqual(
            String address, String type, int capacity
    );

    @Query("SELECT r FROM Room r WHERE r.hotel.address LIKE %:address% AND r.type LIKE %:roomType% AND r.capacity >= :capacity AND r.roomId NOT IN (SELECT b.room.roomId FROM Booking b WHERE b.status IN ('CONFIRMED', 'PENDING') AND ((b.checkInDate <= :checkOutDate AND b.checkOutDate >= :checkInDate)))")
    List<Room> findAvailableRooms(@Param("address") String address, @Param("roomType") String roomType, @Param("capacity") int capacity, @Param("checkInDate") java.time.LocalDate checkInDate, @Param("checkOutDate") java.time.LocalDate checkOutDate);
}
