package com.college.attendance.controller;

import com.college.attendance.model.Student;
import com.college.attendance.repository.StudentRepository;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/student")
@CrossOrigin(origins = "http://localhost:5173") // React frontend
public class StudentController {

    private final StudentRepository repo;

    public StudentController(StudentRepository repo) {
        this.repo = repo;
    }

    @GetMapping
    public List<Student> getAllStudents() {
        return repo.findAll();
    }

    @PostMapping("/register")
    public Student addStudent(@RequestBody Student student) {
        return repo.save(student);
    }

    @PostMapping("/login")
    public ResponseEntity<?> loginStudent(@RequestBody Student student) {
        Optional<Student> foundUser = repo.findByEmailAndPassword(student.getEmail(), student.getPassword());

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


    // Request DTO for department and class
    public static class StudentFilterRequest {
        private String department;
        private String _class;

        // Constructors
        public StudentFilterRequest() {}

        public StudentFilterRequest(String department, String _class) {
            this.department = department;
            this._class = _class;
        }

        // Getters and Setters
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

        // Getters
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
            // Validate request
            if (filterRequest.getDepartment() == null || filterRequest.getDepartment().trim().isEmpty()) {
                return ResponseEntity.badRequest().body("Department is required");
            }

            if (filterRequest.get_class() == null || filterRequest.get_class().trim().isEmpty()) {
                return ResponseEntity.badRequest().body("Class is required");
            }

            // Get students from repository
            List<Student> students = repo.findByDepartmentAndClass(
                    filterRequest.getDepartment(),
                    filterRequest.get_class()
            );

            // Convert to response DTO with only name and uid
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
