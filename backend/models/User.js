const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  fname: {
    type: String,
    required: true,
  },
  lname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: "String",
    required: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  bio: {
    type: String,
  },
});

userSchema.pre("save", async function (next) {
  const user = this;

  if (!user.isModified("password")) {
    return next();
  }
  user.password = await bcrypt.hash(user.password, 8);

  next();
});

mongoose.model("User", userSchema);
