CREATE TABLE IF NOT EXISTS `classes` (
	`ID` INT NOT NULL AUTO_INCREMENT,
	`name` VARCHAR(50) NULL,
	PRIMARY KEY (`ID`)
)
COLLATE='latin1_swedish_ci'
ENGINE=InnoDB
;
INSERT INTO `classes` (`ID`, `name`) VALUES (1, 'warrior');
INSERT INTO `classes` (`ID`, `name`) VALUES (2, 'paladin');
INSERT INTO `classes` (`ID`, `name`) VALUES (3, 'hunter');
INSERT INTO `classes` (`ID`, `name`) VALUES (4, 'rogue');
INSERT INTO `classes` (`ID`, `name`) VALUES (5, 'priest');
INSERT INTO `classes` (`ID`, `name`) VALUES (6, 'death-knight');
INSERT INTO `classes` (`ID`, `name`) VALUES (7, 'shaman');
INSERT INTO `classes` (`ID`, `name`) VALUES (8, 'mage');
INSERT INTO `classes` (`ID`, `name`) VALUES (9, 'warlock');
INSERT INTO `classes` (`ID`, `name`) VALUES (10, 'monk');
INSERT INTO `classes` (`ID`, `name`) VALUES (11, 'druid');
