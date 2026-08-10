const express = require("express");

const router = express.Router();

const {
    getWeights,
    addWeight,
    getWeightbyId,
    updateWeight,
    deleteWeight
} = require("../controllers/weightController");

router.get("/", getWeights);

router.post("/", addWeight);

router.get("/:id", getWeightbyId);

router.put("/:id",updateWeight);

router.delete("/:id",deleteWeight);

module.exports = router; 