package com.college.attendance.repository;


import org.springframework.data.jpa.repository.JpaRepository;
import com.college.attendance.model.Admin;

import java.util.Optional;

public interface AdminRepository extends JpaRepository<Admin, Long> {
    Optional<Admin> findByEmailAndPassword(String email, String password);
    Optional<Admin> findByEmail(String email);
}
