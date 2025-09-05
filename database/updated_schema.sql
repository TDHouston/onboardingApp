-- Updated schema to match Spring Boot naming conventions (snake_case)
CREATE DATABASE IF NOT EXISTS `onboarding_db` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */;
USE `onboarding_db`;

-- Clean up any existing tables with old names
DROP TABLE IF EXISTS `ComponentConfig`;
DROP TABLE IF EXISTS `User`;

-- Table structure for table `component_config` (Spring Boot naming convention)
DROP TABLE IF EXISTS `component_config`;
CREATE TABLE `component_config` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `component_name` varchar(255) DEFAULT NULL,
  `page_number` int NOT NULL,
  `position` int NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Table structure for table `user` (Spring Boot naming convention)
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `about_me` varchar(255) DEFAULT NULL,
  `birth_date` varchar(255) DEFAULT NULL,
  `city` varchar(255) DEFAULT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) DEFAULT NULL,
  `state` varchar(255) DEFAULT NULL,
  `street` varchar(255) DEFAULT NULL,
  `zip_code` varchar(255) DEFAULT NULL,
  `session_id` varchar(255) DEFAULT NULL,
  `current_step` int NOT NULL DEFAULT 0,
  `form_data` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UKob8kqyqqgmefl0aco34akdtpe` (`email`),
  UNIQUE KEY `UKophda205vq9cxal92hgv1fgif` (`session_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;