import { io } from "socket.io-client";

const socketURL =
  import.meta.env.MODE === "development" ? "http://localhost:3001" : "/";

export const socket = io(socketURL, { autoConnect: false });
