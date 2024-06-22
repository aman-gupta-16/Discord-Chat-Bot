const express = require("express");
const { Server } = require("http");

const app = express();

app.all("/", (req, res) => {
  res.send("Bot is running");
});

function keepAlive() {
  app.listen(8000, () => {
    console.log("Server is ready");
  });
}

module.exports = {
  keepAlive,
};
