package com.college.attendance.repository;

import com.college.attendance.model.Computer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface ComputerRepository extends JpaRepository<Computer, Long> {

    // ✅ Find all attendance records for a given date
    List<Computer> findByDate(LocalDate date);

    // ✅ Find attendance by year (e.g., "First Year")
    List<Computer> findByYear(String year);

    // ✅ Find attendance by subject (e.g., "Computer Networks")
    List<Computer> findBySubject(String subject);

    // ✅ Find attendance by year and subject
    List<Computer> findByYearAndSubject(String year, String subject);

}
