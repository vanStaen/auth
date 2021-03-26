const express = require("express");
const bcrypt = require("bcryptjs");
const User = require("../models/User");
const router = express.Router();

// POST user
router.post("/", async (req, res) => {

  if (!req.body.name) {
    return res.status(400).json({ error: `No name was provided` });
  }
  if (!req.body.email) {
    return res.status(400).json({ error: `No email was provided` });
  }
  if (!req.body.password) {
    return res.status(400).json({ error: `No password was provided` });
  }

  hashedPassword = await bcrypt.hash(req.body.password, 12);

  const passport = await new User({
    name: req.body.name,
    email: req.body.email,
    password: hashedPassword,
    active: true,
  });

  const passportExist = await User.findOne({ email: email });

  if (passportExist) {
    return res.status(400).json({ error: `User already exist!` });
  } else {
    const userCreated = await passport.save();
    const accessToken = "1234567";
    const refreshToken = "1234567";
    // response
    res.status(200).json({
      userId: userCreated.id,
      userEmail: email,
      token: accessToken,
      refreshToken: refreshToken,
    });
  }
});

module.exports = router;


/* createUser: (args, req) => {
    return User.findOne({ email: args.userInput.email })
      .then((user) => {
        if (user) {
          throw new Error(errorName.EMAIL_ALREADY_IN_USE);
        }
        return bcrypt.hash(args.userInput.password, 12);
      })
      .then((hashedPassword) => {
        const user = new User({
          name: args.userInput.name,
          email: args.userInput.email,
          password: hashedPassword,
          active: true,
        });
        return user.save();
      })
      .then((result) => {
        return { ...result._doc, password: null };
      })
      .catch((err) => {
        throw err;
      });
  } */