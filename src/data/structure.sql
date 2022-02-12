-- MySQL dump 10.13  Distrib 5.5.62, for Win64 (AMD64)
--
-- Host: localhost    Database: backendchallengealkemytadeog
-- ------------------------------------------------------
-- Server version	5.5.5-10.4.22-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `characters`
--

DROP TABLE IF EXISTS `characters`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `characters` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  `age` int(11) NOT NULL,
  `weight` float NOT NULL,
  `story` text NOT NULL,
  `image` varchar(255) NOT NULL,
  `deleted` tinyint(4) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `characters`
--

LOCK TABLES `characters` WRITE;
/*!40000 ALTER TABLE `characters` DISABLE KEYS */;
INSERT INTO `characters` VALUES (1,'Harry Potter',14,50.5,'The boy who lived','Harry-potter.jpg',0),(2,'Ron Weasley',11,65,'Harry Potter`s best friend','Ron-Weasley.jpg',0),(3,'Sam Winchester',23,90,'Brother of Dean','Sam-Winchester.jpg',0),(4,'Dean Winchester',29,85,'Brother of Sam','Dean-Winchester.jpg',0),(5,'Hermione Granger',11,50,'The cleverest girl in Hogwarts, and Harry Potter`s Best Friend','Hermione-Granger.jpg',0),(6,'Draco Malfoy',11,50,'Harry Potter`s Number one enemie','',0);
/*!40000 ALTER TABLE `characters` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `genres`
--

DROP TABLE IF EXISTS `genres`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `genres` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `image` varchar(255) NOT NULL,
  `deleted` tinyint(4) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `genres`
--

LOCK TABLES `genres` WRITE;
/*!40000 ALTER TABLE `genres` DISABLE KEYS */;
INSERT INTO `genres` VALUES (1,'Fantasy','fantasy_world.jpg',0),(2,'Horror','horror.png',0);
/*!40000 ALTER TABLE `genres` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `moviesseries`
--

DROP TABLE IF EXISTS `moviesseries`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `moviesseries` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(100) NOT NULL,
  `date` date NOT NULL,
  `rating` int(11) NOT NULL,
  `image` varchar(255) NOT NULL,
  `deleted` tinyint(4) NOT NULL,
  `type` tinyint(4) NOT NULL,
  `fkGenre` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `moviesseries_FK` (`fkGenre`),
  CONSTRAINT `moviesseries_FK` FOREIGN KEY (`fkGenre`) REFERENCES `genres` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `moviesseries`
--

LOCK TABLES `moviesseries` WRITE;
/*!40000 ALTER TABLE `moviesseries` DISABLE KEYS */;
INSERT INTO `moviesseries` VALUES (1,'Harry Potter And The Philosopher´s Stone','2001-11-29',5,'hp1.jpg',0,0,1),(2,'Harry Potter and the Chamber of Secrets','2002-11-28',5,'hp2.jpg',0,0,1),(3,'Harry Potter and the Prisoner of Azkaban','2004-06-03',4,'hp3.jpg',0,0,1),(4,'Supernatural','2005-09-13',5,'supernatural.jpg',0,1,2);
/*!40000 ALTER TABLE `moviesseries` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `moviesseriescharacters`
--

DROP TABLE IF EXISTS `moviesseriescharacters`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `moviesseriescharacters` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `fkCharacter` int(11) NOT NULL,
  `fkMovieSerie` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `moviesSeriesCharacters_FK` (`fkCharacter`),
  KEY `moviesSeriesCharacters_FK_1` (`fkMovieSerie`),
  CONSTRAINT `moviesSeriesCharacters_FK` FOREIGN KEY (`fkCharacter`) REFERENCES `characters` (`id`),
  CONSTRAINT `moviesSeriesCharacters_FK_1` FOREIGN KEY (`fkMovieSerie`) REFERENCES `moviesseries` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `moviesseriescharacters`
--

LOCK TABLES `moviesseriescharacters` WRITE;
/*!40000 ALTER TABLE `moviesseriescharacters` DISABLE KEYS */;
INSERT INTO `moviesseriescharacters` VALUES (1,1,1),(2,1,2),(3,2,1),(4,2,2),(5,2,3),(6,3,4),(7,4,4),(11,5,1),(12,5,2),(13,5,3),(14,1,3);
/*!40000 ALTER TABLE `moviesseriescharacters` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `email` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `deleted` tinyint(4) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (5,'test@gmail.com','$2a$10$K4.mLo3HOQqW7uf/4/6EH.5EFxLlSRJaNUGqwIW0.UJPOHU3/YmqK',0),(6,'testBcrypt@gmail.com','$2a$10$9eUj5omBDuXIMTYYss6jg./Ec30yXlwyTLvYB4iX1ttjCFT6p.FP2',0),(7,'test2@gmail.com','$2a$10$p92PvRnz8sXKtPAKqjV/IOy5B33D9xDo8sDx4CPbKxvCA2Am1EMZ.',0),(9,'test3@gmail.com','$2a$10$VEv5/K4RNNWnDQ0Epuxfvu6Q1qNb4WelrDcTOoh8HBGyZYPMuwhi6',0),(10,'tadeogavensky.email@gmail.com','$2a$10$nNUWFDdiNRmz5tiP4hWkaO9l3lSp4egDRw6VpXW40l/V84tYI/n0e',0),(11,'tadeogaven01@gmail.com','$2a$10$4hOg1NVNiyiMX6bukNj32OPf3ozj8Xj0wS3Gswcri8IqV26bgqR.O',0);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping routines for database 'backendchallengealkemytadeog'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-02-12 19:04:50
