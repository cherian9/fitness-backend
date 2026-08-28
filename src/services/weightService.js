const pool = require("../config/db");
//const { deleteWeight } = require("../controllers/weightController");
//const { updateWeight } = require("../controllers/weightController");
//the sql part of the program
const getAllWeights = async () => {
    try {
        const result = await pool.query(
            "SELECT id, weight::float8, date, user_id FROM weights ORDER BY id ASC"
        );
       if (result.rows.length === 0) {

    const error = new Error("Weight not found");

    error.statusCode = 404;
       }
        return result.rows;
    }
    catch (error)
    {
        throw error;
        };
    };
// get the weight from the database



const addWeight = async (weight,date, userId) => {
    try {
        if(!weight || !date || userId === undefined)
        {
            const error = new Error("Weight and date and user_id must be required");
            error.statusCode = 400;
            throw error;

        }
        if(typeof weight !== 'number')
            {
               const error = new Error("Weight must be correct number");
               error.statusCode = 400;
                throw error;
            }
        if (weight<=0)
            {
               const error = new Error("Weight must be greater than zero.");
               error.statusCode = 400;
                throw error;
            }

            const formattedDate = new Date(date)
            .toISOString()
            .split("T")[0];

        const result = await pool.query(
            'INSERT INTO weights(weight,date,user_id) VALUES ($1,$2,$3) RETURNING id, weight::float8, date, user_id',[weight,date,userId]);
        
         if (result.rows.length === 0) {

    const error = new Error("Weight not found");

    error.statusCode = 404;

    throw error;
         }

        return result.rows[0];

    }
    catch(error)
    {
        throw error;
    }
}


const getWeightbyId = async ( id ) => {
    try {
        const result = await pool.query(
            "SELECT * FROM weights WHERE id =$1",[id]
        );

    if (result.rows.length === 0) {
    const error = new Error("Weight not found");
    error.statusCode = 404;
    throw error;
}

    return result.rows[0];

    }
    catch(error){
        throw error;
    }
}


const updateWeight =  async ( id, weight, date ) => {
    try {
        if(!weight || !date)
            {
                const error = new Error("Weight and date are required");
                error.statusCode = 400;
                throw error;

            }

        if(typeof weight !=='number')
            {
                    const error = new Error("Weight must be a number");
    error.statusCode = 400;
    throw error;

            }

        if (weight<=0)
            {
                   const error = new Error("Weight should be greater than zero");
    error.statusCode = 400;
    throw error;

            }

        const result = await pool.query(
            "UPDATE weights SET weight =$2 , date = $3 WHERE id = $1 RETURNING *",
            [id,weight,date]
        );

        if(result.rows.length===0)
        {
            const error = new Error("weight not found");
    error.statusCode = 404;
    throw error;

        }

        return result.rows[0];
    }
    catch(error){
        throw error;
    }
}


const deleteWeight = async (id) => {
    try{
        const result = await pool.query(
            "DELETE FROM weights WHERE ID = $1 RETURNING *",
            [id]);
        if (result.rows.length === 0) {
    const error = new Error("Weight not found");
    error.statusCode = 404;
    throw error;
}
        return result.rows[0];
    }
    catch(error){
        throw error;
    }
}

const getWeightsByUserId = async (userId) => {
    try {
        const result = await pool.query(
            `SELECT *
             FROM weights
             WHERE user_id = $1
             ORDER BY date ASC`,
            [userId]
        );

        return result.rows;

    } catch (error) {
        throw error;
    }
};


module.exports = {
    getAllWeights,
    addWeight,
    getWeightbyId,
    updateWeight,
    deleteWeight,
    getWeightsByUserId

};