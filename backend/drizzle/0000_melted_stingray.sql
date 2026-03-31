CREATE TABLE `ads_queue` (
	`id` int AUTO_INCREMENT NOT NULL,
	`url` varchar(500) NOT NULL,
	`created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
	CONSTRAINT `ads_queue_id` PRIMARY KEY(`id`),
	CONSTRAINT `ads_queue_url_unique` UNIQUE(`url`)
);
--> statement-breakpoint
CREATE TABLE `ads` (
	`id` bigint unsigned AUTO_INCREMENT NOT NULL,
	`ad_id` varchar(100) NOT NULL,
	`url` varchar(500) NOT NULL,
	`settlement` varchar(45) NOT NULL,
	`ad_type` varchar(30) NOT NULL,
	`property_type` varchar(30) NOT NULL,
	`price` int unsigned NOT NULL,
	`area` decimal(10,2),
	`rooms` int unsigned,
	`address` varchar(500),
	`latitude` decimal(10,7),
	`longitude` decimal(10,7),
	`first_seen_at` timestamp NOT NULL DEFAULT (now()),
	`last_seen_at` timestamp NOT NULL DEFAULT (now()),
	`disappeared_at` timestamp,
	`is_active` boolean DEFAULT true,
	`raw_details_json` json,
	`raw_scraped_json` json,
	`raw_html` longtext,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `ads_id` PRIMARY KEY(`id`),
	CONSTRAINT `ads_ad_id_unique` UNIQUE(`ad_id`)
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
	`name` varchar(45) NOT NULL,
	CONSTRAINT `settlements_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE INDEX `ads_settlement_idx` ON `ads` (`settlement`);--> statement-breakpoint
CREATE INDEX `ads_ad_type_idx` ON `ads` (`ad_type`);--> statement-breakpoint
CREATE INDEX `ads_property_type_idx` ON `ads` (`property_type`);--> statement-breakpoint
CREATE INDEX `ads_is_active_idx` ON `ads` (`is_active`);--> statement-breakpoint
CREATE INDEX `ads_first_seen_at_idx` ON `ads` (`first_seen_at`);--> statement-breakpoint
CREATE INDEX `ads_last_seen_at_idx` ON `ads` (`last_seen_at`);--> statement-breakpoint
CREATE INDEX `ads_disappeared_at_idx` ON `ads` (`disappeared_at`);--> statement-breakpoint
CREATE INDEX `ads_price_idx` ON `ads` (`price`);--> statement-breakpoint
CREATE INDEX `ads_area_idx` ON `ads` (`area`);--> statement-breakpoint
CREATE INDEX `ads_latitude_idx` ON `ads` (`latitude`);--> statement-breakpoint
CREATE INDEX `ads_longitude_idx` ON `ads` (`longitude`);--> statement-breakpoint
CREATE INDEX `settlements_name_idx` ON `settlements` (`name`);