CREATE TABLE `ads` (
	`id` int AUTO_INCREMENT NOT NULL,
	`settlement_id` int NOT NULL,
	`ad_id` int NOT NULL,
	`url` varchar(255) NOT NULL,
	`type` varchar(2) NOT NULL,
	`advertiser_type` varchar(2) NOT NULL,
	`ownership_type` varchar(2),
	`area` double NOT NULL,
	`price` double NOT NULL,
	`rooms` int NOT NULL,
	`floor` varchar(10) NOT NULL,
	`czynsz` int,
	`address` varchar(255),
	`description` text,
	`close_date` timestamp,
	`created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
	`updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
	CONSTRAINT `ads_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `building_details` (
	`id` int AUTO_INCREMENT NOT NULL,
	`ads_id` int NOT NULL,
	`construction_year` int,
	`elevator` boolean,
	`building_type` varchar(2),
	`building_material` varchar(2),
	CONSTRAINT `building_details_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `equipment_details` (
	`id` int AUTO_INCREMENT NOT NULL,
	`ads_id` int NOT NULL,
	`has_furniture` boolean NOT NULL DEFAULT false,
	CONSTRAINT `equipment_details_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `images` (
	`id` int AUTO_INCREMENT NOT NULL,
	`ads_id` int NOT NULL,
	`url` varchar(255) NOT NULL,
	`position` int NOT NULL DEFAULT 0,
	CONSTRAINT `images_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `price_changes` (
	`id` int AUTO_INCREMENT NOT NULL,
	`ads_id` int NOT NULL,
	`price` double NOT NULL,
	`created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
	CONSTRAINT `price_changes_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `settlements` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` varchar(255) NOT NULL,
	`created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
	`updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
	CONSTRAINT `settlements_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `users` (
	`id` int AUTO_INCREMENT NOT NULL,
	`email` varchar(255) NOT NULL,
	`name` varchar(255) NOT NULL,
	`created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
	CONSTRAINT `users_id` PRIMARY KEY(`id`),
	CONSTRAINT `users_email_unique` UNIQUE(`email`)
);
--> statement-breakpoint
ALTER TABLE `ads` ADD CONSTRAINT `ads_settlement_id_settlements_id_fk` FOREIGN KEY (`settlement_id`) REFERENCES `settlements`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `building_details` ADD CONSTRAINT `building_details_ads_id_ads_id_fk` FOREIGN KEY (`ads_id`) REFERENCES `ads`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `equipment_details` ADD CONSTRAINT `equipment_details_ads_id_ads_id_fk` FOREIGN KEY (`ads_id`) REFERENCES `ads`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `images` ADD CONSTRAINT `images_ads_id_ads_id_fk` FOREIGN KEY (`ads_id`) REFERENCES `ads`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `price_changes` ADD CONSTRAINT `price_changes_ads_id_ads_id_fk` FOREIGN KEY (`ads_id`) REFERENCES `ads`(`id`) ON DELETE cascade ON UPDATE no action;