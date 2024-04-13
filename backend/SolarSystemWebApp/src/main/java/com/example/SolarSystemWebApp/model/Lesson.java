package com.example.SolarSystemWebApp.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.UUID;

@Data
@Document(collection = "Lessons")
@AllArgsConstructor
@NoArgsConstructor
public class Lesson {

    @Id
    private String id;
    private String name;
    private String description;
    private char difficulty;
}
