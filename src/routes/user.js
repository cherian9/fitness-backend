const express = require("express");

const router = express.Router();

const {
    getWeightsByUserId
} = require("../controllers/weightController");

const {
    getUsers,
    getUserbyId,
    addUser,
    updateUser,
    deleteUser
} = require("../controllers/userController");

router.post("/",addUser);


router.get("/", getUsers);

router.get("/:id", getUserbyId);

router.get("/:userId/weights", getWeightsByUserId);

router.put("/:id", updateUser);

router.delete("/:id",deleteUser);


module.exports = router;