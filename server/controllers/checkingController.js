import UserModel from "../models/UserModel.js";

export const checkUsername = async (req, res) => {
  let user = await UserModel.findOne({ username: req.query.username });
  if (user) return true;
  else return false;
};
export const checkPhone = async (req, res) => {
  let user = await UserModel.findOne({ phone: req.query.phone });
  if (user) return true;
  else return false;
};
export const checkEmail = async (req, res) => {
  let user = await UserModel.findOne({ email: req.query.email });
  if (user) return true;
  else return false;
};
export const checkUsernameUpdate = async (req, res) => {
  let user = await UserModel.findOne({ username: req.query.username });
  if (user && user.username !== req.user.username) return true;
  else return false;
};
export const checkPhoneUpdate = async (req, res) => {
  let user = await UserModel.findOne({ username: req.query.phone });
  if (user && user.phone !== req.user.phone) return true;
  else return false;
};
export const checkEmailUpdate = async (req, res) => {
  let user = await UserModel.findOne({ username: req.query.email });
  if (user && user.email !== req.user.email) return true;
  else return false;
};
