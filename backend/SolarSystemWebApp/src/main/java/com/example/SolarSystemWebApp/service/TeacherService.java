package com.example.SolarSystemWebApp.service;

import com.example.SolarSystemWebApp.communication.TeacherRequest;
import com.example.SolarSystemWebApp.exception.StudentNotFoundException;
import com.example.SolarSystemWebApp.exception.TeacherNotFoundException;
import com.example.SolarSystemWebApp.model.Student;
import com.example.SolarSystemWebApp.model.Teacher;
import com.example.SolarSystemWebApp.repository.TeacherRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class TeacherService {

    @Autowired
    private TeacherRepository teacherRepository;
    @Autowired
    private PasswordHasherService passwordHasherService;

    @Autowired
    private StudentService studentService;

    public List<Teacher> getAllTeachers() {
        return teacherRepository.findAll();
    }

    public Teacher getTeacher(String id) throws TeacherNotFoundException {
        Teacher teacher = teacherRepository.getTeacherById(id);
        if (teacher == null)
            throw new TeacherNotFoundException("Teacher not found!", new Exception());
        return teacher;
    }

    public Teacher addStudent(String teacher_id, String student_id) throws StudentNotFoundException, TeacherNotFoundException {
        Teacher teacher = getTeacher(teacher_id);
        Student student = studentService.getStudentById(student_id);
        List<Student> students = teacher.getStudents();
        students.add(student);
        teacher.setStudents(students);
        return teacherRepository.save(teacher);
    }

    public Teacher addTeacher(TeacherRequest request) {
        Teacher teacher = new Teacher();
        teacher.setStudents(new ArrayList<>());
        teacher.setName(request.getName());
        teacher.setEmail(request.getUsername());
        teacher.setPassword(passwordHasherService.hashPassword(request.getPassword()));
        return teacherRepository.save(teacher);
    }

    public Teacher getTeacherByEmail(String username) throws TeacherNotFoundException {
        List<Teacher> teachers = getAllTeachers();
        Teacher teacher = null;
        for (Teacher teacherElement : teachers) {
            if (teacherElement.getEmail().equals(username)) {
                teacher = teacherElement;
                break;
            }
        }
        if (teacher == null)
            throw new TeacherNotFoundException("Teacher with email: " + username + " not found!", new Exception());
        return teacher;
    }
}
