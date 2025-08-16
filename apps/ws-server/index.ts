import express, {
  type Application,
  type Request,
  type Response,
} from "express";
import http from "http";
import { Server as SocketIoServer } from "socket.io";

const app: Application = express();
const server = http.createServer(app);
const io = new SocketIoServer(server);

const PORT = 3001;

app.get("/", (req: Request, res: Response) => {
  res.json({ message: "Server is running" });
});

io.on("connection", (socket) => {
  console.log(`User connected ${socket.id}`);

  socket.on("message", (message) => {
    io.emit("message", message);
  });

  socket.on("disconnect", () => {
    console.log(`User disconnected: ${socket.id}`);
  });
});

server.listen(PORT, () => console.log(`Server is running on ${PORT}`));
