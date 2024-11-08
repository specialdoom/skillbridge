ALTER TABLE "events" RENAME COLUMN "organisation_id" TO "organization_id";--> statement-breakpoint
ALTER TABLE "events" DROP CONSTRAINT "events_organisation_id_organizations_id_fk";
--> statement-breakpoint
ALTER TABLE "events" ALTER COLUMN "start_date" SET DATA TYPE timestamp;--> statement-breakpoint
ALTER TABLE "events" ALTER COLUMN "end_date" SET DATA TYPE timestamp;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "events" ADD CONSTRAINT "events_organization_id_organizations_id_fk" FOREIGN KEY ("organization_id") REFERENCES "public"."organizations"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
