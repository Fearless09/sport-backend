import {
  pgTable,
  serial,
  text,
  integer,
  timestamp,
  foreignKey,
  jsonb,
  pgEnum,
} from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";

export const matchStatus = pgEnum("match_status", [
  "live",
  "scheduled",
  "finished",
]);

export const matches = pgTable("matches", {
  id: serial().primaryKey().notNull(),
  homeTeam: text("home_team").notNull(),
  awayTeam: text("away_team").notNull(),
  homeScore: integer("home_score").default(0).notNull(),
  awayScore: integer("away_score").default(0).notNull(),
  sport: text().notNull(),
  startTime: timestamp("start_time", { mode: "string" }).notNull(),
  endTime: timestamp("end_time", { mode: "string" }).notNull(),
  status: matchStatus().default("scheduled").notNull(),
  createdAt: timestamp("created_at", { mode: "string" }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { mode: "string" }).defaultNow().notNull(),
  deletedAt: timestamp("deleted_at", { mode: "string" }),
});

export const commentary = pgTable(
  "commentary",
  {
    id: serial().primaryKey().notNull(),
    matchId: integer("match_id").notNull(),
    minutes: integer(),
    sequence: integer(),
    period: text(),
    eventType: text("event_type"),
    actor: text(),
    team: text(),
    message: text(),
    metaData: jsonb("meta_data"),
    tags: text().array(),
    createdAt: timestamp("created_at", { mode: "string" })
      .defaultNow()
      .notNull(),
    updatedAt: timestamp("updated_at", { mode: "string" })
      .defaultNow()
      .notNull(),
    deletedAt: timestamp("deleted_at", { mode: "string" }),
  },
  (table) => [
    foreignKey({
      columns: [table.matchId],
      foreignColumns: [matches.id],
      name: "commentary_match_id_matches_id_fk",
    }),
  ],
);
