import express from "express";
import PostModel from "../models/PostModel.js";
import ObjectId from "ObjectId";
const router = express.Router();

export const getPosts = async function (req, res) {
  try {
    const posts = await PostModel.find();
    res.status(200).send(posts);
    // res.status(200).render("posts/index", { posts, user: req.user });
  } catch (error) {
    console.log(error);
  }
};
export const showCreatePost = (req, res) => {
  res.render("posts/page-create-post", { user: req.user });
};
export const createPost = async (req, res) => {
  try {
    const post = req.body;
    const newpost = await PostModel.create(post);
    res.status(200).json(newpost);
  } catch (error) {
    console.log("createPost", error);
  }
};

export const likePost = async (req, res) => {
  try {
    const id = Object.keys(req.body)[0];
    const findPost = await PostModel.findOne({ _id: ObjectId(id) });
    if (findPost.likes.includes(id)) {
      findPost.likes.remove(id);
    } else {
      findPost.likes.push(id);
    }
    const likePost = await PostModel.updateOne({ _id: ObjectId(id) }, findPost);
    res.status(200).json({ post: likePost });
  } catch (error) {
    console.log(error);
  }
};
export const placeBid = async (req, res) => {
  const { postId, userId, value } = req.body;
  try {
    const findPost = await PostModel.findOne({ _id: ObjectId(postId) });
    if (findPost.bidList.includes(userId)) {
      findPost.bidList = findPost.bidList.filter((id) => {
        id !== userId;
      });
    }
    findPost.bidList.push([userId, value]);
    findPost.highestBid = value;
    await PostModel.updateOne({ _id: ObjectId(postId) }, findPost);
    res.status(200).json({ post: findPost });
  } catch (error) {
    console.log(error);
  }
};
export const removeBid = async (req, res) => {
  const { postId, userId } = req.body;
  try {
    const findPost = await PostModel.findOne({ _id: ObjectId(postId) });
    const bidListLength = findPost.bidList.length;
    findPost.bidList = findPost.bidList.filter((a) => a[0] !== userId);
    findPost.highestBid =
      findPost.bidList[bidListLength - 1] || findPost.minAskingPrice;

    await PostModel.updateOne({ _id: ObjectId(postId) }, findPost);
    res.status(200).json({ post: findPost });
  } catch (error) {
    console.log(error);
  }
};
export default router;
