const pool = require("../config/db");
const bcrypt = require("bcrypt");

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

module.exports = {
    registerUser
};