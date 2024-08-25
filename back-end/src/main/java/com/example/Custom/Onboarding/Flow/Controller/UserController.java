package com.example.Custom.Onboarding.Flow.Controller;

import com.example.Custom.Onboarding.Flow.Model.User;
import com.example.Custom.Onboarding.Flow.Model.UserProgressDTO;
import com.example.Custom.Onboarding.Flow.Service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;
import java.util.Map;
import java.util.Optional;


@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "https://onboarding-app-ashy.vercel.app", methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE})
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping("/create")
    public ResponseEntity<User> createUser(@RequestBody Map<String, String> credentials) {
        User user = userService.saveUser(credentials.get("email"), credentials.get("password"));
        return ResponseEntity.ok(user);
    }

    @PostMapping("/saveProgress")
    public ResponseEntity<User> saveProgress(@RequestBody UserProgressDTO request) {
        User user = userService.updateUserProgress(request.getSessionId(), request.getStep(), request.getFormData());
        return ResponseEntity.ok(user);
    }

    @PostMapping("/submit")
    public ResponseEntity<?> submitFormData(@RequestBody User user) {
        try {
            User savedUser = userService.saveFinalData(user);
            return ResponseEntity.ok(savedUser);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }

    @GetMapping("/progress/{sessionId}")
    public ResponseEntity<User> getProgress(@PathVariable String sessionId) {
        User user = userService.getUserBySessionId(sessionId);
        return ResponseEntity.ok(user);
    }

    @GetMapping
    public ResponseEntity<List<User>> getAllUsers() {
        List<User> users = userService.getAllUsers();
        return ResponseEntity.ok(users);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Optional<User>> getUserById(@PathVariable Long id) {
        Optional<User> user = userService.getUserById(id);
        return ResponseEntity.ok(user);
    }

}
