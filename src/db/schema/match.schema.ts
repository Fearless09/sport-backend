import { pgTable, serial, text, pgEnum, timestamp, integer } from "drizzle-orm/pg-core";
import { timestamps } from "../../helper/schema.helper";

export const matchStatusEnum = pgEnum("match_status", [
  "live",
  "scheduled",
  "finished",
]);

export const matches = pgTable("matches", {
  id: serial("id").primaryKey(),
  homeTeam: text("home_team").notNull(),
  awayTeam: text("away_team").notNull(),
  homeScore: integer("home_score").notNull().default(0),
  awayScore: integer("away_score").notNull().default(0),
  sport: text("sport").notNull(),
  startTime: timestamp("start_time").notNull(),
  endTime: timestamp("end_time"),
  status: matchStatusEnum("status").notNull().default("scheduled"),

  ...timestamps,
});

export type Match = typeof matches.$inferSelect;
export type NewMatch = typeof matches.$inferInsert;
export type MatchStatus = (typeof matchStatusEnum.enumValues)[number];
