const express = require("express");

const router = express.Router();

const {
    getWeights,
    addWeight
} = require("../controllers/weightController");

router.get("/", getWeights);

router.post("/", addWeight);

module.exports = router; 