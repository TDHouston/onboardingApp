package com.example.Custom.Onboarding.Flow.Service;

import com.example.Custom.Onboarding.Flow.Model.User;
import com.example.Custom.Onboarding.Flow.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public User saveUser(User user) {
        return userRepository.save(user);
    }

    public List<User> getAllUsers() {
       return userRepository.findAll();
    }

    public Optional<User> getUserById(Long id) {
        return userRepository.findById(id);
    }

    public User updateUser(Long id, User userDetails) {
        Optional<User> userToUpdate = userRepository.findById(id);

        if (userToUpdate.isPresent()) {
            User user = userToUpdate.get();

            user.setEmail(userDetails.getEmail());
            user.setPassword(userDetails.getPassword());
            user.setAboutMe(userDetails.getAboutMe());
            user.setStreet(userDetails.getStreet());
            user.setCity(userDetails.getCity());
            user.setState(userDetails.getState());
            user.setZipCode(userDetails.getZipCode());
            user.setBirthDate(userDetails.getBirthDate());
            return userRepository.save(user);

        } else {
            // Handle the case where the user is not found, e.g., throw an exception or return null
            throw new RuntimeException("User not found with id: " + id);
        }
    }


    public void deleteUser(Long id) {
        Optional<User> userOptional = userRepository.findById(id);

        if (userOptional.isPresent()) {
            User user = userOptional.get();
            userRepository.delete(user);
        }
    }
}
