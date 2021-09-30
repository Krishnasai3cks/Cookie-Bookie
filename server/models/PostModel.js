import mongoose from "mongoose";

const postSchema = mongoose.Schema({
  title: String,
  description: String,
  image: String,
  message: String,
  username: String,

  fullname: String,
  stillBidding: {
    type: Boolean,
    default: true,
  },
  winner: {
    type: String,
    default: "",
  },
  creator: String,
  minAskingPrice: String,
  highestBid: String,
  bidList: {
    type: [[String, String]],
    default: [],
  },
  biddingEnd: Date,
  location: String,
  typeOfCookie: String,
  egglessOrEgg: String,
  bakedTime: {
    type: Date,
    default: new Date(),
  },
  likes: {
    type: [String],
    default: [],
  },
});

var PostModel = mongoose.model("posts", postSchema);

export default PostModel;
