const express = require("express");

const router = express.Router();

const {
    getWeights
} = require("../controllers/weightController");

router.get("/", getWeights);

module.exports = router;