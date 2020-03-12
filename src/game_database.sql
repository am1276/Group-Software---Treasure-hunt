-- phpMyAdmin SQL Dump
-- version 4.9.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: Mar 12, 2020 at 07:21 AM
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
-- Table structure for table `gameconfigs`
--

DROP TABLE IF EXISTS `gameconfigs`;
CREATE TABLE IF NOT EXISTS `gameconfigs` (
  `MarkerID` int(11) NOT NULL AUTO_INCREMENT,
  `Latitude` varchar(100) NOT NULL,
  `Longitude` varchar(100) NOT NULL,
  `Type` varchar(10) NOT NULL,
  `Title` varchar(100) NOT NULL,
  `GameName` varchar(100) NOT NULL,
  PRIMARY KEY (`MarkerID`)
) ENGINE=MyISAM AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `passwords`
--

DROP TABLE IF EXISTS `passwords`;
CREATE TABLE IF NOT EXISTS `passwords` (
  `PasswordID` int(11) NOT NULL AUTO_INCREMENT,
  `OneTimePassword` varchar(7) NOT NULL,
  `GameName` varchar(100) NOT NULL,
  PRIMARY KEY (`PasswordID`)
) ENGINE=MyISAM AUTO_INCREMENT=161 DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `players`
--

DROP TABLE IF EXISTS `players`;
CREATE TABLE IF NOT EXISTS `players` (
  `PlayerID` int(11) NOT NULL AUTO_INCREMENT,
  `PlayerName` varchar(100) NOT NULL,
  `Score` int(11) NOT NULL DEFAULT 0,
  `OneTimePassword` varchar(7) NOT NULL,
  PRIMARY KEY (`PlayerID`)
) ENGINE=MyISAM AUTO_INCREMENT=36 DEFAULT CHARSET=latin1;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
