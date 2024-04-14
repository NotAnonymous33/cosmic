package com.example.SolarSystemWebApp.controller;

import com.example.SolarSystemWebApp.exception.CurrentLessonNotCompletedException;
import com.example.SolarSystemWebApp.exception.LessonNotFoundException;
import com.example.SolarSystemWebApp.exception.StudentNotFoundException;
import com.example.SolarSystemWebApp.model.Lesson;
import com.example.SolarSystemWebApp.model.Student;
import com.example.SolarSystemWebApp.repository.StudentRepository;
import com.example.SolarSystemWebApp.service.LessonService;
import com.example.SolarSystemWebApp.service.StudentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.parameters.P;
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

    @GetMapping("/student/{student_id}/complete_lesson")
    public Student addLesson(@PathVariable String student_id) throws StudentNotFoundException {
        Student student = studentService.getStudentById(student_id);
        Lesson lesson = student.getCurrentLesson();
        List<Lesson> studentLessons = student.getLessonsCompleted();
        studentLessons.add(lesson);
        student.setLessonsCompleted(studentLessons);
        student.setCurrentLesson(null);
        return studentRepository.save(student);
    }

    @GetMapping("/student/{student_id}/choose_lesson/{lesson_id}")
    public Student chooseLesson(@PathVariable String student_id, @PathVariable String lesson_id) throws StudentNotFoundException, CurrentLessonNotCompletedException, LessonNotFoundException {
        Student student = studentService.getStudentById(student_id);
        if (student.getCurrentLesson() != null)
            throw new CurrentLessonNotCompletedException("Please complete your on going lesson!", new Exception());

        Lesson lesson = lessonService.getLessonById(lesson_id);
        student.setCurrentLesson(lesson);
        return studentRepository.save(student);
    }

    @GetMapping("/student/{username}")
    public Student getByUsername(@PathVariable String username) throws StudentNotFoundException {
        return studentService.getStudentByUsername(username);
    }
}
