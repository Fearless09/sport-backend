ALTER TABLE "commentary" ALTER COLUMN "updated_at" SET DEFAULT now();--> statement-breakpoint
ALTER TABLE "matches" ALTER COLUMN "updated_at" SET DEFAULT now();