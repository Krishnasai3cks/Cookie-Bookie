import AppBar from "@mui/material/AppBar";
import Link from "@mui/material/Link";
import Button from "@mui/material/Button";
import CameraIcon from "@mui/icons-material/PhotoCamera";
import CssBaseline from "@mui/material/CssBaseline";

import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

import { useContext, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory, useLocation } from "react-router";
import * as constants from "../../constants.js";
import decode from "jwt-decode";
import useStyles from "./styles";
import { CurrentProfileContext } from "../../Helpers/CurrentProfileContext.js";

const Navbar = () => {
  const cls = useStyles();
  const dispatch = useDispatch();
  const { user, setUser } = useContext(CurrentProfileContext);
  // const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
  const location = useLocation();
  const history = useHistory();
  const showToSellers =
    user &&
    (user.result.role === "Seller" ||
      (user.result.role === "Both" && user.currentRole === "Seller"));
  const logout = () => {
    dispatch({ type: constants.LOGOUT });

    history.push("/user/login");

    setUser(null);
  };
  const handleSwitchRole = () => {
    localStorage.setItem(
      "profile",
      JSON.stringify({
        ...user,
        currentRole: user.currentRole === "Buyer" ? "Seller" : "Buyer",
      })
    );
    setUser(JSON.parse(localStorage.getItem("profile")));
  };
  useEffect(() => {
    const token = user?.token;

    if (token) {
      const decodedToken = decode(token);

      if (decodedToken.exp * 1000 < new Date().getTime()) logout();
    }

    setUser(JSON.parse(localStorage.getItem("profile")));
  }, [location]);
  return (
    <div>
      <CssBaseline />
      <AppBar position="static">
        <Toolbar className={cls.toolBar}>
          <div>
            <a href="/posts">
              <Button variant="contained" color="secondary">
                View Posts
              </Button>
            </a>
            {user ? (
              <>
                {showToSellers ? (
                  <>
                    <a href="/posts/create">
                      <Button variant="contained" color="secondary">
                        Create Post
                      </Button>
                    </a>
                    <a href="/posts/viewAuctions">
                      <Button variant="contained" color="secondary">
                        View OnGoing Auctions
                      </Button>
                    </a>
                  </>
                ) : (
                  <></>
                )}

                <a href="/user/updateProfile">
                  <Button variant="contained" color="secondary">
                    Update Profile
                  </Button>
                </a>
                <Button variant="contained" color="error" onClick={logout}>
                  Logout
                </Button>
                <Typography
                  variant="span"
                  color="inherit"
                  sx={{ flexGrow: 1 }}
                  noWrap
                >
                  {"Welcome "}
                  {user.result.fullname}!
                </Typography>
              </>
            ) : (
              <>
                <a href="/user/login">
                  <Button variant="contained" color="success">
                    login
                  </Button>
                </a>
                <a href="/user/register">
                  <Button variant="contained" color="success">
                    register
                  </Button>
                </a>
              </>
            )}
          </div>
          <>
            {user && user.result.role === "Both" ? (
              <Button
                variant="contained"
                color="secondary"
                onClick={handleSwitchRole}
              >
                Switch to {user.currentRole === "Buyer" ? "Seller" : "Buyer"}
              </Button>
            ) : (
              <></>
            )}
          </>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Navbar;
