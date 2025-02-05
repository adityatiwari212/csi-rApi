
const express = require("express");
const { createResource,
    deleteResource,
    updateResource} = require("../controllers/resourceController");
const {getUserData , getResourceData} = require("../controllers/adminController");
const router = express.Router();

router.get("/users" ,getUserData );
router.get("/resource" , getResourceData);
router.post("/create", createResource);
router.get("/delete", deleteResource);
router.post("/update" , updateResource);

module.exports = router;
