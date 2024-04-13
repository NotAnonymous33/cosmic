package com.example.SolarSystemWebApp.service;

import com.example.SolarSystemWebApp.model.Lesson;
import com.example.SolarSystemWebApp.repository.LessonRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class LessonService {

    @Autowired
    private LessonRepository lessonRepository;

    public List<Lesson> getLessons() {
        return lessonRepository.findAll();
    }
}
