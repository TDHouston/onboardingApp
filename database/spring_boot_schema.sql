-- Schema for Spring Boot with PhysicalNamingStrategyStandardImpl
-- This uses exact entity names as table names (no snake_case conversion)

CREATE DATABASE IF NOT EXISTS `onboarding_db`;
USE `onboarding_db`;

-- Clean up any existing tables
DROP TABLE IF EXISTS `component_config`;
DROP TABLE IF EXISTS `ComponentConfig`;
DROP TABLE IF EXISTS `user`;
DROP TABLE IF EXISTS `User`;

-- Create ComponentConfig table (exact entity name)
CREATE TABLE `ComponentConfig` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `componentName` varchar(255) DEFAULT NULL,
  `pageNumber` int NOT NULL,
  `position` int NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Create User table (exact entity name)  
CREATE TABLE `User` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `aboutMe` varchar(255) DEFAULT NULL,
  `birthDate` varchar(255) DEFAULT NULL,
  `city` varchar(255) DEFAULT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) DEFAULT NULL,
  `state` varchar(255) DEFAULT NULL,
  `street` varchar(255) DEFAULT NULL,
  `zipCode` varchar(255) DEFAULT NULL,
  `sessionId` varchar(255) DEFAULT NULL,
  `currentStep` int NOT NULL DEFAULT 0,
  `formData` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UKob8kqyqqgmefl0aco34akdtpe` (`email`),
  UNIQUE KEY `UKophda205vq9cxal92hgv1fgif` (`sessionId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;