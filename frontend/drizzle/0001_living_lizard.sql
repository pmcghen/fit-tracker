ALTER TABLE "session" ALTER COLUMN "id" DROP IDENTITY;
ALTER TABLE "session" ALTER COLUMN "id" SET DATA TYPE text;--> statement-breakpoint
