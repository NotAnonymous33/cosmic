package com.example.SolarSystemWebApp.controller;

import com.example.SolarSystemWebApp.communication.AuthRequest;
import com.example.SolarSystemWebApp.communication.NewLessonRequest;
import com.example.SolarSystemWebApp.communication.TeacherRequest;
import com.example.SolarSystemWebApp.exception.InvalidTeacherCredentialsException;
import com.example.SolarSystemWebApp.exception.TeacherNotFoundException;
import com.example.SolarSystemWebApp.model.Lesson;
import com.example.SolarSystemWebApp.model.Teacher;
import com.example.SolarSystemWebApp.service.LessonService;
import com.example.SolarSystemWebApp.service.PasswordHasherService;
import com.example.SolarSystemWebApp.service.TeacherService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/teachers")
public class TeacherController {

    @Autowired
    private TeacherService teacherService;
    @Autowired
    private PasswordHasherService passwordHasherService;
    @Autowired
    private LessonService lessonService;

    @GetMapping
    public List<Teacher> getTeachers() {
        return teacherService.getAllTeachers();
    }

    @GetMapping("/teacher/{id}")
    public Teacher getTeacher(@PathVariable String id) throws TeacherNotFoundException {
        return teacherService.getTeacher(id);
    }

    @PostMapping("/teacher_login")
    public Teacher teacherLogin(@RequestBody AuthRequest request) throws TeacherNotFoundException, InvalidTeacherCredentialsException {
        Teacher teacher = teacherService.getTeacherByEmail(request.getUsername());
        if (passwordHasherService.verifyPassword(request.getPassword(), teacher.getPassword())) {
            return teacher;
        }
        throw new InvalidTeacherCredentialsException("Password does not match!", new Exception());
    }

    @PostMapping("/new_teacher")
    public Teacher addTeacher(@RequestBody TeacherRequest data) {
        return teacherService.addTeacher(data);
    }

    @PostMapping("/teacher/{id}/new_lesson")
    public Lesson addNewLesson(@RequestBody NewLessonRequest request, @PathVariable String id) throws TeacherNotFoundException {
        teacherService.getTeacher(id);
        return lessonService.newLesson(request);
    }
}
