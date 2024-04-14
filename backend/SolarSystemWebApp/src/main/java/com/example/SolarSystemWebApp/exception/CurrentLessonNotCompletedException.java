package com.example.SolarSystemWebApp.exception;

public class CurrentLessonNotCompletedException extends Exception{

    public CurrentLessonNotCompletedException(String message, Throwable throwable) {
        super(message, throwable);
    }
}
