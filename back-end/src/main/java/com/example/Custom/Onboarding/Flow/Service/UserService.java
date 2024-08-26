package com.example.Custom.Onboarding.Flow.Service;

import com.example.Custom.Onboarding.Flow.Model.User;
import com.example.Custom.Onboarding.Flow.Repository.UserRepository;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.IOException;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.UUID;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Transactional
    public User findOrCreateUser(String email, String password) {
        Optional<User> existingUser = userRepository.findByEmail(email);
        return existingUser.orElseGet(() -> saveUser(email, password));
    }

    public User getUserBySessionId(String sessionId) {
        return userRepository.findBySessionId(sessionId)
                .orElseThrow(() -> new RuntimeException("User not found"));
    }

    public User getUserByEmail(String email) {
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found with email: " + email));
    }

    public User updateUserProgress(String sessionId, int step, String formData) {
        User user = getUserBySessionId(sessionId);
        user.setCurrentStep(step);
        user.setFormData(formData);
        return userRepository.save(user);
    }

    public User saveFinalData(User user) {
        Optional<User> existingUser = userRepository.findBySessionId(user.getSessionId());

        if (existingUser.isPresent()) {
            User userToUpdate = existingUser.get();

            userToUpdate.setEmail(user.getEmail());
            userToUpdate.setPassword(user.getPassword());
            userToUpdate.setBirthDate(user.getBirthDate());
            userToUpdate.setAboutMe(user.getAboutMe());
            userToUpdate.setStreet(user.getStreet());
            userToUpdate.setCity(user.getCity());
            userToUpdate.setState(user.getState());
            userToUpdate.setZipCode(user.getZipCode());

            userToUpdate.setFormData(user.getFormData());

            return userRepository.save(userToUpdate);
        } else {
            throw new RuntimeException("User not found with session ID: " + user.getSessionId());
        }
    }

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    public Optional<User> getUserById(Long id) {
        return userRepository.findById(id);
    }

    private Map<String, String> parseFormData(String formData) {
        ObjectMapper objectMapper = new ObjectMapper();
        try {
            return objectMapper.readValue(formData, new TypeReference<Map<String, String>>() {});
        } catch (JsonProcessingException e) {
            throw new RuntimeException("Error parsing formData", e);
        }
    }

    private User saveUser(String email, String password) {
        User user = new User();
        user.setEmail(email);
        user.setPassword(password);
        user.setSessionId(UUID.randomUUID().toString());
        user.setCurrentStep(0);
        return userRepository.save(user);
    }
}
