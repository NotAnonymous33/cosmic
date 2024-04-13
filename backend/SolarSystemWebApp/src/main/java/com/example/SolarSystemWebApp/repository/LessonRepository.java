package com.example.SolarSystemWebApp.repository;

import com.example.SolarSystemWebApp.model.Lesson;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.UUID;

public interface LessonRepository extends MongoRepository<Lesson, UUID> {
}
