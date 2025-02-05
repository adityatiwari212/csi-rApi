const express = require("express");
const { registerUser, loginUser  , updateUserBookmark} = require("../controllers/userController");
const router = express.Router();
router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/bookmark" , updateUserBookmark);
module.exports = router;
