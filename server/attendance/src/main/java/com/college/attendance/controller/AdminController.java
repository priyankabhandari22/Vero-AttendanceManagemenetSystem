package com.college.attendance.controller;

import com.college.attendance.model.Admin;
import com.college.attendance.model.Student;
import com.college.attendance.repository.AdminRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/admin")
@CrossOrigin(origins = "http://localhost:5173") // Allow React frontend

public class AdminController {
    // Dummy admin key for registration
    private static final String VALID_ADMIN_KEY = "ADMIN12345";

    private final AdminRepository repo;

    public AdminController(AdminRepository repo) {
        this.repo = repo;
    }

    // ✅ Get all faculty
    @GetMapping
    public List<Admin> getAllAdmin() {
        return repo.findAll();
    }

    // ✅ Register new admin with key validation
    @PostMapping("/register")
    public ResponseEntity<?> addAdmin(@RequestBody Admin admin) {
        try {
            // Check if admin key is provided and valid
            if (admin.getAdminKey() == null || admin.getAdminKey().trim().isEmpty()) {
                return ResponseEntity
                        .status(HttpStatus.BAD_REQUEST)
                        .body("Admin key is required");
            }

            // Validate the admin key
            if (!admin.getAdminKey().equals(VALID_ADMIN_KEY)) {
                return ResponseEntity
                        .status(HttpStatus.UNAUTHORIZED)
                        .body("Invalid admin key");
            }

            // Check if email already exists
            if (repo.findByEmail(admin.getEmail()).isPresent()) {
                return ResponseEntity
                        .status(HttpStatus.CONFLICT)
                        .body("Email already registered");
            }



            // Save the admin
            Admin savedAdmin = repo.save(admin);
            return ResponseEntity.ok(savedAdmin);

        } catch (Exception e) {
            return ResponseEntity
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error during registration: " + e.getMessage());
        }
    }

    //login
    @PostMapping("/login")
    public ResponseEntity<?> loginAdmin(@RequestBody Admin admin) {
        Optional<Admin> foundUser = repo.findByEmailAndPassword(admin.getEmail(), admin.getPassword());

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
    public void deleteAdmin(@PathVariable Long id) {
        repo.deleteById(id);
    }
}
