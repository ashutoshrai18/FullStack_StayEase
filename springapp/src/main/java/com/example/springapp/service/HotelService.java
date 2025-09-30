package com.example.springapp.service;

import com.example.springapp.model.Hotel;
import com.example.springapp.model.Room;
import com.example.springapp.repository.HotelRepository;
import com.example.springapp.repository.RoomRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class HotelService {
    private final HotelRepository repo;
    private final GeocodingService geocodingService;
    private final RoomRepository roomRepository;
    private final RoomService roomService;

    public HotelService(HotelRepository repo, GeocodingService geocodingService, RoomRepository roomRepository, RoomService roomService) {
        this.repo = repo;
        this.geocodingService = geocodingService;
        this.roomRepository = roomRepository;
        this.roomService = roomService;
    }

    public List<Hotel> getAllHotels() {
        return repo.findAll();
    }

    public Optional<Hotel> getHotelById(long id) {
        return repo.findById(id);
    }

    public Hotel createHotel(Hotel hotel){
        if (hotel.getLatitude() == null || hotel.getLongitude() == null) {
            double[] coords = geocodingService.getLatLngFromAddress(hotel.getAddress());
            hotel.setLatitude(coords[0]);
            hotel.setLongitude(coords[1]);
        }
        return repo.save(hotel);
    }

    public Hotel updateHotel(Hotel hotel){
        if (hotel.getLatitude() == null || hotel.getLongitude() == null) {
            double[] coords = geocodingService.getLatLngFromAddress(hotel.getAddress());
            hotel.setLatitude(coords[0]);
            hotel.setLongitude(coords[1]);
        }
        return repo.save(hotel);
    }

    public void deleteHotelById(long id) {
        repo.deleteById(id);
    }

    public List<Hotel> searchHotels(String query) {
        return repo.findByNameContainingIgnoreCaseOrAddressContainingIgnoreCase(query, query);
    }

    // Advanced search: address, room type, number of persons
    public List<Hotel> searchHotelsAdvanced(String address, String roomType, int numPersons) {
        List<Room> rooms = roomRepository
            .findByHotel_AddressContainingIgnoreCaseAndTypeContainingIgnoreCaseAndCapacityGreaterThanEqual(
                address, roomType, numPersons
            );
        return rooms.stream()
            .map(Room::getHotel)
            .distinct()
            .collect(Collectors.toList());
    }

    // Advanced search with availability: address, room type, number of persons, booking dates
    public List<Hotel> searchHotelsAdvanced(String address, String roomType, int numPersons, LocalDate checkInDate, LocalDate checkOutDate) {
        List<Room> availableRooms = roomService.findAvailableRooms(address, roomType, numPersons, checkInDate, checkOutDate);
        return availableRooms.stream()
                .map(Room::getHotel)
                .distinct()
                .collect(Collectors.toList());
    }
}
