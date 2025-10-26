package com.college.attendance.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "admin")

public class Admin {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    // This will map to your existing admin_key column
    @Column(name = "admin_key")
    private String adminKey;
    private String email;
    private String password;
}
