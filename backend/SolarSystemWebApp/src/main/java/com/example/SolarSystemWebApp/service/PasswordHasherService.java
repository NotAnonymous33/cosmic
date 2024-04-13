package com.example.SolarSystemWebApp.service;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class PasswordHasherService {

    private final PasswordEncoder passwordEncoder;

    public PasswordHasherService() {
        this.passwordEncoder = new BCryptPasswordEncoder();
    }

    // Method to hash a password
    public String hashPassword(String password) {
        return passwordEncoder.encode(password);
    }

    // Method to verify a password against a hashed password
    public boolean verifyPassword(String password, String hashedPassword) {
        return passwordEncoder.matches(password, hashedPassword);
    }
}
