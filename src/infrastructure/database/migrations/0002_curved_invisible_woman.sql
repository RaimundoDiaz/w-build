ALTER TABLE "project" ADD COLUMN "location" varchar(256) NOT NULL;--> statement-breakpoint
ALTER TABLE "project" ADD COLUMN "target_amount" integer NOT NULL;--> statement-breakpoint
ALTER TABLE "project" ADD COLUMN "current_amount" integer NOT NULL;--> statement-breakpoint
ALTER TABLE "project" ADD COLUMN "min_investment" integer NOT NULL;--> statement-breakpoint
ALTER TABLE "project" ADD COLUMN "expected_return" varchar(256) NOT NULL;--> statement-breakpoint
ALTER TABLE "project" ADD COLUMN "investors" integer NOT NULL;--> statement-breakpoint
ALTER TABLE "project" ADD COLUMN "status" varchar(256) NOT NULL;