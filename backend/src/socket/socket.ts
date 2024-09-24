import { Server } from "socket.io";
import http from "http";
import express from "express";
import fetchScoreCard from "../utils/fetchScoreCard.js";
import updateScoreCard from "../utils/updateScoreCard.js";

export const SCORE_SHEET_DATA = "scoreSheetData";
const UPDATE_SCORESHEET = "updateScoreSheet";
const JOIN_SCORESHEET = "joinScoreSheet";

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

io.on("connection", (socket) => {
  // const id = socket.handshake.query.id as string;
  socket.on(JOIN_SCORESHEET, async (id) => {
    socket.join(id);
    const sheetData = await fetchScoreCard(id);
    io.to(id).emit(SCORE_SHEET_DATA, sheetData);
  });
  socket.on(UPDATE_SCORESHEET, async (payload, callback) => {
    const { id, category, player, score } = payload;
    const scoreCard = await updateScoreCard(id, category, player, score);
    io.to(id).emit(SCORE_SHEET_DATA, scoreCard);
    callback({ status: "success" });
  });
});

export { app, io, server };
