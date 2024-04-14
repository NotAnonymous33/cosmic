package com.example.SolarSystemWebApp.repository;

import com.example.SolarSystemWebApp.model.Student;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.UUID;

public interface StudentRepository extends MongoRepository<Student, UUID> {
    Student getStudentById(String id);
    UserDetails getStudentByUsername(String username);

    Student findStudentByUsername(String username);
}
