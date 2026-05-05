"use strict";

import mongoose from "mongoose";

const Schema = mongoose.Schema;

const schema = new Schema({
  name: {
    type: String,
    required: true,
  },

  createDate: {
    type: Date,
    required: true,
    default: Date.now,
  },

  email: {
    type: String,
    required: true,
    unique: true,
  },
});

export default mongoose.model("User", schema);
