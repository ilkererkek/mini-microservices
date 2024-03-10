const express = require("express");
const colors = require("colors");
const { randomBytes } = require("crypto");
const cors = require("cors");
const axios = require("axios");

const app = express();

app.use(express.json());
app.use(cors());
const posts = {};

const PORT = 4000;

app.get("/posts", (req, res) => {
  res.json(posts);
});

app.post("/posts", async (req, res) => {
  const id = randomBytes(4).toString("hex");
  const { title } = req.body;
  posts[id] = {
    id,
    title,
  };
  await axios.post("http://localhost:4005/events", { type: "PostCreated", data: posts[id] });
  res.status(201).json(posts[id]);
});

app.post("/events", (req, res) => {
  console.log("Received Event", req.body.type);
  res.send({});
});

server = app.listen(PORT, console.log(`Posts service is running on port ${PORT}`.yellow.bold));
