package com.example.SolarSystemWebApp.service;

import com.example.SolarSystemWebApp.communication.StudentData;
import com.example.SolarSystemWebApp.exception.StudentExistsException;
import com.example.SolarSystemWebApp.exception.StudentNotFoundException;
import com.example.SolarSystemWebApp.model.Lesson;
import com.example.SolarSystemWebApp.model.Student;
import com.example.SolarSystemWebApp.repository.StudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Service
public class StudentService {

    @Autowired
    private StudentRepository studentRepository;

    @Autowired
    private LessonService lessonService;

    @Autowired
    private PasswordHasherService passwordHasherService;

    public List<Student> getAllStudents() {
        return studentRepository.findAll();
    }

    public Student getStudentById(String id) throws StudentNotFoundException {
        Student student = studentRepository.getStudentById(id);
        if (student == null)
            throw new StudentNotFoundException("Student not found!", new Exception());
        return student;
    }

    public UserDetails getStudentDetailsByUsername(String username) {
        return studentRepository.getStudentByUsername(username);
    }

    public Student getStudentByUsernamePassword(String username, String password) throws StudentNotFoundException {
        List<Student> students = getAllStudents();
        Student student = null;
        for (Student s : students) {
            if (s.getUsername().equals(username) && passwordHasherService.verifyPassword(password, s.getPassword())) {
                student = s;
                break;
            }
        }
        if (student == null)
            throw new StudentNotFoundException("Student not found!", new Exception());
        return student;
    }

    public List<Lesson> getStudentCompletedLessons(String id) throws StudentNotFoundException {
        return getStudentById(id).getLessonsCompleted();
    }

    public double getStudentProgress(String id) throws StudentNotFoundException {
        return getStudentById(id).getProgress();
    }

    public Student newStudent(StudentData data) throws StudentExistsException {
        List<Student> students = getAllStudents();
        for(Student s : students) {
            if(s.getUsername().equals(data.getEmail()))
                throw new StudentExistsException("Student already present!", new Exception());
        }
        Student student = new Student();
        student.setName(data.getName());
        student.setUsername(data.getEmail());
        student.setPassword(passwordHasherService.hashPassword(data.getPassword()));
        student.setProgress(0);
        student.setLessonsCompleted(new ArrayList<>());
        student.setCurrentLesson(null);
        return studentRepository.save(student);
    }

    public Student updateProgress(String id) throws StudentNotFoundException {
        Student student = getStudentById(id);
        double progress = student.getProgress();
        int total_lessons = lessonService.getLessons().size();
        double newProgress = (double) student.getLessonsCompleted().size() / total_lessons;
        student.setProgress(newProgress);
        return studentRepository.save(student);
    }
}
