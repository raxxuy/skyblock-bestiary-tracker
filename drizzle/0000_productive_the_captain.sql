CREATE TABLE `users` (
	`username` text NOT NULL,
	`mojang_id` text PRIMARY KEY NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `users_username_unique` ON `users` (`username`);