import { pgTable, text, serial, integer, jsonb } from "drizzle-orm/pg-core";
import { timestamps } from "../../helper/schema.helper";
import { match } from "./match.schema";

export const commentary = pgTable("commentary", {
  id: serial("id").primaryKey(),
  matchId: integer("match_id")
    .notNull()
    .references(() => match.id),
  minutes: integer("minutes"),
  sequence: integer("sequence"),
  period: text("period"),
  eventType: text("event_type"),
  actor: text("actor"),
  team: text("team"),
  message: text("message"),
  metadata: jsonb("meta_data"),
  tags: text("tags").array(),

  ...timestamps,
});

export type Commentary = typeof commentary.$inferSelect;
export type NewCommentary = typeof commentary.$inferInsert;
