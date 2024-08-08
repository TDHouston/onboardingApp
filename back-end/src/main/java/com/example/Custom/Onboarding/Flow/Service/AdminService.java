package com.example.Custom.Onboarding.Flow.Service;

import com.example.Custom.Onboarding.Flow.Model.ComponentConfig;
import com.example.Custom.Onboarding.Flow.Repository.ComponentConfigRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

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

    public Optional<ComponentConfig> getComponentConfigById(Long id) {
        return componentConfigRepository.findById(id);
    }

    public ComponentConfig updateComponentConfig(Long id, ComponentConfig configDetails) {
        Optional<ComponentConfig> componentConfigOptional = componentConfigRepository.findById(id);

        if (componentConfigOptional.isPresent()) {
            ComponentConfig config = componentConfigOptional.get();

            config.setPageNumber(configDetails.getPageNumber());
            config.setComponentName(configDetails.getComponentName());

            return componentConfigRepository.save(config);
        } else {
            throw new RuntimeException("Component Configuration not found with id: " + id);
        }
    }

    public void deleteComponentConfig(Long id) {
        Optional<ComponentConfig> componentConfigOptional = componentConfigRepository.findById(id);
        componentConfigOptional.ifPresent(config -> componentConfigRepository.delete(config));
    }

}
