-- --------------------------------------------------------
-- Host:                         192.168.0.114
-- Versione server:              5.6.21 - MySQL Community Server (GPL)
-- S.O. server:                  Win32
-- HeidiSQL Versione:            9.2.0.4947
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;

-- Dump della struttura di tabella ellenet.blog
DROP TABLE IF EXISTS `blog`;
CREATE TABLE IF NOT EXISTS `blog` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(50) DEFAULT NULL,
  `description` varchar(50) DEFAULT NULL,
  `summary` varchar(250) DEFAULT NULL,
  `content` text,
  `link_rewrite` varchar(100) DEFAULT NULL,
  `isPinned` tinyint(4) DEFAULT '0',
  `date` datetime DEFAULT CURRENT_TIMESTAMP,
  `last_modify` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;

-- Dump dei dati della tabella ellenet.blog: ~3 rows (circa)
/*!40000 ALTER TABLE `blog` DISABLE KEYS */;
INSERT INTO `blog` (`ID`, `title`, `description`, `summary`, `content`, `link_rewrite`, `isPinned`, `date`, `last_modify`) VALUES
	(1, 'Blog title', NULL, 'This is a blog summary', 'This is the content', 'blog-title', 1, '2016-03-29 21:28:41', '2016-03-29 21:42:52'),
	(2, 'Test ', NULL, 'test summary', '<p>Fino al termine della giornata del 4 gennaio, l\'esperienza ottenuta negli scontri tra mascotte viene aumentata del 200%. Non c\'è mai stato un momento migliore per andare là fuori a far salire di livello le vostre possenti mascotte!</p>\r\n<p>Prima di lanciarvi nelle terre selvagge con i vostri amichetti di livello basso, assicuratevi di accettare la missione "<a href="http://it.wowhead.com/quest=39042/i-migliori" target="_blank">I migliori</a>". Dato che siete i migliori in circolazione, vorrete anche mettervi in coda per degli scontri PVP tra mascotte con la vostra squadra interamente composta da mascotte di livello 25. Bastano cinque vittorie durante i giorni dell\'evento per essere ricompensati con una Pietra Evolutiva Definitiva, il che significa che un\'altra vostra mascotte di livello 25 sta per aggiungersi alla vostra collezione.</p>\r\n<p>Da quali mascotte da combattimento è composta la vostra squadra per gli scontri PvP? Fatecelo sapere nei commenti qui sotto.</p>\r', 'test', 1, '2016-03-29 22:24:09', '2016-03-29 22:24:09'),
	(3, 'Test 2', NULL, 'test 2 summary', NULL, 'test-2', 1, '2016-03-29 22:24:34', '2016-03-29 22:24:34');
/*!40000 ALTER TABLE `blog` ENABLE KEYS */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
