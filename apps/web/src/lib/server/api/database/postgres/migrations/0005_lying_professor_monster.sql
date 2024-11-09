ALTER TABLE "registrations" RENAME COLUMN "organization_id" TO "event_id";--> statement-breakpoint
ALTER TABLE "registrations" DROP CONSTRAINT "registrations_organization_id_organizations_id_fk";
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "registrations" ADD CONSTRAINT "registrations_event_id_events_id_fk" FOREIGN KEY ("event_id") REFERENCES "public"."events"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
