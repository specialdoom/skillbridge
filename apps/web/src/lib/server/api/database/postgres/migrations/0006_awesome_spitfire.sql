CREATE TYPE "public"."status" AS ENUM('pending', 'approved', 'rejected', 'target');--> statement-breakpoint
ALTER TABLE "registrations" ADD COLUMN "status" "status" DEFAULT 'pending';