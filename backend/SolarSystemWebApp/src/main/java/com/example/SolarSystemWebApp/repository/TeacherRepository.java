package com.example.SolarSystemWebApp.repository;

import com.example.SolarSystemWebApp.model.Teacher;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.UUID;

public interface TeacherRepository extends MongoRepository<Teacher, UUID> {
    Teacher getTeacherById(String id);
}
