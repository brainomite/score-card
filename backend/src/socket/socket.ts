import { Server } from "socket.io";
import http from "http";
import express from "express";

const app = express();

const server = http.createServer(app);
const io =
  process.env.NODE_ENV === "production"
    ? new Server(server)
    : new Server(server, {
        cors: {
          origin: ["http://localhost:5173"],
        },
      });

const userSocketMap: { [key: string]: string } = {};

export const getReceiverSocketId = (receiverId: string) => {
  return userSocketMap[receiverId];
};

export { app, io, server };
