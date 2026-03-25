CREATE TABLE `ads_processing_queue` (
	`id` int AUTO_INCREMENT NOT NULL,
	`url` varchar(500) NOT NULL,
	CONSTRAINT `ads_processing_queue_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
ALTER TABLE `ads` ADD CONSTRAINT `ads_ad_id_unique` UNIQUE(`ad_id`);