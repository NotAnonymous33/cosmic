package com.example.SolarSystemWebApp.controller;

import com.example.SolarSystemWebApp.communication.LessonContent;
import com.example.SolarSystemWebApp.exception.LessonNotFoundException;
import com.example.SolarSystemWebApp.model.Lesson;
import com.example.SolarSystemWebApp.repository.LessonRepository;
import com.example.SolarSystemWebApp.service.LessonService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/lessons")
public class LessonController {

    @Autowired
    private LessonService lessonService;
    @Autowired
    private LessonRepository repository;

    @GetMapping
    public List<Lesson> getLessons() {
        return lessonService.getLessons();
    }

    @PostMapping("/lesson/{id}/add_content")
    public Lesson addLessonContent(@PathVariable String id, @RequestBody LessonContent lessonContent) throws LessonNotFoundException {
        Lesson lesson = lessonService.getLessonById(id);
        lesson.setContent(lessonContent.getContent());
        return repository.save(lesson);
    }
}
