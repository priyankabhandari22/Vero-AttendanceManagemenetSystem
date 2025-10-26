package com.college.attendance.repository;


import org.springframework.data.jpa.repository.JpaRepository;
import com.college.attendance.model.Faculty;

import java.util.Optional;

public interface FacultyRepository extends JpaRepository<Faculty, Long> {
    Optional<Faculty> findByEmailAndPassword(String email, String password);
}
