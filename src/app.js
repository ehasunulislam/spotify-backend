const express = require("express");
const app = express();

const cookieParser = require("cookie-parser");

// routes declare
const authRoutes = require("./routes/auth.routes");


// middleware
app.use(express.json());
app.use(cookieParser());


// use route with prefix
app.use("/api/auth", authRoutes);

module.exports = app