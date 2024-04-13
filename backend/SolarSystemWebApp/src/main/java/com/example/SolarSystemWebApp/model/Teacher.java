package com.example.SolarSystemWebApp.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.List;
import java.util.UUID;

@Data
@Document(collection = "Teachers")
@NoArgsConstructor
@AllArgsConstructor
public class Teacher {

    @Id
    private String id;
    private String name;
    private String email;
    private String password;

    private List<Student> students;
}
