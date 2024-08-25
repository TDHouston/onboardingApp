package com.example.Custom.Onboarding.Flow.Model;

import lombok.Data;

@Data
public class UserProgressDTO {

    private String sessionId;
    private int step;
    private String formData;
}
