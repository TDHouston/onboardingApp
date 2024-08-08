package com.example.Custom.Onboarding.Flow.Repository;

import com.example.Custom.Onboarding.Flow.Model.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {
}
