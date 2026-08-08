let weights = [
        {
            id: 1,
            weight: 75.4,
            date: "2026-08-07"
        },
        {
            id: 2,
            weight: 75.1,
            date: "2026-08-06"
        }
    ];
const pool = require("../config/db");

const getWeights = async (req, res) => {

    try {

        const result = await pool.query(
            "SELECT * FROM weights ORDER BY id ASC"
        );

        res.json(result.rows);

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message: "Database error"
        });

    }

};


const addWeight = async (req, res) => {

    try {

        const { weight, date } = req.body;

        if (!weight || !date) {
            return res.status(400).json({
                message: "Weight and date are required."
            });
        }

        if (typeof weight !== "number") {
            return res.status(400).json({
                message: "Weight must be a number."
            });
        }

        if (weight <= 0) {
            return res.status(400).json({
                message: "Weight must be greater than zero."
            });
        }

        const result = await pool.query(
            `INSERT INTO weights (weight, date)
             VALUES ($1, $2)
             RETURNING *`,
            [weight, date]
        );

        res.status(201).json(result.rows[0]);

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message: "Database error"
        });

    }

};

module.exports = {
    getWeights,
    addWeight
};