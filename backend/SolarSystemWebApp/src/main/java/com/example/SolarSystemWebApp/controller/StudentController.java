package com.example.SolarSystemWebApp.controller;

import com.example.SolarSystemWebApp.exception.LessonNotFoundException;
import com.example.SolarSystemWebApp.exception.StudentNotFoundException;
import com.example.SolarSystemWebApp.model.Lesson;
import com.example.SolarSystemWebApp.model.Student;
import com.example.SolarSystemWebApp.repository.StudentRepository;
import com.example.SolarSystemWebApp.service.LessonService;
import com.example.SolarSystemWebApp.service.StudentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/students")
public class StudentController {

    @Autowired
    private StudentService studentService;
    @Autowired
    private LessonService lessonService;
    @Autowired
    private StudentRepository studentRepository;

    @GetMapping
    public List<Student> getStudents() {
        return studentService.getAllStudents();
    }

    @GetMapping("/student/{id}")
    public Student getStudent(@PathVariable String id) throws StudentNotFoundException {
        return studentService.getStudentById(id);
    }

    @GetMapping("/student/{student_id}/add_lesson/{lesson_id}")
    public Student addLesson(@PathVariable String student_id, @PathVariable String lesson_id) throws StudentNotFoundException, LessonNotFoundException {
        Student student = studentService.getStudentById(student_id);
        Lesson lesson = lessonService.getLessonById(lesson_id);
        List<Lesson> studentLessons = student.getLessonsCompleted();
        studentLessons.add(lesson);
        student.setLessonsCompleted(studentLessons);
        return studentRepository.save(student);
    }
}
