import { relations } from "drizzle-orm/relations";
import { matches, commentary } from "./schema";

export const commentaryRelations = relations(commentary, ({ one }) => ({
  match: one(matches, {
    fields: [commentary.matchId],
    references: [matches.id],
  }),
}));

export const matchesRelations = relations(matches, ({ many }) => ({
  commentaries: many(commentary),
}));
