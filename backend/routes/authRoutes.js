const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const User = mongoose.model("User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const Post = mongoose.model("Post");

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
        res.send({ token: token, username: savedUser.username });
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
router.post("/NewPost", async (req, res) => {
  const { username, caption, location, time, type } = req.body;
  if (!username || !caption || !location || !time || !type) {
    return res.status(422).json({ error: "Please fill out all forms" });
  }
  const post = new Post({
    username,
    caption,
    location,
    time,
    type,
  });
  try {
    await post.save();
    res.send({ post });
  } catch (err) {
    return res.status(422).send({ error: err.message });
  }
});
router.post("/getPosts", async (req, res) => {
  const { email } = req.body;
  const savedUser = await User.findOne({ email: email });

  const breakfastPosts = await Post.find({
    username: savedUser.username,
    type: "Breakfast",
  });
  const lunchPosts = await Post.find({
    username: savedUser.username,
    type: "Lunch",
  });
  const dinnerPosts = await Post.find({
    username: savedUser.username,
    type: "Dinner",
  });
  const posts = {
    breakfast: breakfastPosts,
    lunch: lunchPosts,
    dinner: dinnerPosts,
  };

  res.send(posts);
});

module.exports = router;
