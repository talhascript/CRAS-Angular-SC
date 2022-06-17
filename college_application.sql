-- phpMyAdmin SQL Dump
-- version 4.5.1
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: Feb 28, 2021 at 05:10 AM
-- Server version: 10.1.10-MariaDB
-- PHP Version: 5.6.19

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `college_application`
--

-- --------------------------------------------------------

--
-- Table structure for table `application`
--

CREATE TABLE `application` (
  `applicationID` int(11) NOT NULL,
  `applicationDate` datetime NOT NULL,
  `processedDate` datetime DEFAULT NULL,
  `studentID` int(11) NOT NULL,
  `roomID` int(11) NOT NULL,
  `status` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `application`
--

INSERT INTO `application` (`applicationID`, `applicationDate`, `processedDate`, `studentID`, `roomID`, `status`) VALUES
(1, '2021-01-14 14:04:19', NULL, 1, 1, 'pending');

-- --------------------------------------------------------

--
-- Table structure for table `college`
--

CREATE TABLE `college` (
  `collegeID` int(11) NOT NULL,
  `collegeName` varchar(255) NOT NULL,
  `address` varchar(255) NOT NULL,
  `addedDate` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `college`
--

INSERT INTO `college` (`collegeID`, `collegeName`, `address`, `addedDate`) VALUES
(1, 'KTDI', 'Jalan ABC', '2021-01-11 14:23:50'),
(2, 'KTHO', 'Jalan DEF', '2021-01-11 20:31:02'),
(3, 'KTR', 'Jalan GHI', '2021-01-11 20:31:02'),
(4, 'KRP', 'Jalan GGG', '2021-01-12 01:05:19');

-- --------------------------------------------------------

--
-- Table structure for table `room`
--

CREATE TABLE `room` (
  `roomID` int(11) NOT NULL,
  `roomName` varchar(255) NOT NULL,
  `collegeID` int(11) NOT NULL,
  `addedDate` datetime NOT NULL,
  `roomType` varchar(255) NOT NULL,
  `activated` tinyint(1) NOT NULL DEFAULT '1',
  `capacity` int(11) NOT NULL,
  `occupied` int(11) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `room`
--

INSERT INTO `room` (`roomID`, `roomName`, `collegeID`, `addedDate`, `roomType`, `activated`, `capacity`, `occupied`) VALUES
(1, '201', 1, '2021-01-11 14:26:31', 'Single without Toilet', 1, 1, 1),
(2, '301', 1, '2021-01-11 20:47:21', 'Single with Toilet', 1, 1, 0),
(3, '202', 2, '2021-01-12 01:33:03', 'Double', 1, 2, 0),
(4, '303', 3, '2021-01-12 01:33:26', 'Single without Toilet', 1, 1, 0),
(5, '401', 1, '2021-01-13 12:06:34', 'Double', 1, 2, 0);

-- --------------------------------------------------------

--
-- Table structure for table `student`
--

CREATE TABLE `student` (
  `studentID` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `matricNo` varchar(255) NOT NULL,
  `imagePath` varchar(255) NOT NULL DEFAULT 'default.png',
  `application` int(11) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `student`
--

INSERT INTO `student` (`studentID`, `name`, `matricNo`, `imagePath`, `application`) VALUES
(1, 'User 1', 'user111', 'default.png', 1);

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `userID` int(11) NOT NULL,
  `username` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `salt` varchar(255) NOT NULL,
  `addedDate` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `userType` varchar(255) NOT NULL DEFAULT 'student',
  `studentID` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`userID`, `username`, `email`, `password`, `salt`, `addedDate`, `userType`, `studentID`) VALUES
(1, 'admin', 'admin@admin.com', 'c61f53871cb8ca8fa7dea34340d50e14694353bd26b9e88c721ba849aaa1b9f3fec21301d8576b385a28e116a3a66c08887450719f3658640b3d43a00b995347', 'PIYTrVQjjKTmQEIUb3jLt0enNSAQb1', '2021-01-11 11:54:08', 'admin', NULL),
(2, 'user1', 'user1@hotmail.com', '6d8c93c2634685d21068db3e0d70c246414695461a2007a2a9f745ebdcca90eda7dfa27bd762a6143070dcb86245e1ea7e04b954b6ead3a48fb337be289c3d57', 'dD0ruzYKOEUTZe9LlrozIieChSEUeX', '2021-01-11 18:42:21', 'student', 1);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `application`
--
ALTER TABLE `application`
  ADD PRIMARY KEY (`applicationID`);

--
-- Indexes for table `college`
--
ALTER TABLE `college`
  ADD PRIMARY KEY (`collegeID`);

--
-- Indexes for table `room`
--
ALTER TABLE `room`
  ADD PRIMARY KEY (`roomID`);

--
-- Indexes for table `student`
--
ALTER TABLE `student`
  ADD PRIMARY KEY (`studentID`),
  ADD UNIQUE KEY `matricNo` (`matricNo`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`userID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `application`
--
ALTER TABLE `application`
  MODIFY `applicationID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT for table `college`
--
ALTER TABLE `college`
  MODIFY `collegeID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
--
-- AUTO_INCREMENT for table `room`
--
ALTER TABLE `room`
  MODIFY `roomID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
--
-- AUTO_INCREMENT for table `student`
--
ALTER TABLE `student`
  MODIFY `studentID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `userID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
