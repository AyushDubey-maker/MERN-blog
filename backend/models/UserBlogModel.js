const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema({
  title: String,
  description:String,
  author: String,
  articleImage:String,
  likes:{type:Number,default:0},
  likedBy:{type:Array},
  dislikes: { type: Number, default: 0 },
  dislikedBy: { type: Array },
  comments: [{
    comment: { type: String},
    commentator: { type: String }
  }],
  uid: String,
  date: { type: Date, default: Date.now() },
});

const Blog = mongoose.model("Blog", blogSchema);
module.exports=Blog;