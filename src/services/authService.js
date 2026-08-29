const pool = require("../config/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const registerUser = async (name, email, password) => {
    try {

        // Check that everything was provided
        if (!name || !email || !password) {
            const error = new Error(
                "Name, email and password are required"
            );

            error.statusCode = 400;
            throw error;
        }

        // Check if email already exists
        const existingUser = await pool.query(
            "SELECT id FROM users WHERE email = $1",
            [email]
        );

        if (existingUser.rows.length > 0) {
            const error = new Error(
                "Email is already registered"
            );

            error.statusCode = 409;
            throw error;
        }

        // Hash password
        const passwordHash = await bcrypt.hash(password, 10);

        // Create user
        const result = await pool.query(
            `INSERT INTO users (name, email, password_hash)
             VALUES ($1, $2, $3)
             RETURNING id, name, email`,
            [name, email, passwordHash]
        );

        return result.rows[0];

    } catch (error) {
        throw error;
    }
};

const loginUser = async (email, password) => {

    try{
        if (!email || !password) {
            const error = new Error(
                "email and password are required"
            );

            error.statusCode = 400;
            throw error;
        }

        const result = await pool.query(
            "SELECT id,name,email,password_hash FROM users WHERE email=$1",
            [email]
        );
        if (result.rows.length === 0) {
    const error = new Error("User not found");
    error.statusCode = 404;
    throw error;
}
const passwordMatch = await bcrypt.compare(
    password,result.rows[0].password_hash)

    if(!passwordMatch){
        const error = new Error("Incorrect Password");
        error.statusCode = 401;
        throw error;
    }

   

        const user = result.rows[0];

return {
    id: user.id,
    name: user.name,
    email: user.email
};

    
    }
    catch (error) {
        throw error;
    }

};




module.exports = {
    registerUser,
    loginUser
};