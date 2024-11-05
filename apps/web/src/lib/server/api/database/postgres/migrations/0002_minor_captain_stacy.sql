CREATE TYPE "public"."role" AS ENUM('volunteer', 'manager');--> statement-breakpoint
ALTER TABLE "managers" DISABLE ROW LEVEL SECURITY;--> statement-breakpoint
ALTER TABLE "volunteers" DISABLE ROW LEVEL SECURITY;--> statement-breakpoint
DROP TABLE "managers" CASCADE;--> statement-breakpoint
DROP TABLE "volunteers" CASCADE;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "first_name" text;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "last_name" text;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "role" "role" DEFAULT 'volunteer';--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "organization_id" text;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "users" ADD CONSTRAINT "users_organization_id_organizations_id_fk" FOREIGN KEY ("organization_id") REFERENCES "public"."organizations"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
