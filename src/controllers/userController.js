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

const getUserbyId = async (req, res, next) => {

    try {

        const id = Number(req.params.id);

        const user = await userService.getUserById(id);

        res.json(user);

    } catch (error) {

        console.error(error);

        next(error);
    }
};

const addUser = async (req, res, next) => {

    try {

        const { name, email } = req.body;

        const user = await userService.addUser(name, email);

        res.status(201).json(user);

    } catch (error) {

        console.error(error);

        next(error);
    }
};

const updateUser = async (req, res, next) => {
    try {

        const id = Number(req.params.id);

        const { name, email } = req.body;

        const user = await userService.updateUser(
            id,
            name,
            email
        );

        res.status(200).json(user);

    } catch (error) {

        console.error(error);

        next(error);
    }
};
const deleteUser = async (req, res, next) => {
    try {

        const id = Number(req.params.id);

        const user = await userService.deleteUser(id);

        res.status(200).json(user);

    } catch (error) {

        console.error(error);

        next(error);
    }
};



module.exports = {
    getUsers,
    getUserbyId,
    addUser,
    updateUser,
    deleteUser

};