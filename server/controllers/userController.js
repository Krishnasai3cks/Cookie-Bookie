import UserModel from "../models/UserModel.js";

import {
  checkUsername,
  checkPhone,
  checkEmail,
  checkUsernameUpdate,
  checkPhoneUpdate,
  checkEmailUpdate,
} from "../controllers/checkingController.js";
import { compare, hash } from "bcrypt";
import jwt from "jsonwebtoken";
export const handleLogin = async (req, res) => {
  const { username, password } = req.body;
  try {
    const oldUser = await UserModel.findOne({ username: username });
    if (!oldUser)
      return res.status(404).json({ message: "User doesn't exist" });
    const checkPassword = await compare(password, oldUser.password);

    if (!checkPassword)
      res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign(
      { username: oldUser.username, password: oldUser.password },
      process.env.SESSION_SECRET,
      { expiresIn: "1h" }
    );
    res.status(200).json({ result: oldUser, token });
  } catch (error) {
    console.log(error);
  }
};
export const handleRegister = async (req, res) => {
  const response = req.body;
  console.log(response);
  try {
    const oldUser = await UserModel.findOne({ username: response.username });
    if (oldUser) return res.status(404).json({ message: "User exists" });
    const hashedPassword = await hash(response.password, 12);
    const newUserData = { ...req.body, password: hashedPassword };
    const usernameCheck = await checkUsername(req, res);
    const phoneCheck = await checkPhone(req, res);
    const emailCheck = await checkEmail(req, res);
    console.log(usernameCheck, phoneCheck, emailCheck);
    if (usernameCheck || phoneCheck || emailCheck) {
      return res.status(400).send({
        message: `${checkUsername(req, res) ? "Username, " : ""} ${
          checkPhone(req, res) ? "Phone, " : ""
        } ${checkEmail(req, res) ? "Email, " : ""}`,
      });
    }
    const newUser = await UserModel.create(newUserData);

    const token = jwt.sign(
      { username: newUser.username, password: newUser.password },
      process.env.SESSION_SECRET,
      { expiresIn: "1h" }
    );
    res.status(200).json({ result: newUser, token });
  } catch (error) {
    console.log(error);
  }
};
export const handleUpdate = async (req, res) => {
  const response = req.body;
  try {
    const oldUser = await UserModel.findOne({ username: response.username });
    if (oldUser) return res.status(404).json({ message: "User exists" });
    const hashedPassword = await bcrypt.hash(response.password, 12);
    const newUserData = { ...req.body, password: hashedPassword };

    if (
      checkUsernameUpdate(req, res) ||
      checkPhoneUpdate(req, res) ||
      checkEmailUpdate(req, res)
    ) {
      res.status(400).send({
        message: `${checkUsernameUpdate(req, res) ? "Username, " : ""} ${
          checkPhoneUpdate(req, res) ? "Phone, " : ""
        } ${checkEmailUpdate(req, res) ? "Email, " : ""}`,
      });
    }

    const newUser = await UserModel.updateOne(
      { username: req.body.username },
      newUserData
    );

    const token = jwt.sign(
      { username: newUser.username, password: newUser.password },
      process.env.SESSION_SECRET,
      { expiresIn: "1h" }
    );
    res.status(200).json({ result: newUser, token });
  } catch (error) {
    console.log(error);
  }
};

// export const getLogin = (req, res) => {
//   res.render("page-login");
// };
// export const getRegister = (req, res) => {
//   res.render("page-register", { ...req.user });
// };
// export const handleRegister = async (req, res, next) => {
//   let actual = req.body;
//   const hash = hashSync(actual.password, 12);
//   actual.password = hash;
//   const phoneTrue = await UserModel.exists({ phone: actual.phone });
//   const usernameTrue = await UserModel.exists({ username: actual.username });
//   const emailTrue = await UserModel.exists({ email: actual.email });
//   console.log(phoneTrue, usernameTrue, emailTrue);
//   if (phoneTrue || usernameTrue || emailTrue) {
//     let error = `${phoneTrue ? "phone, " : ""}${
//       usernameTrue ? "username, " : ""
//     }${emailTrue ? "email" : ""} exists`;

//     res.render("page-register", { ...req.user, backup: req.body, error });
//   } else {
//     const inserted = await UserModel.create(actual);
//     next(null, { _id: inserted._id, ...actual });
//   }
// };

// export const handleLogout = (req, res) => {
//   req.logout();
//   res.status(200).send("Logout Successful");
// };

// export const handleLoginAuthenticate = passport.authenticate("local", {
//   failureRedirect: "/user/register",
// });

// export const getUpdateProfile = (req, res) => {
//   res.render("page-update-profile", { user: req.user });
// };

// export const handleUpdateProfile = async (req, res) => {
//   let newUser = req.body;
//   let oldUser = await UserModel.findOne({ username: req.user.username });
//   oldUser = oldUser._doc;
//   let combined = { ...oldUser, ...newUser };
//   if (combined.role == "Buyer") {
//     delete combined.noOfBusiness;
//     delete combined.GSTIN;
//     delete combined.location;
//   }
//   await UserModel.deleteOne({ phone: oldUser.phone });
//   const phoneTrue = await UserModel.exists({ phone: newUser.phone });
//   const usernameTrue = await UserModel.exists({ username: newUser.username });
//   const emailTrue = await UserModel.exists({ email: newUser.email });
//   console.log(phoneTrue, usernameTrue, emailTrue);
//   if (phoneTrue || usernameTrue || emailTrue) {
//     await UserModel.create(oldUser);
//     req.user = oldUser;
//     let error = `${phoneTrue ? "phone, " : ""}${
//       usernameTrue ? "username, " : ""
//     }${emailTrue ? "email" : ""} exists`;
//     res.render("page-update-profile", { user: req.user, error });
//   } else {
//     let updatedUser = await UserModel.create(combined);
//     res.redirect("/user/login");
//   }
// };
