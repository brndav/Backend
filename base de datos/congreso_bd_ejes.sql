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
-- Table structure for table `ejes`
--

DROP TABLE IF EXISTS `ejes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ejes` (
  `id_eje` int NOT NULL AUTO_INCREMENT,
  `descripcion_eje` varchar(300) NOT NULL,
  PRIMARY KEY (`id_eje`)
) ENGINE=InnoDB AUTO_INCREMENT=44 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ejes`
--

LOCK TABLES `ejes` WRITE;
/*!40000 ALTER TABLE `ejes` DISABLE KEYS */;
INSERT INTO `ejes` VALUES (1,'Aplicaciones en instrumentacion'),(2,'Control y telecomunicaciones'),(3,'Mecánica de fluidos'),(4,'Transferencia de calor'),(5,'Sistemas de eficiencia energética'),(6,'Sistemas de energías renovables'),(7,'Fenómenos de transporte'),(8,'Planes de Negocios '),(9,'Evaluacion financiera de negocios '),(10,'Marco legal de las organizaciones'),(11,'Materiales inteligentes y nanomateriales'),(12,'Materiales aeronáuticos'),(13,'Aerodinámica'),(14,'Percepción remota'),(15,'Manufactura'),(16,'Propulsión '),(17,'Administración y gestión de la tecnología '),(18,'Enfoques y mecanismos innovadores para la solución de problematicas regionales, estatales y nacionales '),(19,'Ingeniería y sociedad'),(20,'Innovación en las MyPYME'),(21,'Productividad científica y tecnológica '),(22,'Diseño de sistemas de información '),(23,'Minería de datos'),(24,'Analítica de datos y big data'),(25,'Algoritmos de inteligencia artificial'),(26,'Redes de comunicaciones'),(27,'Aplicación de algoritmos de optimización'),(28,'Soluciones basadas en tecnologías emergentes'),(29,'Aplicaciones metaheurísticas para el diseño y optimización en ingeniería'),(30,'Biomecánica'),(31,'Neurociencias'),(32,'Bioinformática e inteligencia artificial'),(33,'Medicinas Tradicionales y/o complementarias'),(34,'Generación de nuevos fármacos '),(35,'Biología Molecular'),(36,'Minisumo'),(37,'Megasumo'),(38,'Velocista'),(39,'Busqueda y rescate'),(40,'Dron'),(41,'Seguidor de linea'),(42,'Ciberseguridad');
/*!40000 ALTER TABLE `ejes` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-06-06 16:57:46
