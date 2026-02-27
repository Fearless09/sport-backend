import express from "express";
import matchRouter from "./routes/match.route";
import { PORT } from "./config/env.config";

const app = express();

app.use(express.json());

app.use("/api/match", matchRouter);

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
