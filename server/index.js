const express = require("express");
const app = express();
const cors = require("cors");
const TODO = require("./todo");

app.use(cors());
app.use(express.json());

//ROUTES//
app.use("/todos", TODO);

app.listen(4000, () => {
  console.log("Listening to port 4000");
});
