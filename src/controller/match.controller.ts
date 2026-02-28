import { Request, Response } from "express";
import {
  createMatchSchema,
  listMatchesSchema,
} from "../validation/match.validation";
import { db } from "../db/db";
import { match } from "../db/schema/match.schema";
import { getMatchStatus } from "../utils/match.util";
import { desc, asc } from "drizzle-orm";

export const createMatch = async (req: Request, res: Response) => {
  const body = createMatchSchema.safeParse(req.body);

  if (!body.success) {
    return res.status(400).json({
      message: "Invalid request body",
      errors: body.error.issues,
    });
  }
  const { data } = body;

  try {
    const [newMatch] = await db
      .insert(match)
      .values({
        ...data,
        status: getMatchStatus(data.startTime, data.endTime),
      })
      .returning();

    try {
      res.app.locals.broadcastMatchCreated(newMatch);
    } catch (err) {
      console.error("Failed to broadcast match creation:", err);
    }

    res.status(201).json({
      message: "Match created successfully",
      data: newMatch,
    });
  } catch (error) {
    console.error("Error creating match", error);
    res.status(500).json({
      message: "Failed to create match",
    });
  }
};

export const getAllMatches = async (req: Request, res: Response) => {
  const query = listMatchesSchema.safeParse(req.query);

  if (!query.success) {
    return res.status(400).json({
      message: "Invalid query parameters",
      errors: query.error.issues,
    });
  }

  const { limit } = query.data;
  try {
    const matches = await db
      .select()
      .from(match)
      .orderBy(asc(match.startTime))
      .limit(Math.min(limit ?? 50, 100));

    res.status(200).json({
      message: "Matches fetched successfully",
      data: matches,
    });
  } catch (error) {
    console.error("Error fetching matches", error);
    res.status(500).json({
      message: "Failed to fetch matches",
    });
  }
};
