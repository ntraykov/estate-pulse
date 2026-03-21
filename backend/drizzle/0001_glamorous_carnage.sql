ALTER TABLE `ads` MODIFY COLUMN `type` enum('sale','rent') NOT NULL;--> statement-breakpoint
ALTER TABLE `ads` MODIFY COLUMN `advertiser_type` enum('private','agency') NOT NULL;--> statement-breakpoint
ALTER TABLE `ads` MODIFY COLUMN `ownership_type` enum('full','joint');