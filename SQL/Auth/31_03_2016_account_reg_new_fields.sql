ALTER TABLE `account`
	ADD COLUMN `country` VARCHAR(3) NULL DEFAULT NULL AFTER `battlenet_index`,
	ADD COLUMN `firstname` VARCHAR(50) NULL DEFAULT NULL AFTER `country`,
	ADD COLUMN `lastname` VARCHAR(50) NULL DEFAULT NULL AFTER `firstname`,
	ADD COLUMN `age` TINYINT(2) NULL DEFAULT NULL AFTER `lastname`;