import { Router } from "express";
import { createMatch, getAllMatches } from "../controller/match.controller";

const matchRouter = Router();

matchRouter.get("/", getAllMatches);

matchRouter.post("/", createMatch);

export default matchRouter;
