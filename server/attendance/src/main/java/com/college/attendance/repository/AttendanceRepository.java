package com.college.attendance.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.college.attendance.model.Attendance;

public interface AttendanceRepository extends JpaRepository<Attendance, Long> {
}
