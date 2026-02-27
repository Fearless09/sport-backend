CREATE TYPE "public"."match_status" AS ENUM('live', 'scheduled', 'finished');--> statement-breakpoint
CREATE TABLE "commentary" (
	"id" serial PRIMARY KEY NOT NULL,
	"matchId" integer NOT NULL,
	"minutes" integer,
	"sequence" integer,
	"period" text,
	"event_type" text,
	"actor" text,
	"team" text,
	"message" text,
	"meta_data" jsonb,
	"tags" text[],
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp NOT NULL,
	"deleted_at" timestamp
);
--> statement-breakpoint
CREATE TABLE "matches" (
	"id" serial PRIMARY KEY NOT NULL,
	"home_team" text NOT NULL,
	"away_team" text NOT NULL,
	"home_score" text NOT NULL,
	"away_score" text NOT NULL,
	"sport" text NOT NULL,
	"start_time" timestamp NOT NULL,
	"end_time" timestamp,
	"status" "match_status" DEFAULT 'scheduled' NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp NOT NULL,
	"deleted_at" timestamp
);
--> statement-breakpoint
ALTER TABLE "commentary" ADD CONSTRAINT "commentary_matchId_matches_id_fk" FOREIGN KEY ("matchId") REFERENCES "public"."matches"("id") ON DELETE no action ON UPDATE no action;