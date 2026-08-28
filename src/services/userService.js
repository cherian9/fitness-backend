const pool = require("../config/db");

const getAllUsers = async () => {
    try {

        const result = await pool.query(
            "SELECT id, name, email FROM users ORDER BY id ASC"
        );

        if (result.rows.length === 0) {
            const error = new Error("No users found");
            error.statusCode = 404;
            throw error;
        }

        return result.rows;

    } catch (error) {
        throw error;
    }
};


const getUserById = async (id) => {
    try {

        const result = await pool.query(
            "SELECT id, name, email FROM users WHERE id = $1",
            [id]
        );

        if (result.rows.length === 0) {
            const error = new Error("User not found");
            error.statusCode = 404;
            throw error;
        }

        return result.rows[0];

    } catch (error) {
        throw error;
    }
};

const addUser = async (name, email) => {
    try {

        if (!name || !email) {
            const error = new Error("Name and email are required");
            error.statusCode = 400;
            throw error;
        }

        const result = await pool.query(
            `INSERT INTO users (name, email)
             VALUES ($1, $2)
             RETURNING id, name, email`,
            [name, email]
        );

        return result.rows[0];

    } catch (error) {
        throw error;
    }
};

const updateUser = async (id, name, email) => {
    try {

        if (!name || !email) {
            const error = new Error("Name and email are required");
            error.statusCode = 400;
            throw error;
        }

        const result = await pool.query(
            `UPDATE users
             SET name = $2, email = $3
             WHERE id = $1
             RETURNING id, name, email`,
            [id, name, email]
        );

        if (result.rows.length === 0) {
            const error = new Error("User not found");
            error.statusCode = 404;
            throw error;
        }

        return result.rows[0];

    } catch (error) {
        throw error;
    }
};

const deleteUser = async (id) => {
    try {

        const result = await pool.query(
            `DELETE FROM users
             WHERE id = $1
             RETURNING id, name, email`,
            [id]
        );

        if (result.rows.length === 0) {
            const error = new Error("User not found");
            error.statusCode = 404;
            throw error;
        }

        return result.rows[0];

    } catch (error) {
        throw error;
    }
};


module.exports = {
    getAllUsers,
    getUserById,
    addUser,
    updateUser,
    deleteUser
};