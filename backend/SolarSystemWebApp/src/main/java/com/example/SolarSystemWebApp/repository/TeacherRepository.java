package com.example.SolarSystemWebApp.repository;

import com.example.SolarSystemWebApp.model.Teacher;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.UUID;

public interface TeacherRepository extends MongoRepository<Teacher, UUID> {
}
