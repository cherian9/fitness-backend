const express = require("express");

const router = express.Router();

const {
    getWeightsByUserId
} = require("../controllers/weightController");

router.get("/:userId/weights", getWeightsByUserId);

module.exports = router;