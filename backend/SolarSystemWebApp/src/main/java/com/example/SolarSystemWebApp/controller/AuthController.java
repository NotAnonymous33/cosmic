package com.example.SolarSystemWebApp.controller;

import com.example.SolarSystemWebApp.communication.AuthRequest;
import com.example.SolarSystemWebApp.communication.AuthResponse;
import com.example.SolarSystemWebApp.communication.StudentData;
import com.example.SolarSystemWebApp.model.Student;
import com.example.SolarSystemWebApp.security.TokenProvider;
import com.example.SolarSystemWebApp.service.StudentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    private StudentService service;

    @Autowired
    private AuthenticationManager manager;

    @Autowired
    private TokenProvider tokenProvider;

    @Autowired
    private UserDetailsService userDetailsService;

    @PostMapping("/student_login")
    public ResponseEntity<AuthResponse> studentLogin(@RequestBody AuthRequest request) {
        UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(request.getUsername(), request.getPassword());
        try {
            manager.authenticate(authenticationToken);
        } catch (BadCredentialsException exception) {
            throw new BadCredentialsException("Invalid credentials", exception);
        }
        UserDetails details = userDetailsService.loadUserByUsername(request.getUsername());

        String token = tokenProvider.generateToken(details);

        AuthResponse response = AuthResponse.builder()
                .token(token)
                .username(details.getUsername())
                .build();

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @PostMapping("/new_student")
    public Student addStudent(@RequestBody StudentData data) {
        return service.newStudent(data);
    }
}
