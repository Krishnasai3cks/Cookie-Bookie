export function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  } else {
    req.flash("errors", "Please login");
    res.status(200).send("user doesn't exist");
  }
  res.redirect("/user/login");
}
export function ensureUnAuthenticated(req, res, next) {
  if (!req.isAuthenticated()) {
    return next();
  } else {
    req.flash("errors", "You are logged in");
    res.status(200).send("user exists");
  }
  res.redirect("/user");
}
