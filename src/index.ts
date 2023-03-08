import express from "express";
import Bundler from "parcel-bundler";
import path from "path";
import dotenv from "dotenv";

import connectDB from "./db";

dotenv.config();

const app = express();
const port = 8080 || process.env.PORT;

app.get("/api", async (req, res) => {
  res.json({ message: "Hello World" });
});

const bundler = new Bundler(path.join(__dirname, "../src/client/index.html"));
app.use(bundler.middleware());

connectDB();

app.listen(port, () => {
  console.log(`Server started at http://localhost:${port}`);
});
