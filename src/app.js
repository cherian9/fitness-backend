const express = require("express");

const weightRoutes = require("./routes/weights");

const errorHandler = require("./middleware/errorHandler");

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
    res.send("Fitness Backend API is running!");
});

app.use("/weights", weightRoutes);
app.use(errorHandler);

module.exports = app;