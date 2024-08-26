package com.example.Custom.Onboarding.Flow.Service;

import com.example.Custom.Onboarding.Flow.Model.ComponentConfig;
import com.example.Custom.Onboarding.Flow.Repository.ComponentConfigRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class AdminService {

    @Autowired
    private ComponentConfigRepository componentConfigRepository;

    public ComponentConfig saveComponentConfig(ComponentConfig config) {
        return componentConfigRepository.save(config);
    }

    public List<ComponentConfig> getAllComponentConfigs() {
        return componentConfigRepository.findAll();
    }

    public ComponentConfig getComponentConfigById(Long id) {
        return componentConfigRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Component Configuration not found with id: " + id));
    }

    public ComponentConfig updateComponentConfig(Long id, ComponentConfig configDetails) {
        ComponentConfig existingConfig = getComponentConfigById(id);

        existingConfig.setPageNumber(configDetails.getPageNumber());
        existingConfig.setComponentName(configDetails.getComponentName());
        existingConfig.setPosition(configDetails.getPosition());

        return componentConfigRepository.save(existingConfig);
    }

    @Transactional
    public void batchUpdateComponentConfig(List<ComponentConfig> newConfigs) {
        componentConfigRepository.deleteAll();

        for (ComponentConfig config : newConfigs) {
            componentConfigRepository.save(config);
        }

        validateComponentConfig();
    }

    public void deleteComponentConfig(Long id) {
        componentConfigRepository.deleteById(id);
        validateComponentConfig();
    }

    private void validateComponentConfig() {
        long step2Count = componentConfigRepository.countByPageNumber(2);
        long step3Count = componentConfigRepository.countByPageNumber(3);

        if (step2Count == 0 || step3Count == 0) {
            throw new RuntimeException("Each step must have at least one component assigned.");
        }
    }
}
