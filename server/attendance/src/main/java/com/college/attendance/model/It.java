package com.college.attendance.model;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDate;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "it_attendance")
public class It {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // Attendance date
    private LocalDate date;

    // e.g. "First Year", "Second Year", "Third Year"
    private String year;

    // Subject name
    private String subject;

    // Comma-separated list of student IDs (e.g. "1,2,5,8")
    @Column(length = 1000)
    private String studentsPresent;
}
