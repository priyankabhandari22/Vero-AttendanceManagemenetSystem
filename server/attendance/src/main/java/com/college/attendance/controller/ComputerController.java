package com.college.attendance.controller;

import com.college.attendance.model.Computer;
import com.college.attendance.repository.ComputerRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/computer-attendance")
@CrossOrigin(origins = "http://localhost:5173") // Allow React frontend
public class ComputerController {

    private final ComputerRepository repo;

    public ComputerController(ComputerRepository repo) {
        this.repo = repo;
    }

    // ✅ Add new attendance record
    @PostMapping("/add")
    public ResponseEntity<Computer> addAttendance(@RequestBody Computer attendance) {
        try {
            // If date is not provided, use current date
            if (attendance.getDate() == null) {
                attendance.setDate(LocalDate.now());
            }

            Computer saved = repo.save(attendance);
            return new ResponseEntity<>(saved, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // ✅ Get all attendance records
    @GetMapping
    public List<Computer> getAllAttendance() {
        return repo.findAll();
    }

    // ✅ Get attendance by date
    @GetMapping("/date/{date}")
    public List<Computer> getByDate(@PathVariable String date) {
        LocalDate localDate = LocalDate.parse(date);
        return repo.findByDate(localDate);
    }

    // ✅ Get attendance by year and subject
    @GetMapping("/filter")
    public List<Computer> getByYearAndSubject(@RequestParam String year, @RequestParam String subject) {
        return repo.findByYearAndSubject(year, subject);
    }

    // ✅ Get attendance by year
    @GetMapping("/attendance")
    public List<Computer> getByYear(@RequestParam String year) {
        return repo.findByYear(year);
    }


}
