package com.example.SolarSystemWebApp.service;

import com.example.SolarSystemWebApp.communication.NewLessonRequest;
import com.example.SolarSystemWebApp.exception.LessonNotFoundException;
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

    public Lesson newLesson(NewLessonRequest lessonRequest) {
        Lesson new_lesson = new Lesson();
        new_lesson.setName(lessonRequest.getName());
        new_lesson.setDescription(lessonRequest.getDescription());
        new_lesson.setDifficulty(lessonRequest.getDifficulty());
        return lessonRepository.save(new_lesson);
    }

    public Lesson getLessonById(String id) throws LessonNotFoundException {
        Lesson lesson = lessonRepository.getLessonById(id);
        if (lesson == null)
            throw new LessonNotFoundException("Lesson not found!", new Exception());
        return lesson;
    }
}
