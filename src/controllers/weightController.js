/*let weights = [
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
*/
const weightService = require("../services/weightService");

const getWeights = async (req, res,next) => {

    try {

        const weights = await weightService.getAllWeights();

        res.json(weights);

    } catch (error) {

        console.error(error);

        next(error);

    }

};


const addWeight = async (req, res, next) => {

    try {

        const { weight, date , userId } = req.body;

        const newWeight = await weightService.addWeight(weight,date, userId);

        res.status(201).json(newWeight);

    } catch (error) {

        console.error(error);

        next(error);

    }

};


const getWeightbyId = async (req,res,next) => {
    try {
        const id = Number(req.params.id);
        const weight = await weightService.getWeightbyId(id);
        res.json(weight);

    }
    catch (error) {

        console.error(error);

        next(error);

    }
}
//get weight by id 
// changed it to number since we get string request 


const updateWeight = async (req,res, next) => {
    try {
        const id = Number(req.params.id);

        const { weight,date } = req.body;

        const newWeight = await weightService.updateWeight(id,weight,date);

        res.status(200).json(newWeight);
    }
    catch(error)
    {
        console.error(error);
        
        next(error);


    }
}

const deleteWeight = async (req, res, next) => {
    try {
        const id = Number(req.params.id);

        const result = await weightService.deleteWeight(id);

        res.status(200).json(result)

        }

    
       catch (error) {
    console.error(error);

    next(error);
      }
}
    


module.exports = {
    getWeights,
    addWeight,
    getWeightbyId,
    updateWeight,
    deleteWeight
};