import {
  getPosts,
  showCreatePost,
  createPost,
  likePost,
  placeBid,
  removeBid,
} from "../controllers/postController.js";
import auth from "../middleware/auth.js";
function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  } else {
    req.flash("errors", "Please login");
  }
  res.redirect("/user/login");
}
import express from "express";
const router = express.Router();

router.get("/", getPosts);
router
  .route("/create")
  // .get(auth, showCreatePost)
  .post(auth, createPost);
router.post("/like", likePost);
router.post("/placeBid", placeBid);
router.post("/removeBid", removeBid);
export default router;
