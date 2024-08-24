const express = require("express");
const router = express.Router();
const User = require("../models/user");
const wrapAsync = require("../utils/wrapAsync");
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware.js");
const userController = require("../controllers/user.js");

// Signup Route
router
  .route("/signup")
  .get(userController.signupGetForm)
  .post(wrapAsync(userController.signupPostForm));

// Login Route
router
  .route("/login")
  .get(userController.loginGetForm)
  .post(
    saveRedirectUrl,
    passport.authenticate("local", {
      failureRedirect: "/login",
      failureFlash: true,
    }),
    userController.loginPostForm
  );

router.get("/logout", userController.logoutForm);

module.exports = router;
