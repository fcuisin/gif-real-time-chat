import dotenv from "dotenv";
import express from "express";
import { createServer } from "http";
import Bundler from "parcel-bundler";
import path from "path";
import { Server } from "socket.io";

import connectDB from "./db";
import initializeSocket from "./socket";

dotenv.config();

const app = express();
const port = 8080 || process.env.PORT;
const httpServer = createServer(app);
const io = new Server(httpServer);

app.get("/api", async (req, res) => {
  res.json({ message: "Hello World" });
});

const bundler = new Bundler(path.join(__dirname, "../src/client/index.html"));

connectDB();
initializeSocket({ io });

app.use(bundler.middleware());

httpServer.listen(port, () => {
  console.log(`Server started at http://localhost:${port}`);
});
