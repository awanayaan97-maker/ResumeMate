const express = require("express");
const router = express.Router();
const resumeController = require("../Controllers/resumeController")

router.post("/professional", resumeController.ProResumeSave);
router.post("/fresher",  resumeController.FresherResumeSave);
module.exports = router