const express = require('express');
const { connectDB } = require('./src/config/db');
const app = express();
const PORT = 3000;

require("dotenv").config();

connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const gameRoutes = require("./src/routes/games.routes.js");

app.use("/games", gameRoutes);




app.listen(PORT, () => console.log(`http://localhost:${PORT}`));