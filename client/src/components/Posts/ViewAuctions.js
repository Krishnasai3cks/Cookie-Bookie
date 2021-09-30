import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";
import { getPostsAction } from "../../actions/postsAction.js";
import { Grid, CircularProgress, Container, CssBaseline } from "@mui/material";
import Post from "./Post/Post.js";
const ViewAuctions = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
  const { posts, loaded } = useSelector((state) => {
    let response = state.posts;
    response.posts = response.posts.filter((post) => {
      return post.creator === user.result._id;
    });
    return response;
  });
  const dispatch = useDispatch();
  const history = useHistory();
  useEffect(() => {
    dispatch(getPostsAction(history, "/posts/viewAuctions"));
  }, []);
  return (
    <div>
      {!loaded || !posts.length ? (
        <CircularProgress />
      ) : (
        <Grid
          container
          padding={2}
          spacing={2}
          style={{ backgroundColor: "rebeccapurple", height: "100vh" }}
        >
          {posts?.map((post) => {
            return <Post post={post} key={post._id} />;
          })}
        </Grid>
      )}
    </div>
  );
};
export default ViewAuctions;
/* 

{"_id":"614b2aa557995a9da4d79850","title":"masala dosa","description":"a tasty version of masala dosa ""message":"please eat this ","minAskingPrice":"12","highestBid":"123","biddingEnd":"2021-09-22","location":"hyderabad","egglessOrEgg":"egg","bakedTime":"2021-09-22T13:06:02.640Z","likes":[],"__v":0}
fullname, username, phone, email, password, nameOfBusiness, GSTIN, location, */
