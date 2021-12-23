-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 23, 2021 at 04:52 AM
-- Server version: 10.4.21-MariaDB
-- PHP Version: 8.0.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `instaart`
--

-- --------------------------------------------------------

--
-- Table structure for table `admins`
--

CREATE TABLE `admins` (
  `id` int(11) NOT NULL,
  `username` varchar(15) NOT NULL,
  `password` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `admins`
--

INSERT INTO `admins` (`id`, `username`, `password`) VALUES
(1, 'admin', '$2y$10$sJhO673igjot7BuW/PibouV6xtxl1H1OCZ60sUXeR0pZDUorNC96K');

-- --------------------------------------------------------

--
-- Table structure for table `bookmark_posts`
--

CREATE TABLE `bookmark_posts` (
  `id` int(11) NOT NULL,
  `post_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `bookmark_posts`
--

INSERT INTO `bookmark_posts` (`id`, `post_id`, `user_id`) VALUES
(1, 5, 15),
(3, 7, 21),
(5, 11, 15),
(6, 6, 15),
(7, 19, 16),
(8, 20, 16),
(10, 9, 15);

-- --------------------------------------------------------

--
-- Table structure for table `categories`
--

CREATE TABLE `categories` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `categories`
--

INSERT INTO `categories` (`id`, `name`) VALUES
(1, 'Arsitektur'),
(3, 'Desain Grafis'),
(5, 'Desain Web'),
(11, 'Fashion'),
(13, 'Fotografi'),
(4, 'Ilustrasi'),
(12, 'Tipografi'),
(14, 'UI/UX');

-- --------------------------------------------------------

--
-- Table structure for table `colors`
--

CREATE TABLE `colors` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `colors`
--

INSERT INTO `colors` (`id`, `name`) VALUES
(11, 'Abu-Abu'),
(8, 'Biru'),
(10, 'Coklat'),
(7, 'Hijau'),
(4, 'Hitam'),
(2, 'Jingga'),
(3, 'Kuning'),
(1, 'Merah'),
(12, 'Merah Jambu'),
(6, 'Putih'),
(9, 'Ungu');

-- --------------------------------------------------------

--
-- Table structure for table `comments`
--

CREATE TABLE `comments` (
  `id` int(11) NOT NULL,
  `post_id` int(11) DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL,
  `body` text DEFAULT NULL,
  `date` datetime DEFAULT current_timestamp(),
  `type` varchar(10) NOT NULL DEFAULT 'comment'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `comments`
--

INSERT INTO `comments` (`id`, `post_id`, `user_id`, `body`, `date`, `type`) VALUES
(2, 6, 15, 'likee gaess wkwk', '2021-12-20 21:46:14', 'comment'),
(3, 6, 18, 'Anjayyy', '2021-12-20 22:19:32', 'comment'),
(4, 13, 15, 'elekk ee', '2021-12-20 22:39:30', 'comment'),
(5, 13, 20, 'hitz bous', '2021-12-20 22:48:33', 'comment'),
(6, 7, 21, 'Hiyahiyahiyaa', '2021-12-20 22:53:43', 'comment'),
(7, 15, 22, 'TES', '2021-12-21 03:23:00', 'comment'),
(14, 28, 28, 'Wah bagus', '2021-12-22 06:05:56', 'comment'),
(15, 9, 28, 'wah gambarnya pixelate', '2021-12-22 06:06:32', 'comment'),
(16, 7, 28, 'tes coba se', '2021-12-22 06:07:00', 'comment'),
(17, 6, 28, 'coba coba dulu, kalo minat nanti saya tambahi', '2021-12-22 06:07:24', 'comment'),
(18, 5, 28, 'kursinya kaya kursi IKEA', '2021-12-22 06:07:43', 'comment'),
(19, 9, 28, 'wah wah', '2021-12-22 06:08:41', 'comment'),
(20, 9, 28, 'ini komentar 1', '2021-12-22 06:08:49', 'comment'),
(21, 9, 28, 'ini komentar 2', '2021-12-22 06:08:54', 'comment'),
(22, 29, 15, 'ini pacar sayaaa', '2021-12-22 06:11:16', 'comment');

-- --------------------------------------------------------

--
-- Table structure for table `follows`
--

CREATE TABLE `follows` (
  `id` int(11) NOT NULL,
  `following_id` int(11) DEFAULT NULL,
  `follower_id` int(11) DEFAULT NULL,
  `date` datetime NOT NULL DEFAULT current_timestamp(),
  `type` varchar(10) NOT NULL DEFAULT 'follow'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `follows`
--

INSERT INTO `follows` (`id`, `following_id`, `follower_id`, `date`, `type`) VALUES
(1, 18, 15, '2021-12-20 22:18:45', 'follow'),
(3, 15, 18, '2021-12-20 22:20:24', 'follow'),
(4, 15, 20, '2021-12-20 22:38:18', 'follow'),
(5, 20, 15, '2021-12-20 22:39:36', 'follow'),
(7, 23, 15, '2021-12-21 10:27:21', 'follow'),
(10, 18, 16, '2021-12-21 18:46:10', 'follow'),
(13, 15, 16, '2021-12-21 19:12:25', 'follow'),
(14, 24, 25, '2021-12-21 20:06:21', 'follow'),
(15, 16, 15, '2021-12-22 01:32:01', 'follow'),
(16, 16, 15, '2021-12-22 01:32:02', 'follow'),
(17, 17, 15, '2021-12-22 05:50:08', 'follow'),
(18, 15, 28, '2021-12-22 06:08:00', 'follow'),
(19, 1, 28, '2021-12-22 06:08:08', 'follow'),
(20, 28, 1, '2021-12-22 06:12:36', 'follow');

-- --------------------------------------------------------

--
-- Table structure for table `jobs`
--

CREATE TABLE `jobs` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `province_id` int(11) NOT NULL,
  `province_name` varchar(100) NOT NULL,
  `city_id` int(11) NOT NULL,
  `city_name` varchar(100) NOT NULL,
  `title` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `work_type` varchar(255) NOT NULL,
  `shift` varchar(255) NOT NULL,
  `form_link` varchar(255) NOT NULL,
  `is_accepted` varchar(255) NOT NULL DEFAULT 'pending'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `likes`
--

CREATE TABLE `likes` (
  `id` int(11) NOT NULL,
  `post_id` int(11) DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL,
  `date` datetime NOT NULL DEFAULT current_timestamp(),
  `type` varchar(255) NOT NULL DEFAULT 'like'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `likes`
--

INSERT INTO `likes` (`id`, `post_id`, `user_id`, `date`, `type`) VALUES
(2, 6, 15, '2021-12-22 06:19:34', 'like'),
(3, 5, 15, '2021-12-22 06:19:34', 'like'),
(4, 7, 15, '2021-12-22 06:19:34', 'like'),
(5, 9, 15, '2021-12-22 06:19:34', 'like'),
(6, 8, 18, '2021-12-22 06:19:34', 'like'),
(7, 12, 15, '2021-12-22 06:19:34', 'like'),
(8, 8, 15, '2021-12-22 06:19:34', 'like'),
(10, 9, 18, '2021-12-22 06:19:34', 'like'),
(12, 6, 18, '2021-12-22 06:19:34', 'like'),
(13, 5, 18, '2021-12-22 06:19:34', 'like'),
(14, 13, 15, '2021-12-22 06:19:34', 'like'),
(15, 9, 21, '2021-12-22 06:19:34', 'like'),
(16, 6, 21, '2021-12-22 06:19:34', 'like'),
(24, 11, 15, '2021-12-22 06:19:34', 'like'),
(25, 25, 15, '2021-12-22 06:19:34', 'like'),
(26, 24, 15, '2021-12-22 06:19:34', 'like'),
(27, 22, 15, '2021-12-22 06:19:34', 'like'),
(29, 21, 15, '2021-12-22 06:19:34', 'like'),
(31, 6, 28, '2021-12-22 06:19:34', 'like'),
(33, 5, 28, '2021-12-22 06:19:34', 'like'),
(34, 28, 28, '2021-12-22 06:19:34', 'like');

-- --------------------------------------------------------

--
-- Table structure for table `posts`
--

CREATE TABLE `posts` (
  `id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `category_id` int(11) NOT NULL,
  `color_id` int(11) NOT NULL,
  `title` varchar(100) NOT NULL,
  `caption` text DEFAULT NULL,
  `image` varchar(25) DEFAULT NULL,
  `date` datetime DEFAULT current_timestamp(),
  `insight` int(11) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `posts`
--

INSERT INTO `posts` (`id`, `user_id`, `category_id`, `color_id`, `title`, `caption`, `image`, `date`, `insight`) VALUES
(4, 17, 4, 2, 'Cartoon', 'Cartoon ', '61c07d58bf0bb.jpg', '2021-12-20 20:55:52', 6),
(5, 15, 1, 10, 'FOG', 'FOG adalah tentang kemurnian interior kontemporer, tentang gaya dan keabadian, tentang tren dan kenyamanan. Sebuah proyek di mana kami ingin mencoba sesuatu yang baru, menikmati kesederhanaan dan menciptakan harmoni, bekerja dengan material dan cahaya.\n\nMinimalisme, yang menonjol dengan detail modern, bahan alami â€“ memberikan suasana umum pada apartemen. FOG benar-benar terjadi ketika kita menyayikan kenyamanan, bukan menggunakan kata-kata tetapi solusi dan kepraktisan.', '61c0831610963.jpg', '2021-12-20 21:20:22', 13),
(6, 15, 4, 9, '8D Musik', 'Ilustrasi untuk artikel tentang musik 8D', '61c0846d70675.jpg', '2021-12-20 21:26:05', 26),
(7, 15, 4, 9, 'Ilustrasi di alam', 'Ini adalah kumpulan ilustrasi yang ada di alam', '61c086965879d.jpg', '2021-12-20 21:35:18', 13),
(8, 18, 11, 8, '&quot;REWORKING&quot; collection', 'Prototypes from my &quot;REWORKING&quot; collection (Pattern-made and sewn by hand) * the prototypes were selected to show at ALTAMODA fashion week AW18 ini Rome, italy and won the spesial prize for the best pattern-making in fashion design contest for young designer 27th edition in Rome among other 800 contestants. ', '61c086bc87769.jpg', '2021-12-20 21:35:56', 12),
(9, 15, 14, 9, 'Schedule Event App', 'Saya harap kalian menyukai desain saya', '61c088bff2a4b.jpg', '2021-12-20 21:44:32', 16),
(11, 18, 11, 4, 'Fall-winter', 'Fall-winter 2019/2020 in Russian', '61c08e0951d23.jpg', '2021-12-20 22:07:05', 20),
(12, 18, 4, 10, ' na Jaemin', 'Ilustrasi na Jaemin pelayan cafe 7 dream', '61c08fcfcd440.jpg', '2021-12-20 22:14:39', 14),
(13, 20, 11, 4, 'Model OOTD', '', '61c095068cba7.jpg', '2021-12-20 22:36:54', 14),
(14, 19, 5, 3, 'Portofolio design', 'Portofolio design template with yellow and gray accents ', '61c097906ba3b.jpg', '2021-12-20 22:47:44', 2),
(15, 22, 5, 10, 'Test123', 'TEST123', '61c0d80224c4d.png', '2021-12-21 03:22:42', 7),
(18, 26, 4, 11, 'Badut kehidupan', '', '61c17c527980f.jpeg', '2021-12-21 15:03:46', 1),
(19, 16, 4, 8, 'Poster', 'Poster aplikasi InstaArt', '61c1abf6cc9b3.png', '2021-12-21 18:27:02', 3),
(20, 16, 14, 8, 'Desain UI InstaArt', 'Desain ui aplikasi InstaArt', '61c1ad3578e56.jpg', '2021-12-21 18:32:21', 4),
(21, 16, 1, 3, 'Desain Interior ', 'Desain arsitektur interior ruang kerja', '61c1ae438ead2.png', '2021-12-21 18:36:51', 4),
(22, 16, 4, 1, 'Sosis', 'Desain sosis', '61c1aed019e30.jpg', '2021-12-21 18:39:12', 2),
(23, 16, 4, 11, 'Wallpaper', 'Wallpaper abstrak ', '61c1b00691fd0.jpg', '2021-12-21 18:44:22', 1),
(24, 16, 3, 12, 'Desain Logo', 'Desain logo', '61c1b0f1abf74.png', '2021-12-21 18:48:17', 3),
(25, 16, 4, 7, 'Wallpaper Alam', 'Walpaper alam', '61c1b16acabeb.png', '2021-12-21 18:50:18', 1),
(27, 17, 5, 6, 'E-Commerce ', 'Desain Layout ', '61c1d1964e218.png', '2021-12-21 21:07:35', 2),
(28, 1, 5, 8, 'Ani-Time', 'Sebuah aplikasi progresif berbasis web yang berisi list detail anime, pengguna bisa menambah atau menghapus anime dari list pengguna itu sendiri.', '61c200b02f61c.png', '2021-12-22 00:28:32', 33),
(29, 28, 3, 4, 'PACAR', 'INI PACAR SIAPA???', '61c250e18049b.jpg', '2021-12-22 06:10:41', 7);

-- --------------------------------------------------------

--
-- Table structure for table `post_images`
--

CREATE TABLE `post_images` (
  `id` int(11) NOT NULL,
  `post_id` int(11) NOT NULL,
  `image` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `post_images`
--

INSERT INTO `post_images` (`id`, `post_id`, `image`) VALUES
(1, 9, '61c088bff2a4b.jpg\r'),
(2, 8, '61c086bc87769.jpg\r'),
(3, 7, '61c086965879d.jpg\r'),
(4, 6, '61c0846d70675.jpg\r'),
(5, 5, '61c0831610963.jpg\r'),
(6, 4, '61c07d58bf0bb.jpg\r'),
(7, 29, '61c250e18049b.jpg\r'),
(8, 28, '61c200b02f61c.png\r'),
(9, 27, '61c1d1964e218.png\r'),
(10, 25, '61c1b16acabeb.png\r'),
(11, 24, '61c1b0f1abf74.png\r'),
(12, 23, '61c1b00691fd0.jpg\r'),
(13, 22, '61c1aed019e30.jpg\r'),
(14, 21, '61c1ae438ead2.png\r'),
(15, 20, '61c1ad3578e56.jpg\r'),
(16, 19, '61c1abf6cc9b3.png\r'),
(17, 18, '61c17c527980f.jpeg\r'),
(18, 15, '61c0d80224c4d.png\r'),
(19, 14, '61c097906ba3b.jpg\r'),
(20, 13, '61c095068cba7.jpg\r'),
(21, 12, '61c08fcfcd440.jpg\r'),
(22, 11, '61c08e0951d23.jpg');

-- --------------------------------------------------------

--
-- Table structure for table `recovery_tokens`
--

CREATE TABLE `recovery_tokens` (
  `id` int(11) NOT NULL,
  `token` varchar(255) NOT NULL,
  `user_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `tokens`
--

CREATE TABLE `tokens` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `token` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `tokens`
--

INSERT INTO `tokens` (`id`, `user_id`, `token`) VALUES
(7, 1, '61bdf2b4a3025'),
(8, 14, '61bdfd4c7c38a'),
(14, 1, '61bf1633ab27f'),
(15, 1, '61bf1cfb4d6a3'),
(16, 16, '61bf267fc5eaa'),
(20, 17, '61c07828c8789'),
(21, 15, '61c07df2cbe08'),
(27, 19, '61c09237f4169'),
(28, 20, '61c0934a8bf11'),
(29, 21, '61c097bedb67b'),
(31, 23, '61c104c3f19cb'),
(33, 25, '61c128767c3e9'),
(34, 15, '61c13b1ae04c9'),
(35, 15, '61c13c546a13d'),
(36, 15, '61c1747607891'),
(45, 16, '61c1b063f0f39'),
(46, 16, '61c1b57310206'),
(47, 1, '61c1bcd748425'),
(49, 25, '61c1c30833adc'),
(57, 15, '61c24ec62c8fd'),
(58, 28, '61c24f8ff3722'),
(59, 1, '61c2506854b79'),
(60, 28, '61c254e109c06'),
(61, 28, '61c25525559f9'),
(63, 15, '61c25d04d8cbc'),
(65, 24, '61c260347c696');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(15) NOT NULL,
  `password` varchar(255) NOT NULL,
  `display_name` varchar(35) NOT NULL,
  `biodata` text NOT NULL,
  `image` varchar(25) NOT NULL DEFAULT 'default_user.png',
  `email` varchar(35) NOT NULL,
  `province_id` int(11) NOT NULL,
  `province_name` varchar(100) NOT NULL,
  `city_id` int(11) NOT NULL,
  `city_name` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `password`, `display_name`, `biodata`, `image`, `email`, `province_id`, `province_name`, `city_id`, `city_name`) VALUES
(1, 'yusril-adr', '$2y$10$zluCqKU6wiAhSku9Orugk.S5V4FFg6CrKysV2kYp.iagMUfwtwmV2', 'Yusril A. P.', 'Just a normal person.', '1.jpg', 'yusriladr.212@gmail.com', 35, 'Jawa Timur', 3578, 'Kota Surabaya'),
(14, 'bennyganteng', '$2y$10$Y6irZeMKBuRF0PpGYBqmfuqMOu.Ut6e5TwFdewzVlc8RztLMLj2ja', 'Benny Hasto Pakarti', 'Im Alone', '61bdfe05bf445.jpg', 'bennyhastopakarti11@gmail.com', 35, 'Jawa Timur', 3524, 'Kabupaten Lamongan'),
(15, 'alvani_f', '$2y$10$Xkce6MxcevAO6s9gagD.YuaUqTejJIjhe8sylV4zo.cOBIHjWI8S.', 'Alvani Fahrizal Wira Utama', 'Selamat datang di portofolioku', '61c071f8a3fe0.jpeg', 'alvaniutama09@gmail.com', 35, 'Jawa Timur', 3578, 'Kota Surabaya'),
(16, 'ruben', '$2y$10$y83ereTD9X33BUFlBhXOw.FkCaoYXarT95tJ6GxzzIOvGMnY8SxCK', 'Ruben Emanuel', 'hello world', '61c1afa909e84.jpg', 'rubenemmanuel2000w@gmail.com', 35, 'Jawa Timur', 3519, 'Kabupaten Madiun'),
(17, 'kmskjn', '$2y$10$oyzoJvD2bW4UtmQXy5Y4OeV1v7lsmz/lUxMJQOOlMAHuWrw1nRIsG', 'Kim seokjin', 'ê¹€ì„ì§„', 'default_user.png', 'kmskjn50@gmail.com', 35, 'Jawa Timur', 3578, 'Kota Surabaya'),
(18, 'saviormadread', '$2y$10$rrOvyBScfiuM9frmoNHkzeUmAPQFSXFjIE2nDQC6Fwzhgw5GUcxpq', 'Savior madread', '', '61c08e7bc9257.jpg', 'shasmithaflora@gmail.com', 35, 'Jawa Timur', 3515, 'Kabupaten Sidoarjo'),
(19, 'nicholobelius', '$2y$10$YdLggSUwJz5r5OW/6gM/teRWKNcfyjOfO8T7dyYU/zXo.JIsSRK2y', 'Nicholas obelius', '', 'default_user.png', 'nicholasobelius@gmail.com', 35, 'Jawa Timur', 3578, 'Kota Surabaya'),
(20, 'mitha', '$2y$10$6QQsHGFVHJnOTR0hvgB18uSX8A1HvBnOnsSf./kadjteFHI./V9x6', 'Priyamitha Ayu', '', 'default_user.png', 'priyamithasaff@gmail.com', 35, 'Jawa Timur', 3578, 'Kota Surabaya'),
(21, 'bejo_30', '$2y$10$CM5gjG9B3io.oh95fN7eBOM0KdlhWpEO0/uEMtwpQ1PDgSqTjRSoO', 'Ahmad bejo santoso', 'Just an ordinary boy', 'default_user.png', 'uripbejo674@gmail.com', 35, 'Jawa Timur', 3515, 'Kabupaten Sidoarjo'),
(22, 'abdcfu123', '$2y$10$RieqKpojWyJ7Xwkv2EoiW.7E8ONNaV.w8ZYOg/nCF/nMVjiNAA6Q6', 'Test 123', 'data dummy123', 'default_user.png', 'abcdfu123@gmail.com', 32, 'Jawa Barat', 3210, 'Kabupaten Majalengka'),
(23, 'dwimahdareta', '$2y$10$OnuGap/GQweVq4iiN0M.D.n0fNRd69umqSx.NBKaplk1nr7nMPFVa', 'Yanuar Dwi Mahdareta', 'Aku imut dan menggemaskan', 'default_user.png', 'dwimahdareta@gmail.com', 35, 'Jawa Timur', 3515, 'Kabupaten Sidoarjo'),
(24, 'hayre', '$2y$10$wQ8xtmKs4Dhgnr7Nhhrx1OIFnopRDL8ckQdIq7Njred2fyWV9vSfC', 'coba', '', '61c124a4b74c3.jpg', 'coba@gmail.com', 35, 'Jawa Timur', 3519, 'Kabupaten Madiun'),
(25, 'tes', '$2y$10$mwsDLgPhiVi61GPsjWETEu.wF1kVeTrwwXqYNBjL2NxAkLRxIfAty', 'tes', '', 'default_user.png', 'tes@gmail.com', 35, 'Jawa Timur', 3503, 'Kabupaten Trenggalek'),
(26, 'badut_kehidupan', '$2y$10$SgTLzHtDrPkFXlZ7Nv1FEOsxwFWvJxYQqddZdCEloZr.ohlhlDMQ2', 'Badut Kehidupan', '', 'default_user.png', 'badut@gmail.com', 35, 'Jawa Timur', 3501, 'Kabupaten Pacitan'),
(27, 'asdfghjkl', '$2y$10$7ZyMnSCaZTjEZTDEy8.JXuWk0ebIQyBAswj88S1OoyOcNjhNKrBaG', 'asdfghjkl', '', 'default_user.png', 'asdfghjkl@gjhg.vj', 35, 'Jawa Timur', 3520, 'Kabupaten Magetan'),
(28, 'putrasena21', '$2y$10$c/NXi6Sc.L3Djbz7PKJlVuzRY/7Vk6T7WkPpCj2jBpEuQA9qHTKU6', 'Moch. Faisal Khoirudin', 'Saya siapa?', 'default_user.png', 'putrasena21@gmail.com', 35, 'Jawa Timur', 3578, 'Kota Surabaya'),
(29, 'lifanandriand', '$2y$10$9itxlTI6j0oFU8XEBfy07e3NoOs/1LFROwRdsNQVIIBK/Sn17DzI6', 'Lifan Andriand', '', 'default_user.png', 'alvani.19044@mhs.unesa.ac.id', 35, 'Jawa Timur', 3517, 'Kabupaten Jombang');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admins`
--
ALTER TABLE `admins`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `bookmark_posts`
--
ALTER TABLE `bookmark_posts`
  ADD PRIMARY KEY (`id`),
  ADD KEY `post_id` (`post_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `name` (`name`);

--
-- Indexes for table `colors`
--
ALTER TABLE `colors`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `name` (`name`);

--
-- Indexes for table `comments`
--
ALTER TABLE `comments`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `post_id` (`post_id`);

--
-- Indexes for table `follows`
--
ALTER TABLE `follows`
  ADD PRIMARY KEY (`id`),
  ADD KEY `following_id` (`following_id`),
  ADD KEY `follower_id` (`follower_id`);

--
-- Indexes for table `jobs`
--
ALTER TABLE `jobs`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `likes`
--
ALTER TABLE `likes`
  ADD PRIMARY KEY (`id`),
  ADD KEY `post_id` (`post_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `posts`
--
ALTER TABLE `posts`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `color_id` (`color_id`),
  ADD KEY `posts_ibfk_2` (`category_id`);

--
-- Indexes for table `post_images`
--
ALTER TABLE `post_images`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `recovery_tokens`
--
ALTER TABLE `recovery_tokens`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `token` (`token`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `tokens`
--
ALTER TABLE `tokens`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `admins`
--
ALTER TABLE `admins`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `bookmark_posts`
--
ALTER TABLE `bookmark_posts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `categories`
--
ALTER TABLE `categories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `colors`
--
ALTER TABLE `colors`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `comments`
--
ALTER TABLE `comments`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- AUTO_INCREMENT for table `follows`
--
ALTER TABLE `follows`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT for table `jobs`
--
ALTER TABLE `jobs`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `likes`
--
ALTER TABLE `likes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=35;

--
-- AUTO_INCREMENT for table `posts`
--
ALTER TABLE `posts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=41;

--
-- AUTO_INCREMENT for table `post_images`
--
ALTER TABLE `post_images`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=45;

--
-- AUTO_INCREMENT for table `recovery_tokens`
--
ALTER TABLE `recovery_tokens`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `tokens`
--
ALTER TABLE `tokens`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=70;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=30;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `bookmark_posts`
--
ALTER TABLE `bookmark_posts`
  ADD CONSTRAINT `bookmark_posts_ibfk_1` FOREIGN KEY (`post_id`) REFERENCES `posts` (`id`),
  ADD CONSTRAINT `bookmark_posts_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

--
-- Constraints for table `comments`
--
ALTER TABLE `comments`
  ADD CONSTRAINT `comments_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `comments_ibfk_2` FOREIGN KEY (`post_id`) REFERENCES `posts` (`id`);

--
-- Constraints for table `follows`
--
ALTER TABLE `follows`
  ADD CONSTRAINT `follows_ibfk_1` FOREIGN KEY (`following_id`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `follows_ibfk_2` FOREIGN KEY (`follower_id`) REFERENCES `users` (`id`);

--
-- Constraints for table `jobs`
--
ALTER TABLE `jobs`
  ADD CONSTRAINT `jobs_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

--
-- Constraints for table `likes`
--
ALTER TABLE `likes`
  ADD CONSTRAINT `likes_ibfk_1` FOREIGN KEY (`post_id`) REFERENCES `posts` (`id`),
  ADD CONSTRAINT `likes_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

--
-- Constraints for table `posts`
--
ALTER TABLE `posts`
  ADD CONSTRAINT `posts_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

--
-- Constraints for table `recovery_tokens`
--
ALTER TABLE `recovery_tokens`
  ADD CONSTRAINT `recovery_tokens_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

--
-- Constraints for table `tokens`
--
ALTER TABLE `tokens`
  ADD CONSTRAINT `tokens_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
