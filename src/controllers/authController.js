const authService = require("../services/authService");

const registerUser = async (req, res ,next) => {
    try{
        const {name, email, password }  = req.body;

        const authUser = await authService.registerUser(name,email,password)

        res.status(201).json(authUser);
    }
    catch(error) 
    {
        console.error(error);
        next(error);
    }
}

module.exports = {
    registerUser
};