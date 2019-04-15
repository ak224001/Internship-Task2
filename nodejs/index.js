const express = require("express");
const bodyparser = require("body-parser");
const cors = require("cors");
const { mangoose } = require("./db");
var PersonController = require("./controllers/PersonController");
const app = express();

app.use(
  bodyparser.urlencoded({
    extended: true
  })
);
app.use(bodyparser.json());
app.use(cors({ origin: "http://localhost:4200" }));
const port = 5000;
app.listen(port, () => {
  console.log("Express server is running on port no ", port);
});

app.use("/person", PersonController);
