package com.college.attendance.controller;

import com.college.attendance.model.Student;
import com.college.attendance.repository.StudentRepository;
import org.springframework.http.*;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/student")
public class StudentController {

    private final StudentRepository repo;
    private final PasswordEncoder passwordEncoder;

    public StudentController(StudentRepository repo, PasswordEncoder passwordEncoder) {
        this.repo = repo;
        this.passwordEncoder = passwordEncoder;
    }

    @GetMapping
    public List<Student> getAllStudents() {
        return repo.findAll();
    }

    @PostMapping("/register")
    public ResponseEntity<?> addStudent(@RequestBody Student student) {
        try {
            if (!repo.findByEmail(student.getEmail()).isEmpty()) {
                return ResponseEntity.status(HttpStatus.CONFLICT).body("Email already registered");
            }
            student.setPassword(passwordEncoder.encode(student.getPassword()));
            Student saved = repo.save(student);
            return ResponseEntity.ok(saved);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error during registration: " + e.getMessage());
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> loginStudent(@RequestBody Student student) {
        var students = repo.findByEmail(student.getEmail());

        if (!students.isEmpty() && passwordEncoder.matches(student.getPassword(), students.get(0).getPassword())) {
            return ResponseEntity.ok(students.get(0));
        } else {
            return ResponseEntity
                    .status(HttpStatus.UNAUTHORIZED)
                    .body("Invalid email or password");
        }
    }

    // Request DTO for department and class
    public static class StudentFilterRequest {
        private String department;
        private String _class;

        public StudentFilterRequest() {}

        public StudentFilterRequest(String department, String _class) {
            this.department = department;
            this._class = _class;
        }

        public String getDepartment() {
            return department;
        }

        public void setDepartment(String department) {
            this.department = department;
        }

        public String get_class() {
            return _class;
        }

        public void set_class(String _class) {
            this._class = _class;
        }
    }

    // Response DTO for only name and uid
    public static class StudentResponse {
        private String name;
        private String uid;

        public StudentResponse(String name, String uid) {
            this.name = name;
            this.uid = uid;
        }

        public String getName() {
            return name;
        }

        public String getUid() {
            return uid;
        }
    }

    // Get students by department and class
    @PostMapping("/by-department-class")
    public ResponseEntity<?> getStudentsByDepartmentAndClass(@RequestBody StudentFilterRequest filterRequest) {
        try {
            if (filterRequest.getDepartment() == null || filterRequest.getDepartment().trim().isEmpty()) {
                return ResponseEntity.badRequest().body("Department is required");
            }

            if (filterRequest.get_class() == null || filterRequest.get_class().trim().isEmpty()) {
                return ResponseEntity.badRequest().body("Class is required");
            }

            List<Student> students = repo.findByDepartmentAndClass(
                    filterRequest.getDepartment(),
                    filterRequest.get_class()
            );

            List<StudentResponse> studentResponses = students.stream()
                    .map(student -> new StudentResponse(student.getName(), student.getUid()))
                    .collect(Collectors.toList());

            return ResponseEntity.ok(studentResponses);

        } catch (Exception e) {
            return ResponseEntity.internalServerError()
                    .body("Error fetching students: " + e.getMessage());
        }
    }

    @DeleteMapping("/{id}")
    public void deleteStudent(@PathVariable Long id) {
        repo.deleteById(id);
    }
}
