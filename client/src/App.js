import { BrowserRouter, Switch, Route } from "react-router-dom";
import Navbar from "./components/NavBar/NavBar";
import Login from "./components/User/Login.js";
import Register from "./components/User/Register.js";
import Update from "./components/User/Update.js";
import ShowPosts from "./components/Posts/ShowPosts";
import CreatePost from "./components/Posts/CreatePost";
import UpdatePost from "./components/Posts/UpdatePost";
import Home from "./components/Home/Home";
import { useEffect, useState } from "react";
import { CurrentProfileContext } from "./Helpers/CurrentProfileContext";
import ViewAuctions from "./components/Posts/ViewAuctions";
const App = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
  useEffect(() => {
    window.addEventListener("storage", () => {
      setUser(JSON.parse(localStorage.getItem("profile")));
    });
  }, []);
  return (
    <BrowserRouter>
      <CurrentProfileContext.Provider value={{ user, setUser }}>
        <Navbar />
        <Switch>
          <Route path="/posts/create" exact component={CreatePost} />
          <Route path="/posts/viewAuctions" exact component={ViewAuctions} />
          <Route path="/posts/update" exact component={UpdatePost} />
          <Route path="/posts" exact component={ShowPosts} />
          <Route path="/user/login" exact component={Login} />
          <Route path="/user/register" exact component={Register} />
          <Route path="/user/updateProfile" exact component={Update} />
          <Route path="/user/login" exact component={Login} />
          <Route path="/" exact component={Home} />
        </Switch>
      </CurrentProfileContext.Provider>
    </BrowserRouter>
  );
};

export default App;
