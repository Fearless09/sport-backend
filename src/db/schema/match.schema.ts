import { pgTable, serial, text, pgEnum, timestamp } from "drizzle-orm/pg-core";
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
  homeScore: text("home_score").notNull(),
  awayScore: text("away_score").notNull(),
  sport: text("sport").notNull(),
  startTime: timestamp("start_time").notNull(),
  endTime: timestamp("end_time"),
  status: matchStatusEnum("status").notNull().default("scheduled"),

  ...timestamps,
});

export type Match = typeof matches.$inferSelect;
export type NewMatch = typeof matches.$inferInsert;
export type matchStatus = (typeof matchStatusEnum.enumValues)[number];
