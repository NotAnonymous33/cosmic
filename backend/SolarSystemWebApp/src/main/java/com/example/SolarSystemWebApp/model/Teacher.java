package com.example.SolarSystemWebApp.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;
import java.util.UUID;

@Data
@Document(collation = "Teachers")
@NoArgsConstructor
@AllArgsConstructor
public class Teacher {

    @Id
    private String id;
    private String name;

    @DBRef
    private List<Student> students;
}
