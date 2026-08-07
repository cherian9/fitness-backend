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
const getWeights = (req, res) => {
    res.json(weights);
};

const addWeight = (req, res) => {

    const { weight, date} = req.body;

    if (!weight || !date) {
        return res.status(400).json({
            message: "weight and date are required"
        })
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

    const newWeight = {
    id: weights.length + 1,
    weight,
    date
    };
    //newWeight.id = weights.length + 1;

    weights.push(newWeight);

    res.status(201).json(newWeight);

};

module.exports = {
    getWeights,
    addWeight
};