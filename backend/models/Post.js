const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  caption: {
    type: String,
    required: true,
  },
  photo: {
    type: Image,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
});

mongoose.model("post", postSchema);
