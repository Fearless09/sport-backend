import { z } from "zod";
import { matchStatusEnum } from "../db/schema/match.schema";

export const createMatchSchema = z
  .object({
    sport: z.string().min(1, "Sport is required"),
    homeTeam: z.string().min(1, "Home team is required"),
    awayTeam: z.string().min(1, "Away team is required"),
    homeScore: z.coerce.number().int().nonnegative().optional(),
    awayScore: z.coerce.number().int().nonnegative().optional(),
    startTime: z.coerce.date(),
    endTime: z.coerce.date(),
  })
  .superRefine((data, ctx) => {
    const { startTime, endTime } = data;

    if (startTime >= endTime) {
      ctx.addIssue({
        code: "custom",
        message: "Start time must be before end time",
        path: ["startTime"],
      });
    }
  });

export const updateMatchScoreSchema = z.object({
  homeScore: z.coerce.number().int().nonnegative(),
  awayScore: z.coerce.number().int().nonnegative(),
});

export const listMatchesSchema = z.object({
  limit: z.coerce.number().int().positive().max(100).optional(),
});

export const matchIdSchema = z.object({
  id: z.coerce.number().int().positive(),
});

export const updateMatchSchema = z
  .object({
    homeTeam: z.string().min(1, "Home team is required").optional(),
    awayTeam: z.string().min(1, "Away team is required").optional(),
    homeScore: z.number().int().nonnegative().optional(),
    awayScore: z.number().int().nonnegative().optional(),
    status: z.enum(matchStatusEnum.enumValues).optional(),
    startTime: z.coerce.date().optional(),
    endTime: z.coerce.date().optional(),
  })
  .superRefine((data, ctx) => {
    const { startTime, endTime } = data;

    if (!startTime || !endTime) return;
    if (startTime >= endTime) {
      ctx.addIssue({
        code: "custom",
        message: "Start time must be before end time",
        path: ["startTime"],
      });
    }
  });
