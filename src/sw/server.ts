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
    sendJson(client, payload);
  }
};

export const attachWebSocketServer = (server: Server) => {
  const wss = new WebSocketServer({
    server,
    path: "/ws",
    maxPayload: 1024 * 1024, // 1 mb
  });

  wss.on("connection", (ws) => {
    sendJson(ws, {
      type: "welcome",
      data: "Welcome to the WebSocket server",
    });

    ws.on("error", (error) => {
      console.error("WebSocket error:", error);
    });

    // ws.on("message", (message) => {
    //   console.log("Received message:", message.toString());
    // });

    // ws.on("close", () => {
    //   console.log("Client disconnected");
    // });
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
