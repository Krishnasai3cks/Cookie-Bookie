import express from "express";
import {
  handleLogin,
  handleRegister,
  handleUpdate,
} from "../controllers/userController.js";
const router = express.Router();
router.post("/login", handleLogin);
router.post("/register", handleRegister);
router.post("/update", handleUpdate);
// import {
//   ensureAuthenticated,
//   ensureUnAuthenticated,
// } from "../ensureAuthenticated.js";

// router.get("/", (req, res) => {
//   console.log(req.user);
//   if (typeof req.user !== "undefined") res.send(req.user);
//   else res.send({ error: true });
// });

// router
//   .route("/login")
//   .get(ensureUnAuthenticated, getLogin)
//   .post(ensureUnAuthenticated, handleLoginAuthenticate, (req, res, next) => {
//     // res.redirect("/");
//     console.log("success", req.user);
//     res.status(200).send(req.user);
//   });
// router
//   .route("/register")
//   .get(ensureUnAuthenticated, getRegister)
//   .post(
//     ensureUnAuthenticated,
//     handleRegister,
//     handleLoginAuthenticate,
//     (req, res, next) => {
//       next();
//     }
//   );
// router
//   .route("/updateProfile")
//   .get(ensureAuthenticated, getUpdateProfile)
//   .post(ensureAuthenticated, handleUpdateProfile);
// router.get("/usernamecheck", ensureAuthenticated, checkUsername);
// router.get("/phonecheck", ensureAuthenticated, checkPhone);
// router.get("/emailcheck", ensureAuthenticated, checkEmail);

// router.get("/usernameupdateCheck", ensureAuthenticated, checkUsernameUpdate);

// router.get("/phoneupdateCheck", ensureAuthenticated, checkPhoneUpdate);
// router.get("/emailupdateCheck", ensureAuthenticated, checkEmailUpdate);
// router
//   .route("/logout")
//   .get(ensureAuthenticated, handleLogout)
//   .post(ensureAuthenticated, handleLogout);
export default router;
