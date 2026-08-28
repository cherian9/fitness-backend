const userService = require("../services/userService");

const getUsers = async (req, res, next) => {

    try {

        const users = await userService.getAllUsers();

        res.json(users);

    } catch (error) {

        console.error(error);

        next(error);
    }
};


module.exports = {
    getUsers
};