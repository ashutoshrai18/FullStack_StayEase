package com.example.springapp.service;

import com.example.springapp.model.Hotel;
import com.example.springapp.repository.HotelRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class HotelService {
    private final HotelRepository repo;

    HotelService(HotelRepository repo){
        this.repo = repo;
    }

    public List<Hotel> getAllHotels() {
        return repo.findAll();
    }

    public Optional<Hotel> getHotelById(long id) {
        return repo.findById(id);
    }

    public Hotel createHotel(Hotel hotel){
        return repo.save(hotel);
    }

    public Hotel updateHotel(Hotel hotel){
        return repo.save(hotel);
    }

    public long countHotels() {
        return repo.count();
    }

    public void deleteHotelById(long id) {
        repo.deleteById(id);
    }


}
