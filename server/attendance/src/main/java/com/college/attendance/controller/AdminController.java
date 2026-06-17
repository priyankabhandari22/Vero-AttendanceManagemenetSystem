package com.college.attendance.controller;

import com.college.attendance.model.Admin;
import com.college.attendance.repository.AdminRepository;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/admin")
public class AdminController {

    @Value("${admin.registration.key}")
    private String validAdminKey;

    private final AdminRepository repo;
    private final PasswordEncoder passwordEncoder;

    public AdminController(AdminRepository repo, PasswordEncoder passwordEncoder) {
        this.repo = repo;
        this.passwordEncoder = passwordEncoder;
    }

    @GetMapping
    public List<Admin> getAllAdmin() {
        return repo.findAll();
    }

    @PostMapping("/register")
    public ResponseEntity<?> addAdmin(@RequestBody Admin admin) {
        try {
            if (admin.getAdminKey() == null || admin.getAdminKey().trim().isEmpty()) {
                return ResponseEntity
                        .status(HttpStatus.BAD_REQUEST)
                        .body("Admin key is required");
            }

            if (!admin.getAdminKey().equals(validAdminKey)) {
                return ResponseEntity
                        .status(HttpStatus.UNAUTHORIZED)
                        .body("Invalid admin key");
            }

            if (!repo.findByEmail(admin.getEmail()).isEmpty()) {
                return ResponseEntity
                        .status(HttpStatus.CONFLICT)
                        .body("Email already registered");
            }

            admin.setPassword(passwordEncoder.encode(admin.getPassword()));
            Admin savedAdmin = repo.save(admin);
            return ResponseEntity.ok(savedAdmin);

        } catch (Exception e) {
            return ResponseEntity
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error during registration: " + e.getMessage());
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> loginAdmin(@RequestBody Admin admin) {
        var admins = repo.findByEmail(admin.getEmail());

        if (!admins.isEmpty() && passwordEncoder.matches(admin.getPassword(), admins.get(0).getPassword())) {
            return ResponseEntity.ok(admins.get(0));
        } else {
            return ResponseEntity
                    .status(HttpStatus.UNAUTHORIZED)
                    .body("Invalid email or password");
        }
    }

    @DeleteMapping("/{id}")
    public void deleteAdmin(@PathVariable Long id) {
        repo.deleteById(id);
    }
}
