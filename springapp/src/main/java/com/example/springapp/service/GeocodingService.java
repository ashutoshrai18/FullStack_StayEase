
package com.example.springapp.service;

import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;
import org.json.JSONArray;
import org.json.JSONObject;

@Service
public class GeocodingService {
    private static final String API_KEY = "AIzaSyDlmiRNCsnPoB9ooFoUyEeOnkPRTQhuKvc";
    private static final String GEOCODE_URL = "https://maps.googleapis.com/maps/api/geocode/json";

    public double[] getLatLngFromAddress(String address) {
        try {
            String url = UriComponentsBuilder.fromHttpUrl(GEOCODE_URL)
                    .queryParam("address", address)
                    .queryParam("key", API_KEY)
                    .toUriString();

            RestTemplate restTemplate = new RestTemplate();
            String response = restTemplate.getForObject(url, String.class);

            JSONObject json = new JSONObject(response);
            JSONArray results = json.getJSONArray("results");
            if (results.length() > 0) {
                JSONObject location = results.getJSONObject(0)
                        .getJSONObject("geometry")
                        .getJSONObject("location");
                double lat = location.getDouble("lat");
                double lng = location.getDouble("lng");
                return new double[]{lat, lng};
            }
        } catch (Exception e) {
            // Log error and return default coordinates
            e.printStackTrace();
        }
        // Default: New Delhi
        return new double[]{28.6139, 77.2090};
    }
}