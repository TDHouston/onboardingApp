package com.example.Custom.Onboarding.Flow.Model;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(uniqueConstraints = {@UniqueConstraint(columnNames = "email")})
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

}
