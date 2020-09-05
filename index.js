const express = require("express");
const app = express();

app.use("/", require("./controller"));

app.listen(3000, () => console.log("Running ... "));
