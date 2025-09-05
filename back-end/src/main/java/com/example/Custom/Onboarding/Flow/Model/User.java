package com.example.Custom.Onboarding.Flow.Model;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "user", uniqueConstraints = {@UniqueConstraint(columnNames = "email")})
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true)
    private String sessionId;

    @Column(unique = true, nullable = false)
    private String email;

    private String password;
    private String aboutMe;
    private String street;
    private String city;
    private String state;
    private String zipCode;
    private String birthDate;
    private String formData;
    private int currentStep;

    // Custom getter to display placeholder instead of actual password hash
    public String getPassword() {
        return this.password != null ? "••••••••" : null;
    }

    // Method to get the actual password hash (for authentication)
    public String getActualPassword() {
        return this.password;
    }

}
