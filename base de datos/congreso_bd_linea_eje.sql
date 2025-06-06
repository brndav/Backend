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
-- Table structure for table `linea_eje`
--

DROP TABLE IF EXISTS `linea_eje`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `linea_eje` (
  `id_linea_eje` int NOT NULL AUTO_INCREMENT,
  `id_linea` int DEFAULT NULL,
  `id_eje` int NOT NULL,
  PRIMARY KEY (`id_linea_eje`),
  KEY `id_eje` (`id_eje`),
  KEY `id_linea` (`id_linea`),
  CONSTRAINT `id_eje` FOREIGN KEY (`id_eje`) REFERENCES `ejes` (`id_eje`),
  CONSTRAINT `id_linea` FOREIGN KEY (`id_linea`) REFERENCES `lineas` (`id_linea`)
) ENGINE=InnoDB AUTO_INCREMENT=42 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `linea_eje`
--

LOCK TABLES `linea_eje` WRITE;
/*!40000 ALTER TABLE `linea_eje` DISABLE KEYS */;
INSERT INTO `linea_eje` VALUES (1,1,1),(2,1,2),(3,3,4),(4,3,5),(5,3,6),(6,3,7),(7,4,8),(8,4,9),(9,4,10),(10,5,11),(11,5,12),(12,5,13),(13,5,14),(14,5,15),(15,5,16),(16,6,17),(17,6,18),(18,6,19),(19,6,20),(20,6,21),(21,7,22),(22,7,23),(23,7,24),(24,7,25),(25,7,26),(26,7,27),(27,7,28),(28,7,29),(29,8,30),(30,8,31),(31,8,32),(32,8,33),(33,8,34),(34,8,35),(35,9,36),(36,9,37),(37,9,38),(38,9,39),(39,9,40),(40,9,41),(41,10,42);
/*!40000 ALTER TABLE `linea_eje` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-06-06 16:57:48
