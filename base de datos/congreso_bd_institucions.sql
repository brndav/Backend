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
-- Table structure for table `institucions`
--

DROP TABLE IF EXISTS `institucions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `institucions` (
  `id_institucion` int NOT NULL AUTO_INCREMENT,
  `nombreinst` varchar(500) DEFAULT NULL,
  `logo` text,
  `link` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id_institucion`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `institucions`
--

LOCK TABLES `institucions` WRITE;
/*!40000 ALTER TABLE `institucions` DISABLE KEYS */;
INSERT INTO `institucions` VALUES (1,'UPIICSA – Unidad Profesional Interdisciplinaria','https://upload.wikimedia.org/wikipedia/commons/2/20/Instituto_Polit%C3%A9cnico_Nacional.png','https://www.upiicsa.ipn.mx/'),(2,'Facultad de Estudios Superiores Aragón UNAM','https://upload.wikimedia.org/wikipedia/commons/c/ca/Escudo-UNAM-escalable.svg','https://www.aragon.unam.mx/fes-aragon/#!/inicio'),(3,'TECNOLÓGICO DE ESTUDIOS SUPERIORES DE ECATEPEC','https://upload.wikimedia.org/wikipedia/commons/9/92/Logo_tese.jpg','https://www.tese.edu.mx/tese2020/'),(4,'Tecnológico de Monterrey','https://upload.wikimedia.org/wikipedia/commons/4/47/Logo_del_ITESM.svg','https:tec.mx'),(5,'Tecnológico de Estudios Superiores de Chimalhuacán','https://drive.google.com/file/d/19aMsB45RloWnFSbE9UrPm_CFjBy8cdP2/view?usp=drive_link','https:teschi.mx'),(6,'Instituto Tecnológico de Zitácuaro','https://drive.google.com/uc?export=view&id=1cY94L_Z3iu6aMTBHbn4tU4tbY5AqK1uO','https://zitacuaro.tecnm.mx/'),(7,'TecNM - Tecnológico de Estudios Superiores de Coacalco','https://drive.google.com/uc?export=view&id=1n52ZW9KEuyHEIR38sSSmxHZwS4o3jEFr','https://www.tecnologicodecoacalco.edu.mx/TESCO/INI'),(8,'Centro Universitario San Buenaventura','https://upload.wikimedia.org/wikipedia/commons/2/20/USB_Logo.svg','https://usb.edu.co/'),(9,'Universidad Estatal de Valle de Ecatepec','https://drive.google.com/uc?export=view&id=1FdcqU0WbMOkdiRE3oGdRQC-jtyrU0hKV','https://www.uneve.edu.mx/'),(10,'UAM Azcapotzalco - Universidad Autónoma Metropolitana','https://upload.wikimedia.org/wikipedia/commons/4/44/Logo_de_la_UAM-A.svg','https://www.azc.uam.mx/');
/*!40000 ALTER TABLE `institucions` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-06-06 16:57:45
