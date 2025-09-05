-- Create required tables for the onboarding application
-- Run this in MySQL Workbench or your MySQL client

USE onboarding_db;

-- Create ComponentConfig table
CREATE TABLE IF NOT EXISTS `ComponentConfig` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `componentName` varchar(255) DEFAULT NULL,
  `pageNumber` int NOT NULL,
  `position` int NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Create User table with all required fields
CREATE TABLE IF NOT EXISTS `User` (
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
  UNIQUE KEY `email_unique` (`email`),
  UNIQUE KEY `session_id_unique` (`sessionId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Verify tables were created
SHOW TABLES;