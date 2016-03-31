CREATE TABLE IF NOT EXISTS `races` (
	`ID` INT NOT NULL AUTO_INCREMENT,
	`name` VARCHAR(50) NULL,
	PRIMARY KEY (`ID`)
)
COLLATE='latin1_swedish_ci'
ENGINE=InnoDB
;
INSERT INTO `races` (`ID`, `name`) VALUES (1, 'human');
INSERT INTO `races` (`ID`, `name`) VALUES (2, 'orc');
INSERT INTO `races` (`ID`, `name`) VALUES (3, 'dwarf');
INSERT INTO `races` (`ID`, `name`) VALUES (4, 'night-elf');
INSERT INTO `races` (`ID`, `name`) VALUES (5, 'undead');
INSERT INTO `races` (`ID`, `name`) VALUES (6, 'tauren');
INSERT INTO `races` (`ID`, `name`) VALUES (7, 'gnome');
INSERT INTO `races` (`ID`, `name`) VALUES (8, 'troll');
INSERT INTO `races` (`ID`, `name`) VALUES (9, 'goblin');
INSERT INTO `races` (`ID`, `name`) VALUES (10, 'blood-elf');
INSERT INTO `races` (`ID`, `name`) VALUES (11, 'draenei');
INSERT INTO `races` (`ID`, `name`) VALUES (22, 'worgen');
INSERT INTO `races` (`ID`, `name`) VALUES (24, 'pandaren');
