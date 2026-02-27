import { Match, MatchStatus } from "../db/schema/match.schema";

export function getMatchStatus(
  startTime: Date,
  endTime: Date,
  now: Date = new Date(),
): MatchStatus {
  switch (true) {
    case now < startTime:
      return "scheduled";
    case now >= endTime:
      return "finished";
    default:
      return "live";
  }
}

export async function syncMatchStatus(
  match: Match,
  updateMatchStatus: (match: Match) => Promise<void>,
): Promise<MatchStatus> {
  const newStatus = getMatchStatus(match.startTime, match.endTime);
  if (newStatus !== match.status) {
    await updateMatchStatus({ ...match, status: newStatus });
    match.status = newStatus;
  }
  return match.status;
}
