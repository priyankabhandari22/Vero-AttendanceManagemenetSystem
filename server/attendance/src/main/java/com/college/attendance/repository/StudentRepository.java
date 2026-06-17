package com.college.attendance.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.college.attendance.model.Student;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface StudentRepository extends JpaRepository<Student, Long> {
    Optional<Student> findByEmailAndPassword(String email, String password);
    List<Student> findByEmail(String email);


    @Query("SELECT s FROM Student s WHERE s.department = :department AND s._class = :studentClass")
    List<Student> findByDepartmentAndClass(@Param("department") String department,
                                            @Param("studentClass") String studentClass);
}
