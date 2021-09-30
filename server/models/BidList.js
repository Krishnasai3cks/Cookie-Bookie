import mongoose from "mongoose";

const bidList = mongoose.Schema({
  bidder: String,
  post: String,
});

var BidList = mongoose.model("bids", bidList);

export default BidList;
