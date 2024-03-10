const express = require("express");
const colors = require("colors");
const axios = require("axios");

const app = express();

PORT = 4005;

app.use(express.json());

const events = [];

app.post("/events", async (req, res) => {
  const event = req.body;
  console.log(event);

  events.push(event);
  axios
    .post("http://localhost:4000/events", event)
    .then()
    .catch((err) => {
      console.log(err.message.red.bold);
    });
  axios
    .post("http://localhost:4001/events", event)
    .then()
    .catch((err) => {
      console.log(err.message.red.bold);
    });
  axios
    .post("http://localhost:4002/events", event)
    .then()
    .catch((err) => {
      console.log(err.message.red.bold);
    });
  axios
    .post("http://localhost:4003/events", event)
    .then()
    .catch((err) => {
      console.log(err.message.red.bold);
    });

  res.send({ status: "OK" });
});

app.get("/events", async (req, res) => {
  res.json(events);
});

app.listen(PORT, console.log(`Event Bus listening on port ${PORT}.`.green.bold));
