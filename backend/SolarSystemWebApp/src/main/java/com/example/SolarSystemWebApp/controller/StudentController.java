package com.example.SolarSystemWebApp.controller;

import com.example.SolarSystemWebApp.communication.NewStudentResponse;
import com.example.SolarSystemWebApp.communication.StudentData;
import com.example.SolarSystemWebApp.model.Student;
import com.example.SolarSystemWebApp.service.StudentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/students")
public class StudentController {

    @Autowired
    private StudentService studentService;

    @GetMapping
    public List<Student> getStudents() {
        return studentService.getAllStudents();
    }
}
