import { useContext, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, useLocation } from "react-router";
import { getUser, loginUser } from "../../actions/userActions.js";
const Login = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();
  const user = useSelector((state) => {
    let temp = state.user;
    return temp;
  });
  const handleLoginUser = (e) => {
    e.preventDefault();
    const formData = e.target.elements;
    dispatch(
      loginUser(
        {
          username: formData.username.value,
          password: formData.password.value,
        },
        history
      )
    );
  };
  return (
    <div>
      <form onSubmit={handleLoginUser}>
        <input type="text" name="username" />
        <input type="password" name="password" />
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
};
export default Login;
