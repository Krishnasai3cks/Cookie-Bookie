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
