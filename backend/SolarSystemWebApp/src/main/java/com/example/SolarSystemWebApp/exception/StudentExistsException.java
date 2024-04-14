package com.example.SolarSystemWebApp.exception;

public class StudentExistsException extends Exception {
    public StudentExistsException(String message, Throwable throwable) {
        super(message, throwable);
    }
}
