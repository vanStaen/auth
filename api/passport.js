const bcrypt = require("bcryptjs");
const express = require("express");
const Passport = require("../models/Passport");
const router = express.Router();

/* GET Passport (for debugging only)
router.get("/", async (req, res) => {
    try {
        const passports = await Passport.find();
        passports.map((passport) => {
            return {
                ...passport._doc,
                dateCreated: new Date(passport._doc.dateCreated).toISOString(),
            };
        });
        res.status(201).json({ passports: passports });
    } catch (err) {
        res.status(400).json({
            error: `${err}`,
        });
    }
})*/

// POST Create New Passport
router.post("/", async (req, res) => {
    Passport.findOne({ email: req.body.email })
        .then((passport) => {
            if (passport) {
                res.status(400).json({ error: "There is already an account associated to this email." });
            }
            return bcrypt.hash(req.body.password, 12);
        })
        .then((hashedPassword) => {
            const passport = new Passport({
                name: req.body.name,
                email: req.body.email,
                password: hashedPassword,
                active: true,
            });
            passport.save();
            res.status(201).json({ passport: passport });
        })
        .catch((err) => {
            res.status(400).json({
                error: `${err}`,
            });
        });
})

// PATCH update Passport
router.patch("/", async (req, res) => {
    Passport.findOne({ email: req.body.email })
        .then((passport) => {
            if (passport) {
                res.status(400).json({ error: "There is already an account associated to this email." });
            }
            return bcrypt.hash(req.body.password, 12);
        })
        .then((hashedPassword) => {
            const passport = new Passport({
                name: req.body.name,
                email: req.body.email,
                password: hashedPassword,
                active: true,
            });
            passport.save();
            res.status(201).json({ passport: passport });
        })
        .catch((err) => {
            res.status(400).json({
                error: `${err}`,
            });
        });
})

module.exports = router;