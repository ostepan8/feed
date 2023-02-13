const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const User = mongoose.model("User");

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  const token = authorization;
  if (!token) {
    return res.status(401).send({ error: "You must be logged in" });
  }

  jwt.verify(token, process.env.JWT_SECRET, async (err, payload) => {
    if (err) {
      return res.status(401).json({ error: "You must be logged in" });
    }

    const { _id } = payload;
    console.log(_id);
    User.findById(_id).then((userData) => {
      req.user = userData;
      console.log(req.user);
      next();
    });
  });
};
