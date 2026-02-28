import { WebSocket, WebSocketServer } from "ws";
import { Match } from "../db/schema/match.schema";
import { Server } from "http";

type Payload =
  | { type: "welcome"; data: string }
  | { type: "match_created"; data: Match };

export const sendJson = (socket: WebSocket, payload: Payload) => {
  if (socket.readyState !== WebSocket.OPEN) return;

  socket.send(JSON.stringify(payload));
};

export const broadcastJson = (wss: WebSocketServer, payload: Payload) => {
  for (const client of wss.clients) {
    if (client.readyState !== WebSocket.OPEN) continue;

    sendJson(client, payload);
  }
};

export const attachWebSocketServer = (server: Server) => {
  const wss = new WebSocketServer({
    server,
    path: "/ws",
    maxPayload: 1024 * 1024, // 1 mb
  });

  wss.on("error", (error) => {
    console.error("WebSocketServer error:", error);
  });

  wss.on("connection", (ws) => {
    sendJson(ws, {
      type: "welcome",
      data: "Welcome to the WebSocket server",
    });

    ws.on("error", (error) => {
      console.error("WebSocket error:", error);
    });
  });

  const broadcastMatchCreated = (match: Match) => {
    broadcastJson(wss, {
      type: "match_created",
      data: match,
    });
  };

  return {
    broadcastMatchCreated,
  };
};
