const express = require("express");
const { updateAvgRating  , getResourceByCriteria} = require("../controllers/resourceController");

const router = express.Router();

router.post("/updateAvgRating", updateAvgRating);
router.get("/content" , getResourceByCriteria);
module.exports = router;
