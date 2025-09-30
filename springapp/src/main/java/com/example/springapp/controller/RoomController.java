// src/main/java/com/example/springapp/controller/RoomController.java
package com.example.springapp.controller;
import com.example.springapp.model.Room;
import com.example.springapp.service.RoomService;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/rooms")
public class RoomController {
    private final RoomService roomService;

    public RoomController(RoomService roomService) {
        this.roomService = roomService;
    }

    @GetMapping
    public List<Room> getAllRooms() {
        return roomService.getAllRooms();
    }

    @GetMapping("/{id}")
    public Room getRoomById(@PathVariable Long id) {
        return roomService.getRoomById(id);
    }

    @PostMapping
    public Room createRoom(@RequestBody Room room) {
        return roomService.saveRoom(room);
    }

    @DeleteMapping("/{id}")
    public void deleteRoom(@PathVariable Long id) {
        roomService.deleteRoom(id);
    }

    @GetMapping("/search/advanced")
    public List<Room> searchAvailableRooms(
            @RequestParam String address,
            @RequestParam String type,
            @RequestParam int capacity,
            @RequestParam String checkInDate,
            @RequestParam String checkOutDate) {
        java.time.LocalDate checkIn = java.time.LocalDate.parse(checkInDate);
        java.time.LocalDate checkOut = java.time.LocalDate.parse(checkOutDate);
        return roomService.findAvailableRooms(address, type, capacity, checkIn, checkOut);
    }
}