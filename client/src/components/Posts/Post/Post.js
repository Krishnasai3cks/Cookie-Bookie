import * as React from "react";
import {
  Card,
  CardHeader,
  Paper,
  CardMedia,
  CardContent,
  Grid,
  CardActions,
  Avatar,
  IconButton,
  Typography,
  TextField,
  Button,
  MenuItem,
} from "@mui/material";
import { red } from "@mui/material/colors";
import {
  Favorite,
  KeyboardArrowDown,
  MoreVert,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Close as CloseIcon,
} from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import {
  likePostAction,
  newBidAction,
  removebidAction,
} from "../../../actions/postsAction";
import { useHistory } from "react-router";
import useStyles from "./styles";
import { CurrentProfileContext } from "../../../Helpers/CurrentProfileContext";
import StyledMenu from "./StyledMenu";

export default function Post({ post }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleEdit = () => {};
  const { user, setUser } = React.useContext(CurrentProfileContext);
  React.useEffect(() => {
    window.addEventListener("storage", () => {
      setUser(JSON.parse(localStorage.getItem("profile")) || []);
    });
  }, []);

  const [likes, setLikes] = React.useState(post.likes);
  const cls = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const minValueForBidding = post.highestBid
    ? parseInt(post.highestBid) + 1
    : post.minAskingPrice;
  const handleNewBid = (e) => {
    e.preventDefault();

    dispatch(
      newBidAction(
        post._id,
        user.result._id,
        e.target.elements.newBid.value,
        history
      )
    );
    window.location.reload();
  };
  const handleRemoveBid = () => {
    dispatch(removebidAction(post._id, user.result._id, history));
    window.location.reload();
  };
  const handleLikePost = () => {
    if (user) {
      dispatch(likePostAction(post._id, history));
      if (likes.includes(user.result._id)) {
        setLikes(post.likes.filter((id) => id !== user.result._id));
      } else {
        setLikes([...post.likes, user.result._id]);
      }
    } else {
      console.log("unauthenticated");
    }
  };
  return (
    <Grid item sx={{ maxWidth: 345 }} xs={8}>
      <Paper>
        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
              {post.username.charAt(0)}
            </Avatar>
          }
          action={
            user &&
            (user.result.role !== "Both"
              ? user.result.role === "Seller" &&
                user.result._id === post.creator
              : user.currentRole === "Seller" &&
                user.result._id === post.creator) ? (
              <>
                <IconButton
                  id="demo-customized-button"
                  aria-controls="demo-customized-menu"
                  aria-haspopup="true"
                  style={{ backgroundColor: "rebeccapurple" }}
                  aria-expanded={open ? "true" : undefined}
                  variant="contained"
                  disableElevation
                  onClick={handleClick}
                  endIcon={<KeyboardArrowDown />}
                ></IconButton>
                <StyledMenu
                  id="demo-customized-menu"
                  MenuListProps={{
                    "aria-labelledby": "demo-customized-button",
                  }}
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleClose}
                >
                  <MenuItem onClick={handleClose} disableRipple>
                    <CloseIcon />
                    End Bid
                  </MenuItem>
                  <MenuItem onClick={handleClose} disableRipple>
                    <EditIcon />
                    Edit
                  </MenuItem>
                  <MenuItem onClick={handleClose} disableRipple>
                    <DeleteIcon />
                    Delete
                  </MenuItem>
                </StyledMenu>
              </>
            ) : (
              <></>
            )
          }
          title={
            (post.businessName
              ? post.businessName
              : `${post.fullname}(${post.username})`) + ` - ${post.location}`
          }
          subheader={post.bakedTime.split("T")[0]}
        />
        <CardMedia
          component="img"
          height="194"
          image={post.image}
          alt="Paella dish"
        />
        <CardContent className={cls.description}>
          <Typography variant="h6" color="text.secondary">
            {post.title +
              " (" +
              post.egglessOrEgg +
              ")" +
              " (" +
              post.typeOfCookie +
              ")"}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {post.description}
          </Typography>
          <CardContent>
            <Typography variant="body2" color="text.secondary">
              Minimum Asking Price - {post.minAskingPrice}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Current Highest Bid - {post.highestBid}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Baked Time - {post.bakedTime.split("T")[0]}
            </Typography>
          </CardContent>
        </CardContent>
        <CardActions disableSpacing>
          <IconButton onClick={handleLikePost} aria-label="add to favorites">
            <Favorite /> {"   " + likes.length}
          </IconButton>
          {user &&
          user.result._id !== post.creator &&
          (user.result.role === "Buyer" ||
            (user.result.role === "Both" && user.currentRole === "Buyer")) &&
          post.stillBidding ? (
            post.bidList.filter((single) => single[0] === user.result._id)
              .length ? (
              <>
                <Button onClick={handleRemoveBid}>Remove Bid</Button>
              </>
            ) : (
              <>
                <form onSubmit={handleNewBid} style={{ display: "flex" }}>
                  <TextField
                    type="number"
                    name="newBid"
                    defaultValue={minValueForBidding}
                    InputProps={{
                      inputProps: {
                        min: minValueForBidding,
                      },
                    }}
                    label="Place Bid"
                  ></TextField>
                  <Button type="submit" value="Submit">
                    Submit
                  </Button>
                </form>
              </>
            )
          ) : (
            <></>
          )}
        </CardActions>
      </Paper>
    </Grid>
  );
}
