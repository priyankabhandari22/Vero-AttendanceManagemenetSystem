package com.college.attendance.controller;

import com.college.attendance.model.It;
import com.college.attendance.repository.ItRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/it-attendance")
public class ItController {

    private final ItRepository repo;

    public ItController(ItRepository repo) {
        this.repo = repo;
    }

    @PostMapping("/add")
    public ResponseEntity<It> addAttendance(@RequestBody It attendance) {
        try {
            if (attendance.getDate() == null) {
                attendance.setDate(LocalDate.now());
            }
            It saved = repo.save(attendance);
            return new ResponseEntity<>(saved, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping
    public List<It> getAllAttendance() {
        return repo.findAll();
    }

    @GetMapping("/date/{date}")
    public List<It> getByDate(@PathVariable String date) {
        LocalDate localDate = LocalDate.parse(date);
        return repo.findByDate(localDate);
    }

    @GetMapping("/filter")
    public List<It> getByYearAndSubject(@RequestParam String year, @RequestParam String subject) {
        return repo.findByYearAndSubject(year, subject);
    }

    @GetMapping("/attendance")
    public List<It> getByYear(@RequestParam String year) {
        return repo.findByYear(year);
    }
}
