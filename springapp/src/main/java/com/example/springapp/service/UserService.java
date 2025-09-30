package com.example.springapp.service;


import com.example.springapp.model.User;
import com.example.springapp.repository.UserRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {
    private final UserRepository repo;

    UserService(UserRepository repo){
        this.repo = repo;
    }

    public UserRepository getRepo() {
        return repo;
    }

    public User authenticate(String email, String password) {
        User user = repo.findByEmail(email);
        if (user != null && user.getPassword().equals(password)) { // Use hashing in production
            return user;
        }
        throw new IllegalArgumentException("Invalid email or password");
    }

    public Page<User> getUsers(int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        return repo.findAll(pageable);
    }

    public String userNameByEmail(String email) {
        User user = repo.findByEmail(email);
        return user != null ? user.getName() : null;
    }

    public String findUserByName(String name) {
        User user = repo.findUserByName(name);
        return user != null ? user.getName() : null;
    }

    public List<User> getAllUsers() {
        return repo.findAll();
    }

    public Optional<User> getUserById(long id) {
        return repo.findById(id);
    }

 // In UserService.java
 public User createUser(User user){
     if (repo.existsByEmail(user.getEmail())) {
         throw new IllegalArgumentException("Email already exists");
     }
     try {
         return repo.save(user);
     } catch (org.springframework.dao.DataIntegrityViolationException e) {
         throw new IllegalArgumentException("Email already exists (constraint violation)");
     }
 }

    // UserService.java
//    public User createUser(User user) {
//        if (userRepository.existsByEmail(user.getEmail())) {
//            throw new IllegalArgumentException("Email already exists");
//        }
//        return userRepository.save(user);
//    }
    public User updateUser(User user){
        return repo.save(user);
    }


    public long countUsers() {
        return repo.count();
    }

    public void deleteUserById(long id) {
        repo.deleteById(id);
    }

    public void deleteAllUsers() {
        repo.deleteAll();
    }


}
