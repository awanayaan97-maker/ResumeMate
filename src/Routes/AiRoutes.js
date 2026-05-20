const express = require("express");
const router = express.Router();
const geminiResponse = require("../Controllers/AiController")

router.post("/summary", geminiResponse.geminiSummaryResponse);
router.post("/description", geminiResponse.geminiDescriptionResponse);
router.post("/fresher", geminiResponse.geminiDescriptionFreshers);
router.post("/objective", geminiResponse.geminiObjectiveFreshers);


module.exports = router;