package com.example.Custom.Onboarding.Flow.Model;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "component_config")
public class ComponentConfig {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String componentName;
    private int pageNumber;
    private int position;

}
