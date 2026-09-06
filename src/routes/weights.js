const express = require("express");

const router = express.Router();

const {
    getWeights,
    addWeight,
    getWeightbyId,
    updateWeight,
    deleteWeight
} = require("../controllers/weightController");
const { authenticateToken } = require("../middleware/authMiddleware");

router.get("/", authenticateToken , getWeights);

router.post("/", authenticateToken, addWeight);

router.get("/:id", getWeightbyId);

router.put("/:id", authenticateToken, updateWeight);

router.delete("/:id", authenticateToken, deleteWeight);

module.exports = router; 