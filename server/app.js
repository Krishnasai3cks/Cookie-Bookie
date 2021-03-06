import session from "express-session";
import MongoStore from "connect-mongo";
import flash from "connect-flash";
import passport from "passport";
import express from "express";
import mongoose from "mongoose";
import userRoutes from "./routes/user.js";
import dotenv from "dotenv";
import { v4 as uuidV4 } from "uuid";
import cors from "cors";
import cookieParser from "cookie-parser";
dotenv.config();
import postRoutes from "./routes/posts.js";
//another way of subbmitting data
let sessionOptions = {
  secret: process.env.SESSION_SECRET,
  store: new MongoStore({
    mongoUrl: process.env.CONNECTION_URL,
    collectionName: "sessions",
  }),
  resave: true,
  saveUninitialized: true,
  cookie: { httpOnly: true },
};

const app = express();

app.use(express.json({ extended: true, limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(session(sessionOptions));
app.use(cookieParser(process.env.SESSION_SECRET));
app.use(passport.initialize());
app.use(passport.session());

app.use(function (req, res, next) {
  res.locals.errors = req.flash("errors");
  res.locals.success = req.flash("success");
  //make  current user id available on all req obj
  if (req.user) {
    req.visitorId = req.user._id;
  } else {
    req.visitorId = 0;
  }
  // make user session data available from within view templates
  res.locals.user = req.user;
  next();
});
app.get("/", (req, res) => {
  res.render("index");
});
app.use("/user", userRoutes);
app.use("/posts", postRoutes);
const CONNECTION_URL = process.env.CONNECTION_URL;
const PORT = process.env.PORT || 5000;

app.get("/join", (req, res) => {
  res.send({ link: uuidV4() });
});

mongoose
  .connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() =>
    app.listen(PORT, () =>
      console.log(`Server Running on Port: http://localhost:${PORT}`)
    )
  )
  .catch((error) => console.log(`${error} did not connect`));
