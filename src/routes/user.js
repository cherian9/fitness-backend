const express = require("express");

const router = express.Router();

const {
    getWeightsByUserId
} = require("../controllers/weightController");

router.get("/:userId/weights", getWeightsByUserId);

const {
    getUsers
} = require("../controllers/userController");

router.get("/", getUsers);

module.exports = router;