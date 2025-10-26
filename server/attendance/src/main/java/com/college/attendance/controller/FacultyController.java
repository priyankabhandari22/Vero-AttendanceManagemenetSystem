package com.college.attendance.controller;

import com.college.attendance.model.Faculty;
import com.college.attendance.model.Student;
import com.college.attendance.repository.FacultyRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/faculty")
@CrossOrigin(origins = "http://localhost:5174") // Allow React frontend
public class FacultyController {

    private final FacultyRepository repo;

    public FacultyController(FacultyRepository repo) {
        this.repo = repo;
    }

    // ✅ Get all faculty
    @GetMapping
    public List<Faculty> getAllFaculty() {
        return repo.findAll();
    }

    // ✅ Add new faculty
    @PostMapping("/register")
    public Faculty addFaculty(@RequestBody Faculty faculty) {
        return repo.save(faculty);


    }

//login
    @PostMapping("/login")
    public ResponseEntity<?> loginFaculty(@RequestBody Faculty faculty) {
        Optional<Faculty> foundUser = repo.findByEmailAndPassword(faculty.getEmail(), faculty.getPassword());

        if (foundUser.isPresent()) {
            // Return user object with 200 OK
            return ResponseEntity.ok(foundUser.get());
        } else {
            // Return message with 401 Unauthorized
            return ResponseEntity
                    .status(HttpStatus.UNAUTHORIZED)
                    .body("Invalid email or password");
        }
    }

    // ✅ Delete faculty by ID
    @DeleteMapping("/{id}")
    public void deleteFaculty(@PathVariable Long id) {
        repo.deleteById(id);
    }
}
