import express from "express";
import matchRouter from "./routes/match.route";
import { PORT, HOST } from "./config/env.config";
import { createServer } from "http";
import { attachWebSocketServer } from "./sw/server";

const app = express();
const server = createServer(app);

app.use(express.json());

app.use("/api/match", matchRouter);

const { broadcastMatchCreated } = attachWebSocketServer(server);
app.locals.broadcastMatchCreated = broadcastMatchCreated;

const host = HOST || "0.0.0.0";
server.listen(Number(PORT), host, () => {
  const baseUrl =
    host === "0.0.0.0" ? `http://localhost:${PORT}` : `http://${host}:${PORT}`;

  console.log(`Server started on ${baseUrl}`);
  console.log(
    `WebSocket server started on ${baseUrl.replace("http", "ws")}/ws`,
  );
});
