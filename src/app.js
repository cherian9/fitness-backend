const express = require("express");

const weightRoutes = require("./routes/weights");
const userRoutes = require("./routes/user.js");
const authRoutes = require("./routes/auth.js");


const errorHandler = require("./middleware/errorHandler");
const { authenticateToken } = require("./middleware/authMiddleware");

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
    res.send("Fitness Backend API is running!");
});

app.use("/weights", weightRoutes);
app.use("/users", userRoutes);
app.use("/auth",authRoutes);
app.get("/protected", authenticateToken, (req, res) => {
    res.json({
        message: "You accessed a protected route!",
        user: req.user
    });
});
app.use(errorHandler);
module.exports = app;