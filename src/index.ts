import { WebSocketServer } from "ws";
import { PORT } from "./config/env.config";

const wss = new WebSocketServer({ port: Number(PORT) });

wss.on("connection", (ws, req) => {
  const clientIp = req.socket.remoteAddress;

  ws.on("message", (data) => {
    const msg = data.toString();

    wss.clients.forEach((client) => {
      if (client !== ws && client.readyState === ws.OPEN) {
        client.send(`${new Date().toLocaleTimeString()} [${clientIp}]: ${msg}`);
      }
    });
  });

  ws.on("error", (err) => {
    console.error(`Error: ${err} from client ${clientIp}`);
  });

  ws.on("close", () => {
    console.log(`Client ${clientIp} disconnected`);
  });
});

console.log(`Server started on port ${PORT}`);
