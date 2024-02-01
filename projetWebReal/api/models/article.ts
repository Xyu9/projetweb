import mongoose, { Schema, Types } from "mongoose";

const articleSchema: Schema = new mongoose.Schema({
  title: String,
  content: String,
  date: String,
  //user: { type: Types.ObjectId, ref: 'User' },
  user: String,
});

const Article = mongoose.model('Article', articleSchema);

export { Article };
