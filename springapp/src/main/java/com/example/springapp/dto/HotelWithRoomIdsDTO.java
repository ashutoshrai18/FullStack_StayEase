package com.example.springapp.dto;

import com.example.springapp.model.Hotel;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class HotelWithRoomIdsDTO {
    private Hotel hotel;
    private List<Long> availableRoomIds;
}

