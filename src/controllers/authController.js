const authService = require("../services/authService");

const registerUser = async (req, res ,next) => {
    try{
        const {name, email, password }  = req.body;

        const authUser = await authService.registerUser(name,email,password);

        res.status(201).json(authUser);
    }
    catch(error) 
    {
        console.error(error);
        next(error);
    }
}

const loginUser = async (req,res,next ) =>{
    try{
        const {email, password} = req.body;
        const authUser = await authService.loginUser(email,password);
        res.status(200).json(authUser);
    }
    catch(error) 
    {
        console.error(error);
        next(error);
    }
}

module.exports = {
    registerUser,
    loginUser
};