const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const User = mongoose.model("User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

require("dotenv").config();

router.post("/signup", (req, res) => {
  const { fname, email, password, username, lname } = req.body;
  const { bio } = { bio: "" };
  if (!email || !password || !fname || !username || !lname) {
    return res.status(422).send({ error: "Please fill out all of the fields" });
  } else {
    User.findOne({ username: username }).then(async (savedUser) => {
      if (savedUser) {
        return res.status(422).send({ error: "Username already exists" });
      } else {
        User.findOne({ email: email }).then(async (savedUser) => {
          if (savedUser) {
            return res.status(422).send({ error: "Email already exists" });
          }
          const user = new User({
            fname,
            lname,
            email,
            password,
            username,
            bio,
          });
          try {
            await user.save();
            const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
            res.send({ token });
          } catch (err) {
            return res.status(422).send({ error: err.message });
          }
        });
      }
    });
  }
});
router.post("/signin", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(422).json({ error: "Please add email and password" });
  }
  const savedUser = await User.findOne({ email: email });
  if (!savedUser) {
    return res.status(422).json({ error: "Invalid email" });
  }
  try {
    bcrypt.compare(password, savedUser.password, (err, result) => {
      if (result) {
        const token = jwt.sign({ _id: savedUser._id }, process.env.JWT_SECRET);
        res.send({ token });
      } else {
        return res.status(422).json({ error: "Invalid Credentials" });
      }
    });
  } catch (err) {
    console.log(err);
  }
});
router.post("/profile", async (req, res) => {
  const { email } = req.body;
  const savedUser = await User.findOne({ email: email });
  if (!savedUser) {
    return res.status(422).json({ error: "Profile not found" });
  }
  res.send(savedUser);
  return;
});
router.post("/editprofile", async (req, res) => {
  const { email, bio } = req.body;
  const savedUser = await User.findOne({ email: email });
  savedUser.bio = bio;
  await savedUser.save();
  return;
});

module.exports = router;
