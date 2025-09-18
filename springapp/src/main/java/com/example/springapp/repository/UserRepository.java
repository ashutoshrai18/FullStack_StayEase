package com.example.springapp.repository;
// File: src/main/java/com/example/springapp/repository/UserRepository.java

import com.example.springapp.model.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    @Query("SELECT u FROM User u WHERE u.email = :email")
    User findByEmail(String email);

    @Query("SELECT u FROM User u WHERE u.name = :name")
    User findUserByName(String email);



    @Query("SELECT u FROM User u")
    Page<User> findAllUsers(Pageable pageable);
    // Add more JPQL queries as needed
}