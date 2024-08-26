package com.example.Custom.Onboarding.Flow.Controller;

import com.example.Custom.Onboarding.Flow.Model.ComponentConfig;
import com.example.Custom.Onboarding.Flow.Service.AdminService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin")
public class AdminController {

    @Autowired
    private AdminService adminService;

    @PostMapping("/components")
    public ResponseEntity<ComponentConfig> createComponentConfig(@RequestBody ComponentConfig config) {
        ComponentConfig newComponentConfig = adminService.saveComponentConfig(config);
        return ResponseEntity.ok(newComponentConfig);
    }

    @GetMapping("/components")
    public ResponseEntity<List<ComponentConfig>> getAllComponentConfig() {
        List<ComponentConfig> componentConfigs = adminService.getAllComponentConfigs();
        return ResponseEntity.ok(componentConfigs);
    }

    @GetMapping("/components/{id}")
    public ResponseEntity<ComponentConfig> getComponentConfigById(@PathVariable Long id) {
        ComponentConfig config = adminService.getComponentConfigById(id);
        return ResponseEntity.ok(config);
    }

    @PutMapping("/components/{id}")
    public ResponseEntity<ComponentConfig> updateComponentConfig(@PathVariable Long id, @RequestBody ComponentConfig configDetails) {
        ComponentConfig updatedConfig = adminService.updateComponentConfig(id, configDetails);
        return ResponseEntity.ok(updatedConfig);
    }

    @PostMapping("/components/batchUpdate")
    public ResponseEntity<String> batchUpdateComponentConfig(@RequestBody List<ComponentConfig> configs) {
        adminService.batchUpdateComponentConfig(configs);
        return ResponseEntity.ok("Configurations updated successfully");
    }

    @DeleteMapping("/components/{id}")
    public ResponseEntity<Void> deleteComponentConfig(@PathVariable Long id) {
        adminService.deleteComponentConfig(id);
        return ResponseEntity.noContent().build();
    }
}
