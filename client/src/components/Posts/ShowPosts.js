import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";
import { getPostsAction } from "../../actions/postsAction.js";
import {
  Grid,
  CircularProgress,
  Container,
  CssBaseline,
  Toolbar,
  AppBar,
  Button,
  TextField,
  RadioGroup,
  Radio,
  FormControlLabel,
  FormLabel,
  InputLabel,
  Select,
  MenuItem,
  FormControl,
} from "@mui/material";
import Post from "./Post/Post.js";
const oneDay = 86400000;
const ShowPosts = () => {
  const [filtersTrue, setFiltersTrue] = useState(false);
  const [filters, setFilters] = useState({
    typeOfCookie: "any",
    location: "any",
    bakedTime: "any",
    egglessOrEgg: "any",
  });
  const [filteredPosts, setFilteredPosts] = useState([]);
  let { posts, loaded } = useSelector((state) => {
    return state.posts;
  });
  const dispatch = useDispatch();
  const history = useHistory();
  useEffect(() => {
    dispatch(getPostsAction(history));
  }, []);
  const handleFilters = (e) => {
    const { elements } = e.target;
    e.preventDefault();
    Object.keys(filters).forEach((filter) => {
      if (elements[filter].value && elements[filter].value !== "any") {
        if (filter === "bakedTime") {
          console.log(elements[filter].value);
          if (elements[filter].value === "day") {
            posts = posts.filter((post) => {
              let dayTimeLapse =
                new Date().getTime() - new Date(post.bakedTime).getTime();
              return dayTimeLapse / oneDay < 1;
            });
          } else if (elements[filter].value === "week")
            posts = posts.filter((post) => {
              let weekTimeLapse =
                new Date().getTime() - new Date(post.bakedTime).getTime();
              return weekTimeLapse / (7 * oneDay) < 1;
            });
          else
            posts = posts.filter((post) => {
              let weekTimeLapse =
                new Date().getTime() - new Date(post.bakedTime).getTime();
              return weekTimeLapse / (7 * oneDay) >= 1;
            });
        } else {
          posts = posts.filter(
            (posts) => posts[filter] === elements[filter].value
          );
        }
      }
    });
    console.log(posts);
    setFiltersTrue("true");
    setFilteredPosts(posts);
  };
  return (
    <div>
      {!loaded || !posts.length ? (
        <CircularProgress />
      ) : (
        <>
          <Toolbar>
            <form onSubmit={handleFilters} style={{ display: "flex" }}>
              <TextField name="typeO fCookie" type="text" placeholder="type" />
              <TextField name="location" type="text" placeholder="location" />

              <InputLabel id="demo-simple-select-label">Baked Time</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                name="bakedTime"
                label="Baked Time"
              >
                <MenuItem value="any">any</MenuItem>
                <MenuItem value="day">less than a day ago</MenuItem>
                <MenuItem value="week">less than a week ago</MenuItem>
                <MenuItem value="morethanaweek">more than a week ago.</MenuItem>
              </Select>
              <FormLabel component="legend">Egg or Eggless</FormLabel>
              <RadioGroup row aria-label="egglessOrEgg" name="egglessOrEgg">
                <FormControlLabel value="egg" control={<Radio />} label="egg" />
                <FormControlLabel
                  value="eggLess"
                  control={<Radio />}
                  label="eggLess"
                />
                <FormControlLabel value="" control={<Radio />} label="any" />
              </RadioGroup>
              <Button color="primary" variant="contained" type="submit">
                Filter
              </Button>
            </form>
          </Toolbar>

          <Grid
            container
            margin={1}
            padding={2}
            spacing={2}
            style={{ backgroundColor: "rebeccapurple", height: "100vh" }}
          >
            {(filtersTrue ? filteredPosts : posts)?.map((post) => {
              return <Post post={post} key={post._id} />;
            })}
          </Grid>
        </>
      )}
    </div>
  );
};
export default ShowPosts;
/* 

{"_id":"614b2aa557995a9da4d79850","title":"masala dosa","description":"a tasty version of masala dosa ""message":"please eat this ","minAskingPrice":"12","highestBid":"123","biddingEnd":"2021-09-22","location":"hyderabad","egglessOrEgg":"egg","bakedTime":"2021-09-22T13:06:02.640Z","likes":[],"__v":0}
fullname, username, phone, email, password, nameOfBusiness, GSTIN, location, */
