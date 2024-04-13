package com.example.SolarSystemWebApp.exception;

public class LessonNotFoundException extends Exception{
    public LessonNotFoundException(String message, Throwable throwable) {
        super(message, throwable);
    }
}
