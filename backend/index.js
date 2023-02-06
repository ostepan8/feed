const express = require("express");
const port = 3000;

const app = express();
const bodyParser = require("body-parser");

require("./db");
require("./models/User");

const authRoutes = require("./routes/authRoutes");
const requireToken = require("./middlewares/AuthTokenRequired");

app.use(bodyParser.json());
app.use(authRoutes);

app.get("/", requireToken, (req, res) => {
  res.send(req.user);
  console.log(req.user);
});

app.listen(port, () => {
  console.log("Server is running on port " + port);
});
