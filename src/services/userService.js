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


module.exports = {
    getAllUsers
};