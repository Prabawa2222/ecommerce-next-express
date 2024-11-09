const express = require("express");
const {sequelize, syncDB} = require("./src/config/db");

require("dotenv").config();

const app = express();
app.use(express.json());

// testing api
app.get('/', (req, res) => {
    res.send("hello world") 
})

const PORT = process.env.PORT || 5000;

// Synchronize DB and start server
syncDB()
    .then(() => {
        app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
    })
    .catch((error) => {
        console.error("Failed to start server due to database synchronization issue:", error);
    });
