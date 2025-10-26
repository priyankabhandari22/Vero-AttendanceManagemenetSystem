package com.college.attendance.repository;

import com.college.attendance.model.It;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface ItRepository extends JpaRepository<It, Long> {

    // ✅ Find all attendance records for a given date
    List<It> findByDate(LocalDate date);

    // ✅ Find attendance by year (e.g., "First Year")
    List<It> findByYear(String year);

    // ✅ Find attendance by subject (e.g., "Computer Networks")
    List<It> findBySubject(String subject);

    // ✅ Find attendance by year and subject
    List<It> findByYearAndSubject(String year, String subject);
}
