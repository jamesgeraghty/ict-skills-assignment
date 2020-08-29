"use strict";

const express = require("express");
const router = express.Router();

const dashboard = require("./controllers/dashboard.js");
const trainerdashboard = require("./controllers/trainerdashboard.js");
const about = require("./controllers/about.js");
const accounts = require("./controllers/accounts.js");

router.get("/", accounts.index);
router.get("/login", accounts.login);
router.get("/signup", accounts.signup);
router.get("/logout", accounts.logout);
router.post("/register", accounts.register);
router.get('/settings', accounts.settings);
router.post("/authenticate", accounts.authenticate);
router.get('/trainerassessments', trainerdashboard.index);

router.get("/", dashboard.index);
router.get("/dashboard", dashboard.index);
router.get("/about", about.index);
router.get("/dashboard/deleteassessment/:id", dashboard.deleteAssessment);
router.post("/dashboard/addassessment", dashboard.addAssessment);


router.get("/", trainerdashboard.index);
router.get("/trainerdashboard", trainerdashboard.index);
router.get('/trainerdashboard/trainerassessments/:id', trainerdashboard.trainerAssessments);
router.post("/trainerdashboard/:memberid/addcomment/:id", trainerdashboard.addComment);
router.get('/trainerdashboard/deletemember/:id', trainerdashboard.deleteMember);
router.post("/accounts/updatemember/:memberid", accounts.updateMember);




module.exports = router;
