const express = require("express");
const colors = require("colors");
const { randomBytes } = require("crypto");
const cors = require("cors");
const axios = require("axios");

const app = express();

app.use(express.json());
app.use(cors());
const commentsByPost = {};

const PORT = 4001;

app.get("/posts/:id/comments", (req, res) => {
  res.json(commentsByPost[req.params.id] || []);
});

app.post("/posts/:id/comments", async (req, res) => {
  const commentId = randomBytes(4).toString("hex");
  const { content } = req.body;
  const comments = commentsByPost[req.params.id] || [];

  comments.push({ id: commentId, content, status: "pending" });
  commentsByPost[req.params.id] = comments;

  await axios.post("http://localhost:4005/events", {
    type: "CommentCreated",
    data: { id: commentId, content, postId: req.params.id, status: "pending" },
  });

  res.status(201).send(comments);
});

app.post("/events", async (req, res) => {
  console.log("Received Event", req.body.type);

  const { type, data } = req.body;

  if (type === "CommentModerated") {
    const { postId, id, status } = data;
    const comments = commentsByPost[postId];

    const comment = comments.find((comment) => comment.id === id);
    comment.status = status;
    await axios.post("http://localhost:4005/events", {
      type: "CommentUpdated",
      data: { ...comment, postId },
    });
  }

  res.send({});
});

server = app.listen(PORT, console.log(`Posts service is running on port ${PORT}`.yellow.bold));
