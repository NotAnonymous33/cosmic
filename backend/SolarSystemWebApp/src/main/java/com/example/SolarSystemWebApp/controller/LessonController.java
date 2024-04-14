package com.example.SolarSystemWebApp.controller;

import com.example.SolarSystemWebApp.model.Lesson;
import com.example.SolarSystemWebApp.service.LessonService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/lessons")
public class LessonController {

    @Autowired
    private LessonService lessonService;

    @GetMapping
    public List<Lesson> getLessons() {
        return lessonService.getLessons();
    }
}
