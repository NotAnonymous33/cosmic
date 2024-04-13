package com.example.SolarSystemWebApp.exception;

import com.example.SolarSystemWebApp.communication.ErrorResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(StudentNotFoundException.class)
    public ResponseEntity ExceptionHandler(StudentNotFoundException e) {
        ErrorResponse error = new ErrorResponse(HttpStatus.NOT_FOUND, e.getLocalizedMessage());
        return new ResponseEntity<>(error, error.getStatus());
    }

    @ExceptionHandler(TeacherNotFoundException.class)
    public ResponseEntity ExceptionHandler(TeacherNotFoundException e) {
        ErrorResponse error = new ErrorResponse(HttpStatus.NOT_FOUND, e.getLocalizedMessage());
        return new ResponseEntity<>(error, error.getStatus());
    }

    @ExceptionHandler(LessonNotFoundException.class)
    public ResponseEntity ExceptionHandler(LessonNotFoundException e) {
        ErrorResponse error = new ErrorResponse(HttpStatus.NOT_FOUND, e.getLocalizedMessage());
        return new ResponseEntity<>(error, error.getStatus());
    }

    @ExceptionHandler(InvalidTeacherCredentialsException.class)
    public ResponseEntity ExceptionHandler(InvalidTeacherCredentialsException e) {
        ErrorResponse error = new ErrorResponse(HttpStatus.UNAUTHORIZED, e.getLocalizedMessage());
        return new ResponseEntity<>(error, error.getStatus());
    }
}
