const express = require("express");
const colors = require("colors");
const cors = require("cors");
const axios = require("axios");

const app = express();

const PORT = 4002;

const posts = {};

app.use(express.json());
app.use(cors());

const handleEvent = (type, data) => {
  if (type === "PostCreated") {
    const { id, title } = data;
    posts[id] = { id, title, comments: [] };
  } else if (type === "CommentCreated") {
    const { id, content, postId, status } = data;
    const post = posts[postId];
    post.comments.push({ id, content, status });
  } else if (type === "CommentUpdated") {
    const post = posts[data.postId];
    const comment = post.comments.find((x) => x.id === data.id);
    comment.status = data.status;
    comment.content = data.content;
  }
};

app.get("/posts", (req, res) => {
  res.json(posts);
});

app.post("/events", (req, res) => {
  const { type, data } = req.body;
  handleEvent(type, data);
  res.send({});
});

app.listen(PORT, async () => {
  console.log(`Query service listening on ${PORT}`.yellow.bold);
  try {
    const res = await axios.get("http://localhost:4005/events");
    res.data.forEach((event) => {
      console.log(`Processing event: ${event.type}`);
      handleEvent(event.type, event.data);
    });
  } catch (error) {
    console.log(error.message.red.bold);
  }
});
