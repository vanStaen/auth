const express = require("express");
const bcrypt = require("bcryptjs");
const jsonwebtoken = require("jsonwebtoken");
const Passport = require("../models/Passport");
const Token = require("../models/Token");
const router = express.Router();

// POST login
router.post("/", async (req, res) => {
  if (!req.body.password) {
    return res.status(400).json({ error: `No password was provided` });
  }
  if (!req.body.email) {
    return res.status(400).json({ error: `No email was provided` });
  }

  const email = req.body.email;
  const password = req.body.password;
  const passport = await Passport.findOne({ email: email });

  if (!passport) {
    return res.status(400).json({ error: `Passport does not exist!` });
  }

  const isValid = await bcrypt.compare(password, passport.password);

  if (!isValid) {
    return res.status(400).json({ error: `Password is incorrect!` });
  }

  const accessToken = await jsonwebtoken.sign(
    { userId: passport.id, email: passport.email },
    process.env.AUTH_SECRET_KEY,
    { expiresIn: "15m" }
  );

  const refreshToken = await jsonwebtoken.sign(
    { userId: passport.id, email: passport.email },
    process.env.AUTH_SECRET_KEY_REFRESH,
    { expiresIn: "7d" }
  );

  // Add refresh token to db
  const newToken = new Token({
    token: refreshToken,
    userId: passport.id,
    email: passport.email,
  });
  const savedToken = await newToken.save();

  // response
  res.status(200).json({
    userId: passport.id,
    userEmail: email,
    token: accessToken,
    refreshToken: refreshToken,
  });
});

module.exports = router;
