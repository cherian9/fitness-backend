const getWeights = (req, res) => {

    const weights = [
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

    res.json(weights);

};

module.exports = {
    getWeights
};