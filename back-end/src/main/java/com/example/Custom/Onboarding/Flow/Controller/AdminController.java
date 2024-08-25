package com.example.Custom.Onboarding.Flow.Controller;

import com.example.Custom.Onboarding.Flow.Model.ComponentConfig;
import com.example.Custom.Onboarding.Flow.Service.AdminService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;


@RestController
@RequestMapping("/api/admin")
public class AdminController {

    @Autowired
    private AdminService adminService;

    @PostMapping("/components")
    public ResponseEntity<ComponentConfig> createComponentConfig(@RequestBody ComponentConfig config) {
        ComponentConfig newcComponentConfig = adminService.saveComponentConfig(config);
        return ResponseEntity.ok(newcComponentConfig);
    }

    @GetMapping("/components")
    public ResponseEntity<List<ComponentConfig>> getAllComponentConfig() {
        List<ComponentConfig> componentConfigs = adminService.getAllComponentConfigs();
        return ResponseEntity.ok(componentConfigs);
    }

    @GetMapping("/components/{id}")
    public ResponseEntity<Optional<ComponentConfig>> getComponentConfigById(@PathVariable Long id) {
        Optional<ComponentConfig> configOptional = adminService.getComponentConfigById(id);
        return ResponseEntity.ok(configOptional);
    }

    @PutMapping("/components/{id}")
    public ResponseEntity<ComponentConfig> updateComponentConfig(@PathVariable Long id, @RequestBody ComponentConfig configDetails) {
        ComponentConfig config = adminService.updateComponentConfig(id, configDetails);
        return ResponseEntity.ok(config);
    }

}
