package com.college.attendance.repository;


import org.springframework.data.jpa.repository.JpaRepository;
import com.college.attendance.model.Admin;

import java.util.List;
import java.util.Optional;

public interface AdminRepository extends JpaRepository<Admin, Long> {
    Optional<Admin> findByEmailAndPassword(String email, String password);
    List<Admin> findByEmail(String email);
}
