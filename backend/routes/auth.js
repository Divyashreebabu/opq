const express = require("express");
const passport = require("passport");
const jwt = require("jsonwebtoken");

const router = express.Router();

const issueToken = (user) => {
  return jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });
};

// Facebook Routes
router.get("/facebook", passport.authenticate("facebook", { scope: ["email"] }));
router.get("/facebook/callback", passport.authenticate("facebook", { session: false }), (req, res) => {
  const token = issueToken(req.user);
  res.redirect(`http://localhost:3000/login-success?token=${token}`);
});

// Google Routes
router.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));
router.get("/google/callback", passport.authenticate("google", { session: false }), (req, res) => {
  const token = issueToken(req.user);
  res.redirect(`http://localhost:3000/login-success?token=${token}`);
});

// Apple Routes
router.get("/apple", passport.authenticate("apple"));
router.post("/apple/callback", passport.authenticate("apple", { session: false }), (req, res) => {
  const token = issueToken(req.user);
  res.redirect(`http://localhost:3000/login-success?token=${token}`);
});

module.exports = router;
