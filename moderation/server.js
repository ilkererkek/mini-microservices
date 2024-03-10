const express = require("express");
const colors = require("colors");
const axios = require("axios");

const app = express();

PORT = 4003;

app.use(express.json());

app.post("/events", async (req, res) => {
  const { type, data } = req.body;
  if (type === "CommentCreated") {
    const status = data.content.includes("orange") ? "rejected" : "approved";
    await axios.post("http://localhost:4005/events", {
      type: "CommentModerated",
      data: { id: data.id, postId: data.postId, status, content: data.content },
    });
  }
  res.send({});
});

app.listen(PORT, console.log(`Moderation Service is running on port ${PORT}.`.yellow.bold));
