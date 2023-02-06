const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const User = mongoose.model("User");

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  const token = authorization;
  if (!authorization) {
    return res.status(401).send({ error: "You must be logged in" });
  }

  jwt.verify(authorization, process.env.JWT_SECRET, async (err, payload) => {
    if (err) {
      return res.status(401).json({ error: "You must be logged in" });
    }
    console.log(payload);
    const { _id } = payload;
    console.log(_id);
    User.findById(_id).then((userData) => {
      req.user = userData;
      console.log(req.user);
      next();
    });
  });
};
