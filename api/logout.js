const express = require("express");
const bcrypt = require("bcryptjs");
const jsonwebtoken = require("jsonwebtoken");
const Token = require("../models/Token");
const router = express.Router();

// POST login
router.delete("/", async (req, res) => {
  if (!req.body.refreshToken) {
    return res.status(401).json({ error: `No refresh token was provided` });
  }
  const refreshToken = req.body.refreshToken;
  const deleteToken = await Token.deleteOne({ token: refreshToken });

  if (deleteToken.deletedCount === 0) {
    return res.status(401).json({ error: `Refresh token does not exist!` });
  }

  // Html resp code 204 return no content
  res.status(204).json();
});

module.exports = router;
