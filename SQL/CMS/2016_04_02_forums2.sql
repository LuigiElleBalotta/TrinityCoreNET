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

-- Dump della struttura di tabella ellenet.forums
DROP TABLE IF EXISTS `forums`;
CREATE TABLE IF NOT EXISTS `forums` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) DEFAULT NULL,
  `description` varchar(200) DEFAULT NULL,
  `icon` varchar(50) DEFAULT NULL,
  `forum_type` int(11) DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=27 DEFAULT CHARSET=latin1;

-- Dump dei dati della tabella ellenet.forums: ~0 rows (circa)
/*!40000 ALTER TABLE `forums` DISABLE KEYS */;
INSERT INTO `forums` (`ID`, `name`, `description`, `icon`, `forum_type`) VALUES
	(1, 'Assistenza Clienti', 'Forum moderato dagli agenti dell&#39;assistenza Blizzard per discutere problemi all&#39;interno del gioco e relativi all&#39;account.', NULL, 1),
	(2, 'Supporto Tecnico', 'Per problemi di installazione e aggiornamento di World of Warcraft o difficoltà di connessione e crash durante le sessioni di gioco.', NULL, 1),
	(3, 'Gioco, divertimento e scienza', 'Giochi, film e telefilm, letteratura, scienza e tecnologia! Abbraccia il &#39;geek&#39; che è in te e discutine assieme a noi.', NULL, 2),
	(4, 'Reclutamento', 'Punto d&#39;incontro per chi cerca una gilda, nuovi membri, compagni per le Arene e amici con i quali salire insieme di livello.', NULL, 2),
	(5, 'Comando di Incursioni e Gilde', 'Un posto per i capigilda e i capoincursione con o senza esperienza per condividere suggerimenti, discutere sfide e incoraggiare lo sviluppo di un comando positivo.', NULL, 2),
	(6, 'Generale', 'Non trovi un forum dedicato al tuo argomento sul gioco? Il forum Generale è al tuo servizio.', NULL, 2),
	(7, 'Aiuto e Guide per Nuovi Giocatori', 'Sei un nuovo giocatore di World of Warcraft? Poni domande ai veterani e scopri di più sulle avventure che ti attendono!', NULL, 3),
	(8, 'Missioni', 'Missioni interessanti o difficili, o semplicemente quali missioni fare dove e quando.', NULL, 3),
	(9, 'Professioni', 'Artigiani di qualunque tipo, condividete la vostra saggezza ed esperienza.', NULL, 3),
	(10, 'Imprese', 'C&#39;è un&#39;impresa per quasi qualunque cosa. Alcuni le vogliono tutte, altri vogliono solo quelle veramente difficili.', NULL, 3),
	(11, 'Incursioni e Spedizioni', 'Sia che siate 5, 10 o 25, questo è il luogo in cui discuterne.', NULL, 3),
	(12, 'Interfaccia e Macro', 'Interfacce personalizzate e macro utili, vale sempre la pena controllare.', NULL, 3),
	(13, 'Guarnigioni', 'Forum dedicato alle Guarnigioni in Warlords of Draenor.', NULL, 3),
	(14, 'Arene e Campi di Battaglia Classificati', 'Competi in Arena o sui Campi di Battaglia Classificati? Condividi qui tattiche, pensieri ed esperienze con i tuoi pari.', NULL, 4),
	(15, 'Campi di Battaglia e PvP all&#39;Aperto', 'Trova o condividi consigli, suggerimenti e pensieri riguardo i Campi di Battaglia e il PvP all&#39;aperto.', NULL, 4),
	(16, 'Cacciatore', NULL, NULL, 5),
	(17, 'Cavaliere della Morte', NULL, NULL, 5),
	(18, 'Druido', NULL, NULL, 5),
	(19, 'Guerriero', NULL, NULL, 5),
	(20, 'Ladro', NULL, NULL, 5),
	(21, 'Mago', NULL, NULL, 5),
	(22, 'Monaco', NULL, NULL, 5),
	(23, 'Paladino', NULL, NULL, 5),
	(24, 'Sacerdote', NULL, NULL, 5),
	(25, 'Sciamano', NULL, NULL, 5),
	(26, 'Stregone', NULL, NULL, 5);
/*!40000 ALTER TABLE `forums` ENABLE KEYS */;


-- Dump della struttura di tabella ellenet.forum_types
DROP TABLE IF EXISTS `forum_types`;
CREATE TABLE IF NOT EXISTS `forum_types` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=latin1;

-- Dump dei dati della tabella ellenet.forum_types: ~0 rows (circa)
/*!40000 ALTER TABLE `forum_types` DISABLE KEYS */;
INSERT INTO `forum_types` (`ID`, `name`) VALUES
	(1, 'Assistenza'),
	(2, 'Community'),
	(3, 'GamePlay'),
	(4, 'Personaggio contro Personaggio'),
	(5, 'Classi');
/*!40000 ALTER TABLE `forum_types` ENABLE KEYS */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
