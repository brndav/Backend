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
-- Table structure for table `usuarios`
--

DROP TABLE IF EXISTS `usuarios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usuarios` (
  `idusuario` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(45) DEFAULT NULL,
  `paterno` varchar(255) DEFAULT NULL,
  `materno` varchar(255) DEFAULT NULL,
  `telefono` varchar(10) DEFAULT NULL,
  `correo` varchar(45) DEFAULT NULL,
  `contrasena` varchar(255) DEFAULT NULL,
  `id_institucion` int DEFAULT NULL,
  PRIMARY KEY (`idusuario`),
  KEY `id_institucion` (`id_institucion`) USING BTREE,
  CONSTRAINT `usuarios_ibfk_1` FOREIGN KEY (`id_institucion`) REFERENCES `institucions` (`id_institucion`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=49 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuarios`
--

LOCK TABLES `usuarios` WRITE;
/*!40000 ALTER TABLE `usuarios` DISABLE KEYS */;
INSERT INTO `usuarios` VALUES (4,'Angel','Huitron',' Alvarez','553919852','luishye.com.mx','34937595',4),(33,'Brenda','Arteaga','Vazquez','5532449987','brenda@gmail.com','Peluss',3),(34,'Null','LALA','Moon','553224478','nella@gmail.com','Peluss',7),(35,'Lidia','Vazquez','Dianzo','5532447793','lidia@gmail.com','Pelus',5),(36,'monica','cervantes','hernandez','6655778800','monica@18tese.edu','$2a$10$sYJk60xiZXS1sqJlEPnTxeOU56hf08Ca9G1yq13kdBM8eezv3LccW',3),(37,'pruebas','pr','pr','5529345126','p@tese.edu.mx','$2a$10$04jFsNc5sR.UxZBKdSkjnO4lVo2QzGk.MF3XwLcPbRaJGjnzBfNHW',4),(38,'Monica','Cervantes ','Hernandez','1231231234','mon@tese.edu.mx','$2a$10$FP6s4irJdyRmNLZBoMFZ9uPVzK7Hi0Jr1epP7UW1buNv1m.oKMh7e',4),(39,'Andrea','Marroquin','Galicia','5522558899','andreag@tese.edu.mx','$2a$10$hf.tCq.LVXsKaF.1Ai08F.Cj9nmOTi.4mdGAapx9kulGMHIAwH2AC',3),(40,'Griselda','Cortes','Barrera','5566789865','cortesg@tese.edu.mx','$2a$10$qnXuGhsvy8BuycyJorQ3m.Ob/Mw.loTI1B.Rfi6S7fGVrbyrZlakC',3),(41,'Edgar ','Corona','Organiche','5544227788','edgarce@tese.edu.mx','$2a$10$bw/TVmxIzIvQT8hK.l.pueAAtzX7JL0yevmAZBEZ8Lt1Mh/e.oS5y',5),(42,'Mercedes','Flores ','Flores','5577880022','mercedesff@tese.edu.mx','$2a$10$vTrnCkFFZj1eMc1tqT.8JuDRwVkOE2UJpABSXPsgOWrn5qL.sYvq.',3),(44,'Jazmin','Cervantes','Loza','5566778899','jaz@tese.edu.mx','nala1234',8),(45,'Valeria','Justo','Hernandez','5566778899','valeria@tese.edu.mx','$2a$10$WoOS5gMUvbjyJljyVYC0Aecmo298GcQE5Ri/A1utB.6.lKyoNnEkS',3),(46,'lolis','Cervantes','Hernandez','5566778855','mon@tese.edu.mx','$2a$10$hl6zqWTZcpGlNGUte/bH5.RX/7X.ftdshiBjkxCbBUB7QF18XT72q',8),(47,'jjjjj','jjjjj','hhhhh','5566776655','mon','$2a$10$Uph.4nF7YI0ENe/R7fyVm./7PkNWyqUr3v6nbyANCZZMqdHhqfdre',7),(48,'Brenda','Arteaga','Vazquez ','5515789648','arteagavbrenda@gmail.com','$2a$10$j7p9YXY4AzbN5k1wsxdfyOKLNHIaV91znK6neyDBG9gfOlQqDOwwi',3);
/*!40000 ALTER TABLE `usuarios` ENABLE KEYS */;
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
