package com.example.Custom.Onboarding.Flow.Repository;

import com.example.Custom.Onboarding.Flow.Model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findBySessionId(String sessionId);
    Optional<User> findByEmail(String email);
}
