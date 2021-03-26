const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const Passport = require("../models/Passport");

// GET Passport (for debugging only)
/* router.get("/", async (req, res) => {
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
}) */

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
        .then(async (passport) => {
            if (!passport) {
                res.status(400).json({ error: "There is no account associated to this email." });
            }
            const isValid = await bcrypt.compare(req.body.oldpassword, passport.password);
            if (!isValid) {
                res.status(400).json({ error: "The old password do not match." });
            }
            return passport._id;
        })
        .then(async (userId) => {
            const hashedNewPassword = await bcrypt.hash(req.body.newpassword, 12);
            await Passport.update({ _id: mongoose.Types.ObjectId(userId) }, { password: hashedNewPassword });
            res.status(201).json({ message: `Password successfully updated!` });
        })
        .catch((err) => {
            res.status(400).json({
                error: `${err}`,
            });
        });
})

// GET Passport (for debugging only)
router.delete("/", async (req, res) => {
    try {
        await Passport.remove({ email: req.body.email }, { justOne: true });
        res.status(201).json({ message: `Account for user ${req.body.email} has been successfully deleted!` });
    } catch (err) {
        res.status(400).json({
            error: `${err}`,
        });
    }
})

module.exports = router;