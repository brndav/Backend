CREATE DATABASE  IF NOT EXISTS `congreso_bd` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `congreso_bd`;
-- MySQL dump 10.13  Distrib 8.0.38, for Win64 (x86_64)
--
-- Host: localhost    Database: congreso_bd
-- ------------------------------------------------------
-- Server version	8.0.39

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `detalles_evento`
--

DROP TABLE IF EXISTS `detalles_evento`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `detalles_evento` (
  `id_detalles_evento` int NOT NULL AUTO_INCREMENT,
  `id_evento` int DEFAULT NULL,
  `id_imagen` int DEFAULT NULL,
  `titulo` varchar(255) DEFAULT NULL,
  `descripcion` text,
  PRIMARY KEY (`id_detalles_evento`),
  KEY `id_evento` (`id_evento`),
  KEY `fk_id_imagen` (`id_imagen`),
  CONSTRAINT `detalles_evento_ibfk_1` FOREIGN KEY (`id_evento`) REFERENCES `evento` (`id_evento`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_id_imagen` FOREIGN KEY (`id_imagen`) REFERENCES `imagenes` (`id_imagen`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `detalles_evento`
--

LOCK TABLES `detalles_evento` WRITE;
/*!40000 ALTER TABLE `detalles_evento` DISABLE KEYS */;
INSERT INTO `detalles_evento` VALUES (1,3,3,'¿Quienes somos?','La Sociedad Mexicana de Ingenería en Tecnologías de la Información, Mecatrónica y Telemática tuvo sus orígenes en el siglo pasado, en la década de los setentas, cuando se aglutinaron diferentes grupos dedicados principalmente al estudio de Superficies, donde los principales Centros de Investigación establecidos en la Ciudad de México se destacaron por su impulso a estas actividades. Promoviendo el uso, desarrollo, difusión y divulgación de la Ciencia y Tecnología de la Ingeniería en Sistemas Computacionles, Informatica, Mecatrónica e Industrial y en Electronica.'),(2,5,3,'objetivo','Generar un espacio para que los estudiantes, profesores, investigadores y empresarios de las ingenieras afines a los Sistemas Computacionales, Mecatrónica y Telemática intercambien sus ideas en el desarrollo de Proyectos Tecnológicos e investigación y en la generación de redes académicas. Asimismo, poner aprueba y en práctica sus competencias en el desarrollo de robots y dar solución a problemas de las ciencias básicas mediante el uso de la programación.'),(3,1,NULL,'oooooooo','oooooooo'),(4,1,NULL,'Objetivo','Fomentar el intercambio de conocimientos, experiencias y avances en el campo de la Inteligencia Artificial, promoviendo la colaboración entre académicos, investigadores, profesionales de la industria y estudiantes. El congreso busca explorar aplicaciones innovadoras, discutir retos éticos y técnicos, e impulsar el desarrollo de soluciones basadas en IA que generen impacto positivo en la sociedad y contribuyan al progreso científico y tecnológico global.'),(5,1,2,'Descripcion','El Congreso de Inteligencia Artificial es un evento internacional que reúne a expertos, investigadores, estudiantes y profesionales de diversas disciplinas para explorar las tendencias más recientes, los avances tecnológicos y las aplicaciones prácticas de la inteligencia artificial. Durante el evento, se llevarán a cabo conferencias magistrales, paneles de discusión, talleres interactivos y exposiciones de proyectos innovadores.');
/*!40000 ALTER TABLE `detalles_evento` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-06-06 16:57:47
