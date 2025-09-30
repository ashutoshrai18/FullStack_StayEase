package com.example.springapp.controller;

import com.example.springapp.dto.HotelWithRoomIdsDTO;
import com.example.springapp.model.Hotel;
import com.example.springapp.service.HotelService;
import com.example.springapp.service.RoomService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/hotels")
public class HotelController {
    private final HotelService service;
    private final RoomService roomService;

    public HotelController(HotelService service, RoomService roomService) {
        this.service = service;
        this.roomService = roomService;
    }

    @GetMapping
    public List<Hotel> getAllHotels(){
        return service.getAllHotels();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Hotel> getHotelById(@PathVariable Long id)  {
        return service.getHotelById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public Hotel createHotel(@RequestBody Hotel hotel){
        return service.createHotel(hotel);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Hotel> updateHotel(@PathVariable Long id, @RequestBody Hotel hotel) {
        hotel.setHotelId(id);
        return ResponseEntity.ok(service.updateHotel(hotel));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteHotel(@PathVariable Long id) {
        service.deleteHotelById(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/search")
    public List<Hotel> searchHotels(@RequestParam("q") String query) {
        return service.searchHotels(query);
    }

    // Advanced search endpoint using room availability
    @GetMapping("/search/advanced")
    public List<HotelWithRoomIdsDTO> searchHotelsAdvanced(
        @RequestParam String address,
        @RequestParam String roomType,
        @RequestParam int numPersons,
        @RequestParam String checkInDate,
        @RequestParam String checkOutDate
    ) {
        java.time.LocalDate checkIn = java.time.LocalDate.parse(checkInDate);
        java.time.LocalDate checkOut = java.time.LocalDate.parse(checkOutDate);
        List<com.example.springapp.model.Room> availableRooms = roomService.findAvailableRooms(address, roomType, numPersons, checkIn, checkOut);
        return availableRooms.stream()
            .collect(java.util.stream.Collectors.groupingBy(com.example.springapp.model.Room::getHotel))
            .entrySet().stream()
            .map(entry -> new HotelWithRoomIdsDTO(
                entry.getKey(),
                entry.getValue().stream().map(com.example.springapp.model.Room::getRoomId).toList()
            ))
            .toList();
    }
}