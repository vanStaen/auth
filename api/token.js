const express = require("express");
const bcrypt = require("bcryptjs");
const jsonwebtoken = require("jsonwebtoken");
const Token = require("../models/Token");
const router = express.Router();

// POST login
router.post("/", async (req, res) => {
  if (!req.body.refreshToken) {
    return res.status(401).json({ error: `No refresh token was provided` });
  }
  const refreshToken = req.body.refreshToken;
  const token = await Token.findOne({ token: refreshToken });

  if (!token) {
    return res.status(401).json({ error: `Refresh Token does not exist!` });
  }

  const isTokenValid = await jsonwebtoken.verify(
    refreshToken,
    process.env.AUTH_SECRET_KEY_REFRESH
  );

  if (!isTokenValid) {
    return res.status(400).json({ error: `Refresh Token is incorrect!` });
  }

  const accessToken = await jsonwebtoken.sign(
    { userId: isTokenValid.userId, email: isTokenValid.email },
    process.env.AUTH_SECRET_KEY,
    { expiresIn: "15m" }
  );

  res.json({
    token: accessToken,
  });
});

module.exports = router;
