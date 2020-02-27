-- phpMyAdmin SQL Dump
-- version 4.9.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: Feb 26, 2020 at 09:56 PM
-- Server version: 10.4.10-MariaDB
-- PHP Version: 7.3.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `mvpdb`
--

-- --------------------------------------------------------

--
-- Table structure for table `testmarkers`
--

DROP TABLE IF EXISTS `testmarkers`;
CREATE TABLE IF NOT EXISTS `testmarkers` (
  `MarkerID` int(11) NOT NULL AUTO_INCREMENT,
  `Latitude` varchar(100) NOT NULL,
  `Longitude` varchar(100) NOT NULL,
  `Type` varchar(10) NOT NULL,
  `Title` varchar(100) NOT NULL,
  `GameName` varchar(100) NOT NULL,
  PRIMARY KEY (`MarkerID`)
) ENGINE=MyISAM AUTO_INCREMENT=64 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `testmarkers`
--

INSERT INTO `testmarkers` (`MarkerID`, `Latitude`, `Longitude`, `Type`, `Title`, `GameName`) VALUES
(62, '50.73735725762112', '-3.5329411464325444', 'Main', 'Harrison', 'testgame'),
(63, '50.737099235965154', '-3.5371146636597173', 'Main', 'Tennis Courts', 'testgame'),
(61, '50.738063414884294', '-3.5307417350403325', 'Main', 'Innovation Centre', 'testgame'),
(60, '50.73544922176551', '-3.5338316398254888', 'Main', 'The Forum', 'testgame'),
(59, '50.736155407797725', '-3.5359666782013432', 'Main', 'Newman', 'testgame'),
(58, '50.735714042775356', '-3.5312459903351323', 'Main', 'Business School', 'testgame');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
