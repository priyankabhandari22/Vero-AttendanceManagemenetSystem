package com.college.attendance.controller;

import com.college.attendance.model.Faculty;
import com.college.attendance.repository.FacultyRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/faculty")
public class FacultyController {

    private final FacultyRepository repo;
    private final PasswordEncoder passwordEncoder;

    public FacultyController(FacultyRepository repo, PasswordEncoder passwordEncoder) {
        this.repo = repo;
        this.passwordEncoder = passwordEncoder;
    }

    @GetMapping
    public List<Faculty> getAllFaculty() {
        return repo.findAll();
    }

    @PostMapping("/register")
    public ResponseEntity<?> addFaculty(@RequestBody Faculty faculty) {
        try {
            if (!repo.findByEmail(faculty.getEmail()).isEmpty()) {
                return ResponseEntity.status(HttpStatus.CONFLICT).body("Email already registered");
            }
            faculty.setPassword(passwordEncoder.encode(faculty.getPassword()));
            Faculty saved = repo.save(faculty);
            return ResponseEntity.ok(saved);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error during registration: " + e.getMessage());
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> loginFaculty(@RequestBody Faculty faculty) {
        var facs = repo.findByEmail(faculty.getEmail());

        if (!facs.isEmpty() && passwordEncoder.matches(faculty.getPassword(), facs.get(0).getPassword())) {
            return ResponseEntity.ok(facs.get(0));
        } else {
            return ResponseEntity
                    .status(HttpStatus.UNAUTHORIZED)
                    .body("Invalid email or password");
        }
    }

    @DeleteMapping("/{id}")
    public void deleteFaculty(@PathVariable Long id) {
        repo.deleteById(id);
    }
}
